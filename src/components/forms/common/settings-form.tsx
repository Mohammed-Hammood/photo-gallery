import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useTranslation } from 'react-i18next';
import { setGlobalParams } from "store/slicers/global";
import styled from "styled-components";
import { ColorsOptions } from "components";

const Form = styled.form`
        display:flex;
        flex-direction: column;
    .row-content:not(:first-child){
        border-top:1px solid lightgray;
    }
    .row-content {
        display:flex;
        flex-direction: row;
        width:100%;
        .first-content {
            flex:1 1 50%; 
            display:flex;
            align-items:center;
        }
        .second-content {
            flex:1 1 50%;
            select, button {
                width:100%;
                border:none;
                padding:10px;
                background-color: inherit;
                cursor:pointer;
                &:focus {
                    outline:1px solid blue;
                }
            }
        }
        .flexRow {
            display: flex;
            justify-content: space-between;
            .active {
                background:var(--specialColor1);
                color:white;
            }
        }

    }
`;

interface Props {
    setIsVisible: (value: boolean) => void;
}
export default function SettingsForm(props: Props) {
    const { setIsVisible } = props;
    const { t:t_ } = useTranslation('translation');
    const t = (text:string):string => t_(text)
    const global = useAppSelector(state => state.global);
    const dispatch = useAppDispatch();
    const [active, setActive] = useState<"header" | "general" | "footer" | "sidebar">("general")
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsVisible(false);
    }
    const resetSettings = (): void => {
        dispatch(setGlobalParams({ param: "body", key: "fontFamily", value: "times new roman" }));
        dispatch(setGlobalParams({ param: "header", key: "color", value: "white" }));
        dispatch(setGlobalParams({ param: "header", key: "backgroundColor", value: "black" }));
        dispatch(setGlobalParams({ param: "header", key: "marginsColor", value: "red" }));
        dispatch(setGlobalParams({ param: "header", key: "opacity", value: 80 }));
        dispatch(setGlobalParams({ param: "footer", key: "backgroundColor", value: "black" }));
        dispatch(setGlobalParams({ param: "footer", key: "color", value: "white" }));
        dispatch(setGlobalParams({ param: "footer", key: "marginsColor", value: "red" }));
        dispatch(setGlobalParams({ param: "footer", key: "opacity", value: 90 }));
        dispatch(setGlobalParams({ param: "progressBar", key: "backgroundColor", value: "red" }));
        dispatch(setGlobalParams({ param: "progressBar", key: "isVisible", value: true }));
        dispatch(setGlobalParams({ param: "scrollToTop", key: "isVisible", value: true }));
    }

    return (
        <Form onSubmit={(e) => handleSubmit(e)} className='container'>
            <div className="row-content">
                <div className="second-content flexRow">
                    <button type="button" className={active === "general" ? "active" : ""} onClick={() => setActive('general')} title={t("General")}>{t("General")}</button>
                    <button type="button" className={active === "header" ? "active" : ""} onClick={() => setActive('header')} title={t("Header")}>{t("Header")}</button>
                    <button type="button" className={active === "footer" ? "active" : ""} onClick={() => setActive('footer')} title={t("Footer")}>{t("Footer")}</button>
                </div>
            </div>
            {active === 'general' ? <>
                <div className="row-content">
                    <div className="first-content">
                        <span>{t("Scroll to top button")}</span>
                    </div>
                    <div className="second-content">
                        <button type="button" onClick={() => dispatch(setGlobalParams({ param: "scrollToTop", key: "isVisible", value: !global.scrollToTop.isVisible }))} title={t("Hide/Show scroll to top button")}>
                            {global.scrollToTop.isVisible ? t("Hide") : t("Show")}
                        </button>
                    </div>
                </div>
                
                <div className="row-content">
                    <div className="first-content">
                        <span>{t("Font family")}</span>
                    </div>
                    <div className="second-content">
                        <select className="settings-select" value={global.body.fontFamily} onChange={(e) => dispatch(setGlobalParams({ param: "body", key: "fontFamily", value: (e.target as HTMLSelectElement).value }))}>
                            <option value="times new roman">{("Time new roman")}</option>
                            <option value="sans-serif">{("Sans serif")}</option>
                            <option value="Noto Sans Arabic">{("Noto Sans Arabic")}</option>
                            <option value="Helvetica Neue">{("Helvetica Neue")}</option>
                            <option value="-apple-system">{("-apple-system")}</option>
                            <option value="Segoe UI">{("Segoe UI")}</option>
                            <option value="BlinkMacSystemFont">{("BlinkMacSystemFont")}</option>
                            <option value="Droid Sans">{("Droid Sans")}</option>
                            <option value="Oxygen">{("Oxygen")}</option>
                            <option value="Fira Sans">{("Fira Sans")}</option>
                            <option value="Cantarell">{("Cantarell")}</option>
                            <option value="Ubuntu">{("Ubuntu")}</option>
                            <option value="Roboto">{("Roboto")}</option>
                        </select>
                    </div>
                </div>
                <div className="row-content">
                    <div className="first-content">
                        <span >{t("Progress bar background color")}</span>
                    </div>
                    <div className="second-content">
                        <select className="settings-select" value={global.progressBar.backgroundColor} onChange={(e) => dispatch(setGlobalParams({ param: "progressBar", key: "backgroundColor", value: (e.target as HTMLSelectElement).value }))}>
                            <ColorsOptions />
                        </select>
                    </div>
                </div>
                <div className="row-content">
                    <div className="first-content">
                        <span >{t("Progress bar visibility")}</span>
                    </div>
                    <div className="second-content">
                        <button type="button" onClick={() => dispatch(setGlobalParams({ param: "progressBar", key: "isVisible", value: !global.progressBar.isVisible }))} title={t("Hide/Show progress bar")}>
                            {global.progressBar.isVisible ? t("Hide") : t("Show")}
                        </button>
                    </div>
                </div>
            </> : null}
            {active === "header" ? <>

                <div className="row-content">
                    <div className="first-content">
                        <span >{t("Background color")}</span>
                    </div>
                    <div className="second-content">
                        <select className="settings-select" value={global.header.backgroundColor} onChange={(e) => dispatch(setGlobalParams({ param: "header", key: "backgroundColor", value: (e.target as HTMLSelectElement).value }))}>
                            <ColorsOptions />
                        </select>
                    </div>
                </div>
                <div className="row-content">
                    <div className="first-content">
                        <span >{t("Font color")}</span>
                    </div>
                    <div className="second-content">
                        <select className="settings-select" value={global.header.color} onChange={(e) => dispatch(setGlobalParams({ param: "header", key: "color", value: (e.target as HTMLSelectElement).value }))}>
                            <ColorsOptions />
                        </select>
                    </div>
                </div>
                <div className="row-content">
                    <div className="first-content">
                        <span >{t("Margins color")}</span>
                    </div>
                    <div className="second-content">
                        <select className="settings-select" value={global.header.marginsColor} onChange={(e) => dispatch(setGlobalParams({ param: "header", key: "marginsColor", value: (e.target as HTMLSelectElement).value }))}>
                            <ColorsOptions />
                        </select>
                    </div>
                </div>
                <div className="row-content">
                    <div className="first-content">
                        <span >{t("Opacity")}</span>
                    </div>
                    <div className="second-content">
                        <select className="settings-select" value={global.header.opacity} onChange={(e) => dispatch(setGlobalParams({ param: "header", key: "opacity", value: parseInt((e.target as HTMLSelectElement).value) }))}>
                            <option value={10}>{t("10%")}</option>
                            <option value={20}>{t("20%")}</option>
                            <option value={30}>{t("30%")}</option>
                            <option value={40}>{t("40%")}</option>
                            <option value={50}>{t("50%")}</option>
                            <option value={60}>{t("60%")}</option>
                            <option value={70}>{t("70%")}</option>
                            <option value={80}>{t("80%")}</option>
                            <option value={90}>{t("90%")}</option>
                            <option value={100}>{t("100%")}</option>
                        </select>
                    </div>
                </div>
            </> : null}

            {active === 'footer' ? <>
                <div className="row-content">
                    <div className="first-content">
                        <span >{t("Background color")}</span>
                    </div>
                    <div className="second-content">
                        <select className="settings-select" value={global.footer.backgroundColor} onChange={(e) => dispatch(setGlobalParams({ param: "footer", key: "backgroundColor", value: (e.target as HTMLSelectElement).value }))}>
                            <ColorsOptions />
                        </select>
                    </div>
                </div>
                <div className="row-content">
                    <div className="first-content">
                        <span >{t("Font color")}</span>
                    </div>
                    <div className="second-content">
                        <select className="settings-select" value={global.footer.color} onChange={(e) => dispatch(setGlobalParams({ param: "footer", key: "color", value: (e.target as HTMLSelectElement).value }))}>
                            <ColorsOptions />
                        </select>
                    </div>
                </div>
                <div className="row-content">
                    <div className="first-content">
                        <span >{t("Margins color")}</span>
                    </div>
                    <div className="second-content">
                        <select className="settings-select" value={global.footer.marginsColor} onChange={(e) => dispatch(setGlobalParams({ param: "footer", key: "marginsColor", value: (e.target as HTMLSelectElement).value }))}>
                            <ColorsOptions />
                        </select>
                    </div>
                </div>
                <div className="row-content">
                    <div className="first-content">
                        <span >{t("Opacity")}</span>
                    </div>
                    <div className="second-content">
                        <select className="settings-select" value={global.footer.opacity} onChange={(e) => dispatch(setGlobalParams({ param: "footer", key: "opacity", value: parseInt((e.target as HTMLSelectElement).value) }))}>
                            <option value={10}>{t("10%")}</option>
                            <option value={20}>{t("20%")}</option>
                            <option value={30}>{t("30%")}</option>
                            <option value={40}>{t("40%")}</option>
                            <option value={50}>{t("50%")}</option>
                            <option value={60}>{t("60%")}</option>
                            <option value={70}>{t("70%")}</option>
                            <option value={80}>{t("80%")}</option>
                            <option value={90}>{t("90%")}</option>
                            <option value={100}>{t("100%")}</option>
                        </select>
                    </div>
                </div>
            </> : null}
            <div className='buttons-container'>
                <button type='submit'>
                    {t("Save")}
                </button>
                <button type='button' onClick={() => resetSettings()}>
                    {t("Reset settings")}
                </button>
            </div>
        </Form>
    )
}