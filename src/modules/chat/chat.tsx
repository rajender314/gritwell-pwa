/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import cmImg from '@app/assets/images/userIcon.png';
import Header from '@app/components/header';
import Icon from '@app/components/icon';
import Spinner from '@app/components/icon/icons/loader';
import {getLocalStorage, setLocalStorage} from '@app/core/localStorageService';
import {whiteColor} from '@app/styles';
import {ChatHeaderName, DesktopWidth, Loader, MainContainer, ProDefImage} from '@app/styles/common-styles';
import React, {useEffect, useState} from 'react';
import {isMobile} from 'react-device-detect';
import {useLocation, useNavigate} from 'react-router-dom';
import {ContentContainer, IconsContainer} from '../assesment-questions/assesment-questions-components';
import {ScrollSection} from
  '../boarding-screens/component/boarding-screen-components';
import {MenuHeader} from '../profile/profile-components';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';
import apiEndpoint from '@app/core/apiend_point';
import {PayloadProps, ApiResponseProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import SingleChatWindow from './single-chat';
import {Mixpanel} from '@app/App';
import {ChatHeadName, ChatHeadTimeStamp} from './chat-component';
/**
 * Renders Component.
 * @return {HealthJourney} renders Component.
 */
export default function ChatWin() {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [userDetails, updateUserDetails] = React.useState({});
  const [chatInfo, updateChatInfo] = useState({});
  const searchParams = new URLSearchParams(location.search);
  // const userChatData = {
  //   'id': 210,
  //   'nick': 'Rootcause',
  //   'status': 0,
  //   'status_sub': 0,
  //   'status_sub_sub': 0,
  //   'time': 1676883788,
  //   'user_id': 35,
  //   'sender_user_id': 0,
  //   'hash': 'MXZaS0wb4q180g5v3DejmKVJjjz8DfcrSYib1weB',
  //   'ip': '192.168.1.30',
  //   'referrer': '',
  //   'dep_id': 1,
  //   'email': 'g.lavanya+R3@enterpi.com',
  //   'user_status': 0,
  //   'support_informed': 0,
  //   'country_code': '',
  //   'country_name': '',
  //   'phone': '',
  //   'user_typing': 0,
  //   'user_typing_txt': '',
  //   'operator_typing': 0,
  //   'has_unread_messages': 0,
  //   'last_user_msg_time': 0,
  //   'last_msg_id': 1180,
  //   'mail_send': 0,
  //   'lat': '0',
  //   'lon': '0',
  //   'city': '',
  //   'additional_data': '',
  //   'session_referrer': '',
  //   'wait_time': 0,
  //   'chat_duration': 0,
  //   'priority': 0,
  //   'online_user_id': 0,
  //   'lsync': 1676883788,
  //   'transfer_if_na': 0,
  //   'transfer_timeout_ts': 0,
  //   'transfer_timeout_ac': 0,
  //   'transfer_uid': 0,
  //   'pnd_time': 1676883788,
  //   'cls_time': 0,
  //   'auto_responder_id': 0,
  //   'user_tz_identifier': '',
  //   'na_cb_executed': 0,
  //   'nc_cb_executed': 0,
  //   'fbst': 0,
  //   'operator_typing_id': 0,
  //   'chat_initiator': 0,
  //   'chat_variables': '',
  //   'remarks': '',
  //   'operation': '',
  //   'operation_admin': '',
  //   'screenshot_id': '0',
  //   'unread_messages_informed': 0,
  //   'reinform_timeout': 0,
  //   'last_op_msg_time': 0,
  //   'has_unread_op_messages': 0,
  //   'unread_op_messages_informed': 0,
  //   'user_closed_ts': 0,
  //   'unanswered_chat': 1,
  //   'product_id': 0,
  //   'usaccept': 0,
  //   'status_sub_arg': '',
  //   'tslasign': 1676883788,
  //   'chat_locale': '',
  //   'chat_locale_to': '',
  //   'uagent': 'axios/0.24.0',
  //   'anonymized': 0,
  //   'invitation_id': 0,
  //   'device_type': 0,
  //   'gbot_id': 0,
  //   'cls_us': 0,
  //   'updateIgnoreColumns': [],
  // };
  useEffect(()=>{
    setLoader(true);
    const configList = getLocalStorage('configList') ? JSON.parse(getLocalStorage('configList')) : {
      ReactAppChatURL: process.env.React_App_CHAT_URL,
    };
    const userData= getLocalStorage('userData') ? JSON.parse(getLocalStorage('userData')) : {};
    // updateUserDetails(userData);has_unread_messages
    // console.log(userData?.assignment_details?.ClientAssignments['Care Manager']?.livehelper_user_id);
    const chatDataDup = {
      id: userData?.chat_id,
      hash: userData?.hash_id,
      operatorId: userData?.assignment_details?.ClientAssignments['Care Manager']?.livehelper_user_id,
    };

    const chatDataTest = getLocalStorage('chatData') ? JSON.parse(getLocalStorage('chatData')) :{};
    const chatData = chatDataTest?.operatorId ? chatDataTest?.operatorId : chatDataDup;
    updateChatInfo(chatData);
    if (userData) {
      updateUserDetails(userData);
      if (getLocalStorage('path') === '/chat-end') {
        localStorage.removeItem('path');
        navigate(-1);
      }
      if (!chatData.operatorId) {
        navigate('/chat-end');
      }
      setLoader(false);
    } else {
      getProfileData();
    }
    setTimeout(() => {
      // eslint-disable-next-line prefer-const
      let LHCChatOptionsPage = {'height': 400, 'mobile': true};
      LHCChatOptionsPage['opt'] = {};
      //   const LHCChatOptionsPage = {'height': '100%', 'mobile': false};
      //   LHCChatOptionsPage['opt'] = {};
      const po = document.createElement('script');
      po.type = 'text/javascript'; po.async = true;
      const referrer = (document.referrer) ? encodeURIComponent(document.referrer.substr(document.referrer.indexOf('://')+1)) : '';
      const location = (document.location) ?
        encodeURIComponent(window.location.href.substring(window.location.protocol.length)) : '';
      const operatorId = userData && userData['assignment_details'] && userData['assignment_details']['ClientAssignments'] ? userData['assignment_details']?.['cm_assigned'] ?
      userData['assignment_details']['ClientAssignments']['Care Manager']['livehelper_user_id'] ? userData['assignment_details']['ClientAssignments']['Care Manager']['livehelper_user_id'] : 1 : 1 : 1;
      po.src = configList['ReactAppChatURL']+'/index.php/chat/getstatusembed/(leaveamessage)/true/(operator)/'+operatorId+'?r='+referrer+'&l='+location;
      const s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
    }, 1500);
    setTimeout(() => {
      setLoader(false);
    }, 1800);
    Mixpanel.track(service['chat']['title'], service['chat']['props']);
    gtag('event', gaService['chat']['title'], {
      'event_category': gaService['chat']['category'],
    });
  }, []);
  const getProfileData =async ()=>{
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.getProfileApi,
      headers: {Authorization: getLocalStorage('token')},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code == 200) {
            const Data = response.data;
            const chatDataDup = {
              id: Data?.chat_id,
              hash: Data?.hash_id,
              operatorId: Data?.assignment_details?.ClientAssignments['Care Manager']['livehelper_user_id'],
            };
            const chatData = getLocalStorage('chatData') ? JSON.parse(getLocalStorage('chatData')) : chatDataDup;
            updateChatInfo(chatData);
            if (!chatData.operatorId) {
              navigate('/chat-end');
            }
            const planInfo = {
              'plan_description': {
                'subject': [
                  'Comprehensive root-cause analysis',
                  '6-month customized advanced supplement regime  ',
                  'Individual appointments with your dedicated Functional Medicine (FM) trained health coach every other week',
                  'Daily messaging and support included for one year - check-ins with your personal care team advocate who will guide you through the program',
                ],
                'heading': 'What is included in this plan?',
              },
              'plan_video': {
                'heading': 'More about your plan',
                'video_url': 'https://www.youtube.com/embed/BtDMvA3EI0E',
              },
              '_id': '625d1d970ab8a93ddd00b9be',
              'plan_type': 'Comprehensive plan',
              'plan_slug': 'comprehensive',
              'plan_duration': '6',
              'duration_type': ' Months',
              'currency_type': '$',
              'plan_price': 229,
              'recurring_type': 'billed monthly',
              'status': true,
              'price_id': 'price_1Kt3NBJ906CRVF6JKF4zfzgx',
            };
            // updateUserDetails(Data);
            if ( Data['subscription_plan_info']) {
              setLocalStorage('userData', JSON.stringify(Data));
              updateUserDetails(Data);
              setTimeout(() => {
                setLoader(false);
              }, 3000);
            } else {
              Data['subscription_plan_info'] = planInfo;
              updateUserDetails(Data);
              setLoader(false);
              setLocalStorage('userData', JSON.stringify(Data));
            }
            // getCustStats();
          }
        });
  };

  return (
    <>
      {
        loader ? <Loader>
          <Spinner size="6px" />
        </Loader> : null
      }
      <MainContainer bgColor={whiteColor}>
        <Header
          className="justify-content-between"
          bgCol={isMobile ? '#E9DCCE' : ''}
          hideLogo={searchParams.get('hide') ? true : false}
          desktopMenu={isMobile ? false : searchParams.get('hide') ? false : true}
          chatData={'chatEndBack'}
          hideBackArrow={false}
        />
        {
          // <ScrollSection id="scrollable-div"
          //   className='h-150 w-100'>
          <DesktopWidth style={{flex: '1', maxHeight: '80%'}}>
            <div className={isMobile ? 'px-16 d-flex align-items-center gap-15 mb-16' : 'p-0 d-flex align-items-center gap-15 mb-8'}>
              <IconsContainer onClick={()=>{
                navigate('/home');
                Mixpanel.track(action['chat']['back']['title'], action['chat']['back']['props']);
                gtag('event', gaAction['chat']['back']['title'], {
                  'event_category': gaAction['chat']['back']['category'],
                });
              }} className='pointer'>
                <Icon name={'chervonLeft'} />
              </IconsContainer>
              <ChatHeadName onClick={()=>{
                navigate('/home');
              }}
              className='pointer'>Back to home</ChatHeadName>
            </div>

            <ContentContainer className={isMobile ?'p-0 h-100' : 'br-bg o-hidden h-100' }>
              <ChatHeadName className='bold'>Chat</ChatHeadName>
              <div className='d-flex gap-15 pb-24 pt-24'>
                <div>
                  {userDetails['assignment_details'] && userDetails['assignment_details']['cm_assigned'] ?
                    <MenuHeader className={isMobile? 'd-flex gap-15 ': 'd-flex gap-15 '}>
                      <div className="br-1">
                        {userDetails['assignment_details']['ClientAssignments']['Care Manager']['display_url'] ? (
                    <IconsContainer className="w-48 text-center">
                      <img
                        src={
                          userDetails['assignment_details'][
                              'ClientAssignments'
                          ]['Care Manager']['display_url'] ?
                            userDetails[
                                'assignment_details'
                            ]['ClientAssignments'][
                                'Care Manager'
                            ]['display_url'] :
                            ''
                        }
                        alt="User"
                      />
                    </IconsContainer>
                  ) : (
                    <ProDefImage className="w-48">
                      {userDetails['assignment_details']['ClientAssignments']['Care Manager']['name'].charAt(0)}
                      {userDetails['assignment_details']['ClientAssignments']['Care Manager']['name'].charAt(1)}
                    </ProDefImage>
                  )}
                      </div>
                      <div>
                        <ChatHeadName>{userDetails['assignment_details']['ClientAssignments']['Care Manager']['name']}</ChatHeadName>
                        <ChatHeadTimeStamp>Hours: Mon-Fri, 9am-5pm PST</ChatHeadTimeStamp>
                      </div>
                    </MenuHeader>: null}
                </div>
              </div>
              {/* <ContentContainer className={isMobile? 'p-18' : 'py-24' }> */}
              {/* <div className='d-flex'> */}

              {/* {userDetails['assignment_details'] && userDetails['assignment_details']['cm_assigned'] ?
                    <MenuHeader className='d-flex gap-8'>
                      <div className="br-1">
                        {userDetails['assignment_details']['ClientAssignments']['Care Manager']['display_url'] ? (
                    <IconsContainer className="w-35 text-center">
                      <img
                        src={
                          userDetails['assignment_details'][
                              'ClientAssignments'
                          ]['Care Manager']['display_url'] ?
                            userDetails[
                                'assignment_details'
                            ]['ClientAssignments'][
                                'Care Manager'
                            ]['display_url'] :
                            ''
                        }
                        alt="User"
                      />
                    </IconsContainer>
                  ) : (
                    <ProDefImage className="w-35">
                      {userDetails['assignment_details']['ClientAssignments']['Care Manager']['name'].charAt(0)}
                      {userDetails['assignment_details']['ClientAssignments']['Care Manager']['name'].charAt(1)}
                    </ProDefImage>
                  )}
                      </div>{userDetails['assignment_details']['ClientAssignments']['Care Manager']['name']}
                    </MenuHeader>: null} */}
              {/* </div> */}
              {/*
              </ContentContainer> */}
              {!loader ? <SingleChatWindow data={chatInfo} userDtl= {userDetails}/> : null}
              {/* <div id="lhc_status_container_page"></div> */}
            </ContentContainer>
          </DesktopWidth> }
      </MainContainer>

    </>
  );
}
