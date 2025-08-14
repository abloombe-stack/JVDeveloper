import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Property } from '@/lib/supabase'
import { formatCurrency, calculateFundingPercentage, getStatusLabel } from '@/lib/utils'

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const fundingPercentage = calculateFundingPercentage(property.amount_raised, property.target_raise)
  
  return (
    <Link href={`/properties/${property.slug}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer">
        <div className="relative h-48 w-full">
          <Image
            src={property.images[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'}
            alt={property.title}
            fill
            className="object-cover"
          />
        </div>
        
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg text-blue-900 line-clamp-2">
              {property.title}
            </CardTitle>
            <Badge variant={property.status as any} className="ml-2 shrink-0">
              {getStatusLabel(property.status)}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {property.summary}
          </p>
          
          {property.status !== 'completed' && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Capital Raised:</span>
                <span className="font-semibold">{fundingPercentage}%</span>
              </div>
              <Progress value={fundingPercentage} className="h-2" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{formatCurrency(property.amount_raised)} raised</span>
                <span>{formatCurrency(property.target_raise)} target</span>
              </div>
            </div>
          )}
          
          {property.expected_completion && (
            <p className="text-sm text-gray-600 mt-3">
              <strong>Expected Completion:</strong>{' '}
              {new Date(property.expected_completion).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}