import {isMobile} from 'react-device-detect';
import styled from 'styled-components';

export const BackContainer = styled.div`
  width: ${isMobile ? '90%' : '70%'};
  margin: 0 auto;
`;

export const MessageMainContainer = styled.div`
  width: ${isMobile ? '90%' : '60%'};
  margin: 20px auto;
`;

export const MsgHeadContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const MsgTitle = styled.label`
  font-weight: 500;
  font-size: 20px;
  line-height: 20px;
  color: #1B2324;
`;

export const MsgContainer = styled.div`
  background-color: #ffffff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0px 0px 4px rgba(37, 42, 49, 0.32);
`;

export const MsgHeading = styled.div`
  display: flex;
`;

export const MsgLabel = styled.label`
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
  color: #1b2324;
  margin-left: 8px;
`;

export const MsgParaDiv = styled.div`
  border: 1px solid #ebebeb;
  border-radius: 8px;
  padding: 0 24px;
  margin: 10px 0;
`;

export const MsgPara = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #1B2324;
  white-space: pre-line;
  &.word-wrap{
    word-break: break-all;
  }
  &.line-clamp{
    display: -webkit-box;
    -webkit-line-clamp: 4;
    overflow: hidden;
    -webkit-box-orient: vertical;
  }
`;

export const MsgDate = styled.label`
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  text-align: right;
  color: #6b6c7e;
`;
