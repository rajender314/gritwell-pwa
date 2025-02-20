/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import apiEndpoint from '../../core/apiend_point';
import {getLocalStorage} from '../../core/localStorageService';
import {useForm} from 'react-hook-form';
import {PayloadProps, ApiResponseProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import {SingleChatContent, ChatMessageWrapper, ChatMessageBox, ChatDetails, ChatMessageTime, ChatMessage, GWChatCaution, SingleChatContainer, SingleChatFooter, SingleChatHeader, SingleChatContentContainer, ChatDiv, ChatLabel, UserAvatarBlock, CurrentDate} from './chat-component';
// import Communication from '@app/assets/images/Communication.png';
import moment from 'moment';
import {isMobile} from 'react-device-detect';
import {msgPattern} from '@app/core/pattern';
// import {exit} from 'process';

/**
 *
 * @param {*} props
 * @return {SingleChatWindow}
 */
export default function SingleChatWindow(props: any) {
  // console.log(props.data);
  // console.log(props.data.length === 0, 'clickedData');
  const [chatMsgs, updateChatMsgs] = useState([]);
  const [propData, updatePropData] = useState(props);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const {
    handleSubmit,
    register,
    resetField,
    // formState: {errors},
  } = useForm();
  useEffect(()=>{
    getChatDesc(propData.data?.id);
    // markAsRead(propData.data?.id);
    const interval = setInterval(() => {
      getChatDesc(propData.data?.id);
    }, 3000);
    return () => clearInterval(interval);
  }, [propData]);
  useEffect(()=>{
    const interval2 = setInterval(() => {
      getChatInfoData(propData.data?.id);
    }, 6000);
    return () => clearInterval(interval2);
  }, [propData]);
  /**
   *
   * @param {*} chatid
   */
  function getChatDesc(chatid :any) {
    if (!chatid) {
      return;
    }

    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.fetchChatMsgs+chatid,
      headers: {Authorization: getLocalStorage('token')},
    };
    triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            const chatData =[...chatMsgs];
            if (chatData.length != response.data.length) {
              setTimeout(() => {
                const myDiv = document.getElementById('scroll');
                if (myDiv) {
                  myDiv.scrollTo(0, myDiv.scrollHeight);
                }
              }, 200);
            }
            updateChatMsgs(response.data);
          }
        });
  }
  const getChatInfoData= async (chatid)=>{
    if (chatid) {
      const apiObject: PayloadProps = {
        payload: {'chat_id': chatid,
        },
        method: 'GET',
        apiUrl: apiEndpoint.userChatInfo+chatid,
        headers: {Authorization: getLocalStorage('token')},
      };
      await triggerApi(apiObject)
          .then((response: ApiResponseProps) => {
            if (response.status_code == 200) {
              updatePropData({data: response.data});
            }
          });
    }
  };
  /**
   *
   * @param {*} data
   */
  function submitMsg(data:any) {
    const userData = getLocalStorage('userData') ? JSON.parse(getLocalStorage('userData')): {};
    let payData= {

    };
    if (!msg.match(msgPattern)) {
      setError('You cannot send an empty message.');
      return;
    } else {
      let apiUrl = apiEndpoint.addMsgAsUser;
      console.log(apiUrl, data?.id);
      if (propData?.data?.id) {
        payData ={
          'message': data.message,
          'chat_id': propData.data?.id,
          'hash': propData.data?.hash,
        };
        apiUrl = apiEndpoint.addMsgAsUser;
      } else {
        console.log(apiUrl, data?.id);
        // eslint-disable-next-line no-unused-vars
        payData ={'message': data.message,
          'visitor_uname': `${userData.first_name} ${userData.last_name}`,
          'operator_id': userData?.assignment_details?.ClientAssignments?.['Care Manager']['livehelper_user_id'],
          'visitor_email': userData.email,
          'app_visitor_id': userData._id,
          'app_operator_id': userData?.assignment_details?.ClientAssignments?.['Care Manager']['user_id'],
        };
        // eslint-disable-next-line no-unused-vars
        apiUrl = apiEndpoint.createChat;
      }
      const apiObject: PayloadProps = {
        payload:
         payData,
        //  {'message': data.message,
        //    'visitor_uname': userData.first_name,
        //    'operator_id': 35,
        //    'visitor_email': userData.email,
        //  },
        method: 'POST',
        apiUrl: apiUrl,
        headers: {Authorization: getLocalStorage('token')},
      };
      triggerApi(apiObject)
          .then((response: ApiResponseProps) => {
            if (response.status_code === 200) {
              setMsg('');
              resetField('message');
              getChatDesc(propData.data?.id);
              markAsRead(propData.data?.id);

              if (!propData?.data?.id) {
                const cData = response.data.result;
                const cdData ={
                  id: cData.id,
                  hash: cData.hash,
                };
                // props.data = cData;
                updatePropData({data: cdData});
                localStorage.setItem('chatData', JSON.stringify(cdData));
              }
            }
          });
    }
  }

  function convertMsToTime(milliseconds) {
    const date = new Date(milliseconds * 1000);
    const time = moment(date).format('h:mm a');

    return time;
  }
  let ist = false;
  let idx = -1;
  // const [currIdx, updateCurrIdx] =useState(-1);
  const checkLastMSG=((chatMsgs, props) =>{
    if (props.data.has_unread_op_messages) {
      for (let i = chatMsgs.length -1; i > -1; i--) {
        if (chatMsgs[i].user_id != '0' && ist) {
          // do nothing
          ist = false;
          // updateCurrIdx(idx);
          return idx;
        } else if (chatMsgs[i].user_id == '0') {
          idx = i + 1;
          // updateCurrIdx(idx);
          ist = true; break;
        }
      }
    } else {
      return -1;
    }
  });
  const markAsRead =((chatid) =>{
    if (!chatid) {
      return;
    }
    const apiObject: PayloadProps = {
      payload: {
        'chat_id': chatid,
        'update_field': 'has_unread_op_messages',
      },
      method: 'POST',
      apiUrl: apiEndpoint.urmStatusUpdate,
      headers: {Authorization: getLocalStorage('token')},
    };
    triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {

          }
        });
  });
  function convertMsToDate(milliseconds: number) {
    const date = new Date(milliseconds * 1000);
    return moment(date);
  }
  function checkDiff(idx: number) {
    const a = convertMsToDate(chatMsgs[idx]?.time);
    const b = convertMsToDate(chatMsgs[idx-1]?.time);
    const diff =moment(a).diff(b, 'days');
    console.log(a, b, diff);

    return diff;
  }
  return (
    <SingleChatContainer>
      <SingleChatHeader>

      </SingleChatHeader>
      { propData?.data?.id ?
       <SingleChatContentContainer id="scroll">
         <SingleChatContent>
           {(chatMsgs &&
            chatMsgs.length )?
            chatMsgs.map((detail: any, index : any) => {
              return (
                <>
                  {checkLastMSG(chatMsgs, propData) > 0 ? checkLastMSG(chatMsgs, propData) : null}
                  {checkLastMSG(chatMsgs, propData) == index ? <span className='new-msgs'>
                    { 'You have new messages'}
                  </span> : null}
                  {checkDiff(index)> 0 ? <CurrentDate className='currentDate'>{moment(convertMsToDate(detail?.time)).format('MMMM Do, YYYY')}</CurrentDate>: null}

                  {detail.user_id !== '-1' ? <ChatMessageWrapper
                    className={detail.user_id == '0' ? 'sent' : ''} key={index}>
                    <UserAvatarBlock >
                      {detail.user_id == '0' ?<>
                        { props?.userDtl?.['display_url'] ?<img
                          src={props?.userDtl?.['display_url']}
                          alt="User"
                          className="AvatarProfile"
                        /> : <span className="alphaProfile">
                          {props?.userDtl?.first_name ?
                          props?.userDtl?.first_name.slice(0, 1) : ''}
                        </span>} </>: detail.user_id !== '0' ?
                        <>
                          { props?.userDtl?.['assignment_details']?.['ClientAssignments']?.['Care Manager']?.['display_url'] ?<img
                            src={props?.userDtl?.['assignment_details']?.['ClientAssignments']?.['Care Manager']?.['display_url']}
                            alt="User"
                            className="AvatarProfile"
                          /> : <span className="alphaProfile">
                            {detail.name_support ?
                          detail.name_support.slice(0, 1) : propData['data'].nick.slice(0, 1)}
                          </span>} </>:null
                      }
                      {/* <span className="alphaProfile">
                        {detail.name_support ?
                          detail.name_support.slice(0, 1) : propData['data'].nick.slice(0, 1)}
                      </span> */}
                    </UserAvatarBlock>
                    <ChatMessageBox className={detail.user_id == '0' ? 'sent' : ''}>
                      <ChatDetails>
                        {/* <ChatUserName>{detail.name_support ?
                          detail.name_support : propData['data'].nick}</ChatUserName> */}
                        <ChatMessage>{detail?.msg}</ChatMessage>
                        <ChatMessageTime>{convertMsToTime(detail?.time)}</ChatMessageTime>
                      </ChatDetails>
                    </ChatMessageBox>
                  </ChatMessageWrapper> :
            <GWChatCaution key={index}>{detail?.msg}</GWChatCaution>}

                </>
              );
            }) :null
           }
         </SingleChatContent>
       </SingleChatContentContainer> : null}
      { !propData['data']['id'] &&
      <SingleChatContentContainer>
        <SingleChatContent id="scroll">
          <ChatDiv className='h-0'>
            {/* <img src={Communication} alt="chat icon" /> */}
            <ChatLabel className='f-17'>
            This is the very beginning of your conversation
            </ChatLabel>
            {/* <ChatLabel className='f-24'>
               Type your message below.
            </ChatLabel> */}
          </ChatDiv>
        </SingleChatContent>
      </SingleChatContentContainer>}
      <SingleChatFooter>
        {/* <form onSubmit={submitMsg}> */}
        <form
          onSubmit={handleSubmit(submitMsg)}
          className={isMobile? 'pb-30': ''}
        >
          {/* <button><svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.375 9.1875H11.8125V2.625C11.8125 1.9005 11.2245 1.3125 10.5 1.3125C9.7755 1.3125 9.1875 1.9005 9.1875 2.625V9.1875H2.625C1.9005 9.1875 1.3125 9.7755 1.3125 10.5C1.3125 11.2245 1.9005 11.8125 2.625 11.8125H9.1875V18.375C9.1875 19.0995 9.7755 19.6875 10.5 19.6875C11.2245 19.6875 11.8125 19.0995 11.8125 18.375V11.8125H18.375C19.0995 11.8125 19.6875 11.2245 19.6875 10.5C19.6875 9.7755 19.0995 9.1875 18.375 9.1875Z" fill="#1E3653"/>
          </svg>
          </button> */}
          <input type="text"
            autoComplete="off"
            placeholder="Send a message..."
            {...register('message', {
              required: false,
              onChange: (e) => {
                setMsg(e.target.value);
                setError('');
              },
            })}/>
          <button className={msg.length > 0 ? 'pointer' : 'restricted'}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_102_63)">
                <path
                  d="M23.4907 11.1058L5.59068 2.10579C4.69068 1.70579 3.69068 2.50579 4.09068 3.40579L6.59068 10.1058L17.9907 12.0058L6.59068 13.9058L4.09068 20.6058C3.79068 21.5058 4.69068 22.3058 5.59068 21.8058L23.4907 12.8058C24.1907 12.5058 24.1907 11.5058 23.4907 11.1058Z"
                  fill={msg.length > 0 ? '#1E3653' : '#B8BCCA'}
                />
              </g>
              <defs>
                <clipPath id="clip0_102_63">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </form>
      </SingleChatFooter>
      {error ? <p className='error'>{error}</p> : null}
    </SingleChatContainer>
  );
}
