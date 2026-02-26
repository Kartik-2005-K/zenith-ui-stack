"use client"

import { useChat } from "@/lib/chat-context"
import { ChatHeader } from "./chat-header"
import { MessageList } from "./message-list"
import { MessageInput } from "./message-input"
import { EmptyState } from "./empty-state"
import { MessageCircle } from "lucide-react"

export function ChatPanel() {
  const { state } = useChat()

  if (!state.selectedConversationId) {
    return (
      <div className="flex items-center justify-center h-full bg-background">
        <EmptyState
          icon={MessageCircle}
          title="Welcome to Livechat"
          description="Select a conversation from the sidebar to start chatting"
        />
      </div>
    )
  }

  const conversation = state.conversations.find(
    (c) => c.id === state.selectedConversationId
  )

  if (!conversation) return null

  return (
    <div className="flex flex-col h-full bg-background">
      <ChatHeader conversation={conversation} />
      <MessageList conversationId={conversation.id} />
      <MessageInput conversationId={conversation.id} />
    </div>
  )
}
