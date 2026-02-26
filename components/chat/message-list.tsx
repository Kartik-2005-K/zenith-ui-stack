"use client"

import { useRef, useEffect, useCallback } from "react"
import { useChat } from "@/lib/chat-context"
import { MessageBubble } from "./message-bubble"
import { TypingIndicator } from "./typing-indicator"
import { EmptyState } from "./empty-state"
import { MessageSquare } from "lucide-react"
import { format, isToday, isYesterday } from "date-fns"

type MessageListProps = {
  conversationId: string
}

function getDateLabel(timestamp: number): string {
  const date = new Date(timestamp)
  if (isToday(date)) return "Today"
  if (isYesterday(date)) return "Yesterday"
  return format(date, "MMMM d, yyyy")
}

export function MessageList({ conversationId }: MessageListProps) {
  const { state, getConversationMessages } = useChat()
  const messages = getConversationMessages(conversationId)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isNearBottomRef = useRef(true)

  const checkNearBottom = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const threshold = 100
    isNearBottomRef.current =
      el.scrollHeight - el.scrollTop - el.clientHeight < threshold
  }, [])

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [])

  // Scroll to bottom on new messages (only if user is near bottom)
  useEffect(() => {
    if (isNearBottomRef.current) {
      scrollToBottom()
    }
  }, [messages.length, scrollToBottom])

  // Always scroll to bottom when switching conversations
  useEffect(() => {
    scrollToBottom()
    isNearBottomRef.current = true
  }, [conversationId, scrollToBottom])

  if (messages.length === 0) {
    return (
      <div className="flex-1 overflow-hidden">
        <EmptyState
          icon={MessageSquare}
          title="No messages yet"
          description="Send a message to start the conversation"
        />
      </div>
    )
  }

  // Group messages by date for separators
  let lastDateLabel = ""

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-4 py-4"
      onScroll={checkNearBottom}
    >
      {messages.map((message) => {
        const dateLabel = getDateLabel(message.createdAt)
        const showSeparator = dateLabel !== lastDateLabel
        lastDateLabel = dateLabel

        return (
          <div key={message.id}>
            {showSeparator && (
              <div className="flex items-center justify-center my-4">
                <div className="h-px flex-1 bg-border" />
                <span className="mx-3 text-[11px] font-medium text-muted-foreground">
                  {dateLabel}
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
            )}
            <MessageBubble
              message={message}
              isSent={message.senderId === state.currentUser.id}
            />
          </div>
        )
      })}

      <TypingIndicator conversationId={conversationId} />
    </div>
  )
}
