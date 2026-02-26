"use client"

import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { useChat } from "@/lib/chat-context"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { UserSearch } from "./user-search"
import { UserList } from "./user-list"
import { ThemeToggle } from "./theme-toggle"
import { getInitials, getAvatarColor } from "./user-list-item"

export function Sidebar() {
  const [searchQuery, setSearchQuery] = useState("")
  const { state } = useChat()

  return (
    <div className="flex flex-col h-full bg-sidebar">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary">
            <MessageCircle className="h-4 w-4 text-primary-foreground" />
          </div>
          <h1 className="text-base font-semibold text-sidebar-foreground tracking-tight">
            Livechat
          </h1>
        </div>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <div className="ml-1">
            <Avatar className="h-8 w-8">
              <AvatarFallback
                className={`text-[10px] font-medium text-white ${getAvatarColor(
                  state.currentUser.name
                )}`}
              >
                {getInitials(state.currentUser.name)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 py-3">
        <UserSearch value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* User List */}
      <UserList searchQuery={searchQuery} />
    </div>
  )
}
