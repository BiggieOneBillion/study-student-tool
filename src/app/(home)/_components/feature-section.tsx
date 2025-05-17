import type { ReactNode } from "react"
import { Check } from "lucide-react"

interface FeatureSectionProps {
  icon: ReactNode
  title: string
  description: string
  items: string[]
}

export default function FeatureSection({ icon, title, description, items }: FeatureSectionProps) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100 transition-all duration-300 hover:shadow-md">
      <div className="w-14 h-14 rounded-xl bg-emerald-50 flex items-center justify-center mb-6">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <Check className="h-3 w-3 text-emerald-600" />
            </div>
            <span className="text-sm text-gray-600">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
