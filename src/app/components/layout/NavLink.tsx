import Link from 'next/link'
import { NavLinkProps } from '@/app/types/navigation/NavLinkProps';

export default function NavLink({href, isActive, children, onClick}: NavLinkProps) {
    return (
        <li className="text-sm uppercase">
            <Link
                href={href}
                className={`px-4 py-2  transition-colors rounded-md cursor-pointer
                    hover:text-orange-accent ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
                onClick={onClick}
            >{children}</Link>
        </li>
    )
}