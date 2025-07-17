
"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/app/components/ui/button"
import { useSearchParams } from "next/navigation"
import { SignInFormProps } from "@/types/auth/SignInFormProps"

export default function SignInForm({ providers }: SignInFormProps) {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  if (!providers) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {Object.values(providers).map((provider) => {
        if (provider.id === "credentials") return null

        return (
          <div key={provider.name}>
            <Button onClick={() => signIn(provider.id, { callbackUrl })} className="w-full">
              Sign in with {provider.name}
            </Button>
          </div>
        )
      })}
    </div>
  )
}
