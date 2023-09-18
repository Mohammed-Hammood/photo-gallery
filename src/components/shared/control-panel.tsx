import React from "react";
import { useTranslation } from "react-i18next";
import { SVG } from "components";
import styled from "styled-components";

interface ButtonProps {
    $minWidth?: string;
    $maxWidth?: string;
}
interface ControlPanelProps {
    $fontSize?: number
    $btnPadding?: string
    $title__wrapperPadding?: string
}

const Wrapper = styled.div<ControlPanelProps>`
            display: flex;
            justify-content: space-between;
            align-items:center; 
            background-color: inherit;
            gap: 10px;
            width:100%;
            .content__wrapper {
                border-radius: 4px;
                display: flex;
                border: 1px solid #477fea;
                align-items: center;
                height:40px;
                width:100%;
                justify-content: flex-start;
                background-color: #477fea;
                overflow: hidden;
                .title__wrapper, .text__wrapper, .keyValue__wrapper{
                    color:white;
                    height:100%;
                    border:none;
                    padding:10px;
                    background-color:#477fea;
                    display:flex;
                    justify-content:center;
                    min-width: 88px;
                    width:100%;
                    align-items:center;
                }
                .inputs__wrapper {
                        display: flex;
                        justify-content: space-between;
                        width:100%;
                        height : 40px;
                        select:hover, button:hover, .button:hover {
                            background-color:#477fea;
                            color:white;
                            svg path {
                                fill:white;
                            }
                        }
                        button, select, .button {
                            outline: none;
                            background-color: white;
                            cursor: pointer;
                            display: flex;
                            align-items:center;
                            justify-content: center;
                            border: none;
                            outline: none;
                            padding:"12px 10px";
                            color: black;
                            width:100%;
                            svg {
                                height:14px;
                            }
                    }
                   
                }
                .text__wrapper {
                    background-color: white;
                    color:black;
                    width:100%;
                }
                .keyValue__wrapper {
                    min-width:auto;
                    &_value, &_key {
                        background-color: white;
                        height:100%;
                        width:100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding:5px;
                    }
                    &_key {
                        background-color: var(--specialColor1);
                        color:white;
                    }
                }
               
            }
    @media screen and (max-width:600px){
        gap:0;
        flex-direction: column;
        flex-wrap:nowrap;
        justify-content: center;
        gap:8px;
        height:auto;
        background-color: inherit;
        border:none;
        .content__wrapper {
            flex:1 1 44%;
            justify-content: space-between;
            overflow: hidden;
            border:1px solid rgba(88,88,88, 0.1);
            .title__wrapper {
                min-width: 78px;
            }
            .inputs__wrapper {
                display: flex;
                justify-content: space-between;
                background-color: white;
                input, button, select, .button {
                    background-color:white;
                    height: 100%;
                   
                }
                input, select {
                    width:100%;
                }
            }
        }
    }
`;
const CustomButton = styled.button<ButtonProps>`
        outline: none;
        background-color: white;
        cursor: pointer;
        display: flex;
        align-items:center;
        justify-content: center;
        border: none;
        outline: none;
        padding:"12px 10px";
        color: black;
        width:100%;
        min-width: ${props => props.$minWidth ? props.$minWidth : "auto"};
        max-width: ${props => props.$maxWidth ? props.$maxWidth : "auto"};
`;
interface CustomButtonTypes {
    callback: (value?: any) => void;
    title?: string;
    innerText?: string;
    iconName?: string;
    iconColor?: string;
    minWidth?: string;
    maxWidth?: string;
    authentication?: boolean;
}
interface KeyValueTypes {
    key?: any;
    value: any;
}
interface Props {
    setOrder?: (sort: string) => void;
    order?: string;
    keyValue?: KeyValueTypes[];
    buttons?: CustomButtonTypes[];

}
export const ControlPanel: React.FC<Props> = (props: Props): JSX.Element => {
    const { buttons, order, setOrder, keyValue } = props;
    const { t: t_ } = useTranslation('translation');
    const t = (text: string): string => t_(text)

    return (<>
        <Wrapper>
            {buttons ?
                <div className="content__wrapper">
                    <div className="inputs__wrapper">
                        {buttons.filter((button) => button.authentication === undefined || button.authentication).map((button, index: number) => {
                            return (
                                <CustomButton $maxWidth={button.maxWidth} $minWidth={button.minWidth} key={index} onClick={() => button.callback()} title={t(button.title ? button.title : "")}>
                                    {button.innerText ? t(button.innerText) : ""}
                                    {button.iconName ?
                                        <SVG name={button.iconName} color={button.iconColor ? button.iconColor : "black"} />
                                        : null}
                                </CustomButton>
                            )
                        })}
                    </div>
                </div>
                : null}
            {order && (typeof setOrder === 'function') ?
                <div className="content__wrapper">
                    <label htmlFor="order__by__id" className="title__wrapper">{t("Order")}</label>
                    <div className="inputs__wrapper">
                        <button id="order__by__id" onClick={() => setOrder(order === 'id' ? '-id' : 'id')} type={'button'}>
                            <SVG name={`angle-${order === "id" ? 'up' : 'down'}`} color="black" />
                        </button>
                    </div>
                </div>
                : null}


            {keyValue ? <>{
                keyValue.map((item, index) => {
                    return (
                        <div className="content__wrapper keyValue__wrapper" key={index}>
                            {item.key ?
                                <div className="keyValue__wrapper_key">{typeof item.key === 'string' ? t(item.key) : item.key}</div>
                                : null}
                            <div className="keyValue__wrapper_value">{typeof item.value === 'string' ? t(item.value) : item.value}</div>
                        </div>
                    )
                })
            }
            </> : null}
        </Wrapper>
    </>
    )
}