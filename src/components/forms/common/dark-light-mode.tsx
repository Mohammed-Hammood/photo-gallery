import { InputRangeElement } from "components";
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setGlobalParams } from "store/slicers/global";
import styled from "styled-components";

interface WrapperTypes {
    $backgroundColor: string;
    $opacity: string;
}
const Wrapper = styled.div<WrapperTypes>`
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap:10px;
    .demonstration {
        width:100%;
        border:1px solid var(--specialColor1);
        height:100px;
        background:rgb(${({ $backgroundColor, $opacity }) => $backgroundColor + ", " + $opacity});
    }
    .rgb_colors_wrapper {
        display:flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width:100%;
        gap:10px;
        .inputs_rgb_section, .ready_colors_button {
            display: flex;
            justify-content: center;
            flex-direction: column;
            width:100%;
            padding:5px;
            border-radius:5px;
            label {
                display: flex;
                justify-content: flex-start;
                gap:5px;
            }
            button:active {
                transform: scale(1.1);
            }
        }
        .ready_colors_button {
            flex-direction: row;
            padding:0;
            border:2px solid var(--specialColor1);
            overflow: hidden;
            outline:none;
            button {
                width:100%;
                height:40px;
                border:none;
                outline:none;
                cursor:pointer;
            }
        }
    }

`
interface Props {
    setIsVisible: (value: boolean) => void;
}
export default function DarkLightModeForm(props: Props): JSX.Element {
    const { setIsVisible } = props;
    const body = useAppSelector(state => state.global.body);
    const [backgroundColor, setBackgroundColor] = useState<number[]>(body.backgroundColor);
    const [opacity, setOpacity] = useState<number>(body.opacity);
    const { t:t_ } = useTranslation('translation');
    const t = (text:string):string => t_(text)
    const redIndex = 0;
    const greenIndex = 1;
    const blueIndex = 2;
    const dispatch = useAppDispatch();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        dispatch(setGlobalParams({ param: "body", key: "backgroundColor", value: backgroundColor }));
        dispatch(setGlobalParams({ param: "body", key: "opacity", value: opacity }));
        setIsVisible(false);
    }
    const reset = (): void => {
        setBackgroundColor([0, 0, 0]);
        setOpacity(9);
    }
    const setColors = (colorIndex: 0 | 1 | 2, value: number): void => {
        const newColors = backgroundColor.map((item, index) => {
            if (index === colorIndex) return value;
            return item;
        })
        setBackgroundColor(newColors);
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)} className='container'>
            <Wrapper $backgroundColor={backgroundColor.toString()} $opacity={(opacity / 100).toString()}>
                <div className={'demonstration '}></div>
                <div className="rgb_colors_wrapper" >
                    <div className="inputs_rgb_section">
                        <InputRangeElement
                            min={0}
                            labelInnerText={t("Red")}
                            max={255}
                            onChange={(value: number) => setColors(redIndex, value)}
                            value={backgroundColor[redIndex]}
                        />
                    </div>
                    <div className="inputs_rgb_section">
                        <InputRangeElement
                            min={0}
                            labelInnerText={t("Green")}
                            max={255}
                            onChange={(value: number) => setColors(greenIndex, value)}
                            value={backgroundColor[greenIndex]}
                        />
                    </div>
                    <div className="inputs_rgb_section">
                        <InputRangeElement
                            min={0}
                            labelInnerText={t("Blue")}
                            max={255}
                            onChange={(value: number) => setColors(blueIndex, value)}
                            value={backgroundColor[blueIndex]}
                        />
                    </div>
                    <div className="inputs_rgb_section">
                        <InputRangeElement
                            min={0}
                            labelInnerText={t("Opacity")}
                            max={100}
                            onChange={setOpacity}
                            value={opacity}
                        />
                    </div>
                    <div className={'ready_colors_button'}>
                        <button title={'White'} className={'bgWhite'} type="button" onClick={() => { setBackgroundColor([255, 255, 255]); setOpacity(100) }}></button>
                        <button title={'Ghost white'} className={'bgGhostWhite'} type="button" onClick={() => { setBackgroundColor([248, 248, 255]); setOpacity(100) }}></button>
                        <button title={'Silver'} className={'bgSilver'} type="button" onClick={() => { setBackgroundColor([0, 0, 0]); setOpacity(9) }}></button>
                        <button title={'Gainsboro'} className={'bgGainsboro'} type="button" onClick={() => { setBackgroundColor([220, 220, 220]); setOpacity(100) }}></button>
                        <button title={'Light blue'} className={'bgLightBlue'} type="button" onClick={() => { setBackgroundColor([173, 216, 230]); setOpacity(100) }}></button>
                        <button title={'Sky blue'} className={'bgSkyBlue'} type="button" onClick={() => { setBackgroundColor([135, 206, 235]); setOpacity(100) }}></button>
                        <button title={'Light slate gray'} className={'bgLightSlateGray'} type="button" onClick={() => { setBackgroundColor([119, 136, 153]); setOpacity(100) }}></button>
                        <button title={'Light sean green'} className={'bgLightSeaGreen'} type="button" onClick={() => { setBackgroundColor([32, 178, 170]); setOpacity(100) }}></button>
                        <button title={'Teal'} className={'bgTeal'} type="button" onClick={() => { setBackgroundColor([0, 128, 128]); setOpacity(100) }}></button>
                        <button title={'Dim gray'} className={'bgDimGray'} type="button" onClick={() => { setBackgroundColor([105, 105, 105]); setOpacity(100) }}></button>
                        <button title={'Dark slate gray'} className={'bgDarkSlateGray'} type="button" onClick={() => { setBackgroundColor([47, 79, 79]); setOpacity(100) }}></button>
                        <button title={'Dark slate blue'} className={'bgDarkSlateBlue'} type="button" onClick={() => { setBackgroundColor([72, 61, 139]); setOpacity(100) }}></button>
                        <button title={'Navy'} className={'bgNavy'} type="button" onClick={() => { setBackgroundColor([0, 0, 128]); setOpacity(100) }}></button>
                        <button title={'Black'} className={'bgBlack'} type="button" onClick={() => { setBackgroundColor([0, 0, 0]); setOpacity(100) }}></button>
                    </div>
                </div>
            </Wrapper>
            <div className='buttons-container'>
                <button type='submit'>{t("Save")}</button>
                <button type='button' onClick={() => reset()}>
                    {t("Reset")}
                </button>
            </div>
        </form>
    )
}