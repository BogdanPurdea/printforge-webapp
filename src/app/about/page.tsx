import Image from 'next/image';
import PrintingHeroFull from '@/../public/3d-printing-hero-full.png';

export default function About() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between px-4 py-8 md:p-24">
            {/* Hero Section */}
            <section className="flex flex-col md:flex-row items-center justify-between w-full mb-8 md:mb-12 gap-8">
                <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
                    <Image
                        src={PrintingHeroFull}
                        alt="About Us Hero Image"
                        width={400}
                        height={400}
                        className="w-full max-w-xs md:max-w-md h-auto rounded-lg shadow"
                        priority
                    />
                </div>
                <div className="flex flex-col items-center md:items-start max-w-xl w-full">
                    <p className="text-base md:text-lg mb-2 text-orange-accent font-semibold uppercase tracking-wide">About PrintForge</p>
                    <h1 className="text-2xl md:text-4xl font-bold mb-4 text-center md:text-left">Empowering makers worldwide</h1>
                    <p className="text-base md:text-lg mb-6 text-center md:text-left">
                        Founded in 2023, PrintForge has quickly become the go-to platform for 3D printing enthusiasts, makers, and professional designers to share and discover amazing STL files for 3D printing.
                        Our mission is to foster a vibrant community where creativity meets technology, enabling anyone to bring their ideas to life through 3D printing.
                    </p>
                </div>
            </section>
            <hr className="w-full border-gray-300 my-6 md:my-8" />
            {/* Features Section */}
            <section className="flex flex-col md:flex-row items-center md:items-start p-0 md:p-4 gap-6 md:gap-8 w-full">
                <article className="w-full md:w-1/3 text-center md:text-left">
                    <h3 className="mt-4 md:mt-6 text-lg font-bold text-orange-accent">100K+ Models</h3>
                    <p className="text-sm md:text-base">Access our vast library of community-created 3D models, from practical tools to artistic creations.</p>
                </article>
                <article className="w-full md:w-1/3 text-center md:text-left">
                    <h3 className="mt-4 md:mt-6 text-lg font-bold text-orange-accent">Active Community</h3>
                    <p className="text-sm md:text-base">Join thousands of makers who share tips, provide feedback, and collaborate on projects.</p>
                </article>
                <article className="w-full md:w-1/3 text-center md:text-left">
                    <h3 className="mt-4 md:mt-6 text-lg font-bold text-orange-accent">Free to Use</h3>
                    <p className="text-sm md:text-base">Most models are free to download, with optional premium features for power users.</p>
                </article>
            </section>
            <hr className="w-full border-gray-300 my-6 md:my-8" />
            {/* Vision Section */}
            <section className="mt-8 md:mt-12 w-full max-w-2xl">
                <h2 className="text-xl md:text-2xl font-bold mb-4 text-orange-accent text-center md:text-left">Our vision</h2>
                <p className="text-base md:text-lg mb-4 text-center md:text-left">
                    At PrintForge, we believe that 3D printing is revolutionizing the way we create, prototype, and manufacture. Our platform serves as a bridge between designers and makers, enabling the sharing
                    of knowledge and creativity that pushes the boundaries of what's possible with 3D printing.
                </p>
                <p className="text-base md:text-lg mb-4 text-center md:text-left">
                    Whether you're a hobbyist looking for your next weekend project, an educator seeking teaching materials, or a professional designer wanting to share your creations, PrintForge provides the tools and community to support
                    your journey in 3D printing.
                </p>
            </section>
        </main>
    )
}