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

export default function App(){
  const [selected, setSelected] = useState<SearchItem | null>(null)
  const handleSelect = (item: SearchItem) => {
    setSelected(item)
    console.info('Selected:', item)
  }

  return (
    <div className="container">
      <h1>Smart Search Demo</h1>
      <p>Reusable Smart Search component for accounts, transactions, customers.</p>
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
  )
}
