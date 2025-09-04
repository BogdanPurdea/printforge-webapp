
import { NextResponse } from "next/server"
import { prisma } from "@/lib/server/prisma"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return new NextResponse("Missing fields", { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return new NextResponse("Email already in use", { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        accounts: {
          create: {
            type: "credentials",
            provider: "credentials",
            providerAccountId: email, // Using email as a unique identifier for the account
          },
        },
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error("Registration error:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
