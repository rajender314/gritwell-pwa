/* eslint-disable max-len */
import Header from '@app/components/header';
import {Description, ImageWrapper} from
  '@app/components/layout-onBoarding/layout-onBoarding-components';
import {
  MainContainer,
  DesktopWidth,
  ProDefImage,
  Loader,
} from '@app/styles/common-styles';
import {isMobile} from 'react-device-detect';
import {useNavigate} from 'react-router-dom';
import {
  ContentContainer,
  IconsContainer,

} from '../assesment-questions/assesment-questions-components';
import {ScrollSection} from
  '../boarding-screens/component/boarding-screen-components';
import {MenuHeader} from '../profile/profile-components';
import {BadgeContainer,
  BadgeLabel, BadgePill, BadgeRow} from './home-components';
import React, {useEffect, useState} from 'react';
import {getLocalStorage, setLocalStorage} from '@app/core/localStorageService';
import apiEndpoint from '@app/core/apiend_point';
import {PayloadProps, ApiResponseProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import Spinner from '@app/components/icon/icons/loader';
import ViewDialog from '@app/components/alert-dialog/view-dialog';
import BotoomHeader from '@app/components/footer-menu';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';

/**
 * Renders Component.
 * @return {IntakeHome} renders Component.
 */
export default function CareTeam() {
  const navigate = useNavigate();
  const [userDetails, updateUserDetails] = useState({});
  const [loader, setLoader] = useState(true);
  const [viewDialog, updateView]= useState(false);
  const [dialogKey, updateDKey] = useState('');

  const restrictUser = sessionStorage.getItem('resctrict_user_actions');

  useEffect(()=>{
    setLoader(true);
    const userData= JSON.parse(getLocalStorage('userData'));
    // updateUserDetails(userData);
    if (userData) {
      updateUserDetails(userData);
      setLoader(false);
    } else {
      getProfileData();
    }
    Mixpanel.track(service['careTeam']['title'], service['careTeam']['props']);
    gtag('event', gaService['careTeam']['title'], {
      'event_category': gaService['careTeam']['category'],
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

    <MainContainer bgColor={'#FADDBC'}>
      {!isMobile? <Header
        bgCol='#fff'
        className="txt-left bg-white"
        hideBackArrow={false}
        desktopMenu={isMobile ? false : true}
      />: null}
      {loader ? <Loader>
        <Spinner size="6px" />
      </Loader> : null}
      {!loader ? <ScrollSection
        id="scrollable-div"
        className={isMobile?'flex-1 mb-64':'flex-1'}
      >
        {viewDialog && <ViewDialog width={isMobile? 'unset' : '440px'} header={dialogKey} onCancel={()=> {
          updateView(false);
          Mixpanel.track(action['careTeam']['close']['title'], action['careTeam']['close']['props']);
          gtag('event', gaAction['careTeam']['close']['title'], {
            'event_category': gaAction['careTeam']['close']['category'],
          });
        }}/>}

        <DesktopWidth>
          <ContentContainer bgColor={isMobile?'transparent' :
           '#ffffff'} className={isMobile ? 'p-0 ' : 'br-bg mt-40'}>
            <ContentContainer bgColor={isMobile?'transparent' :
             '#ffffff'} className="health-page">
              <MenuHeader className="pb-20">My Care Team</MenuHeader>
              {userDetails['assignment_details']['hc_assigned'] ||
              userDetails['assignment_details']['md_assigned'] ||
              userDetails['assignment_details']['md_assigned'] ?
              <div className="CareTeamCardsWrap d-flex flex-column gap-15">
                {userDetails['assignment_details']['hc_assigned'] ?
                <BadgeContainer className=" bg-gray align-self careTeamCard w-100">
                  <div className= {isMobile?
                     'd-flex col-rev gap-10 align-items-start': 'd-flex 8'}>
                    <div className='flex-1'>
                      <IconsContainer
                        className='d-flex' >
                        {userDetails['assignment_details']['ClientAssignments']['Health Coach']['display_url'] ?
                                <ImageWrapper className="my-10 w-54 br-50">
                                  <img
                                    src={
                                userDetails['assignment_details'][
                                    'ClientAssignments'
                                ]['Health Coach']['display_url'] ?
                                  userDetails[
                                      'assignment_details'
                                  ]['ClientAssignments'][
                                      'Health Coach'
                                  ]['display_url'] :
                                  ''
                                    }
                                    alt="User"
                                  />
                                </ImageWrapper>:
                        <ProDefImage className={isMobile?'w-50' :
                         'w-40 m-0'}>
                          {userDetails['assignment_details']['ClientAssignments']['Health Coach']['name'].charAt(0)}
                          {userDetails['assignment_details']['ClientAssignments']['Health Coach']['name'].charAt(1)}</ProDefImage>}

                        <BadgeLabel className=
                          "pending transparent text-center no-pointer m-0">
                          {userDetails['assignment_details']['ClientAssignments']['Health Coach']['name']}
                        </BadgeLabel>
                        {/* </> */}
                      </IconsContainer>
                    </div>
                    <BadgeRow>
                      <BadgePill className='bg-bei no-pointer'>
                          Health Coach
                      </BadgePill>
                    </BadgeRow>
                  </div>
                  <Description className='my-32 line-clamp-2'>
                    {userDetails['assignment_details']['ClientAssignments']['Health Coach']['background']}
                  </Description>
                  <div className='d-flex mt-10'>
                    <BadgeLabel className='flex-1 get-details'
                      onClick={()=>{
                        updateView(true);
                        updateDKey('Health Coach');
                        Mixpanel.track(action['careTeam']['seeFullProfile']['title'], action['careTeam']['seeFullProfile']['props']);
                        gtag('event', gaAction['careTeam']['seeFullProfile']['title'], {
                          'event_category': gaAction['careTeam']['seeFullProfile']['category'],
                        });
                      }}>See full profile</BadgeLabel>
                    {userDetails['assignment_details']['ClientAssignments']['Health Coach']['book_a_call'] ? <BadgeLabel
                      onClick={()=> {
                        navigate('/book-appointment/');
                        Mixpanel.track(action['careTeam']['bookACall']['title'], action['careTeam']['bookACall']['props']);
                        gtag('event', gaAction['careTeam']['bookACall']['title'], {
                          'event_category': gaAction['careTeam']['bookACall']['category'],
                        });
                      }} className={restrictUser === 'false' ? 'restricted' : 'get-details'}>Book a call</BadgeLabel>:null}
                  </div>
                </BadgeContainer> : null}

                {userDetails['assignment_details']['md_assigned'] ?
                 <BadgeContainer className=" bg-gray align-self careTeamCard  w-100">
                   <div className= {isMobile?
                    'd-flex col-rev gap-10 align-items-start': 'd-flex gap-8'}>
                     <div className='flex-1'>
                       <IconsContainer
                         className='d-flex' >
                         {userDetails['assignment_details']['ClientAssignments']['MD']['display_url'] ?
                          <ImageWrapper className="my-10 w-54 br-50">
                            <img
                              src={
                                userDetails['assignment_details'][
                                    'ClientAssignments'
                                ]['MD']['display_url'] ?
                                  userDetails[
                                      'assignment_details'
                                  ]['ClientAssignments'][
                                      'MD'
                                  ]['display_url'] :
                                  ''
                              }
                              alt="User"
                            />
                          </ImageWrapper>:
                         <ProDefImage className={isMobile?'w-50' :
                        'w-40 m-0'}>
                           {userDetails['assignment_details']['ClientAssignments']['MD']['name'].charAt(0)}
                           {userDetails['assignment_details']['ClientAssignments']['MD']['name'].charAt(1)}</ProDefImage>}
                         <BadgeLabel className=
                           "pending transparent text-center no-pointer m-0">
                           {userDetails['assignment_details']['ClientAssignments']['MD']['name']}
                         </BadgeLabel>
                         {/* </> */}
                       </IconsContainer>
                     </div>
                     <BadgeRow>
                       <BadgePill className='bg-bei no-pointer'>
                         MD
                       </BadgePill>
                     </BadgeRow>
                   </div>
                   <Description className='my-32 line-clamp-2'>
                     {userDetails['assignment_details']['ClientAssignments']['MD']['background']}
                   </Description>
                   <div className='d-flex mt-10'>
                     <BadgeLabel className='flex-1 get-details'
                       onClick={()=>{
                         updateView(true);
                         updateDKey('MD');
                         Mixpanel.track(action['careTeam']['seeFullProfile']['title'], action['careTeam']['seeFullProfile']['props']);
                         gtag('event', gaAction['careTeam']['seeFullProfile']['title'], {
                           'event_category': gaAction['careTeam']['seeFullProfile']['category'],
                         });
                       }}>See full profile</BadgeLabel>
                     {userDetails['assignment_details']['ClientAssignments']['MD']['book_a_call'] ? <BadgeLabel
                       className={restrictUser === 'false' ? 'restricted' : 'get-details'} onClick={()=> {
                         navigate('/book-appointment/MD');
                         Mixpanel.track(action['careTeam']['bookACall']['title'], action['careTeam']['bookACall']['props']);
                         gtag('event', gaAction['careTeam']['bookACall']['title'], {
                           'event_category': gaAction['careTeam']['bookACall']['category'],
                         });
                       }}>Book a call</BadgeLabel>: null}
                   </div>
                 </BadgeContainer>:null}

                {userDetails['assignment_details']['cm_assigned'] ?
                 <BadgeContainer className=" bg-gray align-self careTeamCard w-100">
                   <div className= {isMobile?
                    'd-flex col-rev gap-10 align-items-start': 'd-flex gap-4'}>
                     <div className='flex-1'>
                       <IconsContainer
                         className='d-flex' >
                         {userDetails['assignment_details']['ClientAssignments']['Care Manager']['display_url'] ?
                          <ImageWrapper className="my-10 w-54 br-50">
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
                          </ImageWrapper>:
                         <ProDefImage className={isMobile?'w-50' :
                        'w-40 m-0'}>
                           {userDetails['assignment_details']['ClientAssignments']['Care Manager']['name'].charAt(0)}
                           {userDetails['assignment_details']['ClientAssignments']['Care Manager']['name'].charAt(1)}</ProDefImage>}
                         <BadgeLabel className=
                           "pending transparent text-center no-pointer m-0">
                           {userDetails['assignment_details']['ClientAssignments']['Care Manager']['name']}
                         </BadgeLabel>
                       </IconsContainer>
                     </div>
                     <BadgeRow>
                       <BadgePill className='bg-bei no-pointer'>
                         Care Manager
                       </BadgePill>
                     </BadgeRow>
                   </div>
                   <Description className='my-32 line-clamp-2'>
                     {userDetails['assignment_details']['ClientAssignments']['Care Manager']['background']}
                   </Description>
                   <div className='d-flex mt-10'>
                     <BadgeLabel className='flex-1 get-details'
                       onClick={()=>{
                         updateView(true);
                         updateDKey('Care Manager');
                         Mixpanel.track(action['careTeam']['seeFullProfile']['title'], action['careTeam']['seeFullProfile']['props']);
                         gtag('event', gaAction['careTeam']['seeFullProfile']['title'], {
                           'event_category': gaAction['careTeam']['seeFullProfile']['category'],
                         });
                       }}>See full profile</BadgeLabel>
                     {userDetails['assignment_details']['ClientAssignments']['Care Manager']['book_a_call'] ?<BadgeLabel
                       className={restrictUser === 'false' ? 'restricted' : 'get-details'} onClick={()=> {
                         navigate('/book-appointment/'+'CM');
                         Mixpanel.track(action['careTeam']['bookACall']['title'], action['careTeam']['bookACall']['props']);
                         gtag('event', gaAction['careTeam']['bookACall']['title'], {
                           'event_category': gaAction['careTeam']['bookACall']['category'],
                         });
                       }}>Book a call</BadgeLabel> : null}
                   </div>
                 </BadgeContainer>:null}
              </div>:
              <ContentContainer className='h-250 text-center'>
                <BadgeLabel className='f-24'>
                  We will assign care team soon...
                </BadgeLabel>
              </ContentContainer>}
            </ContentContainer>
          </ContentContainer>
        </DesktopWidth>
      </ScrollSection> : null}
      {isMobile && !loader ? <BotoomHeader /> : null}
    </MainContainer>
  );
}
