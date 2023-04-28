import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ImageTypes } from "libs/types";
import { useTranslation } from "react-i18next";
import { SVG } from "components";

interface Props {
    queryset?: ImageTypes[] | null;
    activeImage: ImageTypes | null;
    info?: boolean;
    slider?: boolean;
    setActiveImage: (image: ImageTypes | null) => void;
    setUpdateImageModal?: ({ isVisible }: { isVisible: boolean, image?: ImageTypes }) => void;
}

interface WrapperProps {
    $rotation: number;
    imageWidth: number;
}
const Wrapper = styled.div<WrapperProps>`
    position:absolute;
    .blur {
        backdrop-filter: blur(5px);
    }
    .dark {
        background: rgba(0, 0, 0, 0.8);
    }
    @keyframes ImagesSlider {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
.images-slider {
    width:100%;
    height: 100%;
    position: fixed;
    top:0;
    flex-direction: column;
    left:0;
    z-index: 1000;
    display:flex;
    justify-content: center;
    align-items: center;
    padding:10px;
    animation:ImagesSlider 1s linear 1;
    img {
        width: ${props => props.imageWidth + "%"};
        height:auto;
        transform: rotate(${props => props.$rotation + "deg"});
        cursor:zoom-out;
    }
    .controllers__wrapper:hover {
        opacity: 1;
    }
    .images__wrapper {
        display:flex;
        justify-content: flex-start;
        align-items: center;
        width:99%;
        margin:auto;
        flex-direction: row;
        flex-wrap: nowrap;
        height:80px;
        overflow-x:auto;
        gap:15px;
        top:0;
        padding:2px 10px;
        position:fixed;
        background:black;
        .active {
            outline:1px solid black;
            box-shadow: 0 0 20px white;
        }
        img {
            height: calc(100% - 5px);
            width:auto;
            transform: rotate(0deg);
            cursor: zoom-in;
        }
    }

    &__information {
        width:100%;
        position: fixed;
        bottom: 50px;
        color:white;
        justify-content: center;
        align-items: center;
        display:flex;
        padding:10px;
        flex-direction: column;
        gap:10px;
        div {
            background: white;
            padding:10px;
            color:black;
            max-width:800px;
            border-radius:5px;
            width:100%;
            box-shadow:0 0 2px white;
            gap:5px;
            display: flex;
        }
    }
    .controllers__wrapper {
        position: fixed;
        bottom:15px;
        display:flex;
        justify-content: center;
        align-items: center;
        opacity: 0.7;
        gap:10px;
        z-index: inherit;

        div:hover {
            box-shadow: 0 0 10px white;
        }
        div {
            border-radius: 5px;
            overflow: hidden;
            display:flex;
            justify-content: center;
            align-items: center;
            button:hover {
                background:white;
                color:black;
                svg path {
                    fill:black;
                }
            }
            button {
                display:flex;
                justify-content: center;
                align-items: center;
                background:black;
                color:white;
                cursor:pointer;
                outline:0;
                border:0;
                height:30px;
                padding:0 10px;
                svg {
                    height: 15px;
                    width:15px;
                }
            }
        }
    }
    @media screen and (max-width:750px) {
        .controllers__wrapper {
            gap:4px;
        }
    }
}
`
export default function ImageMagnifier(props: Props) {
    const { queryset, activeImage, setActiveImage, setUpdateImageModal } = props;
    const { t: t_ } = useTranslation('translation');
    const t = (text: string): string => t_(text)
    const [background, setBackground] = useState<"blur" | "dark">("blur");
    const [imageWidth, setImageWidth] = useState<number>(100);
    const [imageRotation, setImageRotation] = useState<number>(0);
    const [info, setInfo] = useState<boolean>(props.info !== undefined ? props.info : false);
    const [slider, setSlider] = useState<boolean>(props.slider !== undefined ? props.slider : true);
    // const Authentication = useAppSelector(selectAuthentication);
    const handleImagesSlider = (action: "+" | "-"): void => {
        if (queryset) {
            const activeImageIndex = queryset.findIndex(({ id }) => id === activeImage?.id)
            const index = action === '+' ? 1 : -1;
            if (activeImageIndex !== -1 && (index + activeImageIndex >= 0 && index + activeImageIndex < queryset.length)) {
                setActiveImage(queryset[activeImageIndex + index]);
                document.getElementById((activeImageIndex).toString())?.scrollIntoView();
            }
        }
    }
    // const downloadImage = (): void => {
    //     if (activeImage) {
    //         const anchorEl = (document.createElement('a') as HTMLAnchorElement);
    //         anchorEl.href = activeImage.cdn;
    //         anchorEl.download = activeImage.title;
    //         anchorEl.target = "__blank";
    //         document.body.appendChild(anchorEl);
    //         anchorEl.click();
    //         anchorEl.remove();
    //     }
    // }
    useEffect(() => {
        const body = document.body as HTMLBodyElement;
        document.onkeydown = function (e) {
            if (e.key === 'ArrowRight') {
                handleImagesSlider('+');
            }
            else if (e.key === 'ArrowLeft') {
                handleImagesSlider('-');
            }
            else if (e.key === '-' || e.key === 'ArrowDown') {
                setImageWidth(imageWidth > 10 ? imageWidth - 5 : imageWidth);
                if (activeImage) e.preventDefault();
            }
            else if (e.key === '+' || e.key === 'ArrowUp') {
                setImageWidth(imageWidth < 150 ? imageWidth + 5 : imageWidth)
                if (activeImage) e.preventDefault();
            } else if (e.key === 'Escape') {
                body.style.overflowY = 'auto';
                setActiveImage(null);
            } else if (e.key === 'Backspace') {
                setImageWidth(90)
            }
        }
        document.oncontextmenu = function (e) {
            if ((e.target as HTMLElement).tagName === 'IMG') e.preventDefault();
        }
        document.onwheel = function (e) {
            const zoomOut = imageWidth > 10 ? imageWidth - 5 : imageWidth
            const zoomIn = imageWidth < 150 ? imageWidth + 5 : imageWidth
            setImageWidth(e.deltaY < 0 ? zoomIn : zoomOut);
        }
        if (activeImage) {
            body.style.overflowY = 'hidden';
        }
        if (activeImage && queryset && queryset.length > 0) {
            const image = document.querySelector(`#image_${activeImage.id}`) as HTMLImageElement;
            image.scrollIntoView();
        }
    }, [activeImage, imageWidth, setActiveImage, queryset]);
    if (!activeImage) return null;
    return (
        <Wrapper imageWidth={imageWidth} $rotation={imageRotation}>
            <section className={"images-slider " + background} id="images-slider-wrapper">
                <img alt="" src={activeImage.cdn} onClick={() => { setActiveImage(null); document.body.style.overflowY = 'auto'; }} />
                {queryset && slider ?
                    <div className="images__wrapper">
                        {queryset.map((image, index: number) => {
                            return (
                                <img
                                    key={index}
                                    src={image.cdn}
                                    alt=''
                                    className={image.id === activeImage.id ? "active" : ""}
                                    onClick={() => { setActiveImage(image) }}
                                    id={`image_${image.id}`} />
                            )
                        })}
                    </div>
                    : null}
                {info ? <>
                    <div className="images-slider__information">
                        {activeImage.title.length > 0 ?
                            <div>{activeImage.title}</div>
                            : null}
                        {activeImage.description && activeImage.description.trim().length > 0 ?
                            <div>{activeImage.description}</div>
                            : null}
                        {activeImage.source && activeImage.source.trim().length > 0 ?
                            <div>{t("Source")}:
                                <a href={activeImage.source} target={"_blank"} rel={'noreferrer'}>{activeImage.source}</a>
                            </div>
                            : null}
                    </div>
                </>
                    : null}
                <div className="controllers__wrapper">
                    <div>

                        <button type="button" onClick={() => setInfo(!info)} title={t(info ? "Hide image info" : "Show image info")}>
                            <SVG name="info-solid" color="white" />
                        </button>
                        {queryset && queryset.length > 0 ?
                            <button type="button" onClick={() => setSlider(!slider)} title={t(slider ? "Hide images slider" : "Show images slider")}>
                                <SVG name="images-solid" color="white" />
                            </button>
                            : null}

                    </div>
                    <div>
                        <button type="button" onClick={() => setBackground(background === "blur" ? "dark" : "blur")} title={t('Blur background/dark background')}>
                            <SVG name="half-circle-stroke-solid" color="white" />
                        </button>
                        <button type="button" onClick={() => setImageRotation(imageRotation + 90)} title={t("Rotate the image")}>
                            <SVG name="rotate-right-solid" color="white" />
                        </button>
                    </div>
                    <div>
                        <button type="button" onClick={() => setImageWidth(imageWidth > 10 ? imageWidth - 5 : imageWidth)} title={t("Zoom out")}>
                            <SVG color="white" name="magnifying-glass-minus-solid" />
                        </button>
                        <button type="button" onClick={() => setImageWidth(imageWidth < 150 ? imageWidth + 5 : imageWidth)} title={t("Zoom in")}>
                            <SVG color="white" name="magnifying-glass-plus-solid" />
                        </button>
                    </div>
                    {queryset ?
                        <div>
                            <button type="button" onClick={() => handleImagesSlider("-")} title={t("Previous image")}>
                                <SVG color="white" name="arrow-left" />
                            </button>
                            <button type="button" onClick={() => handleImagesSlider("+")} title={t("Next image")}>
                                <SVG color="white" name="arrow-right" />
                            </button>
                        </div>
                        : null}
                </div>
            </section>
        </Wrapper>)
}