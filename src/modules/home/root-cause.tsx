/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import React, {useEffect, useRef} from 'react';
import Header from '@app/components/header';
import Icon from '@app/components/icon/icon';
import {
  Description, PdfLinkContainer, PdfLinks,
} from '@app/components/layout-onBoarding/layout-onBoarding-components';
import {whiteColor} from '@app/styles';
import {gaAction} from '@app/googleAnalytics/googleAnalytics';
import {Mixpanel} from '@app/App';
import {action} from '@app/mixpanel/Service';
// import hcPen from '@app/assets/images/cm11.png';
import ViewDialog from '@app/components/alert-dialog/view-dialog';

import {
  DesktopWidth,
  GWSliderCard,
  GWSliderContentHolder,
  GWSliderImageHolder,
  GWSliderSection,
  Heading2,
  Heading3,
  // Link,
  // Link,
  Loader,
  MainContainer,
  RootcauseDue,
  // ProDefImage,
} from '@app/styles/common-styles';
import {dateFormats} from '@app/utils/dateformat';
// import moment from 'moment';
import {useState} from 'react';
import {isMobile} from 'react-device-detect';
import gtag from 'ga-gtag';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import {
  BackDrop,
  ContentContainer, DialogContainer, ExpectationContainer, IconsContainer, ImageWrapper,
  //  IconsContainer,
  // ImageWrapper,`
} from '../assesment-questions/assesment-questions-components';
import {useNavigate, useParams} from 'react-router-dom';
import apiEndpoint from '@app/core/apiend_point';
import {
  BadgeLabel,
  BadgePill,
  // BadgePill,
  // BadgeRow,
  // GWDivider,
  // GWColumn,
  // GWColumnLeft,
  // HealthCoachAttendedCardsWrapper,
  HealthCoachCardsWrapper,
  HeroBannerHealthCoachCard,
  HomeBannerContainer,
  HomeCard,
  // GWColumnRight,
  // HealthCoachCardText2,
  // HeroBannerHeading,
  // HeroBannerHealthCoachCard,
  // HeroBannerSection,
  // HeroBannerSubHeading,
  // HomeTaskCards,
  // HomeTestCardTitle,
  // HomeToDoCardContainer,
  HomeToDoCards,
  HomeToDoCardStatus,
  HomeToDoCardTitle,
  ImgContainer,
  // InflamtionContent,
  MobTodoHeader,
  Plancard,
  PlanTime,
  // Plancard,
  // HomeWrapper,
  // LeftHomeContainer,
  RootcauseBannerSection,
  RootHomeHeader,
  RootHomeLeftContainer,
  RootHomeRightContainer,
  // TextContainter,
  ToDoCardsWrapper,
  // ViewProfile,
  // ViewProfile,
} from './home-components';
import {ApiResponseProps, PayloadProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import {
  getLocalStorage, setLocalStorage,
} from '@app/core/localStorageService';
import {ScrollSection}
  from '../boarding-screens/component/boarding-screen-components';
import Spinner from '@app/components/icon/icons/loader';
import BotoomHeader from '@app/components/footer-menu';
import Button from '@app/components/button';
// import Viewpdf from '@app/components/viewpdf';
import ReactPdf from '@app/components/react-pdf/reactPdf';
import {Actions, PlanCardsWrapper} from '../sign-up/component/signup.components';
import RootcauseHomeImg from '@app/assets/images/rootcause_home_img.png';
import moment from 'moment-timezone';
import cmImg from '@app/assets/images/userIcon.png';
import MainJumstartBG from '@app/assets/images/Main_jumpstart_BG.png';
import ComprehensiveBG from '@app/assets/images/comprehensive_planBG.png';
import Download from '@app/assets/images/download.png';
import CommonSnackbar from '@app/core/snackbar';
// import moment from 'moment';
// import {RightContainer, RightContent} from '../sign-up/component/signup.components';
/**
 * Renders Component.
 * @return {BoardingScreen} renders Component.
 */
export default function homeroot() {
  const [userDetails, updateUserDetails] = useState({});
  const [stories, updateStories] = useState([]);
  const [loader, setLoader] = useState(true);
  const [viewDialog, updateView] = useState(false);
  const [viewPdfDoc, setViewPdfDoc] = useState(false);
  // const [firstAppointmentsList, setFirstAppointmentsList] = useState([]);
  const [todos, setTodos] = useState<any>();
  // const [showCompleted, setShowCompleted] = useState(false);
  // const [show, updateShow] = useState(false);
  const [homeScreenContent, setHomeScreenContent] = useState('primary');
  const currentDate = moment(new Date()).tz('GMT');
  const [showPopup, setShowPopup] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState<any>([]);
  const [rootcauseMessage, setRootcauseMessage] = useState<any>([]);
  const {status}: any = useParams();
  const [appointmentscheduled, setAppointmentScheduled] = useState(false);
  const [appointmentAttend, setApoointmentAttend] = useState(false);
  const [showFullMessage, setShowFullMessage] = useState(false);
  const [showPdfLinkContainer, setShowPdfLinkContainer] = useState(false);
  const ref = useRef(null);
  const token = getLocalStorage('token') ? getLocalStorage('token') : '';
  const [appointmentStartDate, setAppointmentStartDate] = useState();
  const navigate = useNavigate();
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const [clickableTodos, setClickableTodos] = useState<any>();
  const [showSectionMsg, setShowSectionMsg] = useState(false);
  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          // slidesToScroll: 1,
          swipeToSlide: true,
          infinite: false,
        },
      },
    ],
  };
  useEffect(()=>{
    getAppointmentDetails();
    const handler = (e: any) => {
      if (!ref.current?.contains(e.target)) {
        setShowPdfLinkContainer(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () =>{
      document.removeEventListener('mousedown', handler);
    };
  }, [status]);

  const getAppointmentDetails = async () => {
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: `${apiEndpoint.rootcauseAppointments}/${('?offset=' + offset)}`,
      headers: {Authorization: getLocalStorage('token')},
    };
    await triggerApi(apiObject).then((response: ApiResponseProps) => {
      if (response.status_code == 200) {
        setAppointmentDetails(response.data.appointment);
        let appoint: any = dateFormats(response.data.appointment.start_date, 'LLL');
        appoint = appoint.substring(0, appoint.length - 2);
        console.log(appoint);
        setAppointmentStartDate(appoint);
        setRootcauseMessage(response.data.message);
        // console.log(response.data.message.notes.trim());
        if (response.data && response.data.appointment.status) {
          if (response.data.appointment.status.code === 'scheduled' || response.data.appointment.status.code === 'late-rescheduled' || response.data.appointment.status.code === 'rescheduled') {
            setAppointmentScheduled(true);
          } else if (response.data.appointment.status.code === 'attended' || response.data.appointment.status.code === 'late-show' || response.data.appointment.status.code === 'no-show' ) {
            setApoointmentAttend(true);
          }
        }
      }
    });
  };
  useEffect(()=>{
    getStories();
    if (status === 'Initial') {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
    setLocalStorage('pathname', window.location.pathname);
    localStorage.removeItem('path');
    const userData =
     getLocalStorage('userData') ? JSON.parse(getLocalStorage('userData')): {};
    updateUserDetails(userData);
    if (userData?.subscription_plan_info?.plan_slug==='jumpstart' || userData?.subscription_plan_info?.plan_slug==='comprehensive') {
      navigate('/home');
    }
    // if (
    //   userData['inflamation_test_ordered'] ||
    //   userData['root_cause_quiz_submitted'] ||
    //   userData['timeline_quiz_submitted'] ||
    //   userData['assignment_details'] ||
    //   userData['assignment_details']['hc_assigned'] ||
    //   userData['test_results_updated'] || userDetails['remaining_appointments'] < 1
    // ) {
    setLoader(true);
    getProfileData();
    // }
    // else {
    // setLoader(false);
    // getFirstAppointment();
    // }
    getTodos();
  }, []);

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
        setTodos(data);
        setLocalStorage('todoData', JSON.stringify(data));
        const userData =
        getLocalStorage('userData') ? JSON.parse(getLocalStorage('userData')): {};
        const clickableTodo = data.filter((item) => item.mark_as_completed === false);
        setClickableTodos(clickableTodo);
        if (userData['inflamation_test_ordered']) {
          setHomeScreenContent('results_processing');
          const list1 = data.filter((item) => item['code'] === 'CONFIRM_TEST_KIT' || item['code'] === 'COLLECTION_INFLAMMATION_SAMPLE');
          if ((list1[0] && list1[0].mark_as_completed) && (list1[1] && list1[1].mark_as_completed)) {
            setHomeScreenContent('results_processing');
            if (userData['test_results_updated']) {
              setHomeScreenContent('results_completed');
            }
          } else {
            setHomeScreenContent('primary');
          }
        } else {
          const list1 = data.filter((item) => item['code'] === 'TAKE_TIMELINE_ANALYSIS' || item['code'] === 'TAKE_IMBALANCE_ANALYSIS');
          if ((list1[0] && list1[0].mark_as_completed) && (list1[1] && list1[1].mark_as_completed)) {
            setHomeScreenContent('results_processing');
            if (userData['test_results_updated']) {
              setHomeScreenContent('results_completed');
            }
          } else {
            setHomeScreenContent('primary');
          }
        }

        // list1.map((todo: any) => {
        //   console.log(todo);
        //   if (todo.mark_as_completed && userData['test_results_updated']) {
        //     setHomeScreenContent('results_completed');
        //   } else {
        //     setHomeScreenContent('results_processing');
        //   }
        // });
        data.map((todo: any)=>{
          if (todo.mark_as_completed === true) {
            console.log(todo.mark_as_completed);
            // setShowCompleted(true);
          };
          // if (((todo.order === 4 && todo.order === 5) && todo.mark_as_completed)) {
          //   if (userData['test_results_updated']) {
          //     console.log('test1');
          //     setHomeScreenContent('results_completed');
          //   } else {
          //     console.log('test2');
          //     setHomeScreenContent('results_processing');
          //   }
          // }
          // if (((todo.code === 'CONFIRM_TEST_KIT') && (todo.mark_as_completed === true) || ((todo.code === 'COLLECTION_INFLAMMATION_SAMPLE') && (todo.mark_as_completed === true))) ) {
          //   console.log('test1');
          //   if ((todo.code === 'CONFIRM_TEST_KIT') && (todo.mark_as_completed === true)) {
          //     console.log('test2');
          //     if (userData['test_results_updated']) {
          //       setHomeScreenContent('results_completed');
          //     } else {
          //       setHomeScreenContent('results_processing');
          //     }
          //   }
          // }
        });
      }
    });
  };
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
        setLoader(false);
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
        // if (
        //   Data['inflamation_test_ordered'] &&
        //   Data['root_cause_quiz_submitted'] &&
        //   Data['timeline_quiz_submitted'] &&
        //   Data['assignment_details'] &&
        //   Data['assignment_details']['hc_assigned'] &&
        //   Data['test_results_updated']
        // ) {
        //   getFirstAppointment();
        // } else {
        //   setLoader(false);
        // }
      }
    });
  };
  // const restrictUser = sessionStorage.getItem('resctrict_user_actions');

  // const getFirstAppointment = async () => {
  //   if (!location.pathname.includes('home')) {
  //     return;
  //   }
  //   const filter = `?onlyFirstAppointment=${'one'}`;
  //   const apiObject: PayloadProps = {
  //     payload: {},
  //     method: 'GET',
  //     apiUrl: apiEndpoint.appointmentList + filter,
  //     headers: {Authorization: getLocalStorage('token') ? getLocalStorage('token') : ''},
  //   };
  //   await triggerApi(apiObject).then((response: ApiResponseProps) => {
  //     if (response.status_code === 200) {
  //       const data = response.data.result;
  //       // setFirstAppointmentsList(data);
  //       setLoader(false);
  //       if (location.pathname.includes('home')) {
  //         // const TimeInterval = setInterval(() => {
  //         //   getFirstAppointment();
  //         // }, 9000);
  //         // return () => clearInterval(TimeInterval);
  //         if (data.length && (data[0].status['code'] != 'attended' && data[0].status['code'] != 'late-show') ) {
  //           setTimeout(() => {
  //             getFirstAppointment();
  //           }, 10000);
  //         }
  //       }
  //     }
  //   });
  // };
  const backToTest = () => {
    // setOpenDialog(true);
    setViewPdfDoc(false);
  };
  const getStories = async () => {
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.caseStudies,
      headers: {Authorization: getLocalStorage('token')},
    };
    await triggerApi(apiObject).then((response: ApiResponseProps) => {
      if (response.status_code == 200) {
        updateStories(response.data);
      } else {
        updateStories([]);
      }
    });
  };
  const todoRedirection = (data) =>{
    console.log(data);
    if (data.code === 'REGISTER_INFLAMMATION_TEST') {
      navigate('/inflammation-home');
    } else if (data.code === 'TAKE_TIMELINE_ANALYSIS') {
      navigate('/timeline-quiz');
    } else if (data.code === 'TAKE_IMBALANCE_ANALYSIS') {
      navigate('/rootcause-assessment');
    } else if (data.code === 'CONFIRM_TEST_KIT') {
      navigate('/confirmation-testkit');
    } else if (data.code === 'COLLECTION_INFLAMMATION_SAMPLE') {
      navigate('/inflammation-sample');
    } else if (data.code === 'BOOK_APPOINTMENT_WITH_HC') {
      navigate('/book-initial-appointment');
    } else if (data.code === 'RECEIVE_YOUR_REPORT') {
      navigate('/receive-report');
    }
  };
  const showDue = (duedate: any) => {
    const dueDate = moment(duedate);
    const duration = moment.duration(dueDate.diff(currentDate));
    const hours = duration.asHours();
    const minutes = duration.asMinutes();
    const curDate: any = new Date();
    const curDateSplit = dateFormats(curDate, 'MMM DD');
    const markDate = dateFormats(duedate, 'MMM DD, h:mm A');
    const markSplit = markDate.split(',');
    const due = markSplit[0].slice(4);
    const curr = curDateSplit.slice(4);
    console.log(markSplit[0].slice(4), curDateSplit.slice(4));
    const tom = moment(duedate).add(0, 'days').calendar();
    console.log(tom);
    console.log(hours);
    if (minutes < 0) {
      return `Overdue`;
    } else if (hours > 0) {
      // setIsOverDue(false);
      if (due > curr) {
        return 'Due ' +
      dateFormats(
          duedate,
          'MMMM Do',
      );
      } else if (due === curr) {
        return 'Due today';
      }
      // return 'Due ' +
      // dateFormats(
      //     duedate,
      //     'MMMM Do',
      // );
    } else if (minutes > 0) {
      if (due > curr) {
        return 'Due ' +
      dateFormats(
          duedate,
          'MMMM Do',
      );
      } else if (due === curr) {
        return 'Due today';
      }
      // return 'Due ' +
      // dateFormats(
      //     duedate,
      //     'MMMM Do',
      // );
      // setIsOverDue(true);
    } else {
      // setIsOverDue(false);
      return `Overdue`;
    }
  };
  return (
    <>
      <CommonSnackbar
        title="Error"
        appearance={'error'}
        message={'Please complete the previous step in order to proceed.'}
        open={showSectionMsg}
        close={() => setShowSectionMsg(false)}
      />
      {showPopup && status === 'Initial' && (
        <BackDrop>
          <DialogContainer className="align-items-center">
            <div className='w-100 dflex jc-end gap-8'>
              <div className='pointer' onClick={() => {
                navigate('/rootcause-home');
              }}>
                <Icon name='closeIcon'/>
              </div>
            </div>
            <Heading2 className='text-center'>Success! You’ve booked an appointment with</Heading2>
            <BadgePill style={{backgroundColor: '#F9D4A9', padding: '4px 16px'}} className="pending activ no-pointer text-center no-pointer">
              Health Coach
            </BadgePill>
            <IconsContainer className="layout2">
              <ImageWrapper className="text-center m-10 w-160 br-50 d-flex jc-center mt-12 mb-16" style={{height: 'auto'}}>
                <img style={{width: '80px', height: '80px'}}
                  src={
                    appointmentDetails['health_coach'] && appointmentDetails['health_coach']['display_url'] ?
                    appointmentDetails['health_coach']['display_url']:
                      cmImg
                  }
                  alt="User"
                />
              </ImageWrapper>
              <BadgePill style={{fontSize: '17px', color: '#000'}} className="pending transparent text-center no-pointer">
                {
                  ((appointmentDetails['health_coach'] && appointmentDetails['health_coach'].first_name) + ' ' + (appointmentDetails['health_coach'] && appointmentDetails['health_coach'].last_name))
                }
              </BadgePill>
            </IconsContainer>
            {appointmentDetails['start_date'] ? (
              <RootcauseDue className="mb-24">
                {dateFormats(
                    appointmentDetails['start_date'],
                    'LLLL',
                )}
              </RootcauseDue>
            ) : null}
            <Button
              variant={'primary'}
              size="large"
              width="100%"
              onClick={() => {
                navigate('/rootcause-home');
                // setShowPopup(false);
                // location.reload();
              }}
              className={'flx-center'}
            >
              Continue to home
            </Button>
            {/* <Heading4
              onClick={() =>
                cancelAppoint(firstAppointmentsList[0])
              }
            >
              <span>Reschedule</span> or <span>Cancel</span>
            </Heading4> */}
          </DialogContainer>
        </BackDrop>
      )}
      {loader ? (
        <Loader>
          <Spinner size="6px" />
        </Loader>
      ) : null}
      {viewDialog && (
        <ViewDialog
          header={'Health Coach'}
          width={isMobile ? 'unset' : '441px'}
          onCancel={() => updateView(false)}
        />
      )}
      {viewPdfDoc && userDetails['test_results'] && userDetails['test_results'].length ?
       <ReactPdf pdfDoc={userDetails['test_results']} name={'Inflamation Test'} onClick={backToTest} /> : null}
      {/* {viewPdfDoc && userDetails['test_results'] && userDetails['test_results'].length ?
       <Viewpdf pdfDoc={userDetails['test_results']} name={'Inflamation Test'} onClick={backToTest} /> : null} */}

      {!loader && !viewPdfDoc ? <MainContainer bgColor={whiteColor}>
        <Header
          className="justify-content-between"
          bgCol={isMobile ? '#E9DCCE' : ''}
          desktopMenu={isMobile ? false : true}
          showMessage={true}
          chatData={'rootHome'}
          hideBack={true}
          hideBackArrow={true}
        />
        {
          <ScrollSection
            id="scrollable-div"
            className={
                isMobile ? 'flex-1 flex-unset mb-64' : 'flex-1 flex-unset '
            }
          >
            {/* if appointment is scheduled */}
            {appointmentscheduled ?
            <RootcauseBannerSection>
              <div
                className={isMobile ? ' m-auto' : ''}
              >
                <ContentContainer bgColor={'transparent'} className='rootcause_container'>
                  <h1 className='root_home_Welcome m-0'>Welcome, {userDetails['first_name']}!</h1>
                  <p className='root_home_text'>See what&apos;s happening today</p>
                  <HealthCoachCardsWrapper>
                    <HeroBannerHealthCoachCard bgColor={whiteColor}>
                      <div className='d-flex flex-column jc-center rootCauseResultsCard'>   <Icon name="roundCheck" />
                        <h3 className='scheduled-h3 m-0'>Congrats you’re booked!</h3>
                        <span className='scheduleSubCon mt-16 mb-24 text-center'>Please review your Root Cause Assessment results prior to your first appointment.</span>
                        <Actions>
                          <div style={{'position': 'relative'}}>
                            <Button variant={userDetails['test_results'] && userDetails['test_results'].length ? 'primary' : 'disabled'}
                              className={'responsive-Imbalance-btn'}
                              type="submit"
                              onClick={()=>{
                                if (userDetails['test_results'] && userDetails['test_results'].length) {
                                // openPdfViewDocumnet();
                                  setShowPdfLinkContainer(!showPdfLinkContainer);
                                  Mixpanel.track(action['tests']['testResult']['title'],
                                      action['tests']['testResult']['props']);
                                  gtag('event', gaAction['tests']['testResult']['title'], {
                                    'event_category': gaAction['tests']['testResult']['category'],
                                  });
                                }
                              }}
                              size='large' width='100%'
                            >Download Test Results</Button>
                            {showPdfLinkContainer && <PdfLinkContainer ref={ref}>
                              {/* <Link className='m-0 tx-n cursor-default'>Download Files</Link> */}
                              {/* <div> */}
                              {userDetails['test_results'].length > 0 && userDetails['test_results'].map((item, index)=>{
                                return (
                                  <PdfLinks key={index} onClick={()=>{
                                    window.open(`${process.env.REACT_APP_API_URL}client/download/testresults/${item['testResultId']}?token=${token.replace('Bearer ', '')}`);
                                  }}>
                                    <p title={item['document_name']}>
                                      {item['document_name']}
                                    </p>
                                    <img src={Download} alt='Download pdf button' width={20} />
                                  </PdfLinks>
                                );
                              })}
                              {/* </div> */}
                            </PdfLinkContainer>}
                          </div>
                        </Actions>
                      </div>
                    </HeroBannerHealthCoachCard>
                    <HeroBannerHealthCoachCard style={{borderTop: '10px solid #355F92'}} bgColor={whiteColor}>
                      <div className='hcCard_content' style={isMobile ? {marginBottom: '0px'} : {}}>Your next appointment</div>
                      <div className='d-flex flex-column jc-center rootCauseResultsCard'>
                        {!isMobile && <ImgContainer>{ appointmentDetails['health_coach']['display_url'] ? <img style={{objectFit: 'cover'}} src={appointmentDetails['health_coach']['display_url']}/> : <Icon name='user' />} </ImgContainer>
                        }                        <BadgePill style={{fontSize: '17px'}} className="pending transparent text-center no-pointer">
                          {
                            ((appointmentDetails['health_coach'] && appointmentDetails['health_coach'].first_name) + ' ' + (appointmentDetails['health_coach'] && appointmentDetails['health_coach'].last_name))
                          }
                        </BadgePill>
                        {appointmentDetails['start_date'] ? (
              <RootcauseDue className="mb-24">
                {appointmentStartDate}-{dateFormats(appointmentDetails['end_date'], 'h:mm a')}
              </RootcauseDue>
            ) : null}
                        <Button variant={(appointmentDetails['health_coach'] && appointmentDetails['health_coach'].zoom_link && appointmentDetails.zoom_link_enable) ? 'primary' : 'disabled'}
                          className={'responsive-Imbalance-btn'}
                          type="submit"
                          onClick={() => window.open(appointmentDetails['health_coach'] && appointmentDetails['health_coach'].zoom_link)}
                          size='large' width='100%'
                        >Join meeting</Button>
                      </div>
                    </HeroBannerHealthCoachCard>
                  </HealthCoachCardsWrapper>
                </ContentContainer>

              </div>
            </RootcauseBannerSection> :
            // if appointment is attended
            <>{(appointmentAttend) ?<>
              <RootcauseBannerSection bgColor={'#E9DCCE'}
                className={isMobile ? 'm-auto p-0' : 'm-auto'}>
                <div
                  className={isMobile ? ' m-auto' : ''}
                >
                  <ContentContainer style={{backgroundColor: '#E9DCCE'}} className='py-24 rootcause_container'>
                    <h1 className='withMsgHeader'>Congrats, you’ve completed your assessment!</h1>
                    <p className='conWithMsgHeader'>Next, review your care options to continue meeting with your coach.</p>
                    <PlanCardsWrapper>
                      <Plancard>
                        <div style={{height: '250px'}}><img className='w-100' src={MainJumstartBG} alt='jumpstartPlan'/> </div>
                        <div className='p-24' style={{background: '#FFFFFF'}}>
                          <div className='d-flex justify-content-between align-items-center'>
                            <PlanTime>3 MONTHS</PlanTime>
                            <div className='price' style={{color: '#1E3653', fontSize: '17px'}}>$125/month</div>
                          </div>
                          <h3 className='planheader my-16'>The Jumpstart Program</h3>
                          <Actions className='p-0' style={{alignItems: 'start'}}>
                            <Button variant={'secondary'}
                              className='responsive-btn plansButtonBackground'
                              type="submit"
                              onClick={() => {
                                navigate('/jumpstart-program');
                                Mixpanel.track(action['assesmentQues']['getStarted']['title'], action['assesmentQues']['getStarted']['props']);
                                gtag('event', gaAction['assesmentQues']['getStarted']['title'], {
                                  'event_category': gaAction['assesmentQues']['getStarted']['category'],
                                });
                              }}
                              size='large' width='100%'
                            >Learn more</Button>
                          </Actions>
                        </div>
                      </Plancard>
                      <Plancard>
                        <div style={{height: '250px'}}><img className='w-100' src={ComprehensiveBG} alt='jumpstartPlan'/> </div>
                        <div className='p-24' style={{background: '#FFFFFF'}}>
                          <div className='d-flex justify-content-between align-items-center'>
                            <PlanTime>6 MONTHS</PlanTime>
                            <div className='price' style={{color: '#1E3653', fontSize: '17px'}}>$199/month</div>
                          </div>
                          <h3 className='planheader  my-16'>Comprehensive program</h3>
                          <Actions className='p-0' style={{alignItems: 'start'}}>
                            <Button variant={'secondary'}
                              className='responsive-btn plansButtonBackground'
                              type="submit"
                              onClick={() => {
                                navigate('/comprehensive-program');
                                Mixpanel.track(action['assesmentQues']['getStarted']['title'], action['assesmentQues']['getStarted']['props']);
                                gtag('event', gaAction['assesmentQues']['getStarted']['title'], {
                                  'event_category': gaAction['assesmentQues']['getStarted']['category'],
                                });
                              }}
                              size='large' width='100%'
                            >Learn more</Button>
                          </Actions>
                        </div>
                      </Plancard>
                    </PlanCardsWrapper>
                  </ContentContainer>

                </div>
              </RootcauseBannerSection> </>:
               // Todo screen will appear
              <RootcauseBannerSection
                bgColor={'#E9DCCE'}
                className={isMobile ? 'm-auto p-0' : 'm-auto'}
              >
                <div
                  className={isMobile ? ' m-auto' : ''}
                >
                  <HomeBannerContainer>

                    <RootHomeLeftContainer>
                      <RootHomeHeader>Welcome, {userDetails['first_name']}!</RootHomeHeader>
                      {homeScreenContent === 'primary' && <div className='root_home_text m-0' style={{maxWidth: '500px'}}>Here is an overview of your root cause assessment journey and the steps you need to take to get your results.</div>}
                      {homeScreenContent === 'results_completed' &&
                        <>
                          <HomeCard>
                            <div className="image-container">
                              <img src={RootcauseHomeImg} alt='jumpstartPlan'/>
                            </div>
                            <div className="content-container">
                              <h3 className="title">Your root cause assessment results <span style={{fontWeight: '700'}}>are in!</span></h3>
                              <p className="content">Please book your appointment with your health coach & we will send you your results to review.</p>
                              <Actions>
                                <Button variant={((userDetails['assignment_details'] && userDetails['assignment_details']['ClientAssignments'] && userDetails['assignment_details']['ClientAssignments']['Health Coach']) && (userDetails['test_results_updated'])) ? 'primary': 'disabled'}
                                  className={'responsive-Imbalance-btn'}
                                  type="submit"
                                  onClick={() => {
                                    navigate('/book-initial-appointment');
                                  }}
                                  size='large' width='100%'
                                >Book my appointment</Button>
                              </Actions>
                              {userDetails['assignment_details'] && userDetails['assignment_details']['ClientAssignments'] && userDetails['assignment_details']['ClientAssignments']['Health Coach'] ? '' : <div className='mt-16 dflex gap-8'>
                                <div><Icon name='info' /></div>
                                <div className='info-icon' style={{textAlign: 'start'}}> Hi, looks like your test results are in. Please contact your care manager for matching the care team.</div></div>}
                            </div>
                          </HomeCard>
                        </>
                      }
                      {homeScreenContent === 'results_processing' &&
                        <>
                          <HomeCard style={isMobile ? {} : {width: '450px'}}>
                            <div className="content-container">
                              <h3 className="title">Your Root Cause Assessment is <span style={{fontWeight: '700'}}>processing</span></h3>
                              <p className="content">This will likely take 3-7 business days, please check back later.</p>
                            </div>
                          </HomeCard>
                        </>
                      }
                    </RootHomeLeftContainer>
                    <RootHomeRightContainer>
                      {/* <div
                      className={
                          isMobile ?
                            'HomeToDoCardsWrapper d-flex flex-wrap gap-10' :
                            'HomeToDoCardsWrapper flx-col-10 '
                      } style={{flex: '1 1 0%', justifyContent: 'center'}}
                    > */}
                      <MobTodoHeader>Your To Do List</MobTodoHeader>
                      <ToDoCardsWrapper style={!isMobile && (homeScreenContent !== 'primary') ? {marginTop: '66px'} : {}}>
                        {todos && todos.map((todo: any, index: number) => {
                          return (
                            <HomeToDoCards key={index}
                              className={`${isMobile ? 'w-100' : ''} ${todo.mark_as_completed ? 'checked' : 'un_checked'}
                              ${clickableTodos && clickableTodos[0] && clickableTodos[0].code === todo.code ? 'currentTodo' : 'notallow'} 
                              `}
                              onClick={() => {
                                if (clickableTodos && clickableTodos[0] && clickableTodos[0].code === todo.code) {
                                  todoRedirection(todo);
                                  Mixpanel.track(action['rootHome']['inflammationTest']['title'], action['rootHome']['inflammationTest']['props']);
                                  gtag('event', gaAction['rootHome']['inflammationTest']['title'], {
                                    'event-category': gaAction['rootHome']['inflammationTest']['category'],
                                  });
                                } else {
                                  setShowSectionMsg(true);
                                }
                              }}
                            >
                              <div className="flex-1 dflex justify-content-between gap-24">
                                <div className='d-flex gap-12 align-items-center'>
                                  {todo.mark_as_completed ? <Icon name='newCheckIcon' /> :
                                  <div className='orderStyles'>
                                    {index + 1}
                                  </div>}
                                  <HomeToDoCardTitle style={{flex: '1', marginBottom: '0'}}>
                                    {todo.name}
                                  </HomeToDoCardTitle>
                                </div>
                                <div className='dflex gap-12'>
                                  <div className='mt-3'>
                                    {(!isMobile && ((todo.code === 'REGISTER_INFLAMMATION_TEST') || (todo.code === 'TAKE_TIMELINE_ANALYSIS') || (todo.code === 'TAKE_IMBALANCE_ANALYSIS'))) && <HomeToDoCardStatus style={showDue(todo.due_date) === 'Overdue' ? {color: '#B11818'} : {} }>
                                      {(todo.mark_as_completed === true) ? '' : todo.due_date ?
                                          showDue(todo.due_date) :
                                          ''}
                                    </HomeToDoCardStatus>}
                                  </div>
                                  <div className='mt-5'>
                                    <Icon name='chervonRight' />
                                  </div>
                                </div>
                              </div>
                              {(isMobile && ((todo.code === 'REGISTER_INFLAMMATION_TEST') || (todo.code === 'TAKE_TIMELINE_ANALYSIS') || (todo.code === 'TAKE_IMBALANCE_ANALYSIS'))) && <HomeToDoCardStatus style={showDue(todo.due_date) === 'Overdue' ? {color: '#B11818'} : {} }>
                                {(todo.mark_as_completed === true) ? '' : todo.due_date ?
                                          showDue(todo.due_date) :
                                          ''}
                              </HomeToDoCardStatus>}
                            </HomeToDoCards>
                          );
                        },
                        )
                        }
                      </ToDoCardsWrapper>
                      {/* {showCompleted ? (
                              <BadgeRow
                                className="js-cen w-100"
                                onClick={() => {
                                  updateShow(!show);
                                  Mixpanel.track(
                                      action['Home']['showHide']['title'],
                                      action['Home']['showHide']['props'],
                                  );
                                  gtag('event', gaAction['Home']['showHide']['title'], {
                                    'event_category': gaAction['Home']['showHide']['category'],
                                  });
                                }}
                              >
                                <BadgeLabel
                                  className={isMobile ? 'f-16' : ' f-16'}
                                >
                                  <Link>
                                    {!show ?
                                      'Show completed tasks' :
                                      'Hide completed tasks'}
                                  </Link>
                                </BadgeLabel>
                              </BadgeRow>
                            ) : null} */}
                    </RootHomeRightContainer>

                  </HomeBannerContainer>
                </div>
              </RootcauseBannerSection>
            }</>

            }

            <GWSliderSection bgColor={(appointmentAttend && rootcauseMessage.notes) ? '#F8F5F0' : '#FFFFFF'}>
              {appointmentAttend && rootcauseMessage.notes ? <DesktopWidth style={{maxWidth: 'initial', width: 'unset'}}
                className={isMobile ? 'm-auto' : 'py-0'}
              >
                <ContentContainer
                  bgColor={'transparent'}
                  className={isMobile ? ' ' : 'py-0'}
                >
                  <div>
                    <div style={{flex: '1'}}>
                      <h1 className='root_home_Welcome mt-0 mb-24'>{
                        ((appointmentDetails['health_coach'] && appointmentDetails['health_coach'].first_name))
                      } sent you a message</h1>
                    </div>
                    <HeroBannerHealthCoachCard bgColor={whiteColor} style={{borderTop: 0, wordBreak: 'break-word'}}>
                      <div className='d-flex flex-column jc-center rootCauseResultsCard'>
                        <ImgContainer>{ appointmentDetails['health_coach'] && appointmentDetails['health_coach']['display_url'] ? <img style={{objectFit: 'cover', width: '64px', height: '64px'}} src={appointmentDetails['health_coach']['display_url']}/> : <Icon name='user' />} </ImgContainer>
                        <h3 className='scheduled-h3 m-0'></h3>
                        <span style={{fontSize: '20px'}} className='scheduleSubCon rootcause_msg mt-16 mb-24'>{rootcauseMessage.notes?.replaceAll(/\n\s*\n/g, '\n')}</span>
                        {/* <Button variant={'secondary'}
                          className={'responsive-Imbalance-btn'}
                          type="submit"
                          onClick={() => {
                            setShowFullMessage(true);
                          }}
                          size='large' width='100%'
                        >Read full message</Button> */}
                      </div>
                    </HeroBannerHealthCoachCard>
                  </div>
                </ContentContainer>
              </DesktopWidth> :
                <DesktopWidth style={isMobile ? {} : {maxWidth: 'initial'}}
                  className={isMobile ? 'w-1150 m-auto' : 'w-1150'}
                >
                  <ContentContainer
                    bgColor={'transparent'}
                    className={isMobile ? 'py-0' : 'py-0'}
                  >
                    <Heading3 className="align-left mt-8 mb-32">
                        Inspiration from our community
                    </Heading3>
                    <Slider {...sliderSettings}>
                      {stories.map((info, i) => {
                        return (
                          <div className="slideWrapper" key={i}>
                            <GWSliderCard>
                              <GWSliderImageHolder>
                                <img
                                  src={info['image_file_name']}
                                  alt="slider"
                                  className="slide-imgResponsive"
                                />
                              </GWSliderImageHolder>
                              <GWSliderContentHolder>
                                <div className="flex-1 ">
                                  <Description className="m-0 line-clamp-3">
                                    {info['description']}
                                  </Description>
                                </div>
                                <div className="clientBio">
                                  <div className=" clientDetails
                                    d-flex flex-column align-items-start">
                                    <span className="clientName">
                                      {info['name']}
                                    </span>
                                    <span className="clientAge">
                                        Age {info['age']}
                                    </span>
                                  </div>
                                  <BadgeLabel
                                    className={
                                        isMobile ?
                                          'get-details p-0 f-16' :
                                          'get-details p-0'
                                    }
                                    onClick={() => {
                                      window.open(info['doc_file_name']);
                                      Mixpanel.track(action['rootHome']['caseStudy']['title'], action['rootHome']['caseStudy']['props']);
                                      gtag('event', gaAction['rootHome']['caseStudy']['title'], {
                                        'event-category': gaAction['rootHome']['caseStudy']['category'],
                                      });
                                    }}
                                  >
                                      Read full case study
                                  </BadgeLabel>
                                </div>
                              </GWSliderContentHolder>
                            </GWSliderCard>
                          </div>
                        );
                      })}
                    </Slider>
                  </ContentContainer>
                </DesktopWidth>}
            </GWSliderSection>

          </ScrollSection>
        }
        {isMobile ? <BotoomHeader /> : null}

      </MainContainer> : null}
      {showFullMessage && <BackDrop>
        <ExpectationContainer style={isMobile ? {} : {width: '500px', maxHeight: '86%', overflow: 'auto'}}>
          <div className='pointer dflex justify-content-end' onClick={() => setShowFullMessage(false)}>
            <Icon name='closeIcon'/>
          </div>
          <ImageWrapper className="m-10 w-160 br-50 d-flex jc-center mt-12 mb-16" style={{height: 'auto'}}>
            <img style={{width: '80px', height: '80px'}}
              src={
                    appointmentDetails['health_coach'] && appointmentDetails['health_coach']['display_url'] ?
                    appointmentDetails['health_coach']['display_url']:
                      cmImg
              }
              alt="User"
            />
          </ImageWrapper>
          <h4 className='messageHcName m-0'>{((appointmentDetails['health_coach'] && appointmentDetails['health_coach'].first_name) + ' ' + (appointmentDetails['health_coach'] && appointmentDetails['health_coach'].last_name))
          }</h4>
          <div className='exprectInfo mt-16'>
            <span style={{wordWrap: 'break-word'}} className='scheduleSubCon mt-16 mb-24 text-center'>{rootcauseMessage.notes}</span></div>
          {console.log(rootcauseMessage.notes, 'gan')}
          <Actions className='mb-24'>
            <Button variant={'primary'}
              className={'responsive-Imbalance-btn'}
              type="submit"
              onClick={() => {
                navigate('/chat-end');
              }}
              size='large' width='100%'
            >Questions? Chat with Care</Button>
          </Actions>
        </ExpectationContainer>
      </BackDrop>}
    </>
  );
}

