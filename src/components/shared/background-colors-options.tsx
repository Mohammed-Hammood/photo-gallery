import React from 'react';
import { useTranslation } from 'react-i18next';

const BackgroundColorsOptions = (): JSX.Element => {
    const {t:t_} = useTranslation('translation');
    const t = (text:string):string => t_(text)

    return (<>
        <option value="bgInherit" >{t("Hidden")}</option>
        <option value="bgWhite" >{t("White")}</option>
        <option value="bgDark" >{t("Dark")}</option>
        <option value="bgBlack" >{t("Black")}</option>
        <option value="bgRed" >{t("Red")}</option>
        <option value="bgDarkRed" >{t("Dark red")}</option>
        <option value="bgBlue" >{t("Blue")}</option>
        <option value="bgDarkBlue" >{t("Dark blue")}</option>
        <option value="bgGreen" >{t("Green")}</option>
        <option value="bgDarkGreen" >{t("Dark green")}</option>
        <option value="bgGray" >{t("Gray")}</option>
        <option value="bgDarkGray" >{t("Dark gray")}</option>
        <option value="bgCyan" >{t("Cyan")}</option>
        <option value="bgDarkCyan" >{t("Dark cyan")}</option>
        <option value="bgYellow" >{t("Yellow")}</option>
    </>)
}
export default BackgroundColorsOptions;