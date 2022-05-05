/**
 * @author Hudson Silva Borges
 */

/* eslint-disable react/jsx-no-target-blank */
import { IoLogoGithub } from 'react-icons/io5';

import packageJson from '../package.json';
import { styled } from '../stitches.config';

const StyledFooter = styled('footer', {
  fontSize: '0.9em',
  padding: '15px 0 5px',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',

  '& > a': {
    fontWeight: 'bolder',
    color: '$teal9',
    display: 'inline-flex',
    padding: '0 5px',
  },

  '@sm': {
    width: 'calc(100% + 15px)',
  },
});

export default function FooterComponent() {
  return (
    <StyledFooter>
      Developed by
      <a href="https://github.com/hsborges" target="_blank">
        hsborges
      </a>
      |
      <a href="https://github.com/hsborges/bibtex-normalizer" target="_blank">
        <IoLogoGithub style={{ marginRight: 2 }} /> v{packageJson.version}
      </a>
    </StyledFooter>
  );
}
