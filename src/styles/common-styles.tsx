/* eslint-disable max-len */
import {FlexProps, progressProps, StylingProps} from '@app/utils/props';
import {isMobile} from 'react-device-detect';
import styled from 'styled-components';

import {appFontColor, errorColor,
  greenColor,
  primaryBackgroundColor, whiteColor}
  from './colors';
import {desktopHeading1, heading1, heading3, mediumFont, regularFont}
  from './font-styles';
import {screenSize} from './screen-size';
import LocationBG from '@app/assets/images/location-conf.jpg';

export const MainContainer = styled.div`
    overflow: hidden;
    width: 100vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    ${({bgColor}: StylingProps) => {
    return `background: ${bgColor ? bgColor : primaryBackgroundColor} };`;
  }}    
  .partitionDiv{
    background: #E2D2C0;
  }
  &.fxh-100{
    height: 100%;
    display: block;
  }
  &.scroll{
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
  &.flx-start{
    align-items: flex-start;
  }
  &.90vh{
    height: 90vh;
  }
  .signupScreen{
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: ${isMobile ? 'column' : ''}
  }
  /* .locationConf{
    background-image: url(${LocationBG});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-blend-mode: multiply;
  } */
`;
export const PaymentMainScreen = styled.div`
 overflow: hidden;
    width: 100vw;
    height: 100%;
    display: flex;
    ${({bgColor}: StylingProps) => {
    return `background: ${bgColor ? bgColor : primaryBackgroundColor} };`;
  }}    
  .partitionDiv{
    background: #E2D2C0;
  }
  &.fxh-100{
    height: 100%;
    display: block;
  }
  &.scroll{
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
  &.flx-start{
    align-items: flex-start;
  }
  &.90vh{
    height: 90vh;
  }
`;
export const WhiteContainer = styled.div`
    position: relative;
    height: 100%;
    padding: 15px;
    @media (${screenSize.tablet}) {
        background-color: ${whiteColor};
    }
`;
export const FlexContainer = styled.div`
    display: flex;    
    padding: 24px;
    ${({alignItems}: FlexProps) => {
    return `align-items: ${alignItems ? alignItems : 'baseline' };`;
  }}
  ${({alignItems}: FlexProps) => {
    return `align-items: ${alignItems ? alignItems : 'center' };`;
  }}
    ${({flexDirection}: FlexProps) => {
    return `flex-direction: ${flexDirection ?flexDirection : 'row'};`;
  }}
  ${({justifyContent}: FlexProps) => {
    return `justify-content: ${justifyContent ?justifyContent : 'flex-start'};`;
  }}
   @media (${screenSize.tablet}) {
       padding: 25px 40px;
    }
    &.p-10{
      padding: 10px 24px;
    }
    &.ptb-0{
      padding: 10px 0;
    }
    &.plr-24{
      padding: 0 24px
    }
    &.p-0{
      padding: 0;
    }
    &.w-100{
      width: 100%;
    }
    &.bg-bie{
      background: #E2D2C0;
    }
    &.w-98{
      width: 98%;
    }
    `;

export const PaymentHeader = styled.h2`
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 42px;
  color: ${appFontColor};
`;
export const Heading = styled.h1`
    margin:  18px 0;
    ${mediumFont};
    ${heading1};
    color: ${appFontColor};
    &.plr-78{
      padding: 0 78px;
    }
    &.success{
      color: green;
      text-align: center;
    }
    &.f-32{
      font-weight: 500;
      font-size: 32px;
      line-height: 41px;
      letter-spacing: -0.02em;
      color: #000000;
span{
  padding: 0 5px;
  &.layout1{
    background: #CDEAE1;
  }
  &.layout2{
    background: #E9DCCE;
  }
  &.layout3{
    background: #FADDBC;
  }
  &.quitz{
    font-weight: 400;
font-size: 40px;
line-height: 52px;
color: #000000;
    text-align: inherit;
    /* padding: 0px 112px */
    }
}
    }
    @media (${screenSize.tablet}) {
      ${desktopHeading1};
      ${regularFont};
    }
    &.f-20{
      font-size: 20px;
      line-height: 28px;
    }
    &.f-18{
      font-weight: 500;
      font-size: 18px;
      line-height: 32px;
    }
    &.bg-blue{
      border-top-left-radius: 16px;
    border-top-right-radius: 16px;
      background: #F3F7FA;
      color: #111A1C;
    margin: 0;
    padding: 35px;
    }
    &.ptb-15{
      padding: 15px 30px;
    }
    &.m-0{
      margin: 0;
    }
    &.mb-0{
      margin-bottom: 0;
    }
    &.mt-0{
      margin-top: 0;
    }
    &.f-24{
      font-weight: 500;
    font-size: 24px;
    line-height: 30px;
    }
    &.paymentHeaderstyles{
      font-style: normal;
      font-weight: 400;
      font-size: 32px;
      line-height: 42px;
    }
    &.logInContainerTitle{
      margin-bottom: 32px;
      margin-top: 0;
      text-align: center;
      span.bg-highLighted{
        background-color: #CDEAE1;
        margin-left: 6px;
      }
    }
    &.f-32-42{
          font-weight: 400;
          font-size: 32px;
          line-height: 42px;
    }
`;
export const Heading2 = styled.h2`
  color: ${appFontColor};
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 42px;
`;
export const RootcauseDue = styled.div`
    color: ${appFontColor};
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 27px;
`;
export const Heading3 = styled.h3`
    ${mediumFont};
    ${heading3};
    color: ${appFontColor};
    text-align: center;
    &.p-15{
      padding: 0 15px;
    }
    &.txt-left{
      text-align: left;
    }
    &.head-bill{
      font-style: normal;
font-weight: 500;
font-size: 18px;
line-height: 28px;
color: #111A1C;
padding: 15px 0;
margin: 0;
text-align: left;
    }
    &.m-0{
      margin: 0 !important;
    }
    &.mt-0{
      margin-top: 0;
    }
    &.f-28{
      font-size: 28px;
      line-height: 45px;
    }
    &.txt-left{
      text-align: left;
      text-transform: capitalize;
    }
    &.f-32{
      font-weight: 500;
font-size: 32px;
line-height: 160%;
margin-bottom: 0px;
    }
    &.flex-icon{
      display: flex;
      align-items: center;
      padding: 0 30px;
      svg{
        padding-right: 5px;
        path{
          fill: #111A1C;
        }
      }
    }
    &.f-24{
      font-weight: 500;
font-size: 24px;
line-height: 140%;
margin: 0;
text-transform: capitalize;
    }
    &.mb-15{
      margin-bottom: 15px;
    }
    &.f-16{
      font-weight: 600;
font-size: 16px;
line-height: 24px;
    }
    &.caps{
      text-transform: capitalize;
    }
    &.f-18{
      text-align: left;
    font-weight: 500;
    font-size: 18px;
    line-height: 1.5;
    }
    .p-15{
      padding : 0 15px;
    }
    .mb-0{
      margin-bottom: 0;
    }
    .f-18{
      font-size: 18px;
      line-height: 24px;
      &.w-500{
        font-weight:500;
      }
    }
     .f-14{
      font-size: 14px;
    }
   
`;

export const HeaderDiv = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
&.w-15{
  width: 15% !important;
}
&.w-auto{
  width: auto;
}
& span{
  /* width: 15%; */
}
`;
export const BTWSpan = styled.span`
display: flex;
align-items: center;
font-size: 17px;
font-weight: 500;
line-height: 22px;
color: #000000;
cursor: pointer;
&.absolute{
  position: absolute;
}
&.left-0{
  left: 0px;
}
`;
export const ChatHeaderName = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: #0F1828;
`;
export const ProDefImage = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: #97ccc0;
  font-size: 35px;
  color: #fff;
  text-align: center;
  line-height: 90px;
  font-weight: 500;
  text-transform: uppercase;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  &.w-50{
    width: 50px;
    height: 50px;
    line-height: 50px;
    font-size: 25px;
  }
  &.w-40{
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
  }
  &.w-48{
    width: 48px;
    height: 48px;
    line-height: 48px;
    font-size: 20px;
  }
  &.w-64{
    width: 64px;
    height: 64px;
    line-height: 64px;
    font-size: 32px;
  }
  &.w-98{
    width: 98px;
    height: 98px;
    line-height: 98px;
    font-size: 40px;
  }
  &.w-72{
    width: 72px;
    height: 72px;
    line-height: 72px;
    font-size: 32px;
    margin-bottom: 8px;
  }
  &.w-25{
    width: 25px;
    height: 25px;
    line-height: 25px;
    font-size: 12px;
  }
  &.w-35{
    width: 35px;
    height: 35px;
    line-height: 1.5;
    font-size: 16px;
  }
  &.m-0{
    margin: 0;
  }
  `;
export const DesktopWidth = styled.div`
   &.desktopStyles{
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    display: ${isMobile ? '' : 'flex'};
    align-items: center;
    &.testclass{
      align-items: flex-start;
    }
   }
    @media (${screenSize.tablet}) {
      max-width: 660px;
      padding:15px 35px;
      width: 100%;
      margin: 0 auto;
      &.py-15{
        padding: 15px 0;
      }
      &.w-78{
        width: 78%;
      }
      &.w-1150{
        max-width: 100vw;
        box-sizing: border-box;
      }
      &.r-border{
        border: 1px solid #FFFFFF;
        box-sizing: border-box;
        filter: drop-shadow(2px 2px 15px rgba(0, 0, 0, 0.1));
        border-radius: 20px;
      }
      &.ptb-0{
        padding: 0 35px;
      } 
      &.type-form{
    padding: 0;
    background: #F3F7FA;
    border: 2px solid #FFFFFF;
    border-radius: 20px;
  } 
  }
  &.fixed-footer{
    &.h-64{
      padding: 0;
    height: 64px;
  }   
  }
  @media (${screenSize.desktop}) {
    margin: 0 auto;
    &.w-1150{
        max-width: 1150px;
        box-sizing: border-box;
      }
  }
  max-width: 100vw;
  &.w-100{
    width: 100%;
  }
  &.fixed-footer{
    &.b-64{
      bottom: 64px;
    }
    position: fixed;
   bottom: 0;
   left: 0;
   right: 0;
   z-index: 2;
   margin: 0 auto;
    ${({bgColor}: StylingProps) => {
    return `background: ${bgColor ? bgColor : 'transparent'} };`;
  }}
  &.ds-footer{
    max-width: 650px;
    padding: 10px 20px;
  }
 
  }
  &.sticky-footer{
    position: sticky;
    bottom: 0;
    background: white;
    z-index: 2;
    overflow: hidden;
    border-radius: 0 0 20px 20px;
  }
  .p-35{
    padding: 35px;
  }
  &.p-0{
    padding: 0px;
  }
  &.br-tp{
    border-top: 1px solid #EEF0F4;
  }
  &.intake-form-cardContainer{
    border: ${isMobile?'':'2px solid #EEF0F4'};
    box-shadow:  ${isMobile?'': '0px 2px 30px rgba(0, 0, 0, 0.05)'};
    border-radius: ${isMobile? '0' : '20px'};
    overflow: hidden;
  }
  &.commonSection-padding{
    padding-top: 52px;
    padding-bottom: 24px;
  }
 
`;
export const FormWidth = styled.div`
  max-width: 750px;
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
  box-sizing: border-box;
`;
export const Link = styled.span`
  color :#355F92;
  text-decoration: underline;
  cursor: pointer;
  font-weight: 500;
  &.cursor-default{
    cursor: default;
  }
  &.tx-n{
    text-decoration: none;
  }
  &.restrict{
    cursor: not-allowed;
    pointer-events: none;
    color: #B8BCCA;
  }
  &.f-17{
    font-size: 17px;
    line-height: 22px;
    font-weight: 500;
    color: #355F92;
  }
  &.link-st{
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #067356;
    padding-top: 15px;
    text-decoration: none;
  }
  &.f-14{
    text-decoration: none;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
  }
  &.f-14-fl{
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: end;
    &:hover{
      text-decoration: underline;
    }
  }
  &.al-dan{
    font-size: 12px;
    display: flex;
    justify-content: end;
    color: #B11818;
    text-decoration: none;
    &:hover{
      text-decoration: underline;
    }
  }
  &.f-16{
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
  }
  &.align{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }
  &.no-pointer{
    cursor: default;
    pointer-events: none;
}
`;
export const Error = styled.p`
  margin-top: 8px;
  color: ${errorColor};
  position: absolute;
  bottom: 0;
  left: 0;
  top: 53px;
  width: 100%;
  margin: 0 0;
  font-weight: 400;  
  font-size: 14px;
line-height: 22px;
   &.topUnset{
    top: unset !important;
   }
   &.bottomUnset{
    bottom: unset !important;
   }
`;
export const PageCenter = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;
export const Loader = styled.div`
     position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
    height: 100vh;
    backdrop-filter: blur(15px);
    /* background: ${whiteColor}; */
`;
export const GProgressBar = styled.div`
    width: 100%;
    height: 6px;
    // background: #355f920d;
    // background: #fff;
    border-radius: 10px;
    &.dr-orange{
      background: #FAF6ED;
    }
    &.col-grey{
      background: #EEF0F4;
      border-radius: 19px;
    }
`;
export const GProgressBarFill = styled.div`
    height: 6px;
    background: #355f92;
    border-radius: 10px;
    &.dr-orange{
      background: #AA7910  
    }
    &.col-green{
      background: #72C4AA;
      border-radius: 19px;
    }
    ${({width}: progressProps) => {
    return `width: ${width ?width : 0};`;
  }}
    
`;
export const GProgressCircle = styled.div`
   margin: 150px auto;
  width: 150px;
  height: 150px;
  background: #fefcff;
  border-radius: 50%;
  border: 1px solid #cdcbd0;
`;
export const GProgressCircleFill = styled.div`
   width: 122px;
  height: 122px;
  border-radius: 50%;
  background: #d2eaf1;
  line-height: 120px;
  text-align: center;
  margin-top: 14px;
  margin-left: 14px;
  color: #1e51dc;
  position: absolute;
  z-index: 100;
  font-weight: 700;
  font-size: 2em;
    /* ${({width}: progressProps) => {
    return `width: ${width ?width : 0};`;
  }} */
    
`;
export const MonthPicker = styled.div`
  background: #fff;
  display: inline-block;
  padding: 0 5px;
  z-index: 2;
  .react-datepicker__input-container {
    input {
      cursor: pointer;
      width: 150px;
      border: 1px solid #eaeaea;
      padding: 5px;
      text-align: center;
    }
  }
`;
export const InputLabel = styled.div`
font-weight: 400;
font-size: 16px;
line-height: 16px;
`;

export const AppointmentsStatusCard = styled.div`
  width: 100%;
  min-height: 88px;
  padding: 24px;
  ${({bgColor}: StylingProps) => {
    return `background: ${bgColor ? bgColor : '#FADDBC'} };`;
  }} 
  border-radius: 10px;
  box-sizing: border-box;

  .AppointmentStatusTitle{
    font-weight: 500;
    font-size: 16px;
    line-height: 1.5;
    color: #000000;
  }
`;

export const PhasesOfCareCard = styled.div`
  padding: 24px 64px;
  position: relative;
  ${({bgColor}: StylingProps) => {
    return `background: ${bgColor ? bgColor : 'transparent'} };`;
  }}  
  z-index: 1;
  .phasesOfCareCardHeader{
    font-weight: 500;
    font-size: 20px;
    line-height: 26px;
    letter-spacing: -0.02em;
    margin-bottom: 8px;
  }
  .phasesOfCareCardText{
    font-weight: 400;
    font-size: 17px;
    line-height: 23px;
    color: #111A1C;
  }
  &.active:before {
    content: '';
    width: 2px;
    // height: calc(100% - 32px);
    height: 100%;
    position: absolute;
    top: 34px;
    left: 32px;
    z-index: 4;
    background-color: #278C71;
}
&:last-child::after {
  content: '';
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #6F7381;
  position: absolute;
  bottom: 8px;
  left: 23px;
}

`;
export const PhasesOfCareStepsContainer = styled.div`
position: relative;
// background: linear-gradient(180deg, rgba(250,221,188,1) 0%, rgba(245,184,115,1) 100%);
height: fit-content;
&:before{
  content: '';
    width: 2px;
    height: calc(100% - 53px);
    background: transparent;
    border-left: 2px dashed #6F7381;
    position: absolute;
    top: 36px;
    // top: 50%;
    // transform: translateY(-50%);
    left: 32px;
    z-index: 2;
 }
 &:after {
    content: '';
    width: 10px;
    height: 10px;
    background: #278c71;
    border-radius: 50%;
    position: absolute;
    top: 34px;
    left: 28px;
    z-index: 2;
}
`;
export const ProfileDropdown = styled.div`
  position: relative;
  cursor: pointer;
`;
export const ProfileDropdownMenu = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    transform: translate3d(0px, 38px, 0px);
    top: 0px;
    right: 0px;
    will-change: transform;
    z-index: 3;
    display: block;
    box-sizing: border-box;
    flex: 1 1 auto;
    background-color: ${whiteColor};
    border-radius: 3px;
    box-shadow: var(--ds-shadow-overlay,0 4px 8px -2px rgba(9,30,66,0.25),0 0 1px rgba(9,30,66,0.31));
    overflow: auto;
    min-width: 250px;
    padding: 18px 0;
`;
export const ProfileDropdownItem = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: flex-start;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5;
    cursor: pointer;
    padding:  18px 24px;
    color: #000000;
    opacity: 0.9;
    span {
      svg path {
        fill: #000000;
      }
    }
    &:hover,.active{
      background-color: rgba(6,115,86,.1);
      color: #00453e;
      svg path {
        fill: #067356;
      }
    }
    &.active{
      background-color: rgba(6,115,86,.1);
      color: #00453e;
      svg path {
        fill: #067356;
      }
    }

`;
export const GWSliderSection = styled.div`
padding: 40px 0;
${({bgColor}: StylingProps) => {
    return `background: ${bgColor ? bgColor : ''} };`;
  }} 

`;
export const GWSliderCard = styled.div`
  display: flex;
  flex-direction: row;
  min-width: ${isMobile?'180px': '325px'};
  max-width: ${isMobile? '290px': ''};
  min-height: 211px;
  background: #ffffff;
  border: 1px solid #ddd;
  box-shadow: 2px 2px 15px rgb(0 0 0 / 10%);
  border-radius: 24px;
  overflow: hidden;
  margin-right: ${isMobile? '16px' : '24px'};
  @media (${screenSize.maxMobile}) {
    flex-direction: column;
    min-height: 340px;
}

`;
export const GWSliderImageHolder = styled.div`
  width: 117px;
  object-fit: cover;
  // height: 100%;
  @media (${screenSize.maxMobile}) {
   width: 100%;
   height: 134px;
}
  .slide-imgResponsive{
    width: 100%;
    height: 100%;
    max-width: 100%;
    object-fit: cover;
  }
`;

export const GWSliderContentHolder = styled.div`
    flex: 1;
    padding: 24px;
    display: flex;
    flex-direction: column;
    .clientBio{
      .clientDetails{
        padding: 8px 0;
        @media (${screenSize.maxMobile}) {
          align-items: flex-start;
       }
        span {
          &.clientName,&.clientAge {
            font-weight: 500;
            font-size: 16px;
            line-height: 20px;
            color: #1B2324;
            line-height: 1.3;
            &.clientAge{
              // color: ${greenColor}
          }
        }
      }
    }   
  }
`;
export const BottomChat = styled.div`
position: fixed;
bottom: 24px;
right: 24px;
cursor: pointer;
border: 2px solid #355e90;
border-radius: 50%;
height: 40px;
width: 40px;
padding: 2px;
display: flex;
align-items: center;
justify-content: center;
box-shadow: 0 4px 12px rgb(0 0 0 / 30%);
  svg{
    width: 32px;
    height: 32px;
  }
`;
