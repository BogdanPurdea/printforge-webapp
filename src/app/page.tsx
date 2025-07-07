import Image from 'next/image';
import PrintingHero from '@/../public/3d-printing-hero.png';
import Link from 'next/link';
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Discover what’s possible with 3D printing</h1>
      <p className="mt-4 text-lg">Join our community of creators and explore a vast library of user-submitted models.</p>
      <Link href="/3d-models" className="mt-8">
        <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors cursor-pointer">
          Browse Models
        </button>
      </Link>
      <Image src={PrintingHero} alt="3D Printing Hero Image" width={1206} height={1201} className="mt-12 w-full max-w-2xl rounded-lg" />
    </main>
  )
}
