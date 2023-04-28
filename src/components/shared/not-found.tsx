import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

interface Props {
    page?: "profile";
    position?: "fixed" | "relative";
    size?: number;
    message?: string;
}


const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    outline:none;
    border:none;
    height: 100%;
    flex-direction: column;
    margin:10px;
    .content__wrapper {
        width: 100%;
        max-width: var(--cardsMaxWidth);
        background: white;
        padding:10px;
        border:1px solid var(--specialColor2);
        border-radius:10px;
        display: flex;
        justify-content: center;
        min-height: 100px;
        flex-direction: column;
        min-height:140px;
        gap:10px;
        .text {
            width: 100%;
            display:flex;
            justify-content: center;
            padding: 10px;
            font-size: var(--fontSize22);
            color:var(--specialColor1);
        }
        .center_content {
            width:100%;
            display: flex;
            justify-content: center;
            button {
                width: 100%;
                max-width: 110px;
                color: white;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 10px;
                padding: 10px;
                background: var(--specialColor1);
                border: none;
                cursor: pointer;
                outline: none;
            }
    }
    }
`;
export default function NotFound(props: Props) {
    const { t:t_ } = useTranslation('translation');
    const t = (text:string):string => t_(text)
    const {   message} = props;
    return (<>
        <Wrapper >
            <div className='content__wrapper'>
                <>
                    <div className='text'>
                        {message ?
                            <>{t(message)}</>
                            :
                            <>{t("Not found 404")}</>
                        }
                    </div>
                </> 
            </div>
        </Wrapper>
    </>
    )
}