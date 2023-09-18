interface TagsTypes {
    id: number;
    title: string;
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
    description?: string;
    category: string;
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


export type GlobalSettingsTypes = {
    body: {
        fontFamily: string;
        backgroundColor: number[];
        opacity: number;
    }
    filters: {
        direction: "right" | "left";
    },
    controlPanel: {
        isVisible: boolean;
    }
    header: {
        marginsColor: string
        color: string;
        opacity: number;
        backgroundColor: string;
    }
    search: {
        isVisible:boolean;
    },
    footer: {
        color: string
        backgroundColor: string
        marginsColor: string
        opacity: number;
    }
    progressBar: {
        backgroundColor: string;
        isVisible: boolean;
    }
    scrollToTop: {
        isVisible: boolean;
    }
};

export type FormsNames =  "search" | "pagination"| "translation"| "settings"| "dark-light-mode";

export type MethodTypes = "POST" | "GET" | "DELETE" | "PUT";


export interface ErrorsTypes {
    status: number;
    ok?: boolean;
    statusText?: string;
    type?:string;
}

export interface ModalTypes {
    form: FormsNames;
    title?: string;
    lightDarkMode?:"darkMode" | "lightMode";
    closeButton?: boolean;
    header?: boolean;
    maxWidth?: "maxWidth400" | "maxWidth500" | 'maxWidth600' | 'maxWidth700' | 'maxWidth800' | 'maxWidth900' | 'fullScreen';
    background?: "bgBlur" | "bgDark" | "bgNone" | "bgClosing";
    border?: string;
    fullScreen?: boolean;
}