import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { withTranslation } from "react-i18next";
import { AppRoutes } from 'routes';
import { setGlobalParams } from "store/slicers/global";
import { Modal, SVG } from "components";
import 'styles/common/header.scss';
import { setImagesFilters } from "store/slicers/images";
import { RootState } from "store/store";
import { GlobalSettingsTypes } from "libs/types";

type Props = {
    global: GlobalSettingsTypes;
    language: string
    t: (text: string) => string;
    showSearchModal: () => void;
}

interface State {
    isOpen: boolean;
    darkLightModeModal: boolean;
    languageModal: boolean;
    settingsModal: boolean;
}

class Header extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isOpen: false,
            darkLightModeModal: false,
            languageModal: false,
            settingsModal: false,
        }
    }

    headerCloser(e: MouseEvent, state: State): void {
        const header = document.getElementById("HeaderHeader00_nav") as HTMLElement;
        const el = e.target as HTMLElement;
        //to close the header when user clicks outside the header and header is opened
        if (state.isOpen && !header.isEqualNode(el) && !header.contains(el)) {
            this.setState({ isOpen: false });
        }
    }
    componentWillUnmount(): void {
        document.removeEventListener("click", (e: MouseEvent) => this.headerCloser(e, this.state))
    }
    componentDidMount(): void {
        document.addEventListener('click', (e: MouseEvent) => this.headerCloser(e, this.state))
    }
    render() {
        const { t, showSearchModal } = this.props;
        const { isOpen } = this.state;
        const { header } = this.props.global;
        return (
            <>
                <header className={isOpen ? "app_header_isOpen" : "app_header"} id="HeaderHeader00_nav">
                    <div className="left-content">
                        <Link onClick={() => this.setState({ isOpen: false })} className="buttons" to={AppRoutes.home} id="HeaderLogo">
                            <SVG name="photo-film-solid" color={header.color} />
                            <span id="photo_gallery_logo_title">{t("Photo gallery")}</span>
                        </Link>
                        <button className="buttons" type="button" id="btn-menue" onClick={() => this.setState({ isOpen: !isOpen })}>
                            <SVG color={header.color} name={isOpen ? "bars-staggered-solid" : "bars-solid"} />
                        </button>
                    </div>
                    <div className="right-content">
                        <button type="button" className="buttons" onClick={() => showSearchModal()} title={t('Search')}>
                            <SVG name="search" color={header.color} />
                        </button>
                        <button type="button" className='buttons' onClick={() => this.setState({ darkLightModeModal: true })} title={t('Dark-light mode')} id="header-darkLightMode-button">
                            <SVG name='circle-half-stroke' color={header.color} />
                        </button>
                        <button type="button" className="buttons" onClick={() => this.setState({ languageModal: true })} title={t("Choose your language")}>
                            <SVG name='language' color={header.color} />
                        </button>
                        <button type="button" className="buttons" onClick={() => this.setState({ settingsModal: true })} title={t("Settings")}>
                            <SVG name='gear-solid' color={header.color} />
                        </button>
                    </div>
                </header >

                <Modal isVisible={this.state.languageModal}
                    title="Choose your language"
                    setIsVisible={(value: boolean) => this.setState({ languageModal: value })}
                    form="translation"
                    maxWidth={"maxWidth400"}
                />
                <Modal isVisible={this.state.settingsModal}
                    title="Settings"
                    closeButton={true}
                    setIsVisible={(value: boolean) => this.setState({ settingsModal: value })}
                    form="settings"
                    border={"specialColor"}
                    fullScreen={true}
                    background={"bgNone"}
                />
                <Modal isVisible={this.state.darkLightModeModal}
                    title="Dark light mode"
                    closeButton={true}
                    setIsVisible={(value: boolean) => this.setState({ darkLightModeModal: value })}
                    form="dark-light-mode"
                    fullScreen={true}
                />
            </>
        )
    }
}

function mapStateToProps(state: RootState, ownProps: { language: string }) {
    return {
        global: state.global,
        language: ownProps.language,
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    setGlobalParams: () => dispatch(setGlobalParams({ param: "", key: "", value: "" })),
    setQuery: (query: string) => dispatch(setImagesFilters({ key: 'query', value: query })),
    showSearchModal: () => dispatch(setGlobalParams({ param: "search", key: "isVisible", value: true }))
})

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Header));