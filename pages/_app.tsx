/**
 * @author Hudson Silva Borges
 */
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Analytics from '../components/analytics';
import BetaBadge from '../components/beta-badge';
import Footer from '../components/footer';
import Header from '../components/header';
import * as gtag from '../lib/gtag';
import { basePath } from '../next.config';
import { ConfigProvider } from '../providers/ConfigProvider';
import { EditorConfigProvider } from '../providers/EditorProvider';
import { styled } from '../stitches.config';
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
    maxWidth: 'calc(100% - 15px)',
    height: '100%',
    width: '100%',
  });

  const MainContent = styled('div', { flexGrow: 1 });

  return (
    <>
      <Head>
        <link rel="shortcut icon" href={`${basePath}/favicon.ico`} type="image/x-icon" />

        <title>Bibtex Normalizer</title>
        <meta name="description" content="Normalize your bibtex references!" />
        <meta property="og:title" content="Bibtex Normalizer" />
        <meta property="og:url" content="https://hsborges.github.io/bibtex-normalizer" />
        <meta property="og:description" content="Normalize your bibtex references!" />
        <meta
          property="og:image"
          content="https://hsborges.github.io/bibtex-normalizer/images/social_card_image.png"
        />
        <meta property="og:image:width" content="1000" />
        <meta property="og:image:height" content="516" />
        <meta
          property="og:image"
          content="https://hsborges.github.io/bibtex-normalizer/images/social_card_image_2.png"
        />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </Head>
      <ConfigProvider>
        <EditorConfigProvider>
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
