import { ImagesFiltersTypes } from "./types";


const expressAPI = 0 ? "http://localhost:3000/api" : "https://photo-gallery-api.vercel.app/api";

export const Endpoints = {
    images: (data: ImagesFiltersTypes): string => `${expressAPI}/images/`
}
