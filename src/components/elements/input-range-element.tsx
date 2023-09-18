import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

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
            input[type=range] {
                -webkit-appearance:none;
                width: 100%;
                outline:none;
                border:none;
            }
            input[type=range]::-ms-track, input[type=range]::-moz-range-track {
                cursor:pointer;
                outline:none;
                width:100%;
                padding:0;
                color:black;
                border:0.2px solid silver;
                box-shadow: 1px 1px 1px silver;
                background:var(--specialColor1);
                height:5px;
                border-radius:5px;
            }
            input[type=range]::-moz-range-track {
                cursor:pointer;
                outline:none;
                width:100%;
                padding:0;
                background-color:var(--specialColor1);
                background-color:white; //var(--specialColor1);
                color:black;
                height:5px;
                border:1px solid silver;
                border-radius:5px;
            }
          input[type=range]::-webkit-slider-thumb, input[type=range]::-moz-range-thumb, input[type=range]::-ms-thumb {
                -webkit-appearance:none;
                border:none;
                outline:none;
                background-color: var(--specialColor1);
                height:20px;
                width:15px;
            }
            input[type=range]::-moz-range-thumb{
                background-color: var(--specialColor1);
                outline:none;
                cursor:pointer;
                height:20px;
                border:none;
                border-radius: 2px;
                border-radius: 2px;
                width:15px;
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
    title?: string;
    max?: number;
    required?: boolean;
    onInput?: (value: number) => void;
    onFocus?: (value: any) => void;
    onChange?: (value: number) => void;
    value: number;
    labelInnerText?: string;
    min?: number;
    autoFocus?: boolean;
    counter?: boolean;
    minHeight?: string;
    clearButtonMaxHeight?: string;
    clearButtonMargin?: string;
}
export function InputRangeElement(props: Props): JSX.Element {
    const { value, labelInnerText, title,  required } = props;
    const inputID = React.useId();
    const buttonID = React.useId();
    const { t:t_ } = useTranslation('translation');
    const t = (text:string):string => t_(text)
    const max = props.max !== undefined ? props.max : 100;
    const min = props.min !== undefined ? props.min : 0;
    const onFocus = props.onFocus ? props.onFocus : (): void => { }
    const autoFocus = props.autoFocus === true ? true : false;
    const counter = props.counter === false ? false : true;
    const clearButtonMaxHeight: string = props.clearButtonMaxHeight || "100%";
    const clearButtonMargin: string = props.clearButtonMargin || "0";
    const onChange = props.onChange ? props.onChange : (): void => { }
    const onInput = props.onInput ? props.onInput : (): void => { }
    return (
        <Wrapper $buttonID={buttonID} $minHeight={props.minHeight} $clearButtonMaxHeight={clearButtonMaxHeight} $clearButtonMargin={clearButtonMargin}>
            <div className="label__wrapper">
                <label htmlFor={inputID}>{t(labelInnerText || "")}
                    {required ?
                        <span className="red">*</span>
                        : null}
                </label>
                {counter ?
                    <span className="length_counter">{value}/{max}</span>
                    : null}
            </div>
            <div className="input__wrapper">
                <input
                    type={'range'}
                    id={inputID}
                    autoFocus={autoFocus}
                    max={max}
                    title={t(title || "")}
                    required={required}
                    min={min}
                    value={value}
                    onInput={(e) => onInput((e.target as HTMLInputElement).valueAsNumber)}
                    onChange={(e) => onChange((e.target as HTMLInputElement).valueAsNumber)}
                    onFocus={(e) => onFocus(e)}
                />
            </div>
        </Wrapper>
    )
}