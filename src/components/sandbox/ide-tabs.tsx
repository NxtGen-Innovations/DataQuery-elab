'use client'

import { ReactNode } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

interface TabItem<T extends string> {
  value: T
  label: string
  icon?: ReactNode
  badge?: ReactNode
}

interface IdeTabsProps<T extends string> {
  value: T
  onValueChange: (value: T) => void
  items: TabItem<T>[]
  children: ReactNode
  className?: string
  listClassName?: string
  triggerClassName?: string
  contentClassName?: string
}

export function IdeTabs<T extends string>({
  value,
  onValueChange,
  items,
  children,
  className,
  listClassName,
  triggerClassName,
  contentClassName,
}: IdeTabsProps<T>) {
  return (
    <Tabs
      value={value}
      onValueChange={(nextValue) => onValueChange(nextValue as T)}
      className={cn('flex h-full min-h-0 flex-col gap-0', className)}
    >
      <div className="flex h-10 shrink-0 items-center border-b border-[#30363d] bg-[#161b22] px-3">
        <TabsList className={cn('h-full w-auto gap-0 rounded-md bg-transparent p-0', listClassName)}>
          {items.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className={cn(
                'h-full rounded-md border-x-0 border-t-0 border-b-2 border-transparent px-3 text-[13px] font-medium text-[#8b949e] shadow-none transition-colors',
                'data-[state=active]:border-[#2f81f7] data-[state=active]:bg-transparent data-[state=active]:text-[#e6edf3]',
                'hover:text-[#c9d1d9] focus-visible:ring-1 focus-visible:ring-[#2f81f7]',
                triggerClassName
              )}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.badge}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <div className={cn('min-h-0 flex-1', contentClassName)}>{children}</div>
    </Tabs>
  )
}

export { TabsContent }
