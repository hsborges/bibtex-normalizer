/**
 * @author Hudson Silva Borges
 */
import { FunctionComponent, HTMLAttributes } from 'react';
import { IoCheckmarkSharp } from 'react-icons/io5';

import * as Checkbox from '@radix-ui/react-checkbox';
import { styled } from '@stitches/react';

const CheckboxRoot = styled(Checkbox.Root, {
  all: 'unset',
  color: '$teal9',
  backgroundColor: 'white',
  width: 16,
  height: 16,
  border: '1px solid $teal9',
  marginRight: 5,
  borderRadius: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 10px $teal9',
  '&:hover': { backgroundColor: '$teal2' },
  '&[disabled]': { backgroundColor: '$teal3', color: '$teal8', borderColor: '$teal8' },
});
const CheckboxIndicator = styled(Checkbox.Indicator, { display: 'flex', alignItems: 'center' });
const CheckboxLabel = styled('label', { lineHeight: 1.25 });
const Flex = styled('div', { display: 'flex', alignContent: 'center' });

const CheckboxComponent: FunctionComponent<
  HTMLAttributes<HTMLDivElement> & Checkbox.CheckboxProps & { defaultLabel?: string }
> = function ({
  checked,
  defaultChecked,
  disabled,
  onCheckedChange,
  defaultLabel,
  ...props
}): JSX.Element {
  return (
    <Flex {...props}>
      <CheckboxRoot
        id={defaultLabel}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
      >
        <CheckboxIndicator>
          <IoCheckmarkSharp />
        </CheckboxIndicator>
      </CheckboxRoot>
      <CheckboxLabel hidden={!defaultLabel} htmlFor={defaultLabel}>
        {defaultLabel}
      </CheckboxLabel>
    </Flex>
  );
};

export default styled(CheckboxComponent, {
  display: 'flex',
  justifyItems: 'center',
  maxHeight: '1em',
});
