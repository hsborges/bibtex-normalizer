/**
 * @author Hudson Silva Borges
 */
import { IoLogoGithub } from 'react-icons/io5';

import { styled } from '../stitches.config';

const StyledFooter = styled('footer', {
  fontSize: '0.9em',
  padding: '15px 0 5px',
  display: 'inline-flex',
  justifyContent: 'center',

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
      This tool is maintained by
      <a href="https://www.github.com/hsborges/bibtex-normalizer" target="_blank" rel="noreferrer">
        <IoLogoGithub style={{ marginRight: 2 }} /> hsborges
      </a>
    </StyledFooter>
  );
}