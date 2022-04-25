/**
 * @author Hudson Silva Borges
 */
import { RefAttributes } from 'react';

import * as ReactSwitch from '@radix-ui/react-switch';
import { styled } from '@stitches/react';

const StyledSwitch = styled(ReactSwitch.Root, {
  all: 'unset',
  width: 42,
  height: 18,
  backgroundColor: '$violet6',
  border: '1px solid transparent',
  borderRadius: '9999px',
  position: 'relative',
  boxShadow: `0 2px 10px $violet9`,
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  '&:focus': { boxShadow: `0 0 0 2px transparent` },
  '&[data-state="checked"]': { backgroundColor: 'White', border: '1px solid $violet9' },
  '&[data-disabled]': { border: '1px solid $violet6' },
});

const StyledThumb = styled(ReactSwitch.Thumb, {
  display: 'block',
  width: 20,
  height: 16,
  backgroundColor: 'white',
  borderRadius: '9999px',
  boxShadow: `0 2px 2px $violet9`,
  transition: 'transform 100ms',
  transform: 'translateX(2px)',
  willChange: 'transform',
  '&[data-state="checked"]': {
    transform: 'translateX(20px)',
    backgroundColor: '$violet9',
  },
  '&[data-disabled]': { backgroundColor: '$violet6' },
});

export default function Switch(props: ReactSwitch.SwitchProps & RefAttributes<HTMLButtonElement>) {
  return (
    <StyledSwitch {...props}>
      <StyledThumb />
    </StyledSwitch>
  );
}
