import {isMobile} from 'react-device-detect';
import styled from 'styled-components';

export const AlertParentDiv = styled.div`
background-color: white;
width: 100%;
display: flex;
justify-content: center;
`;

export const AlertDiv = styled.div`
border: 1px solid #bb2a2a;
border-radius: 15px;
padding: 1.5rem;
margin: 1rem 0 2rem 0;
width: 80%;
`;

export const AlertLabel = styled.label`
color: #bb2a2a;
font-weight: bold;
font-size: 22px;
`;

export const AlertPara = styled.p`
margin: 0.5rem 0 1.2rem 0;
`;

export const ButtonDiv = styled.div`
display: ${isMobile ? 'flex' : ''};
justify-content: ${isMobile ? 'center' : ''};
`;
