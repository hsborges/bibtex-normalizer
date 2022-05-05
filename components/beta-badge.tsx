import Link from 'next/link';
import { HTMLProps } from 'react';
import { IoLogoGithub } from 'react-icons/io5';

import { styled } from '../stitches.config';

export default styled(
  function (props: HTMLProps<HTMLAnchorElement>) {
    return (
      // eslint-disable-next-line react/jsx-no-target-blank
      <a {...props} href="https://github.com/hsborges/bibtex-normalizer" target="_blank">
        <IoLogoGithub /> Beta
      </a>
    );
  },
  {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.15em',
    position: 'absolute',
    lineHeight: '1.75em',
    padding: '0 3em',
    backgroundColor: '$teal8',
    borderTop: '2px solid $teal9',
    borderBottom: '2px solid $teal9',
    textAlign: 'center',
    verticalAlign: 'middle',
    color: 'White',
    fontWeight: 'bolder',
    marginTop: '0.75em',
    marginLeft: '-3em',
    transform: 'rotate(-40deg)',

    '& > svg': { marginRight: 5 },

    '@sm': {
      fontSize: '1.05em',
      lineHeight: '1.5em',
      marginTop: '0.75em',
      marginLeft: '-2.75em',
    },
  }
);
