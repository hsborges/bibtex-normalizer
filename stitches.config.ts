import { amber, gray, purple, teal, tomato } from '@radix-ui/colors';
import { createStitches } from '@stitches/react';

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } =
  createStitches({
    theme: {
      colors: {
        ...gray,
        ...tomato,
        ...teal,
        ...amber,
        ...purple,
      },
    },
    media: {
      sm: 'screen and (max-width: 640px)',
    },
  });
