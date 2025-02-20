import styled from 'styled-components';

export const ChatDiv = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;  
  &.h-0{
    height: 0;
  }
`;

export const ChatLabel = styled.label`
  text-align: center;
  &.f-28{
    font-weight: 700;
    font-size: 28px;
    line-height: 27px;
    color: #000000;
    margin-top: 1.5rem;
  }
  &.f-24{
    font-weight: 500;
    font-size: 24px;
    line-height: 36px;
    color: #6D6D6D;
    margin-top: 0.8rem;
  }
  &.f-17{
    font-weight: 400;
font-size: 17px;
line-height: 24px;
color: #6F7381;
color: #6F7381;
  }
`;
export const SingleChatContent = styled.div`
    height: 100%;
    /* overflow: auto; */
    /* padding: 16px; */
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const ChatMessageWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 12px;
    &.sent{
        flex-direction: row-reverse;
    }
`;
export const UserAvatarBlock = styled.div`
    height: 24px;
    width: 24px;
    background-color: #ccc;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    .AvatarProfile{
        display: flex;
        align-items: center;
        height: 100%;
    width: 100%;
    object-fit: cover;
    }
    .alphaProfile{
        display: flex;
        align-items: center;
        line-height: 1.5;
        text-transform: capitalize;
    }
`;
export const ChatUserImage = styled.div`
    width: 60px;
    height: 60px;
    background-color: #dcdcdc;
    border: 1px solid #dcdcdc;
    border-radius: 50%;
    overflow: hidden;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const ChatMessageBox = styled.div`
    max-width: 60%;
    background-color: #F1F1F1;
    min-width: 25%;
    /* padding: 16px; */
    border-radius: 15px;
    word-break: break-all;
    p{
        margin: 0;
    }
    &.sent{
        background-color: #355F92;
        color: #ffffff;
    }
`;

export const ChatDetails = styled.div`
padding: 16px 16px;
position: relative;
    /* display: flex; */
    /* gap: 0px; */
    /* flex-direction: column; */

    /* justify-content: space-between; */
    /* align-items: center; */
    /* margin-bottom: 8px; */
    /* gap: 8px; */
`;

export const ChatUserName = styled.h4`
    font-size: 14px;
    font-weight: 500;
    margin: 0;
    text-transform: capitalize;
`;

export const ChatMessageTime = styled.span`
    font-size: 12px;
        display: flex;
    align-items: end;
    font-weight: 400;
font-size: 10px;
line-height: 15px;
text-align: right;
text-transform: uppercase;
position: absolute;
    right: 10px;
    bottom: 4px;    
/* color: #F9F9F9; */
`;

export const ChatMessage = styled.p`
   font-weight: 400;
font-size: 14px;
line-height: 21px;
padding-bottom: 2px;
/* color: #FFFFFF; */
`;

export const GWChatCaution = styled.div`
    text-align: center;
    background: #355F92;
    font-size: 12px;
    opacity: 1;
    color: #fff;
    font-weight: 500;
    border-radius: 12px;
    margin: 0 auto;
    padding: 0 18px;
`;
export const SingleChatContentContainer = styled.div`
 flex: 1;
 overflow: hidden;
 overflow: auto;
 padding: 16px;
`;
export const SingleChatFooter = styled.div`
background: white;
padding: 8px;
padding-top: 16px;
min-height: 48px;
form{
    display: flex;
    gap: 8px;
    input[type='text']{
           width: 100%;
    padding: 8px 16px;
    border-radius: 8px;
    height: 20px;
    font-size: 16px;
    background: #FAFAFC;
border-radius: 18.5px;
    border: 0.5px solid transparent;
    &:focus{
        border-color: #355F92;
    }
    &:focus-visible{
        border-color: #355F92;
        outline: none;
    }


    }
    button{
        border: 0;
        background: transparent;
        align-items: center;
    }
}`;

export const SingleChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    /* height: 100%; */
    height: calc(100% - 86px);
    
    `;
export const SingleChatHeader = styled.div`
background: white;
padding: 0px;
border-bottom: 1px solid #ccc;
`;

export const ChatHeadName = styled.div`
font-weight: 400;
font-size: 18px;
line-height: 22px;
color: #0F1828;
&.bold{
    font-weight: bold;
    font-size: 20px;
}
`;
export const ChatHeadTimeStamp= styled.div`
font-weight: 400;
font-size: 14px;
line-height: 22px;
color: #6F7381;
`;

export const CurrentDate= styled.div`
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    text-align: center;
    color: #A9A9A9;  
`;
