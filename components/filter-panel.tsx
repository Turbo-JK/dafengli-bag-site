'use client'

import { useState } from 'react'
import { ChevronDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FilterOption {
  value: string
  label: string
  hex?: string
}

interface FilterGroup {
  key: string
  label: string
  options: FilterOption[]
}

interface FilterPanelProps {
  filters: FilterGroup[]
  activeFilters: Record<string, string[]>
  onFilterChange: (key: string, value: string) => void
  onClearAll: () => void
  sortValue: string
  onSortChange: (value: string) => void
}

const sortOptions = [
  { value: 'newest', label: '最新上架' },
  { value: 'popular', label: '热门推荐' },
  { value: 'price-asc', label: '价格从低到高' },
  { value: 'price-desc', label: '价格从高到低' },
]

export function FilterPanel({
  filters,
  activeFilters,
  onFilterChange,
  onClearAll,
  sortValue,
  onSortChange,
}: FilterPanelProps) {
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const activeCount = Object.values(activeFilters).flat().length

  return (
    <div className="border-b border-border">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-3 px-6 py-4 lg:px-10">
        {/* Filter Toggles */}
        {filters.map((group) => (
          <div key={group.key} className="relative">
            <button
              onClick={() => setOpenGroup(openGroup === group.key ? null : group.key)}
              className={cn(
                'flex items-center gap-1.5 border px-4 py-2 text-xs tracking-wide transition-colors',
                activeFilters[group.key]?.length
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border text-foreground hover:border-foreground'
              )}
            >
              {group.label}
              {activeFilters[group.key]?.length ? (
                <span className="ml-1">({activeFilters[group.key].length})</span>
              ) : null}
              <ChevronDown className="h-3 w-3" strokeWidth={1.5} />
            </button>

            {openGroup === group.key && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setOpenGroup(null)} />
                <div className="absolute top-full left-0 z-20 mt-1 min-w-[200px] border border-border bg-card p-3 shadow-sm">
                  <div className="flex flex-col gap-1">
                    {group.options.map((option) => {
                      const isActive = activeFilters[group.key]?.includes(option.value)
                      return (
                        <button
                          key={option.value}
                          onClick={() => onFilterChange(group.key, option.value)}
                          className={cn(
                            'flex items-center gap-2.5 px-2 py-1.5 text-left text-xs transition-colors',
                            isActive
                              ? 'text-foreground'
                              : 'text-muted-foreground hover:text-foreground'
                          )}
                        >
                          {option.hex && (
                            <span
                              className="h-3 w-3 flex-shrink-0 rounded-full border border-border"
                              style={{ backgroundColor: option.hex }}
                            />
                          )}
                          <span>{option.label}</span>
                          {isActive && (
                            <span className="ml-auto text-[10px]">&#10003;</span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        ))}

        {/* Clear Filters */}
        {activeCount > 0 && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-3 w-3" strokeWidth={1.5} />
            清除筛选
          </button>
        )}

        {/* Sort */}
        <div className="relative ml-auto">
          <select
            value={sortValue}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none border border-border bg-transparent px-4 py-2 pr-8 text-xs tracking-wide text-foreground focus:outline-none"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-foreground" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  )
}
