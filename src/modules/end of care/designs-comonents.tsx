import {isMobile} from 'react-device-detect';
import styled from 'styled-components';

export const Container = styled.div`
  /* background-color: #f9d4a9;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center; */
  // align-items: center;
`;

export const ContainerBox = styled.div`
  border: ${isMobile ? 'unset' : '2px solid white'};
  border-radius: 20px;
  width: 100vw;
    height: 100%;


  padding: 32px;
  margin-top: ${isMobile ? '12px' : '48px'};
`;

export const LabelDiv = styled.div`
  margin: 1rem 0.3rem;
`;

export const BoxLabel = styled.label`
  font-weight: ${isMobile ? '400' : '500'};
  font-size: ${isMobile ? '32px' : '20px'};
  line-height: ${isMobile ? '42px' : '26px'};
  color: #000000;
`;

export const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 35px - 35px);
 
`;

export const OptionDiv = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 1rem 1.5rem 0.3rem;
  margin-bottom: 1rem;
  cursor: pointer;
  &.active {
  cursor:pointer; 
    border: 2px solid black;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  }
  &.select {
    background-color: #144eee;
     border: 2px solid #000000;
  }
`;

export const OptionLabel = styled.label`
  font-weight: 700;
  font-size: 17px;
  line-height: 140%;
  color: #000000;
  align-self: stretch;
`;

export const OptionPara = styled.p`
  font-weight: 400;
  font-size: 15px;
  line-height: 140%;
  color: rgba(0, 0, 0, 0.6);
`;

export const ButtonDiv = styled.div`
  display: flex;
  justify-content:${isMobile ? 'spacebetween' : 'end'};
  // padding: 24px 0px;
  // &.marginTop {
  //   margin-top: 1rem;
  // }
  padding: 24px 40px;
  &.gap-80{
    gap:80px;
  }
`;

export const SubPointsDiv = styled.div`
  border-radius: 15px;
  padding: 1rem 1.5rem;
  margin: 1rem 0;
  position: relative;
  background-color: #F7F7F7;
`;

export const SubPointsLabel = styled.label`
  font-weight: 700;
  font-size: 13px;
  line-height: 140%;
  color: #1B2324;
`;

export const SubPointsPara = styled.p`
  font-weight: 400;
  font-size: 13px;
  line-height: 140%;
  color: #1B2324;  
`;

export const SpanPoint = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  color: #1e3653;
  text-decoration: none !important;
  cursor: pointer;
`;

export const InfoIcon = styled.div`
  position: relative;
  cursor: pointer;

  .info-message {
    opacity: 0;
    visibility: hidden;
    background: #e9dcce;
    border-radius: 15px;
    width: 258px;
    position: absolute;
    top: 100%;
    right: 0;
  }
  &:hover {
    .info-message {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export const ExtendContainer = styled.div`
  padding: 2rem 1rem;
  display:flex;
  flex-direction:column;
`;

export const ExtendTitle = styled.label`
font-size: ${isMobile ? '15px' : '17px'};
color: #1E3653;
  font-weight:400;
  line-height: 27px;
  /* padding:11px 0px; */
  /* padding-right: 24px; */
      padding-right: ${isMobile ? '35px' : '0px'};
`;

export const Title = styled.label`
  font-weight: 400;
  font-size: 32px;
  line-height: 42px;
  color: #000000;
  padding-bottom:8px;
  display:block;
`;
export const Title1 = styled.label`
  font-weight: 500;
  font-size: ${isMobile ? '24px' : '40px'};
  line-height: 50px;
  color: #000000;
`;
export const PlanPointsDiv = styled.div`
  display: flex;
  flex-direction: row;
padding:5px;

`;

export const Points = styled.div`
  color: #000000;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  span{
    font-weight: 600;
    text-decoration: underline;
    color:#1E3653;
  }

`;

export const PointSpan = styled.span`
  margin-right: 0.5rem;
`;

export const CardDiv = styled.div`
  display: flex;
  /* flex-direction: ${isMobile ? 'column' : 'row'}; */
  padding: 0px 1rem;

  gap:20px;
  flex-direction:column;
`;

export const Card = styled.div`

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 24px;
  cursor: pointer;
  // gap: 15px;
  flex: 1;

  position: relative;
  border: 1px solid #d7c1a8;
  border-radius: 20px;
  &.active {
    background: #e9dcce;
   border: 1px solid #1e3653;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  }
  &.card-color{
     background: #e9dcce;
      border: 2px solid #000000;
  }
  &:hover{
    background: #e9dcce;
    border: 1px solid #1e3653;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  }
`;

export const CardHeadDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export const CardHead = styled.label`
  background: #72c4aa;
  border-radius: 52px;
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 32px;
  width: 101px;
  text-align: center;
  letter-spacing: 0.1px;
  position: absolute;
  color: white;
  // bottom: 89.04%;
  bottom: ${isMobile ? '82.04%' : '84.04%'};
  // left: 15%;
  left: ${isMobile ? '64%' : '75%'};
  right: 15%;
`;

export const CardLabel = styled.label`
  font-weight: 700;
  font-size: 15px;
  line-height: 140%;
  color: #000000;
  font-family: "DM Sans";
  font-style: normal;
  &.tr-10{
    transform: translateY(10px);
  }
`;

export const CardPara = styled.p`
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
   line-height: 140%;
  color: #1e3653;
`;


export const AccordianContent = styled.div`
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 28px;
  color: #252b42;
`;
export const AccordianContent1 = styled.div`
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 28px;
  color: #252b42;
`;
export const Content = styled.div`
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  line-height: 140%;
  /* margin-bottom: 99px; */
`;
export const Message = styled.div`
  padding: 18px;
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
`;

export const Total = styled.div`
  font-size: 15px;
  font-weight: 400;
  display: flex;
  flex-direction: ${isMobile ? 'column' : 'row'};
 
`;
export const Total1 = styled.div`
  font-size: 12px;
  font-weight: 400;
`;
export const Option1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 14px 8px 14px 24px;
  gap: 6px;

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;


export const Choose = styled.div`
background: #F7F7F7;
border-radius: 15px;
background-color: #F7F7F7;
padding:16px 24px;
/* margin:30px 0px; */
margin:24px 0px;
`;
export const ChooseHeader = styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;

`;
export const ChooseHeading = styled.div`
font-weight: 700;
font-size: 13px;
line-height: 140%;
color: #1B2324;
`;
export const ChooseIcon = styled.div`
opacity:0.1;
path{
  width:${isMobile ? '36' : '84' } !important;
  height:${isMobile ? '36' : '84'} !important;
}
`;
export const ChoosePoints = styled.div`
padding:10px;
font-weight: 400;
font-size: 13px;
line-height: 140%;
color: #1B2324;

`;
export const MembershipContainer = styled.div`
box-sizing: border-box;
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 20px 24px;
gap: 24px;
border: 1px solid #1E3653;
border-radius: 20px;
&.active{
  background: #E9DCCE;
}
&.mb-1{
  margin-bottom: 1rem;
}
&.mb-2{
  margin-bottom: 2rem;
}
&.my-2{
  margin: 1.5rem 0;
}
`;
export const MembershipDiv = styled.div`
  width: 100%;
`;
export const MembershipPara = styled.div`
font-weight: 500;
font-size: 13px;
line-height: 17px;
margin-top: 0.5rem;
color: #1E3653;
&.f-11{
  font-size: 11px;
  line-height: 14px;
  font-weight: 400;
  color: #000000;
}
`;
export const MembershipLabelDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const MembershipLabel = styled.div`
font-weight: 700;
font-size: 15px;
line-height: 20px;
color: #000000;
&.fw-100{
  font-weight: 100;
}
&.f-14{
  font-size: 14px;
  line-height: 18px;
  margin-top: 1rem;
}
&.f-18{
  font-size: 18px;
}
`;
export const Plan = styled.div`
padding-top:0;
padding-bottom:30px;
`;
// export const Icon = styled.div`

//  width:${isMobile ? '36' : '84'};
//   height:${isMobile ? '36' : '84'};
// `;
