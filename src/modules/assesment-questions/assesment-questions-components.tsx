import {
  appFontColor, bodyText2, color10, priceColor,
  primaryBtnColor,
  regularFont,
  whiteColor,
} from '@app/styles';
import {StylingProps} from '@app/utils/props';
import {isMobile} from 'react-device-detect';
import styled from 'styled-components';

export const IconsContainer = styled.div`

    overflow: hidden;    
    cursor: pointer;
    ${({color}: StylingProps) => {
    if (color) {
      return `
    svg{
        path{
            fill : ${color ? color : ''}
        }
    }
    `;
    }
  }
}
&.overflow{
    overflow: visible;
}
&.px-4{
    padding: 0 4px;
}
&.restrict{
    cursor: not-allowed;
    pointer-events: none;
    border: none;
    color: #B8BCCA;
  }
&.w-52{
    width: 52px;
}
&.py-1{
    padding: 10px 0;
}
&.w-100-br{
    width: 100%;
    text-align: center;
    // background: red;
    padding: 10px 0;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    svg{
        path{
            fill : #B8BCCA;
        }
    };
    ${({color}: StylingProps) => {
    return `background: ${color ? color : '#FAFAFC'}}
        svg{
            path{
                fill : ${color ? '#1E3653 '+ ' !!important' : ''}
            }
        }`;
  }
}

}   
&.bg-wh{
    background: white;
}
&.w-32-ico{
        width: 32px;
        height: 32px;
        padding: 5px;
        border-radius: 50%;
        background: #EEF0F4;
        display: flex;
    align-items: center;
    justify-content: center;
        svg{
            width: 60%;
            height: 60%;
            path{
            fill:#B8BCCA;
            }
        }
        &.active{
            background: #E8F4F3;
            svg{
                path{
                fill:#067356;
            }
            }
        }
    }
    &.br-tp-bt{
        padding: 13px 0 8px;
        position: relative;
        &::before{
            content: '';
            width: 60%;
            height: 25px;
            position: absolute;
            top: 0;
            left: 0;
            background: #72C4AA;
        }
        &::after{
            content: '';
            width: 60%;
            height: 25px;
            position: absolute;
            bottom: 0;
            right: 0;
            background: #F5B873;
        }
    }
    &.bg-after{
        padding: 0 0 8px;
        position: relative;      
        &::after{
            content: '';
            width: 60%;
            height: 25px;
            position: absolute;
            bottom: 0;
            right: 0;
            background: #F5B873;
        }
        &.left{
            background: white;
            &::after{
                left: 0;
            }
        }
    }
    &.icon-3-50{
        position: absolute;
        bottom: -50px;
        left: -50px;
        z-index: -1;
    }
    &.icon-t-25{
        position: absolute;
        top: 10%;
        left: 0;
        right:0;
        z-index: -1;
    }
    &.br-50{
        border-radius: 50%;
    }
    &.br-16{
        border-radius: 16px;
    }
    &.pr-15{
        padding-right: 15px;
    }
    &.h-21{
        height: 21px;
        svg{
        path{
            fill : #B8BCCA !important;
        }
    }
        ${({color}: StylingProps) => {
    if (color) {
      return `
    svg{
        path{
            fill : ${color ? '#1E3653 '+ ' !important' : '#B8BCCA'}
        }
    }
    `;
    }
  }
}
&.br-rad{
    height: 21.5px;
    background: red;
    display: flex;
    align-items: center;
    padding: 23px 0;
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
    justify-content: center;
    width: 52px;
     ${({color}: StylingProps) => {
    return `background: ${color ? color : '#FAFAFC'} };`;
  }}
}
    }
&.icon-1{
    position: absolute;
    top: 0;
    left: 20px; 
}
&.align-cen-fl{
    padding: 13px;
    border: 1px solid #E8EAF1;
    box-shadow: -0.88px 0.88px 3.5px rgb(97 97 97 / 10%);
    border-radius: 12px;
    display: flex;
    align-items: center;
}
&.w-20{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    &.br-0{
        border-radius:0;
    }
    svg{
        width: 20px;
        height: 20px;
        path{
            fill : #0D0D0D;
        }
    }
    ${({color}: StylingProps) => {
    if (color) {
      return `
    svg{
        path{
            fill : ${color ? color : '#0D0D0D'}
        }
    }
    `;
    }
  }
}
}
&.w-24{
    border-radius: 50%;
    svg{
        width: 24px;
        height: 24px;
    }
}
&.w-14{
    border-radius: 50%;
    svg{
        width: 14px;
        height: 14px;
    }
}
&.icon-rt{
    position: absolute;
    top: 0;
    right: 0;
}
&.t-20{
    top: 20px;
}
&.r-25{
    right: 25px;
}
&.t-18{
    top: 21px !important;
    left: 84px !important;
}
&.t-18-pl{
    top: 21px !important;
    left: 54px !important;
}
&.l-38{
    top:11px !important;
    left: 77px !important;
}
&.icon-lt{
    position: absolute;
    top: 0;
    left: 0;
}
&.t-unset{
    top: unset;
}
&.t-65{
    top: 65px;
}
&.w-25{
    border-radius: 50%;
    width: 25px;
    height: 25px;
    img{
        width: 100%;
        height: 100%;
    }
}
&.w-35{
    border-radius: 50%;
    width: 35px;
    height: 35px;
    img{
        width: 100%;
        height: 100%;
    }
}
&.w-48{
    border-radius: 50%;
    width: 48px;
    height: 48px;
    img{
        width: 100%;
        height: 100%;
    }
}
&.w-16{
    border-radius: 50%;
    width: 24px;
    height: 24px;
}
&.w-16-s{
    /* border-radius: 50%; */
    .icon-s{
        width: 16px;
        height: 16px;
        svg{
            width: 100%;
            height: 100%;
        }
    }
}
&.icon-end{
    display: flex;
    justify-content: flex-end;
    position: relative;    
}
&.w-100{
    width: 100%;
}
&.icon-3{
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
}
&.icon-4{
    /* position: absolute;
    bottom: -7px;     */
}&.icon-5{
    background-color: ${appFontColor};
    border-radius: 12px;
    padding: 10px;
    margin-right: 15px;
    display: flex;
    align-items: center;
}
&.icn-bck{
    position: absolute;
    padding: 20px;
    z-index: 7;
}
&.icon-rt-15{
    position: absolute;
    top: 9%;
    right: -25px;
}
&.icon-rtb-15{
    position: absolute;
    top: 25%;
    right: 0;
}
&.flex-1{
    display: flex;
    flex:${isMobile ? '1' : 'unset'};
    justify-content: center; 
}
&.supp{
    border: 1.5px solid #355F92;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    min-width: 35px;
    // padding: 5px 8px;
        svg{
        // width: 25px;
        //   height: 25px;
        path{
            fill:#355F92 ;
        }
    }
}
&.life{
    border: 1.5px solid #72C4AA;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    min-width: 35px;
    // padding: 5px 8px;
    svg{
        // width: 25px;
        // height: 25px;
        path{
            fill:#72C4AA ;
        }
    }
}
&.nut{
    border: 1.5px solid #F5B873;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    min-width: 35px;
    // padding: 5px 8px;
    svg{
        // width: 25px;
        // height: 25px;
        path{
            ${({color}: StylingProps) => {
    return `fill: ${color ? color : '#F5B873'} };`;
  }}
            /* fill:#278C71 ; */
        }
    }
    &.up-border{
        ${({color}: StylingProps) => {
    return `border-color: ${color ? color : '#278C71'} };`;
  }}
    }
}
&.txt-rt{
    text-align: right;
}
&.icon-rts{
    position: absolute;
    top: 220px;
    right: 200px;
}
&.flex-col{
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${color10};
    svg{
        path{
            fill : ${color10};
        }
    }
}
&.pos-abs-xy-16{
    position: absolute;
    top: 16px;
    right:16px;
}
&.plt-10{
    padding: 0 10px;
    z-index: 99!important;
}
&.active{
    &.flex-col{
        color: ${appFontColor};
        svg{
            path{
                fill: ${appFontColor};
            }
        }
    }
}
&.w-46{
    border-radius: 50%;
    width: 46px;
    height: 46px;
    img{
        width: 100%;
        height: 100%;
    }
}
&.w-90{
    width: 90px;
    height: 90px;
    border-radius: 50%;
    img{
        width: 100%;
        height: 100%;
    }
}
&.br-1{
    border-right: 1px solid #E8EAF1;
}
&.z-10{
    z-index: 10;
}
&.completed{
    background: #067356;
    border-radius: 20px;
    align-items: center;
    display: flex;
    padding: 4px;
    svg{
        path{
            fill: ${whiteColor} !important;
        }
    }
}
&.completed-s{
    color: #067356;
    .icon-s{
    background: #067356;
    border-radius: 20px;
    align-items: center;
    display: flex;
    padding: 4px;
    margin-left: 8px;
    svg{
        path{
            fill: ${whiteColor} !important;
        }
    }
}
}&.clr-green{
    svg{
        path{
            fill: ${primaryBtnColor};
        }
    }
}
&.gray{
    background: #E8EAF1;
    border-radius: 20px;
    align-items: center;
    display: flex;
    padding: 4px;
    svg{
        path{
            fill: ${whiteColor} !important;
        }
    }
}
&.gray-s{
    .icon-s{
    background: #E8EAF1;
    border-radius: 20px;
    align-items: center;
    display: flex;
    padding: 4px;
    margin-left: 5px;
    svg{
        path{
            fill: ${whiteColor} !important;
        }
    }
}
}
&.flx-col-e{
    display: flex;
    flex-direction: column;
}
.nav-name{
    font-weight: 400;
font-size: 15px;
line-height: 19px;
}
&.prev-p{
padding:${isMobile ? ' 0px 16px ':'unset'};
}
`;

export const ImageWrapper = styled.div`
background-color: transparent;
img{
    width: 100%;
    height: 100%;
}
&.w-160{
    border-radius: 50%;
    width: 160px;
    height: 160px;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    }
}
&.w-60{
    width: 60px;
    height: 60px;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    border-radius: 50%;
    }
}
&.w-64{
    width: 64px;
    height: 64px;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    border-radius: 50%;
    }
}
&.w-32{
    width: 32px;
    height: 32px;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    border-radius: 50%;

    }
}
&.w-72{
    width: 72px;
    height: 72px;
    line-height: 72px;
    font-size: 32px;    
    margin-bottom: 0;
    overflow: hidden;
    border-radius: 50%;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
  }
&.w-80{
    width: 80px;
    height: 80px;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;

    }
}
&.w-98{
    width: 98px;
    height: 98px;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;

    }
}
&.m-0{
    margin: 0;
}

`;
export const PlanDiv = styled.div`
width: 50%;
padding-top: 15px;
&.p-r{
    padding-right:16px;
}
`;
export const ContentContainer= styled.div`
    /* padding: ${isMobile? '24px' : '60px'}; */
    padding: 30px;
    box-sizing: border-box;
    background: rgb(233, 220, 206);
    &.rootcause_container{
    width: 100%;
    max-width: 1140px;
    margin: 0 auto;
    padding: 0 1em;
    }
    .withMsgHeader{
        color: #090909;
    font-style: normal;
    font-weight: 400;
    font-size:  ${isMobile? '40px' : '72px'};
    line-height:  ${isMobile? '52px' : '88px'};
    margin: 0;
    }
    .conWithMsgHeader{
        color: #000000;
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 31px;
    }
    .plans-h2{
        margin: 0;
        color: ${appFontColor};
        font-style: normal;
        font-weight: 400;
        font-size: 32px;
        line-height: 42px;
    }
     .root_home_Welcome{
    color: #090909;
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    line-height: 52px;
    }
    .root_home_text{
        color: ${appFontColor};
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 27px;
        margin: 12px 0 16px;
    }
    &.o-hidden{
        overflow: hidden;
    }
    &.plr-75{
        padding: 0 110px;
    }
    &.al-col-cen{
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    &.p-18{
        padding: 0 18px 20px;
    }
    &.mt-100{
        margin-top: 100px;  
    }
    &.ptl-30-100{
        padding: 30px 100px !important;
    }
    .ptl-30-60{
        padding: 30px 60px !important;
    }
    &.mt-40{
        margin-top: 40px;  
    }
    &.h-130{
        height: 130px;
    }
    &.hei-90{
        height: calc(100vh - 90px);
    }
    ${({bgColor}: StylingProps) => {
    return `background: ${bgColor ? bgColor : whiteColor} };`;
  }}
  &.br-20{
      border-radius: 20px;
      overflow: hidden;
  }
  &.scroll{
    overflow: scroll;
    height: calc(100vh - 150px);
  }
 
  &.tracking-cont{
        margin: 0 auto;
        border-radius: 16px;
        padding: 0px 20px;
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        &::before{
            content: '';
            width: 10px;
            height: calc(100% - 50px);
            background: transparent;
            border-left: 1px dashed #6F7381;
            position: absolute;
            top: 47px;
            left: 20px;
        }
        &::after{
            content: '';
            width: 10px;
            height: 10px;
            background: #278c71;
            border-radius: 50%;
            position: absolute;
            top: 20px;
            left: 15px;
        }
    
        &.hj{
            &::before{
            content: '';
            width: 10px;
            height: calc(100% - 82px);
            background: transparent;
            border-left: 1px dashed #6F7381;
            position: absolute;
            top: 47px;
            left: 20px;
        }
        }
  }
  &.tracking-cont-health{
        margin: 0 auto;
        border-radius: 16px;
        padding: 0px 20px;
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        &::before{
            content: '';
            width: 10px;
            height: calc(100% - 50px);
            background: transparent;
            border-left: 1px dashed #6F7381;
            position: absolute;
            top: 47px;
            left: 20px;
        }
        &::after{
            content: '';
            width: 10px;
            height: 10px;
            background: #278c71;
            border-radius: 50%;
            position: absolute;
            top: 0px;
            left: 15px;
        }
    
        &.hj{
            &::before{
            content: '';
            width: 10px;
            height: calc(100% - 82px);
            background: transparent;
            border-left: 1px dashed #6F7381;
            position: absolute;
            top: 47px;
            left: 20px;
        }
        }
  }
  &.bg-desc{
    content: '';
    border-radius: 140px 100px 0 140px;
    margin-top: 40px;
    height: calc(100vh - 215px);
  }
  &.bg-white{
    content: '';   
    height: 110px;
  }
  &.h-250{
      height: 170px;
  }
  &.py-0{
    padding-top: 0px;
    padding-bottom: 0px;
  }
  &.pt-0{
      padding-top: 0;
  }
  &.pt-15{
      padding: 15px 30px;
  }
  &.ptb-0{
      padding: 0 30px;
  }
  &.prl-0{
      padding: 30px 0px;
  }
  &.health-page{
      button{
          &.m-10{
              margin: 10px 0;
          }
      }
  }
  &.pb-50{
      padding-bottom: 50px;
  }
  &.p-20{
    padding: 20px;
  }
  &.pt-100{
      padding-top: 100px;
  }
  &.desktop-tracking-cont{
      display: flex;
      flex-direction: row;
      padding: 0;
      position: relative;
      padding: 0;
    width: 100%;
    overflow-x: auto;
      &::before{
        content: '';
        width: 100%;
        height: 22px;
        background: transparent;
        border-bottom: 2px dotted #ccc;
        position: absolute;
        top: 0;
        left: 0;
      }
      & > div:first-child{
        padding-left: 0;
      }
      
      .track-icons{
       
          &.0{
              left: 2px;
          }
      }
  }
  &.flx-cont{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
  }
  &.p-0{
      padding: 0;
  }
  &.grid-col{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  &.flx-cont-bet{
    display: flex;
    justify-content: space-around;
    /* background: linear-gradient(to bottom, #faf6ed 50%, white 50% 50%); */
  }
  &.w-100{
    width: 100%;
  }
  &.bg-grad{
    /* background: linear-gradient(to bottom, #faf6ed 50%, white 50% 50%); */
  }
  &.br-bg{
    background: white;
    border: 1px solid #EEF0F4;
    border-radius: 40px;
    box-shadow: 0px 2px 14px rgb(0 0 0 / 8%);
    // margin: 25px 0;
    padding: 40px;
  }
  &.br-bg-s{
    background: white;
    border: 1px solid #EEF0F4;   
    box-shadow: 0px 2px 14px rgb(0 0 0 / 8%);
    padding: 0 35px;
  }
  .p-20{
    padding: 0 20px;
  }
  &.h-90{
    height: 90%;
  }
  &.al-start{
    display: flex;
    align-items: flex-start;
  }  
`;
export const BodyText2= styled.p`
&.clr-green{
    color : #1E3653;
    cursor: pointer;
}
&.clr-blue{
    color: ${priceColor};
}
&.clr-black{
    color: #1B2324 !important;
    font-weight: 500;
}
&.left-0{
    left: 0;
}
margin: 0;
padding: 8px;
cursor: pointer;
${bodyText2};
${regularFont};
&.clr-orange{
    color : ${priceColor};
}
&.pd-10{
    padding-top: 10px;
}
&.mt-0{
    margin-top: 0px;
}
&.mt-10{
    margin: 10px 0 0 0;
}
&.gray{
    color: #6F7381;
}
&.rg-font{
    ${regularFont}
}
&.f-17{
    font-size: 17px;
    font-weight: 400;
    line-height: 23px;
}
&.f-14{
    font-size: 14px;
    line-height: 21px;
}
&.f-15{
    font-size: 15px;
    line-height: 20px;
    width: max-content;
}
&.f-12{
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
}
&.f-10{
    font-size: 10px;
    line-height: 16px;
    font-weight: 400;
}
&.lh-27{
    line-height: 27px;
}
&.mb-0{
    margin-bottom: 0;
}
&.pl-0{
    padding-left: 0;
}
&.p-0{
    padding: 0;
}
&.f-20{
    font-weight: 400;
font-size: 20px;
line-height: 30px;
letter-spacing: -0.02em;
color: #000000;
}
`;

export const FlexContainer= styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center; 
    &.p-20{
        padding: 20px 0;
    }
    &.pd-20-30{
        padding: 20px 35px;
    } 
`;

export const DialogContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* min-width: ${isMobile ? '100%' : '480px'};
  max-width: ${isMobile ? '100%' : ' 90%'}; */
  min-height: 200px;
  max-height:  ${isMobile ? '' : '90%'};
  /* height:  ${isMobile ? '100%' : ''}; */
  overflow: hidden;
  position: relative;
  background-color: ${whiteColor};
  box-shadow: 0px -4px 10px rgb(84 84 84 / 15%);
  padding: 24px 24px 32px;
  border-radius: 16px;
  z-index: 9999;
  width: ${isMobile ? '70%' : '400px'};
  margin: 0 auto;
  position: absolute;
  &.lr-0{
    left: 0;
    right: 0;
  }
  &.m-0{
    margin: 0;
  }
  &.max-w-70{
    /* max-width: 75%;   */
    background: white;
    margin-top: 40px;
    max-height: 100%;
    height: 100%;
    position: unset;
  }
  &.m-view{
    left: 0;
    right: 0;
    border-radius: 0;
    height: 100% !important;
    min-height: none;
    max-height: none;
    padding-top: 50px;
  }
    /* top: 12%; */
    left: 10%;
    right: 10%;
    &.fill-wid{
        max-height: 100%;
        height: 96%;
        width: 87%;
        left: 0;
        right: 0;
    }
    &.fill-wid-80{
        max-height: 80%;
        height: auto;
        width: 80%;
        left: 0;
        right: 0;
        overflow: scroll;
    }
    &.t-10{
        top : 12%; 
    }
    &.w-50{
        width:${isMobile ? '70%' : '50%'};
        min-height: ${isMobile ? '200px' : '400px'};
    }
    .p-60{
        padding: 24px 60px 24px;
    }
    .p-24{
        padding: 24px;
    }
    .p-16{
        padding: 16px;
    }
    &.al-center{
        /* height:  ${isMobile ? '100%' : ''} !important; */
        align-items: center;
    }
    button{
      &.mt-10{
          margin-top: 10px;
      }
    }
    &.h-100{
    max-height: 100%;
    width: 88%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: 0;
    box-sizing: border-box;
    &.maxh-unset{
        max-height: unset;
    }
    }
    &.w-100{
        width: 100%;
    }
    &.flx-cen{
        flex: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    &.p-0{
        padding: 0;
    }
    &.h-90{
        height: 90vh;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        border-radius: 0;
    }
    &.maxWidth-640{
        max-width: 640px;
    }
`;
export const ExpectationContainer = styled.div`
     display: flex;
  flex-direction: column;
  /* min-width: ${isMobile ? '100%' : '480px'};
  max-width: ${isMobile ? '100%' : ' 90%'}; */
  /* max-height: 90%; */
  overflow: hidden;
  position: relative;
  background-color: ${whiteColor};
  box-shadow: 0px -4px 10px rgb(84 84 84 / 15%);
  padding: 24px 24px 32px;
  margin: 0 24px;
  border-radius: 16px;
  z-index: 9999;
  width: ${isMobile ? '100%' : '590px'};
  .no-popup{
    color: ${appFontColor};
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 42px;
  }
  .messageHcName{
    color: #1B2324;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
  }
`;
export const AnimationCheck = styled.div`
    display: flex;
    justify-content: center;
    img{
        height: 100px;
        width: 100px;
    }
`;
export const TestDialogContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* min-width: ${isMobile ? '100%' : '480px'};
  max-width: ${isMobile ? '100%' : ' 90%'}; */
  min-height: 200px;
  /* max-height: 90%; */
  overflow: hidden;
  position: relative;
  background-color: ${whiteColor};
  box-shadow: 0px -4px 10px rgb(84 84 84 / 15%);
  padding: 24px 24px 32px;
  border-radius: 16px;
  z-index: 9999;
  width: ${isMobile ? '100%' : '590px'};
  margin: 0 24px;
  .popupTodoContainer{
    background: #FFFFFF;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
    border-radius: 16px;
    border-top: 10px solid rgb(232, 234, 241);
    padding: 12px 24px;
  }
  .popupHeader{
    color: ${appFontColor};
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 42px;
  }
  .popupTimestamp{
    color: #6F7381;
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 27px;
  }
  .popupCon{
    color: ${appFontColor};
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 27px;
  }
  .popupDue{
    color: #6F7381;
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 27px;
  }
  /* position: absolute; */
  &.lr-0{
    left: 0;
    right: 0;
  }
  &.m-0{
    margin: 0;
  }
  &.max-w-70{
    /* max-width: 75%;   */
    background: white;
    margin-top: 40px;
    max-height: 100%;
    height: 100%;
    position: unset;
  }
  &.m-view{
    left: 0;
    right: 0;
    border-radius: 0;
    height: 100% !important;
    min-height: none;
    max-height: none;
    padding-top: 50px;
  }
    /* top: 12%; */
    /* left: 10%; */
    /* right: 10%; */
    &.fill-wid{
        max-height: 100%;
        height: 96%;
        width: 87%;
        left: 0;
        right: 0;
    }
    &.fill-wid-80{
        max-height: 80%;
        height: auto;
        width: 80%;
        left: 0;
        right: 0;
        overflow: scroll;
    }
    &.t-10{
        top : 12%; 
    }
    &.w-50{
        width:${isMobile ? '100%' : '50%'};
        min-height: ${isMobile ? '200px' : '400px'};
    }
    .p-60{
        padding: 24px 60px 24px;
    }
    .p-24{
        padding: 24px;
    }
    .p-16{
        padding: 16px;
    }
    &.al-center{
        align-items: center;
    }
    button{
      &.mt-10{
          margin-top: 10px;
      }
    }
    &.h-100{
    max-height: 100%;
    width: 88%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: 0;
    box-sizing: border-box;
    &.maxh-unset{
        max-height: unset;
    }
    }
    &.w-100{
        width: 100%;
    }
    &.flx-cen{
        flex: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    &.p-0{
        padding: 0;
    }
    &.h-90{
        height: 90vh;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        border-radius: 0;
    }
    &.maxWidth-640{
        max-width: 640px;
    }
`;
export const CloseIcon = styled.div`
    display: flex;
    justify-content: flex-end;
    &.js-center{
        justify-content: center;
        background: ${primaryBtnColor};
        content: '';
        width: 42px;
        height: 42px;
        border-radius: 80px 80px 85px 125px;
        align-items: center;
        svg{
            path{
                fill : ${whiteColor}
            }
        }
    }
    img{
        height: 90px;
        width: 90px;
    }
    &.danger{
        background: #9F0D0D;
    }
    &.disabled{
        background: #E0E0E0;
    }
    span{
        color: white;
        font-size: 20px;
    }
`;
export const BackDrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    &.blur-0{
        backdrop-filter: blur(0px);
    }
`;
export const IconName = styled.span`
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    &.f-14{
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
    }
    &.f-17{
        font-weight: 400;
        font-size: 17px;
        line-height: 23px;
        color: #6F7381;
    }
    &.f-15{
        font-size: 15px;
        line-height: 20px;
    }
`;

export const PillsContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 20px 0;
`;
export const Pills = styled.div`
    background: #EEF0F4;
    opacity: 0.8;
    width: 100px;
    justify-content: center;
    border-radius: 23px;
    padding: 8px 16px;
    color: #000000;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    &.current{
        background: #E9DCCE;
        /* color: #FFFFFF; */
        opacity: 1;
    }
    &.active{
        background: #CDEAE1; 
        color: #000000;
        opacity: 1;
    }
    &.p-0{
        padding: 0px;
    }
    display: flex;
    align-items: center;
    gap: 5px;
    svg{
        width: 18px;
        height: 18px;
        path{
            fill: #72C4AA;
        }
    }    
`;

export const ScheduleDiv = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
`;

export const ImgDiv = styled.div`
display: flex;
justify-content: end;
`;

export const MenuImg = styled.img`
width: 25px;
cursor: pointer;
`;

export const MenuOptions = styled.div`
display: flex;
flex-direction: column;
text-align: end;
line-height: 2;
& > label:first-child{
    border-bottom: 2px solid #e7e7e7;
}
& > label{
    padding: 0.8rem 1rem;
    cursor: pointer;
}
& > label:last-child{
    color: red;
}
`;

export const DropDiv = styled.div`
// width: 185px;
width: max-content;
position: relative;
`;

export const MenuOptDiv = styled.div`
background-color: #fafafc;
border: 1px solid #E8EAF1;
border-radius: 8px;
z-index: 5555;
/* position: sticky; */
position: absolute;
right: 0;
min-width: 190px;
`;
