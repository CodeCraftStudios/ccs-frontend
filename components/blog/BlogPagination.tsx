"use client"

import { useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface BlogPaginationProps {
  currentPage: number
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
  searchParams: { page?: string; search?: string; category?: string }
}

export default function BlogPagination({
  currentPage,
  totalPages,
  hasNext,
  hasPrevious,
  searchParams: currentParams,
}: BlogPaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())

    startTransition(() => {
      router.push(`/blogs?${params.toString()}`)
    })
  }

  return (
    <div className="mt-12 flex items-center justify-center gap-4">
      <Button
        variant="outline"
        onClick={() => navigateToPage(Math.max(1, currentPage - 1))}
        disabled={!hasPrevious || isPending}
        className="border-primary/30 hover:border-primary hover:bg-primary/10 bg-transparent disabled:opacity-50"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Previous
      </Button>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((page) => {
            // Show first page, last page, current page, and pages around current
            return (
              page === 1 ||
              page === totalPages ||
              Math.abs(page - currentPage) <= 1
            )
          })
          .map((page, index, array) => {
            // Add ellipsis if there's a gap
            const showEllipsisBefore = index > 0 && page - array[index - 1] > 1
            return (
              <div key={page} className="flex items-center gap-2">
                {showEllipsisBefore && <span className="text-muted-foreground">...</span>}
                <Button
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => navigateToPage(page)}
                  disabled={isPending}
                  className={
                    currentPage === page
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border-primary/30 hover:border-primary hover:bg-primary/10 bg-transparent"
                  }
                >
                  {page}
                </Button>
              </div>
            )
          })}
      </div>

      <Button
        variant="outline"
        onClick={() => navigateToPage(Math.min(totalPages, currentPage + 1))}
        disabled={!hasNext || isPending}
        className="border-primary/30 hover:border-primary hover:bg-primary/10 bg-transparent disabled:opacity-50"
      >
        Next
        <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  )
}
