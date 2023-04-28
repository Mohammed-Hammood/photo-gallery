import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { InputElement } from "components";

interface Props {
    query: string
    setQuery: (value: string) => void;
    setIsVisible: (value: boolean) => void;
}
export default function SearchForm(props: Props): JSX.Element {
    const { query, setQuery, setIsVisible } = props;
    const [inputValue, setInputValue] = useState<string>(query);
    const { t: t_ } = useTranslation('translation');
    const t = (text: string): string => t_(text)
    const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (inputValue.trim().length > 0) {
            setQuery(inputValue);
            setIsVisible(false);
            return navigate(`/search=${inputValue.replaceAll(' ', "+")}`)
        }
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)} className='container'>
            <div className='section'  >
                <label htmlFor='input-contact-search'> </label>
                <InputElement
                    onInput={setInputValue}
                    value={inputValue}
                    maxLength={100}
                    placeholder={'Search'}
                    autoFocus={true}
                />
            </div>
            <div className='buttons'>
                <button type='submit'>
                    {t("Search")}
                </button>
                <button type='button' onClick={() => setIsVisible(false)}>
                    {t("Close")}
                </button>
            </div>
        </form>
    )
}