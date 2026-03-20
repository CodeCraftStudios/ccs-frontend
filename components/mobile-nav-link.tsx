"use client"

import Link from "next/link"

export function MobileNavLink({ href, className, children }: {
  href: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        const toggle = document.getElementById("mobile-menu-toggle") as HTMLInputElement | null
        if (toggle) toggle.checked = false
      }}
    >
      {children}
    </Link>
  )
}
