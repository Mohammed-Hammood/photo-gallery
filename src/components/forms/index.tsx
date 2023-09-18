import SearchForm from "./search-form";
import TranslationForm from "./translation-form";
import SettingsForm from "./settings-form";
import PaginationForm from "./pagination-form";
import DarkLightModeForm from "./dark-light-mode";
import { ModalTypes, FormsNames } from 'libs/types'

interface Props {
    modal: ModalTypes
    setModal: (modal: ModalTypes) => void;
    props: any
}

export default function Forms(props: Props): JSX.Element {
    const { form } = props.modal;

    const forms: Record<FormsNames, JSX.Element> = {
        "search": <SearchForm {...props.props} setModal={props.setModal} modal={props.modal} />,
        "pagination": <PaginationForm {...props.props} setModal={props.setModal} modal={props.modal} />,
        "translation": <TranslationForm {...props.props} setModal={props.setModal} modal={props.modal} />,
        "settings": <SettingsForm {...props.props} setModal={props.setModal} modal={props.modal} />,
        "dark-light-mode": <DarkLightModeForm {...props.props} setModal={props.setModal} modal={props.modal} />,
    }
    return forms[form];
}