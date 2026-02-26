"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { SendHorizontal } from "lucide-react"
import { useChat } from "@/lib/chat-context"
import { Button } from "@/components/ui/button"

type MessageInputProps = {
  conversationId: string
}

export function MessageInput({ conversationId }: MessageInputProps) {
  const { sendMessage, setTyping, state } = useChat()
  const [content, setContent] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Reset input when conversation changes
  useEffect(() => {
    setContent("")
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
  }, [conversationId])

  const handleSend = useCallback(() => {
    const trimmed = content.trim()
    if (!trimmed) return

    sendMessage(conversationId, trimmed)
    setContent("")

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }

    // Simulate the other person typing back after a delay
    const conversation = state.conversations.find(
      (c) => c.id === conversationId
    )
    if (conversation) {
      const otherId = conversation.participantIds.find(
        (id) => id !== state.currentUser.id
      )
      if (otherId) {
        setTimeout(() => {
          setTyping(conversationId, otherId)
        }, 1500)
      }
    }
  }, [content, conversationId, sendMessage, setTyping, state.conversations, state.currentUser.id])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)

    // Auto-resize
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px"
    }
  }

  return (
    <div className="px-4 py-3 border-t border-border bg-card">
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          rows={1}
          className="flex-1 resize-none rounded-xl border border-input bg-muted/30 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring leading-relaxed"
        />
        <Button
          size="icon"
          className="h-10 w-10 rounded-xl flex-shrink-0"
          onClick={handleSend}
          disabled={!content.trim()}
          aria-label="Send message"
        >
          <SendHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
