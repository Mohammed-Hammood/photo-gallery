import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content:center;
    flex-direction: column;
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
    value: string;
    labelInnerText?: string;
    minLength?: number;
    onChange?:(value:string)=> void;
}
export function TextareaElement(props: Props): JSX.Element {
    const { value, labelInnerText, title, placeholder } = props;
    const textareaId = React.useId();
    const { t:t_ } = useTranslation("translation");
    const t = (text:string):string => t_(text)

    const maxLength = props.maxLength !== undefined ? props.maxLength : 1000;
    const minLength = props.minLength !== undefined ? props.minLength : 0;
    const required = props.required !== undefined ? props.required : false;
    const onFocus = props.onFocus ? props.onFocus : (): void => { }
    const onInput = props.onInput ? props.onInput : (): void => { }
    const onChange = props.onChange ? props.onChange : (): void => { }
    return (
        <Wrapper>
            <div className="label__wrapper">
                <label htmlFor={textareaId}>
                    <span>{t(labelInnerText || "")}</span>
                    {required ?
                        <span className="red" title={required ? "Required" : ""}>*</span>
                        : null}
                </label>
                <span className="length_counter">{value.length}/{maxLength}</span>
            </div>
            <textarea
                id={textareaId}
                maxLength={maxLength}
                title={t(title || "")}
                required={required}
                minLength={minLength}
                value={value}
                onChange={(e)=> onChange((e.target as HTMLTextAreaElement).value)}
                placeholder={t(placeholder || '')}
                onInput={(e) => onInput((e.target as HTMLTextAreaElement).value)}
                onFocus={(e) => onFocus(e)}
            ></textarea>
        </Wrapper>
    )
}