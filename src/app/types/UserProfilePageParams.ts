export type UserProfilePageParams = {
    params: {
        id: string;
    };
    searchParams: {
        page?: string;
        filter?: string;
        sort?: "date" | "likes" | "alpha";
    };
};