"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar } from "../../components/ui/avatar"

interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "sent" | "received";
}

const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ className, variant = "received", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-2 max-w-[80%]",
          variant === "sent" ? "ml-auto flex-row-reverse" : "mr-auto",
          className
        )}
        {...props}
      />
    )
  }
)
ChatBubble.displayName = "ChatBubble"

const ChatBubbleAvatar = Avatar;

interface ChatBubbleMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "sent" | "received";
  isLoading?: boolean;
}

const ChatBubbleMessage = React.forwardRef<HTMLDivElement, ChatBubbleMessageProps>(
  ({ className, variant = "received", isLoading = false, children, ...props }, ref) => {
    if (isLoading) {
      return (
        <div
          ref={ref}
          className={cn(
            "rounded-lg px-3 py-2 text-sm",
            variant === "sent"
              ? "bg-primary text-primary-foreground"
              : "bg-muted",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-75" />
            <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-150" />
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg px-3 py-2 text-sm",
          variant === "sent"
            ? "bg-primary text-primary-foreground"
            : "bg-muted",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ChatBubbleMessage.displayName = "ChatBubbleMessage"

export { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage }