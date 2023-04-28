import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import SVG from "../shared/svg";
interface WrapperProps {
    $buttonID: string;
    $minHeight?: string;
    $clearButtonMaxHeight: string;
    $clearButtonMargin: string;
}
const Wrapper = styled.div<WrapperProps>`
    width: 100%;
    display: flex;
    justify-content:center;
    flex-direction: column;
    .input__wrapper {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        button[id="${({ $buttonID }) => $buttonID}"]:hover {
            background: rgba(255,255, 255, 0.9);
            svg path {
                fill:black;
            }
        }
        button[id="${({ $buttonID }) => $buttonID}"] {
            border-radius: 50%;
            background: transparent;
            cursor: pointer;
            align-items: center;
            border:none;
            border-radius: 5px;
            outline:none;
            display: flex;
            justify-content: center;
            position: absolute;
            padding:11px;
            max-height: ${({ $clearButtonMaxHeight }) => $clearButtonMaxHeight};
            margin: ${({ $clearButtonMargin }) => $clearButtonMargin};
            svg {
                width:13px;
                height:13px;
            }
        }
        input {
            padding:0 10px;
            min-height: ${({ $minHeight }) => $minHeight ? $minHeight : "auto"};
            outline:1px solid var(--borderColor);
            border-radius: 5px;
            padding:5px 10px;
            border:none;
        }
        input:focus {
            outline:1px solid var(--specialColor1);
            
        }
    }
    .label__wrapper {
        width:100%;
        display: flex;
        justify-content: space-between;
        .length_counter {
            font-size:var(--fontSize12);
            color:rgba(0,0, 0, 0.5);
        }
    }
`
interface Props {
    placeholder?: string;
    title?: string;
    maxLength?: number;
    required?: boolean;
    onInput?: (value: string) => void;
    onFocus?: (value: any) => void;
    onKeyDown?: (value: any) => void;
    onChange?: (value: any) => void;
    value: string;
    labelInnerText?: string;
    minLength?: number;
    type?: "password" | "text" | "button" | "search" | "url" | "email";
    clearButton?: boolean;
    autoFocus?: boolean;
    counter?: boolean;
    minHeight?: string;
    clearButtonMaxHeight?: string;
    clearButtonMargin?: string;
    className?:string;
}
export default function InputElement(props: Props): JSX.Element {
    const { value, labelInnerText, title, placeholder, required } = props;
    const inputID = React.useId();
    const buttonID = React.useId();
    const { t:t_ } = useTranslation('translation');
    const t = (text:string):string => t_(text)
    const maxLength = props.maxLength !== undefined ? props.maxLength : 100;
    const minLength = props.minLength !== undefined ? props.minLength : 0;
    const type = props.type || "text";
    const className = props.className || "";
    const clearButton = props.clearButton !== undefined ? props.clearButton : true;
    const onFocus = props.onFocus ? props.onFocus : (): void => { }
    const autoFocus = props.autoFocus === true ? true : false;
    const counter = props.counter === false ? false : true;
    const clearButtonMaxHeight: string = props.clearButtonMaxHeight || "100%";
    const clearButtonMargin: string = props.clearButtonMargin || "0";
    const onChange = props.onChange ? props.onChange : (): void => { }
    const onInput = props.onInput ? props.onInput : (): void => { }
    const onKeyDwon = props.onKeyDown ? props.onKeyDown : (): void => { }
    return (
        <Wrapper $buttonID={buttonID} $minHeight={props.minHeight} $clearButtonMaxHeight={clearButtonMaxHeight} $clearButtonMargin={clearButtonMargin}>
            <div className="label__wrapper">
                <label htmlFor={inputID}>{t(labelInnerText || "")}
                    {required ?
                        <span className="red">*</span>
                        : null}
                </label>
                {counter ?
                    <span className="length_counter">{value.length}/{maxLength}</span>
                    : null}
            </div>
            <div className="input__wrapper">
                <input
                    type={type}
                    id={inputID}
                    autoFocus={autoFocus}
                    maxLength={maxLength}
                    title={t(title || "")}
                    required={required}
                    className={className}
                    minLength={minLength}
                    onKeyDown={(e)=> onKeyDwon((e.target as HTMLInputElement))}
                    value={value}
                    placeholder={t(placeholder || '')}
                    onInput={(e) => onInput((e.target as HTMLInputElement).value)}
                    onChange={(e) => onChange((e.target as HTMLInputElement).value)}
                    onFocus={(e) => onFocus(e)}
                ></input>
                {value.length > 0 && clearButton ?
                    <button id={buttonID} onClick={() => onInput("")} type="button">
                        <SVG color="silver" name="xmark-solid" />
                    </button>
                    : null}
            </div>
        </Wrapper>
    )
}