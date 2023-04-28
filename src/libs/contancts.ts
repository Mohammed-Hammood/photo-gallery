import { ImagesFiltersTypes } from "./types";

const baseUrl = "https://worldoftechnology.pythonanywhere.com/api";


const images = ({ query, page, limit, category, order }: ImagesFiltersTypes): string => `${baseUrl}/images/?page=${page}&category=${category}&limit=${limit}&query=${query}&order=${order}`;

export const Endpoints = {
    images,
}