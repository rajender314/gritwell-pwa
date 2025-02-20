import {bodyText2, borderColor2, inputColor, regularFont} from '@app/styles';
import styled from 'styled-components';
export const Container = styled.div`
    padding: 10px 0px 0px 0px;
    border-bottom: 2px solid ${borderColor2};
    display: flex;
    align-items: center;
    &.fl-1{
        flex :1;
    }
    &.p-12{
        border: 0;
        padding: 12px 0 0;
    }
    &.b-0{
        border: 0;
        padding: 0;
    }
    &.al-r{
        input{
        text-align: right;
        color: #111A1C;
        }   
    }
`;
export const InputContainer = styled.div`
   flex: 1;
`;
export const IconContainer = styled.div`
    cursor: pointer;
    &.icon-lt{
        padding: 5px 10px 0px 0;
    }
    &.icon-rt{
        padding: 5px 0 0 20px;
    }
`;
export const Input = styled.input`
    border: 0;
    outline: 0;
    background: transparent;
    width: 100%;
    ${bodyText2};
    ${regularFont};
    color: ${inputColor};
    &:focus-visible{
        border: 0;
        outline: 0;
    }
    &:-internal-autofill-selected{
        background-color: transparent !important;
    }     
    &.w-28{
        width: 28px;
        margin-right: 5px;
    }
    &.padding-0{
        padding: 0;
    }
    &.w-32{
        width: 32px;
        margin-right: 5px;
    }
`;
