
import { getProviders } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/server/auth"
import { redirect } from "next/navigation"
import SignInForm from "@/app/components/auth/SignInForm"

export default async function SignInPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/")
  }

  const providers = await getProviders()

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Sign In</h1>
        <SignInForm providers={providers} />
      </div>
    </div>
  )
}
