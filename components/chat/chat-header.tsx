"use client"

import { ArrowLeft } from "lucide-react"
import { useChat } from "@/lib/chat-context"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { getInitials, getAvatarColor } from "./user-list-item"
import type { Conversation } from "@/lib/chat-data"

type ChatHeaderProps = {
  conversation: Conversation
}

export function ChatHeader({ conversation }: ChatHeaderProps) {
  const { selectConversation, getOtherParticipant } = useChat()
  const otherUser = getOtherParticipant(conversation)

  if (!otherUser) return null

  return (
    <div className="flex items-center px-4 py-3 border-b border-border bg-card">
      {/* Back button (mobile only) */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden h-8 w-8 mr-2 text-muted-foreground"
        onClick={() => selectConversation(null)}
        aria-label="Back to conversations"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>

      {/* User info */}
      <div className="relative flex-shrink-0">
        <Avatar className="h-9 w-9">
          <AvatarFallback
            className={`text-xs font-medium text-white ${getAvatarColor(
              otherUser.name
            )}`}
          >
            {getInitials(otherUser.name)}
          </AvatarFallback>
        </Avatar>
        {otherUser.isOnline && (
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-card" />
        )}
      </div>

      <div className="ml-3 min-w-0">
        <h2 className="text-sm font-semibold text-card-foreground truncate">
          {otherUser.name}
        </h2>
        <p className="text-xs text-muted-foreground">
          {otherUser.isOnline ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  )
}
