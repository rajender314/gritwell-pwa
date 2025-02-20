import {StylingProps} from '@app/utils/props';
import {screenSize, whiteColor} from '@app/styles';
import {isMobile} from 'react-device-detect';
import styled from 'styled-components';
export const CartContainer = styled.div`
display: flex;
gap :${isMobile? '16px':'16px'};
flex-wrap: wrap;
`;
export const CartCard = styled.div`
padding: 16px;
/* background: #FADDBC; */
background: ${whiteColor};
border: 1px solid  #EEF0F4;
box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.03);
border-radius: 16px;
box-sizing: border-box;
cursor: pointer;
&.mheight-172{
    min-height: 172px;
}
&.mheight-197{
    min-height: 197px;
}
${({bgColor}: StylingProps) => {
    return `background: ${bgColor ? bgColor :' #FADDBC'} };`;
  }} ;
&.bg-whe{
    background: #FFFFFF;
}
&.w-100{
    width: 93%;
}
&.w-83{
    width: 83%;
}
@media (${screenSize.tablet}) {
    width: calc(33.3% - 12px);
}
@media (${screenSize.desktop}) {
    width: calc(33.3% - 12px);
}
@media (${screenSize.largeDesktop}) {
    width: calc(33.3% - 12px);
}
@media (${screenSize.maxMobile}) {
    width: calc(50% - 8px);
}
&.flx-col{
    flex-direction: column;
    box-sizing: border-box;
    background: #FAFAFC;
    align-items: flex-start;
    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.02);
    border: 1px solid #E8EAF1;
    &.al-cen{
        align-items: center;
        width: ${isMobile ? '83%' : 'auto'};
        gap: 15px;
    }
}
`;
export const CartBrand = styled.div`
font-weight: 500;
font-size: 13px;
line-height: 17px;
color: #000000;
margin-bottom: 8px;
&.m-10{
    margin-bottom: 10px;
}
&.caps{
    text-transform: uppercase;
}
`;
export const CartPill = styled.div`
font-weight: 400;
font-size: 13px;
line-height: 20px;
background: #FFFFFF;
border-radius: 4px;
padding: 5px;
&.bg-be{
    background: #FAF6ED;
}`;

export const ItemName = styled.div`
    font-weight: 500;
font-size: 14px;
line-height: 20px;
color: #111A1C;
&.clr-gray{
    color: #6F7381;
}
&.bold{
    font-weight: 500;
}
&.word-break{
    word-break: break-all;
}
`;
export const ItemCount = styled.div`
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: #6F7381;
    &.clr-bl{
        color: #111A1C;
    }
    &.bold{
        font-weight: 500;
    }
`;
export const ItemHeading = styled.div`
  font-weight: 500;
font-size: 16px;
line-height: 16px;
&.lh-21{
    font-weight: 400;
font-size: 16px;
line-height: 21px;
color: #000000;
}
`;
