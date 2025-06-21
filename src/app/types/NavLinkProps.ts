import { ReactNode } from 'react'
export type NavLinkProps = {
    href: string,
    isActive?: boolean
    children: React.ReactNode
}