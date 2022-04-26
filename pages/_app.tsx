/**
 * @author Hudson Silva Borges
 */
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { styled } from '@stitches/react';

import Analytics from '../components/analytics';
import BetaBadge from '../components/beta-badge';
import Footer from '../components/footer';
import Header from '../components/header';
import * as gtag from '../lib/gtag';
import { ConfigProvider } from '../providers/ConfigProvider';
import { EditorConfigProvider } from '../providers/EditorProvider';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const Grid = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    maxWidth: 'calc(100vw - 15px)',
  });

  const MainContent = styled('div', { flexGrow: 1 });

  return (
    <>
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
      <Analytics />
    </>
  );
}
