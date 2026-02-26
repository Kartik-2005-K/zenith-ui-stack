"use client"

import { useState } from "react"
import { Trash2, MoreHorizontal } from "lucide-react"
import { useChat } from "@/lib/chat-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatTimestamp } from "@/lib/format-timestamp"
import type { Message } from "@/lib/chat-data"
import { cn } from "@/lib/utils"

type MessageBubbleProps = {
  message: Message
  isSent: boolean
}

export function MessageBubble({ message, isSent }: MessageBubbleProps) {
  const { deleteMessage } = useChat()
  const [showActions, setShowActions] = useState(false)

  if (message.isDeleted) {
    return (
      <div
        className={cn("flex mb-1.5", isSent ? "justify-end" : "justify-start")}
      >
        <div className="max-w-[75%] px-3.5 py-2 rounded-2xl bg-muted/50 border border-border">
          <p className="text-xs italic text-muted-foreground">
            This message was deleted
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn("flex mb-1.5 group", isSent ? "justify-end" : "justify-start")}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className={cn("flex items-end gap-1", isSent && "flex-row-reverse")}>
        <div
          className={cn(
            "max-w-[75%] px-3.5 py-2 rounded-2xl",
            isSent
              ? "bg-primary text-primary-foreground rounded-br-md"
              : "bg-muted text-foreground rounded-bl-md"
          )}
        >
          <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
            {message.content}
          </p>
          <p
            className={cn(
              "text-[10px] mt-1",
              isSent
                ? "text-primary-foreground/70"
                : "text-muted-foreground"
            )}
          >
            {formatTimestamp(message.createdAt)}
          </p>
        </div>

        {/* Actions (only for sent messages) */}
        {isSent && (
          <div
            className={cn(
              "flex-shrink-0 transition-opacity",
              showActions ? "opacity-100" : "opacity-0"
            )}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-muted-foreground hover:text-foreground"
                >
                  <MoreHorizontal className="h-3.5 w-3.5" />
                  <span className="sr-only">Message actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => deleteMessage(message.id)}
                >
                  <Trash2 className="h-3.5 w-3.5 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  )
}
