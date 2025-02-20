/* eslint-disable max-len */
import {useEffect, useState} from 'react';
import Header from '@app/components/header';
import {homeBackgroudColor1, whiteColor} from '@app/styles';
import {DesktopWidth, GProgressBar, GProgressBarFill, Heading, Heading3, Loader, MainContainer, ProDefImage}
  from '@app/styles/common-styles';
import {ScrollSection}
  from '../boarding-screens/component/boarding-screen-components';
import {BackDrop, BodyText2, ContentContainer, DialogContainer, IconsContainer}
  from '../assesment-questions/assesment-questions-components';
import {getLocalStorage, setLocalStorage} from '@app/core/localStorageService';
import {BodyText3, Heading4}
  from '../recommend-plans/component/recommend-plans-components';
import {BackGroundIcon, BadgeContainer, BadgeHeading, BadgeLabel, BadgePill, BadgeRow, ContentBox, GWColumn, GWColumnLeft, GWColumnRight, HealthCoachCardText2, HeroBannerHeading, HeroBannerHealthCoachCard, HeroBannerSection, HeroBannerSubHeading, HomeToDoCardContainer, HomeToDoCards, HomeToDoCardStatus, HomeToDoCardTitle, Menu, MenuItem, PreBadge}
  from './home-components';
import Icon from '@app/components/icon/icon';
import {Description, ImageWrapper, ImgTitle}
  from '@app/components/layout-onBoarding/layout-onBoarding-components';
import cmImg from '@app/assets/images/userIcon.png';
import cmImg1 from '@app/assets/images/cm11.png';
import home1 from '@app/assets/images/home1.png';
import home2 from '@app/assets/images/home2.png';
import {createSearchParams, useNavigate, useParams} from 'react-router-dom';
import Button from '@app/components/button/button';
import BotoomHeader from '@app/components/footer-menu';
import apiEndpoint from '@app/core/apiend_point';
import {PayloadProps, ApiResponseProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import {dateFormats} from '@app/utils/dateformat';
import {ProfileHeader, ContentSection} from '../profile/profile-components';
import {isMobile} from 'react-device-detect';
import Spinner from '@app/components/icon/icons/loader';
import ViewDialog from '@app/components/alert-dialog/view-dialog';
import React from 'react';
import {Mixpanel} from '@app/App';

/**
 * Renders Component.
 * @return {BoardingScreen} renders Component.
 */
export default function HomeOld() {
  const [userDetails, updateUserDetails] = useState({});
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [firstAppointmentsList, setFirstAppointmentsList] = useState([]);
  const [info, setFirstAppointmentsInfo] = useState({});
  const [count, updateCount] = useState(0);
  const navigate = useNavigate();
  const token = getLocalStorage('token') ? getLocalStorage('token') : '';
  const limit = 2;
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const [selAppointment, setSelAppointment] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [payData, setpayData] = useState({});
  const [selIndex, setSelectedIndex] = useState(-1);
  const {status}: any = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [loader, setLoader] = useState(true);
  const [stats, updateStats] = useState({});
  const [viewDialog, updateView]= useState(false);
  const [dialogKey, updateDKey] = useState('');
  const recLabels=[
    {name: 'Lifestyle', icon: 'lifeStyle'},
    {name: 'Nutrition', icon: 'nutrition'},
    {name: 'Supplements', icon: 'supplements'},
  ];
  const trackList =[
    {
      desc: 'Receive Phases of Care',
      bgColor: '#FCFAF6',
      icon: 'heart',
      class: 't-18',
      iconColor: '#D29B22',
      view: true,
    }, {
      desc: 'Advanced testing',
      bgColor: '#E8F4F3',
      icon: 'bar',
      class: 't-18',
      iconColor: '#278C71',
    },
  ];
  useEffect(()=>{
    Mixpanel.track('Home-old page is opened.', {});
    setLoader(true);
    if (status === 'Initial') {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
    getCustStas();
    const userData= JSON.parse(getLocalStorage('userData'));
    updateUserDetails(userData);
    getProfileData();
    if (!userData['intake_submitted'] ||
     !userData['symptom_analysis_submitted']) {
      setLoader(true);
      getProfileData();
    }
    getAppointmentDetails();
    const TimeInterval = setInterval(() => {
      getFirstAppointment();
    }, 3000);
    return () => clearInterval(TimeInterval);
  }, []);


  const getCustStas =async ()=>{
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.custStatus,
      headers: {Authorization: getLocalStorage('token')},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code == 200) {
            updateStats(response.data);
          }
        });
  };
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
              'recurring_type': 'monthly',
              'status': true,
              'price_id': 'price_1Kt3NBJ906CRVF6JKF4zfzgx',
            };
            updateUserDetails(Data);
            if ( Data['subscription_plan_info']) {
              setLocalStorage('userData', JSON.stringify(Data));
              setTimeout(() => {
                setLoader(false);
              }, 3000);
            } else {
              Data['subscription_plan_info'] = planInfo;
              setLocalStorage('userData', JSON.stringify(Data));
            }
          }
        });
  };
  const getFirstAppointment =async ()=>{
    const filter= `?onlyFirstAppointment=${'one'}`;
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.appointmentList+filter,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            const data =response.data.result;
            setFirstAppointmentsList(data);
            setFirstAppointmentsInfo(data.length ? data [0] : {});
          }
        });
  };
  const getAppointmentDetails =async ()=>{
    // const filter= `?onlyFirstAppointment=${true}`;
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.appointmentList,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            setAppointmentsList(response.data.result);
            updateCount(response.data.count);
            setTimeout(() => {
              setLoader(false);
            }, 3000);
          } else {
            setTimeout(() => {
              setLoader(false);
            }, 3000);
          }
        });
  };
  const updateAppInfo=async (info)=>{
    setSelAppointment(info);
    setOpenDialog(true);
    cancelAppoint(info);
  };
  const cancelAppoint =async (info)=>{
    const apiObject: PayloadProps = {
      payload: {
        offSet: offset.toString(),
        appointmentId: info['_id'],
      },
      method: 'POST',
      apiUrl: apiEndpoint.validateAppointment,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            setpayData(response.data);
          }
        });
  };
  const navigateAppoint=(data, appData)=>{
    if ((data['isPaymentDone'] && data['isPaymentRequired'])|| !data['isPaymentRequired']) {
      navigate({
        pathname: '/book-appointment',
        search: `?${createSearchParams({link: appData['confirmationPage']})}`,
      });
    } else {
      navigate({
        pathname: '/add-payment',
        search: `?${createSearchParams({paymentFee: data['paymentFees'], link: appData['confirmationPage'],
          id: appData['_id']})}`,
      });
    }
  };
  return (
    <>
      {loader ? <Loader>
        <Spinner size="6px" />
      </Loader> : null}
      {viewDialog && <ViewDialog header={dialogKey} onCancel={()=> updateView(false)}/>}
      {
        showPopup && status === 'Initial' &&
      <BackDrop><DialogContainer className='al-center'>
        <Heading3>
        Success! You’ve booked an appointment with
        </Heading3>
        <BadgePill className='pending activ text-center'>
               Health Coach
        </BadgePill>
        <IconsContainer className="layout2">
          <ImageWrapper className='text-center m-10 w-160 br-50'>
            <img src={userDetails['assignment_details']['ClientAssignments']['Health Coach']['display_url'] ?
                    userDetails['assignment_details']['ClientAssignments']['Health Coach']['display_url'] :cmImg} alt="User" />
          </ImageWrapper>
          <BadgePill className='pending transparent text-center'>
            {userDetails['assignment_details']['ClientAssignments']['Health Coach']['name']}
          </BadgePill>
        </IconsContainer>
        {firstAppointmentsList.length ? <Heading4 className='mb-0'>
          {dateFormats(firstAppointmentsList[0]['start_date'], 'dddd, MMMM Do h:mm a')}
        </Heading4> : null}
        <Heading4>
          <b>Note: </b>This is a recurring appointment that will repeat every other week at the same time and day.
        </Heading4>
        <Button variant={'primary'}
          size='large' width='100%'
          onClick={()=>{
            location.reload();
            navigate('/home');
          }}
          className={ 'flx-center'}
        >Go to home</Button>
        <Heading4 onClick={()=>
          navigate({
            pathname: '/book-appointment',
            search: `?${createSearchParams({link: firstAppointmentsList[0]['confirmationPage']})}`,
          })}>
          <span>change</span> or <span>cancel</span>
        </Heading4>
      </DialogContainer>
      </BackDrop>}
      {openDialog && <BackDrop><DialogContainer>
        {/* <CloseIcon onClick={()=>setOpenDialog(false)}>
          <Icon name="close" />
        </CloseIcon> */}
        <Heading3>
        Are you sure you want to reschedule / cancel your appointment?
        </Heading3>
        <Description>
        If You are rescheduling / cancelling within 24 hours of your current appointment
          <br/><br/>
          <b>Please note: </b>
          You will be charged a $25 fee once you confirm your new appointment..
        </Description>
        <Button variant={'primary'}
          size='large' width='100%'
          onClick={()=> navigateAppoint(payData, selAppointment)}
          className={ 'flx-center'}
        >Continue </Button>
        <Button variant={'secondary'}
          size='large' width='100%'
          className={ 'flx-center mt-20'}
          onClick={()=>{
            setOpenDialog(false);
          }}
        >Cancel</Button>
      </DialogContainer>
      </BackDrop>}
      {!loader ? <MainContainer bgColor={whiteColor}>
        <Header hideBackArrow={false} className='txt-left' desktopMenu={isMobile ? false : true}/>

        {appointmentsList.length ?
        <ScrollSection id="scrollable-div" className='flex-1 flex-unset'>
          <HeroBannerSection bgColor={'#E9DCCE'} className={isMobile ? 'm-auto p-0' : 'm-auto'}>
            <BackGroundIcon className={isMobile? 'opacity-3' : 'top-80'}>
              <Icon name='homeSquare'/>
            </BackGroundIcon>

            <DesktopWidth className={isMobile? ' m-auto' : 'w-1150 m-auto'}>
              <ContentContainer bgColor={'transparent'}>
                {!userDetails['symptom_analysis_submitted'] && !userDetails['intake_submitted'] ? <><HeroBannerHeading className={isMobile ? 'f-30 mb-16 pos-rel' : 'f-36 mb-24 pos-rel'}>
                        Welcome {userDetails['first_name']}
                </HeroBannerHeading>
                <HeroBannerSubHeading className={isMobile ? 'HeaderSubText f-18 mb-32' : 'HeaderSubText f-22 mb-32'}>
                      Complete your to do list to book your first appointment!
                </HeroBannerSubHeading>

                {/* scc-1*/}
                <div className={isMobile? 'HomeToDoCardsWrapper d-flex flex-wrap gap-10' : 'HomeToDoCardsWrapper d-flex gap-24'}>
                  <HomeToDoCards className={isMobile? 'w-100' : ''}>
                    <HomeToDoCardContainer className={userDetails['intake_submitted'] ? 'check' : 'dis'}>
                      <div className="d-flex d-flex-str HomeToDoCardInnerContainer gap-12">
                        <Icon name='padIcon'/>
                        <div className ="flex-1">
                          <HomeToDoCardTitle>Complete intake form</HomeToDoCardTitle>
                          <HomeToDoCardStatus>{!userDetails['intake_submitted'] ? 'Due '+ dateFormats(userDetails['todo_list_dueDate'], 'MMMM Do') : 'Complete'}</HomeToDoCardStatus>
                        </div>
                      </div>
                      <div><Icon name='roundCheckInactive'/> </div>
                    </HomeToDoCardContainer>

                  </HomeToDoCards>
                  <HomeToDoCards className={isMobile? 'w-100' : ''}>
                    <HomeToDoCardContainer className={userDetails['symptom_analysis_submitted'] ? 'check' : 'dis'}>
                      <div className="d-flex d-flex-str HomeToDoCardInnerContainer gap-12">
                        <Icon name='bar'/>
                        <div className ="flex-1">
                          <HomeToDoCardTitle>Symptom analysis</HomeToDoCardTitle>
                          <HomeToDoCardStatus>{!userDetails['symptom_analysis_submitted'] ? 'Due '+ dateFormats(userDetails['todo_list_dueDate'], 'MMMM Do') : 'Complete'}</HomeToDoCardStatus>
                        </div>
                      </div>
                      <div><Icon name='roundCheckInactive'/> </div>
                    </HomeToDoCardContainer>
                  </HomeToDoCards>
                  <HomeToDoCards className={isMobile? 'w-100' : ''}>
                    <HomeToDoCardContainer>
                      <div className="d-flex d-flex-str HomeToDoCardInnerContainer gap-12">
                        <Icon name='usersIcon'/>
                        <div className ="flex-1">
                          <HomeToDoCardTitle>Meet your Care Advocate</HomeToDoCardTitle>
                          <HomeToDoCardStatus color={'#B11818'}> Over due</HomeToDoCardStatus>

                        </div>
                      </div>
                      <div><Icon name='roundCheckInactive'/> </div>
                    </HomeToDoCardContainer>
                  </HomeToDoCards>
                </div> </>: null}

                {/* /////////////////////////////////////---Screen2----//////////////////////////////////// */}

                { userDetails['symptom_analysis_submitted'] && userDetails['intake_submitted'] ? <GWColumn className={isMobile ? 'd-flex flx-col' : 'd-flex gapXY-80'} >

                  <GWColumnRight className='flex-1'>
                    <HeroBannerHeading className={isMobile ? 'f-30 mb-16' : 'f-36 mb-24'}>
                        Welcome {userDetails['first_name']}
                    </HeroBannerHeading>
                    <HeroBannerSubHeading className={isMobile ? 'HeaderSubText f-18 mb-32' : 'HeaderSubText f-22 mb-32'}>
                      {userDetails['assignment_details']['hc_assigned']?
                      'Congratulations, you are now able to book with your health coach!':
                      'Congratulations, you completed your task list! We are working on finding your health coach match, check back later!' }
                    </HeroBannerSubHeading>
                  </GWColumnRight>

                  <GWColumnLeft className={isMobile ? 'w-100' : ''}>
                    <HeroBannerHealthCoachCard bgColor={whiteColor} color={userDetails['assignment_details']['hc_assigned']? '#72C4AA' :'#E8EAF1'}
                      className={userDetails['assignment_details']['hc_assigned'] ? 'splash ' :'' + isMobile ? 'w-100' : ''}>
                      <BadgePill className='bg-bei'>{userDetails['assignment_details']['hc_assigned']? 'Health Coach' :'Pending match...'}</BadgePill>
                      <div className={userDetails['assignment_details']['hc_assigned']? '' : 'blurred'}>
                        <IconsContainer className={isMobile ? 'layout2' : 'layout2' }>
                          <ImageWrapper className='text-center m-10 w-50 br-50'>
                            {userDetails['assignment_details']['ClientAssignments']['Health Coach']['display_url'] ? <img src={userDetails['assignment_details']['ClientAssignments']['Health Coach']['display_url'] ?
                      userDetails['assignment_details']['ClientAssignments']['Health Coach']['display_url'] :cmImg} alt="User" /> :
              <ProDefImage className='w-50'>{userDetails['assignment_details']['ClientAssignments']['Health Coach']['name'].charAt(0)}
                {userDetails['assignment_details']['ClientAssignments']['Health Coach']['name'].charAt(1)}</ProDefImage>}

                          </ImageWrapper>
                          <BadgePill className='pending transparent text-center'>
                            {userDetails['assignment_details']['ClientAssignments']['Health Coach']['name']}
                          </BadgePill>
                        </IconsContainer>

                        <div className='mt-10'>
                          <Button variant={(userDetails['intake_submitted'] &&
                    userDetails['symptom_analysis_submitted']) ? 'primary' :'disabled'}
                          size='large' width='100%'
                          onClick={()=>{
                            if ((userDetails['intake_submitted'] &&
                      userDetails['symptom_analysis_submitted'])) {
                              navigate('/book-appointment');
                            }
                          }}
                          className={ 'flx-center w-100'}
                          >Book an Appointment</Button>
                          <HealthCoachCardText2 className='text-center mt-20'>
                          Read more about your health coach
                          </HealthCoachCardText2>
                        </div>
                      </div>
                    </HeroBannerHealthCoachCard>

                  </GWColumnLeft>
                </GWColumn> : null}


                {/* /////////////////////////////////////---Screen3----//////////////////////////////////// */}

                {/* <GWColumn className='d-flex align-items-start'>
                    <GWColumnLeft className='flex-1'><HeroBannerHeading className='jumboText mb-24'>
                      Hi, {userDetails['first_name']}
                    </HeroBannerHeading>
                    <HeroBannerSubHeading className='HeaderSubText mb-32'>
                    See what’s happening
                    </HeroBannerSubHeading>
                    </GWColumnLeft>
                    <GWColumnRight className={isMobile ? 'd-none' : ''}>
                      <span className='d-flex gap-10' onClick={()=> console.log('')}><Icon name='textMessage'/> Open Messages</span>

                    </GWColumnRight>
                  </GWColumn>
                  <div className={isMobile ? 'd-flex flex-wrap align-items-stretch gap-8': 'HomeToDoCardsWrapper d-flex align-items-stretch gap-24'}>
                      <HomeTaskCards color={'#72C4AA'} className={isMobile ? 'w-100 p-18' : 'w-342'}>
                        <HomeTestCardTitle>Dr. Williams</HomeTestCardTitle>
                        <div className="time-stamp mt-16">March 1st, 8:30am-9:00am</div>
                        <Button variant={'disabled'}
                  size='large' width='auto'
                  className={ 'flx-center mt-16 w-100'}
                    >Join meeting</Button>

                      </HomeTaskCards>
                      <HomeTaskCards className={isMobile ? 'gap-10 p-18 w-30' : ''}>
                        <div className={isMobile ? 'homeTaskCardContainer d-flex align-items-center gap-10' :'homeTaskCardContainer d-flex align-items-center gap-24'}>
                           <Icon name='taskCheckIn'/>
                           <span className={isMobile ? 'f-30':'f-40'}>0</span>
                        </div>
                        <HomeCardResultTitle className={isMobile ? 'f-14 mt-10':'f-18 mt-20'}>Check in survey</HomeCardResultTitle>

                      </HomeTaskCards>
                      <HomeTaskCards className={isMobile ? 'gap-10 p-18 w-30' : ''}>
                        <div className={isMobile ? 'homeTaskCardContainer d-flex align-items-center gap-10' :'homeTaskCardContainer d-flex align-items-center gap-24'}>
                           <Icon name='taskOrder'/>
                           <span className={isMobile ? 'f-30':'f-40'}>12</span>
                        </div>
                        <HomeCardResultTitle className={isMobile ? 'f-14 mt-10':'f-18 mt-20'}>Order</HomeCardResultTitle>

                      </HomeTaskCards>

                      <HomeTaskCards className={isMobile ? 'gap-10 p-18 w-30' : ''}>
                        <div className={isMobile ? 'homeTaskCardContainer d-flex align-items-center gap-10' :'homeTaskCardContainer d-flex align-items-center gap-24'}>
                           <Icon name='taskResult'/>
                           <span className={isMobile ? 'f-30':'f-40'}>0</span>
                        </div>
                        <HomeCardResultTitle className={isMobile ? 'f-14 mt-10':'f-18 mt-20'}>Test Results</HomeCardResultTitle>

                      </HomeTaskCards>


                  </div> */}

              </ContentContainer>
            </DesktopWidth>
          </HeroBannerSection>
          <DesktopWidth className='w-1150'>
            <ContentContainer bgColor={whiteColor} className='text-center pos-rel' >
              {userDetails['display_url'] ?<IconsContainer className="w-90 text-center w-50">
                <img src={userDetails['display_url'] ? userDetails['display_url'] : cmImg } alt="User" />
              </IconsContainer> :
              <ProDefImage>{userDetails['first_name'].charAt(0)}{userDetails['last_name'].charAt(0)}</ProDefImage>}
              <IconsContainer className='icon-lt t-65 br-16' >
                <img src={home1 } alt="User" />
              </IconsContainer>
              <IconsContainer className='icon-rt t-65 br-16' >
                <img src={home2 } alt="User" />
              </IconsContainer>
              <Heading className='f-20'>
                Welcome {userDetails['first_name']}
              </Heading>
              <Heading4 className='f-16'>
                {
               userDetails['intake_submitted'] &&
               userDetails['symptom_analysis_submitted'] ?
               userDetails['assignment_details'] &&
               userDetails['assignment_details']['hc_assigned'] ?
                '': 'We are gathering all of your details and will match you to a health coach soon.' :
               '  Complete your To Do List to book an appointment!'}
              </Heading4>
              {userDetails['assignment_details']['hc_assigned'] && !firstAppointmentsList.length &&
              userDetails['intake_submitted'] && userDetails['symptom_analysis_submitted'] ?
              <div className='js-cen d-flex'>
                <Button variant={'secondary'}
                  size='large' width='auto'
                  onClick={()=>{
                    navigate('/book-appointment');
                  }}
                  className={ 'flx-center'}
                >Book an Appointment</Button>
              </div>: null}
            </ContentContainer>
            <ContentContainer bgColor={homeBackgroudColor1}
              className={isMobile ? 'pos-rel' :'pos-rel d-flex gap-30 ptl-30-100'}>
              <BadgeContainer className='pos-unset align-self'>
                <BadgeRow>
                  <BadgeHeading className={isMobile ? '' : 'f-20'}>
                  My To Do List
                  </BadgeHeading>
                  <BadgePill className={userDetails['intake_submitted'] &&
                userDetails['symptom_analysis_submitted'] ? 'active' : '' }>
                    {userDetails['intake_submitted'] &&
                userDetails['symptom_analysis_submitted'] ?
                 'Complete' : (userDetails['intake_submitted'] ||
                 userDetails['symptom_analysis_submitted'] ? '1 new' :'2 new' )}
                  </BadgePill>
                </BadgeRow>
                <BadgeRow className={userDetails['intake_submitted'] ?
                 'active item' : 'item'} onClick={()=>{
                  if (!userDetails['intake_submitted']) {
                    navigate('/intake-home');
                  }
                }}>
                  <IconsContainer className={userDetails['intake_submitted'] ?
                 'completed w-16' : ''}>
                    <Icon name={userDetails['intake_submitted'] ?
                 'check' : 'inTake'}/>
                  </IconsContainer>
                  <BadgeLabel className={isMobile ?'' : 'flex-row w-100'}>
                    Complete intake form
                    {!userDetails['intake_submitted'] ? <p className={isMobile ? '' : 'p-0'}>
                  Due {dateFormats(userDetails['todo_list_dueDate'], 'MMMM Do')}
                    </p>:null}
                  </BadgeLabel>
                </BadgeRow>
                <BadgeRow className={userDetails['symptom_analysis_submitted'] ?
                 'active item' : 'item'} onClick={()=>{
                  if (!userDetails['symptom_analysis_submitted']) {
                    navigate('/symptom-home');
                  }
                }}>
                  <IconsContainer className={userDetails['symptom_analysis_submitted'] ?
                 'completed w-16' : ''}>
                    <Icon name={userDetails['symptom_analysis_submitted'] ?
                 'check' : 'bar'} />
                  </IconsContainer>
                  <BadgeLabel className={isMobile ?'' : 'flex-row w-100'}>
                  Symptom analysis
                    {!userDetails['symptom_analysis_submitted'] ? <p className={isMobile ? '' : 'p-0'}>
                  Due {dateFormats(userDetails['todo_list_dueDate'], 'MMMM Do')}
                    </p>:null}
                  </BadgeLabel>
                </BadgeRow>
                <BadgeRow className={userDetails['symptom_analysis_submitted'] ?
                 'active item' : 'item'} onClick={()=>{
                  if (!userDetails['symptom_analysis_submitted']) {
                    navigate('/symptom-home');
                  }
                }}>
                  <IconsContainer className={'completed w-16'}>
                    <Icon name={'check'} />
                  </IconsContainer>
                  <BadgeLabel className={isMobile ?'' : 'flex-row w-100'}>
                  Meet your Care Advocate
                  </BadgeLabel>
                </BadgeRow>
              </BadgeContainer>
              {userDetails['assignment_details'] &&
               userDetails['assignment_details']['hc_assigned'] ?
             <BadgeContainer className={isMobile ? 'pos-unset mt-20' :'pos-unset align-self' }>
               <BadgeHeading className={isMobile ? 'mb-50 text-center' : 'mb-50'}>
                  My Health Coach
               </BadgeHeading>
               <Heading4 className={isMobile ? 'f-16 text-center' : 'f-16'}>
                 {(!userDetails['intake_submitted'] ||
                !userDetails['symptom_analysis_submitted']) ?
                ' Complete your to do list to book your first appointment!' :
                 'You’re almost there! Book your recurring appointments now.' }
               </Heading4>
               <div className={isMobile ? '' : 'd-flex gap-15 js-around mt-20'}>
                 <IconsContainer className={isMobile ? 'layout2' : 'layout2' }>
                   <ImageWrapper className='text-center m-10 w-50 br-50'>
                     <img src={userDetails['assignment_details']['ClientAssignments']['Health Coach']['display_url'] ?
                    userDetails['assignment_details']['ClientAssignments']['Health Coach']['display_url'] :cmImg} alt="User" />
                   </ImageWrapper>
                   <BadgePill className='pending transparent text-center'>
                     {userDetails['assignment_details']['ClientAssignments']['Health Coach']['name']}
                   </BadgePill>
                 </IconsContainer>
                 <div className='bl-1'>
                   <Button variant={(userDetails['intake_submitted'] &&
                userDetails['symptom_analysis_submitted']) ? 'primary' :'disabled'}
                   size='large' width='100%'
                   onClick={()=>{
                     if ((userDetails['intake_submitted'] &&
                   userDetails['symptom_analysis_submitted'])) {
                       navigate('/book-appointment');
                     }
                   }}
                   className={ 'flx-center'}
                   >Book an Appointment</Button>
                   <BodyText2 className='clr-green text-center pd-10'>
                View your care team
                   </BodyText2>
                 </div>
               </div>
             </BadgeContainer> :
              <BadgeContainer className={isMobile ? 'pos-unset mt-20' :'pos-unset align-self' }>
                {isMobile ? <>
                  <BadgeHeading className={isMobile ?'text-center mb-50' : 'mb-50 f-20'}>
                  My Health Coach
                  </BadgeHeading>
                  <BadgePill className='pending text-center'>
               Pending...
                  </BadgePill>
                </> :
                <BadgeRow>
                  <BadgeHeading className={isMobile ? '' : 'f-20'}>
                My Health Coach
                  </BadgeHeading>
                  <BadgePill className='pending f-16'>
             Pending...
                  </BadgePill>
                </BadgeRow>
                }
                <Heading4 className={isMobile ? 'f-16 ' :'f-16 mt-0'}>
                  {' We are gathering all of your details and will match you to a health coach soon.' }
                </Heading4>
                <div className={isMobile ? '' : 'd-flex gap-15 js-around mt-20'}>
                  <IconsContainer className="layout2">
                    <ImageWrapper className='blur-image'>
                      <img src={cmImg1} alt="User" />
                    </ImageWrapper>
                    {!isMobile ?<div className='f-18 text-center mt-10 blur-5'>
                      {'Dr. Sumanth Willams'}
                    </div> : null}
                  </IconsContainer>
                  <div className='blur-5'>
                    {isMobile ? <div className='f-18 text-center mt-10'>
                      {'Dr. Sumanth Willams'}
                    </div> : null}
                    <Button variant={'disabled'}
                      size='large' width='100%'
                      className={ 'flx-center  mt-20'}
                    >Book an Appointment</Button>
                    <BodyText2 className='clr-green text-center pd-10'>
                View your care team
                    </BodyText2>
                  </div>
                </div>
              </BadgeContainer> }
            </ContentContainer>
          </DesktopWidth>
        </ScrollSection> :
        <ScrollSection id="scrollable-div" className='flex-1'>
          <DesktopWidth className='w-1150'>
            <ContentContainer bgColor={whiteColor} className='text-center pos-rel' >
              { userDetails['display_url'] ? <IconsContainer className="w-90 text-center w-50">
                <img src={userDetails['display_url'] ? userDetails['display_url'] : cmImg } alt="User" />
              </IconsContainer> :
              <ProDefImage>{userDetails['first_name'].charAt(0)}{userDetails['last_name'].charAt(0)}</ProDefImage>}
              <IconsContainer className='icon-lt t-65 br-16' >
                <img src={home1 } alt="User" />
              </IconsContainer>
              <IconsContainer className='icon-rt t-65 br-16'>
                <img src={home2 } alt="User" />
              </IconsContainer>
              <Heading className='f-20'>
                Welcome {userDetails['first_name']}
              </Heading>
              <Heading4 className='f-14'>
                Next Appointment: {firstAppointmentsList.length ?<b>{dateFormats(firstAppointmentsList[0]['start_date'], 'MMMM Do, h:mm a')}</b> :null}
              </Heading4>
              {userDetails['assignment_details']['hc_assigned'] && !firstAppointmentsList.length &&
              userDetails['intake_submitted'] && userDetails['symptom_analysis_submitted'] ?
              <div className='d-flex js-cen'>
                <Button variant={'secondary'}
                  size='large' width='auto'
                  onClick={()=>{
                    navigate('/book-appointment');
                  }}
                  className={ 'flx-center'}
                >Book an Appointment</Button>
              </div>: null}
              {firstAppointmentsList ?<div className='d-flex js-cen'>
                {info['pre_session_servery_enable'] ?<Button variant={'secondary'}
                  size='large' width={isMobile ? 'auto' :'20%'}
                  className={ 'flx-center clr-gray mrt-6'}
                  onClick={()=>{
                    updateAppInfo(info);
                    navigate( '/pre-survey/'+info['_id'] );
                  }}
                ><BadgeLabel className='f-14 p-0'>Check in survey</BadgeLabel></Button> : null}
                {(!info['post_session_servery_enable'] && !info['pre_session_servery_enable']) || info['zoom_link_enable'] ?
                 <Button variant={info['zoom_link_enable'] ? 'primary' : 'disabled'}
                   size='large' width={isMobile ? 'auto' : '20%'}
                   onClick={()=>{
                     if (info['zoom_link_enable']) {
                       window.open(info['health_coach']['zoom_link']);
                     }
                   }}
                   className={ 'flx-center clr-gray '}
                 ><BadgeLabel className='f-14 p-0'>Join Meeting</BadgeLabel></Button> : null}
                {info['post_session_servery_enable'] ?<Button variant={'secondary'}
                  size='large' width={isMobile ? 'auto' :'20%'}
                  className={ 'flx-center clr-gray mlt-15'}
                  onClick={()=>{
                    updateAppInfo(info);
                    navigate( '/post-survey/'+info['_id'] );
                  }}
                ><BadgeLabel className='f-14 p-0'>Complete survey</BadgeLabel></Button> : null}
              </div> : null}
            </ContentContainer>
            <ContentContainer bgColor={homeBackgroudColor1}
              className={isMobile ? 'pos-rel pt-15' :'pos-rel ptl-30-100'}>
              {isMobile ? <> <BadgeContainer className='pos-unset align-self' >
                <BadgeRow onClick={()=> navigate('/recommendations')}>
                  <BadgeHeading>
                  Daily Goals
                  </BadgeHeading>
                  <BodyText3 className='clr-green f-16 m-0'>View all</BodyText3>
                </BadgeRow>
                <BadgeRow className={isMobile ? 'p-10 pb-0 over-x-hid' :
                'p-10 pb-15 over-x-hid'} >
                  {!userDetails['goals'].length ? <BadgeLabel className='clr-gray p-0'>
                    Attend your first appointment and you’ll start receiving recommendations!</BadgeLabel>:
<BadgeRow className={isMobile ? 'pills-trans mt-20 fl-col d-flex' : 'pills-trans d-flex'}>
  {recLabels.map((info:any, i:number)=>{
    return (
      <BadgePill key={i} className="clr-trans no-pointer">
        <IconsContainer className="w-20">
          <Icon name= {info['icon']}/>
        </IconsContainer>
        {info['name']}
      </BadgePill>
    );
  })
  }
</BadgeRow>
                  }
                </BadgeRow>
              </BadgeContainer>
              <BadgeContainer className='pos-unset mt-20 plr-0'>
                <BadgeRow className='pd-15 plr-25'>
                  <BadgeHeading >
                  Health Journey
                  </BadgeHeading>
                  <BodyText3 className='clr-green f-16 m-0' onClick={()=> navigate('/health-journey')}>
                  View Journey</BodyText3>
                </BadgeRow>
                {!userDetails['goals'].length ?<>
                  {stats ? <>
                    <BadgeRow className={isMobile ? 'flx plr-25 pb-15' : 'flx'}>
                      <BadgeHeading>
                        {stats['completedPhasesOfCareCount']+ ' of '+stats['phasesOfCareCount'] +' phases'}
                      </BadgeHeading>
                      <GProgressBar>
                        <GProgressBarFill
                          width={stats['phasesOfCareCount'] > 0 ?((stats['completedPhasesOfCareCount'] / stats['phasesOfCareCount']) * 100) + '%' : '0%'}>
                        </GProgressBarFill>
                      </GProgressBar>
                    </BadgeRow>
                    <div className={isMobile ? '' : 'd-flex gap-15 mt-20'}>
                      <BadgeRow className={isMobile ? 'flx plr-25 flex-1 pb-15' : 'flx flex-1'}>
                        <BadgeHeading>
                          {stats['subscriptionPaymentsReceivedCount']+ ' of '+stats['subscriptionPlanDuration'] +' months'}
                        </BadgeHeading>
                        <GProgressBar className='dr-orange'>
                          <GProgressBarFill className='dr-orange'
                            width={stats['subscriptionPlanDuration'] > 0 ?((stats['subscriptionPaymentsReceivedCount'] / stats['subscriptionPlanDuration']) * 100) + '%' : '0%'}>
                          </GProgressBarFill>
                        </GProgressBar>
                      </BadgeRow>
                      <BadgeRow className={isMobile ? 'flx plr-25 flex-1 pb-15' : 'flx flex-1'}>
                        <BadgeHeading>
                          {stats['attendedAppointmentsCount']+ ' of '+stats['totalAppointmentsCount'] +' appointments'}
                        </BadgeHeading>
                        <GProgressBar className='dr-orange'>
                          <GProgressBarFill className='dr-orange'
                            width={stats['attendedAppointmentsCount'] ?((stats['attendedAppointmentsCount'] / stats['totalAppointmentsCount']) * 100) + '%' : '0%' }>
                          </GProgressBarFill>
                        </GProgressBar>
                      </BadgeRow>
                    </div>
                  </> :
                  <>
                    <BadgeRow className='flx'>
                      <BadgeHeading>
              1 of 4 phases
                      </BadgeHeading>
                      <GProgressBar>
                        <GProgressBarFill width='80%'>
                        </GProgressBarFill>
                      </GProgressBar>
                    </BadgeRow>
                    <div className={isMobile ? '' : 'd-flex gap-15'}>
                      <BadgeRow className='r-1 flex-1'>
                        <BadgeHeading className='sub-head2 bdr-orange'>
              0 of 6 months
                        </BadgeHeading>
                      </BadgeRow>
                      <BadgeRow className='r-1 flex-1'>
                        <BadgeHeading className='sub-head2 bdr-orange'>
              0 of 6 appointments
                        </BadgeHeading>
                      </BadgeRow></div>
                  </>}
                </>:
                <BadgeRow className={isMobile ? 'mt-20 fl-col d-flex over-x-hid' : 'mt-20 d-flex over-x-hid'}>
                  {trackList.map((info:any, i:number)=>{
                    return (
                      <PreBadge key={i} className={i===0 ?'clr-trans solid' : 'clr-trans dash'}>
                        <BadgePill className="clr-trans no-pointer">
                          <IconsContainer className={info['class'] +
                             ' track-icons w-20 pr-15'}>
                            <Icon name= {info['icon']}/>
                          </IconsContainer>
                          <div>
                            {info['desc']}
                          </div>
                        </BadgePill>
                      </PreBadge>
                    );
                  })
                  }
                </BadgeRow>}
              </BadgeContainer> </> : null}
              <BadgeContainer className={isMobile ? 'pos-unset mt-50' : 'pos-unset'}>
                <BadgeRow>
                  <BadgeHeading>
                  My Goals
                  </BadgeHeading>
                </BadgeRow>
                <BadgeRow className='p-10' >
                  {!userDetails['goals'].length ? <BadgeLabel className='clr-gray p-0'>
                    {`Your motivation is at the center of your care. Whether it's big or small goal, we will review in your appointment and list it here to motivate each day.
`}<br/><br/>For example: eliminate migraines, more energy etc...</BadgeLabel>:
<BadgeRow className={isMobile ? 'pills-conte mt-20 fl-col w-100' : 'pills-conte over-x-hid'}>
  {userDetails['goals'].map((info:any, i:number)=>{
    return (
      <BadgePill key={i} className={isMobile ? 'w-88 clr-ble no-pointer' : 'clr-ble no-pointer'}>{info['label']}
      </BadgePill>
    );
  })
  }
</BadgeRow>
                  }
                </BadgeRow>
              </BadgeContainer >
              {isMobile ?<BadgeContainer className='pos-unset mt-50' >
                <BadgeRow onClick={()=> navigate('/appointments')}>
                  <BadgeHeading>
                  My Appointments
                  </BadgeHeading>
                  <BadgePill>
                    View All
                  </BadgePill>
                </BadgeRow>
                {appointmentsList.slice(0, limit).map((info:any, i:number)=>{
                  return (
                    <BadgeRow key={i}>
                      <ContentBox>
                        {isMobile ?<BadgeLabel className='p-0 f-16-24'>
                          {dateFormats(info['start_date'], 'dddd MMMM Do')}
                          <br></br> <b>{dateFormats(info['start_date'], 'h:mm a')} -
                            {dateFormats(info['end_date'], 'h:mm a')} </b>
                        </BadgeLabel>:
                        <div className='d-flex gap-15  mt-20'>
                          <IconsContainer className='d-flex'>
                            <ImageWrapper className='w-50 br-50'>
                              <img src={info['health_coach']['display_url']}
                                alt="User" />
                            </ImageWrapper>
                            <ImgTitle className='f-18 mlt-15'>
                              {info['health_coach']['name']}
                            </ImgTitle>
                          </IconsContainer>
                          <BadgeLabel className='w-500'>
                            {dateFormats(info['start_date'], 'dddd MMMM Do ')}
                            {dateFormats(info['start_date'], 'h:mm a')} -
                            {dateFormats(info['end_date'], 'h:mm a')}
                          </BadgeLabel>
                        </div>
                        }
                        { !info['acuity_appointment_status'] ? <div className='pos-rel'>
                          <IconsContainer onClick={()=> setSelectedIndex(-1)} className="z-10">
                            <Icon name="menu"/>
                          </IconsContainer>
                          {(selIndex === i)&& <Menu>
                            <MenuItem onClick={()=> updateAppInfo(info)}>
                            Reschdule/Cancel
                            </MenuItem>
                          </Menu>}
                        </div>:null}
                      </ContentBox>
                    </BadgeRow>
                  );
                })
                }
                {count > limit ?<BadgeRow>
                  <ContentBox className='mb-0'>
                    <BadgeLabel onClick={()=> navigate('/appointments')}>
                      {'+ '}{(count - limit)+' more'}
                    </BadgeLabel>
                  </ContentBox>
                </BadgeRow>: null}
              </BadgeContainer> : null}
              <div className={isMobile ? '': 'd-flex gap-30 row-rev'}>
                <BadgeContainer className='pos-unset mt-50 align-self ptb-30' >
                  <BadgeRow onClick={()=> navigate('/appointments')}>
                    <BadgeHeading>
                  My Care Team
                    </BadgeHeading>
                  </BadgeRow>
                  {isMobile ?
                  <div>
                    <BadgeRow className='pill-context'>
                      <ProfileHeader className='d-flex js-bet'>
                        <div className='d-flex'>
                          {userDetails['assignment_details']['ClientAssignments']['Health Coach']['display_url'] ?
                        <IconsContainer className='w-46 br-50'>
                          <img src={userDetails['assignment_details']['ClientAssignments']['Health Coach']['display_url']} alt="User" />
                        </IconsContainer>:
                        <ProDefImage className='w-40'>{userDetails['assignment_details']['ClientAssignments']['Health Coach']['name'] ?
                        userDetails['assignment_details']['ClientAssignments']['Health Coach']['name'].charAt(0) +
                        userDetails['assignment_details']['ClientAssignments']['Health Coach']['name'].charAt(1) :''}</ProDefImage>
                          }
                          <ContentSection onClick={()=>{
                            updateView(true);
                            updateDKey('Health Coach');
                          }}>
                            <BodyText3>{userDetails['assignment_details']['ClientAssignments']['Health Coach']['name']}</BodyText3>
                            <BodyText3>Health Coach</BodyText3>
                          </ContentSection>
                        </div>
                        <IconsContainer className='clr-green' onClick={()=>{
                          updateView(true);
                          updateDKey('Health Coach');
                        }} >
                          <Icon name="chervonRightN"/>
                        </IconsContainer>
                      </ProfileHeader>
                    </BadgeRow>
                    <BadgeRow className='pill-context'>
                      <ProfileHeader className='d-flex js-bet'>
                        <div className='d-flex'>
                          {userDetails['assignment_details']['ClientAssignments']['Health Coach']['display_url'] ?
                        <IconsContainer className='w-46 br-50'>
                          <img src={userDetails['assignment_details']['ClientAssignments']['Health Coach']['display_url']} alt="User" />
                        </IconsContainer>:
                        <ProDefImage className='w-40'>{userDetails['assignment_details']['ClientAssignments']['Health Coach']['name'] ?
                        userDetails['assignment_details']['ClientAssignments']['Health Coach']['name'].charAt(0) +
                        userDetails['assignment_details']['ClientAssignments']['Health Coach']['name'].charAt(1) :''}</ProDefImage>
                          }
                          <ContentSection onClick={()=>{
                            updateView(true);
                            updateDKey('Health Coach');
                          }}>
                            <BodyText3>{userDetails['assignment_details']['ClientAssignments']['Health Coach']['name']}</BodyText3>
                            <BodyText3>Care Manager</BodyText3>
                          </ContentSection>
                        </div>
                        <IconsContainer className='clr-green'
                          onClick={()=>{
                            updateView(true);
                            updateDKey('Health Coach');
                          }}>
                          <Icon name="chervonRightN"/>
                        </IconsContainer>
                      </ProfileHeader>
                    </BadgeRow>
                    {userDetails['assignment_details']['md_assigned'] ? <BadgeRow className='pill-context'>
                      <ProfileHeader className='d-flex js-bet'>
                        <div className='d-flex'>
                          {userDetails['assignment_details']['ClientAssignments']['MD']['display_url'] ?
                        <IconsContainer className='w-46'>
                          <img src={userDetails['assignment_details']['ClientAssignments']['MD']['display_url']} alt="User" />
                        </IconsContainer>:
                        <ProDefImage className='w-40'>{userDetails['assignment_details']['ClientAssignments']['MD']['name'] ?
                        userDetails['assignment_details']['ClientAssignments']['MD']['name'].charAt(0) +
                        userDetails['assignment_details']['ClientAssignments']['MD']['name'].charAt(1) :''}</ProDefImage>
                          }
                          <ContentSection onClick={()=>{
                            updateView(true);
                            updateDKey('MD');
                          }}>
                            <BodyText3> {userDetails['assignment_details']['ClientAssignments']['MD']['name'] ?
                            userDetails['assignment_details']['ClientAssignments']['MD']['name'] : '---' }</BodyText3>
                            <BodyText3>MD</BodyText3>
                          </ContentSection>
                        </div>
                        <IconsContainer className='clr-green' onClick={()=>{
                          updateView(true);
                          updateDKey('MD');
                        }}>
                          <Icon name="chervonRightN"/>
                        </IconsContainer>
                      </ProfileHeader>
                    </BadgeRow> : null}
                  </div> :
                  <div className={'d-flex gap-15 mt-20 pt-30 js-around'}>
                    <BadgeRow className='vertical-cont'>
                      <ProfileHeader className='col'>
                        <IconsContainer className='w-46 text-center'>
                          <img src={userDetails['assignment_details']['ClientAssignments']['Health Coach']['display_url'] ?
                            userDetails['assignment_details']['ClientAssignments']['Health Coach']['display_url'] :cmImg} alt="User" />
                        </IconsContainer>
                        <ContentSection className='m-auto text-center'>
                          <BodyText3>{userDetails['assignment_details']['ClientAssignments']['Health Coach']['name']}</BodyText3>
                          <BodyText3 className='clr-gray'>Health Coach</BodyText3>
                          <BodyText3 className='clr-green'
                            onClick={()=>{
                              updateView(true);
                              updateDKey('Health Coach');
                            }}>View Profile</BodyText3>
                        </ContentSection>
                      </ProfileHeader>
                    </BadgeRow>
                    <BadgeRow className='vertical-cont' >
                      <ProfileHeader className='col'>
                        <IconsContainer className='w-46 text-center'>
                          <img src={userDetails['assignment_details']['ClientAssignments']['Health Coach']['display_url'] ?
                            userDetails['assignment_details']['ClientAssignments']['Health Coach']['display_url'] :cmImg} alt="User" />
                        </IconsContainer>
                        <ContentSection className='text-center m-auto'>
                          <BodyText3>{userDetails['assignment_details']['ClientAssignments']['Health Coach']['name']}</BodyText3>
                          <BodyText3 className='clr-gray'>Care Manager</BodyText3>
                          <BodyText3 className='clr-green'
                            onClick={()=>{
                              updateView(true);
                              updateDKey('Health Coach');
                            }}>View Profile</BodyText3>
                        </ContentSection>
                      </ProfileHeader>
                    </BadgeRow>
                    {/* <BadgeRow className='vertical-cont'>
                      <ProfileHeader className='col'>
                        <IconsContainer className='w-46  text-center'>
                          <img src={userDetails['assignment_details']['ClientAssignments']['md_assigned'] ?
                            userDetails['assignment_details']['ClientAssignments']['MD']['display_url'] :cmImg} alt="User" />
                        </IconsContainer>
                        <ContentSection className='text-center m-auto'>
                          <BodyText3>{userDetails['assignment_details']['ClientAssignments']['md_assigned'] ?
                          userDetails['assignment_details']['ClientAssignments']['MD']['name'] : '--'}</BodyText3>
                          <BodyText3 className='clr-gray'>MD</BodyText3>
                          <BodyText3 className='clr-green'
                            onClick={()=>{
                              updateView(true);
                              updateDKey('MD');
                            }}>View Profile</BodyText3>
                        </ContentSection>
                      </ProfileHeader>
                    </BadgeRow> */}
                  </div> }
                </BadgeContainer>
                {!isMobile ? <BadgeContainer className='pos-unset mt-50 ptb-30 align-self' >
                  <BadgeRow onClick={()=> navigate('/recommendations')}>
                    <BadgeHeading>
                  Daily Goals
                    </BadgeHeading>
                    {userDetails['goals'].length ?<BodyText3 className='clr-green f-16 m-0'>View all</BodyText3> :
                    null}
                  </BadgeRow>
                  <BadgeRow className='p-10 pb-30 over-x-hid' >
                    {!userDetails['goals'].length ? <BadgeLabel className='clr-gray p-0'>
                    Attend your first appointment and you’ll start receiving daily goals!</BadgeLabel>:
<BadgeRow className={isMobile ? 'pills-trans mt-20 fl-col d-flex' : 'pills-trans d-flex'}>
  {recLabels.map((info:any, i:number)=>{
    return (
      <BadgePill key={i} className="clr-trans no-pointer">
        <IconsContainer className="w-20">
          <Icon name= {info['icon']}/>
        </IconsContainer>
        {info['name']}
      </BadgePill>
    );
  })
  }
</BadgeRow>
                    }
                  </BadgeRow>
                  <BadgeRow className='pd-20-br'>
                    <BadgeHeading>
                  Health Journey
                    </BadgeHeading>
                    {userDetails['goals'].length ?<BodyText3 className='clr-green f-16' onClick={()=> navigate('/health-journey')}>
                  View Journey</BodyText3> : null}
                  </BadgeRow>
                  {!userDetails['goals'].length ?<>
                    {stats ? <>
                      <BadgeRow className={isMobile ? 'flx plr-25' : 'flx'}>
                        <BadgeHeading>
                          {stats['completedPhasesOfCareCount']+ ' of '+stats['phasesOfCareCount'] +' phases'}
                        </BadgeHeading>
                        <GProgressBar>
                          <GProgressBarFill
                            width={stats['phasesOfCareCount'] > 0 ?((stats['completedPhasesOfCareCount'] / stats['phasesOfCareCount']) * 100) + '%' : '0%'}>
                          </GProgressBarFill>
                        </GProgressBar>
                      </BadgeRow>
                      <div className={isMobile ? '' : 'd-flex gap-15 mt-20'}>
                        <BadgeRow className={isMobile ? 'flx plr-25 flex-1' : 'flx flex-1'}>
                          <BadgeHeading>
                            {stats['subscriptionPaymentsReceivedCount']+ ' of '+stats['subscriptionPlanDuration'] +' months'}
                          </BadgeHeading>
                          <GProgressBar className='dr-orange'>
                            <GProgressBarFill className='dr-orange'
                              width={stats['subscriptionPlanDuration'] > 0 ?((stats['subscriptionPaymentsReceivedCount'] / stats['subscriptionPlanDuration']) * 100) + '%' :'0%'}>
                            </GProgressBarFill>
                          </GProgressBar>
                        </BadgeRow>
                        <BadgeRow className={isMobile ? 'flx plr-25 flex-1' : 'flx flex-1'}>
                          <BadgeHeading>
                            {stats['attendedAppointmentsCount']+ ' of '+stats['totalAppointmentsCount'] +' appointments'}
                          </BadgeHeading>
                          <GProgressBar className='dr-orange'>
                            <GProgressBarFill className='dr-orange'
                              width={stats['totalAppointmentsCount'] >0 ?((stats['attendedAppointmentsCount'] / stats['totalAppointmentsCount']) * 100) + '%' : '0%'}>
                            </GProgressBarFill>
                          </GProgressBar>
                        </BadgeRow>
                      </div>
                    </> :
                  <>
                    <BadgeRow className='flx'>
                      <BadgeHeading>
              1 of 4 phases
                      </BadgeHeading>
                      <GProgressBar>
                        <GProgressBarFill width='80%'>
                        </GProgressBarFill>
                      </GProgressBar>
                    </BadgeRow>
                    <div className={isMobile ? '' : 'd-flex gap-15'}>
                      <BadgeRow className='r-1 flex-1'>
                        <BadgeHeading className='sub-head2 bdr-orange'>
              0 of 6 months
                        </BadgeHeading>
                      </BadgeRow>
                      <BadgeRow className='r-1 flex-1'>
                        <BadgeHeading className='sub-head2 bdr-orange'>
              0 of 6 appointments
                        </BadgeHeading>
                      </BadgeRow></div>
                  </>}
                  </>:
                  <BadgeRow className={isMobile ? 'pills-trans mt-20 fl-col d-flex over-x-hid' : 'pills-trans mt-20 d-flex over-x-hid'}>
                    {trackList.map((info:any, i:number)=>{
                      return (
                        <BadgePill key={i} className="clr-trans no-pointer">
                          <IconsContainer className={info['class'] +
                             ' track-icons w-20 pr-15'}>
                            <Icon name= {info['icon']}/>
                          </IconsContainer>
                          <div>
                            {info['desc']}
                          </div>
                        </BadgePill>
                      );
                    })
                    }
                  </BadgeRow>}
                </BadgeContainer> : null}
              </div>
              {!isMobile ?<BadgeContainer className='pos-unset mt-50 ptb-30' >
                <BadgeRow onClick={()=> navigate('/appointments')}>
                  <BadgeHeading>
                  My Appointments
                  </BadgeHeading>
                  <BadgePill>
                    View All
                  </BadgePill>
                </BadgeRow>
                {appointmentsList.slice(0, limit).map((info:any, i:number)=>{
                  return (
                    <BadgeRow key={i}>
                      <ContentBox>
                        {isMobile ?<BadgeLabel>
                          {dateFormats(info['start_date'], 'dddd MMMM Do')}
                          <br></br> <b>{dateFormats(info['start_date'], 'h:mm a')} -
                            {dateFormats(info['end_date'], 'h:mm a')} </b>
                        </BadgeLabel>:
                        <div className='d-flex gap-15 flex-1'>
                          <IconsContainer className='d-flex'>
                            <ImageWrapper className='w-50'>
                              <img src={info['health_coach']['display_url']}
                                alt="User" />
                            </ImageWrapper>
                            <ImgTitle className='f-18'>
                              {info['health_coach']['name']}
                            </ImgTitle>
                          </IconsContainer>
                          <BadgeLabel className='w-500'>
                            {dateFormats(info['start_date'], 'dddd MMMM Do ')}
                            {dateFormats(info['start_date'], 'h:mm a')} -
                            {dateFormats(info['end_date'], 'h:mm a')}
                          </BadgeLabel>
                        </div>
                        }
                        { !info['acuity_appointment_status'] ? <div className='pos-rel'>
                          <IconsContainer onClick={()=> setSelectedIndex(-1)} className="z-10">
                            <Icon name="menu"/>
                          </IconsContainer>
                          {(selIndex === i)&& <Menu>
                            <MenuItem onClick={()=> updateAppInfo(info)}>
                            Reschdule/Cancel
                            </MenuItem>
                          </Menu>}
                        </div>:null}
                      </ContentBox>
                    </BadgeRow>
                  );
                })
                }
                {count > limit ?<BadgeRow>
                  <ContentBox className='mb-0'>
                    <BadgeLabel onClick={()=> navigate('/appointments')}>
                      {'+ '}{(count - limit)+' more'}
                    </BadgeLabel>
                  </ContentBox>
                </BadgeRow>: null}
              </BadgeContainer> : null}
            </ContentContainer>
          </DesktopWidth>

        </ScrollSection>
        }
        {isMobile ? <BotoomHeader/> : null}
      </MainContainer> : null}
    </>
  );
}
