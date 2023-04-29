import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

interface Props {
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
    setIsVisible: (value: boolean) => void;
}
export default function PaginationForm(props: Props) {
    const { totalPages, page, setPage, setIsVisible } = props;
    const { t:t_ } = useTranslation('translation');
    const t = (text:string):string => t_(text)
    const [value, setValue] = useState<number>(page)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (value >= 1 && value <= totalPages) {
            setPage(value);
            setIsVisible(false);
        }
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)} className='container'>
            <div>
                {t("Total pages")} {totalPages}
            </div>
            <div className='section' id='name-container'>
                <label htmlFor='input-page-number'> </label>
                <input id="input-page-number" value={value} onChange={e => setValue((e.target as HTMLInputElement).valueAsNumber)} required className='inputs' maxLength={page} minLength={1} type='number' />
            </div>
            <div className='buttons'>
                <button type='submit' className="primary">
                    {t("Move")}
                </button>
                <button type='button' onClick={() => setIsVisible(false)}>
                    {t("Cancel")}
                </button>
            </div>
        </form>)
}