import {
  appFontColor,
  bodyText2,
  borderColor2,
  fullContainer,
  mediumFont,
  priceColor,
  primaryBtnColor,
  whiteColor,
} from '@app/styles';
import {isMobile} from 'react-device-detect';
import styled from 'styled-components';

export const LoginContainer = styled.div`
  /* background-color: ${isMobile ? '#ffff' : '#E5E5E5;'};
  ${fullContainer};
  justify-content: center;
  display: flex;
  overflow-x: hidden; */
    background-color: ${isMobile ? '#ffff' : '#E5E5E5;'};
    height: 100%;
    justify-content: center;
    display: flex;
    overflow: ${isMobile ? 'auto' : 'hidden'};
    flex: ${isMobile ? 1:''};
`;
export const OldLoginContainer = styled.div`
      background-color: rgb(233, 220, 206);
    width: 100vw;
    height: 100vh;
    -webkit-box-pack: center;
    justify-content: center;
    display: flex;
    overflow-x: hidden;
`;
export const LocationContainer = styled.div`
    background-color: ${isMobile ? '#ffff' : '#E5E5E5;'};
    ${isMobile? '' : fullContainer}
   justify-content: center;
   display: flex;
   overflow-x: hidden;
`;
export const SignContainer = styled.div`
  display: flex;
  justify-content: center;
  &.er {
    margin-top: 1rem;
  }
`;
export const LoginTabContainer = styled.div`
  background-color: ${whiteColor};
  padding: ${isMobile ? '24px' : '49px 64px 64px'};
  height: ${isMobile ? '100%' : 'auto'};
  width: ${isMobile ? '100vw' : '512px'};
  min-height: ${isMobile ? '' : 'auto'};
  border: ${isMobile ? '' : '1px solid #eef0f4'};
  box-sizing: border-box;
  margin: 0 auto;
  border-radius: ${isMobile ? '0px' : '20px'};
  &.z-2 {
    position: relative;
    z-index: 2;
  }
  &.br-t-15 {
    border-top: 15px solid #f5b873;
  }
  &.pd-120 {
    padding: 90px 120px;
  }
  &.pt-90 {
    padding-top: 90px;
  }
  &.p-10-64 {
    padding: 10px 64px 0px;
  }
  &.p-0 {
    padding: 10px 64px 0px;
  }
  &.h-409 {
    height: ${isMobile ? '100%' : '409px'};
  }
  .confText {
    color: ${appFontColor};
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 27px;
  }
  .confMainText {
    color: ${appFontColor};
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 42px;
  }
  .disclaimer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .disclainerItem{
    color: #000000;
    margin-bottom: 16px;
    letter-spacing: -0.02em;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    cursor: pointer;
    display: flex;
    -webkit-box-align: center;
    align-items: center;

    &.active{
            color:  ${priceColor};
        }  
  }
  .sign_up{
    color: #000000;
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 42px;
  }
`;
export const PlansContainer = styled.div`
   background: #F8F5F0;
   border: 1px solid #EEF0F4;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.03);
    border-radius: 20px; 
    padding: 24px;
    margin-bottom: 16px;
    &.active{
        background: #F8F5F0;
    }
    &.inactive{
        background: #FFFFFF;
    }
    .price{
        font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 31px;
    color: #355F92;
    }
  .cardMainCon{
    color: #000000;
    margin: 8px 0 16px; 
    letter-spacing: -0.02em;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
  }
  ul li{
    color: #000000;
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 27px;
  }
`;
export const Footer = styled.div`
  /* margin-top: 50px; */
  text-align: center;
  &.mt-17 {
    margin-top: 17px;
  }
`;
export const LinkText = styled.p`
  color: ${primaryBtnColor};
  cursor: pointer;
  ${bodyText2};
  ${mediumFont};
  line-height: 20px;
  &.lh-0 {
    line-heignt: 0;
    margin: 0;
    margin-bottom: 0.8rem;
  }
  &:hover {
    text-decoration: underline;
  }
`;
export const IconTag = styled.span`
  padding-top: 15px;
  border-bottom: 2px solid ${borderColor2};
  cursor: pointer;
  &.b-none {
    border: none;
  }
`;


export const LeftPart = styled.div`
    width: 50%;
    background-color: red;
    display: flex;
    .logo-container{
        padding: 16px;
    }
    .image-container{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
