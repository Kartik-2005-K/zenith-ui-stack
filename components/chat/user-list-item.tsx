"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { User, Message } from "@/lib/chat-data"
import { formatShortTimestamp } from "@/lib/format-timestamp"
import { cn } from "@/lib/utils"

type UserListItemProps = {
  user: User
  lastMessage?: Message
  isActive: boolean
  onClick: () => void
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

// Deterministic color from user name
const AVATAR_COLORS = [
  "bg-blue-600",
  "bg-emerald-600",
  "bg-amber-600",
  "bg-rose-600",
  "bg-cyan-600",
  "bg-indigo-600",
]

function getAvatarColor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

export function UserListItem({
  user,
  lastMessage,
  isActive,
  onClick,
}: UserListItemProps) {
  const preview = lastMessage
    ? lastMessage.isDeleted
      ? "This message was deleted"
      : lastMessage.content
    : "No messages yet"

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center w-full px-3 py-3 text-left transition-colors rounded-lg",
        "hover:bg-accent/60",
        isActive && "bg-accent"
      )}
    >
      {/* Avatar with online indicator */}
      <div className="relative flex-shrink-0">
        <Avatar className="h-10 w-10">
          <AvatarFallback
            className={cn(
              "text-xs font-medium text-white",
              getAvatarColor(user.name)
            )}
          >
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        {user.isOnline && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-background" />
        )}
      </div>

      {/* Name and preview */}
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground truncate">
            {user.name}
          </span>
          {lastMessage && (
            <span className="text-[11px] text-muted-foreground ml-2 flex-shrink-0">
              {formatShortTimestamp(lastMessage.createdAt)}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground truncate mt-0.5 leading-relaxed">
          {preview}
        </p>
      </div>
    </button>
  )
}

export { getInitials, getAvatarColor }
