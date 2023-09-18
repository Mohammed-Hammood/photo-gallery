import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export const HelmetElement = () => {
    const { t:t_ } = useTranslation('translation');
    const t = (text:string):string => t_(text)

    return (
        <Helmet>
            <title>{t("Photo gallery")} </title>
            <meta name='author' content='Mohammed' />
            <meta name='keywords' content={t('Photo gallery website')} />
        </Helmet>
    )
}

