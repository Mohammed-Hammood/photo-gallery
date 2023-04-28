import { createGlobalStyle } from 'styled-components';
import { GlobalSettingsTypes } from 'libs/types';


interface Props {
    $language: string
    $global: GlobalSettingsTypes
}
const GlobalStyle = createGlobalStyle<Props>`
    *, *::after, *::before {
        box-sizing: border-box;
        font-size: var(--fontNormal);
    }
    html {
        height: 100%;
        scroll-behavior: smooth;
    }
    body {
        direction: ${props => (['ar'].includes(props.$language)) ? 'rtl' : 'ltr'};
        max-width:100%;
        margin: 0;
        font-family: ${props => props.$global.body.fontFamily ? props.$global.body.fontFamily : "'Noto Sans Arabic', 'times new roman', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'"};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        display: flex;
        flex-direction: column;
        min-height: 100%;
        background-color:rgba(${props => props.$global.body.backgroundColor.toString() + "," + (props.$global.body.opacity / 100).toString()});
    }
    header {
        background:${props => props.$global.header.backgroundColor ? props.$global.header.backgroundColor : 'black'};
        opacity:${props => props.$global.header.opacity / 100};
        color:${props => props.$global.header.color ? props.$global.header.color : 'white'};
        border-top: 1px solid ${props => props.$global.header.marginsColor ? props.$global.header.marginsColor : 'red'};
        border-bottom: 1px solid ${props => props.$global.header.marginsColor ? props.$global.header.marginsColor : 'red'};
    }

    
    footer {
        background:${props => props.$global.footer.backgroundColor ? props.$global.footer.backgroundColor : 'black'};
        color:${props => props.$global.footer.color ? props.$global.footer.color : 'white'};
        opacity:${props => props.$global.footer.opacity / 100};
        border-top: 1px solid ${props => props.$global.footer.marginsColor ? props.$global.footer.marginsColor : 'red'};
        border-bottom: 1px solid ${props => props.$global.footer.marginsColor ? props.$global.footer.marginsColor : 'red'};
    }
    main {
        padding:15px 36px;
        height:100%;        
    }
    a {
        text-decoration: none;
        color:inherit;
    }
    h1 {
        font-size: var(--fontLarge);
    }
   ::selection, ::-moz-selection {
        color:white;
        background-color: var(--specialColor1);
   }
@media screen and (max-width:650px){
    main:not(.home-page) {
        padding:  '15px';
    }
    svg {
        width:14px;
        height:14px;
    }
}
`;

export default GlobalStyle;
