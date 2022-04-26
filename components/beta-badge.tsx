import { HTMLProps } from 'react';

import { styled } from '@stitches/react';

export default styled(
  function (props: HTMLProps<HTMLSpanElement>) {
    return <span {...props}>Beta</span>;
  },
  {
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
    marginLeft: '-2em',
    transform: 'rotate(-40deg)',
  }
);
