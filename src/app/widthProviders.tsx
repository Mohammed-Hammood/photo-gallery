import React from "react"
import { BrowserRouter } from "react-router-dom";
import store from "store";
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';


export default function widthProviders(App: () => JSX.Element) {
    return (
        <React.StrictMode>
            <HelmetProvider>
                <Provider store={store}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </Provider>
            </HelmetProvider>
        </React.StrictMode>
    )
}