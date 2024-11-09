"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import InteractiveMap from "./components/InteractiveMap"

export default function TrainRoutePlanner() {
  const [date, setDate] = useState<Date>()
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [travelClass, setTravelClass] = useState("")
  const [preference, setPreference] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const searchParams = new URLSearchParams({
      from,
      to,
      date: date ? format(date, "yyyy-MM-dd") : "",
      class: travelClass,
      preference,
    })
    router.push(`/search-results?${searchParams.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4 space-y-8">
        <h1 className="text-3xl font-bold text-center text-blue-600">Indian Train Route Planner</h1>
        
        <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="from">From</Label>
              <Input 
                id="from" 
                value={from} 
                onChange={(e) => setFrom(e.target.value)} 
                placeholder="Enter starting city or station code" 
                required 
              />
            </div>
            <div>
              <Label htmlFor="to">To</Label>
              <Input 
                id="to" 
                value={to} 
                onChange={(e) => setTo(e.target.value)} 
                placeholder="Enter destination city or station code" 
                required 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label>Travel Class</Label>
              <Select value={travelClass} onValueChange={setTravelClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sleeper">Sleeper</SelectItem>
                  <SelectItem value="ac3">AC 3 Tier</SelectItem>
                  <SelectItem value="ac2">AC 2 Tier</SelectItem>
                  <SelectItem value="ac1">AC 1 Tier</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Journey Preference</Label>
              <Select value={preference} onValueChange={setPreference}>
                <SelectTrigger>
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shortest">Shortest Route</SelectItem>
                  <SelectItem value="minimum-transfers">Minimum Transfers</SelectItem>
                  <SelectItem value="quickest-confirmation">Quickest Confirmation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" className="w-full">Search Routes</Button>
        </form>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-600">Route Map</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <InteractiveMap from={from} to={to} />
          </div>
        </div>
      </div>
    </div>
  )
}









// "use client"

// import { useSearchParams } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { ArrowRight, Clock, IndianRupee, Train } from "lucide-react"
// import Link from "next/link"

// // Mock data for demonstration
// const mockTrains = [
//   {
//     id: "12301",
//     name: "Rajdhani Express",
//     from: "New Delhi",
//     to: "Mumbai Central",
//     departure: "16:55",
//     arrival: "08:35",
//     duration: "15h 40m",
//     price: {
//       sleeper: 1200,
//       ac3: 2500,
//       ac2: 3500,
//       ac1: 5000,
//     },
//   },
//   {
//     id: "12951",
//     name: "Mumbai Rajdhani",
//     from: "New Delhi",
//     to: "Mumbai Central",
//     departure: "16:35",
//     arrival: "08:25",
//     duration: "15h 50m",
//     price: {
//       sleeper: 1250,
//       ac3: 2600,
//       ac2: 3600,
//       ac1: 5200,
//     },
//   },
//   {
//     id: "12009",
//     name: "Shatabdi Express",
//     from: "New Delhi",
//     to: "Mumbai Central",
//     departure: "06:00",
//     arrival: "14:25",
//     duration: "8h 25m",
//     price: {
//       cc: 1500,
//       ec: 2800,
//     },
//   },
// ]

// export default function SearchResults() {
//   const searchParams = useSearchParams()
//   const from = searchParams.get("from")
//   const to = searchParams.get("to")
//   const date = searchParams.get("date")
//   const travelClass = searchParams.get("class")

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="container mx-auto p-4 space-y-8">
//         <h1 className="text-3xl font-bold text-center text-blue-600">Available Trains</h1>
//         <div className="bg-white p-4 rounded-lg shadow-md">
//           <p className="text-lg font-semibold">
//             {from} <ArrowRight className="inline mx-2" /> {to}
//           </p>
//           <p className="text-gray-600">Date: {date}</p>
//           <p className="text-gray-600">Class: {travelClass}</p>
//         </div>
//         <div className="space-y-4">
//           {mockTrains.map((train) => (
//             <Card key={train.id}>
//               <CardHeader>
//                 <CardTitle className="flex justify-between items-center">
//                   <span>{train.name} ({train.id})</span>
//                   <Button>Book Ticket</Button>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div className="flex items-center">
//                     <Train className="w-5 h-5 mr-2" />
//                     <div>
//                       <p className="font-semibold">{train.from} → {train.to}</p>
//                       <p className="text-sm text-gray-600">{train.departure} - {train.arrival}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center">
//                     <Clock className="w-5 h-5 mr-2" />
//                     <p>{train.duration}</p>
//                   </div>
//                   <div className="flex items-center">
//                     <IndianRupee className="w-5 h-5 mr-2" />
//                     <div>
//                       {Object.entries(train.price).map(([cls, price]) => (
//                         <p key={cls}>
//                           <span className="font-semibold">{cls.toUpperCase()}:</span> ₹{price}
//                         </p>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//         <div className="text-center">
//           <Link href="/">
//             <Button variant="outline">Back to Search</Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }