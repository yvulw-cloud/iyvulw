"use client"

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { cn } from "@/lib/utils"

export const Accordion = AccordionPrimitive.Root

export const AccordionItem = AccordionPrimitive.Item

export const AccordionTrigger = ({
  className,
  children,
  ...props
}) => (
  <AccordionPrimitive.Trigger
    className={cn(
      "flex w-full items-center justify-between py-4 font-medium transition-all [&[data-state=open]>svg]:rotate-180",
      className
    )}
    {...props}
  >
    {children}
    <svg
      className="h-4 w-4 transition-transform"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  </AccordionPrimitive.Trigger>
)

export const AccordionContent = ({
  className,
  children,
  ...props
}) => (
  <AccordionPrimitive.Content
    className={cn(
      "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className="pb-4 pt-0">{children}</div>
  </AccordionPrimitive.Content>
)
