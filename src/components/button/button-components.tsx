import styled from 'styled-components';
import {
  warmHoverColor,
  warmActiveColor,
  warmColor,
  warmBorderColor,
  warmBackground,
  // boldFont,
  primaryBtnColor,
  whiteColor,
  btnBgColor,
  color10,
  footerText4,
  primaryBtnHoverColor,
  secondaryHoverBtnColor,
  primaryBtnFocusColor,

} from '../../styles';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'disabled' | 'warm' | 'transparent'
  size?: 'small' | 'medium' | 'large' | 'xLarge'
  width?: string
}

export const ButtonContainer = styled.button`
    font-family: 'DM Sans', sans-serif;
    height: 48px;
    min-width: 110px;
    border: 0 none;
    border-radius: 16px;
    outline: none;
    cursor: pointer;
    display:flex;
    justify-content: center;
    align-items: center; 
    font-weight: 500;
    transition: color .15s ease-in-out,
    background-color .15s ease-in-out,
    border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    &.br-5{
      border-radius: 5px;
      padding: 10px !important;
    }
    &.restricted-border{
      border: 1px solid #B8BCCA;
    }
    &.w-85{
      min-width: 85px !important;
    }
    &.br-10{
      border-radius: 10px;
      font-size: 17px;
      line-height: 22px;
    }
    &.f-17{
      font-size: 17px;
      line-height: 22px;
    }
    &.col{
      color: #ffffff !important;
    }
    &.br-12{
      border-radius: 12px !important;
      font-size: 17px;
      line-height: 22px;
    }
    &.h-40{
      height : 40px;
    }   
    svg {
      margin-right:8px;
    }
    &.just-ar{
    justify-content: space-around !important;
  }
  &.with-animation{
    animation: size-scale 2s infinite ease;
    box-shadow: 0 0 15px rgb(0 0 0 / 25%);
  }
  &.hover:hover{
    box-shadow: 0 0 15px rgb(0 0 0 / 25%);
  }
  &.mb-50{
    margin-bottom: 50px;
  }
  &.px-4{
    padding: 0 2rem;
  }
  &:active{
    transform: scale(0.99);
  }
  &.blue:hover{
    background-color: #1E3653;
    color: #ffffff;
  }
  @keyframes size-scale{
    0%{
      transform: scale(1);
    }
    50%{
      transform: scale(0.90);
    }
    100%{
      transform: scale(1);
    }
    }
    ${footerText4};
    ${({width}: ButtonProps) => {
    if (width) {
      return `width: ${width};`;
    }
  }}
    ${({size}: ButtonProps) => {
    if (size === 'large') {
      return `
                padding: 10px 15px;
            `;
    } else if (size === 'xLarge') {
      return `
                padding: 16px 40px;
            `;
    } else if (size === 'medium') {
      return `
                padding: 10px 15px;
            `;
    } else if (size === 'small') {
      return `
                height: 29px;
                padding: 8px;
            `;
    }
  }}
    ${({variant}: ButtonProps) => {
    if (variant === 'primary') {
      return `
                background: ${btnBgColor};
                color: ${whiteColor};
                &:hover{
                  background: ${primaryBtnHoverColor};
                }
                &:focus{
                  background: ${primaryBtnFocusColor};
                }
            `;
    } else if (variant === 'secondary') {
      return `
                background-color: ${whiteColor};
                color: ${primaryBtnColor};
                border:1px solid ${btnBgColor};
                &:focus{
                  background: ${whiteColor};
                }
                &:hover{
                  // background: ${secondaryHoverBtnColor};
                }
            `;
    } else if (variant === 'disabled') {
      return `
                background: #EEF0F4;
                color: ${color10};
                cursor: not-allowed;
                pointer-events: none;
               
            `;
    } else if (variant === 'warm') {
      return `
                background-color: ${warmBackground};
                font-size: 0.9rem;
                color: ${warmColor};
                border:1px solid ${warmBorderColor};
                &:hover {
                    background-color: ${warmHoverColor};
                }
                &:active {
                    background-color: ${warmActiveColor};
                }
            `;
    } else if (variant === 'transparent') {
      return `
                background-color: transparent;
                color: ${primaryBtnColor};
                border:1px solid ${btnBgColor};
            `;
    }
  }}
`;
