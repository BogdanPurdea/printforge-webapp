import Image from 'next/image';
import PrintingHero from '@/../public/3d-printing-hero.png';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Discover what’s possible with 3D printing</h1>
      <p className="mt-4 text-lg">Join our community of creators and explore a vast library of user-submitted models.</p>
      <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Browse Models
      </button>
      <Image src={PrintingHero} alt="3D Printing Hero Image" width={1206} height={1201} className="mt-12 w-full max-w-2xl rounded-lg" />
    </main>
  )
}
