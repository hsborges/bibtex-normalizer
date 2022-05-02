/**
 * @author Hudson Silva Borges
 */
import { Head, Html, Main, NextScript } from 'next/document';

import { getCssText } from '../stitches.config';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
