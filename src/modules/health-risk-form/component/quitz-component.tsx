/* eslint-disable max-len */

import {isMobile} from 'react-device-detect';
// import {

//   primaryBackgroundColor}
//   from './colors';
import styled from 'styled-components';

export const FilterQuiz = styled.div`
/* background-color: #F8F5F0; */
display:flex;
flex-direction: ${isMobile ? 'column' : 'row'};
gap: 100px;
    /* align-items: center; */
    &.gp-2{
        gap:150px
    }
`;
export const Quitzcontainer=styled.div`
     background-color: #F8F5F0;

     &.padd-l{
        padding: 0px 112px;
}
     
`;
export const Filtercontainer= styled.div`
    /* padding-top: 230px; */
    display:flex;
flex-direction: ${isMobile ? 'column' : 'row'};
gap: 59px;
      padding:${isMobile ? '24px 24px 24px 24px' : '150px 132px'}; 
      
      &.content{
padding-top: ${isMobile ? '94px' : '100px'};
}
`;
export const Optionscontainer=styled.div`
    padding-top: 20px;
    gap: 10px;
    display: flex;
    flex-direction: column;
        
`;
export const Options=styled.div`
max-width: 100%;
background-color: #FFFFFF;
&.b-c{
        display: flex;
    flex-direction: row;
    align-items: center;
    transition: 0.1s ease;
    padding: 10px 28px;
    gap: 8px;
    width: 100%;
    font-weight: 400;
    /* height: 30%; */
    /* height: 54px; */
    min-height: 54px;
    background: #FFFFFF;
    box-shadow: 0px 2px 15px rgb(0 0 0 / 5%);
    border-radius: 16px;
    box-sizing: border-box;
    border: 1.5px solid transparent;
    font-size: 18px;
    line-height: 1.4;
}
&.b-c.active{
 border: 1.5px solid #355F92;
 font-weight: 500;
 color:  #1E3653;

input[type='radio']{
    accent-color: #355F92;
}
}
input[type='radio']{
    margin: 0 0.6em 0 0;
}
&.max-width50{
    max-width: 50%;
}
&.email{
    background: #FFFFFF;
box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
border-radius: 16px;
border:none;
outline:none;
/* width: ${isMobile ? '327px' : '664px'};
height: ${isMobile ? '49px' : '54px'}; */
display: flex;
flex-direction: row;
align-items: center;
input{
    border:none;
    outline:none;
    width: ${isMobile ? '100%' : '664px'};
height: ${isMobile ? '49px' : '54px'};
border-radius: 16px;
padding-left: 16px;
font-size: 18px;
}
input::placeholder{
   font-weight: 400;
font-size: 18px;
line-height: 17px;
color: #8B8B8B;
}
}

`;

export const InputField = styled.input`
    outline: none;
    border: none;
    font-size: 18px;
    line-height: 1.4;
    width: 100%;
    color: #111A1C;
    &::placeholder{
        color: #111A1C;
    }    
`;

export const ImageDiv=styled.div`
/* width:512px;
height: 460px; */
width:${isMobile ? '100%' : '512px'};
height:${isMobile ? '202px' : '400px'};
border-radius: 20px;
overflow: hidden;
  img{
   width:100%;
    height: 100%;
    object-fit: cover;
      
        &.b-i{
                border-radius: 0px 0px 20px 20px;
        }
  } 

`;
export const OptionDivs=styled.div`
  /* display:flex;

  gap: 16px; */
 
  &.fl-1{
        flex:1;
        flex-wrap: wrap;
  }
  &.colum{
        padding-top: 20px;
    gap: 10px;
    display: flex;
    flex-direction: column;
  }
  &.flex-c{
    display:grid;
      grid-template-columns  : ${isMobile ? 'auto' : 'auto auto'};
      gap:16px;
  }
        
`;
export const Imscontainer=styled.div`
            background-color: #72C4AA;
  
    width: 120%;
    height: 130px;

    border-radius: 20px 20px 0px 0px;
`;
export const FilterHeading=styled.div`
font-family: 'DM Sans';
font-style: normal;
font-weight: 400;
font-size: ${isMobile ? '22px' : '28px'};
line-height:  ${isMobile ? '1.4' : '1.4'};
color: #000000;
/* flex:1; */
&.font{
font-family: 'DM Sans';
font-style: normal;
font-weight: 400;
font-size:  ${isMobile ? '28px' : '32px'};
line-height: ${isMobile ? '1.5' : '1.5'};
text-align: ${isMobile ? 'left' : 'center'};
/* New Brand/Black */
color: #000000;
}
&.values{
    text-align: ${isMobile ? 'left' : 'center'};
}
.rootcause-tag{
    color: #000000;
}
`;
export const Filter=styled.div`
display:flex;
flex-direction:row;`;
export const FilterContainer=styled.div`
/* padding-top: ${isMobile ? '94px' : '150px'}; */
`;
export const FilterMain=styled.div`
display:flex;
flex-direction:${isMobile ? 'column' : 'row'};
gap:${isMobile ? '38px' : '60px'};
padding:${isMobile ? '16px' : 'unset'};
&.customPaddingTop{
    padding-top: 130px;
}
`;

export const ImageContainer=styled.div`
border-radius: 20px;
overflow: hidden;
img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
/* width:512px;
height:460px; */
width: ${isMobile ? '100%' : '512px'};
height:${isMobile ? '202px' : '400px'};
`;
export const ButtonMain=styled.div`
padding: ${isMobile? '16px 0px': '20px 0px'};
`;
// export const QuitzContainer=styled.div`
// flex:1;
// padding:${isMobile ? 'unset' : '57px 0px'};
// `;
export const QuitzContainer=styled.div`
flex:1;
&.w-50{
    width: 50%;
    max-width: 50%;
}
/* padding:${isMobile ? 'unset' : '57px 0px'}; */
`;
export const FilterOptions=styled.div`
display:flex;
flex-direction:${isMobile ? 'column' : 'row'};
gap:${isMobile ? '38px' : '82px'};

`;
export const QuestionContainer=styled.div`
flex:1;
padding-top:${isMobile ? '' : '10px'};

`;
export const FilterContainers=styled.div`
padding:${isMobile ? '24px 24px' : '170px 69px'};
`;
export const QuestionScreen=styled.div`
/* padding: 146px 200px; */
padding:${isMobile ? '24px 0px' : 'unset'};
`;
export const EmailContainer=styled.div`
/* padding: 150px 222px; */
/* padding:${isMobile ? '24px 24px' : '150px 222px'}; */
`;
export const MultiOpt=styled.div`
&.w-I{
    width: 900px;
height: 500px;
}

`;


export const Headering=styled.div`
 padding: 15px 20px;
    text-align:center;
   width:100%;
   display: flex;
    align-items: center;
   justify-content: ${isMobile ? 'space-between' : 'space-between' };
   box-sizing: border-box;
   min-height: 60px;
   max-height: 60px;
   flex-direction:row;
   background-color: white;
   box-sizing:border-box;
   border-bottom: 1px solid rgba(0,0,0,0.04);

`;
export const Progress=styled.div`
    /* top: 0; */
    /* padding: 0; */
    /* width: 100%; */
    /* position: sticky; */
    /* max-width: 750px; */
    margin: ${isMobile ?'16px auto':'40px auto'};
    margin-bottom: ${isMobile ?'18px':'30px'};
    /* background: #f8f5f0; */
    padding: 0px 16px;
    box-sizing: border-box;
  
&.p-v{
    background: #72C4AA;
  /* Adjust with JavaScript */
  height: 6px;
  transition: 0.3s all ease;
}

`;

export const Progresssub=styled.div`
  background: #72C4AA;
  /* Adjust with JavaScript */
  height: 6px;
  transition: 0.3s all ease;
`;
export const ProgressBarContainer=styled.div`
    background: #FAFAFC;
    border-radius: 20px;
    overflow: hidden;
    margin-top: 8px;
`;
export const Errormessage =styled.div `
margin: 0px;
padding-top: ${isMobile? '16px': '16px'};
    max-width: 100%;
    /* width: inherit; */
    font-weight: unset;
    font-size: 16px;
    line-height: 20px;
    color: rgb(175, 4, 4);
    /* margin-left: 23px; */
    font-family: sans-serif;
`;
export const MultiSelect =styled.div`
    width: ${isMobile ? '100%' : 'calc(50% - 15px);' };

`;
export const FirstScreen=styled.div`
 display: flex;
    flex-direction: column;
    align-items: ${isMobile ? 'left' : 'center' };
    /* padding: 178px 219px; */
    /* padding:${isMobile ? ' 100px 24px' : ' 178px 219px' }; */
    justify-content: center;
`;
export const BackgroundImage=styled.div`
// eslint-disable-next-line max-len
margin: 40px 0 ;
/* background: linear-gradient(90deg, #04A461 0%,#C9B453 36.46%, #FFB950 52.18%, #F19C46 68.75%,#B11818 100%  ); */
background: linear-gradient(90deg, #04A461 0%, #C9B453 36.46%, #FFB950 52.18%, #F19C46 68.75%, #B11818 100%);
border-radius: 100px;
position: relative;
width: ${isMobile ?'100%' :'490px'};
height: 39px;
.arrow-position{
    position: absolute;
    top: 18px;
    left:18px;
}
`;
export const ButtonContainer=styled.div`
display:flex;
flex-direction:${isMobile? 'row' :'column'};
align-items : center;
padding-top:30px;
gap:23px;
.takes{
    font-family: 'DM Sans';
font-style: normal;
font-weight: 400;
font-size: 13px;
line-height: 17px;
}

`;
export const Wraps=styled.div`
width:${isMobile ? '100%' :'100%'};
`;
export const FormDescription=styled.div`
font-family: 'DM Sans';
font-style: normal;
font-weight: 400;
font-size: 17px;
line-height: 27px;
padding-top: 16px;
color: #000000;
`;

