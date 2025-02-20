import React from 'react';
import Icon from '../icon';
import {Container, IconContainer, Input, InputContainer}
  from './input-components';
/**
* it's a Props we receive from module
*/

type Props = {
  type?: string;
  label?: string;
  star?: string;
  disabled?: boolean;
  placeholder?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: any) => void;
  onKeyDown?: (e: any) => void;
  onBlur?: (e: any) => void;
  onKeyUp?: (e: any) => void;
  register?: any;
  min?: string;
  id?: string;
  className?: string;
  iconName?:any;
  pattern?:string;
  hClass?: string;
  error?: string;
  validate?:boolean;
  children?: any;
  viewPass?: any;
  showPass?: any;
};

/**
 *
 * @param  {Props} props the api
 * @return {Tabs} global component
  */
export default function CommonInput({
  type = 'text',
  label,
  disabled,
  placeholder,
  name,
  iconName,
  value,
  onChange,
  onKeyDown,
  onBlur,
  onKeyUp,
  register,
  star,
  min,
  id,
  className,
  pattern,
  validate,
  hClass,
  error,
  children,
  viewPass,
  showPass,
  defaultValue,
}:Props) {
  return (
    <>
      <Container className={className}>
        {iconName ? <IconContainer className='icon-lt'>
          <Icon name={iconName} />
        </IconContainer> : null}
        {placeholder === 'Phone' &&
        <Input className='w-32 padding-0' defaultValue='+1' disabled />
        }
        <InputContainer>
          <Input
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            onKeyUp={onKeyUp}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            className={className}
            pattern={pattern}
            min={min}
            id={id}
            defaultValue={defaultValue}
            {...register}
          >
            {children}
          </Input>
        </InputContainer>
        {viewPass ? <IconContainer className='icon-rt'
          onClick={()=>viewPass(showPass === 'password' ? 'text' : 'password')}>
          <Icon name={showPass === 'text' ? 'openEye' : 'eye'} />
        </IconContainer> : null}
        {validate ? <IconContainer className='icon-rt'>
          <Icon name='check' />
        </IconContainer> : null}
      </Container>

    </>

  );
}
