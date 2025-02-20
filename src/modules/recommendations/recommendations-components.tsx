import {blueColor, whiteColor} from '@app/styles';
import {isMobile} from 'react-device-detect';
import styled from 'styled-components';

export const SContent = styled.div`
    background: rgba(17, 26, 28, 0.85);
    border-radius: 8px;
    padding: ${isMobile ? '12px 35px' : '12px 40px'};
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #FFFFFF;
    cursor: pointer;
    span{
        font-weight: 500;
    }
`;
export const IconCount = styled.div`
 position: absolute;
 right: 0;
 /* background: red; */
 background: #355F92;
border-radius: 32px;
width: 14px;
height: 14px;
font-weight: 500;
font-size: 9px;
line-height: 16px;
color: #FFFFFF;
top: 20%;
    right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    &.t-r-0{
        top: 0;
        right: 0;
    }
`;
export const FilterRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 22px 0;
    &.justifycenter{
        justify-content: center;
    }
`;
export const FilterPill = styled.div`
    overflow: hidden;
    padding: 8px 16px;
    min-width: ${isMobile? '80px': '121px'};
    text-overflow: ellipsis;
    white-space: nowrap;
    background-color: #EEF0F4;
    border-radius: 32px;
    box-sizing: border-box;
    box-shadow: none;
    max-width: 100%;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #1E3653;
    cursor: pointer;
    border: 2px solid transparent;
    -webkit-transition: all .15s ease-in-out;
    transition: all .15s ease-in-out;
    &.f-13{
        font-size: 13px;
    }
    &:hover{
        border-color: ${blueColor};
    }
    &.active{
        background-color: ${blueColor};
        color: ${whiteColor};
    }
    &.activee{
        background-color: ${blueColor};
        color: ${whiteColor};
        cursor: alias;
        pointer-events: none;
    }
    &.active:hover{
        // background-color: ${whiteColor} !important;
        // color: #1E3653;
        border-color: ${blueColor};
    }
    &.disabled{
        opacity: 0.3;
        // pointer-events: none;
    }
    &.disable{
        pointer-events: none;
        filter: opacity(0.7);
    }
    &.w-160{
        /* width: 125px; */
        min-width: 110px;
    }
    &.w-215{
        width: 168px;
    }
    &.w-85{
        width: 85px;
    }
    &.w-120{
        width: 120px;
    }
`;
