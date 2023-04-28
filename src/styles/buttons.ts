import styled from "styled-components";

interface Props {
    $background?:string;
    $color?:string;
    $hoverBg?:string;
    $padding?:string;
    $width?:string;
    $focusOutline?:string;
    $border?:string;
    $borderRadius?:string;
    $maxHeight?:string;
    $activeTransform?:string;
    $transform?:string;
    $height?:string;
    $svgWidth?:string;
    $svgHeight?:string;
    $svgHoverColor?:string;
    $svgColor?:string;
    $opacity?:string;
    $gap?:string;
    $colorOnHover?:string;
    $cursor?:string;
    $minWidth?:string;
    $minHeight?:string;
}
export const Button = styled.button<Props>`
    background: ${props => props.$background?props.$background:"var(--specialColor1)"};
    color: ${props => props.$color?props.$color:"black"};
    border-radius: ${props => props.$borderRadius?props.$borderRadius:"5px"};
    border: ${props => props.$border?props.$border:"none"};
    outline: none;
    cursor: pointer;
    max-height: ${props => props.$maxHeight?props.$maxHeight:"auto"};
    transform: ${props => props.$transform?props.$transform:"none"};
    display:flex;
    width:${props => props.$width?props.$width:"auto"};
    min-width:${props => props.$minWidth?props.$minWidth:"auto"};
    min-height:${props => props.$minHeight?props.$minHeight:"auto"};
    height:${props => props.$height?props.$height:"auto"};
    justify-content: center;
    align-items:center;
    gap:${props => props.$gap?props.$gap:"5px"};
    opacity:${props => props.$opacity?props.$opacity:"1"};
    cursor:${props => props.$cursor?props.$cursor:"pointer"};
    padding: ${props => props.$padding?props.$padding:"5px 10px"};
    &:hover {
        color: ${props => props.$colorOnHover?props.$colorOnHover:"black"};
        background: ${props => props.$hoverBg?props.$hoverBg:"var(--specialColorHover1)"};
        svg path {
                fill:${props => props.$svgHoverColor?props.$svgHoverColor:"inherit"};
        }
    }
    &:focus {
        outline:${props => props.$focusOutline? props.$focusOutline:"1px solid var(--specialColor1)"};
    }
    &:active {
        transform:${props => props.$activeTransform? props.$activeTransform:"scale(1.1)"};
    }
    svg {
        width:${props => props.$svgWidth?props.$svgWidth:"14px"};
        height:${props => props.$svgHeight?props.$svgHeight:"14px"};
        path {
            fill:${props => props.$svgColor?props.$svgColor:"inherit"};
        }
    }
`