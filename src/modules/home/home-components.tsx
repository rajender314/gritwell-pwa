import {appFontColor, blueColor, borderColor2, color1,
  color13, color14, color17, loginBackgroundColor, mediumFont,
  plansBackgroundColor,
  priceColor, primaryBtnColor, primaryTextColor,
  regularFont,
  screenSize,
  secondaryTextColor, whiteColor} from '@app/styles';
import styled from 'styled-components';
import {isMobile} from 'react-device-detect';
import {StylingProps} from '@app/utils/props';
import ConfettiGif from '../../assets/images/confetti.gif';


export const BadgeContainer = styled.div`
    background: ${whiteColor};
    box-shadow: 0px 2px 15px rgb(0 0 0 / 5%);
    border-radius: 16px;
    padding: 20px 24px;
    box-sizing: border-box;
    &.bg-gray{
        background: #FAFAFC;
        border-radius: 20px;
    }
    &.bg-ora{
        background: #FAF6ED;
        box-shadow: 0px 4px 20px rgba(182, 204, 67, 0.05);
        background: #FAFAFC;          
        border-radius: 16px;
    }
    &.bg-bone{
        background: #E9DCCE;
        border-radius: 20px;
    }
    &.br-gray{
        border: 1px solid #e9e9ed99;
        flex: 1;
    }
    &.plr-0{
        padding: 20px 0;
        width: 100%;
    }
    &.br-0{
        border-radius: 0;
    }
    &.ptb-30{
        padding: 35px 25px;
    }
    &.pt-30{
        padding-top: 30px;
    }
    &.pxy-40{
        padding: 40px; 
    }
    &.h-100{
        height: 100%;
    }
    &.careTeamCard{
        background-color: ${whiteColor};
        border: 1px solid #E8EAF1;
        border-radius: 16px;
        padding: 22px 16px ;
    }
    &.cart-itemCard{
        padding: 16px 22px;
        background: #FADDBC;
        box-shadow: 0px 4px 20px rgba(182, 204, 67, 0.05);        
        border-radius: 16px;
        margin-bottom: 8px;
    }
`;
export const BadgeRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    &.plr-25{
        padding: 0 25px;
    }
    &.w-85{
        width: 85%;
    }
    &.h-250{
        height: 250px;
        text-align: center;
        width: 100%;
    }
    .flex-1{
        flex: 1;
    }
    &.item{
        justify-content: flex-start;
        align-items: flex-start;
        padding: 20px 0;
        // border-bottom: 1px solid ${borderColor2};
    }
    &.flx{
        display: flex;
        align-items: baseline;
        flex-direction: column;
        gap: 5px;
        div{
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
            color: ${secondaryTextColor};           
        }  
    }
    svg{
        path{
            fill: ${appFontColor}
        }
    }
    &.r-1{
        div{
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
            color: ${secondaryTextColor};
            padding: 20px 0 10px 0;
        }       
        justify-content: space-between;
    }
    &.r-1-pad-0{
        div{
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
            color: ${secondaryTextColor};
            padding: 0px 0 10px 0;
        }       
        justify-content: space-between;
    }
    &.flex-1{
        flex: 1;
    }
    &.unhide{
        /* visibility: visible; */
        height: 37px;
        opacity: 1;
        transition: height 0.5s ease-in,
                    opacity 0.5s ease-out;
    }
    &.hide{
        /* visibility: hidden; */
        height: 0;
        opacity: 0;
        padding: 0 10px;
        transition: height 0.5s ease-out,
                    opacity 0.5s ease-out;
    }
    &.mt-25{
        margin-top: 25px;
        button{
            flex : 0.45;
        }
    }
    &.mt-20{
        margin-top: 15px;
        button{
            flex : 0.45;
        }
    }
    &.list{
        justify-content: flex-start;
        align-items: flex-start;
        align-items: center;
        padding: 20px 0;
        svg{
            path{
                fill: ${priceColor};
            }
        }
    }
    &.list-bet{
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;
        svg{
            path{
                fill: ${priceColor};
            }
        }
    }
    &.active{
        color: ${color1};
        svg{
            path{
                fill : ${color1};
            }
        }
    }
    &.clr-bl{
        align-items: center;
        svg{
            path{
                fill: ${appFontColor};
            }
        }
    }
    &.bd-bot{
        padding: 25px 0;
        /* border-bottom: 1px solid ${plansBackgroundColor}; */
    }
    &.p-10{
        padding-top: 10px;
    }
    &.pd-20-br{
        border-top: 1px solid #E8EAF1;
        padding: 20px 0 15px;
    }
    &.w-100{
        width: 100%;
    }
    &.pill-context{
        padding: 12px;
        margin-top: 8px;
        border: 1px solid #E8EAF1;
        border-radius: 16px;
        background: white;
        box-shadow: 0px 2px 15px rgb(0 0 0 / 5%);
    }
    &.pills-conte{
        display: flex;
        justify-content: space-evenly;
        gap: 20px;
        align-items: center;
        div{
            align-self: auto;
        }
        &.fl-col{
            flex-direction: column;
            align-items: baseline;
        }
    }
    &.pills-trans{
        display: flex;
        justify-content: space-evenly;
        gap: 20px;
        align-items: center;
        div{
            align-self: auto;
        }        
    }
    &.vertical-cont{
        width: 33.33%;
        &:not(:last-child){
        border-right: 1px solid #E8EAF1;
        }
        padding: 0 10px 0 0px;
        /* text-align: center; */
        .col{
        flex-direction: column;
         gap:15px   
        }
    }
    &.box{
        padding: 21px 16px;
    background: #FFFFFF;
    box-shadow: 0px 2px 30px rgb(0 0 0 / 5%);
    border-radius: 10px;
    margin-bottom: 10px;
    }
    &.pb-15{
        padding-bottom: 15px;
    }
    &.pb-30{    
        padding-bottom: 30px;
    }
    button{
        &.ml-10{
            margin-left: 10px;
        }
    }    
    &.p-0{
        padding: 0px;
    }
    &.js-cen{
        justify-content: center;
    }
    &.com-gre{
        border: 0;
    padding: ${isMobile ? '15px 0px' :'15px 10px'};
    margin-bottom: 10px;
    background: rgba(232, 244, 243, 0.2);
    border-radius: 10px;
    align-items: center;
    div{
        color: #067356;
    }
    }
    &.com-gra{
        background: #ffffff;
    border: 0;
    padding: ${isMobile ? '15px 0px' :'15px 10px'};
    margin-bottom: 10px;
    align-items: center;
    }
    &.js-cen{
        justify-content: center;
        padding: 20px 0;
        font-weight: 500;
        font-size: 18px;
        line-height: 27px;
        color: #067356;
        cursor: pointer;
    }
    &.flx-col{
        display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 50px 0 0;
    gap: 25px;
    }
    &.gp-0{
        gap: 0;
        justify-content: flex-start;
    }
    &.ptb-10{
        padding: 10px 0;
    }
    &.flx-col-15{
        flex-direction: column;
        gap: 15px;
        align-items: flex-start;
    }
    &.br-bot{
        border-bottom: 1px solid #FAFAFC;
        border-radius: 2px;
        /* flex-direction: column; */
        align-items: center;
        padding: 8px 0;
    }
   
`;
export const PreBadge = styled.div`
 
&.clr-trans{    
       
display: flex;
align-items: center;
min-width: 172px;
 .clr-trans{
    min-width: 134px
 }
 &.solid{
    svg{
        path{
            fill: #D29B22 !important;
        }
    }
&::before{
            content: '';
    width: 100%;
    border-bottom: solid 1px  #067356;
        }
    }
}
&.dash{
    color: #6F7381;
    svg{
        path{
            fill :#6F7381!important;
        }
    }
&::before{
            content: '';
    width: 100%;
    border-bottom: dashed 1px #111A1C;
        }
    }

`;
export const BadgePill = styled.div`
    background: ${color17};
    color: ${blueColor};
    cursor: pointer;
    overflow: hidden;
    padding: 8px 16px;
    text-overflow: ellipsis;
    white-space: nowrap;
    background-color: #EEF0F4;
    border-radius: 32px;
    min-width: 121px;
    box-sizing: border-box;
    box-shadow: none;
    max-width: 100%;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    border: 1px solid transparent;
    &.default{
        cursor: default;
        pointer-events: none;
    }
    &.bg-col{
        background-color: #E9DCCE !important;
        color: #1E3653 !important;
        border: none !important;
        line-height: 24px !important;
    }
    &.f-22{
        font-size: 22px !important;
    }
    &.fit-content{
        width: fit-content;
    }
    border: 2px solid transparent;
    -webkit-transition: all .15s ease-in-out;
    -webkit-transition: all .15s ease-in-out;
    transition: all .15s ease-in-out;
    ${({bgColor}: StylingProps) => {
    return `background: ${bgColor ? bgColor :color17} };`;
  }} ;
   ${({color}: StylingProps) => {
    return `color: ${color ? color :blueColor} };`;
  }} ;
    &:hover{
        border-color: ${blueColor};
    }
    &.nohover{
        pointer-events: none;
    }
    &.bg-bei{
        background: #FADDBC;
    }
    &.bg-bei{
        background: #FADDBC;
        border: 1px solid #F9D4A9;
        font-weight: 500;
        font-size: 16px;
        line-height: 16px;
        color: #1E3653;
        }
    &.no-pointer{
        cursor: default;
        pointer-events: none;
    }
    &.no-pointer:hover{
        border-color: transparent;
    }
    &.clr-trans{       
        background: #FFFFFF;
        /* Gray/200 */
        text-align: center;
        border: 1px solid #EEF0F4;
        border-radius: 16px;
        padding: 15px 10px;
        font-weight: 400;
        font-size: 14px;
        color: #111A1C;
        line-height: 21px;
        display: flex;
        align-items: center;
    }
    &.pending{
        padding: 8px 16px;
        background: ${loginBackgroundColor};
        border-radius: 32px;
        color: ${secondaryTextColor};
        font-weight: 500;
        font-size: 16px;
        line-height: 32px;
    }
    &.active{
        background-color: ${blueColor};
        color: ${whiteColor};
    }
    &.active:hover{
        // background-color: ${whiteColor} !important;
        // color: #1E3653;
        border-color: ${blueColor};
    }
    &.disable{
        opacity: 0.3;
        pointer-events: none;
    }
    &.active-clr{
        background: #355F92;
        color: #FFFFFF;
        line-height: 16px;
        padding: 16px;
        border-radius: 32px;
        width: 35%;
        text-align: center;
    }
    &.newTag{
        background: #FADDBC;
        border: 1px solid #F9D4A9;
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        min-width: fit-content !important;
        color: #1E3653;
        width: fit-content !important;
        padding: 0.2rem 0.6rem;
    }
    &.w-88{
        width: 88%;
    }
    &.activ{
        font-weight: 500;
        font-size: 18px;
        line-height: 32px;
        color: ${appFontColor};
        background: ${loginBackgroundColor};
    }
    &.transparent{
        background: transparent;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: ${primaryTextColor};
    }
    &.dialog-pill{
        background: #F0F0F0;
        border-radius: 32px;
        color: #067356;
        font-weight: 500;
        font-size: 16px;
        line-height: 16px;
        padding: 8px 16px;
        width: fit-content;
        margin: 0 auto;
        border-color: #ededed;
    }
    &.secondary{
        color: ${primaryBtnColor};
background: ${whiteColor};
border: 1px solid ${primaryBtnColor};
    }
    &.CANCELED{
        color: #721c24;
        background-color: #f8d7da;
        border-color: #f5c6cb;
    }
    &.RESCHEDULED{
        color: #856404;
    background-color: #fff3cd;
    border-color: #ffeeba;
    }
    &.SCHEDULED{
        color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
    }
    &.disabled{
        color: #1E3653;
        background: #EEF0F4; 
           }
           &.clr-ble{
            background: #F3F7FA;
            color: #104E68;
            padding: 20px 15px;
           }
    &.disabled-clr{
        color: #067356;
        background: #EEF0F4; 
        padding: 16px;
        border-radius: 32px;
        width: 35%;
        text-align: center;
        border-radius: 32px;
    }  
    &.gray{
        background: rgba(214, 214, 214, 0.1);
border-radius: 4px;
padding: 4px 12px;
font-weight: 500;
font-size: 11px;
line-height: 160%;
color: #494F50;
    }  
    &.pw-35{
        padding: 8px 10px !important;
        width: ${isMobile ? '50%' : '35%'};
        text-align: center;
    }   
&.width-unset{
    min-width: unset !important;
}
&.bg-E2D2C0{
    background-color: #E2D2C0;
    border-radius: 8px;
}

`;
export const BadgeHeading = styled.div`
    font-weight: 500;
    font-size: 18px;
    line-height: 20px;
    color: ${appFontColor};
    &.w-15{
        width: 15px;
        text-align: center;
    }
    &.mb-50{
        margin-bottom: 15px;
    }
    &.sub-head{
        font-weight: 400;
        font-size: 18px;
        line-height: 23px;
    }
    &.sub-head2{
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        border-bottom: 5px solid ${color13};
        width: 100%;
        border-radius: 4px;
    }
    &.sub-head3{
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
    }
    &.bdr-orange{
        border-bottom: 5px solid #FAF6ED;
        
    }
    &.pd-15{
        padding-top: 15px;
        border-top: 1px solid #E8EAF1;
        width: 100%;
        }
        &.f-20{
            font-weight: 500;
            font-size: 20px;
            line-height: 140%;
        }
        &.f-18{
            font-weight: 500;
            font-size: 18px;
            line-height: 140%;
        }
        &.f-400{
            font-weight: 400;
        }
        &.f-16{
            font-weight: 500;
            font-size: 16px;
            line-height: 32px;
        }
        &.p-0{
            padding: 0;
        }
        &.clr-gr{
            color: #355F92;
        }
        &.clr-bl{
            font-weight: 500;
            font-size: 17px;
            line-height: 22px;
            color: #355F92;
            &.wei-700{
                font-weight: 700;
            }
        }
        &.clr-black{
            color: #000000 !important; 
        }
        &.min-w-16{
            min-width: 16px;
        }
        &.f-32{
            font-size: 32px;
            line-height: 42px;
            letter-spacing: -0.02em;
        }
`;
export const BadgeLabel = styled.div`
    font-weight: 400;
    font-size: 17px;
    line-height: 26px;
    color: #000000;
    padding-left: 10px;
    cursor: pointer;
    &.default-cursor{
        cursor: default;
    }
    &.fs-20{
        font-size: 20px !important;
        color: #111A1C !important;
    }
    &.al-r{
        text-align: right;
    }
    &.session{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 159px;
        height: 40px;    
        border: 1.5px solid rgba(53, 95, 146, 0.5);
        border-radius: 23px;
        text-decoration-line: underline;
        color: #355F92;
        font-weight: 500;
        font-size: 16px;
        line-height: 16px;
    }
    &.clr-grn{
        color: ${primaryBtnColor};
    }
    &.pl-2{
        padding-left: 2px;
    }
    &.caps{
        text-transform: capitalize;
    }
    &.uppercase{
        text-transform: uppercase;
    }
    &.clr-red{
        color: ${color14};
    }
    &.clr-blu{
        color: ${blueColor} !important;
        font-weight: 500 !important;
    }
    &.f-16-24{
        line-height: 24px;
    }
    &.file-upload{
        position: relative;
        input{
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            opacity: 0;
        }
    }
    &.f-14s{
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
    }
    &.fw{
        font-weight: 500;
    }
    &.f-12{
        font-size: 12px;
        font-weight: 400;
        line-height: 24px;
    }
    &.dai{
        // font-style: italic;
        font-weight: 400;
        font-size: 17px;
        line-height: 24px;
        padding: 10px 0;
        &.my-8{
            margin: 8px 0;
        }
    }
    &.f-20{
        font-weight: 500;
        font-size: 18px;
        line-height: 27px;
    }
    &.f-16{
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
    }
    &.ptb-15{
        padding: 15px 0;
    }
    &.p-15{
        padding: 15px 20px;
    }
    &.w-500{
        ${mediumFont};
        span{
            ${regularFont}
            color: #6F7381;
        }
    }
    p{
        font-weight: 400;
        font-size: 14px;
        color: #6F7381;
        margin: 10px 0 0 0;
        &.p-0{
            margin: 0;
        }
    }
    &.clr-gray{
        color: #6F7381;
    }
    &.f-14{
        font-size: 14px;
        line-height: 16px;
    }
    &.f-15{
        font-size: 15px;
        line-height: 20px;
    }
    &.bold{
        ${mediumFont};
    }
    &.flex-row{
        display: flex;
        justify-content: space-between;
        align-items: baseline;
    }
    &.js-start{
        justify-content: flex-start;
    }
    &.w-100{
        width: 100%;
    }
    &.txt-left{
        text-align: left;
    }
    &.p-0{
        padding: 0;
    }
    &.h-250{
        text-align: center;
        width: 100%;
    }
    &.f-18{
        font-weight: 500;
        font-size: 18px;
        line-height: 27px;
        color: #111A1C;
    }
&.p-15{
    padding: 15px;
}
&.m-0{
    margin: 0;
}

&.no-recorders{
    font-style: normal;
font-weight: 500;
font-size: 20px;
line-height: 26px;
text-align: center;
letter-spacing: -0.02em;
}
&.get-details{
    font-weight: 500;
    font-size: 17px;
    line-height: 22px;
    color: ${blueColor};
    cursor: pointer;
    &:hover{
        text-decoration: underline;
    }
    @media (${screenSize.maxMobile}) {
        font-size: 16px;
    line-height: 22px;
    }
}
    `;

export const BadgeSpan = styled.span`
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;  
    display: flex;
    align-items: center;
    text-decoration-line: underline;
    color: #000000;
    &.f-14{
        font-size: 14px;
        font-weight: 500;
        line-height: 24px;
    }
`;
export const ContentBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 20px;
    margin-top: 15px;
    border: 1px solid #E8EAF1;
    border-radius: 16px;
    box-sizing: border-box;
    &:first-child{
        margin-top: 0;
    }
    &.mb-0{
        border: 0;
        margin: 0;
        justify-content: center;
        color: #067356;
        font-weight: 500;
    }
    &.fl-col{
        flex-direction: column;
        align-items: baseline;
    }
    &.w-88{
        width: 88%;
    }
    .flex-1{
        flex:1;
    }
    `;

export const Menu = styled.div`
    position: absolute;
    top: 25px;
    right: 0px;
    background: #FAFAFC;
    border: 1px solid #E8EAF1;
    border-radius: 8px;
    z-index: 25;
`;
export const MenuItem = styled.div`
   padding: 20px;
   border-bottom: 1px solid #E8EAF1; ;
`;
// new home screen styles

export const HeroBannerSection = styled.div`
    min-height: 300px;
    padding: 48px 0 30px 0;
    width: 100%;
    position: relative;
    background: #E9DCCE;
    border-bottom: 25px solid #F5B873;
    ${({bgColor}: StylingProps) => {
    return `background: ${bgColor ? bgColor :' #E9DCCE'} };`;
  }} ;
    &.py-40{
        padding: 40px 0 !important;
    }
    &.p-0{
        padding: 0 !important;
    }
    .m-auto{
        margin: 0 auto;
    }
    &.h-300{
        height: 300px
    }
 `;
export const RootcauseBannerSection = styled.div`
 min-height: 300px;
 padding: 48px 0;
 width: 100%;
 position: relative;
 background: #E9DCCE;
 ${({bgColor}: StylingProps) => {
    return `background: ${bgColor ? bgColor :' #E9DCCE'} };`;
  }} ;
 &.py-40{
     padding: 40px 0 !important;
 }
 &.p-0{
     padding: 0 !important;
 }
 .m-auto{
     margin: 0 auto;
 }
 &.h-300{
     height: 300px
 }
`;
export const LeftHomeContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;
export const HomeWrapper = styled.div`
    width: 100vw;
    overflow: hidden;
    display: flex;
`;
export const TextContainter = styled.div`
    flex: 1 1 0%;
    display: flex;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    justify-content: center;
    /* padding: 24px; */
    flex-direction: column;
    .info-icon{
        color: #090909;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
    }
    .root_home_Welcome{
    color: #090909;
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    line-height: 52px;
    }
    .root_home_text{
        color: ${appFontColor};
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 27px;
        margin: 12px 0 16px;
    }
    .rootCausehomeResults{
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 31px;
        text-align: center;
        color: #090909;
    }
`;
export const HeroBannerHeading =styled.div`
    font-weight: 300;
    line-height: 1.2;
    /* letter-spacing: 0.04em; */
    text-transform: capitalize;
    color: #090909;
    &.mb-24{
        margin-bottom: 24px;
    }
    &.mb-16{
        margin-bottom: 16px;
    }
    &.f-36{
        font-size: 36px;
    }
    &.f-30{
        font-size: 30px;
    }
 `;
export const HeroBannerSubHeading =styled.div`
    font-weight: 400;
    line-height: 1.5;
    color: #111A1C;
    font-size: 17px;
    &.mb-32{
        margin-bottom: 32px;
    }
    &.f-24{
        font-size: 24px;
    }
    &.f-18{
        font-size: 18px;
    }
    &.max-w-410{
        max-width: 410px;
    }
`;
export const BackGroundIcon = styled.div`
    position: absolute;
    top:0;
    left:0;
    &.top-80{
        top: 80px;
    }
 `;
export const HomeToDoCards = styled.div`
    /* min-width: 300px; */
    min-height:${isMobile?'':'53px'};
    min-width: 330px;
    padding: 14px 16px 14px 16px;
    background: ${whiteColor};
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.02);
    border-radius: 10px;
    /* border-top: 10px solid #E8EAF1; */
    box-sizing: border-box;
    cursor: pointer;
    &.notallow{
        cursor: default;
    }
    &.currentTodo{
        border-top: 10px solid #355f92 !important;
    }
     &.unhide{
        /* visibility: visible; */
        /* height: 37px; */
        opacity: 1;
        transition: height 0.5s ease-in,
                    opacity 0.5s ease-out;
    }
    &.hide{
        /* visibility: hidden; */
        height: 0;
        opacity: 0;
        padding: 0 10px;
        transition: height 0.5s ease-out,
                    opacity 0.5s ease-out;
    }
    &.checked{
        background: #F8F5F0;
        border-top: 10px solid #72C4AA;
        pointer-events: none;
    }
    &.un_checked{
        background: ${whiteColor};
        border-top: 10px solid #E8EAF1;
    }
    &.w-100{
        width: 100%;
        min-width: unset !important;
    }
    &.border-top{
            border-top: 10px solid #72C4AA;;
    }
    &.cursor-default{
        cursor: default;
        pointer-events: none;
    }
    .orderStyles{
            width: 29px;
    height: 29px;
    border: 2px solid #000000;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000000;
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 22px;
    }
 `;
export const HomeToDoCardContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    .orderStyles{
            width: 32px;
    height: 32px;
    border: 2px solid #000000;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    }
    &.gap-16{
        gap: 16px;
    }
    &.gap-8{
        gap: 8px;
    }
    &.dis{
       
        svg{
            &:first{
           circle,path{
                fill : #000000;
            }
        }
        }}
    
    &.check{
        svg{
           circle,path{
                fill : #72C4AA;
            }
        }
    }
    .HomeToDoCardInnerContainer{
        &.gap-10{
            gap: 10px;
        }
    }
 `;
export const HomeToDoCardTitle = styled.div`
    font-weight: 500;
    font-size: 17px;
    line-height: 27px;
    color: #000000;
    margin-bottom: ${isMobile?'6px': '6px'};
`;
export const HomeToDoCardStatus = styled.div`
    font-weight: 400;
    font-size: 17px;
    line-height: 27px;
    color: #000000;
    opacity: 0.8;
    ${({color}: StylingProps) => {
    return `color: ${color ? color :'#355F92'} };`;
  }} ;
`;
export const GWColumn = styled.div`
 
    &.flx-col{
        flex-direction : column;
    }
    &.gapXY-80{
        gap: 40px 80px;
    }
`;
export const GWColumnRight = styled.div`
   
    &.flex-1{
        flex: 1;
    }
    .messageLink{
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        align-items: center;
        text-align: center;
        letter-spacing: 0.003em;
        cursor: pointer;
        color: ${blueColor};
    }
`;
export const GWColumnLeft = styled.div`
    &.flex-1{
        flex: 1;
    }
`;
export const HeroBannerHealthCoachCard = styled.div`
    border-radius: 10px;
    border-top: 10px solid ;
    ${({color}: StylingProps) => {
    return `border-color: ${color ? color :' #72C4AA'} };`;
  }} ;
  .rootcause_msg{
    word-break: break-word;
    white-space: pre-line;
  }
  .scheduled-h3{
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 31px;
    color: #090909;
  }
  .hcCard_content{
    color: ${appFontColor};
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 27px;
    margin: 20px 0;
  }
  .scheduleSubCon{
    color: ${appFontColor};
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 27px;
  }
  &.mh-unset{
    min-height: unset;
  }
  &.min-width-500{
    min-width: 500px
  }
   &.max-width-350{
    max-width: 350px;
  }
  &.max-width-434{
    max-width: 434px;
  }
    padding: 16px 24px 32px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    &.p-24{
        padding: 24px;
    }
    &.p-32{
        padding: 32px;
    }
    &.w-100{
        width: 100%;
        min-width: unset !important;
      }
    ${({bgColor}: StylingProps) => {
    return `background: ${bgColor ? bgColor :' #E9DCCE'} };`;
  }} ;
  &.splash{
    background-image: url(${ConfettiGif});
  }
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-blend-mode: multiply;
    
      .blurred{
        position: relative;
        padding: 4px;
          &::after {
            content: '';
            width: 100%;
            height: 100%;
            background-color: rgb(255 255 255 / 15%);
            backdrop-filter: blur(2px);
            position: absolute;
            top: 0;
            left: 0;
        }
      }
      .rootCauseResultsCard{
        svg{
            width: 64px;
            height: 64px;
        }
        span.rootCauseResultsCardText{
            font-weight: 500;
            font-size: 22px;
            line-height: 32px;
        }
        span.rootCauseResultsCardText.f-20{
            font-weight: 500;
            font-size: 20px;
            line-height: 26px;
            color: #1B2324;
        }
        span.rootCauseResultsCardText.f-400{
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            color: #1B2324;
        }
      }
      .rootCauseGoalsCard{
        p.rootCauseGoalsCardText{
            font-weight: 500;
font-size: 20px;
line-height: 26px;
color: #1B2324;
        }
        span.rootCauseGoalsCardText{
            font-weight: 400;
font-size: 14px;
line-height: 20px;
color: #1B2324;
        }
      }
`;
export const HealthCoachCardText2 = styled.div`
    font-weight: 500;
    font-size: 17px;
    line-height: 26px;
    display: flex;
    align-items: center;
    text-align: center;
    color: ${blueColor};
    cursor: pointer;
    &:hover{
        text-decoration: underline;
    }
`;
export const HomeTaskCards = styled.div`
    min-width: 193px;
    min-height: 150px;
    padding: 24px 32px;
    box-sizing: border-box;
    background: ${whiteColor};
    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
    border-radius: 16px;
    border-top: 10px solid ;
    ${({color}: StylingProps) => {
    return `border-color: ${color ? color :' transparent'} };`;
  }} ;
      &.w-30{
        width: calc(33.3% - 8px);
        min-width: unset !important;
      }
    .homeTaskCardContainer{
        span{
            font-style: normal;
            font-weight: 500;            
            line-height: 1.5;
            &.f-40{
                font-size: 40px;
            }
            &.f-30{
                font-size: 30px;
            }
        }
    }
    .time-stamp{
        font-weight: 500;
        font-size: 17px;
        line-height: 1.5;
        color: #000000;
    }
    .mt-16{
        margin-top: 16px;
    }
    &.w-342{
        min-width: 342px;
    }
`;
export const HomeTestCardTitle = styled.div`
    font-weight: 400;
    font-size: 18px;
    line-height: 1.4;
    color: #000000;
    &.fs-24{
        font-weight: 500;
    font-size: 24px;
    }
`;
export const HomeCardResultTitle = styled.div`
    font-style: normal;
    font-weight: 500;
    line-height: 1.4;
    color: #111A1C;
    &.f-18{
    font-size: 18px;
    }
    &.f-14{
        font-size: 14px;
        }

`;
export const GWDivider = styled.div`
    width: 100%;
    height: 1px;
    background: #E8EAF1;
`;

export const DetailPara = styled.label`
    &.f-18{
        font-weight: 500;
        font-size: 18px;
        line-height: 32px;
        color: #000;
    }    
    &.f-17{
        font-weight: 400;
        font-size: 15px;
        line-height: 17px;
        color: #6F7381;
    }
    &.f-15{
        font-weight: 500;
        font-size: 15px;
        line-height: 17px;
        margin-top: 0.5rem;
        color: #1E3653;
    }
`;
export const CurrentPill = styled.div`
padding: 8px 16px;
border: 1px solid #E2D2C0;
border-radius: 32px;
width: 140px;
color: #1E3653;
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 24px;
text-align: center;
`;
export const NextPill = styled.div`
   border: 1px solid #F9D4A9;
   border-radius: 32px;
    background: #FADDBC; 
    width: 120px;
    padding: 8px 16px;
    color: #1E3653;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
`;
export const InflamationHeading = styled.h2`
    color:  ${appFontColor};
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 42px;
    margin-bottom: 16px;
`;
export const PlanPageHeader = styled.h1`
    color:  ${appFontColor};
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    line-height: 52px;
`;
export const TimingStatus = styled.div`
    color:  ${appFontColor};
    font-style: italic;
    font-weight: 500;
    font-size: 17px;
    line-height: 27px;
`;
export const InflamtionContent = styled.p`
    color:  ${appFontColor};
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 27px;
    margin-top: 16px;
`;
export const KitInstructions = styled.div`
    color: #355F92;
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 23px;
    text-decoration-line: underline;
    cursor: pointer;
`;
export const PopupDue = styled.div`
    color: #6F7381;
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 27px;
`;
export const ImgContainer = styled.div`
   
    img{
    width: 48px;
    height: 48px;
    box-shadow: 0px 2px 4px #ccc;
    background: linear-gradient
    (0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(.jpg);
    border-radius: 100px;
    }
`;
export const ViewProfile = styled.div`
    color: #355F92;
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 23px;
`;
export const HCDetails = styled.div`
    background: #FAFAFC;
    border-radius: 20px;
    padding: 8px 16px;

`;

export const Plancard = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #EEF0F4;
    box-shadow: 0px 3px 22px rgba(32, 29, 65, 0.05);
    border-radius: 30px;
    /* background: #FFFFFF; */
    padding: 0px; 
    ${({bgColor}: StylingProps) => {
    return `background: ${bgColor ? bgColor :'transparent'} }`;
  }} ;

    .price{
        color: ${appFontColor};
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 30px;
    }
    .planheader{
        color: ${appFontColor};
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 31px;
    }
    .planContent{
        color: ${appFontColor};
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 27px;
        margin: 0 0 24px;
    }
    img{
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
    }
`;
export const PlanTime = styled.div`
    color: ${appFontColor};
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 27px;
`;
export const MobTodoHeader = styled.h3`
    color: #090909;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 31px;
    margin: 0 0 16px;
    @media screen and (min-width: 575px) {
        display: none;
    }
`;


export const RootHomeHeader = styled.h1`
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    line-height: 52px;
    color: #090909;
    margin: 0 0 16px;
`;

export const HomeBannerContainer = styled.div`
    /* padding: 0 80px; */
    display: flex;
    align-items: 'flex-start';
    gap: 60px;
    max-width: 1140px;
    margin: 0 auto;
    padding: 0 1em;
    @media screen and (max-width: 575px) {
        padding: 40px 30px;
        flex-direction: column;
        gap: 24px;
    } 
`;

export const RootHomeLeftContainer = styled.div`
    max-width: 50%;
    flex: 50% 0 0;
    overflow: hidden;
    @media screen and (max-width: 575px) {
        flex: 100% 0 0;
        max-width: 100%;
    }
`;

export const RootHomeRightContainer = styled.div`
    flex: 1;    
`;

export const HomeCard = styled.div`
    width: 100%;
    background-color: #fff;
    border-radius: 16px;
    overflow: hidden;
    .image-container{
        height: 250px;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .content-container{
        padding: 24px 16px;
        text-align: center;
        .title{
            font-size: 24px;
            font-weight: 400;
            line-height: 32px;
            margin: 0 0 16px;
        }
        .content{
            font-size: 17px;
            font-weight: 400;
            line-height: 27px;
            margin: 0;
        }
        button{
            margin-top: 12px;
        }
    }
`;


export const ToDoCardsWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const HealthCoachCardsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
    @media screen and (max-width: 575px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;
export const HealthCoachAttendedCardsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
    @media screen and (max-width: 575px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;
