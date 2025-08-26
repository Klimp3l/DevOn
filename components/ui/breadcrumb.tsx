'use client'

import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

interface BreadcrumbItem {
  label: string
  href: string
  isActive?: boolean
}

export function Breadcrumb() {
  const pathname = usePathname()

  const breadcrumbItems = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean)

    if (segments.length === 0) {
      return []
    }

    const items: BreadcrumbItem[] = []
    let currentPath = ''

    segments.forEach((segment, index) => {
      currentPath += `/${segment}`

      // Formata o label do segmento
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      items.push({
        label,
        href: currentPath,
        isActive: index === segments.length - 1
      })
    })

    return items
  }, [pathname])

  return (
    <nav className="flex items-center space-x-1 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 overflow-x-auto">
      <Link
        href="/"
        className="flex items-center hover:text-quizzer-darkgreen transition-colors duration-200 flex-shrink-0"
      >
        <Home size={14} className="sm:w-4 sm:h-4" />
      </Link>

      {breadcrumbItems.map((item, index) => (
        <div key={item.href} className="flex items-center flex-shrink-0">
          <ChevronRight size={12} className="mx-1 text-gray-400 sm:w-4 sm:h-4" />
          {item.isActive ? (
            <span className="font-medium text-quizzer-darkgreen truncate">
              {item.label}
            </span>
          ) : (
            <Link
              href={item.href}
              className="hover:text-quizzer-darkgreen transition-colors duration-200 truncate"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
} 