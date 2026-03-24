import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  centered?: boolean;
  dark?: boolean;
}

export function SectionHeading({ title, subtitle, centered = false, dark = false, className, ...props }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)} {...props}>
      {subtitle && (
        <span className="text-secondary font-medium tracking-wider uppercase text-sm mb-2 block">
          {subtitle}
        </span>
      )}
      <h2 className={cn("text-4xl md:text-5xl font-serif mb-4", dark ? "text-white" : "text-foreground")}>
        {title}
      </h2>
      <div className={cn("h-1 w-16 bg-secondary", centered && "mx-auto")} />
    </div>
  );
}
