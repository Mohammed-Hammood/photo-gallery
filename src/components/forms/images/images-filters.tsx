import React, { useState } from "react";
import { resetImagesFilters, setImagesFilters } from "store/slicers/images";
import { useTranslation } from "react-i18next";
import { FiltersWrapper } from "styles/filters";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { Categories } from "libs";
import { SVG } from "components";

interface Props {
    setIsVisible: (value: boolean) => void;
}

export default function ImagesFiltersForm(props: Props): JSX.Element {
    const { setIsVisible } = props;
    const { t:t_ } = useTranslation('translation');
    const t = (text:string):string => t_(text)
    const filters = useAppSelector(state => state.images.filters);
    const [category, setCategory] = useState<string>(filters.category);
    const [order, setOrder] = useState<"id" | "-id">(filters.order)
    const [query, setQuery] = useState<string>(filters.query);
    const [limit, setLimit] = useState<number>(filters.limit);
    const dispatch = useAppDispatch();
    const resetFilters = (): void => {
        setIsVisible(false);
        dispatch(resetImagesFilters());
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setImagesFilters({ key: "order", value: order }));
        dispatch(setImagesFilters({ key: "query", value: query }));
        dispatch(setImagesFilters({ key: "category", value: category }));
        dispatch(setImagesFilters({ key: "limit", value: limit }));
        dispatch(setImagesFilters({ key: "page", value: 1 }));
        setIsVisible(false);
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)} className="container">
            <FiltersWrapper>
                <section>
                    <label className="text" htmlFor='order'>{t("Order")}</label>
                    <div className="controllers__wrapper">
                        <button type="button" onClick={() => setOrder(order === "id" ? "-id" : "id")}>
                            <SVG name={`angle-${order === "id" ? 'up' : 'down'}`} color="black" />
                        </button>
                    </div>
                </section>
                <section>
                    <label htmlFor="category__select" className="text">{t("Category")}</label>
                    <div className="controllers__wrapper">
                        <select id="category__select" className="left" value={category} onChange={(e) => setCategory((e.target as HTMLSelectElement).value)}>
                            <option value={Categories.all}>{t("All")}</option>
                            <option value={Categories.programming}>{t("Programming")}</option>
                            <option value={Categories.religion}>{t("Religion")}</option>
                            <option value={Categories.university}>{t("University")}</option>
                            <option value={Categories.flag}>{t("Flag")}</option>
                            <option value={Categories.motivational_quotes}>{t("Motivational quotes")}</option>
                            <option value={Categories.map}>{t("Map")}</option>
                            <option value={Categories.logo}>{t("Logo")}</option>
                            <option value={Categories.place}>{t("Place")}</option>
                            <option value={Categories.sport}>{t("Sport")}</option>
                            <option value={Categories.movie_cover}>{t("Movie cover")}</option>
                            <option value={Categories.mathematics}>{t("Mathematics")}</option>
                            <option value={Categories.other}>{t("Other")}</option>
                        </select>
                    </div>
                </section>
                <section>
                    <label htmlFor="limit__select" className="text">{t("Show on page")}</label>
                    <div className="controllers__wrapper">
                        <select id="limit__select" value={limit} onChange={(e) => setLimit(parseInt((e.target as HTMLSelectElement).value))}>
                            <option value={50}>{t("50 images")}</option>
                            <option value={75}>{t("75 images")}</option>
                            <option value={100}>{t("100 images")}</option>
                        </select>
                    </div>
                </section>

                <section>
                    <span className="text" >{t("Search")}</span>
                    <div className="controllers__wrapper">
                        <input type="text" onChange={(e) => setQuery((e.target as HTMLInputElement).value)}
                            value={query}
                            title={t("Search images by title")}
                            placeholder={t("Search images by title")}
                        />
                    </div>
                </section>
                <section>
                    <div className="controllers__wrapper">
                        <button type="submit">{t("Filter_verb")}</button>
                        <button type="button" onClick={() => resetFilters()}>{t("Reset filters")}</button>
                    </div>
                </section>
            </FiltersWrapper>
        </form>
    )
}
