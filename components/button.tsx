/**
 * @author Hudson Silva Borges
 */
import { styled } from '@stitches/react';

export default styled('button', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  columnGap: 5,
  padding: '0.5em 1em',
  border: '1px solid',

  fontWeight: 'bolder',
  color: '$gray12',
  cursor: 'pointer',
  variants: {
    rounded: {
      true: {
        borderRadius: '8px',
      },
    },
    bordered: {
      false: {
        border: 'none !important',
      },
    },
    disabled: {
      true: {
        opacity: 0.25,
        cursor: 'inherit',
      },
    },
    color: {
      primary: {
        backgroundColor: '$teal9',
        borderColor: '$teal10',
        color: 'White',

        '&:hover': {
          backgroundColor: '$teal10',
          borderColor: '$teal11',
        },
      },
      warning: {
        color: '$tomato10',
        border: '1px solid $tomato10',
        backgroundColor: 'transparent',
        fontWeight: 'bolder',
        '&:hover': {
          borderColor: '$tomato12',
        },
      },
      transparent: {
        border: '1px solid $gray9',
        backgroundColor: 'transparent',
        fontWeight: 'normal',
        '&:hover': {
          borderColor: '$gray12',
        },
      },
    },
    size: {
      small: {
        fontSize: '0.8em',
      },
      normal: {
        fontSize: '1em',
      },
      large: {
        fontSize: '1.2em',
      },
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'normal',
    rounded: true,
    bordered: true,
  },
});
