import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden cursor-pointer select-none",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-primary-foreground border border-white/10 rounded-2xl luxury-button transform-gpu will-change-transform",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 border border-white/10 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]",
        outline:
          "border border-primary/30 bg-gradient-glass text-foreground hover:bg-primary/10 hover:border-primary/60 backdrop-blur-xl rounded-2xl shadow-premium transition-all duration-300 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]",
        secondary:
          "bg-gradient-secondary text-secondary-foreground shadow-premium rounded-2xl border border-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]",
        ghost: "text-muted-foreground hover:bg-muted/50 hover:text-foreground rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80 rounded-2xl transition-all duration-300",
        premium: "bg-gradient-primary text-primary-foreground border border-white/20 rounded-2xl luxury-button transform-gpu will-change-transform",
        crypto: "bg-gradient-crypto text-crypto-foreground border border-white/15 rounded-2xl crypto-button transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]",
        trust: "bg-gradient-secondary text-secondary-foreground border border-white/15 rounded-2xl trust-badge transition-all duration-300 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]",
      },
      size: {
        default: "h-12 px-6 py-3 text-sm",
        sm: "h-10 px-4 py-2 text-sm rounded-xl",
        lg: "h-14 px-8 py-4 text-base rounded-2xl",
        xl: "h-16 px-10 py-5 text-lg rounded-3xl",
        icon: "h-12 w-12 rounded-2xl",
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
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
