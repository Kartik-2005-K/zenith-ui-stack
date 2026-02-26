"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type UserSearchProps = {
  value: string
  onChange: (value: string) => void
}

export function UserSearch({ value, onChange }: UserSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search conversations..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 pr-8 h-9 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-ring"
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground hover:text-foreground"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  )
}
