/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import {IconsContainer} from '../assesment-questions/assesment-questions-components';
import {MainContainer} from '@app/styles/common-styles';
import {isMobile} from 'react-device-detect';
import {useNavigate} from 'react-router-dom';
import Button from '@app/components/button';
import Header from '@app/components/header';
// import {FooterButtons} from
//   '../boarding-screens/component/boarding-screen-components';
import {action} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction} from '@app/googleAnalytics/googleAnalytics';
import {HeaderMain} from '@app/components/header/header-components';
import Icon from '@app/components/icon';
import {Mixpanel} from '@app/App';
import {NextPill, HomeToDoCards, HomeToDoCardTitle, InflamtionContent, InflamationHeading, CurrentPill, ImgContainer, ViewProfile, HCDetails} from '../home/home-components';
import {LayoutWrapper, LeftContainer, ImageContainer, RightContainer, RightContent, BackBtnContainer, BackIconContainer, TextContent, Actions} from '../sign-up/component/signup.components';
import BookInitialAppointmentBG from '@app/assets/images/initialAppointment-BG.png';
import {getLocalStorage, setLocalStorage} from '@app/core/localStorageService';
import ViewDialog from '@app/components/alert-dialog/view-dialog';
import apiEndpoint from '@app/core/apiend_point';
import {PayloadProps, ApiResponseProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
/**
 * Renders Component.
 * @return {AssesmentQuestions} renders Component.
 */
export default function BookInitialAppointment() {
  const navigate = useNavigate();
  const [userDetails, updateUserDetails] = useState({});
  const [viewDialog, updateView]= useState(false);
  // const [currentPlan, setCurrentPlan] = useState<any>({});
  useEffect(()=>{
    getProfileData();
    getTodos();
    const userData =
    getLocalStorage('userData') ? JSON.parse(getLocalStorage('userData')): {};
    updateUserDetails(userData);

    const userPlan= JSON.parse(getLocalStorage('todoData') && getLocalStorage('todoData'));
    {userPlan.map((todo: any)=>{
      if (todo.code === 'BOOK_APPOINTMENT_WITH_HC') {
        // setCurrentPlan(todo);
        if (todo.mark_as_completed) {
          navigate('/rootcause-home');
        };
      }
    });
    }
  }, []);
  const getProfileData = async () => {
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.getProfileApi,
      headers: {Authorization: getLocalStorage('token')},
    };
    await triggerApi(apiObject).then((response: ApiResponseProps) => {
      if (response.status_code == 200) {
        const Data = response.data;
        const planInfo = {
          plan_description: {
            subject: [
              'Comprehensive root-cause analysis',
              '6-month customized advanced supplement regime  ',
              'Individual appointments with your dedicated Functional Medicine (FM) trained health coach every other week',
              'Daily messaging and support included for one year - check-ins with your personal care team advocate who will guide you through the program',
            ],
            heading: 'What is included in this plan?',
          },
          plan_video: {
            heading: 'More about your plan',
            video_url: 'https://www.youtube.com/embed/BtDMvA3EI0E',
          },
          _id: '625d1d970ab8a93ddd00b9be',
          plan_type: 'Comprehensive plan',
          plan_slug: 'comprehensive',
          plan_duration: '6',
          duration_type: ' Months',
          currency_type: '$',
          plan_price: 229,
          recurring_type: 'billed monthly',
          status: true,
          price_id: 'price_1Kt3NBJ906CRVF6JKF4zfzgx',
        };
        updateUserDetails(Data);
        if (Data['subscription_plan_info']) {
          setLocalStorage('userData', JSON.stringify(Data));
          updateUserDetails(Data);
          // getFirstAppointment();
        } else {
          Data['subscription_plan_info'] = planInfo;
          setLocalStorage('userData', JSON.stringify(Data));
          updateUserDetails(Data);
          // setLoader(false);
        }
      }
    });
  };
  const getTodos = () => {
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.rootCauseTodos,
      headers: {Authorization: getLocalStorage('token') ? getLocalStorage('token') : ''},
    };
    triggerApi(apiObject).then((response: ApiResponseProps) => {
      if (response.status_code === 200) {
        const data = response.data;
        data.map((todo: any)=>{
          if (todo.code === 'BOOK_APPOINTMENT_WITH_HC') {
            if (todo.mark_as_completed) {
              navigate('/rootcause-home');
            };
          }
        });
        setLocalStorage('todoData', JSON.stringify(data));
        const userData =
        getLocalStorage('userData') ? JSON.parse(getLocalStorage('userData')): {};
        console.log(userData);
      }
    });
  };
  return (
    <>
      <MainContainer bgColor={isMobile? '#ffffff':'#FAFAFC'}
        className={isMobile ? 'fxh-100' : ''}>
        {!isMobile? <Header hideBackArrow={false} className='txt-left'
          desktopMenu={isMobile ? false : true}/>: null}
        {isMobile? <HeaderMain className={isMobile ? 'text-center d-flex js-bet p-10' :'text-center d-flex js-bet'}>
          <IconsContainer className='d-flex mrt-6' onClick={() => {
            navigate('/home');
          }
          }>
            <Icon name={'chervonLeft'} />
          </IconsContainer>
          <IconsContainer className='flex-1'
            color='black'
            onClick={() => (0)
            }>
            <Icon name='headerLogo' />
          </IconsContainer>
        </HeaderMain>: null}
        <LayoutWrapper className='with-header'>
          <LeftContainer style={{backgroundColor: '#355F92'}}>
            {/* {isMobile && <BackBtnContainer className='positioned'>
              <BackIconContainer onClick={() => {
                navigate('/rootcause-home');
              }}>
                <Icon name='backarrow'/>
              </BackIconContainer>
            </BackBtnContainer>} */}
            <ImageContainer className={isMobile ? 'dflex justify-content-center' : 'd-flex justify-content-center'}>
              {/* <ImageHolder> */}
              <img alt='inflammationBG' className={isMobile ? 'w-100' : ''} src={BookInitialAppointmentBG} />
              {/* </ImageHolder> */}
            </ImageContainer>
          </LeftContainer>
          <RightContainer>
            <RightContent>
              <div className="content-wrapper">
                {!isMobile && <BackBtnContainer>
                  <BackIconContainer onClick={() => {
                    navigate('/rootcause-home');
                  }}>
                    <Icon name='backarrow'/>
                  </BackIconContainer>
                </BackBtnContainer>}
                <TextContent>
                  <CurrentPill>Current Step</CurrentPill>
                  <InflamationHeading className='mt-10'>Book an appointment with your health coach</InflamationHeading>
                  {userDetails['assignment_details'] && userDetails['assignment_details']['ClientAssignments'] && userDetails['assignment_details']['ClientAssignments']['Health Coach'] && <HCDetails onClick={() => updateView(true)} className={'d-flex pointer ' + (isMobile ? 'gap-16' : 'justify-content-between')}>
                    <div className='d-flex'>
                      <ImgContainer>{ userDetails['assignment_details'] && userDetails['assignment_details']['ClientAssignments']['Health Coach'] ? <img style={isMobile ? {} : {objectFit: 'cover'}} src={userDetails['assignment_details']['ClientAssignments']['Health Coach']['display_url']}/> : <Icon name='user' />} </ImgContainer>
                      {!isMobile && <div className='ml-10'>{userDetails['assignment_details'] && userDetails['assignment_details']['ClientAssignments'] && userDetails['assignment_details']['ClientAssignments']['Health Coach'] && userDetails['assignment_details']['ClientAssignments']['Health Coach']['name'] ? userDetails['assignment_details']['ClientAssignments']['Health Coach']['name'] : ''}</div>}
                    </div>
                    <div className='dflex flex-column'>
                      {isMobile && <div className=''>{userDetails['assignment_details'] && userDetails['assignment_details']['ClientAssignments'] && userDetails['assignment_details']['ClientAssignments']['Health Coach'] && userDetails['assignment_details']['ClientAssignments']['Health Coach']['name'] ? userDetails['assignment_details']['ClientAssignments']['Health Coach']['name'] : ''}</div>}
                      <ViewProfile className='pointer'>
                    View profile
                      </ViewProfile>
                    </div>
                  </HCDetails>}
                  {/* <div className='state_alert'>
                    <HomeToDoCardStatus>Due April 10th</HomeToDoCardStatus>
                    <TimingStatus>~20 minutes</TimingStatus>
                  </div> */}
                  <InflamtionContent>Book your appointment with your health coach to receive your report and get more details on your results.</InflamtionContent>
                </TextContent>
                <Actions className='mb-24'>
                  <Button variant={((userDetails['assignment_details'] && userDetails['assignment_details']['ClientAssignments'] && userDetails['assignment_details']['ClientAssignments']['Health Coach']) && (userDetails['test_results_updated'])) ? 'primary' : 'disabled'}
                    className={'responsive-Imbalance-btn'}
                    type="submit"
                    onClick={()=> {
                      navigate('/rootcause-appointment');
                      Mixpanel.track(action['careTeam']['bookACall']['title'], action['careTeam']['bookACall']['props']);
                      gtag('event', gaAction['careTeam']['bookACall']['title'], {
                        'event_category': gaAction['careTeam']['bookACall']['category'],
                      });
                    }}
                    size='large' width='100%'
                  >Book my appointment</Button>
                </Actions>
                <div style={{background: '#F8F5F0', padding: '16px 24px', margin: (isMobile?'0 -24px -24px' : '0 -40px -40px')}}>
                  <NextPill className='mb-12'>Next Step</NextPill>
                  <HomeToDoCards
                    className={`${isMobile ? 'w-100' : ''}`} style={isMobile ? {minHeight: 'auto', cursor: 'inherit', borderTop: ' 10px solid #E8EAF1'} : {cursor: 'inherit', borderTop: ' 10px solid #E8EAF1'}}
                    // onClick={() => {
                    //   // if (!userDetails['inflamation_test_ordered']) {
                    //   // }
                    //   todoRedirection(todo);
                    //   Mixpanel.track(action['rootHome']['inflammationTest']['title'], action['rootHome']['inflammationTest']['props']);
                    //   gtag('event', gaAction['rootHome']['inflammationTest']['title'], {
                    //     'event-category': gaAction['rootHome']['inflammationTest']['category'],
                    //   });
                    // }}
                  >
                    {/* <HomeToDoCardContainer
                                  className={
                                    userDetails['inflamation_test_ordered'] ?
                                      isMobile ?
                                        'gap-8 align-items-start check' :
                                        ' align-items-start gap-16 check' :
                                      isMobile ?
                                      'gap-8 align-items-start dis' :
                                      ' align-items-start gap-16 dis'
                                  }
                                > */}
                    {/* <div className="d-flex
                                  d-flex-str HomeToDoCardInnerContainer gap-10"> */}
                    {/* <Icon name="testblack" /> */}
                    <div className="flex-1 dflex justify-content-between gap-24">
                      <div className='d-flex gap-12'>
                        <HomeToDoCardTitle>
                        Receive your report
                        </HomeToDoCardTitle>
                      </div>
                      <div className='dflex gap-12'>
                        {/* <div>
                          {moment().diff(
                              userDetails['todo_list_dueDate'],
                              'days',
                          ) < 0 ? (
                                        <HomeToDoCardStatus>
                                          {todo.due_date ?
                                            'Due ' +
                                              dateFormats(
                                                  todo.due_date,
                                                  'MMMM Do',
                                              ) :
                                            'Complete'}
                                        </HomeToDoCardStatus>

                                      ) : (
                                        <HomeToDoCardStatus
                                          color={
                                            !userDetails[
                                                'inflamation_test_ordered'
                                            ] ?
                                              '#B11818' :
                                              ''
                                          }
                                        >
                                          {!userDetails[
                                              'inflamation_test_ordered'
                                          ] ?
                                            'Overdue ' :
                                            'Completed'}
                                        </HomeToDoCardStatus>

                                      )}
                        </div> */}
                        {/* <div>
                          <Icon name='chervonRight' />
                        </div> */}
                      </div>
                    </div>
                    {/* </div> */}
                    {/* <div>
                                    <Icon name="roundCheckInactive" />
                                  </div> */}
                    {/* </HomeToDoCardContainer> */}
                  </HomeToDoCards>
                </div>
              </div>
            </RightContent>
          </RightContainer>
        </LayoutWrapper>
        {/* {isMobile? <DesktopWidth className='w-100 fixed-footer h-64 br-tp'>
          <FooterButtons className='js-end'>
            <Button variant={'primary'} size='large' width='40%'
              className={'w-40'}
              onClick={() => {
                navigate('/timeline-quiz-questions');
                Mixpanel.track(action['assesmentQues']['getStarted']['title'], action['assesmentQues']['getStarted']['props']);
                gtag('event', gaAction['assesmentQues']['getStarted']['title'], {
                  'event_category': gaAction['assesmentQues']['getStarted']['category'],
                });
              }}
            >Get started</Button>
          </FooterButtons>
        </DesktopWidth>: null} */}

      </MainContainer>
      {viewDialog && <ViewDialog width={isMobile? 'unset' : '440px'} header={'Health Coach'} onCancel={()=> {
        updateView(false);
        Mixpanel.track(action['careTeam']['close']['title'], action['careTeam']['close']['props']);
        gtag('event', gaAction['careTeam']['close']['title'], {
          'event_category': gaAction['careTeam']['close']['category'],
        });
      }}/>}
    </>
  );
}
