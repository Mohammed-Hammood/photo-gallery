import React, { useState } from "react";
import { ImagesFilters, ImageMagnifier, Loader, Modal, Pagination } from "components";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setImages, setImagesFilters } from "store/slicers/images";
import { ImageTypes } from "libs/types";
import { useFetch } from "components";
import { Endpoints } from "libs";
import { ImagesWrapper } from "styles/images";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { selectGlobal, selectImages, selectImagesByFilters } from "store/selectors";
import { setGlobalParams } from "store/slicers/global";


interface CallbackProps {
    data: {
        images_count: number;
        images: ImageTypes[];
    }
}

export default function ImagesPage() {
    const { images, images_count, filters } = useAppSelector(selectImages);
    const queryset = useAppSelector(selectImagesByFilters)
    const url = Endpoints.images(filters);
    const { t } = useTranslation("translation");
    const [activeImage, setActiveImage] = useState<ImageTypes | null>(null);

    const dispatch = useAppDispatch();
    const { limit, page } = filters;
    const max = limit * page;
    const min = (page - 1) * limit;
    const { filters: { direction }, search: SeachModal } = useAppSelector(selectGlobal)
    const callback = ({ data: { images_count, images } }: CallbackProps): void => {
        dispatch(setImages({ images_count: images_count, images: images }));
    }
    const { loading } = useFetch({ callback, url: images_count === 0 ? url : null });

    if (loading) return <Loader size={100} position="fixed" />
    return (<>
        <Helmet>
            <title>{t("Photo gallery")}</title>
        </Helmet>

        <ImagesWrapper className="images-page" >
            {direction === 'left' ?
                <div className={`left-content`}>
                    <ImagesFilters />
                </div>
                : null}
            <div className="center-content">
                {images_count > filters.limit ?
                    <Pagination
                        queryset={queryset}
                        totalCount={queryset.length}
                        setPage={(page: number) => dispatch(setImagesFilters({ key: 'page', value: page }))}
                        page={filters.page}
                        limit={filters.limit}
                    />
                    : null}
                <div className="images__wrapper">
                    {queryset.filter((item, index: number) => index < max && index >= min).map((image, index: number) => {
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
                    <ImagesFilters />
                </div>
                : null}
        </ImagesWrapper>
        <ImageMagnifier
            activeImage={activeImage}
            setActiveImage={setActiveImage}
            queryset={images}
        />
        <Modal isOpen={SeachModal.isVisible}
            title="Search"
            close={() => dispatch(setGlobalParams({ param: "search", key: "isVisible", value: false }))}
            form="search"
            closeButton={true}
        />

    </>)
}