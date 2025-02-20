import styled from 'styled-components';

export const CardDetailsSec = styled.div`
button{
    &.mt-10{
        margin-top: 10px;
    }
}
&.pt-30{
    padding-top: 30px;
}
`;

export const CardDetails = styled.div`
    display: flex;
    align-items: center;
    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
    border-radius: 16px;
    margin-bottom: 10px;
    padding: 5px;
    &.active{
        border: 1px solid #067356;
    }
    &.flx-start{
        align-items: flex-start;
        justify-content: space-between;
    }
    &.br-1{
        border: 1px solid #EEF0F4;
    }
    &.br-yellow{
        border: 1px solid #F5B873;
    }
     &.br-red-1{
        border: 1px solid #B11818;
    }
    &.pt-15{
        padding-top: 15px;
    }
    &.p-15{
        padding: 15px 15px 0;
    }
    &.p-16{
        padding: 16px;
    }
    &.p-22{
        padding: 22px;
    }
`;
