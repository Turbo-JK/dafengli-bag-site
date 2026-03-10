'use client'

import { useState, useRef, useEffect } from 'react'
import { Globe } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Locale } from '@/lib/i18n'

const languages: { code: Locale; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文' },
]

interface LanguageSwitcherProps {
  locale: Locale
  onChange: (locale: Locale) => void
  className?: string
}

export function LanguageSwitcher({ locale, onChange, className }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const current = languages.find((l) => l.code === locale) || languages[0]

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-foreground transition-opacity hover:opacity-60"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
      >
        <Globe className="h-[18px] w-[18px]" strokeWidth={1.5} />
        <span className="hidden text-xs tracking-wide sm:inline">{current.label}</span>
      </button>

      {/* Dropdown */}
      <div
        className={cn(
          'absolute right-0 top-full mt-2 min-w-[100px] bg-background py-1 shadow-sm transition-all duration-200',
          open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-1 pointer-events-none'
        )}
        role="listbox"
        aria-label="Language options"
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => {
              onChange(lang.code)
              setOpen(false)
            }}
            className={cn(
              'flex w-full items-center gap-2 px-3 py-2 text-left text-xs tracking-wide transition-colors hover:bg-secondary',
              lang.code === locale ? 'text-foreground' : 'text-muted-foreground'
            )}
            role="option"
            aria-selected={lang.code === locale}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  )
}
