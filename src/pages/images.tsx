import React, { useEffect, useRef, useState } from "react";
import { Filters, ImageMagnifier, Loader, Modal, Pagination } from "components";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setImages, setImagesFilters } from "store/slicers/images";
import { ImageTypes } from "libs/types";
import { useFetch } from "components";
import { Endpoints } from "libs";
import { ImagesWrapper } from "styles/images";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { selectGlobal, selectImages } from "store/selectors";
import { setGlobalParams } from "store/slicers/global";


interface CallbackProps {
    data: {
        images_count: number;
        images: ImageTypes[];
    }
}

export default function ImagesPage() {
    const { images, images_count, filters } = useAppSelector(selectImages);
    const url = Endpoints.images(filters);
    const { t } = useTranslation("translation");
    const [activeImage, setActiveImage] = useState<ImageTypes | null>(null);
    const dispatch = useAppDispatch();
    const { filters: { direction }, search: SeachModal } = useAppSelector(selectGlobal)
    const callback = ({ data: { images_count, images } }: CallbackProps): void => {
        dispatch(setImages({ images_count: images_count, images: images }));
    }
    const { setUrl, loading } = useFetch({ callback, url: images_count === 0 ? url : null });
    const filtersRef = useRef(filters)

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

        <ImagesWrapper className="images-page" >
            {direction === 'left' ?
                <div className={`left-content`}>
                    <Filters />
                </div>
                : null}
            <div className="center-content">
                {images_count > filters.limit ?
                    <Pagination
                        queryset={images}
                        totalCount={images_count}
                        setPage={(page: number) => dispatch(setImagesFilters({ key: 'page', value: page }))}
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
            </div>
            {direction === 'right' ?
                <div className={`right-content`}>
                    <Filters />
                </div>
                : null}
        </ImagesWrapper>
        <ImageMagnifier
            activeImage={activeImage}
            setActiveImage={setActiveImage}
            queryset={images}
        />
        <Modal isVisible={SeachModal.isVisible}
            title="Search"
            setIsVisible={(value: boolean) => dispatch(setGlobalParams({ param: "search", key: "isVisible", value: value }))}
            form="search"
            closeButton={true}
        />
     
    </>)
}