'use client'

import { useState, useEffect } from 'react'
import { PropertyCard } from '@/components/property-card'
import { Button } from '@/components/ui/button'
import { Property } from '@/lib/supabase'

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [filter, setFilter] = useState<'all' | 'open' | 'completed'>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      const response = await fetch('/api/properties')
      const data = await response.json()
      setProperties(data)
    } catch (error) {
      console.error('Error fetching properties:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProperties = properties.filter(property => {
    if (filter === 'all') return true
    if (filter === 'open') return ['open', 'planning', 'construction', 'sale'].includes(property.status)
    if (filter === 'completed') return property.status === 'completed'
    return true
  })

  if (loading) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading properties...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-blue-900">
          Investment Properties
        </h1>
        
        {/* Filter Buttons */}
        <div className="flex justify-center space-x-4 mb-12">
          <Button
            variant={filter === 'open' ? 'default' : 'outline'}
            onClick={() => setFilter('open')}
          >
            Open for Investment
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'outline'}
            onClick={() => setFilter('completed')}
          >
            Completed Projects
          </Button>
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All Projects
          </Button>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No properties found for the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  )
}