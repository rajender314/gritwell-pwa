import {appFontColor, blueColor, greenColor,
  mediumFont, subHeading3, whiteColor}
  from '@app/styles';
import {StylingProps} from '@app/utils/props';
import styled from 'styled-components';
export const TrackHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid #EEF0F4;
    box-shadow: 0px 2px 15px rgb(0 0 0 / 5%);
    border-radius: 16px;
    /* padding: 10px 15px; */
    min-height: 68px;
    margin-left: 15px;
    border: 1px solid #B0DECF;
    box-shadow: 0px 2px 8px rgb(0 0 0 / 5%);
    ${({color}: StylingProps) => {
    return `{
                    border-color: ${color ? color : '#b8bcca'};
                 }
                 `;
  }
}
    border-radius: 20px;
    overflow: hidden;
    &.w-120{
        width: 120px;
    }
&.D-header{
    margin-top: 30px;
    border: 0;
    box-shadow: 0 0 0 0;
    border-radius: 0;
    padding: 0;
    margin-left: 0;
    display: block;
}
`;
export const TrackCard = styled.div`
/* border-left: 1px dashed ; */
/* &:not(:last-child){ */
padding-bottom: 10px;
/* } */
&.hj2{
    &:last-child{
    &::after{
        content: '';
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 10px solid #6F7381;
      position: absolute;
      top : unset;
      bottom: 23px;
    left: -9px;

    }
}
}
&:last-child{
    &::after{
        content: '';
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 10px solid #6F7381;
      position: absolute;
      top : 100%;
      left: -9px;

    }
}

&.active{
/* border-left: 1px solid #278C71; */
&:before{
    content: '';
    width: 1px;
    height: 100%;
    background-color: #278C71;
    position: absolute;
    top: 0;
    left: 0;
}
}  

`;
export const PlanTrackCard = styled.div`
/* border-left: 1px dashed ; */
/* &:not(:last-child){ */
padding-bottom: 10px;
/* } */
&.hj2{
    &:last-child{
    &::after{
        content: '';
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 10px solid #6F7381;
      position: absolute;
      top : unset;
      bottom: 23px;
    left: 11px;

    }
}
}
&:last-child{
    &::after{
        content: '';
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 10px solid #6F7381;
      position: absolute;
      top : 100%;
      left: 11px;

    }
}

&.active{
/* border-left: 1px solid #278C71; */
&:before{
    content: '';
    width: 1px;
    height: 100%;
    background-color: #278C71;
    position: absolute;
    top: 0;
    left: 0;
}
}  

`;

export const MonthLabel = styled.span`
    color: #6F7381;
    padding: 10px 10px 15px;
    /* border-left: 1px dashed; */
    &.b-0{
        border: 0;
    }
    &.o-0{
        opacity: 0;
    }
    &.bgs-white{
        background: white;
        position: relative;
        z-index: 5;
        padding: 0 15px;
    }
`;
export const TrackRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid #c6c8cd;
    box-shadow: 0px 2px 15px rgb(0 0 0 / 5%);
    border-radius: 16px;
    padding: 10px 35px;
    margin-left: 15px;
       
`;
export const DTrackCard = styled.div`
   ${({bgColor}: StylingProps) => {
    return `
             &::after{
                background: ${bgColor ? bgColor : appFontColor};
             }
             `;
  }
}
${({color}: StylingProps) => {
    return `
    svg{
        path{
            fill : ${color ? '#1E3653 '+ ' !important' : '#B8BCCA'}
        }
    }
    `;
  }
}
&.w-120{
    width: 120px;
}
&.h-165{
    min-height: 165px;
}
              &.cust-border{
    border: 1px solid #B0DECF;
           box-shadow: 0px 2px 8px rgb(0 0 0 / 5%);
    border-radius: 20px;
    overflow: hidden;
    ${({color}: StylingProps) => {
    return `{
                    border-color: ${color ? color : '#b8bcca'};
                 }
                 `;
  }
}
&.active{
/* border-left: 1px solid #278C71; */
&:before{
    content: '';
    width: 100%;
    height: 1px;
    background-color: #278C71;
    position: absolute;
    top: 0;
    left: 0;
}
} 
&.box-pl{
    background: #FFFFFF;
border: 1px solid #EEF0F4;
box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
border-radius: 16px;
padding: 10px;
width: 110px;
    min-width: 110px;
    max-width: 110px;
align-items: center;
align-self: auto;
height: 157px;

} 
&.box{
    background: #FFFFFF;
border: 1px solid #EEF0F4;
box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
border-radius: 16px;
padding: 10px 35px;
width: 120px;
    min-width: 120px;
    max-width: 120px;
align-items: center;
align-self: auto;
height: 157px;

} 

    .track-icons{       
        z-index: 2;        
    position: absolute;
    top: 8px;
    left: 48px;
    svg{
            path{
                fill : ${whiteColor}
            }
        }

    }

              }`;

export const ActiveBadge = styled.div`
    position: absolute;
    bottom: -11px;
    padding: 8px 10px;
    background: #E8F4F3;
    border-radius: 16px;
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    color: #067356;
`;
export const SubHeading3 = styled.div`
    ${subHeading3};
    ${mediumFont};
    color: ${appFontColor};
`;

export const PlanJourneyWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

export const PlanJourneyTrack = styled.div`
    display: flex;
    position: relative;
    z-index: 2;
    &.center{
        justify-content: space-between;
        width: 87%;
    }
   
         &::after, &::before{
        content: '';
        position: absolute;
    }
    &::before{
        width: 6px;
        height: 6px;
        background-color: ${greenColor};
        border-radius: 50%;
        top: 43px;
        left: 0;
    }
    &::after{
        width: 0; 
        height: 0; 
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-left: 6px solid #6F7381;
        top: 40px;
        right: 0;
    }

   
`;

export const PlanJourneyCard= styled.div`
    width: 120px;
    padding: 60px 8px 0;
    position: relative;
    &::after{
        content: '';
        width: 100%;
        height: 2px;
        background-color: transparent;
        position: absolute;
        top: 45px;
        left: 0;
    }
    &.active{
        &::after{
            background-color: ${greenColor};
        }
    }
`;

export const CardLabel = styled.p`
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    position: absolute;
    top: 20px;
    width: calc(100% - 8px);
    margin: 0;
`;

export const PlanJourneyDecor = styled.div`
    content: '';
    width: 100%;
    height: 1px;
    border-bottom: 2px dashed #6F7381;
    position: absolute;
    top: 44px;
    left: 0;
    z-index: -1;
`;

export const CardCureentStatus = styled.div`
font-weight: 500;
font-size: 14px;
line-height: 22px;
text-align: center;
color: ${blueColor};
padding:  8px 8px;
cursor: pointer;
&:hover{
    text-decoration: underline;
}
`;
