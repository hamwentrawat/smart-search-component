import React, { useEffect, useRef, useState } from 'react'
import styles from './SmartSearch.module.css'

export type SearchItem = {
  id: string
  type: string
  title: string
  subtitle?: string
  [key: string]: any
}

export type SmartSearchProps = {
  items: SearchItem[]
  placeholder?: string
  onSelect?: (item: SearchItem) => void
  loading?: boolean
  minChars?: number
  theme?: 'light' | 'dark'
  clearOnSelect?: boolean
}

function normalize(s: string) { return s.trim().toLowerCase() }

export default function SmartSearch({
  items,
  placeholder = 'Search...',
  onSelect,
  loading = false,
  minChars = 1,
  theme = 'light',
  clearOnSelect = false
}: SmartSearchProps) {

  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(0)
  const [results, setResults] = useState<SearchItem[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)
  const listRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    if (query.length >= minChars) {
      const q = normalize(query)
      const filtered = items.filter(it => {
        return [it.title, it.subtitle, it.type].some(v => !!v && normalize(String(v)).includes(q))
      })
      setResults(filtered)
      setOpen(true)
      setHighlight(0)
    } else {
      setResults([])
      setOpen(false)
    }
  }, [query, items, minChars])

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!inputRef.current) return
      if (!inputRef.current.contains(e.target as Node) && !listRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlight(h => Math.min(h + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight(h => Math.max(h - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const item = results[highlight]
      if (item) selectItem(item)
    } else if (e.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
    }
  }

  function selectItem(item: SearchItem) {
    onSelect && onSelect(item)
    if (clearOnSelect) setQuery('')
    setOpen(false)
  }

  function clear() {
    setQuery('')
    setOpen(false)
    inputRef.current?.focus()
  }

  return (
    <div className={`${styles.wrap} ${theme === 'dark' ? styles.dark : ''}`}>
      <div className={styles.inputRow}>
        <input
          ref={inputRef}
          aria-label="Smart search input"
          aria-expanded={open}
          aria-controls="smart-search-list"
          placeholder={placeholder}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          className={styles.input}
        />
        {query && <button className={styles.clear} aria-label="Clear search" onClick={clear}>✕</button>}
        {loading && <div className={styles.loader} aria-hidden>Loading…</div>}
      </div>

      {open && (
        <ul id="smart-search-list" role="listbox" className={styles.list} ref={listRef}>
          {results.length === 0 ? (
            <li className={styles.empty}>No results</li>
          ) : results.map((it, idx) => (
            <li
              key={it.id}
              role="option"
              aria-selected={highlight === idx}
              className={`${styles.item} ${highlight === idx ? styles.highlight : ''}`}
              onMouseEnter={() => setHighlight(idx)}
              onMouseDown={(e) => { e.preventDefault(); selectItem(it) }} // use onMouseDown to select before blur
            >
              <div className={styles.itemTitle}>{it.title}</div>
              {it.subtitle && <div className={styles.itemSubtitle}>{it.subtitle}</div>}
              <div className={styles.itemType}>{it.type}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
