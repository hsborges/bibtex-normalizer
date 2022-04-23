import { gray, plum, purple, tomato, violet } from '@radix-ui/colors';
import { createStitches } from '@stitches/react';

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } =
  createStitches({
    theme: {
      colors: {
        ...gray,
        ...purple,
        ...plum,
        ...violet,
        ...tomato,
      },
    },
  });
