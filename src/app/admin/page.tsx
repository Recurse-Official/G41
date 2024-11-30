import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card' // Add CardFooter here
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

// Mock data
const initialData = {
  totalPoints: 100000,
  students: [
    { id: 1, name: 'Alice', email: 'alice@example.com', balance: 1000 },
    { id: 2, name: 'Bob', email: 'bob@example.com', balance: 1500 },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', balance: 2000 },
  ],
  merchants: [
    { id: 1, name: 'Campus Cafe', email: 'cafe@campus.com', balance: 5000 },
    { id: 2, name: 'Book Store', email: 'books@campus.com', balance: 7500 },
  ],
}

export default function AdminPage() {
  const [data, setData] = useState(initialData)
  const [userId, setUserId] = useState('')
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleAdjustBalance = (e: React.FormEvent) => {
    e.preventDefault()
    const userIdNum = parseInt(userId)
    const amountNum = parseInt(amount)

    if (isNaN(userIdNum) || isNaN(amountNum)) {
      setMessage({ type: 'error', text: 'Please enter valid user ID and amount' })
      return
    }

    setData(prevData => {
      const newStudents = prevData.students.map(student => 
        student.id === userIdNum ? { ...student, balance: student.balance + amountNum } : student
      )
      const newMerchants = prevData.merchants.map(merchant => 
        merchant.id === userIdNum ? { ...merchant, balance: merchant.balance + amountNum } : merchant
      )
      return {
        ...prevData,
        students: newStudents,
        merchants: newMerchants,
        totalPoints: prevData.totalPoints + amountNum
      }
    })

    setMessage({ type: 'success', text: `Adjusted balance for user ${userId} by ${amount} points` })
    setUserId('')
    setAmount('')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Total Campus Points in Circulation</CardTitle>
          <CardDescription>Current system-wide balance</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-primary">{data.totalPoints} Points</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Adjust User Balance</CardTitle>
          <CardDescription>Modify a user's Campus Points balance</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdjustBalance} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="userId">User ID</Label>
                <Input
                  id="userId"
                  type="number"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter user ID"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount (positive or negative)"
                  required
                />
              </div>
            </div>
            <Button type="submit">Adjust Balance</Button>
          </form>
          {message && (
            <Alert variant={message.type === 'success' ? 'default' : 'destructive'} className="mt-4">
              {message.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertTitle>{message.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        {/* Move CardFooter inside the Card */}
        <CardFooter>
          {/* Any content you want to add to the footer */}
        </CardFooter>
      </Card>
    </div>
  )
}
