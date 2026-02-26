import type { LucideIcon } from "lucide-react"

type EmptyStateProps = {
  icon: LucideIcon
  title: string
  description: string
}

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center">
      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-muted mb-4">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-sm font-medium text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-[240px] leading-relaxed">
        {description}
      </p>
    </div>
  )
}
