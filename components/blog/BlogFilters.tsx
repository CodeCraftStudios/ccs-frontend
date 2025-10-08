"use client"

import { useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface BlogCategory {
  id: number
  name: string
  slug: string
}

interface BlogFiltersProps {
  categories: BlogCategory[]
  currentCategory: string
  currentSearch: string
}

export default function BlogFilters({
  categories,
  currentCategory,
  currentSearch,
}: BlogFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [searchValue, setSearchValue] = useState(currentSearch)

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value && value !== 'all') {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    // Reset to page 1 when filters change
    params.delete('page')

    startTransition(() => {
      router.push(`/blogs?${params.toString()}`)
    })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateParams('search', searchValue)
  }

  return (
    <>
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 z-10 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg border-primary/30 focus:border-primary bg-background/50 backdrop-blur-sm"
            />
          </div>
        </form>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3">
        <Button
          variant={currentCategory === "all" ? "default" : "outline"}
          onClick={() => updateParams('category', 'all')}
          disabled={isPending}
          className={
            currentCategory === "all"
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "border-primary/30 hover:border-primary hover:bg-primary/10 bg-transparent"
          }
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={currentCategory === category.slug ? "default" : "outline"}
            onClick={() => updateParams('category', category.slug)}
            disabled={isPending}
            className={
              currentCategory === category.slug
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "border-primary/30 hover:border-primary hover:bg-primary/10 bg-transparent"
            }
          >
            {category.name}
          </Button>
        ))}
      </div>
    </>
  )
}
