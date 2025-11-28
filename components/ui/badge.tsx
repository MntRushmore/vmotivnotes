import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx } from "clsx"

const badgeVariants = cva(
  "inline-flex items-center rounded-xl px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border border-transparent bg-primary-100 text-primary-700 hover:bg-primary-200",
        secondary:
          "border border-transparent bg-secondary-100 text-secondary-700 hover:bg-secondary-200",
        destructive:
          "border border-transparent bg-destructive-100 text-destructive-700 hover:bg-destructive-200",
        outline: "border border-neutral-200 text-neutral-700 hover:bg-neutral-50",
        success:
          "border border-transparent bg-success-100 text-success-700 hover:bg-success-200",
        warning:
          "border border-transparent bg-warning-100 text-warning-700 hover:bg-warning-200",
        info: "border border-transparent bg-info-100 text-info-700 hover:bg-info-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={clsx(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
