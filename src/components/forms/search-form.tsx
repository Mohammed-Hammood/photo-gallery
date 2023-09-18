import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { InputElement } from "components";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { selectImages } from "store/selectors";
import { setImagesFilters } from "store/slicers/images";

interface Props {
    close: () => void;
}

export default function SearchForm({ close }: Props): JSX.Element {
    const { filters: { query } } = useAppSelector(selectImages);
    const dispatch = useAppDispatch();
    const [inputValue, setInputValue] = useState<string>(query);
    const { t: t_ } = useTranslation('translation');
    const t = (text: string): string => t_(text);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (inputValue.trim().length > 0) {
            dispatch(setImagesFilters({ key: 'query', value: inputValue }));
            close()
        }
    }
    const clearSearch = (): void => {
        dispatch(setImagesFilters({ key: 'query', value: '' }));
        close()
    }
    return (
        <form onSubmit={handleSubmit} className='container'>
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
                <button type='submit' className="primary">
                    {t("Search")}
                </button>
                <button type='button' onClick={clearSearch}>
                    {t("Clear")}
                </button>
            </div>
        </form>
    )
}