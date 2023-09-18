import React, { Suspense, useEffect, useState } from 'react';
import { FormsNames, ModalTypes } from 'libs/types';
import { useTranslation } from 'react-i18next';
import { Loader, SVG } from 'components';
import 'styles/common/modal.scss';
import { Portal } from 'components/portal';

const Forms = React.lazy(() => import('../forms'));

interface Props {
    form: FormsNames
    isOpen: boolean;
    close: () => void;
    closeButton?: boolean;
    maxWidth?: ModalTypes['maxWidth'];
    darkLightMode?: ModalTypes['lightDarkMode'];
    fullScreen?: boolean;
    background?: string;
    border?: string;
    title?: string;
}


export function Modal(props: Props) {
    const { maxWidth, isOpen, closeButton, title, form, close, fullScreen, darkLightMode } = props;
    const [modal, setModal] = useState<ModalTypes>({ form: form, closeButton, title, maxWidth: maxWidth || "maxWidth600", fullScreen, lightDarkMode: darkLightMode });
    const { t, i18n } = useTranslation('translation');
    const rtl: boolean = ["ar", "arabic"].includes(i18n.language) ? false : true;
    const maxWidthRef = React.useRef(modal.maxWidth !== 'fullScreen' ? modal.maxWidth : "maxWidth600");

    useEffect(() => {
        const handleClick = (e: MouseEvent): void => {
            const target = e.target as HTMLDivElement;

            if (target.className.toString() === "modal")close();

        }

        document.addEventListener("click", handleClick);
        document.addEventListener('keyup', handleKeyUp);
        
        function handleKeyUp(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                e.preventDefault();
                close();
            }
        }
        
        return (): void => {
            document.removeEventListener("click", handleClick);
            document.removeEventListener('keyup', handleKeyUp);
        }

    }, [modal, isOpen, close]);


    if (isOpen)
        return (<Portal>
            <div className={`${modal.maxWidth} ${modal.lightDarkMode}`}>
                {modal.title || modal.closeButton || modal.fullScreen ?
                    <div className='header'>
                        <div>
                            {modal.title ?
                                <div className={`title ${rtl ? "capitalizeFirstLetter" : ""}`}><span>{t(modal.title)}</span></div>
                                : null}
                        </div>
                        <div>
                            <button onClick={() => setModal({ ...modal, lightDarkMode: modal.lightDarkMode === 'darkMode' ? "lightMode" : "darkMode" })} title={t(darkLightMode ? 'Light mode' : 'Dark mode') || ''}>
                                <SVG color="black" name="half-circle-stroke-solid" />
                            </button>
                            {modal.fullScreen === true ?
                                <button onClick={() => setModal({ ...modal, maxWidth: modal.maxWidth === 'fullScreen' ? maxWidthRef.current : "fullScreen" })} title={t('Full screen') || ''}>
                                    <SVG color="black" name={modal.maxWidth === 'fullScreen' ? "compress-solid" : 'expand-solid'} />
                                </button>
                                : null}

                            {modal.closeButton && <button
                                className='closeButton'
                                onClick={close}
                                title={t('Close the window') || ''}
                            >
                                <SVG color="black" name='xmark-solid' />
                            </button>
                            }
                        </div>
                    </div>
                    : null}
                <div className='body'>
                    <Suspense fallback={<Loader size={100} minHeight={200} />}>
                        <Forms modal={modal} setModal={setModal} props={props} {...{ close }} />
                    </Suspense>
                </div>
            </div>
        </Portal>

        )
    return null;
}