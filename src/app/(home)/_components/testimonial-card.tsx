import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"
import Image from "next/image"

interface TestimonialCardProps {
  quote: string
  name: string
  role: string
  avatar: string
}

export default function TestimonialCard({ quote, name, role, avatar }: TestimonialCardProps) {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardContent className="pt-6">
        <Quote className="h-8 w-8 text-primary/30 mb-4" />
        <p className="text-gray-700 mb-6 italic">&quot;{quote}&quot;</p>
        <div className="flex items-center gap-4">
          <Image src={avatar || "/placeholder.svg"} alt={name} className="w-12 h-12 rounded-full object-cover" />
          <div>
            <h4 className="font-medium">{name}</h4>
            <p className="text-sm text-gray-500">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
