import React from 'react';
import styled from 'styled-components';

interface Props {
    size: number
    borderWidth?: number
    backgroundColor?: string
    borderColor?: string
    topBorderColor?: string
    position?: "fixed" | "relative";
    minHeight?: number;
    borderRadius?: string;
    responsive?: boolean;
    height?: string;
    justifyContent?: string;
    margin?: string;
}

const LoaderWrapper = styled.div<Props>`
    display: flex;
    justify-content: ${props => props.justifyContent};
    align-items: center;
    background-color: ${props => props.backgroundColor};
    outline:none;
    border:none;
    cursor:wait;
    height: ${props => props.height ? props.height : "80%"};
    width: 100%;
    margin: ${props => props.margin};
    border-radius: ${props => props.borderRadius ? props.borderRadius : "0px"};
    position: ${props => props.position};
    top: ${props => props.position === "fixed" ? 0 : "auto"};
    right: ${props => props.position === "fixed" ? 0 : "auto"};
    min-height: ${props => props.minHeight ? props.minHeight + "px" : "auto"};
    &::after {
        content:"";
        width:${props => props.size + "px"};
        height:${props => props.size + "px"};
        border:${props => props.borderWidth + "px solid " + props.borderColor};
        border-top:${props => props.borderWidth + "px solid " + props.topBorderColor};
        border-radius: 50%;
        animation: Loader 1s linear infinite;
    }
    @keyframes Loader {
        from {
            transform:rotate(0deg);
        }
        to {
            transform:rotate(360deg);
        }
    }
`;
export default function Loader(props: Props) {
    const { size, borderWidth, height, margin, backgroundColor, borderColor, topBorderColor, position, minHeight, borderRadius, justifyContent } = props;
    const border_color: string = borderColor || "blue";
    const background_color: string = backgroundColor || "inherit";
    const border_width: number = borderWidth || 2;
    const top_border_color: string = topBorderColor || "white";
    const position_: "fixed" | "relative" = position || "relative";
    const responsive: boolean = props.responsive === false ? false : true
    const size_: number = window.innerWidth < 750 && responsive ? size / 2 : size;
    const justifyContent_: string = justifyContent || "center";
    const margin_: string = margin || "0";
    return (
        <LoaderWrapper
            size={size_}
            borderRadius={borderRadius}
            position={position_}
            height={height}
            borderWidth={border_width}
            backgroundColor={background_color}
            borderColor={border_color}
            margin={margin_}
            topBorderColor={top_border_color}
            minHeight={minHeight}
            justifyContent={justifyContent_}
        ></LoaderWrapper>
    )
}