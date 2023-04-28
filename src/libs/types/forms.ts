
export type FormsNames =  "goals-analytics" | "image-selector" | "profile-edit" | "typing-test-settings" | "messages" | "notifications" | "add-edit-quote" | "quotes-filters" | "posts-filters" | "post-delete" | "add-edit-post" | "add-edit-goal" | "social-share" | "password-reset" | "add-edit-article" | "add-edit-image" | "dark-light-mode" | "account-image-edit" | "tasks-filters" | "image-selector" | "task-archived" | "delete-task" | "add-edit-task" | "images-filters" | "timer-settings" | "delete-timer" | "snake-game-settings" | "article-settings" | "add-edit-timer" | "articles-filters" | "movies-filters" | "books-filters" | "tools-filters" | "goals-filters" | "delete-goal" | "reset-timer" | "search" | "pagination" | "logout" | "login" | "register" | "3xGame" | "delete-account" | "translation" | "settings" | "snake-game" | "users-filters";


export interface ModalTypes {
    form: FormsNames;
    title?: string;
    lightDarkMode?:"darkMode" | "lightMode";
    closeButton?: boolean;
    header?: boolean;
    maxWidth?: "maxWidth500" | 'maxWidth600' | 'maxWidth700' | 'maxWidth800' | 'maxWidth900' | 'fullScreen';
    background?: "bgBlur" | "bgDark" | "bgNone" | "bgClosing";
    border?: string;
    fullScreen?: boolean;
}