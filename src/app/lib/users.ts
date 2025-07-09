import users from '../data/users.json';
import { User } from '../types/User';

export async function getUsers(): Promise<User[]> {
    try {
        // Simulate a delay to mimic an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Return the users data
        return users as User[];
    } catch (error) {
        console.error("Failed to get users:", error);
        throw new Error("Failed to get users");
    }
}

export async function getUserById(id: number): Promise<User> {
    try {
        // Simulate a delay to mimic an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Find the user by ID
        const user = users.find((user: User) => user.id.toString() === id.toString());
        
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        
        return user;
    } catch (error) {
        console.error(`Failed to get user by id (${id}):`, error);
        throw error;
    }
}