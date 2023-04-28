import React from 'react';
import { useTranslation } from 'react-i18next';

const ColorsOptions = (): JSX.Element => {
    const { t:t_ } = useTranslation('translation')
    const t = (text:string):string => t_(text)

    return (<>
        <option value="inherit">{t("Invisible")}</option>
        <option value="black">{t("Black")}</option>
        <option value="white">{t("White")}</option>
        <option value="red">{t("Red")}</option>
        <option value="yellow">{t("Yellow")}</option>
        <option value="green">{t("Green")}</option>
        <option value="blue">{t("Blue")}</option>
        <option value="blueviolet">{t("Blue violet")}</option>
        <option value="brown">{t("Brown")}</option>
        <option value="chocolate">{t("Chocolate")}</option>
        <option value="crimson">{t("Сrimson")}</option>
        <option value="darkblue">{t("Dark blue")}</option>
        <option value="darkred">{t("Dark red")}</option>
        <option value="darkgreen">{t("Dark green")}</option>
        <option value="cyan">{t("Cyan")}</option>
        <option value="deeppink">{t("Deep pink")}</option>
        <option value="deepskyblue">{t("Deep sky blue")}</option>
        <option value="dimgray">{t("Dim gray")}</option>
        <option value="lightseagreen">{t("Light sea green")}</option>
        <option value="seagreen">{t("Sea green")}</option>
        <option value="slategray">{t("Slate gray")}</option>
        <option value="steelblue">{t("Steel blue")}</option>
        <option value="teal">{t("Teal")}</option>
    </>)
}
export default ColorsOptions;