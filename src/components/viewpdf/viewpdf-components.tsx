/* eslint-disable linebreak-style */
import {screenSize} from '@app/styles';
import styled from 'styled-components';

export const ViewPdfBox = styled.div`
// margin-top: 12px;
// position: absolute;
// width: max-content;
`;

export const PdfBox = styled.div`
// height: 100vh;
// display: block;
// margin: 0;
// width: 100vw;
`;

export const PdfPlugins = styled.div`
display: flex;
&.active{
    // display: grid;
    // grid-template-columns: 1fr 1fr 1fr;
}
   @media (${screenSize.tablet}) {
       
    }
    @media (${screenSize.maxMobile}) {
        
    }
    @media (${screenSize.desktop}) {

    }
&.footerButtonContainer{
    display: flex;
    align-items: center;
    justify-content: end; 
    gap: 40px;
    margin-top: 2rem;
}
`;

export const PdfPreviousButtons = styled.a`
display: flex;
flex: 1;
align-items: center;
width: 100%;
cursor: pointer;
max-width: max-content;
// float: right;
max-width: max-content;
color: blue;
&.disable{
    pointer-events: none;
    cursor: not-allowed;
    display: none;   
}
    @media (${screenSize.maxMobile}) {
        // margin-right: 3.5rem;
    }
    @media (${screenSize.tablet}) {
        // margin-right: 6.5rem;
    }
    @media (${screenSize.desktop}) {
        // margin-right: 11rem;
    }
`;

export const PdfDownloadButton = styled.a`
cursor: pointer;
text-decoration: none;
color: blue;
float: right;
display: flex;
`;

export const PdfNextButton = styled.a`
display: flex;
align-items: center;
width: 100%;
cursor: pointer;
max-width: max-content;
// float: right;
max-width: max-content;
color: blue;
&.disable{
    pointer-events: none;
    cursor: not-allowed;
    display: none;
}
    @media (${screenSize.maxMobile}) {
        // margin-right: 3.5rem;
    }
    @media (${screenSize.tablet}) {
        // margin-right: 6.5rem;
    }
    @media (${screenSize.desktop}) {
        // margin-right: 11rem;
    }
`;

export const NextImage = styled.img`
height: 2rem;
width: 2rem;
    @media (${screenSize.maxMobile}) {
        height: 1.5rem;
        width: 1.5rem;
    }
`;

export const Box = styled.div`
// width: 100%;
// display: flex;
// justify-content: center;
`;

export const Iframe = styled.iframe`
display: flex;
justify-content: center;
border: none;
height: calc(60vh - 80px);
width: 100%;
    @media (${screenSize.maxMobile}) {
        height: calc(100vh - 338px);
    }
    @media (${screenSize.tablet}) {
        height: calc(80vh - 80px);
    }
`;

export const PdfName = styled.label`
    font-style: normal;
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 1;
    letter-spacing: -0.02em;
    color: #000000;
    margin: 2rem 0;
    display: block;
    // @media (${screenSize.maxMobile}) {
    //     &.active{
    //         margin-left: -13rem;
    //     }   
    // }
    // @media (${screenSize.tablet}) {
    //     &.active{
    //         margin-left: -13rem;
    //     }
    // }
    // @media (${screenSize.desktop}){
    //     margin-left: 0rem;
    //     &.active{
    //         margin-left: -22rem;
    //     }
    // }
`;

export const PDFDiv = styled.div`
    height: calc(60vh - 80px);
    width: 100%;
    @media (${screenSize.maxMobile}) {
        height: calc(100vh - 338px);
    }
    @media (${screenSize.tablet}) {
        height: calc(80vh - 80px);
    }
`;
