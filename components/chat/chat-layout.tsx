"use client"

import { useChat } from "@/lib/chat-context"
import { Sidebar } from "./sidebar"
import { ChatPanel } from "./chat-panel"

export function ChatLayout() {
  const { state } = useChat()
  const hasSelection = state.selectedConversationId !== null

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-background">
      {/* Sidebar: always visible on md+, conditionally on mobile */}
      <div
        className={`w-full md:w-80 md:flex-shrink-0 md:block border-r border-border ${
          hasSelection ? "hidden md:block" : "block"
        }`}
      >
        <Sidebar />
      </div>

      {/* Chat panel: always visible on md+, conditionally on mobile */}
      <div
        className={`flex-1 min-w-0 ${
          hasSelection ? "block" : "hidden md:block"
        }`}
      >
        <ChatPanel />
      </div>
    </div>
  )
}
