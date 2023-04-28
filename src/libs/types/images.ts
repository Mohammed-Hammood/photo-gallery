interface TagsTypes {
    id:number;
    title:string;
}

export type ImageAllowedUsersTypes = "all" | "admin" | "anonymous" | "authenticated";

export interface ImageTypes {
    id: number;
    title: string;
    source: string;
    update: string;
    cdn: string;
    allowed_users: ImageAllowedUsersTypes;
    timestamp: string;
    category: string;
    description?:string;
    tags: TagsTypes[];
}

export interface ImagesFiltersTypes {
    page: number;
    query: string;
    limit: number;
    category: string;
    order: "id" | "-id";
}

export interface ImagesInitialStateTypes {
    images: ImageTypes[];
    selector_images: ImageTypes[];
    images_count: number;
    filters: ImagesFiltersTypes;
}
