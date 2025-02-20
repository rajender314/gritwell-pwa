import React from 'react';
import {ButtonContainer} from './button-components';

type Props = {
  variant?: 'primary' | 'secondary' | 'disabled' | 'warm' | 'transparent'
  size?: 'small' | 'medium' | 'large' | 'xLarge'
  width?: string
  type?: 'button' | 'submit'
  onClick?: (e: any) => void
  children: any
  className?: any
  refevar?: any
  color?: any
}
/**
 *
 * @param  {Props} from the api
 * @return {button} global component
  */
export default function Button({
  variant = 'primary',
  size = 'large',
  width = '100%',
  type = 'button',
  onClick,
  children,
  className,
  refevar,
}: Props) {
  return (
    <ButtonContainer
      variant={variant}
      size={size}
      width={width}
      type={type}
      onClick={onClick}
      className={className}
      ref={refevar}
    >
      {children}
    </ButtonContainer>
  );
}
