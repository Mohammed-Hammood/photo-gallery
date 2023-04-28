import React from "react";
import { SVG } from "components";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

interface WrapperProps {
    width?: string;
    height?: string;
    border?: string;
    enabled: boolean;
    borderWidth: number;
}
const Wrapper = styled.div<WrapperProps>`
    width: ${props => props.width ? props.width : "100%"};
    justify-content: center;
    display: flex;
    .radio__wrapper {
        display: flex;
        overflow: hidden;
        width:100%;
        justify-content: center;
        border:none;
        outline:none;
        align-items: center;
        padding:5px;
        button {
            &:active {
                max-width:104px;
            }
            width:100%;
            max-width: 100px;
            height:30px;
            padding:0;
            outline:none;
            display:flex;
            background-color:white;
            border:${({ border, enabled }) => border ? border : `1px solid  ${!enabled?"red":"var(--specialColor1)"}`};
            justify-content: ${({enabled})=> enabled?"flex-end":"flex-start"};
            cursor:pointer;
            border-radius:10px;
            span {
                width:30px;
                height:100%;
                border-radius:10px;
                background-color:red;
                display:flex;
                justify-content:center;
                align-items:center;
                background: ${({enabled})=> enabled?"var(--specialColor1)":"red"};
                svg {
                    width:14px;
                    height:14px;
                    path {
                        fill:white;
                    }
                }
            }
        }
    }
`;
interface Props {
    enabled: boolean;
    setEnabled: (value: boolean) => void;
    titleToEnable?: string;
    titleToDisable?: string;
    borderWidth?: number;
    width?: string;
}
export function RadioElement(props: Props): JSX.Element {
    const { enabled, setEnabled, titleToEnable, titleToDisable, borderWidth, width } = props;
    const { t:t_ } = useTranslation('translation');
    const t = (text:string):string => t_(text)

    return (
        <Wrapper {...{ enabled: props.enabled, borderWidth: borderWidth ? borderWidth : 1, width: width }}>
            <div className="radio__wrapper">
                <button
                    title={enabled ? t(titleToDisable || "Turn off") : t(titleToEnable || "Turn on")}
                    type="button" onClick={() => setEnabled(!enabled)}>
                    <span>
                        <SVG color={"white"} name={enabled ? "check-solid" : "xmark-solid"} />
                    </span>
                </button>
            </div>
        </Wrapper>
    )
}