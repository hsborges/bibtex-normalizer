/**
 * @author Hudson Silva Borges
 */
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { styled } from '@stitches/react';

import BetaBadge from '../components/beta-badge';
import Footer from '../components/footer';
import Header from '../components/header';
import { ConfigProvider } from '../providers/ConfigProvider';
import { EditorConfigProvider } from '../providers/EditorProvider';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const Grid = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    maxWidth: 'calc(100vw - 15px)',
  });

  const MainContent = styled('div', { flexGrow: 1 });

  return (
    <ConfigProvider>
      <EditorConfigProvider>
        <Head>
          <title>Bibtex Normalizer</title>
          <link rel="shortcut icon" href="/images/logo.png" />
        </Head>
        <Grid>
          <BetaBadge />
          <Header />
          <MainContent>
            <Component {...pageProps} />
          </MainContent>
          <Footer />
        </Grid>
      </EditorConfigProvider>
    </ConfigProvider>
  );
}
