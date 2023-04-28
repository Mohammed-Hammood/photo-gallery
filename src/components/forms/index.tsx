import SearchForm from "./common/search-form";
import TranslationForm from "./common/translation-form";
import SettingsForm from "./common/settings-form";
import PaginationForm from "./common/pagination-form";
import ImagesFiltersForm from "./images/images-filters";
import DarkLightModeForm from "./common/dark-light-mode";
import {  ModalTypes } from 'libs/types'

 
interface Props {
    modal: ModalTypes
    setModal: (modal: ModalTypes) => void;
    props: any
}

export default function  Forms(props: Props): JSX.Element | null {
    const { form } = props.modal;
    const forms: {[key:string]: JSX.Element } = {
        "search": <SearchForm {...props.props} setModal={props.setModal} modal={props.modal} />,
        "pagination": <PaginationForm {...props.props} setModal={props.setModal} modal={props.modal} />,
        "translation": <TranslationForm {...props.props} setModal={props.setModal} modal={props.modal} />,
        "settings": <SettingsForm {...props.props} setModal={props.setModal} modal={props.modal} />,
        "dark-light-mode": <DarkLightModeForm {...props.props} setModal={props.setModal} modal={props.modal} />,
        "images-filters": <ImagesFiltersForm {...props.props} setModal={props.setModal} modal={props.modal} />,
    }
    if (forms && forms.hasOwnProperty(form)) return forms[form];
    return null;
}