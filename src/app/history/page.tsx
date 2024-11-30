'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

// Mock data for transactions
const initialTransactions = [
  { id: 1, date: '2023-05-01', time: '10:30', transactionId: 'TRX001', type: 'Deposit', amount: 500 },
  { id: 2, date: '2023-05-02', time: '14:15', transactionId: 'TRX002', type: 'Transfer', amount: -200 },
  { id: 3, date: '2023-05-03', time: '09:45', transactionId: 'TRX003', type: 'Received', amount: 100 },
  { id: 4, date: '2023-05-04', time: '16:20', transactionId: 'TRX004', type: 'Deposit', amount: 300 },
  { id: 5, date: '2023-05-05', time: '11:00', transactionId: 'TRX005', type: 'Transfer', amount: -150 },
]

export default function TransactionHistoryPage() {
  const [transactions, setTransactions] = useState(initialTransactions)
  const [filter, setFilter] = useState('all')

  const handleFilterChange = (value: string) => {
    setFilter(value)
    if (value === 'all') {
      setTransactions(initialTransactions)
    } else {
      setTransactions(initialTransactions.filter(t => t.type.toLowerCase() === value))
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Transaction History</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Transactions</CardTitle>
          <CardDescription>View and filter your transaction history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Select onValueChange={handleFilterChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="deposit">Deposits</SelectItem>
                <SelectItem value="transfer">Transfers</SelectItem>
                <SelectItem value="received">Received</SelectItem>
              </SelectContent>
            </Select>
            <Button>Export to CSV</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.time}</TableCell>
                  <TableCell>{transaction.transactionId}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell className={`text-right ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

