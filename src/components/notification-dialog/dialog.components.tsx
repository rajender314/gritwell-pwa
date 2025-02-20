import styled from 'styled-components';

export const DialogWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.75);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
`;

export const DialogContainer = styled.div`
    width: 400px;
    background-color: #fff;
    border-radius: 16px;
    box-shadow: rgba(84, 84, 84, 0.15) 0px -4px 10px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const IconContainer = styled.div`
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Title = styled.h4`
    font-weight: 500;
    font-size: 20px;
    line-height: 26px;
    color: rgb(0, 0, 0);
    text-align: center;
`;

export const Text = styled.p`
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;;
    color: #000;
    margin: 4px 0 24px;
`;
