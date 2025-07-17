
"use client"

import { SessionProvider } from "next-auth/react"
import { ChildrenProps } from "@/types/shared/ChildrenProps"

export default function AuthProvider({ children }: ChildrenProps) {
  return <SessionProvider>{children}</SessionProvider>
}
