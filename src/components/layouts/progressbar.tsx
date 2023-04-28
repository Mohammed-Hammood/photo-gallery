import React, { useEffect, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import styled from 'styled-components';

const ProgressWrapper = styled.div<Props>`
    width:100%;
    height:4px;
    position: fixed;
    top:50px;
    right:0;
    display: flex;
    justify-content: flex-start;
    user-select: none;
    z-index:100;
    &:after {
        content:"";
        width:${props => props.$percentage}%;
        height:100%;
        background-color:${props => props.$bgColor ? props.$bgColor : "red"};
    }
`;
interface Props {
    $percentage: number
    $bgColor: string
}

const ProgressBar: React.FC = (): JSX.Element | null => {
    const { isVisible, backgroundColor } = useAppSelector(state => state.global.progressBar);
    const [percentage, setPercentage] = useState<number>(0);
    useEffect(() => {
        window.addEventListener('scroll', function () {
            let winScroll: number = document.body.scrollTop || document.documentElement.scrollTop;
            let height: number = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            let scrolled: number = Math.round((winScroll / height) * 100);
            setPercentage(scrolled);
        })
    }, [isVisible, percentage]);

    if (!isVisible) return null;
    return (
        <ProgressWrapper className='progess-bar' $percentage={percentage} $bgColor={backgroundColor}></ProgressWrapper>
    )
}

export default ProgressBar;