import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Campus Points System</h1>
      <p className="text-xl mb-8">Manage your digital currency for campus transactions.</p>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Navaraas</CardTitle>
            <CardDescription>October 15-24, 2023</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Join us for the vibrant celebration of Navaraas! Experience nine nights of music, dance, and cultural festivities. Use your Campus Points for special discounts on event tickets and refreshments.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>KMIT Evening</CardTitle>
            <CardDescription>December 5, 2023</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Don't miss the annual KMIT Evening! Enjoy performances by talented students, faculty, and guest artists. Redeem your Campus Points for exclusive seating and merchandise.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

