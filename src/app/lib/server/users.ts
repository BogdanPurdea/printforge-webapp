import { prisma } from "@/app/lib/server/prisma";
import { User } from "@/app/types/users/User";

export async function getUsers(): Promise<User[]> {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                avatarUrl: true,
                about: true
            }
        });
        
        return users as User[];
    } catch (error) {
        console.error("Failed to get users:", error);
        throw new Error("Failed to get users");
    }
}

export async function getUserById(id: string): Promise<User> {
    try {
        const user = await prisma.user.findUnique({
            where: { id: id.toString() },
            select: {
                id: true,
                name: true,
                email: true,
                avatarUrl: true,
                about: true
            }
        });
        
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        
        return user;
    } catch (error) {
        console.error(`Failed to get user by id (${id}):`, error);
        throw error;
    }
}

export async function getUsersByIds(ids: string[]): Promise<User[]> {
    try {
        const users = await prisma.user.findMany({
            where: { 
                id: { 
                    in: ids.map(id => id.toString()) 
                } 
            },
            select: {
                id: true,
                name: true,
                email: true,
                avatarUrl: true,
                about: true
            }
        });
        
        return users;
    } catch (error) {
        console.error(`Failed to get users by IDs (${ids}):`, error);
        throw error;
    }
}