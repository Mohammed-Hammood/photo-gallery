import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";


const FooterWrapper = styled.footer`
    padding: 15px;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    user-select: none;
    margin-top:auto;
    .bottom-content {
        display:flex;
        justify-content: center;
        align-items: center;
        color:inherit;
        width:100%;

    }
 
`
function Footer():JSX.Element {
    const { t } = useTranslation("translation");

    return (
        <FooterWrapper >
            <div className="bottom-content">
                <strong>{t("Copyright reserved")}  {new Date().getFullYear()}</strong>
            </div>
        </FooterWrapper>)
}

export default Footer;
