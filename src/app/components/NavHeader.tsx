'use client'

import NavLink from '@/app/components/NavLink';
import Image from 'next/image';
import Link from 'next/link';
import PrintForgeLogo from '@/../public/printforge-logo.svg';
import PrintForgeLogoMobile from '@/../public/printforge-logo-mobile.svg';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { ThemeSwitcher } from './ThemeSwitcher';

export default function NavHeader() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isActive = (href: string): boolean => pathname === href || pathname.includes(href);
    return (
        <nav className='relative z-20 bg-card text-card-foreground flex items-center justify-between p-4 shadow-md'>
            <Link href="/">
                <div className='relative w-40'>
                    {/* Desktop logo - hidden on mobile, shown on md and up */}
                    <Image
                        src={PrintForgeLogo}
                        alt="PrintForge Logo"
                        width={2470}
                        height={520}
                        className="hidden md:block h-8 mx-4"
                    />
                    {/* Mobile logo - shown on mobile, hidden on md and up */}
                    <Image
                        src={PrintForgeLogoMobile}
                        alt="PrintForge Logo"
                        width={199}
                        height={172}
                        className="block md:hidden h-8"
                    />
                </div>
            </Link>
            {/* Desktop nav */}
            <div className="hidden md:flex items-center space-x-10 p-4">
                <ul className="flex space-x-10">
                    <NavLink href={{pathname: "/3d-models"}} isActive={isActive("/3d-models")}>3D Models</NavLink>
                    <NavLink href={{pathname: "/liked"}} isActive={isActive("/liked")}>Liked</NavLink>
                    <NavLink href={{pathname: "/about"}} isActive={isActive("/about")}>About</NavLink>
                    <NavLink href={{pathname: "/users/3"}} isActive={isActive("/users/3")}>Profile</NavLink>
                </ul>
                <ThemeSwitcher />
            </div>
            {/* Hamburger icon for mobile */}
            <div className="flex items-center md:hidden">
                <ThemeSwitcher />
                <button
                    className="ml-4 z-20"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                </button>
            </div>
            {/* Mobile menu */}
            {isMenuOpen && (
                <ul className="absolute top-14 right-4 w-48 bg-card text-card-foreground flex flex-col items-end space-y-4 py-4 px-6 shadow-2xl md:hidden z-50 rounded-lg animate-fadeInDown border-2" style={{ borderColor: 'var(--color-orange-accent)' }}>
                    <NavLink href={{pathname: "/3d-models"}} isActive={isActive("/3d-models")}
                        onClick={() => setIsMenuOpen(false)}>
                        3D Models
                    </NavLink>
                    <hr className="w-full border-t-2" style={{ borderColor: 'var(--color-orange-accent)' }} />
                    <NavLink href={{pathname: "/liked"}} isActive={isActive("/liked")}
                        onClick={() => setIsMenuOpen(false)}>
                        Liked
                    </NavLink>
                    <hr className="w-full border-t-2" style={{ borderColor: 'var(--color-orange-accent)' }} />
                    <NavLink href={{pathname: "/about"}} isActive={isActive("/about")}
                        onClick={() => setIsMenuOpen(false)}>
                        About
                    </NavLink>
                    <hr className="w-full border-t-2" style={{ borderColor: 'var(--color-orange-accent)' }} />
                    <NavLink href={{pathname: "/users/1"}} isActive={isActive("/users/1")}
                        onClick={() => setIsMenuOpen(false)}>
                        Profile
                    </NavLink>
                </ul>
            )}
        </nav>
    )
}
