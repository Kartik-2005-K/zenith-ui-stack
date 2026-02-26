"use client"

import { useState, useEffect } from "react"
import { useChat } from "@/lib/chat-context"

type TypingIndicatorProps = {
  conversationId: string
}

export function TypingIndicator({ conversationId }: TypingIndicatorProps) {
  const { state, getOtherParticipant } = useChat()
  const [isVisible, setIsVisible] = useState(false)
  const [typingUserName, setTypingUserName] = useState("")

  const conversation = state.conversations.find(
    (c) => c.id === conversationId
  )

  useEffect(() => {
    if (!conversation?.lastTyping) {
      setIsVisible(false)
      return
    }

    const { userId, timestamp } = conversation.lastTyping

    // Don't show typing indicator for current user
    if (userId === state.currentUser.id) {
      setIsVisible(false)
      return
    }

    const elapsed = Date.now() - timestamp
    if (elapsed > 3000) {
      setIsVisible(false)
      return
    }

    const user = state.users.find((u) => u.id === userId)
    if (user) {
      setTypingUserName(user.name)
      setIsVisible(true)
    }

    // Auto-hide after 3s
    const timeout = setTimeout(() => {
      setIsVisible(false)
    }, 3000 - elapsed)

    return () => clearTimeout(timeout)
  }, [conversation?.lastTyping, state.currentUser.id, state.users])

  if (!isVisible) return null

  return (
    <div className="flex items-center px-4 py-2">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>{typingUserName} is typing</span>
        <span className="flex gap-0.5">
          <span className="h-1 w-1 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="h-1 w-1 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="h-1 w-1 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
        </span>
      </div>
    </div>
  )
}
