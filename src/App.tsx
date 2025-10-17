import React, { useState } from 'react'
import SmartSearch, { SearchItem } from './components/SmartSearch/SmartSearch'
import styles from './App.module.css'

const MOCK: SearchItem[] = [
  { id: 'acc_1', type: 'account', title: 'Savings Account - 1234', subtitle: 'SGD • Active' },
  { id: 'acc_2', type: 'account', title: 'Checking Account - 5678', subtitle: 'USD • Active' },
  { id: 'txn_1', type: 'transaction', title: 'Payment - Amazon', subtitle: 'USD 120.50 • 2025-09-10' },
  { id: 'cust_1', type: 'customer', title: 'Alice Tan', subtitle: 'Customer ID: C001' },
  { id: 'cust_2', type: 'customer', title: 'Bob Lee', subtitle: 'Customer ID: C002' },
]

export default function App() {
  const [selected, setSelected] = useState<SearchItem | null>(null)
  const handleSelect = (item: SearchItem) => {
    setSelected(item)
    console.info('Selected:', item)
  }

  return (
    <div className="app-shell">
      <div className="card" role="region" aria-label="Smart search demo">
        <div className="header">
          <div className="branding">
            <div className="logo">SR</div>
          </div>
          <div className="brand">
            <h1>Smart Search</h1>
            <p>Reusable search component for accounts, transactions and customers</p>
          </div>
        </div>
        <div className="content">
          <div className="left">
            <p className="lead">Start typing to search across accounts, transactions, and customers. Use arrow keys to navigate results and Enter to select.</p>
            <p className="note">Designed with accessibility, theming and performance in mind.</p>
            <SmartSearch
              placeholder="Search accounts, transactions, customers..."
              items={MOCK}
              onSelect={handleSelect}
              theme="light"
            />
            {selected && (
              <div className={styles.selected}>
                <h3>Selected item</h3>
                <div><strong>{selected.title}</strong> — {selected.subtitle}</div>
              </div>
            )}
          </div>
          <div className="right" aria-hidden>
            <h3 style={{ marginTop: 0 }}>Quick Tips</h3>
            <ul style={{ paddingLeft: 18, color: 'var(--muted)' }}>
              <li>Try "Savings" or "Amazon"</li>
              <li>Supports keyboard & touch</li>
              <li>Dark mode available via prop</li>
            </ul>
          </div>
        </div>
        <div className="footer">
          <div>Built by Hamwent Rawat</div>
          <div>© {new Date().getFullYear()}</div>
        </div>
      </div>
    </div>
  )
}
