import React, { useEffect, useRef, useState } from "react";
import { ControlPanel, ImageMagnifier, Loader, Modal, Pagination } from "components";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { resetImagesFilters, setImages, setImagesFilters } from "store/slicers/images";
import { ImageTypes } from "libs/types/images";
import { useFetch } from "components";
import { Endpoints } from "libs";
import { ImagesWrapper } from "styles/images";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";



interface CallbackProps {
    data: {
        images_count: number;
        images: ImageTypes[];
    }
}

export default function ImagesPage() {
    const { images, images_count, filters } = useAppSelector(state => state.images);
    const url = Endpoints.images(filters);
    const { t } = useTranslation("translation");
    const [activeImage, setActiveImage] = useState<ImageTypes | null>(null);
    const dispatch = useAppDispatch();
    const callback = ({ data: { images_count, images } }: CallbackProps): void => {
        dispatch(setImages({ images_count: images_count, images: images }));
    }
    const { setUrl, loading } = useFetch({ callback, url: images_count === 0 ? url : null });
    const [filtersModal, setFiltersModal] = useState<boolean>(false);
    const [addImageModal, setAddImageModal] = useState<boolean>(false);
    const [updateImageModal, setUpdateImageModal] = useState<{ isVisible: boolean, image?: ImageTypes }>({ isVisible: false });
    const filtersRef = useRef(filters)
    const changedFiltersCount = (): number => {
        let count: number = 0;
        if (filters.category !== 'all') count++;
        if (filters.query.trim() !== '') count++;
        return count;
    }
    const setFilters = (key: string, value: string | number | boolean): void => {
        dispatch(setImagesFilters({ key: key, value: value }));
        if (key !== 'page') {
            dispatch(setImagesFilters({ key: 'page', value: 1 }));
        }
    }

    useEffect(() => {
        if (JSON.stringify(filters) !== JSON.stringify(filtersRef.current)) {
            filtersRef.current = filters;
            setUrl(url);
        }
    }, [filters, images, filtersRef, url, setUrl]);
    if (loading) return <Loader size={100} position="fixed" />
    return (<>
        <Helmet>
            <title>{t("Photo gallery")}</title>
        </Helmet>
        <ImageMagnifier
            activeImage={activeImage}
            setActiveImage={setActiveImage}
            setUpdateImageModal={setUpdateImageModal}
            queryset={images}
        />
        <ImagesWrapper className="images-page">
            <div className="control_panel__wrapper">
                <ControlPanel
                    keyValue={[{ key: "Total", value: images_count }]}
                    order={filters.order}
                    setOrder={(value: string) => setFilters('order', value)}
                    buttons={[
                        { callback: () => setFiltersModal(true), iconName: "sliders-solid", maxWidth: "50%", iconColor: "black", title: "Filters" },

                        {
                            callback: () => changedFiltersCount() > 0 ? dispatch(resetImagesFilters()) : {},
                            innerText: `Reset filters${changedFiltersCount() > 0 ? "(" + changedFiltersCount() + ")" : ""}`,
                            title: "Reset filters", maxWidth: "50%", minWidth: "140px"
                        },
                    ]}
                />
            </div>
            {images_count > filters.limit ?
                <Pagination
                    queryset={images}
                    totalCount={images_count}
                    setPage={(page: number) => setFilters("page", page)}
                    page={filters.page}
                    limit={filters.limit}
                />
                : null}
            <div className="images__wrapper">
                {images && images.filter(item => item.allowed_users === 'all').map((image, index: number) => {
                    return (
                        <div key={index} className="image">
                            <img src={image.cdn} alt="" onClick={() => setActiveImage(image)} />
                        </div>
                    )
                })}
            </div>
        </ImagesWrapper>

        <Modal
            setIsVisible={setFiltersModal}
            isVisible={filtersModal}
            form="images-filters"
            closeButton={true}
            title="Filters"
            {...{
                order: filters.order,
                limit: filters.limit,
                query: filters.query,
                setLimit: (limit: number) => setFilters("limit", limit),
                setOrder: (order: string) => setFilters("order", order),
                setQuery: (query: string) => setFilters("query", query)
            }}
        />
        <Modal
            setIsVisible={setAddImageModal}
            isVisible={addImageModal}
            form="add-edit-image"
            closeButton={true}
            title="Add new image"
        />
        <Modal
            setIsVisible={(value: boolean) => setUpdateImageModal({ isVisible: value })}
            isVisible={updateImageModal.isVisible}
            form="add-edit-image"
            closeButton={true}
            title="Edit image"
            {...{ image: updateImageModal.image }}
        />
    </>)
}