import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { SVG } from "components";

const Container = styled.div`
    .content {
        width:100%;
        display: flex;
        justify-content: space-between;
        gap:5px;
    }
`;
interface Props {
    $selectedLanguage: boolean
}
const Button = styled.button<Props>`
    border:none;
    padding:10px;
    border-radius:5px;
    background:transparent;
    display:flex;
    justify-content: space-around;
    align-items:center;
    flex-direction: column;
    cursor: pointer;
    gap:10px;
    border: ${props => props.$selectedLanguage ? '1px solid var(--specialColor1)' : 'none'};
    color: black;
    svg {
        width:100px;
    }
    svg:hover {
        transform:scale(1.1);
        transition:0.4s;
    }
    &:hover {
        background:var(--specialColorHover1);
        color:white;
    }
    &:active {
        transform:translate3d(1px, 1px,1px);
    }
    @media screen and (max-width:430px){
      svg {
        width:70px;
        height: 100%;
      }   
    }
`
interface TranslationFormProps {
    setIsVisible: (value: boolean) => void;
}
export default function TranslationForm(props: TranslationFormProps) {
    const { setIsVisible } = props;
    const { t: t_, i18n } = useTranslation('translation');
    const t = (text: string): string => t_(text)
    const [selectedLanguage, setSelectedLanguage] = useState<string>(i18n.language);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        i18n.changeLanguage(selectedLanguage)
        setIsVisible(false);
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)} className='container'>
            <Container className='text-container'>
                <div className="content">
                    <Button title="Русский" $selectedLanguage={selectedLanguage === 'russian' ? true : false} type="button" onClick={() => setSelectedLanguage('russian')}>
                        <SVG color="black" name="flag-russia" />
                        <span>{t('Russian')}</span>
                    </Button>
                    
                    <Button title="English" $selectedLanguage={selectedLanguage === 'english' ? true : false} type="button" onClick={() => setSelectedLanguage('english')}>
                        <SVG color="black" name="flag-united-kingdom" />
                        {t('English')}
                    </Button>
                </div>
            </Container>
            <div className='buttons-container'>
                <button type='submit' ><span>{t('Choose')}</span></button>
                <button type='button' onClick={() => setIsVisible(false)}><span>{t('Close')}</span></button>
            </div>
        </form >
    )
}