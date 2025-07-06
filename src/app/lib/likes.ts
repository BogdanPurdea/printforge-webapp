const LIKES_KEY = "likedModels";

// Helper function to get likes from localStorage
export const getLikesFromStorage = (): number[] => {
    if (typeof window === "undefined") {
        return [];
    }
    try {
        const likes = window.localStorage.getItem(LIKES_KEY);
        const parsedLikes = likes ? JSON.parse(likes) : [];
        console.log('lib/likes: getLikesFromStorage - Read', parsedLikes);
        return parsedLikes;
    } catch (error) {
        console.error("Error reading likes from localStorage", error);
        return [];
    }
};

// Helper function to save likes to localStorage
export const saveLikesToStorage = (likes: number[]) => {
    console.log('lib/likes: saveLikesToStorage - Saving', likes);
    try {
        window.localStorage.setItem(LIKES_KEY, JSON.stringify(likes));
    } catch (error) {
        console.error("Error saving likes to localStorage", error);
    }
};