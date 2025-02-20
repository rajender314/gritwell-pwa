import {primaryBtnColor} from '@app/styles';
import {StylingProps} from '@app/utils/props';
import {isMobile} from 'react-device-detect';
import styled from 'styled-components';

export const HeaderMain = styled.div`
   padding: 15px 20px;
   text-align:center;
   width:100%;
   display: flex;
   align-items: center;
   justify-content: ${isMobile ? 'center' : 'space-between' }; 
   box-sizing: border-box;
   min-height: 60px;
   max-height: 60px;
   ${({bgColor}: StylingProps) => {
    return `background: ${bgColor ? bgColor : 'transparent'} ;
   `;
  }}
  border-bottom: 1px solid rgba(0, 0, 0, 0.04); 
  
   &.p-10{
      padding: 10px 20px;
   }
   .gap-30{
      gap: 30px;
   }
   &.txt-left{
      justify-content: flex-start;
   }
   &.js-btwn{
      justify-content: space-between;
   }
   &.bg-white{
      background: white;
   }
   /* svg{
      path{
         fill : ${primaryBtnColor}
      }
   } */
   .br-1{
      border-left: 1px solid #E8EAF1;
      padding-left: 24px;
      display: flex;
      gap: 10px;
      align-items: center;
   }
   .ro-90{
      transform: rotate(-90deg);
      svg{
         path{
            fill: white;
            stroke: #DEDEDE;  
            stroke-width: 3px;
         }
      }
   }
`;
export const HeaderMenuItem = styled.span`
    font-size: 16px;
    line-height: 26px;
    font-weight: 400;
    color:#000000 ;
    letter-spacing: 0.04em;
    cursor: pointer;
    &.active{
      color: #355F92;
    }
`;
