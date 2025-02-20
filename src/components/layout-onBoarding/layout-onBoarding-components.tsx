import {appFontColor, bodyText3, color1, color2,
  primaryTextColor,
  regularFont, whiteColor} from '@app/styles';
import {isMobile} from 'react-device-detect';
import styled from 'styled-components';

export const IconsContainer = styled.div`
   width: 90px;
   height: 90px;
   background-color: transparent;
   border: 2px solid ${whiteColor};
   border-radius: 8px;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   position: absolute;  
   &.layout1{
      width: 96px;
      height: 96px;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
       border: 1px solid ${whiteColor};
   background-color: ${whiteColor};
   border-radius: 195.885px;
      &:nth-child(1){
         top: 0;
         left: 0;
      }
      &:nth-child(2){
         top: 0;
         right: 0;  
      }
      &:nth-child(3){
         bottom: 0;
         left: 0;
      }
      &:nth-child(4){
         bottom: 0;
         right: 0;
      }
      &.center-aligned{
         width: 72px;
         height: 72px;
         border-radius: 50%;
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%);        
      }
   }
   &.layout2{
      width: unset;
      height: unset;
      border: none;
      &:nth-child(1){
         top: -12px;
         left: 50%;
         transform: translateX(-50%);
      }
      &:nth-child(2){
         bottom: 4px;
         left: 7px;
      }      
      &:nth-child(3){
         bottom: 4px;
         right: 6px;
      }
      &:nth-child(4){
         bottom: 17%;
         right: 50%;
         left: 50%;  
         .img-4{
            border: 1px solid;
            span{
               border: none;
               font-size: 15px;
               font-weight: 400;
               line-height: 20px;
            }
            width: 54px;
            height: 54px;
            img{
            filter: blur(2px);
            }
         }      
      }
   }
   
   &.layout3{
      position: relative;
      /* border: 1px solid ${color1}; */
      width: 95px;
    padding: 12px 0;
      margin-bottom: 10px;
      justify-content: flex-start;
      background: ${whiteColor};
      border-radius: 16px;
   }
   &.w-40{
      width: 40px;
    height: 40px;
    margin-top: 10px;
    &.b-0{
      border: 0;
    }
   }
`;

export const ImageWrapper = styled.div`
   width: 100px;
   height: 100px;
   border-radius: 50%;
   /* border: 2px solid ${whiteColor}; */
   /* margin-bottom: 6px; */
   overflow: hidden;
   &.w-54{
      width: 54px;
      height: 54px;
   }
   img{
      width: 100%;
      height: 100%;
      object-fit: cover;
   }
   &.blur-image{
      margin: 0 auto;
      filter: blur(2px);
   }
   &.m-10{
      margin-top: 10px;
   }
   &.w-50{
      width: 50px;
      height: 50px;
      margin-bottom: 0;
   }
   &.w-72{
      width: 72px;
      height: 72px;
   }
   &.w-unset{
      width: unset;
   }
   &.h-unset{
      height: unset;
   }
`;

export const ContentContainer = styled.div`
   &.warning-message{     
      text-align: center;
    margin: 15px;
    padding: 0 10px;
   }
   &.button-container{
      margin:15px;
      text-align: center;
   }
   &.flex-center{
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
   }
   .icon-cont{
    width: 100px;
    height: 100px;
    border: 1px solid ${color1};
    border-radius: 50%;
    svg{
       width: 100%;
       height: 100%;
    }
   }
`;
export const ImageSection = styled.div`
   width: 100%;
   height: 260px;
   position: relative;
   z-index: 1;
   max-width: 243px;
   &.layout1{
      width: 267px;
   max-width: 267px;
      height: 248px;
      svg{
         path{
            fill: #355F92;
         }
      }
      &::after, &::before{
         content: "\A";
         width: 213px;
         height: 1px;
         background-color: #355F92;
         position: absolute;
         top: 50%;
         left: 50%;
         z-index: -1;
      }
      &::after{
         transform: translate(-50%, -50%) rotate(45deg);
      }
      &::before{
         transform: translate(-50%, -50%) rotate(-45deg);
      }
   }
   &.layout2{
      height: 250px;
      &::before{
         content: '';
         width: 200px;
         height: 200px;
         background-color: transparent;
         border: 2px solid ${color2};
         border-radius: 50%;
         position: absolute;
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%);
         z-index: -1;
      }
   }
   &.layout3{
      max-width: 330px;
      height: auto;
      svg{
         path, ellipse{
            fill: #1E3653;
         }
      }
   }
   display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    text-align: center;
`;
export const IconName = styled.div`
   ${regularFont};
   ${bodyText3};
   color: ${primaryTextColor};
   &.layout1{
      font-size: 13px;
      font-weight: 400;
      line-height: 17px;
      color: #355F92;
      padding-top: 5px;
   }
   &.layout3{
      font-weight: 500;
font-size: 12px;
line-height: 16px;
      text-align: center;
      color: #1E3653;
      padding: 5px 5px;
   }
`;
export const Description = styled.p`
    font-weight: 400;
font-size: 15px;
line-height: 20px;
    margin-bottom: 0;
    margin-top: 5px;
   color: ${appFontColor};
   .bold{
      font-weight: 500;
   }
   &.col-black{
      color: #1B2324;
   }
   &.p-20{
      padding: 0 20px;
   }
   &.bg-shadow{
      background-color: #F9F9F9;
      border-radius: 16px;
      padding: 20px 20px 0;
   }
   &.line-break{
      white-space: pre-line;
      word-wrap: break-word;
   }
   &.line-clamp{
      -webkit-line-clamp: 8;
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
   }
   &.plan-des{
      font-weight: 500;
      font-size: 13px;
      line-height: 17px;
      color: #1E3653;
   }
   &.align{
      text-align: center;
      padding: 0 1rem;
   }
   &.text-align{
      text-align:justify;
   }
   &.font-s{
      font-size: 17px;
line-height: 27px;
padding-top:10px;
   }
   &.mt-15{
      margin-top: 15px;
   }
   &.f-17s{
      font-weight: 400;
      font-size: 17px;
      line-height: 32px;   
      color: #1B2324;
   }
   &.f-17{
      font-size: 17px;
      color: #000000;
   }
   &.m-0{
      margin: 0;
   }
   &.ans{
      color: #6F7381;
   }
   &.f-14{
      font-weight: 400;
font-size: 14px;
line-height: 24px;
   }
   &.m-10{
      margin: 10px 0;
   }
   &.f-16{
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
   }
   &.f-20{
      font-weight: 500;
      font-size: 20px;
      line-height: 1.5;
   }
   &.f-17{
      font-weight: 400;
font-size: 17px;
line-height: 1.5;
   }
   &.f-18-28{
      font-weight: 600;
font-size: 18px;
line-height: 28px;
span{
   font-weight: 400;
}
   }
   &.c-white{
      color: ${whiteColor};
   }
   &.mtb-24{
      margin-top: 24px;
      margin-bottom: 24px;
   }
   &.line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;  
      overflow: hidden;
    }
    &.f-16s{
      font-weight: 400;
font-size: 16px;
line-height: 1.4;
color: #000000;
    padding: 42px 0px 18px 0px;
span{
   color:#B11818;
}
    }
    &.f-13{
      font-weight: 400;
font-size: 13px;
line-height: 17px;
color: #000000;
    padding: 42px 0px 18px 0px;
span{
   color:#B11818;
}
    }
    &.alignss{
          text-align: ${isMobile ? 'left' : 'center'};
    padding:  ${isMobile ? '' : '0px 96px' };
    }
`;
export const DescViewMore = styled.p`
  cursor: pointer;
  text-decoration : underline;
  width: max-content;
  margin-top: 0;
  &.pl-20{
   padding-left: 20px;
  }
`;
export const AppSessionLabel = styled.label`
   cursor: pointer;
   margin: 0 10px;
   border: 1px solid #CACACA;
   border-radius: 32px;
   padding: 4px 16px;
   font-weight: 500;
   font-size: 16px;
   line-height: 32px;
   color: #000;
   &.w-120{
      min-width: 80px;
      max-width: 130px;
   }
`;
export const ImgTitle = styled.span`
  font-weight: 500;
font-size: 13px;
line-height: 17px;
color: #355F92;
   &.img-4{
      font-size: 15px;
      line-height: 20px;
      font-weight: 400;
      border: none !important;
   }
   &.f-18{
      font-weight: 500;
      font-size: 18px;
      line-height: 28px;
      color: #1B2324;
   }
`;

export const PdfLinkContainer = styled.div`
   width: 100%;
   background-color: #ffffff;
   box-shadow: 0px 0px 4px rgba(46 31 59 / 35%);
   border-radius: 16px;
   display: flex;
   flex-direction: column;
   overflow: hidden;
   position: absolute;
   top: 100%;
   left: 0;
`;

export const PdfLinks = styled.div`
   display: flex;
   align-items: center;
   gap: 6px;
   padding: 12px 16px;
   cursor: pointer;
   p{
      flex: 1;
      margin: 0;
      text-align: left;
      line-height: 24px;
      text-overflow: ellipsis;
   }
   img{
      width: 24px;
      height: 24px;
      object-fit: contain;
   }
   &:hover{
      background-color: rgba(6, 115, 86, 0.1);
   }
`;
