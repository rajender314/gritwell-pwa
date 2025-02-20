/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import React, {useRef} from 'react';
import hcPen from '@app/assets/images/cm11.png';
import home1 from '@app/assets/images/done.png';
import cmImg from '@app/assets/images/userIcon.png';
import ViewDialog from '@app/components/alert-dialog/view-dialog';
import AppointmentMsgDialog from '@app/components/alert-dialog/appointment-message-dialog';
import Button from '@app/components/button/button';
import DatePicker from '@app/components/date-picker/date-picker';
import BotoomHeader from '@app/components/footer-menu';
import Header from '@app/components/header';
import Icon from '@app/components/icon/icon';
import Spinner from '@app/components/icon/icons/loader';
import {
  Description,
  ImageWrapper,
} from '@app/components/layout-onBoarding/layout-onBoarding-components';
import Tabs from '@app/components/tabs';
import apiEndpoint from '@app/core/apiend_point';
import {
  RecommandationLabels,
  RecommandationLabelsA,
} from '@app/core/labels-messages';
import {
  getLocalStorage,
  setLocalStorage,
} from '@app/core/localStorageService';
import CommonSnackbar from '@app/core/snackbar';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import {ApiResponseProps, PayloadProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import {whiteColor} from '@app/styles';
import {
  DesktopWidth,
  GWSliderCard,
  GWSliderContentHolder,
  GWSliderImageHolder,
  GWSliderSection,
  Heading3,
  Link,
  Loader,
  MainContainer,
  ProDefImage,
} from '@app/styles/common-styles';
import {dateFormats} from '@app/utils/dateformat';
import {Snackbar} from '@mui/material';
import _ from 'lodash';
import moment from 'moment';
import {useEffect, useState} from 'react';
import {isMobile, isSafari} from 'react-device-detect';
import gtag from 'ga-gtag';
import {useNavigate, useParams} from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import {
  BackDrop,
  ContentContainer,
  DialogContainer,
  IconName,
  IconsContainer,
} from '../assesment-questions/assesment-questions-components';
import {ScrollSection} from '../boarding-screens/component/boarding-screen-components';
import {Heading4} from '../recommend-plans/component/recommend-plans-components';
import {
  FilterPill,
  FilterRow,
  IconCount,
  SContent,
} from '../recommendations/recommendations-components';
import {
  BackGroundIcon,
  BadgeContainer,
  BadgeHeading,
  BadgeLabel,
  BadgePill,
  BadgeRow,
  GWColumn,
  GWColumnLeft,
  GWColumnRight,
  HealthCoachCardText2,
  HeroBannerHeading,
  HeroBannerHealthCoachCard,
  HeroBannerSection,
  HeroBannerSubHeading,
  HomeCardResultTitle,
  HomeTaskCards,
  HomeTestCardTitle,
  HomeToDoCardContainer,
  HomeToDoCards,
  HomeToDoCardStatus,
  HomeToDoCardTitle,
} from './home-components';

type Props = {
  selectedDate?: any;
  updateSelectedDate?: any;
};

/**
 * Renders Component.
 * @return {BoardingScreen} renders Component.
 */
export default function Home({selectedDate, updateSelectedDate}: Props) {
  const [firstAppointmentsList, setFirstAppointmentsList] = useState([]);
  const {status}: any = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [loader, setLoader] = useState(true);
  const [stasData, updateStatsData] = useState({});
  const [viewDialog, updateView] = useState(false);
  const [stories, updateStories] = useState([]);
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

  const restrictUser = sessionStorage.getItem('resctrict_user_actions');

  useEffect(() => {
    setLoader(true);
    if (status === 'Initial') {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
    getCustStats();
    const userData = getLocalStorage('userData') ?
      JSON.parse(getLocalStorage('userData')) :
      {};
    if (userData) {
      setLoader(true);
      if (getLocalStorage('pathname') === '/rootcause-home') {
        localStorage.removeItem('pathname');
        navigate(-1);
      }
      if (userData?.subscription_plan_info?.plan_slug==='rootcause' || userData?.subscription_plan_info?.plan_slug==='rootcause_without_inflamation') {
        navigate('/rootcause-home');
      }
      // updateUserDetails(userData);
      // getFirstAppointment();
    }
    // else {
    setLoader(true);
    getProfileData();
    // }
    // getProfileData();
    // if (
    //   !userData['intake_submitted'] ||
    //   !userData['symptom_analysis_submitted'] ||
    //   !userData['assignment_details'] ||
    //   !userData['assignment_details']['hc_assigned']
    // ) {
    //   setLoader(true);
    //   getProfileData();
    // }
    getStories();
    // const TimeInterval = setInterval(() => {
    // }, 9000);
    // return () => clearInterval(TimeInterval);
    Mixpanel.track(service['home']['title'], service['home']['props']);
    gtag('event', gaService['home']['title'], {
      'event_category': gaService['home']['category'],
    });
  }, []);
  const [userDetails, updateUserDetails] = useState({});
  const [reLoader, updateReLoader] = useState(true);
  const [selectedTab, setTab] = useState(RecommandationLabels[0]);
  const token = getLocalStorage('token') ? getLocalStorage('token') : '';
  const [recommendations, updateRecommendations] = useState({});
  const [selDate, setSelDate] = useState(new Date());
  const [selRow, updateSelRow] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [currIndex, updateCurrIndex] = useState(0);
  const [remTasks, updateRemTasks] = useState<any>('');
  const [totalTasks, updateTotalTasks] = useState<any>('');
  const [show, updateShow] = useState(true);
  const [showSectionMsg, setShowSectionMsg] = useState(false);
  const [hide, updateHide] = useState(false);
  // const [count, updateCount] = useState(0);
  const [cartItems, updateCartItems] = useState([]);
  const [reShowPopup, setReShowPopup] = useState(false);
  const [isTriggered, setIsTriggered] = useState(false);
  const [reViewDialog, updateReView] = useState(false);
  const userDataRef = useRef({});
  const [selKey, updateSelKey] = useState('today');
  const [date, updateDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [isDataLoading, dataLoaded] = useState(true);
  const dialogRef = useRef(null);
  useEffect(()=>{
    const handler = (e: any) => {
      if (!dialogRef.current?.contains(e.target)) {
        setOpenDialog(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () =>{
      document.removeEventListener('mousedown', handler);
    };
  }, []);
  moment.locale('ko', {
    week: {
      dow: 1,
      doy: 1,
    },
  });
  const navigate = useNavigate();
  useEffect(() => {
    updateShow(true);
    updateReLoader(true);
    const userData = getLocalStorage('userData') ? JSON.parse(getLocalStorage('userData')): {};
    updateUserDetails(userData);
    getRecods(new Date());
    setSelDate(new Date());
    updateSelKey('today');
    updateHide(isMobile ? false : true);
  }, []);
  /**
   * @param {string} tab label value
   *On Tab Change.
   *  */
  function onSelectedTabClick(tab: string) {
    setTab(tab);
    Mixpanel.track(
        `${tab} ${action['Home']['click']['title']}`,
        action['Home']['click']['props'],
    );
    gtag('event', `${tab} ${gaAction['Home']['click']['title']}`, {
      'event_category': gaAction['Home']['click']['category'],
    });
  }
  const getRecods = async (date, isUpdate?: any) => {
    if (!isUpdate) {
      dataLoaded(true);
    }
    const convrtDate = dateFormats(date, 'YYYY-MM-DD');
    const filter = `?planDate=${convrtDate}`;
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.recommendations + filter,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject).then((response: ApiResponseProps) => {
      if (response.status_code === 200) {
        const Data = response.data;
        getCartItems(response.data['healthPlanId']);
        if (Data['nutritions']) {
          Data['All'] = [
            ...Data['nutritions'],
            ...Data['lifestyle'],
            ...Data['supplements'],
          ];
          const completed =
            Data['nutritionsCount'] +
            Data['supplementsCount'] +
            Data['lifeStyleCount'];
          const pending =
            Data['markasCompletedLifestylesCount'] +
            Data['markasCompletedNutritionsCount'] +
            Data['markasCompletedSupplementsCount'];
          const remainingTasks = completed - pending;
          updateRemTasks(remainingTasks);
          updateTotalTasks((pending / completed) * 100);
          if (completed < 1) {
            updateRecommendations({});
            updateReLoader(false);
            updateRemTasks(-1);
            updateTotalTasks(0);
          }
          dataLoaded(false);
        }
        updateRecommendations(Data);
        updateReLoader(false);
      } else {
        updateRecommendations({});
        updateReLoader(false);
        updateRemTasks(-1);
        updateTotalTasks(0);
        dataLoaded(false);
      }
    });
  };
  const checkSubscriptionStatus=(uData)=>{
    // return (daysDiffDuration(uData['subscription_end_date']) > 29) ? true :false;
    const SubEndDtOneMonth = moment(uData.subscription_end_date)
        .subtract(1, 'month')
        .format();
    if (new Date(SubEndDtOneMonth) > new Date()) {
      return true;
    } else {
      return false;
    }
  };
  const markComplete = async (info, date) => {
    if (moment().diff(dateFormats(date, 'YYYY-MM-DD'), 'seconds') < 0) {
      return;
    }
    const params = {
      completedDate: dateFormats(date, 'YYYY-MM-DD'),
      healthPlanItemId: info._id,
      healthPlanItemType: selectedTab,
      healthPlanId: recommendations['healthPlanId'],
    };
    const apiObject: PayloadProps = {
      payload: params,
      method: 'POST',
      apiUrl: apiEndpoint.markAsComplete,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject).then((response: ApiResponseProps) => {
      if (response.status_code === 200) {
        const currRow = {...selRow};
        currRow['markasCompleted'] = true;
        updateSelRow(currRow);
        const list = [...recommendations[selectedTab]];
        const idx = _.findIndex(list, function(o: any) {
          return o._id === info._id;
        });
        list[idx]['markasCompleted'] = true;
        list[idx]['markasCompletedId'] = response.data['_id'];
        updateSelRow(list[idx]);
        recommendations[selectedTab] = list;
        updateRecommendations(recommendations);
        updateShow(true);
        getRecods(selDate, true);
        setShowSectionMsg(true);
        setTimeout(() => {
          setShowSectionMsg(false);
        }, 3000);
      }
    });
  };
  const getList = (array) => {
    const un1 = [];
    const un2 = [];
    const un3 = [];
    {
      array.map((item) => {
        if (item.markasCompleted) {
          un1.push(item);
        } else if (item.trackStatus === 'New') {
          un2.push(item);
        } else {
          un3.push(item);
        }
      });
    }
    return [...un2, ...un3, ...un1];
  };
  function getSelectedDay(date: any, val?: any) {
    updateSelKey(val ? val : 'today');
    if (selectedDate) {
      updateDate(moment(selectedDate).format('YYYY-MM-DD'));
      getRecods(selectedDate);
      setTimeout(() => {
        updateSelectedDate('');
      }, 200);
    }
    // if (!selectedDate && moment().diff(moment(date))) {
    if (!selectedDate) {
      updateDate(moment(date).format('YYYY-MM-DD'));
      setSelDate(date);
      getRecods(date);
    }
  }
  const updateStatuses = async (info, i) => {
    updateSelRow(info);
    updateCurrIndex(i);
    setOpenDialog(true);
    if (info['trackStatus'] !== 'New') {
      return;
    }
    const apiObject: PayloadProps = {
      payload: {
        healthPlanId: recommendations['healthPlanId'],
        healthPlanItemId: info['lifestyle_id'] ?
          info['lifestyle_id'] :
          info['nutrition_id'] ?
          info['nutrition_id'] :
          info['supplement_id'],
        healthPlanItemtype: info['lifestyle_id'] ?
          'lifestyle' :
          info['nutrition_id'] ?
          'nutritions' :
          'supplements',
      },
      method: 'POST',
      apiUrl: apiEndpoint.markAsViewed,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject).then((response: ApiResponseProps) => {
      if (response.status_code === 200) {
        getRecods(date);
      }
    });
  };
  const undoCurr = async () => {
    const apiObject: PayloadProps = {
      payload: {},
      method: 'Delete',
      apiUrl: apiEndpoint.undoComplete + selRow['markasCompletedId'],
      headers: {Authorization: token},
    };
    await triggerApi(apiObject).then((response: ApiResponseProps) => {
      if (response.status_code === 200) {
        getRecods(date);
      }
    });
  };
  const getCount = (tab) => {
    if (tab === 'All') {
      return (
        recommendations['markasCompletedLifestylesCount'] +
        recommendations['markasCompletedNutritionsCount'] +
        recommendations['markasCompletedSupplementsCount']
      );
    } else if (tab === 'nutritions') {
      return recommendations['markasCompletedNutritionsCount'];
    } else if (tab === 'lifestyle') {
      return recommendations['markasCompletedLifestylesCount'];
    } else if (tab === 'supplements') {
      return recommendations['markasCompletedSupplementsCount'];
    }
  };
  const addToCart = async () => {
    if (selRow['cartQuantity'] < 1 || !isTriggered) {
      return;
    }
    setIsTriggered(false);
    const apiObject: PayloadProps = {
      payload: {
        healthPlanId: recommendations['healthPlanId'],
        productId: selRow['supplement_id'],
        productType: 'supplements',
        quantity: selRow['cartQuantity'],
      },
      method: 'POST',
      apiUrl: apiEndpoint.cart,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject).then((response: ApiResponseProps) => {
      if (response.status_code === 200) {
        getCartItems(response.data.cartProduct.health_plan_id);
        getRecods(selDate);
        setTimeout(() => {
          setReShowPopup(true);
        }, 10);
        setTimeout(() => {
          setReShowPopup(false);
        }, 2000);
      }
    });
  };
  const getCartItems = async (id) => {
    const filter = `?healthPlanId=${id}`;

    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.cart + filter,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject).then((response: ApiResponseProps) => {
      if (response.status_code === 200) {
        updateCartItems(response.data.count);
        // setLoader(false);
      }
    });
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
        userDataRef.current = Data;
        if (Data['subscription_plan_info']) {
          if (getLocalStorage('pathname') === '/rootcause-home') {
            return;
          } else if (Data?.subscription_plan_info?.plan_slug==='rootcause' || Data?.subscription_plan_info?.plan_slug==='rootcause_without_inflamation') {
            navigate('/rootcause-home');
          }
          setLocalStorage('userData', JSON.stringify(Data));
          updateUserDetails(Data);
          getFirstAppointment(Data['is_first_plan_rootcause']);
        } else {
          Data['subscription_plan_info'] = planInfo;
          setLocalStorage('userData', JSON.stringify(Data));
          updateUserDetails(Data);
          getFirstAppointment(Data['is_first_plan_rootcause']);
        }
      }
    });
  };

  const getFirstAppointment = async (data) => {
    if (!location.pathname.includes('home')) {
      return;
    }
    const filter = `?onlyFirstAppointment=${'one'}&isFirstPlanRootcause=${data === true ? 'yes' : 'no'}`;
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.appointmentList + filter,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject).then((response: ApiResponseProps) => {
      if (response.status_code === 200) {
        const data = response.data.result;
        setFirstAppointmentsList(data);
        setLoader(false);
        if (location.pathname.includes('home')) {
          // const TimeInterval = setInterval(() => {
          // }, 9000);
          // return () => clearInterval(TimeInterval);
          setTimeout(() => {
            getFirstAppointment(userDataRef.current['is_first_plan_rootcause']);
          }, 30000);
        }
      }
    });
  };
  // const checkSubscriptionStatus=(uData)=>{
  //   return (daysDiffDuration(uData['subscription_end_date']) > 29) ? true :false;
  // };
  // const d = new Date();

  // const offset = d.getTimezoneOffset();
  // const cancelAppoint = async (info) => {
  //   const apiObject: PayloadProps = {
  //     payload: {
  //       offSet: offset.toString(),
  //       appointmentId: info['_id'],
  //     },
  //     method: 'POST',
  //     apiUrl: apiEndpoint.validateAppointment,
  //     headers: {Authorization: token},
  //   };
  //   await triggerApi(apiObject).then((response: ApiResponseProps) => {
  //     if (response.status_code === 200) {
  //       const data = response.data;
  //       if (
  //         (data['isPaymentDone'] && data['isPaymentRequired']) ||
  //         !data['isPaymentRequired']
  //       ) {
  //         navigate({
  //           pathname: '/book-appointment',
  //           search: `?${createSearchParams({
  //             link: info['acuity_confirmation_page'],
  //           })}`,
  //         });
  //       } else {
  //         navigate({
  //           pathname: '/add-payment',
  //           search:
  //             // eslint-disable-next-line max-len
  //             `?${createSearchParams({
  //               paymentFee: data['paymentFees'],
  //               link: info['acuity_confirmation_page'],
  //               id: info['_id'],
  //             })}`,
  //         });
  //       }
  //     }
  //   });
  // };
  const getCustStats = async () => {
    // const filter= `?onlyFirstAppointment=${true}`;
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.custStatus,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject).then((response: ApiResponseProps) => {
      if (response.status_code === 200) {
        updateStatsData(response.data);
      } else {
      }
    });
  };
  return (
    <>
      {loader ? (
        <Loader>
          <Spinner size="6px" />
        </Loader>
      ) : null}
      <CommonSnackbar
        title="Error"
        appearance={'success'}
        message={'Item Added to Cart'}
        open={reShowPopup}
        close={() => setReShowPopup(false)}
      />
      {showPopup && status === 'Initial' && (
        <BackDrop>
          <DialogContainer className="align-items-center">
            <Heading3>Success! You’ve booked an appointment with</Heading3>
            <BadgePill className="pending activ no-pointer text-center no-pointer">
              Health Coach
            </BadgePill>
            <IconsContainer className="layout2">
              <ImageWrapper className="text-center m-10 w-160 br-50">
                <img
                  src={
                    userDetails['assignment_details']['hc_assigned'] ?
                    userDetails['assignment_details'][
                        'ClientAssignments'
                    ]['Health Coach']['display_url']:
                      cmImg
                  }
                  alt="User"
                />
              </ImageWrapper>
              <BadgePill className="pending transparent text-center no-pointer">
                {
                  userDetails['assignment_details']['ClientAssignments'][
                      'Health Coach'
                  ]['name']
                }
              </BadgePill>
            </IconsContainer>
            {firstAppointmentsList.length ? (
              <Heading4 className="mb-0">
                {dateFormats(
                    firstAppointmentsList[0]['start_date'],
                    'dddd, MMMM Do h:mm a',
                )}
              </Heading4>
            ) : null}
            <Heading4>
              <b>Note: </b>This is a recurring appointment that will repeat
              every other week at the same time and day.
            </Heading4>
            <Button
              variant={'primary'}
              size="large"
              width="100%"
              onClick={() => {
                navigate('/home');
                // location.reload();
              }}
              className={'flx-center'}
            >
              Okay
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
      {viewDialog && (
        <ViewDialog
          header={'Health Coach'}
          width={isMobile ? 'unset' : '441px'}
          onCancel={() => updateView(false)}
        />
      )}
      {openDialog && (
        <BackDrop>
          <DialogContainer
            ref={dialogRef}
            className={
              isMobile && isSafari ?
                'h-90 p-0 ' :
                isMobile ?
                'h-100 p-0 ' :
                'p-0'
            }
            style={{width: isMobile ? 'unset' : '600px'}}
          >
            <ContentContainer
              className={
                isMobile ? 'ovy-scroll hei-9 0 mb-64' : 'flex-1  ovy-scroll'
              }
            >
              <div className="d-flex js-end">
                {/* <IconsContainer
                  className="d-flex"
                  onClick={() => {
                    setOpenDialog(false);
                    Mixpanel.track(
                        action['Home']['dailyTaskBackbtn']['title'],
                        action['Home']['dailyTaskBackbtn']['props'],
                    );
                    gtag('event', gaAction['Home']['dailyTaskBackbtn']['title'], {
                      'event_category': gaAction['Home']['dailyTaskBackbtn']['category'],
                    });
                  }}
                >
                  <Icon name="chervonLeft" />
                </IconsContainer> */}
                <IconsContainer
                  className="d-flex"
                  onClick={() => {
                    setOpenDialog(false);
                  }}
                >
                  <Icon name="close" />
                </IconsContainer>
                <IconsContainer
                  className={
                    isMobile ?
                      restrictUser === 'false' ?
                        'restrict gray-s w-16-s d-flex' :
                        selRow['markasCompleted'] ?
                        'completed-s w-16-s d-flex' :
                        'gray-s w-16-s d-flex' :
                      'd-none'
                  }
                  onClick={() => {
                    if (!selRow['markasCompleted']) {
                      markComplete(selRow, selDate);
                    }
                    Mixpanel.track(
                        action['Home']['markAsComplete']['title'],
                        action['Home']['markAsComplete']['props'],
                    );
                    gtag('event', gaAction['Home']['markAsComplete']['title'], {
                      'event_category': gaAction['Home']['markAsComplete']['category'],
                    });
                  }}
                >
                  <IconName
                    className={
                      moment().diff(
                          dateFormats(date, 'YYYY-MM-DD'),
                          'seconds',
                      ) < 0 ?
                        'not_allowed' :
                        '' + 'f-15'
                    }
                  >
                    {selRow['markasCompleted'] ?
                      'Completed' :
                      'Mark as complete'}
                  </IconName>
                  <div
                    className={
                      moment().diff(
                          dateFormats(date, 'YYYY-MM-DD'),
                          'seconds',
                      ) < 0 ?
                        'not_allowed icon-s' :
                        'icon-s'
                    }
                  >
                    <Icon name="check" />
                  </div>
                </IconsContainer>
              </div>
              <div className={isMobile ? 'p-0 mt-30' : 'px-18'}>
                <BadgeLabel className="d-flex f-15 ptb-15 gap-8 ">
                  <IconsContainer
                    className="w-20 br-0"
                    color={
                      selRow['lifestyle_id'] ?
                        '#355F92' :
                        selRow['nutrition_id'] ?
                        '#F5B873' :
                        '#355F92'
                    }
                  >
                    <Icon
                      name={
                        selRow['lifestyle_id'] ?
                          'lifeStyle' :
                          selRow['nutrition_id'] ?
                          'nutrition' :
                          'supplements'
                      }
                    />
                  </IconsContainer>
                  {selRow['lifestyle_id'] ?
                    'Life Style' :
                    selRow['nutrition_id'] ?
                    'Nutrition' :
                    'Supplements'}
                </BadgeLabel>
                <div className="d-flex gap-8">
                  <Heading3 className="f-24 d-flex txt-left flex-1">
                    {' '}
                    {selRow['type']}&nbsp;{selRow['name']}
                    {selRow['quantity'] ? (
                      <BadgePill className="gray">
                        {selRow['quantity'] + ' Capsules'}
                      </BadgePill>
                    ) : null}
                  </Heading3>

                  <IconsContainer
                    className={
                      !isMobile ?
                        selRow['markasCompleted'] ?
                          'completed-s w-16-s d-flex' :
                          restrictUser === 'false' ?
                          'restrict gray-s w-16-s d-flex' :
                          'gray-s w-16-s d-flex' :
                        'd-none'
                    }
                    onClick={() => {
                      if (!selRow['markasCompleted']) {
                        markComplete(selRow, selDate);
                      }
                      Mixpanel.track(
                          action['Home']['DTMark']['title'],
                          action['Home']['DTMark']['props'],
                      );
                      gtag('event', gaAction['Home']['DTMark']['title'], {
                        'event_category': gaAction['Home']['DTMark']['category'],
                      });
                    }}
                  >
                    <IconName
                      className={
                        moment().diff(
                            dateFormats(date, 'YYYY-MM-DD'),
                            'seconds',
                        ) < 0 ?
                          'not_allowed' :
                          '' + 'f-15'
                      }
                    >
                      {selRow['markasCompleted'] ?
                        'Completed' :
                        'Mark as complete'}
                    </IconName>
                    <div
                      className={
                        moment().diff(
                            dateFormats(date, 'YYYY-MM-DD'),
                            'seconds',
                        ) < 0 ?
                          'not_allowed icon-s' :
                          'icon-s'
                      }
                    >
                      <Icon name="check" />
                    </div>
                  </IconsContainer>
                </div>

                {selRow['brand'] ? (
                  <><div className='d-flex gap-10'>
                    <BadgeLabel className="d-flex p-0 f-16 py-24">
                      {selRow['brand']}
                    </BadgeLabel>
                    {selRow['units'] ? <span className='cap-pill'>{selRow['units']}</span> : null}
                  </div></>
                ) : null}
                {selRow['dosage'] || selRow['frequency'] ?
                <BadgeLabel className="d-flex pb-0-15">
                  {selRow?.['dosage']}&nbsp;{selRow?.['frequency']}
                </BadgeLabel>:null
                }
                {selRow['lifestyle_id'] || selRow['nutrition_id'] ? (
                  <BadgeLabel className="dai my-8 ">Daily</BadgeLabel>
                ) : null}
                <Description className="f-17 m-0 mb-10">
                  {selRow['description']}
                </Description>
                {selRow['price'] ? (
                  <Heading3 className="f-16 d-flex">
                    ${selRow['price']} per bottle
                  </Heading3>
                ) : null}
                {selRow['price'] ? (
                  <div className="d-flex gap-15">
                    <div className="d-flex gap-10 w-90">
                      <IconsContainer
                        className={
                          selRow['cartQuantity'] < 1 ? 'not_allowed d-flex' : 'd-flex'
                        }
                        onClick={() => {
                          if (selRow['cartQuantity'] > 0) {
                            const selRowCpy = {...selRow};
                            selRowCpy['cartQuantity'] =
                              selRowCpy['cartQuantity'] - 1;
                            setIsTriggered(true);
                            updateSelRow(selRowCpy);
                          }
                        }}
                      >
                        <Icon name="minus" />
                      </IconsContainer>
                      <BadgeHeading className="f-16 res-sel w-15">
                        {selRow['cartQuantity']}
                      </BadgeHeading>
                      <IconsContainer
                        className={
                          selRow['cartQuantity'] >
                          parseInt(recommendations['cartProductMaxQuantity']) -
                            1 ?
                            'not_allowed d-flex' :
                            'd-flex'
                        }
                        onClick={() => {
                          if (
                            selRow['cartQuantity'] <
                            parseInt(recommendations['cartProductMaxQuantity'])
                          ) {
                            const selRowCpy = {...selRow};
                            selRowCpy['cartQuantity'] =
                              selRowCpy['cartQuantity'] + 1;
                            setIsTriggered(true);
                            updateSelRow(selRowCpy);
                          }
                        }}
                      >
                        {' '}
                        <Icon name="plus" />
                      </IconsContainer>
                    </div>
                    <Button
                      variant={
                        restrictUser === 'false' ?
                          'disabled' :
                          selRow['cartQuantity'] > 0 && isTriggered ?
                          'primary' :
                          'disabled'
                      }
                      className={'res-sel'}
                      width="auto"
                      onClick={addToCart}
                    >
                      {'Add to Cart'}
                    </Button>
                    <IconsContainer
                      className="align-cen-fl pos-rel"
                      onClick={() => navigate('/cart')}
                    >
                      <Icon name="cart" />
                      <IconCount className="res-sel">{cartItems}</IconCount>
                    </IconsContainer>
                    {/* <Heading3 className="f-16 d-flex mlt-15">
         Price : $ {selRow['price']}
        </Heading3> */}
                  </div>
                ) : null}
              </div>
            </ContentContainer>
            <div
              className={
                isMobile ?
                  'fix-footer-mob br-tp fixed pt-15' :
                  'bg-clr-E9DCCE pad-30'
              }
            >
              <div
                className={
                  isMobile ?
                    'd-flex js-bet flex-1' :
                    'd-flex justify-content-end gap-8'
                }
              >
                <Button
                  variant={'secondary'}
                  width="auto"
                  className={currIndex == 0 || currIndex < 0 ? 'opa-0' : ''}
                  onClick={() => {
                    if (currIndex > 0) {
                      setIsTriggered(false);
                      updateSelRow(recommendations[selectedTab][currIndex - 1]);
                      updateCurrIndex(currIndex - 1);
                    }
                    Mixpanel.track(
                        action['Home']['DTPrevious']['title'],
                        action['Home']['DTPrevious']['props'],
                    );
                    gtag('event', gaAction['Home']['DTPrevious']['title'], {
                      'event_category': gaAction['Home']['DTPrevious']['category'],
                    });
                  }}
                >
                  Previous
                </Button>
                <Button
                  variant={'primary'}
                  width="auto"
                  className={
                    currIndex == recommendations[selectedTab].length - 1 ||
                    currIndex > recommendations[selectedTab].length - 1 ?
                      'opa-0 d-none' :
                      ''
                  }
                  onClick={() => {
                    if (currIndex < recommendations[selectedTab].length - 1) {
                      setIsTriggered(false);
                      updateSelRow(recommendations[selectedTab][currIndex + 1]);
                      updateCurrIndex(currIndex + 1);
                      updateStatuses(recommendations[selectedTab][currIndex + 1], currIndex+1);
                    }
                  }}
                >
                  Next
                </Button>
              </div>
            </div>
          </DialogContainer>
        </BackDrop>
      )}
      {reViewDialog && recommendations['healthPlanMessage'] && (
        <AppointmentMsgDialog
          header={'message'}
          width={isMobile ? 'unset' : '80%'}
          description={recommendations['healthPlanMessage']}
          creDate={moment(recommendations['healthPlanMessageCreatedDate']).format('MMM Do, YYYY [at] h:mA')}
          onCancel={() => updateReView(false)}
        />
        // <ViewDialog
        //   header={'message'}
        //   width={isMobile ? 'unset' : '480px'}
        //   description={recommendations['healthPlanMessage']}
        //   creDate={
        //     recommendations['healthPlanMessageCreatedDate'] ?
        //       'Added ' +
        //         dateFormats(
        //             recommendations['healthPlanMessageCreatedDate'],
        //             'MM/DD ',
        //         ) :
        //       null
        //   }
        //   onCancel={() => updateReView(false)}
        // />
      )}
      {!loader ? (
        <MainContainer bgColor={whiteColor}>
          <Header hideBackArrow={true}
            className="justify-content-between"
            bgCol={isMobile ? '#E9DCCE' : ''}
            desktopMenu={isMobile ? false : true}
            showMessage={true}
          />
          {
            <ScrollSection
              id="scrollable-div"
              className={
                isMobile ? 'flex-1 flex-unset mb-64' : 'flex-1 flex-unset '
              }
            >
              <HeroBannerSection
                bgColor={'#E9DCCE'}
                className={isMobile ? 'm-auto p-0' : 'm-auto'}
              >
                {!isMobile ? (
                  <BackGroundIcon className={isMobile ? 'opacity-3' : 'top-80'}>
                    {/* <Icon name="homeSquare" /> */}
                  </BackGroundIcon>
                ) : null}
                <DesktopWidth
                  className={isMobile ? ' m-auto' : 'w-1150 m-auto'}
                >
                  {checkSubscriptionStatus(userDetails) &&
                 ( (userDetails['remaining_appointments'] !== undefined && userDetails['subscription_plan_info']['subscription_plan_type'] !== 'primary_plan' ) ?
                  (userDetails['remaining_appointments'] > 0 ? true : false) : true) ?
                    <ContentContainer
                      bgColor={'transparent'}
                      className={isMobile ? ' ' : 'py-0'}
                    >
                      {!userDetails['symptom_analysis_submitted'] ||
                    !userDetails['intake_submitted'] ? (
                      <>
                        <GWColumn className="d-flex align-items-start">
                          <GWColumnLeft
                            className={isMobile ? 'flex-1' : 'flex-1'}
                          >
                            <HeroBannerHeading
                              className={
                                isMobile ?
                                  'f-30 mb-16 pos-rel' :
                                  'f-36 mb-24 pos-rel'
                              }
                            >
                              Welcome, {userDetails['first_name']}
                            </HeroBannerHeading>
                            <HeroBannerSubHeading
                              className={
                                isMobile ?
                                  'HeaderSubText mb-32' :
                                  'HeaderSubText mb-32'
                              }
                            >
                              Complete your to do list to book your first
                              appointment!
                            </HeroBannerSubHeading>
                          </GWColumnLeft>
                          <GWColumnRight className={isMobile ? 'd-none' : ''}>
                            <span
                              className="d-flex gap-10 messageLink"
                              onClick={() => {
                                navigate('/open-chat');
                                Mixpanel.track(
                                    action['Home']['openChat']['title'],
                                    action['Home']['openChat']['props'],
                                );
                                gtag('event', gaAction['Home']['openChat']['title'], {
                                  'event_category': gaAction['Home']['openChat']['category'],
                                });
                              }}
                            >
                              <Icon name="textMessage" /> Open Messages
                            </span>
                          </GWColumnRight>
                        </GWColumn>
                        {/* scc-1*/}
                        <div
                          className={
                            isMobile ?
                              'HomeToDoCardsWrapper d-flex flex-wrap gap-10' :
                              'HomeToDoCardsWrapper d-flex gap-24'
                          }
                        >
                          <HomeToDoCards
                            className={`${userDetails['symptom_analysis_submitted'] ? 'cursor-default' : '' } ${isMobile ? 'w-100' : ''}`}
                            onClick={() => {
                              if (!userDetails['symptom_analysis_submitted']) {
                                navigate('/symptom-home');
                              }
                            }}
                          >
                            <HomeToDoCardContainer
                              className={
                                userDetails['symptom_analysis_submitted'] ?
                                  isMobile ?
                                    'gap-8 align-items-start check' :
                                    ' align-items-start gap-16 check' :
                                  isMobile ?
                                  'gap-8 align-items-start dis' :
                                  ' align-items-start gap-16 dis'
                              }
                            >
                              <div className="d-flex d-flex-str HomeToDoCardInnerContainer gap-10">
                                {/* <Icon name="bar" /> */}
                                <div className="flex-1">
                                  <HomeToDoCardTitle>
                                    1. Symptom analysis
                                  </HomeToDoCardTitle>
                                  {moment().diff(
                                      userDetails['todo_list_dueDate'],
                                      'days',
                                  ) < 0 ? (
                                    <HomeToDoCardStatus>
                                      {!userDetails[
                                          'symptom_analysis_submitted'
                                      ] ?
                                        'Due ' +
                                          dateFormats(
                                              userDetails['todo_list_dueDate'],
                                              'MMMM Do',
                                          ) :
                                        'Complete'}
                                    </HomeToDoCardStatus>
                                  ) : (
                                    <HomeToDoCardStatus
                                      color={
                                        !userDetails[
                                            'symptom_analysis_submitted'
                                        ] ?
                                          '#B11818' :
                                          ''
                                      }
                                    >
                                      {!userDetails[
                                          'symptom_analysis_submitted'
                                      ] ?
                                        'Overdue ' :
                                        'Completed'}
                                    </HomeToDoCardStatus>
                                  )}
                                </div>
                              </div>
                              <div>
                                <Icon name="roundCheckInactive" />
                              </div>
                            </HomeToDoCardContainer>
                          </HomeToDoCards>
                          <HomeToDoCards
                            className={`${userDetails['intake_submitted'] ? 'cursor-default' : '' } ${isMobile ? 'w-100' : ''}`}
                            onClick={() => {
                              if (!userDetails['intake_submitted']) {
                                navigate('/intake-home');
                              }
                            }}
                          >
                            <HomeToDoCardContainer
                              className={
                                userDetails['intake_submitted'] ?
                                  isMobile ?
                                    'gap-8 align-items-start check' :
                                    ' align-items-start gap-16 check' :
                                  isMobile ?
                                  'gap-8 align-items-start dis' :
                                  ' align-items-start gap-16 dis'
                              }
                            >
                              <div className="d-flex d-flex-str HomeToDoCardInnerContainer gap-10 ">
                                {/* <Icon name="padIcon" /> */}
                                <div className="flex-1">
                                  <HomeToDoCardTitle>
                                    2. Complete intake form
                                  </HomeToDoCardTitle>
                                  {moment().diff(
                                      userDetails['todo_list_dueDate'],
                                      'days',
                                  ) < 0 ? (
                                    <HomeToDoCardStatus>
                                      {!userDetails['intake_submitted'] ?
                                        'Due ' +
                                          dateFormats(
                                              userDetails['todo_list_dueDate'],
                                              'MMMM Do',
                                          ) :
                                        'Complete'}
                                    </HomeToDoCardStatus>
                                  ) : (
                                    <HomeToDoCardStatus
                                      color={
                                        !userDetails['intake_submitted'] ?
                                          '#B11818' :
                                          ''
                                      }
                                    >
                                      {!userDetails['intake_submitted'] ?
                                        'Overdue ' :
                                        'Complete'}
                                    </HomeToDoCardStatus>
                                  )}
                                </div>
                              </div>
                              <div>
                                <Icon name="roundCheckInactive" />
                              </div>
                            </HomeToDoCardContainer>
                          </HomeToDoCards>
                          {/* <HomeToDoCards className={isMobile ? 'w-100' : ''}>
                            <HomeToDoCardContainer
                              className={
                                isMobile ?
                                  'gap-8 align-items-start' :
                                  ' align-items-start gap-16 '
                              }
                            >
                              <div className="d-flex d-flex-str HomeToDoCardInnerContainer gap-10">
                                <Icon name="usersIcon" />
                                <div className="flex-1">
                                  <HomeToDoCardTitle>
                                    Meet your Care Advocate
                                  </HomeToDoCardTitle>
                                  <HomeToDoCardStatus>
                                    {'Due ' +
                                      dateFormats(
                                          userDetails['todo_list_dueDate'],
                                          'MMMM Do',
                                      )}
                                  </HomeToDoCardStatus>
                                </div>
                              </div>
                              <div>
                                <Icon name="roundCheckInactive" />
                              </div>
                            </HomeToDoCardContainer>
                          </HomeToDoCards> */}
                        </div>
                      </>
                    ) : null}

                      {/* /////////////////////////////////////---Screen2----//////////////////////////////////// */}

                      {userDetails['symptom_analysis_submitted'] &&
                    userDetails['intake_submitted'] &&
                    !firstAppointmentsList.length ? (
                      <GWColumn
                        className={
                          isMobile ?
                            'd-flex flx-col' :
                            'd-flex align-items-start gapXY-80'
                        }
                      >
                        <GWColumnRight
                          className={isMobile ? 'flex-1' : 'flex-1 mt-30'}
                        >
                          <HeroBannerHeading
                            className={isMobile ? 'f-30 mb-16' : 'f-36 mb-24'}
                          >
                            Hi, {userDetails['first_name']}{' '}
                            {!isMobile ? (
                              <span
                                className="pointer mlt-15"
                                onClick={() => {
                                  navigate('/open-chat');
                                }}
                              >
                                {' '}
                                <Icon name="textMessage" />
                              </span>
                            ) : null}
                          </HeroBannerHeading>
                          <HeroBannerSubHeading
                            className={
                              isMobile ?
                                'HeaderSubText mb-32' :
                                'HeaderSubText mb-32 max-w-410'
                            }
                          >
                            {userDetails['assignment_details']['hc_assigned'] ?
                              `You’ve successfully subscribed to our ${userDetails['subscription_plan']['code'].charAt(0).toUpperCase() + userDetails['subscription_plan']['code'].slice(1)} Care Program.  Please book your first appointment below!` :
                              'Congratulations, you completed your task list! We are working on finding your health coach match, check back later!'}
                          </HeroBannerSubHeading>
                        </GWColumnRight>

                        <GWColumnLeft className={isMobile ? 'w-100' : ''}>
                          <HeroBannerHealthCoachCard
                            bgColor={whiteColor}
                            color={
                              userDetails['assignment_details']['hc_assigned'] ?
                                '#355f92' :
                                '#E8EAF1'
                            }
                            className={
                              isMobile ?
                                'w-100 p-24 ' :
                                'p-32 ' +
                                  (userDetails['assignment_details'][
                                      'hc_assigned'
                                  ] ?
                                    'splash ' :
                                    '')
                            }
                          >
                            <BadgePill className="bg-bei no-pointer">
                              {userDetails['assignment_details']['hc_assigned'] ?
                                'Health Coach' :
                                'Pending match...'}
                            </BadgePill>
                            <div>
                              <IconsContainer
                                className={
                                  userDetails['assignment_details'][
                                      'hc_assigned'
                                  ] ?
                                    'layout2' :
                                    'blurred layout2'
                                }
                              >
                                {userDetails['assignment_details'][
                                    'hc_assigned'
                                ] ? (
                                  <>
                                    <ImageWrapper className="text-center my-10 w-72 br-50">
                                      {userDetails['assignment_details'][
                                          'ClientAssignments'
                                      ]['Health Coach']['display_url'] ? (
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
                                              cmImg
                                          }
                                          alt="User"
                                        />
                                      ) : (
                                        <ProDefImage className="w-72">
                                          {userDetails['assignment_details'][
                                              'ClientAssignments'
                                          ]['Health Coach']['name'].charAt(0)}
                                          {userDetails['assignment_details'][
                                              'ClientAssignments'
                                          ]['Health Coach']['name'].charAt(1)}
                                        </ProDefImage>
                                      )}
                                    </ImageWrapper>
                                    <BadgePill className="pending transparent text-center no-pointer">
                                      {
                                        userDetails['assignment_details'][
                                            'ClientAssignments'
                                        ]['Health Coach']['name']
                                      }
                                    </BadgePill>
                                  </>
                                ) : (
                                  <>
                                    {' '}
                                    <ImageWrapper className="text-center my-10 w-72 br-50">
                                      {<img src={hcPen} alt="User" />}
                                    </ImageWrapper>
                                    <BadgePill className="pending transparent text-center no-pointer py-0">
                                      Sumanth karlapudi
                                    </BadgePill>
                                  </>
                                )}
                              </IconsContainer>
                              <div className="mt-10">
                                <Button
                                  variant={
                                    userDetails['intake_submitted'] &&
                                    userDetails['symptom_analysis_submitted'] &&
                                    userDetails['assignment_details'][
                                        'hc_assigned'
                                    ] ?
                                      'primary' :
                                      'disabled'
                                  }
                                  size="large"
                                  width="100%"
                                  onClick={() => {
                                    if (
                                      userDetails['intake_submitted'] &&
                                      userDetails['symptom_analysis_submitted']
                                    ) {
                                      navigate('/book-appointment');
                                    }
                                    Mixpanel.track(action['Home']['book']['title'], action['Home']['book']['props']);
                                    gtag('event', gaAction['Home']['book']['title'], {
                                      'event-category': gaAction['Home']['book']['category'],
                                    });
                                  }}
                                  className={'flx-center w-100'}
                                >
                                  Book an Appointment
                                </Button>
                                <HealthCoachCardText2
                                  className={
                                    userDetails['assignment_details'][
                                        'hc_assigned'
                                    ] ?
                                      'text-center pointer mt-20' :
                                      'blurred text-center pointer mt-20'
                                  }
                                  onClick={() => {
                                    if (
                                      userDetails['assignment_details'][
                                          'hc_assigned'
                                      ]
                                    ) {
                                      updateView(true);
                                    }
                                    Mixpanel.track(action['Home']['readMore']['title'], action['Home']['readMore']['props']);
                                    gtag('event', gaAction['Home']['readMore']['title'], {
                                      'event-category': gaAction['Home']['readMore']['category'],
                                    });
                                  }}
                                >
                                  Read more about your health coach
                                </HealthCoachCardText2>
                              </div>
                            </div>
                          </HeroBannerHealthCoachCard>
                        </GWColumnLeft>
                      </GWColumn>
                    ) : null}

                      {/* /////////////////////////////////////---Screen3----//////////////////////////////////// */}

                      {firstAppointmentsList.length ? (
                      <>
                        <GWColumn className="d-flex align-items-start">
                          <GWColumnLeft className="flex-1">
                            <HeroBannerHeading
                              className={isMobile ? 'f-30 mb-16' : 'f-36 mb-24'}
                            >
                              Hi, {userDetails['first_name']}
                            </HeroBannerHeading>
                            <HeroBannerSubHeading
                              className={
                                isMobile ?
                                  'HeaderSubText f-18 mb-32' :
                                  'HeaderSubText f-24 mb-32'
                              }
                            >
                              See what’s happening today
                            </HeroBannerSubHeading>
                          </GWColumnLeft>
                          <GWColumnRight className={isMobile ? 'd-none' : ''}>
                            <span
                              className="d-flex gap-10 messageLink"
                              onClick={() => {
                                navigate('/open-chat');
                              }}
                            >
                              <Icon name="textMessage" /> Open Messages
                            </span>
                          </GWColumnRight>
                        </GWColumn>
                        <div
                          className={
                            isMobile ?
                              'd-flex flex-wrap align-items-stretch gap-8' :
                              'HomeToDoCardsWrapper d-flex align-items-stretch flex-wrap gap-24'
                          }
                        >
                          <HomeTaskCards
                            color={'#355f92'}
                            className={isMobile ? 'w-100 p-18' : 'w-342'}
                          >
                            <HomeTestCardTitle>
                              {firstAppointmentsList[0]['health_coach']['name']}
                            </HomeTestCardTitle>
                            <div className="time-stamp mt-16">
                              {dateFormats(
                                  firstAppointmentsList[0]['start_date'],
                                  'ddd, MMM Do',
                              )}
                              &nbsp;
                              {dateFormats(
                                  firstAppointmentsList[0]['start_date'],
                                  'h:mm a',
                              )}
                              -
                              {dateFormats(
                                  firstAppointmentsList[0]['end_date'],
                                  'h:mm a',
                              )}
                            </div>
                            {true ? (
                              <Button
                                variant={
                                  restrictUser === 'false' ?
                                    'disabled' :
                                    firstAppointmentsList[0][
                                        'zoom_link_enable'
                                    ] ?
                                    'primary' :
                                    'disabled'
                                }
                                size="large"
                                width="auto"
                                className={'flx-center mt-16 w-100'}
                                onClick={() => {
                                  if (
                                    firstAppointmentsList[0]['zoom_link_enable']
                                  ) {
                                    window.open(
                                        firstAppointmentsList[0]['health_coach'][
                                            'zoom_link'
                                        ],
                                    );
                                  }
                                  Mixpanel.track(
                                      action['Home']['joinMeet']['title'],
                                      action['Home']['joinMeet']['props'],
                                  );
                                  gtag('event', gaAction['Home']['joinMeet']['title'], {
                                    'event_category': gaAction['Home']['joinMeet']['category'],
                                  });
                                }}
                              >
                                Join meeting
                              </Button>
                            ) : null}
                            {(userDetails['subscription_plan_info']['subscription_plan_type'] !== 'primary_plan') &&
                              <Button
                                variant={'secondary'}
                                size="large"
                                width="auto"
                                className={'flx-center mt-16 w-100'}
                                onClick={() => {
                                  navigate('/book-appointment');
                                  Mixpanel.track(
                                      action['Home']['bookMore']['title'],
                                      action['Home']['bookMore']['props'],
                                  );
                                  gtag('event', gaAction['Home']['bookMore']['title'], {
                                    'event_category': gaAction['Home']['bookMore']['category'],
                                  });
                                }}
                              >
                                Book appointment
                              </Button >
                            }
                            {(userDetails['subscription_plan_info']['subscription_plan_type'] !== 'primary_plan') &&
                              <HomeTestCardTitle className='mt-10'>{userDetails['remaining_appointments']} appointments to use any time</HomeTestCardTitle>
                            }

                          </HomeTaskCards>
                          <HomeTaskCards
                            className={
                              isMobile ? 'gap-10 p-18 w-30 d-flex js-cen flex-column' : 'pointer d-flex js-cen flex-column'
                            }
                            onClick={() => {
                              navigate('/appointments', {
                                state: {
                                  data: 'past',
                                },
                              });
                              Mixpanel.track(
                                  action['Home']['pendingSurvey']['title'],
                                  action['Home']['pendingSurvey']['props'],
                              );
                              gtag('event', gaAction['Home']['pendingSurvey']['title'], {
                                'event_category': gaAction['Home']['pendingSurvey']['category'],
                              });
                            }}
                          >
                            <div
                              className={
                                isMobile ?
                                  'homeTaskCardContainer d-flex align-items-center gap-10  js-cen flex-column' :
                                  'homeTaskCardContainer d-flex align-items-center gap-10 js-cen flex-column'
                              }
                            >
                              <Icon name="taskCheckIn" />
                              <span className={isMobile ? 'f-30' : 'f-40'}>
                                {stasData['inCompletedSurveysCount']}
                              </span>
                            </div>
                            <HomeCardResultTitle
                              className={isMobile ? 'f-14 mt-10' : 'f-18 mt-10'}
                            >
                              Pending surveys
                            </HomeCardResultTitle>
                          </HomeTaskCards>
                          <HomeTaskCards
                            className={
                              isMobile ? 'gap-10 p-18 w-30  d-flex js-cen flex-column' : 'pointer  d-flex js-cen flex-column'
                            }
                            onClick={() => {
                              navigate('/orders', {
                                state: {
                                  data: 'Your orders',
                                },
                              });
                              Mixpanel.track(
                                  action['Home']['homeOrders']['title'],
                                  action['Home']['homeOrders']['props'],
                              );
                              gtag('event', gaAction['Home']['homeOrders']['title'], {
                                'event_category': gaAction['Home']['homeOrders']['category'],
                              });
                            }}
                          >
                            <div
                              className={
                                isMobile ?
                                  'homeTaskCardContainer d-flex align-items-center gap-10   flex-column' :
                                  'homeTaskCardContainer d-flex align-items-center gap-10  flex-column'
                              }
                            >
                              <Icon name="taskOrder" />
                              <span className={isMobile ? 'f-30' : 'f-40'}>
                                {stasData['ordersCount']}
                              </span>
                            </div>
                            <HomeCardResultTitle
                              className={isMobile ? 'f-14 mt-10' : 'f-18 mt-10'}
                            >
                              Orders
                            </HomeCardResultTitle>
                          </HomeTaskCards>

                          <HomeTaskCards
                            className={
                              isMobile ? 'gap-10 p-18 w-30  d-flex js-cen flex-column' : 'pointer  d-flex js-cen flex-column'
                            }
                            onClick={() => {
                              navigate('/tests', {
                                state: {
                                  data: 'yourOrders',
                                },
                              });
                              Mixpanel.track(
                                  action['Home']['homeTestResult']['title'],
                                  action['Home']['homeTestResult']['props'],
                              );
                              gtag('event', gaAction['Home']['homeTestResult']['title'], {
                                'event_category': gaAction['Home']['homeTestResult']['category'],
                              });
                            }}
                          >
                            <div
                              className={
                                isMobile ?
                                  'homeTaskCardContainer d-flex align-items-center gap-10  flex-column' :
                                  'homeTaskCardContainer d-flex align-items-center gap-10  flex-column'
                              }
                            >
                              <Icon name="taskResult" />
                              <span className={isMobile ? 'f-30' : 'f-40'}>
                                {stasData['testResultCount']}
                              </span>
                            </div>
                            <HomeCardResultTitle
                              className={isMobile ? 'f-14 mt-10' : 'f-18 mt-10'}
                            >
                              Test Results
                            </HomeCardResultTitle>
                          </HomeTaskCards>
                        </div>
                      </>
                    ) : null}
                    </ContentContainer> : !checkSubscriptionStatus(userDetails) ?
                    <ContentContainer bgColor={'transparent'}
                      className={isMobile ? ' ' : 'py-0'}>
                      <>
                        <GWColumn className="d-flex align-items-start">
                          <GWColumnLeft className="flex-1">
                            <HeroBannerHeading
                              className={isMobile ? 'f-30 mb-16' : 'f-36 mb-24'}
                            >
      Hi, {userDetails['first_name']}
                            </HeroBannerHeading>
                            <HeroBannerSubHeading
                              className={
        isMobile ?
          'HeaderSubText f-18 mb-32' :
          'HeaderSubText f-24 mb-32'
                              }
                            >
      See what’s happening today
                            </HeroBannerSubHeading>
                          </GWColumnLeft>
                          <GWColumnRight className={isMobile ? 'd-none' : ''}>
                            <span
                              className="d-flex gap-10 messageLink"
                              onClick={() => {
                                navigate('/open-chat');
                              }}
                            >
                              <Icon name="textMessage" /> Open Messages
                            </span>
                          </GWColumnRight>
                        </GWColumn>
                        { <><div
                          className={isMobile ?
                              'd-flex flex-wrap align-items-stretch gap-8' :
                              'HomeToDoCardsWrapper d-flex align-items-stretch flex-wrap gap-24'}
                        >

                          {firstAppointmentsList?.length ?
                              <HomeTaskCards
                                color={'#355f92'}
                                className={isMobile ? 'w-100 p-18' : 'w-342'}
                              >
                                <HomeTestCardTitle>
                                  {firstAppointmentsList[0]['health_coach']['name']}
                                </HomeTestCardTitle>
                                <div className="time-stamp mt-16">
                                  {dateFormats(
                                      firstAppointmentsList[0]['start_date'],
                                      'ddd, MMM Do',
                                  )}
                                  &nbsp;
                                  {dateFormats(
                                      firstAppointmentsList[0]['start_date'],
                                      'h:mm a',
                                  )}
                                  -
                                  {dateFormats(
                                      firstAppointmentsList[0]['end_date'],
                                      'h:mm a',
                                  )}
                                </div>
                                {true ? (
                                  <Button
                                    variant={restrictUser === 'false' ?
                                      'disabled' :
                                      firstAppointmentsList[0]['zoom_link_enable'] ?
                                        'primary' :
                                        'disabled'}
                                    size="large"
                                    width="auto"
                                    className={'flx-center mt-16 w-100'}
                                    onClick={() => {
                                      if (firstAppointmentsList[0]['zoom_link_enable']) {
                                        window.open(
                                            firstAppointmentsList[0]['health_coach']['zoom_link'],
                                        );
                                      }
                                      Mixpanel.track(
                                          action['Home']['joinMeet']['title'],
                                          action['Home']['joinMeet']['props'],
                                      );
                                      gtag('event', gaAction['Home']['joinMeet']['title'], {
                                        'event_category': gaAction['Home']['joinMeet']['category'],
                                      });
                                    } }
                                  >
                                    Join meeting
                                  </Button>
                                ) : null}
                              </HomeTaskCards> : null}
                          <HomeTaskCards
                            className={isMobile ? 'gap-10 p-18 w-30' : 'pointer'}
                            onClick={() => {
                              navigate('/appointments', {
                                state: {
                                  data: 'past',
                                },
                              });
                              Mixpanel.track(
                                  action['Home']['pendingSurvey']['title'],
                                  action['Home']['pendingSurvey']['props'],
                              );
                              gtag('event', gaAction['Home']['pendingSurvey']['title'], {
                                'event_category': gaAction['Home']['pendingSurvey']['category'],
                              });
                            } }
                          >
                            <div
                              className={isMobile ?
                                  'homeTaskCardContainer d-grid align-items-center gap-10' :
                                  'homeTaskCardContainer d-grid align-items-center gap-10'}
                            >
                              <span className='text-center'><Icon name="taskCheckIn" /></span>
                              <span className={isMobile ? 'f-30' : 'f-40'}>
                                {stasData['inCompletedSurveysCount']}
                              </span>
                            </div>
                            <HomeCardResultTitle
                              className={isMobile ? 'f-14 mt-10 text-center' : 'f-18 mt-10 text-center'}
                            >
                                Check in surveys
                            </HomeCardResultTitle>
                          </HomeTaskCards>
                          <HomeTaskCards
                            className={isMobile ? 'gap-10 p-18 w-30' : 'pointer'}
                            onClick={() => {
                              navigate('/orders', {
                                state: {
                                  data: 'Your orders',
                                },
                              });
                              Mixpanel.track(
                                  action['Home']['homeOrders']['title'],
                                  action['Home']['homeOrders']['props'],
                              );
                              gtag('event', gaAction['Home']['homeOrders']['title'], {
                                'event_category': gaAction['Home']['homeOrders']['category'],
                              });
                            } }
                          >
                            <div
                              className={isMobile ?
                                  'homeTaskCardContainer d-grid align-items-center gap-10' :
                                  'homeTaskCardContainer d-grid align-items-center gap-10'}
                            >
                              <span className='text-center'><Icon name="cartblue" /></span>
                              <span className={isMobile ? 'f-30' : 'f-40'}>
                                {stasData['ordersCount']}
                              </span>
                            </div>
                            <HomeCardResultTitle
                              className={isMobile ? 'f-14 mt-10 text-center' : 'f-18 mt-10 text-center'}
                            >
                                Orders
                            </HomeCardResultTitle>
                          </HomeTaskCards>

                          <HomeTaskCards
                            className={isMobile ? 'gap-10 p-18 w-30' : 'pointer'}
                            onClick={() => {
                              navigate('/tests', {
                                state: {
                                  data: 'yourOrders',
                                },
                              });
                              Mixpanel.track(
                                  action['Home']['homeTestResult']['title'],
                                  action['Home']['homeTestResult']['props'],
                              );
                              gtag('event', gaAction['Home']['homeTestResult']['title'], {
                                'event_category': gaAction['Home']['homeTestResult']['category'],
                              });
                            } }
                          >
                            <div
                              className={isMobile ?
                                  'homeTaskCardContainer d-grid text-center align-items-center gap-10' :
                                  'homeTaskCardContainer d-grid text-center align-items-center gap-10'}
                            >
                              <span className='text-center'><Icon name="taskResult" /></span>
                              <span className={isMobile ? 'f-30' : 'f-40'}>
                                {stasData['testResultCount']}
                              </span>
                            </div>
                            <HomeCardResultTitle
                              className={isMobile ? 'f-14 mt-10 text-center' : 'f-18 mt-10 text-center'}
                            >
                                Test Results
                            </HomeCardResultTitle>
                          </HomeTaskCards>
                        </div><HeroBannerHealthCoachCard bgColor={whiteColor} color={'#1E3653'} className='align-items-start mt-20 mh-unset'>
                          <div className='d-flex flex-column align-items-start rootCauseResultsCard'>
                            <span className='rootCauseResultsCardText f-20'>Congrats! You’ve completed your initial program!</span>
                          </div>
                          <div className='d-flex flex-column align-items-start rootCauseResultsCard'>
                            <span className='rootCauseResultsCardText mt-10  f-400'>View your options below to periodically check in with your coach. </span>
                          </div>
                          <div className={isMobile ? 'mt-36 w-100' : 'mt-36'}>
                            <Button
                              variant={'primary'}
                              size="large"
                              width="100%"
                              onClick={() => {
                                navigate('/extendplans', {
                                  state: {
                                    coachData: userDetails['assignment_details']?.['ClientAssignments']?.['Health Coach'],
                                  },
                                });
                                Mixpanel.track(
                                    action['Home']['extendCare']['title'],
                                    action['Home']['extendCare']['props'],
                                );
                                gtag('event', gaAction['Home']['extendCare']['title'], {
                                  'event_category': gaAction['Home']['extendCare']['category'],
                                });
                              } }
                              className={'flx-center f-17'}
                            >
                                  View Options
                            </Button>

                          </div>
                        </HeroBannerHealthCoachCard></>}
                      </>
                    </ContentContainer> : null}
                  {checkSubscriptionStatus(userDetails) && userDetails['remaining_appointments'] < 1 && userDetails['subscription_plan_info']['subscription_plan_type'] !== 'primary_plan' ?
                    <ContentContainer bgColor={'transparent'}
                      className={isMobile ? ' ' : 'py-0'}>
                      <>
                        <GWColumn className="d-flex align-items-start">
                          <GWColumnLeft className="flex-1">
                            <HeroBannerHeading
                              className={isMobile ? 'f-30 mb-16' : 'f-36 mb-24'}
                            >
    Hi, {userDetails['first_name']}
                            </HeroBannerHeading>
                            <HeroBannerSubHeading
                              className={
      isMobile ?
        'HeaderSubText f-18 mb-32' :
        'HeaderSubText f-24 mb-32'
                              }
                            >
    See what’s happening today
                            </HeroBannerSubHeading>
                          </GWColumnLeft>
                          <GWColumnRight className={isMobile ? 'd-none' : ''}>
                            <span
                              className="d-flex gap-10 messageLink"
                              onClick={() => {
                                navigate('/open-chat');
                              }}
                            >
                              <Icon name="textMessage" /> Open Messages
                            </span>
                          </GWColumnRight>
                        </GWColumn>
                        <div
                          className={
  isMobile ?
    'd-flex flex-wrap align-items-stretch gap-8' :
    'HomeToDoCardsWrapper d-flex align-items-stretch flex-wrap gap-24'
                          }
                        >

                          {firstAppointmentsList?.length ?
                           <HomeTaskCards
                             color={'#355f92'}
                             className={isMobile ? 'w-100 p-18' : 'w-342'}
                           >
                             <HomeTestCardTitle>
                               {firstAppointmentsList[0]['health_coach']['name']}
                             </HomeTestCardTitle>
                             <div className="time-stamp mt-16">
                               {dateFormats(
                                   firstAppointmentsList[0]['start_date'],
                                   'ddd, MMM Do',
                               )}
                              &nbsp;
                               {dateFormats(
                                   firstAppointmentsList[0]['start_date'],
                                   'h:mm a',
                               )}
                              -
                               {dateFormats(
                                   firstAppointmentsList[0]['end_date'],
                                   'h:mm a',
                               )}
                             </div>
                             {true ? (
                              <Button
                                variant={
                                  restrictUser === 'false' ?
                                    'disabled' :
                                    firstAppointmentsList[0][
                                        'zoom_link_enable'
                                    ] ?
                                    'primary' :
                                    'disabled'
                                }
                                size="large"
                                width="auto"
                                className={'flx-center mt-16 w-100'}
                                onClick={() => {
                                  if (
                                    firstAppointmentsList[0]['zoom_link_enable']
                                  ) {
                                    window.open(
                                        firstAppointmentsList[0]['health_coach'][
                                            'zoom_link'
                                        ],
                                    );
                                  }
                                  Mixpanel.track(
                                      action['Home']['joinMeet']['title'],
                                      action['Home']['joinMeet']['props'],
                                  );
                                  gtag('event', gaAction['Home']['joinMeet']['title'], {
                                    'event_category': gaAction['Home']['joinMeet']['category'],
                                  });
                                }}
                              >
                                Join meeting
                              </Button>
                            ) : null}
                           </HomeTaskCards> : null}
                          <HomeTaskCards
                            className={
    isMobile ? 'gap-10 p-18 w-30' : 'pointer'
                            }
                            onClick={() => {
                              navigate('/appointments', {
                                state: {
                                  data: 'past',
                                },
                              });
                              Mixpanel.track(
                                  action['Home']['pendingSurvey']['title'],
                                  action['Home']['pendingSurvey']['props'],
                              );
                              gtag('event', gaAction['Home']['pendingSurvey']['title'], {
                                'event_category': gaAction['Home']['pendingSurvey']['category'],
                              });
                            }}
                          >
                            <div
                              className={
      isMobile ?
        'homeTaskCardContainer d-grid align-items-center gap-10' :
        'homeTaskCardContainer d-grid align-items-center gap-10'
                              }
                            >
                              <span className='text-center'><Icon name="taskCheckIn" /></span>
                              <span className={isMobile ? 'f-30' : 'f-40'}>
                                {stasData['inCompletedSurveysCount']}
                              </span>
                            </div>
                            <HomeCardResultTitle
                              className={isMobile ? 'f-14 mt-10 text-center' : 'f-18 mt-10 text-center'}
                            >
    Check in surveys
                            </HomeCardResultTitle>
                          </HomeTaskCards>
                          <HomeTaskCards
                            className={
    isMobile ? 'gap-10 p-18 w-30' : 'pointer'
                            }
                            onClick={() => {
                              navigate('/orders', {
                                state: {
                                  data: 'Your orders',
                                },
                              });
                              Mixpanel.track(
                                  action['Home']['homeOrders']['title'],
                                  action['Home']['homeOrders']['props'],
                              );
                              gtag('event', gaAction['Home']['homeOrders']['title'], {
                                'event_category': gaAction['Home']['homeOrders']['category'],
                              });
                            }}
                          >
                            <div
                              className={
      isMobile ?
        'homeTaskCardContainer d-grid align-items-center gap-10' :
        'homeTaskCardContainer d-grid align-items-center gap-10'
                              }
                            >
                              <span className='text-center'><Icon name="cartblue" /></span>
                              <span className={isMobile ? 'f-30' : 'f-40'}>
                                {stasData['ordersCount']}
                              </span>
                            </div>
                            <HomeCardResultTitle
                              className={isMobile ? 'f-14 mt-10 text-center' : 'f-18 mt-10 text-center'}
                            >
    Orders
                            </HomeCardResultTitle>
                          </HomeTaskCards>

                          <HomeTaskCards
                            className={
    isMobile ? 'gap-10 p-18 w-30' : 'pointer'
                            }
                            onClick={() => {
                              navigate('/tests', {
                                state: {
                                  data: 'yourOrders',
                                },
                              });
                              Mixpanel.track(
                                  action['Home']['homeTestResult']['title'],
                                  action['Home']['homeTestResult']['props'],
                              );
                              gtag('event', gaAction['Home']['homeTestResult']['title'], {
                                'event_category': gaAction['Home']['homeTestResult']['category'],
                              });
                            }}
                          >
                            <div
                              className={
      isMobile ?
        'homeTaskCardContainer d-grid align-items-center gap-10' :
        'homeTaskCardContainer d-grid align-items-center gap-10'
                              }
                            >
                              <span className='text-center'><Icon name="taskResult" /></span>
                              <span className={isMobile ? 'f-30' : 'f-40'}>
                                {stasData['testResultCount']}
                              </span>
                            </div>
                            <HomeCardResultTitle
                              className={isMobile ? 'f-14 mt-10 text-center' : 'f-18 mt-10 text-center'}
                            >
    Test Results
                            </HomeCardResultTitle>
                          </HomeTaskCards>
                        </div>
                        {checkSubscriptionStatus(userDetails) ?
                          <>
                            <HeroBannerHealthCoachCard bgColor={whiteColor} color={'#1E3653'} className='mt-20 mh-unset align-items-start'>
                              <div className='d-flex flex-column rootCauseResultsCard justify-content-start align-items-start'>
                                <span className='rootCauseResultsCardText f-20'>Congrats, you’re now a member!</span>
                              </div>
                              <div className='d-flex flex-column rootCauseResultsCard align-items-start'>
                                <span className='rootCauseResultsCardText mt-10  f-400'>View your appointment options below to continue meeting with your coach.</span>
                              </div>
                              <div className="mt-10 w-100">
                                <Button
                                  variant={

                                    'primary'
                                  }
                                  size="large"
                                  width="auto"
                                  onClick={() => {
                                    navigate('/extendplans?topUp=true');
                                    Mixpanel.track(
                                        action['Home']['topUp']['title'],
                                        action['Home']['topUp']['props'],
                                    );
                                    gtag('event', gaAction['Home']['topUp']['title'], {
                                      'event_category': gaAction['Home']['topUp']['category'],
                                    });
                                  }}
                                  className={'flx-center f-17'}
                                >
                               Top up appointments
                                </Button>

                              </div>
                            </HeroBannerHealthCoachCard>

                          </>:
                          <HeroBannerHealthCoachCard bgColor={whiteColor} color={'#1E3653'} className='mt-20 mh-unset'>
                            <div className='d-flex flex-column rootCauseResultsCard justify-content-start align-items-start'>
                              <span className='rootCauseResultsCardText f-20'>Congrats! You’re about to
complete your initial program!</span>
                            </div>
                            <div className='d-flex flex-column rootCauseResultsCard justify-content-start align-items-start'>
                              <span className='rootCauseResultsCardText mt-10  f-400'>See your options below to continue meeting with your coach! </span>
                            </div>
                            <div className={isMobile ? 'mt-36 w-100' : 'mt-36'}>
                              <Button
                                variant={

                                  'primary'
                                }
                                size="large"
                                width="auto"
                                onClick={() => {
                                  navigate('/extendplans', {
                                    state: {
                                      coachData: userDetails['assignment_details']?.['ClientAssignments']?.['Health Coach'],
                                    },
                                  });
                                  Mixpanel.track(
                                      action['Home']['extendCare']['title'],
                                      action['Home']['extendCare']['props'],
                                  );
                                  gtag('event', gaAction['Home']['extendCare']['title'], {
                                    'event_category': gaAction['Home']['extendCare']['category'],
                                  });
                                }}
                                className={'flx-center f-17'}
                              >
                                  View Options
                              </Button>

                            </div>
                          </HeroBannerHealthCoachCard>}
                      </>
                    </ContentContainer>:null}
                </DesktopWidth>
              </HeroBannerSection>
              {stories.length && !firstAppointmentsList.length ? (
                <GWSliderSection bgColor={'#FAFAFC'}>
                  <DesktopWidth
                    className={isMobile ? ' m-auto' : 'w-1150 m-auto py-0'}
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
                                    <div className=" clientDetails d-flex flex-column align-items-start">
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
                                        Mixpanel.track(action['Home']['caseStudy']['title'], action['Home']['caseStudy']['props']);
                                        gtag('event', gaAction['Home']['caseStudy']['title'], {
                                          'event-category': gaAction['Home']['caseStudy']['category'],
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
                  </DesktopWidth>
                </GWSliderSection>
              ) : null}
              {firstAppointmentsList.length ? (
                <>
                  {reLoader ? (
                    <Loader>
                      <Spinner size="6px" />
                    </Loader>
                  ) : null}

                  <Snackbar
                    open={showSectionMsg && !openDialog}
                    autoHideDuration={3000}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    onClose={() => setShowSectionMsg(false)}
                  >
                    <SContent onClick={() => undoCurr()}>
                      Task marked as complete! <span className='underline'>Undo</span>
                    </SContent>
                  </Snackbar>

                  {!loader ? (
                    <DesktopWidth className="w-1150">
                      <ContentContainer className={isMobile ? '' : 'ptb-0'}>
                        <Heading3
                          className={
                            isMobile ? 'txt-left f-24' : 'txt-left f-32'
                          }
                        >
                          Daily Tasks
                        </Heading3>
                        <FilterRow>
                          <FilterPill
                            onClick={() => {
                              getSelectedDay(
                                  moment().subtract(1, 'days'),
                                  'yesterday',
                              );
                              Mixpanel.track(
                                  action['Home']['yesterday']['title'],
                                  action['Home']['yesterday']['props'],
                              );
                              gtag('event', gaAction['Home']['yesterday']['title'], {
                                'event_category': gaAction['Home']['yesterday']['category'],
                              });
                            }}
                            className={selKey === 'yesterday' ? 'active' : ''}
                          >
                            Yesterday
                          </FilterPill>
                          <FilterPill
                            className={selKey === 'today' ? 'active' : ''}
                            onClick={() => {
                              getSelectedDay(new Date());
                              Mixpanel.track(
                                  action['Home']['today']['title'],
                                  action['Home']['today']['props'],
                              );
                              gtag('event', gaAction['Home']['today']['title'], {
                                'event_category': gaAction['Home']['today']['category'],
                              });
                            }}
                          >
                            Today
                          </FilterPill>
                          <FilterPill
                            className={selKey === 'tommorow' ? 'active' : ''}
                            onClick={() => {
                              getSelectedDay(
                                  moment().add(1, 'days'),
                                  'tommorow',
                              );
                              Mixpanel.track(
                                  action['Home']['tomorrow']['title'],
                                  action['Home']['tomorrow']['props'],
                              );
                              gtag('event', gaAction['Home']['tomorrow']['title'], {
                                'event_category': gaAction['Home']['tomorrow']['category'],
                              });
                            }}
                          >
                            Tomorrow
                          </FilterPill>
                        </FilterRow>
                        <div
                          className={
                            isMobile ?
                              'pos-rel d-flex flx-cont flex-column  gap-10' :
                              'd-flex gap-10 align-items-stretch'
                          }
                        >
                          <BadgeContainer
                            className=" bg-gray align-self br-gray"
                            style={{maxWidth: '400px'}}
                          >
                            <div className="d-flex align-items-start">
                              <div className="flex-1 ">
                                <BadgeRow>
                                  <BadgeHeading
                                    className={isMobile ? 'f-18' : 'f-20'}
                                  >
                                    {`Your Progress`}
                                  </BadgeHeading>
                                </BadgeRow>
                                <BadgeRow>
                                  {remTasks > 0 ? (
                                    <BadgeLabel
                                      className={
                                        isMobile ?
                                          'clr-gray ptb-15 f-16' :
                                          'clr-gray ptb-15 f-20'
                                      }
                                    >
                                      {remTasks + ' tasks left'}
                                    </BadgeLabel>
                                  ) : remTasks === 0 ? (
                                    <BadgeLabel
                                      className={
                                        isMobile ? 'ptb-15 f-16' : 'ptb-15 f-20'
                                      }
                                    >
                                      {`You’re up to date`}
                                    </BadgeLabel>
                                  ) : (
                                    <BadgeLabel
                                      className={isMobile ? 'ptb-15' : 'ptb-15'}
                                    >
                                      {`No tasks added yet!`}
                                    </BadgeLabel>
                                  )}
                                </BadgeRow>
                              </div>
                              <div>
                                <CircularProgressWithLabel value={totalTasks} />
                              </div>
                            </div>
                          </BadgeContainer>
                          <BadgeContainer
                            className={
                              isMobile ?
                                'pos-rel-0 bg-gray align-self br-gray bg-bone pointer' :
                                'bg-gray  br-gray bg-bone row-rev pointer'
                            }
                            style={{maxWidth: '400px'}}
                            onClick={() => {
                              updateReView(true);
                              Mixpanel.track(
                                  action['Home']['lastAppMsg']['title'],
                                  action['Home']['lastAppMsg']['props'],
                              );
                              gtag('event', gaAction['Home']['lastAppMsg']['title'], {
                                'event_category': gaAction['Home']['lastAppMsg']['category'],
                              });
                            }}
                          >
                            <div className="d-flex align-items-start row-rev">
                              <IconsContainer
                                className={isMobile ? 'd-none' : ''}
                              >
                                <ImageWrapper className="w-unset h-unset">
                                  {/* <img src={homeImg} alt="User" /> */}
                                  <Icon name="arrowRightUp" />
                                </ImageWrapper>
                              </IconsContainer>
                              <BadgeRow
                                onClick={() => {
                                  updateHide(isMobile ? !hide : true);
                                }}
                                className="flex-1"
                              >
                                <BadgeHeading
                                  className={isMobile ? 'f-18' : 'f-20'}
                                >
                                  Message from your last appointment
                                </BadgeHeading>
                                {isMobile ? (
                                  <IconsContainer className="plt-10">
                                    {/* <Icon name={hide ? 'chervonTop' : 'chervonBot'}/> */}
                                    <Icon name="arrowRightUp" />
                                  </IconsContainer>
                                ) : null}
                              </BadgeRow>
                            </div>

                            {userDetails['assignment_details'][
                                'ClientAssignments'
                            ] && recommendations['healthPlanMessage'] ? (
                              <BadgeRow
                                className={isMobile ? 'flx-col-15' : null}
                              >
                                <BadgePill
                                  className={isMobile ? 'mt-20' : 'mt-20 nohover'}
                                >
                                  {recommendations[
                                      'healthPlanMessageCreatedDate'
                                  ] ?
                                    'Added ' +
                                      dateFormats(
                                          recommendations[
                                              'healthPlanMessageCreatedDate'
                                          ],
                                          'MM/DD ',
                                      ) :
                                    null}
                                </BadgePill>
                              </BadgeRow>
                            ) : null}
                          </BadgeContainer>
                        </div>
                      </ContentContainer>
                      <ContentContainer
                        className={isMobile ? 'py-0' : 'my-22 mb-0'}
                      >
                        <Heading3
                          className={
                            isMobile ?
                              'flex-icon f-16 d-none' :
                              'f-24 text-center mb-10 d-none'
                          }
                        >
                          {isMobile ? <Icon name="calendar" /> : null}
                          {moment(date).format('MMMM YYYY')}
                        </Heading3>
                        <div className="d-none">
                          <DatePicker
                            getSelectedDay={getSelectedDay}
                            userSelectedDate={selectedDate}
                          />
                        </div>
                        <Tabs
                          type="primary"
                          Json={RecommandationLabelsA}
                          onClick={onSelectedTabClick}
                          selectedLabel={selectedTab}
                          // classN="caps"
                        />
                      </ContentContainer>
                      {isDataLoading ? (
                        <ContentContainer className="ptb-0 h-130 pos-rel" style={{minHeight: '400px'}}>
                          <Spinner size="3px" />
                        </ContentContainer>
                      ) : (
                        <ContentContainer className="ptb-0" style={{minHeight: '400px'}}>
                          {recommendations &&
                          // (remTasks > 0 || show) &&
                          recommendations[selectedTab] &&
                          recommendations[selectedTab].length ?
                          remTasks > 0 ? (
                            <>
                              {getList(recommendations[selectedTab]).map(
                                  (info: any, i: number) => {
                                    return (
                                      <BadgeRow
                                        className={
                                        info['markasCompleted'] ?
                                          show ?
                                            'item com-gre unhide ' :
                                            'hide' :
                                          'item com-gra'
                                        }
                                        key={i}
                                      >
                                        <div
                                          className="d-flex flex-1 gap-8"
                                          onClick={() => {
                                            updateStatuses(info, i);
                                            Mixpanel.track(
                                                `${info['type']} ${info['name']} ${action['Home']['click']['title']}`,
                                                action['Home']['click']['props'],
                                            );
                                            gtag('event', `${info['type']} ${info['name']} ${gaAction['Home']['click']['title']}`, {
                                              'event_category': gaAction['Home']['click']['category'],
                                            });
                                          }}
                                        >
                                          <IconsContainer
                                            className={
                                            info['lifestyle_id'] ?
                                              'life' :
                                              info['nutrition_id'] ?
                                              'nut' :
                                              'supp'
                                            }
                                          >
                                            <Icon
                                              name={
                                              info['lifestyle_id'] ?
                                                'lifeStyle' :
                                                info['nutrition_id'] ?
                                                'nutrition' :
                                                'supplements'
                                              }
                                            />
                                          </IconsContainer>
                                          <BadgeLabel
                                            className={
                                            isMobile ?
                                              'caps f-16' :
                                              'flex-row  js-start caps f-18'
                                            }
                                            title={info['name']}
                                          >
                                            {info['type']}&nbsp;
                                            {info['name'] ? isMobile ? info['name']
                                                .split(' ')
                                                .slice(0, 1)
                                                .join(' ') : info['name'] : ''}
                                            {isMobile ? '...' : ''}
                                            {/* ... */}
                                          </BadgeLabel>
                                          {info['trackStatus'] === 'New' ? (
                                          <BadgePill
                                            className={
                                              isMobile ?
                                                'newTag' :
                                                'mlt-15 bg-bei width-unset'
                                            }
                                          >
                                            New
                                          </BadgePill>
                                        ) : (
                                          ''
                                        )}
                                        </div>
                                        {
                                          <IconsContainer
                                            className={
                                            restrictUser === 'false' ?
                                              'restrict gray-s w-16-s d-flex' :
                                              info['markasCompleted'] ?
                                              'completed-s w-16-s d-flex' :
                                              'gray-s w-16-s d-flex'
                                            }
                                            onClick={() => {
                                              if (!info['markasCompleted']) {
                                                markComplete(info, selDate);
                                              }
                                              Mixpanel.track(
                                                  action['Home']['markAsComplete'][
                                                      'title'
                                                  ],
                                                  action['Home']['markAsComplete'][
                                                      'props'
                                                  ],
                                              );
                                              gtag('event', gaAction['Home']['markAsComplete']['title'], {
                                                'event_category': gaAction['Home']['click']['category'],
                                              });
                                            }}
                                          >
                                            {!isMobile ? (
                                            <div>
                                              <IconName
                                                className={
                                                  moment().diff(
                                                      dateFormats(
                                                          date,
                                                          'YYYY-MM-DD',
                                                      ),
                                                      'seconds',
                                                  ) < 0 ?
                                                    'not_allowed' :
                                                    '' + 'f-17'
                                                }
                                              >
                                                {info['markasCompleted'] ?
                                                  'Completed' :
                                                  'Mark as complete'}
                                              </IconName>
                                            </div>
                                          ) : null}
                                            <div
                                              className={
                                              moment().diff(
                                                  dateFormats(date, 'YYYY-MM-DD'),
                                                  'seconds',
                                              ) < 0 ?
                                                'not_allowed icon-s' :
                                                'icon-s'
                                              }
                                            >
                                              <Icon name="check" />
                                            </div>
                                          </IconsContainer>
                                        }
                                      </BadgeRow>
                                    );
                                  },
                              )}
                              {getCount(selectedTab) > 0 ? (
                                <BadgeRow
                                  className="js-cen"
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
                                        'Show Completed Tasks' :
                                        'Hide Completed Tasks'}
                                      {`(` + getCount(selectedTab) + `)`}
                                    </Link>
                                  </BadgeLabel>
                                </BadgeRow>
                              ) : null}
                            </>
                          ) : remTasks === 0 ? (
                            <>
                              <BadgeRow className="flx-col">
                                <IconsContainer className="pos-unset">
                                  <img src={home1} alt="User" />
                                </IconsContainer>
                                <Description className="text-center">
                                  {`Congrats you’ve completed all of your tasks for the day!`}
                                </Description>
                              </BadgeRow>
                              {/* <BadgeRow
                                className="js-cen"
                                onClick={() => updateShow(!show)}
                              >
                                {!show ?
                                  'Show Completed Tasks' :
                                  'Hide Completed Tasks'}
                                {`(` + getCount(selectedTab) + `)`}
                              </BadgeRow> */}
                            </>
                          ) : (
                            <BadgeRow className="h-250 flx-col gp-0">
                              {' '}
                              <BadgeLabel className="h-250">
                                Stay tuned, your tasks will be added after your
                                first appointment!
                              </BadgeLabel>
                              <Description className="ans f-17">
                                Check back later.
                              </Description>
                            </BadgeRow>
                          ): <BadgeRow className="h-250 flx-col gp-0">
                            {' '}
                            <BadgeLabel className="h-250">
                                Stay tuned, your tasks will be added after your
                                first appointment!
                            </BadgeLabel>
                            <Description className="ans f-17">
                                Check back later.
                            </Description>
                          </BadgeRow>}
                          {/* <div className='text-center f-16'> <Link>Show completed tasks ({3})</Link></div> */}
                        </ContentContainer>
                      )}
                    </DesktopWidth>
                  ) : null}
                </>
              ) : null}
            </ScrollSection>
          }
          {isMobile ? <BotoomHeader /> : null}
        </MainContainer>
      ) : null}
    </>
  );
}

import Box from '@mui/material/Box';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
) {
  return (
    <Box sx={{position: 'relative', display: 'inline-flex'}}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '64px',
          height: '64px',
          borderRadius: '80px',
          border: '7px solid white',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}
