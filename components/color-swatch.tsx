'use client'

import { cn } from '@/lib/utils'

interface ColorSwatchProps {
  hex: string
  name: string
  isActive?: boolean
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
}

export function ColorSwatch({ hex, name, isActive = false, size = 'md', onClick }: ColorSwatchProps) {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-5 w-5',
    lg: 'h-7 w-7',
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full border-2 transition-all duration-200',
        sizeClasses[size],
        isActive ? 'border-foreground ring-1 ring-foreground ring-offset-2 ring-offset-background' : 'border-transparent hover:border-muted-foreground'
      )}
      style={{ backgroundColor: hex }}
      aria-label={name}
      title={name}
    />
  )
}
