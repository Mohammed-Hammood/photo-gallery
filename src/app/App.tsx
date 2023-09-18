import React from 'react';
import GlobalStyle from 'styles/globalStyles';
import { Header, ScrollToTop, ProgressBar, HelmetElement, Footer } from 'components';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'store/hooks';
import Pages from 'pages';
import { selectGlobal } from 'store/selectors';

function App() {
  const { i18n } = useTranslation();
  const global = useAppSelector(selectGlobal);

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
