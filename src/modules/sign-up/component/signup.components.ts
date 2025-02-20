import {appFontColor, errorColor, whiteColor} from '@app/styles';
import {isMobile} from 'react-device-detect';
import styled from 'styled-components';

export const LayoutWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #fff;
    display: flex;
    *{
        box-sizing: border-box;
    }
    &.with-header{
        height: calc(100vh - 60px);
    }
    @media screen and (max-width: 575px) {
        flex-direction: column;
        overflow: auto;
    }
`;

export const LeftContainer = styled.div`
    min-width: 50%;
    max-width: 50%;
    height: 100%;
    background-color: #E2D2C0;
    display: flex;
    flex-direction: column;
    position: relative;
    @media screen and (max-width: 575px) {
        width: 100%;
        min-width: unset;
        max-width: unset;
        height: 323px;
        &.h-unset{
            height: unset;
        }
    }
`;

export const LogoWrapper = styled.div`
    padding: 24px;
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
`;

export const ImageContainer = styled.div`
    flex: 1;
    overflow: hidden;
    /* display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px; */
    /* img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    } */
    .plansImageSyles{
        width: 500px;
        height: 550px;
        object-fit: contain;
        @media screen and (max-width: 575px) {
            width: 100%;
            height: 355px;
            object-fit: cover;
    }
    }
`;

export const ProgramCard = styled.div`
    background-color: #fff;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
     @media screen and (max-width: 575px) {
            flex-direction: column;
    }
`;

export const ProgramCardContent = styled.div`
    flex: 1;
    padding: 24px;
`;

export const PlanImageHolder = styled.div`
    width: 250px;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
    @media screen and (max-width: 575px) {
            width: 100%;
    }
    
`;
export const ImageHolder = styled.div`
    width: 100%;
    height: 100%;
    &.payment{
        @media screen and (max-width: 575px) {
        padding: 12px 24px 24px;
    } 
    }
    &.has-svg{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    img{
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
    }
    @media screen and (max-width: 575px) {
        &.has-svg img{
            object-fit: contain;
        }
    }
`;

export const RightContainer = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 575px) {
        background: ${whiteColor};
        height: unset;
    }
`;

export const RightContent = styled.div`
    flex: 1;
    overflow: hidden;
    /* @media screen and (max-width: 575px) {
            overflow: auto;
    } */
    .shippingAddr{
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 30px;
        color: ${appFontColor};
    }
    .backContainerStyles{
        padding: 24px 0 0 40px;
    }
    .contentStyles{
        padding: 0 40px;
    }
    .successMainText{
        color: ${appFontColor};
        font-style: normal;
        font-weight: 400;
        font-size: 40px;
        line-height: 52px;
    }
    .success-wrapper{
            height: 100%;
            overflow: auto;
            padding: 24px;
            display: flex;
    }
    .todo-content-wrapper{
        height: 100%;
        overflow: auto;
        display: flex;
        flex-direction: column;
    }
    .appointmentNote{
        color: #000000;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 24px;
    }
    .content-wrapper{
        height: 100%;
        overflow: auto;
        /* padding: 24px; */
        padding: ${isMobile?'24px':'40px'};
        display: flex;
        flex-direction: column;
        /* @media screen and (max-width: 575px) {
            overflow: hidden;
    } */
        &>form{
            flex: 1;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            .form-content{
                flex: 1;
                overflow: auto;
                padding: 16px;
                display: flex;
                flex-direction: column;
                gap: ${isMobile? '26px' : '38px'}
            }
            .form-field-wrapper{
                display: flex;
                flex-direction: column;
                &>div{
                    padding-top: 0;
                }
            }
        }
    }
    .outer-content-wrapper{
        height: 100%;
        overflow: auto;
        padding: ${isMobile?'24px':'40px'};
        display: flex;
        flex-direction: column;
    }
    .sign_up{
    color: #000000;
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 42px;
  }
  .confText {
    color: ${appFontColor};
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 27px;
  }
`;

export const Error = styled.p`
    font-weight: 400;  
    font-size: 14px;
    line-height: 22px;
    color: ${errorColor};
    margin: 4px 0 0;
`;

export const BackBtnContainer = styled.div`
    display: flex;
    align-items: center;
    &.positioned{
        position: absolute;
        top: 24px;
        left: 24px;
    }
`;

export const BackIconContainer = styled.div`
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    svg{
        transition: all 0.3s ease;
    }
    &:hover {
        svg{
            transform: translateX(-6px);
        }
    }
`;

export const Actions = styled.div`
    padding-top: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 16px;
    &.confStyles{
        @media screen and (max-width: 575px) {
            flex-direction: column-reverse !important;
        }        
    }
    .responsive-small-btn{
        width: 100px;
        @media screen and (max-width: 575px) {
            width: 100%;
        }
    }
    .responsive-btn{
        width: 200px;
        @media screen and (max-width: 575px) {
            width: 100%;
        }
    }
    .responsive-Imbalance-btn{
        width: 250px;
        @media screen and (max-width: 575px) {
            width: 100%;
        }
    }
    &.in-card{
        margin-top: auto;
    }
`;

export const ConfirmationText = styled.p`
    font-size: 15px;
    line-height: 22px;
    color: #000;
    font-style: normal;
    font-weight: 400;
    margin: 0;
    .mx-4{
        margin-left: 4px;
        margin-right: 4px;
    }
    &.show-on-mobile{
        display: none;
    }
    @media screen and (max-width: 575px) {
        &.text-sm-left{
            text-align: left;
        }
        &.show-on-mobile{
            display: block;
        }
    }
`;

export const LoginLinks = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 16px;
    &>p{
        margin: 0 !important;
    }
    @media screen and (max-width: 575px) {
        /* flex-direction: column; */
        align-items: flex-start;
    }
`;
export const TextContent = styled.div`
    flex: 1 1 0%;
    /* overflow: auto; */
    padding: 16px;
    display: flex;
    flex-direction: column;
    .plans-content{
        font-style: normal;
        font-weight: 400;
        font-size: 32px;
        line-height: 42px;
        color: #000000;
    }
    .plan-sub-content{
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 27px;
        color: ${appFontColor};
    }
    .mx-24-45{
        margin: 24px 0 45px 0;
    }
    .plan-h3{
        color: ${appFontColor};
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 31px;
    }
    .plans-li{
        color: ${appFontColor};
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 27px;
    }
`;
export const LocationOptions = styled.div`
    color: #000000;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;

    svg{
        margin-top: 3px;
    }
`;
export const PlanCardsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    &>div{
        overflow: hidden;
    }
    @media screen and (max-width: 575px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;
