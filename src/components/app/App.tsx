import React from 'react';
import GlobalStyle from 'styles/globalStyles';
import {  Header, ScrollToTop, ProgressBar, HelmetElement } from 'components';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'store/hooks';
import Pages from 'pages';
import Footer from 'components/layouts/footer';


function App() {
  const { i18n } = useTranslation();
  const global = useAppSelector(state => state.global);
  return (
    <>
      <HelmetElement />
      <GlobalStyle $language={i18n.language} $global={global} />
      <ProgressBar />
      <Header language={i18n.language} />
    
      <Pages />
      <ScrollToTop />
      <Footer />

    </>);
}

export default App;
