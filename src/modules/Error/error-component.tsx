import styled from 'styled-components';

export const ErrorDiv = styled.div`
width: 100%;
height: 100%;
background-color: #FEF0EC;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
`;

export const ErrorMsg = styled.div`
margin-bottom: 10rem;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
`;

export const Label = styled.label`
font-size: 36px;
font-weight: 700;
line-height: 48px;
color: #000000;
&.f-24{
font-size: 24px;
line-height: 38px;
font-weight: 600;
}
`;

export const LabelMsg = styled.label`
font-size: 18px;
margin-top: 1rem;
font-weight: 400;
line-height: 28px;
color: #000000;
&.f-14{
  padding: 0 72px;
  font-size: 14px;
  text-align: center;
}
`;

export const Image = styled.img`
&.h-380{
  height: 380px;
}
`;
