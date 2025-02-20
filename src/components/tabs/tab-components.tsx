import {reqularFont, tabText2} from '@app/styles';
import styled from 'styled-components';

type Props = {
    isSelected?: boolean,
    type?: 'primary' | 'secondary' | 'custom-yellow'
}
export const TabContainer = styled.div`
    
    // border-bottom: 2px solid #E8EAF1;
    display:inline-flex;
    margin-bottom: 30px;
    width: 100%;
    &.align-left{
      margin: 0 ;
      padding: 0 ;
      border: 0;
    }
   &.mobile{
    overflow-x: auto;
    scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
    display: flex;
    flex: 1;
    justify-content: flex-start;
    margin: 16px auto;    
    width: 100%;
    gap: 20px 0;
    border: 0;
    &::-webkit-scrollbar {
      display: none;
  }
   }
   &.mb-0{
    margin-bottom: 0;
   }
`;
export const Tab = styled.div`
    cursor:pointer;    
    color:#6F7381;
    ${tabText2}
    ${reqularFont} 
    border-bottom: 2px solid #E8EAF1;
    padding: 12px 8px;
    padding-bottom:  6px !important;
    text-align: center;
    &.caps{
    text-transform: capitalize;
    }
    line-height: 1.5;
    &.align-left{
      text-align: left;
      text-decoration: none;
      border: 0;
      padding: 0;
      font-weight: 500;
      font-size: 16px;
      line-height: 1.5;
    }
    &:not(:first-child){
      &.p-20{
        padding: 0 20px;
      }
    }
    ${({isSelected, type}: Props) => {
    if (isSelected) {
      if (type == 'secondary') {
        return `
                color: #355F92;              
                font-weight: 400;
                font-size: 17px;
                line-height: 1.5;
               border-bottom: 2px solid #355F92;
              `;
      } else if (type == 'primary') {
        return `
                color: #067356;;
                ${reqularFont};
               border-bottom: 2px solid #067356;;
              `;
      }
    }
  }}
`;
