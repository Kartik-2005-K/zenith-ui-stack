"use client"

import { ChatProvider } from "@/lib/chat-context"
import { ChatLayout } from "@/components/chat/chat-layout"

export default function Home() {
  return (
    <ChatProvider>
      <ChatLayout />
    </ChatProvider>
  )
}
