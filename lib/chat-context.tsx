"use client"

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from "react"
import {
  type User,
  type Message,
  type Conversation,
  CURRENT_USER,
  SEED_USERS,
  SEED_CONVERSATIONS,
  SEED_MESSAGES,
} from "./chat-data"

// ── State ──────────────────────────────────────────────────────────────────

type ChatState = {
  currentUser: User
  users: User[]
  conversations: Conversation[]
  messages: Message[]
  selectedConversationId: string | null
}

const initialState: ChatState = {
  currentUser: CURRENT_USER,
  users: SEED_USERS,
  conversations: SEED_CONVERSATIONS,
  messages: SEED_MESSAGES,
  selectedConversationId: null,
}

// ── Actions ────────────────────────────────────────────────────────────────

type ChatAction =
  | { type: "SELECT_CONVERSATION"; conversationId: string | null }
  | { type: "SEND_MESSAGE"; conversationId: string; content: string }
  | { type: "DELETE_MESSAGE"; messageId: string }
  | {
      type: "CREATE_CONVERSATION"
      otherUserId: string
    }
  | {
      type: "SET_TYPING"
      conversationId: string
      userId: string
      timestamp: number
    }
  | { type: "CLEAR_TYPING"; conversationId: string }

// ── Reducer ────────────────────────────────────────────────────────────────

let messageCounter = 100

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "SELECT_CONVERSATION":
      return { ...state, selectedConversationId: action.conversationId }

    case "SEND_MESSAGE": {
      const newMessage: Message = {
        id: `msg-${++messageCounter}`,
        conversationId: action.conversationId,
        senderId: state.currentUser.id,
        content: action.content,
        createdAt: Date.now(),
        isDeleted: false,
      }
      return {
        ...state,
        messages: [...state.messages, newMessage],
      }
    }

    case "DELETE_MESSAGE":
      return {
        ...state,
        messages: state.messages.map((msg) =>
          msg.id === action.messageId ? { ...msg, isDeleted: true } : msg
        ),
      }

    case "CREATE_CONVERSATION": {
      const existing = state.conversations.find(
        (c) =>
          c.participantIds.includes(state.currentUser.id) &&
          c.participantIds.includes(action.otherUserId)
      )
      if (existing) {
        return { ...state, selectedConversationId: existing.id }
      }
      const newConv: Conversation = {
        id: `conv-${Date.now()}`,
        participantIds: [state.currentUser.id, action.otherUserId],
      }
      return {
        ...state,
        conversations: [...state.conversations, newConv],
        selectedConversationId: newConv.id,
      }
    }

    case "SET_TYPING":
      return {
        ...state,
        conversations: state.conversations.map((c) =>
          c.id === action.conversationId
            ? {
                ...c,
                lastTyping: {
                  userId: action.userId,
                  timestamp: action.timestamp,
                },
              }
            : c
        ),
      }

    case "CLEAR_TYPING":
      return {
        ...state,
        conversations: state.conversations.map((c) =>
          c.id === action.conversationId
            ? { ...c, lastTyping: undefined }
            : c
        ),
      }

    default:
      return state
  }
}

// ── Context ────────────────────────────────────────────────────────────────

type ChatContextValue = {
  state: ChatState
  selectConversation: (id: string | null) => void
  sendMessage: (conversationId: string, content: string) => void
  deleteMessage: (messageId: string) => void
  createConversation: (otherUserId: string) => void
  setTyping: (conversationId: string, userId: string) => void
  clearTyping: (conversationId: string) => void
  getOtherParticipant: (conversation: Conversation) => User | undefined
  getConversationMessages: (conversationId: string) => Message[]
  getLastMessage: (conversationId: string) => Message | undefined
}

const ChatContext = createContext<ChatContextValue | null>(null)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState)

  const selectConversation = useCallback(
    (id: string | null) =>
      dispatch({ type: "SELECT_CONVERSATION", conversationId: id }),
    []
  )

  const sendMessage = useCallback(
    (conversationId: string, content: string) =>
      dispatch({ type: "SEND_MESSAGE", conversationId, content }),
    []
  )

  const deleteMessage = useCallback(
    (messageId: string) => dispatch({ type: "DELETE_MESSAGE", messageId }),
    []
  )

  const createConversation = useCallback(
    (otherUserId: string) =>
      dispatch({ type: "CREATE_CONVERSATION", otherUserId }),
    []
  )

  const setTyping = useCallback(
    (conversationId: string, userId: string) =>
      dispatch({
        type: "SET_TYPING",
        conversationId,
        userId,
        timestamp: Date.now(),
      }),
    []
  )

  const clearTyping = useCallback(
    (conversationId: string) =>
      dispatch({ type: "CLEAR_TYPING", conversationId }),
    []
  )

  const getOtherParticipant = useCallback(
    (conversation: Conversation) => {
      const otherId = conversation.participantIds.find(
        (id) => id !== state.currentUser.id
      )
      return state.users.find((u) => u.id === otherId)
    },
    [state.currentUser.id, state.users]
  )

  const getConversationMessages = useCallback(
    (conversationId: string) =>
      state.messages
        .filter((m) => m.conversationId === conversationId)
        .sort((a, b) => a.createdAt - b.createdAt),
    [state.messages]
  )

  const getLastMessage = useCallback(
    (conversationId: string) => {
      const msgs = state.messages
        .filter((m) => m.conversationId === conversationId)
        .sort((a, b) => b.createdAt - a.createdAt)
      return msgs[0]
    },
    [state.messages]
  )

  return (
    <ChatContext.Provider
      value={{
        state,
        selectConversation,
        sendMessage,
        deleteMessage,
        createConversation,
        setTyping,
        clearTyping,
        getOtherParticipant,
        getConversationMessages,
        getLastMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error("useChat must be used within ChatProvider")
  return ctx
}
