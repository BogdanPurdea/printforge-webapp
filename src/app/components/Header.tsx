import Image from 'next/image';
import Link from 'next/link';
import PrintForgeLogo from '@/../public/printforge-logo.svg';
import PrintForgeLogoMobile from '@/../public/printforge-logo-mobile.svg';

export default function Header() {
    return (
        <nav className='bg-white-800 text-black-600 flex items-center justify-between p-4 shadow-md'>
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
                        className="block md:hidden h-8 mx-4"
                    />
                </div>
            </Link>
            <ul className="flex space-x-10 p-4">
                <li>
                    <Link href="/3d-models">3D Models</Link>
                </li>
                <li>
                    <Link href="/about">About</Link>
                </li>
            </ul>
        </nav>
    )
}