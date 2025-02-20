import styled from 'styled-components';

export const ProfileHeader = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    &.col{
        align-items: baseline;
    }
`;
export const ContentSection = styled.div`
    margin-left: 15px;
    h1{
        margin: 0;
    }
    p{
        margin: 0;
    }
    &.ml-0{
        margin-left: 0px;
    }
    &.m-auto{
        margin: 0 auto;
    }
`;
export const MenuHeader = styled.div`
    font-weight: 500;
    font-size: 24px;
    line-height: 1.5;
    align-items: center;
    &.pb-20{
        padding-bottom: 20px;
    }
    &.flx-center{
        justify-content: space-between;
        display: flex;
    }
    &.br-bot{
        border-bottom: 1px solid;
    }
`;
export const InfoHeading = styled.div`
font-weight: 400;
font-size: 14px;
line-height: 22px;
color: #6F7381;
`;
export const Item = styled.div`
    &.link{
        font-weight: 500;
        font-size: 16px;
        color: #355F92;
        cursor: pointer;
    }
    &.non-link{
        font-size: 16px;
        font-weight: 500;
    }
`;
export const MenuContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 35%;
    z-index: 9999;
    height: 100vh;
    background: white;
`;
