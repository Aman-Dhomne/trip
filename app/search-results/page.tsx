
"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Clock, IndianRupee, Train } from "lucide-react"
import Link from "next/link"

// Mock data for demonstration
const mockTrains = [
  {
    id: "12301",
    name: "Rajdhani Express",
    from: "New Delhi",
    to: "Mumbai Central",
    departure: "16:55",
    arrival: "08:35",
    duration: "15h 40m",
    price: {
      sleeper: 1200,
      ac3: 2500,
      ac2: 3500,
      ac1: 5000,
    },
  },
  {
    id: "12951",
    name: "Mumbai Rajdhani",
    from: "New Delhi",
    to: "Mumbai Central",
    departure: "16:35",
    arrival: "08:25",
    duration: "15h 50m",
    price: {
      sleeper: 1250,
      ac3: 2600,
      ac2: 3600,
      ac1: 5200,
    },
  },
  {
    id: "12009",
    name: "Shatabdi Express",
    from: "New Delhi",
    to: "Mumbai Central",
    departure: "06:00",
    arrival: "14:25",
    duration: "8h 25m",
    price: {
      cc: 1500,
      ec: 2800,
    },
  },
]

export default function SearchResults() {
  const searchParams = useSearchParams()
  const from = searchParams.get("from")
  const to = searchParams.get("to")
  const date = searchParams.get("date")
  const travelClass = searchParams.get("class")

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center text-blue-600">Available Trains</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <p className="text-lg font-semibold">
          {from} <ArrowRight className="inline mx-2" /> {to}
        </p>
        <p className="text-gray-600">Date: {date}</p>
        <p className="text-gray-600">Class: {travelClass}</p>
      </div>
      <div className="space-y-4">
        {mockTrains.map((train) => (
          <Card key={train.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{train.name} ({train.id})</span>
                <Button>Book Ticket</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Train className="w-5 h-5 mr-2" />
                  <div>
                    <p className="font-semibold">{train.from} → {train.to}</p>
                    <p className="text-sm text-gray-600">{train.departure} - {train.arrival}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <p>{train.duration}</p>
                </div>
                <div className="flex items-center">
                  <IndianRupee className="w-5 h-5 mr-2" />
                  <div>
                    {Object.entries(train.price).map(([cls, price]) => (
                      <p key={cls}>
                        <span className="font-semibold">{cls.toUpperCase()}:</span> ₹{price}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center">
        <Link href="/">
          <Button variant="outline">Back to Search</Button>
        </Link>
      </div>
    </div>
  )
}