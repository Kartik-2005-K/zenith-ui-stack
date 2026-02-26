"use client"

import { useMemo } from "react"
import { useChat } from "@/lib/chat-context"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserListItem } from "./user-list-item"
import { EmptyState } from "./empty-state"
import { SearchX } from "lucide-react"

type UserListProps = {
  searchQuery: string
}

export function UserList({ searchQuery }: UserListProps) {
  const {
    state,
    createConversation,
    selectConversation,
    getOtherParticipant,
    getLastMessage,
  } = useChat()

  // Build sorted list of users with their conversations
  const items = useMemo(() => {
    const otherUsers = state.users.filter(
      (u) => u.id !== state.currentUser.id
    )

    // Filter by search query
    const filtered = searchQuery
      ? otherUsers.filter((u) =>
          u.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : otherUsers

    // Map users to their conversations and last messages
    const mapped = filtered.map((user) => {
      const conversation = state.conversations.find(
        (c) =>
          c.participantIds.includes(state.currentUser.id) &&
          c.participantIds.includes(user.id)
      )
      const lastMessage = conversation
        ? getLastMessage(conversation.id)
        : undefined

      return { user, conversation, lastMessage }
    })

    // Sort: conversations with messages first (by recency), then others
    return mapped.sort((a, b) => {
      const aTime = a.lastMessage?.createdAt ?? 0
      const bTime = b.lastMessage?.createdAt ?? 0
      return bTime - aTime
    })
  }, [state.users, state.currentUser.id, state.conversations, searchQuery, getLastMessage])

  if (items.length === 0 && searchQuery) {
    return (
      <div className="flex-1">
        <EmptyState
          icon={SearchX}
          title="No results found"
          description={`No users matching "${searchQuery}"`}
        />
      </div>
    )
  }

  const handleSelect = (userId: string) => {
    const existing = state.conversations.find(
      (c) =>
        c.participantIds.includes(state.currentUser.id) &&
        c.participantIds.includes(userId)
    )
    if (existing) {
      selectConversation(existing.id)
    } else {
      createConversation(userId)
    }
  }

  return (
    <ScrollArea className="flex-1">
      <div className="px-2 py-1">
        {items.map(({ user, conversation, lastMessage }) => (
          <UserListItem
            key={user.id}
            user={user}
            lastMessage={lastMessage}
            isActive={
              conversation
                ? state.selectedConversationId === conversation.id
                : false
            }
            onClick={() => handleSelect(user.id)}
          />
        ))}
      </div>
    </ScrollArea>
  )
}
