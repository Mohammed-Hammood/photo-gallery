import { ImagesFiltersTypes } from "./types";


const expressAPI = 0 ? "http://localhost:3000/api" : "https://photo-gallery-api.vercel.app/api";

const images = (data: ImagesFiltersTypes): string => `${expressAPI}/images/`;
// const images = ({ query, page, limit, category, order }: ImagesFiltersTypes): string => `${baseUrl}/images/?page=${page}&category=${category}&limit=${limit}&query=${query}&order=${order}`;

export const Endpoints = {
    images,
}