import React, { useEffect, useState } from "react";
import { SVG } from "components";
import styled from 'styled-components';
import { useAppSelector } from "store/hooks";

interface Props {
    $isVisible: boolean
}

const ScrollerDiv = styled.div<Props>`
    position: fixed;
    right:50px;
    z-index: 100;
    cursor: pointer;
    display: ${props => props.$isVisible ? "flex" : "none"};
    justify-content:center;
    align-items:center;
    border-radius:50%;
    user-select:none00;
    background-color: white;
    bottom:30px;
    padding:10px;
    opacity: 0.2;
    animation: BOX_SHADOW 1s linear infinite;
    svg {
        width:15px;
        height:15px;
    }
    &:hover {
        opacity: 1;
        animation: HOVER 1s linear 1;
    }
    @keyframes BOX_SHADOW {
        0% {
            box-shadow:0 0 10px rgba(255, 255, 255, 0.5);
        }
        50% {
            box-shadow:0 0 10px rgba(0, 0, 0, 0.5);
        }
        100% {
            box-shadow:0 0 10px rgba(255, 255, 255, 0.5);
        }
    }
    @keyframes HOVER {
        0% {
            opacity: 0.2;
        }
        100% {
            opacity: 1;
        }
    }

`
function ScrollToTop() {
    const max = 400;
    const visibility = useAppSelector(state => state.global.scrollToTop.isVisible);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    useEffect(() => {
        window.addEventListener('scroll', function () {
            if (document.body.scrollTop > max || document.documentElement.scrollTop > max) {
                setIsVisible(true);
            }
            else {
                if (isVisible) {
                    setIsVisible(false)
                }
            }
        })
    }, [isVisible, visibility]);

    const scrollToTop = (): void => {
        document.body.scrollTop = 0;  // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
    if (!visibility) return null;
    return (
        <ScrollerDiv onClick={() => scrollToTop()} $isVisible={isVisible}>
            {/* <SVG name='jet-fighter-up' color="black" /> */}
            <SVG name='angles-up' color="black" />
        </ScrollerDiv>)
}

export default ScrollToTop