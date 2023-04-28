export type GlobalSettingsTypes = {

    body: {
        fontFamily: string;
        backgroundColor: number[];
        opacity: number;
    }
    controlPanel: {
        isVisible: boolean;
    }
    header: {
        marginsColor: string
        color: string;
        opacity: number;
        backgroundColor: string;
    }
 
    footer: {
        color: string
        backgroundColor: string
        marginsColor: string
        opacity: number;
    }
    progressBar: {
        backgroundColor: string;
        isVisible: boolean;
    }
    scrollToTop: {
        isVisible: boolean;
    }
}