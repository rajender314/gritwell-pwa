/* eslint-disable require-jsdoc */
import * as React from 'react';
import {
  Container,
  Label,
  CheckboxContainer,
  CheckboxComponent,
  HiddenInput,
  Text,
} from './checkbox-components';

type Props = {
  size?: 'default' | 'small';
  label?: string;
  value?: string;
  checked?: boolean;
  onChange: (e: any) => void;
  children?: any
  ref?: React.RefObject<HTMLInputElement>;
  name?: string;
};

export default function Checkbox({
  size = 'default',
  label,
  value,
  checked,
  children,
  onChange,
  ref,
  name,
}: Props) {
  return (
    <Container className="drl-radio">
      <Label >
        <CheckboxContainer size={size} >
          <HiddenInput
            name={name}
            ref={ref}
            type="checkbox"
            value={value}
            checked={checked}
            onChange={onChange}
          />
          <CheckboxComponent size={size} />
        </CheckboxContainer>
        <Text size={size}>{label}</Text>
      </Label>
    </Container>
  );
}
