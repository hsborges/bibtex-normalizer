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
  borderRadius: '8px',
  fontWeight: 'bolder',
  cursor: 'pointer',
  outline: 'none',
  variants: {
    rounded: {
      true: {
        padding: '0.5em',
        borderRadius: '100%',
      },
    },
    bordered: {
      true: {
        backgroundColor: 'transparent !important',
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
    color: {
      transparent: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      },
      normal: {
        backgroundColor: '$gray11',
        borderColor: '$gray11',
        color: 'White',
      },
      primary: {
        backgroundColor: '$teal9',
        borderColor: '$teal10',
        color: 'White',
      },
      warning: {
        color: 'White',
        border: '1px solid $tomato10',
        backgroundColor: '$tomato10',
        fontWeight: 'bolder',
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
  compoundVariants: [
    {
      color: 'normal',
      bordered: true,
      css: { color: '$gray11', borderColor: '$gray11' },
    },
    {
      color: 'primary',
      bordered: true,
      css: { color: '$teal9', borderColor: '$teal9' },
    },
    {
      color: 'warning',
      bordered: true,
      css: { color: '$tomato10', borderColor: '$tomato10' },
    },
  ],
  defaultVariants: {
    color: 'primary',
    size: 'normal',
    rounded: false,
    bordered: false,
  },
});
