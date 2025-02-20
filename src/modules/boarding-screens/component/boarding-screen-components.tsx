import {appBackgroundColor, appFontColor, bodyText2,
  regularFont, screenSize, whiteColor}
  from '@app/styles';
import {StylingProps} from '@app/utils/props';
import {isMobile} from 'react-device-detect';
import styled from 'styled-components';
export const FooterButtons = styled.div`
    /* position: fixed;
    bottom: 32px;
    left: 0;
    right: 0; */
    /* background: ${appBackgroundColor}; */
    z-index: 3;
    /* box-shadow: 0 -2px 6px rgb(0 0 0 / 15%); */
 display: flex;
 /* flex-direction: column; */
//  padding: 8px 24px 8px;
  padding: 0 16px;
  align-items: center;
 justify-content: space-between;
 max-height: 64px;
 min-height: 64px;
 position: sticky;
 box-sizing: border-box;
 gap: 14px;
 &.fixed{
  position: fixed;
 } 
 &.js-end{
  justify-content:end;
 }
 bottom: 0;
 ${({bgColor}: StylingProps) => {
    return `background: ${bgColor ? bgColor : 'transparent'} };`;
  }}
  &.flx-center{
    justify-content: center;
  }
  &.flx-end{
    justify-content: flex-end;
  }
  button{
    font-size: 17px;
    line-height: 22px;
    font-weight:500;
      &.flx-center{
        @media (${screenSize.tablet}) {
        flex: 0.5 !important;
        }
      }      
      &:nth-child(1){
        flex : 1;
        @media (${screenSize.tablet}) {
          flex : 0.2;         
        }
        &.w-40{
          flex: ${isMobile ? 1 : 0.6};
        }
      }
      &:nth-child(2){
        flex: 1;
        margin-left: 15px;
        @media (${screenSize.tablet}) {
          flex : 0.25;         
        }
      }
      }
      &.b-0{
        bottom: 0;
      }
      &.js-around{
        justify-content: space-around;
        width: 100%;
        background: ${whiteColor};
      }
      &.flx-6{
        margin: 0 auto;
        justify-content: center;
        button{
          flex: 0.6;
        }
      }
      &.al-cen{
        align-items: center;
      }
      &.plr-0{
 padding: 10px 0px 15px;

      }
`;
export const MainSection = styled.div`
    /* overflow: auto;
    height: calc(100vh - 235px); */
    padding-bottom: 70px;
    @media (${screenSize.tablet}) {     
      &.r-border{
        border: 2px solid #F5B873;;
        box-sizing: border-box;
        box-shadow: 0px 2px 30px rgba(0, 0, 0, 0.05);
        border-radius: 20px;
        &.l-1{
          background: #FFFFFF;
          border: 2px solid #EEF0F4;
        }
        &.l-2{
          border: 2px solid #B0DECF;
        }
      }  
      &.pb-0{
    padding-bottom: 0px;
  }
  &.box-cont{
    background: #FCFBF9;
    border-radius: 20px;
    box-shadow: 0px 2px 14px rgb(0 0 0 / 8%);
    }
  }
 
`;
export const MenuItems = styled.div`
   display: flex;
   align-items: center;
   button{
     ${bodyText2};
   }
   &.flex-5{
     flex: 0.5;
   }
`;
export const Item = styled.a`
 ${regularFont};
   ${bodyText2};
   color: ${appFontColor};
   padding: 0 20px;
   cursor: pointer;
`;
export const FooterLink = styled.div`
  width: 100%; 
  text-align: center;
  p{
    margin-top: 0;
  }
  ${({bgColor}: StylingProps) => {
    return `background: ${bgColor ? bgColor : 'transparent'} };`;
  }}
`;
export const ScrollSection = styled.div`
&.d-flex-ovr-hid{
  display: flex;
  height: 100%;
  overflow: hidden;
}
    @media (${screenSize.tablet}) {     
      // flex: 0.77;
      width: 100%;
      // display: flex;
      // justify-content: center;
    } 
   
  // height: calc(100vh - 90px);
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  &.scroll-h{
    height: calc(100vh - 124px);
  }
&.scroll-h64{
  height: calc(100vh - 64px);
}
&.scroll-h128{
  height: calc(100vh - 128px);
}
&.scroll-h256{
  height: calc(100vh - 256px);
}
  &.w-100{
    width: 100%;
  }
  &.h-150{
    height: calc(100vh - 150px);
  }
  &.max-350{
    max-height: 350px;
  }
  &.flex-unset{
    display: unset;
  }
  &.flex-1{
    flex: 1;
  }
  &.flex-9{
    flex: 0.9;
  }
  &.flex-8{
    flex: 0.8;
  }
  &.smooth{
        scroll-behavior: smooth;
  }
  .bg-white{
    background: white;
    padding-right: 60px;
  }
  .pr-0{
    padding-right: 0px;
  }
.flex-dir{
  display: flex;
  justify-content: space-between;
  background: white;
  margin-top: 25px;
}
&.mb-40{
  margin-bottom: 40px;
}
&.mb-64{
  margin-bottom: 64px;
}
&.mb-96{
  margin-bottom: 96px;
}
&.bg-col{
  background-color: #FAFAFC;
  height: 100vh;
  overflow: auto !important;
  padding-bottom: 0.5rem;
}
`;
