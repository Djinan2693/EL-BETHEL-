import * as React from "react"
import { cn } from "@/lib/utils"

export interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  dark?: boolean;
}

const SectionWrapper = React.forwardRef<HTMLElement, SectionWrapperProps>(
  ({ className, dark, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "py-16 md:py-24 relative overflow-hidden",
          dark ? "bg-primary text-primary-foreground" : "bg-background text-foreground",
          className
        )}
        {...props}
      />
    )
  }
)
SectionWrapper.displayName = "SectionWrapper"

export { SectionWrapper }
