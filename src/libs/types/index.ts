import { ImageAllowedUsersTypes, ImagesFiltersTypes, ImageTypes } from './images';
import { FormsNames, ModalTypes } from "./forms";
import { ErrorsTypes } from "./errors";
import { GlobalSettingsTypes } from './global';
type TagTypes = {
    id: number;
    title: string;
}

declare global {
    interface Window {
        fullScreen?: any;
    }
}

type MethodTypes = "POST" | "GET" | "DELETE" | "PUT";


export interface ShareLinkTypes {
    isVisible: boolean,
    item: {
        image?: ImageTypes | string;
        title: string;
        path: string;
    } | null;
};
export type ObjectsTypes = "Article" | "Tool" | "Movie" | "Book" | "Quote" | "Goal" | "Task" | "Game" | "Image";


export type {
    TagTypes,
    MethodTypes,
    ImageAllowedUsersTypes,
    GlobalSettingsTypes,
    ImageTypes,
    ErrorsTypes,
    FormsNames,
    ModalTypes,
    ImagesFiltersTypes,
}