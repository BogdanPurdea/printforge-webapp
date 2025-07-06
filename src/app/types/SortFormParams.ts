export type SortFormParams = {
    sortBy: "date" | "likes" | "alpha";
    setSortBy: (sortBy: "date" | "likes" | "alpha") => void;
}
