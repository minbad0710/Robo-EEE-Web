import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { searchPages } from '../data/searchIndex'

type SearchBoxProps = {
  className?: string
  /** Show just the search icon until hovered, focused or typed in (header on tablet/desktop) */
  collapsible?: boolean
}

// Header search: type to see matching pages, then click one (or use ↑/↓ + Enter) to go there
export default function SearchBox({ className = '', collapsible = false }: SearchBoxProps) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const rootRef = useRef<HTMLFormElement>(null)
  const listId = useId()

  const results = searchPages(query)
  const showPanel = open && query.trim() !== ''
  const activeIndex = Math.min(active, results.length - 1)

  // Close the suggestions when clicking anywhere outside the search box
  useEffect(() => {
    if (!showPanel) return
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [showPanel])

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' && results.length > 0) {
      event.preventDefault()
      setOpen(true)
      setActive((i) => (i + 1) % results.length)
    } else if (event.key === 'ArrowUp' && results.length > 0) {
      event.preventDefault()
      setActive((i) => (i - 1 + results.length) % results.length)
    } else if (event.key === 'Escape' && showPanel) {
      // Close only the suggestions, not the mobile menu around them
      event.stopPropagation()
      setOpen(false)
    }
  }

  return (
    <form
      ref={rootRef}
      role="search"
      className={`search ${collapsible ? 'search--collapsible' : ''} ${query ? 'search--active' : ''} ${className}`}
      onSubmit={(event) => {
        event.preventDefault()
        const page = results[activeIndex]
        if (page) window.location.assign(page.href)
      }}
    >
      <label className="search__field" title="Search pages">
        <svg className="search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          type="search"
          className="search__input"
          placeholder="Search pages…"
          aria-label="Search pages"
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showPanel && results.length > 0}
          aria-controls={listId}
          aria-activedescendant={showPanel && results.length > 0 ? `${listId}-${activeIndex}` : undefined}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setActive(0)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />
      </label>

      {showPanel && (
        <div className="search__panel">
          {results.length > 0 ? (
            <ul id={listId} role="listbox" aria-label="Matching pages">
              {results.map((page, index) => (
                <li key={page.href} id={`${listId}-${index}`} role="option" aria-selected={index === activeIndex}>
                  <a href={page.href} className="search__option" tabIndex={-1} onMouseEnter={() => setActive(index)}>
                    <span className="search__option-label">{page.label}</span>
                    {page.description && <span className="search__option-hint">{page.description}</span>}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="search__empty">No pages match “{query.trim()}”</p>
          )}
        </div>
      )}
    </form>
  )
}
