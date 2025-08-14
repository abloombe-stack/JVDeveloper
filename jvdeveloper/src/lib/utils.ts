import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function calculateFundingPercentage(raised: number, target: number): number {
  if (target === 0) return 0
  return Math.round((raised / target) * 100)
}

export function getStatusBadgeColor(status: string): string {
  switch (status) {
    case 'open':
      return 'bg-green-100 text-green-800'
    case 'planning':
      return 'bg-yellow-100 text-yellow-800'
    case 'construction':
      return 'bg-blue-100 text-blue-800'
    case 'sale':
      return 'bg-purple-100 text-purple-800'
    case 'completed':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case 'open':
      return 'Open for Investment'
    case 'planning':
      return 'Planning'
    case 'construction':
      return 'Under Construction'
    case 'sale':
      return 'For Sale'
    case 'completed':
      return 'Completed'
    default:
      return status
  }
}