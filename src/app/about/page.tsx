import Image from 'next/image';
import PrintingHeroFull from '@/../public/3d-printing-hero-full.png';

export default function About() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <section className="flex flex-row items-center justify-between w-full mb-12">
                <div className="grid grid-cols-1 gap-4">
                    <Image src={PrintingHeroFull} alt="About Us Hero Image" width={628} height={627}/>
                </div>
                <div className="flex flex-col items-start max-w-lg">
                    <p className="text-lg mb-4">About printforge</p>
                    <h1 className="text-4xl font-bold mb-4">Empowering makers worldwide</h1>
                    <p className="text-lg mb-6">Founded in 2023, PrintForge has quickly become the go-to platform for 3D printing enthusiasts, makers, and professional designers to share and discover amazing STL files for 3D printing.
                        Our mission is to foster a vibrant community where creativity meets technology, enabling anyone to bring their ideas to life through 3D printing.
                    </p>
                </div>
            </section>
            <hr className="w-full border-gray-300 my-8" />
            <section className="flex flex-row items-start p-4 gap-8 w-full">
                <article>
                    <h3 className="mt-6">100K+ Models</h3>
                    <p>Access our vast library of community-created 3D models, from practical tools to artistic creations.</p>
                </article>
                <article>
                    <h3 className="mt-6">Active Community</h3>
                    <p>Join thousands of makers who share tips, provide feedback, and collaborate on projects..</p>
                </article>
                <article>
                    <h3 className="mt-6">Free to Use</h3>
                    <p>Most models are free to download, with optional premium features for power users.</p>
                </article>
            </section>
            <hr className="w-full border-gray-300 my-8" />
            <section className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Our vision</h2>
                <p className="text-lg mb-6">At PrintForge, we believe that 3D printing is revolutionizing the way we create, prototype, and manufacture. Our platform serves as a bridge between designers and makers, enabling the sharing
                    of knowledge and creativity that pushes the boundaries of what's possible with 3D printing.
                </p>
                <hr className="w-sm mx-auto border-gray-300 my-8"/>
                <p className="text-lg mb-6"> Whether you're a hobbyist looking for your next weekend project, an educator seeking teaching materials, or a professional designer wanting to share your creations, PrintForge provides the tools and community to support
                    your journey in 3D printing.
                </p>
            </section>
        </main>
    )
}