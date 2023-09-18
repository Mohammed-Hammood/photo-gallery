import React from "react";
import { resetImagesFilters, setImagesFilters } from "store/slicers/images";
import { useTranslation } from "react-i18next";
import { FiltersWrapper } from "styles/filters";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { Categories } from "libs";
import { SVG } from "components";
import { selectImages } from "store/selectors";
import { setGlobalParams } from "store/slicers/global";


export function ImagesFilters(): JSX.Element {
    const { t: t_ } = useTranslation('translation');
    const t = (text: string): string => t_(text);
    const { filters, images_count } = useAppSelector(selectImages);
    const { query, category, limit, order } = filters;
    const dispatch = useAppDispatch();
    const resetFilters = (): void => {
        dispatch(resetImagesFilters());
    }
    const changedFiltersCount = (): number => {
        let count: number = 0;
        if (filters.category !== 'all') count++;
        if (filters.query.trim() !== '') count++;
        return count;
    }
    const setFilters = ({ key, value }: { key: string, value: number | string | boolean }): void => {
        dispatch(setImagesFilters({ key: key, value: value }));
    }
    const setDirection = (direction: "right" | "left" | "top"): void => {
        dispatch(setGlobalParams({ param: "filters", key: "direction", value: direction }))
    }
    return (
        <FiltersWrapper>
            <section id='filters_direction_section'>
                <label className="text" htmlFor='order'>{t("Direction")}</label>
                <div className="controllers__wrapper">
                    <button type="button" onClick={() => setDirection("left")}>
                        <SVG name="angle-left" color="black" />
                    </button>
                    <button type="button" onClick={() => setDirection("right")}>
                        <SVG name="angle-right" color="black" />
                    </button>
                </div>
            </section>
            <section>
                <label className="text" htmlFor='order'>{t("Total")}</label>
                <div className="controllers__wrapper">
                    <div className="text">{images_count}</div>
                </div>
            </section>
            <section>
                <label className="text" htmlFor='order'>{t("Order")}</label>
                <div className="controllers__wrapper">
                    <button type="button" onClick={() => setFilters({ key: "order", value: order === "id" ? "-id" : "id" })}>
                        <SVG name={`angle-${order === "id" ? 'up' : 'down'}`} color="black" />
                    </button>
                </div>
            </section>
            <section>
                <label htmlFor="category__select" className="text">{t("Category")}</label>
                <div className="controllers__wrapper">
                    <select id="category__select" className="left" value={category} onChange={(e) => setFilters({ key: "category", value: (e.target as HTMLSelectElement).value })}>
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
                    <select id="limit__select" value={limit} onChange={(e) => setFilters({ key: "limit", value: parseInt((e.target as HTMLSelectElement).value) })}>
                        <option value={50}>{t("50 images")}</option>
                        <option value={75}>{t("75 images")}</option>
                        <option value={100}>{t("100 images")}</option>
                    </select>
                </div>
            </section>

            <section>
                <span className="text" >{t("Search")}</span>
                <div className="controllers__wrapper">
                    <input type="text" onFocus={() => dispatch(setGlobalParams({ param: "search", key: "isVisible", value: true }))}
                        value={query}
                        title={t("Search images by title")}
                        readOnly={true}
                        placeholder={t("Search images by title")}
                    />

                </div>
            </section>
            <section>
                <div className="controllers__wrapper">
                    <button type="button" onClick={resetFilters}>
                        {t("Reset filters")}
                        {changedFiltersCount() ?
                            <span id="ChangedCountWrapper">{changedFiltersCount()}</span>
                            : null}
                    </button>
                </div>
            </section>
        </FiltersWrapper>
    )
}
