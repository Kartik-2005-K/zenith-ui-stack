// ── Types ──────────────────────────────────────────────────────────────────

export type User = {
  id: string
  name: string
  email: string
  avatarUrl: string
  isOnline: boolean
}

export type Message = {
  id: string
  conversationId: string
  senderId: string
  content: string
  createdAt: number
  isDeleted: boolean
}

export type Conversation = {
  id: string
  participantIds: [string, string]
  lastTyping?: { userId: string; timestamp: number }
}

// ── Seed Data ──────────────────────────────────────────────────────────────

export const CURRENT_USER: User = {
  id: "user-me",
  name: "You",
  email: "you@example.com",
  avatarUrl: "",
  isOnline: true,
}

export const SEED_USERS: User[] = [
  CURRENT_USER,
  {
    id: "user-1",
    name: "Ava Chen",
    email: "ava@example.com",
    avatarUrl: "",
    isOnline: true,
  },
  {
    id: "user-2",
    name: "Marcus Rivera",
    email: "marcus@example.com",
    avatarUrl: "",
    isOnline: false,
  },
  {
    id: "user-3",
    name: "Sophie Turner",
    email: "sophie@example.com",
    avatarUrl: "",
    isOnline: true,
  },
  {
    id: "user-4",
    name: "James Okonkwo",
    email: "james@example.com",
    avatarUrl: "",
    isOnline: false,
  },
  {
    id: "user-5",
    name: "Lily Nakamura",
    email: "lily@example.com",
    avatarUrl: "",
    isOnline: true,
  },
]

const now = Date.now()
const MINUTE = 60_000
const HOUR = 3_600_000
const DAY = 86_400_000

export const SEED_CONVERSATIONS: Conversation[] = [
  { id: "conv-1", participantIds: ["user-me", "user-1"] },
  { id: "conv-2", participantIds: ["user-me", "user-2"] },
  { id: "conv-3", participantIds: ["user-me", "user-3"] },
]

export const SEED_MESSAGES: Message[] = [
  // Conversation with Ava Chen
  {
    id: "msg-1",
    conversationId: "conv-1",
    senderId: "user-1",
    content: "Hey! Have you seen the new design mockups?",
    createdAt: now - 2 * HOUR - 15 * MINUTE,
    isDeleted: false,
  },
  {
    id: "msg-2",
    conversationId: "conv-1",
    senderId: "user-me",
    content: "Yes, they look amazing! I especially love the color palette.",
    createdAt: now - 2 * HOUR - 12 * MINUTE,
    isDeleted: false,
  },
  {
    id: "msg-3",
    conversationId: "conv-1",
    senderId: "user-1",
    content: "Right? The client is going to love it. Want to hop on a quick call to discuss the implementation?",
    createdAt: now - 2 * HOUR - 10 * MINUTE,
    isDeleted: false,
  },
  {
    id: "msg-4",
    conversationId: "conv-1",
    senderId: "user-me",
    content: "Sure, give me 10 minutes to finish up what I'm working on.",
    createdAt: now - 2 * HOUR - 8 * MINUTE,
    isDeleted: false,
  },
  {
    id: "msg-5",
    conversationId: "conv-1",
    senderId: "user-1",
    content: "Sounds good, I'll set up the meeting link!",
    createdAt: now - 2 * HOUR - 5 * MINUTE,
    isDeleted: false,
  },

  // Conversation with Marcus Rivera
  {
    id: "msg-6",
    conversationId: "conv-2",
    senderId: "user-me",
    content: "Hey Marcus, did you push the latest changes to the repo?",
    createdAt: now - 1 * DAY - 3 * HOUR,
    isDeleted: false,
  },
  {
    id: "msg-7",
    conversationId: "conv-2",
    senderId: "user-2",
    content: "Not yet, I ran into a merge conflict. Working on resolving it now.",
    createdAt: now - 1 * DAY - 2 * HOUR,
    isDeleted: false,
  },
  {
    id: "msg-8",
    conversationId: "conv-2",
    senderId: "user-me",
    content: "Need any help with that?",
    createdAt: now - 1 * DAY - 1 * HOUR,
    isDeleted: false,
  },
  {
    id: "msg-9",
    conversationId: "conv-2",
    senderId: "user-2",
    content: "I think I've got it figured out. I'll push within the hour.",
    createdAt: now - 1 * DAY - 45 * MINUTE,
    isDeleted: false,
  },

  // Conversation with Sophie Turner
  {
    id: "msg-10",
    conversationId: "conv-3",
    senderId: "user-3",
    content: "The sprint planning meeting is moved to Thursday at 2pm. Can you make it?",
    createdAt: now - 5 * HOUR,
    isDeleted: false,
  },
  {
    id: "msg-11",
    conversationId: "conv-3",
    senderId: "user-me",
    content: "Thursday works for me. Should I prepare the backlog items?",
    createdAt: now - 4 * HOUR - 30 * MINUTE,
    isDeleted: false,
  },
  {
    id: "msg-12",
    conversationId: "conv-3",
    senderId: "user-3",
    content: "That would be great, thanks! Also, can you add the bug fixes we discussed?",
    createdAt: now - 4 * HOUR,
    isDeleted: false,
  },
]
