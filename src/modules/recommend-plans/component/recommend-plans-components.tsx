import {appFontColor, bodyText2, bodyText3, borderColor2,
  heading3, mediumFont, priceColor, whiteColor}
  from '@app/styles';
import {isMobile} from 'react-device-detect';
import styled from 'styled-components';

export const PlansSection = styled.div`
  /* border: 1px solid ${borderColor2}; */
  box-sizing: border-box;
  border-radius: 20px;
  padding: 20px 24px;
  &.payment-page {
    background: #F8F5F0;
  }
  &.bei-page {
    background: #faddbc;
    padding-bottom: 20px;
  }
  &.p-40 {
    padding: 40px;
  }
  &.p-4-24 {
    padding: 4px 24px;
  }
  &.border {
    border: 1px solid #b3a99f;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    margin-bottom: 24px;
  }
  &.maxWidth-443{
    max-width: 443px;
    margin: 0 auto;
  }
  .br-15 {
    border-top: 1px solid #eef0f4;
    padding-top: 15px;
  }
`;
export const PlanSecHead = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 8px;
`;
export const BodyText3 = styled.p`
  ${bodyText3};
  color: ${appFontColor};
  cursor: pointer;
  &.word-break{
    word-break: break-word;
  }
  &.line-through{
    text-decoration: line-through;
    color: #6F7381;
  }
  &.no-pointer{
    cursor: default;
  }
  &.f-15 {
    font-size: 15px;
    // line-height: 22px;
  }
  &.left-margin{
    margin-left: -2rem;
  }
  &.m-5{
    margin-top: 1.5rem;
  }
  &.br-15 {
    border-top: 1px solid #eef0f4;
    padding-top: 15px;
  }
  &.c-white {
    border-top: 1px solid #000000;
    padding-top: 15px;
  }
  &.c-grey {
    border-top: 1px solid #B8BCCA;
    padding-top: 16px;
  }
  &.clr-bl {
    color: #1e3653;
  }
  &.ml-10 {
    margin-left: 10px;
  }
  &.mt-0 {
    margin-top: 0px;
  }
  &.price-text {
    font-weight: 500;
    font-size: 18px;
    line-height: 42px;
    color: #cd8c00;
  }
  &.clr-gray {
    color: #6f7381;
  }
  &.f-13{
    font-size: 13px;
  }
  &.f-16 {
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
  }
  &.clr-green {
    padding: 10px 0;
    color: #067356;
  }
  &.m-0 {
    margin: 0;
  }
  &.mb-0{
    margin-bottom: 0;
  }
  &.pt-10 {
    padding-top: 10px;
  }
  &.mw-330{
    width: 330px;
    text-align: justify;
  }
  &.f-17 {
    font-weight: 500;
    font-size: 17px;
    line-height: 1.5;
  }
  &.f-17-r {
    font-weight: 400;
    font-size: 17px;
    line-height: 23px;
  }
  &.fw-400{
    font-weight: 400;
  }
  &.f-20-r {
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
  }
  &.align-l {
    text-align: justify;
    width: ${isMobile? '100%' : '376px'};
  }
  &.sign-up-label {
    font-size: 24px;
    color: #355f92;
  }
  &.plan-head{
    font-weight: 700;
    font-size: 15px;
    line-height: 20px;
    color: #000000;
  }
  &.f-16-21{
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
  }
  &.gap-8{
    gap: 8px;
  }
  &.text-left{
    text-align: left;
  }
  .f-24{
    font-size: 24px;
  }
`;

export const PlanError = styled.div`
font-size: 20px;
display: flex;
align-items: center;
padding: 1rem 0 2rem;
`;
export const SignInLabel = styled.div`
display: flex;
align-items: center;
& p:first-child{
    margin-right: 1.2rem;
}
`;
export const PricingText = styled.p`
    font-size:  24px;
    line-height: 42px;
    font-weight: 500;
    color: ${priceColor};
    margin: 0 0;
    span{
        font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    }
    &.lh-22{
      line-height: 22px;
    }
    &.py-10{
padding: 10px 0;
    }
    &.py-5{
        padding: 5px 0;
    }
    &.f-17{
        font-size: 17px;
    }
`;
export const Heading4 = styled.p`
    ${heading3};
    ${mediumFont};
    letter-spacing: -0.02em;
    &.fw-600{
        font-weight: 600;
    }
    &.mb-0{
        margin-bottom: 0px;
    }
    span{
        color: #067356;
    }
    &.f-14{
        font-weight: 400;
        font-size: 14px;
    }
    &.f-16{
        font-size: 16px;
        line-height: 24px;
        font-weight: 400;
    }
    &.fw-500{
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        color: #355F92;
    }
    &.txt-left{
        text-align: left;
    }
    &.mt-0{
        margin-top: 0;
    }
    &.c-white{
        color: ${whiteColor};
    }
`;
export const ListItem = styled.li`
    color: #067356;
    padding-bottom: 12px !important;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: #111A1C; 
    &::marker{
        color: red;
    }
    &::before{
        content: "\2022";
        color: red;
    }
    &.pb-12{
        padding-bottom: 12px !important ;
    }
    ${bodyText2};

    &:last-child{
        padding-bottom: 0 !important;
    }
`;
export const VideoContainer = styled.div`
    iframe{
        border-radius: 12px;
        border: 0px;
    }   
`;
export const BtnContainer= styled.div`
    margin-top: 45px;
`;
