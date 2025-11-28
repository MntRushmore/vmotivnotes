import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx } from "clsx"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-neutral-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary-600 text-white shadow-soft hover:bg-primary-700 active:bg-primary-800",
        destructive:
          "bg-destructive-600 text-white shadow-soft hover:bg-destructive-700 active:bg-destructive-800",
        outline:
          "border border-neutral-200 bg-white text-neutral-950 shadow-soft hover:bg-neutral-50 active:bg-neutral-100",
        secondary:
          "bg-neutral-100 text-neutral-950 shadow-soft hover:bg-neutral-200 active:bg-neutral-300",
        ghost: "hover:bg-neutral-100 hover:text-neutral-950 active:bg-neutral-200",
        link: "text-primary-600 underline-offset-4 hover:underline",
        success:
          "bg-success-600 text-white shadow-soft hover:bg-success-700 active:bg-success-800",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-2xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={clsx(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
