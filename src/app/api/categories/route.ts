import { NextResponse } from 'next/server';
import { prisma } from "@/app/lib/server/prisma";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    try {
        if (slug) {
            const category = await prisma.category.findUnique({
                where: { slug },
                select: {
                    name: true,
                    slug: true
                }
            });

            if (!category) {
                return NextResponse.json({ error: `Category with slug ${slug} not found` }, { status: 404 });
            }

            return NextResponse.json({
                displayName: category.name,
                slug: category.slug
            });
        } else {
            const categories = await prisma.category.findMany({
                select: {
                    name: true,
                    slug: true
                }
            });

            return NextResponse.json(categories.map(category => ({
                displayName: category.name,
                slug: category.slug
            })));
        }
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
}
