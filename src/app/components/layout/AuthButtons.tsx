
"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/app/components/ui/button"
import Image from "next/image"

export default function AuthButtons() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-gray-700 dark:text-gray-300">{session.user.name}</span>
        <Image
          src={session.user.image}
          alt={session.user.name}
          width={32}
          height={32}
          className="rounded-full"
        />
        <Button onClick={() => signOut()}>Sign Out</Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <Button onClick={() => signIn()}>Sign In</Button>
    </div>
  )
}
