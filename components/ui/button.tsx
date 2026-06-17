import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "cursor-pointer bg-[#AE0001] mb-0 hover:bg-[#AE0001]/60 text-white font-semibold py-6 rounded-lg transition-all duration-300",
        destructive:
          "cursor-pointer bg-destructive/50! text-white hover:bg-destructive! focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "cursor-pointer border bg-background shadow-xs hover:bg-accent dark:bg-accent/50 dark:border-input dark:hover:bg-accent",
        secondary:
          "cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/90",
        ghost:
          "cursor-pointer hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        sidebar:
          "cursor-pointer w-10! h-10! bg-trasnparent hover:bg-blue-100! text-blue-500! font-semibold rounded-lg transition-all duration-300",

        link: "cursor-pointer w-full bg-trasnparent hover:bg-gray-100 text-gray-700 font-semibold py-6 rounded-lg transition-all duration-300 border border-gray-300",

        link_card: "cursor-pointer w-full bg-trasnparent text-gray-700 font-semibold underline transition-all duration-300 p-0 text-start",

        close: "cursor-pointer w-auto bg-red-400 text-white hover:bg-red-500 transition focus-visible:ring-red-500/20 dark:focus-visible:ring-red-500/40 dark:bg-red-500/60",

        create: "cursor-pointer w-auto bg-blue-500 text-white hover:bg-blue-600 transition focus-visible:ring-blue-500/20 dark:focus-visible:ring-blue-500/40",

        dashed: "cursor-pointer border-dashed border-1 border-blue-600 w-auto bg-blue-50 text-blue-600! transition focus-visible:ring-blue-500/20 dark:focus-visible:ring-blue-500/40",
      },
      size: {
        default: "h-12 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-12 rounded-md px-6 has-[>svg]:px-4",
        link: "h-auto w-auto",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
