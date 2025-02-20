/* eslint-disable max-len */
import menu from '@app/assets/images/menu.png';
import Button from '@app/components/button/button';
import BotoomHeader from '@app/components/footer-menu';
import Header from '@app/components/header';
import Icon from '@app/components/icon';
import Spinner from '@app/components/icon/icons/loader';
import {Description} from '@app/components/layout-onBoarding/layout-onBoarding-components';
import apiEndpoint from '@app/core/apiend_point';
import {getLocalStorage} from '@app/core/localStorageService';
import {ApiResponseProps, PayloadProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import {
  AppointmentsStatusCard,
  DesktopWidth,
  FlexContainer,
  Heading3,
  Link,
  Loader,
  MainContainer,
  ProDefImage,
} from '@app/styles/common-styles';
import {dateFormats} from '@app/utils/dateformat';
import {useEffect, useRef, useState} from 'react';
import {isMobile} from 'react-device-detect';
import {createSearchParams, useLocation, useNavigate} from 'react-router-dom';
import {
  BackDrop,
  CloseIcon,
  ContentContainer,
  DialogContainer,
  DropDiv,
  IconsContainer,
  ImageWrapper,
  ImgDiv,
  MenuImg,
  MenuOptDiv,
  MenuOptions,
  ScheduleDiv,
} from '../assesment-questions/assesment-questions-components';
import {ScrollSection} from '../boarding-screens/component/boarding-screen-components';
import {
  BadgeContainer,
  BadgeLabel,
  BadgePill,
  BadgeRow,
  ContentBox,
} from '../home/home-components';
import {MenuHeader} from '../profile/profile-components';
import React from 'react';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';

/**
 * Renders Component.
 * @return {Appointments} renders Component.
 */
export default function Appointments() {
  const navigate = useNavigate();
  const location = useLocation();
  const [appointmentsList, setAppointmentsList] = useState([]);
  const token = getLocalStorage('token') ? getLocalStorage('token') : '';
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const [selAppointment, setSelAppointment] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [payData, setpayData] = useState({});
  const [loader, setLoader] = useState(true);
  const [type, updateType] = useState('upcoming');
  const [statsData, updateStatsData] = useState({});
  const [OptDiv, setOptDiv] = useState(false);
  const [msg, updateMSgs] = useState(
      {
        head: 'You are rescheduling within 48 hours of your current appointment',
        button: 'Yes, cancel',
      },
  );
  // const [currIdx, setCurrIndex] = useState(-1);

  // const [selIndex, setSelectedIndex] = useState(-1);
  useEffect(() => {
    if (location.state?.data === 'past') {
      updateType('past');
    }
    getCustStats();
    Mixpanel.track(service['appointment']['title'], service['appointment']['props']);
    gtag('event', gaService['appointment']['title'], {
      'event_category': gaService['appointment']['category'],
    });
  }, []);
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

  const restrictUser = sessionStorage.getItem('resctrict_user_actions');

  useEffect(() => {
    // updateType('upcoming');
    setLoader(true);
    const TimeInterval = setInterval(() => {
      getAppointmentDetails();
    }, 2000);
    return () => clearInterval(TimeInterval);
  }, [type]);
  const getAppointmentDetails = async () => {
    const filter = `?type=${type}`;
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.appointmentList + filter,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject).then((response: ApiResponseProps) => {
      if (response.status_code === 200) {
        const data = response.data.result;
        setAppointmentsList(data);
        setLoader(false);
      } else {
        setLoader(false);
      }
    });
  };
  const updateAppInfo = async (info, type?: any) => {
    setSelAppointment(info);
    if (type) {
      cancelAppoint(info, type);
    }
  };
  const cancelAppoint = async (info, type) => {
    const apiObject: PayloadProps = {
      payload: {
        offSet: offset.toString(),
        appointmentId: info['_id'],
      },
      method: 'POST',
      apiUrl: apiEndpoint.validateAppointment,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject).then((response: ApiResponseProps) => {
      if (response.status_code === 200) {
        setpayData(response.data);
        const data = response.data;
        if (
          (data['isPaymentDone'] && data['isPaymentRequired']) ||
          !data['isPaymentRequired']
        ) {
          navigate({
            pathname: '/book-appointment',
            search: `?${createSearchParams({
              link: info['acuity_confirmation_page'],
            })}`,
          });
        } else {
          if (type === 'res') {
            updateMSgs({
              head: 'You are rescheduling within 48 hours of your current appointment',
              button: 'Yes, reschedule',
            });
            setOpenDialog(true);
          } else {
            updateMSgs({
              head: 'You are cancelling within 48 hours of your current appointment',
              button: 'Yes, cancel',
            });
            setOpenDialog(true);
          }
        }
      }
    });
  };
  const navigateAppoint = (data, appData) => {
    if (
      (data['isPaymentDone'] && data['isPaymentRequired']) ||
      !data['isPaymentRequired']
    ) {
      navigate({
        pathname: '/book-appointment',
        search: `?${createSearchParams({
          link: appData['acuity_confirmation_page'],
        })}`,
      });
    } else {
      navigate({
        pathname: '/add-payment',
        search:
          // eslint-disable-next-line max-len
          `?${createSearchParams({
            paymentFee: data['paymentFees'],
            link: appData['acuity_confirmation_page'],
            id: appData['_id'],
          })}`,
      });
    }
  };
  const rebookAppoint = (info) => {
    const userDetails = JSON.parse(getLocalStorage('userData'));
    const linkUrl =
      'https://app.squarespacescheduling.com/schedule.php?owner=' +
      userDetails['assignment_details']['ClientAssignments']['Health Coach'][
          'acuity_owner_id'
      ] +
      '&calendarID=' +
      userDetails['assignment_details']['ClientAssignments']['Health Coach'][
          'acuity_calendar_id'
      ] +
      '&appointmentType=' +
      userDetails['assignment_details']['ClientAssignments']['Health Coach'][
          'reschedule_follow_up_appointment_type_id'
      ] +
      '&field:' +
      userDetails['assignment_details']['ClientAssignments']['Health Coach'][
          'reschedule_intake_form_textbox_id'
      ] +
      '=' +
      info['acuity_appointment_id'] +
      '&firstName=' +
      userDetails['first_name'] +
      '&lastName=' +
      userDetails['last_name'] +
      '&phone=' +
      userDetails['phone'] +
      '&email=' +
      userDetails['email'];
    navigate({
      pathname: '/book-appointment',
      search: `?${createSearchParams({link: linkUrl})}`,
    });
    // navigate('/book-appointment');
  };

  const [Id, setId] = useState(null);
  const handleOpen = (id) => {
    const Iddd = appointmentsList.filter((item) => item['_id'] === id);
    if (id !== Id) {
      setOptDiv(true);
    } else {
      setOptDiv(!OptDiv);
    }
    setId(Iddd[0]['_id']);
  };

  const dropDown = useRef(null);

  return (
    <>
      {loader ? (
        <Loader>
          <Spinner size="6px" />
        </Loader>
      ) : null}
      {openDialog && (
        <BackDrop>
          <DialogContainer className="p-60">
            <CloseIcon onClick={()=>setOpenDialog(false)}>
              <Icon name='close' />
            </CloseIcon>
            <div>
              <Heading3>
                {msg['head']}
              </Heading3>
              <Description style={{textAlign: 'center'}}>
                {/* {msg['subHead']}<b>{msg['boldTxt']}</b>{msg['subHead1']} */}
                If you&#39;d like to reschedule you will be charged a
                <b> $25 fee </b>
                once you confirm your new appointment.
                <br />
                <br />
              </Description>
              <div className='d-flex jc-center'>
                <Button
                  variant={'primary'}
                  size="large"
                  width="60%"
                  onClick={() => {
                    navigateAppoint(payData, selAppointment);
                    Mixpanel.track(action['appointment']['yes']['title'], action['appointment']['yes']['props']);
                    gtag('event', gaAction['appointment']['yes']['title'], {
                      'event_category': gaAction['appointment']['yes']['category'],
                    });
                  }}
                  className={'flx-center'}
                >
                  {msg['button']}
                </Button>
              </div>
              <div className='d-flex jc-center'>
                <Button
                  variant={'secondary'}
                  size="large"
                  width="60%"
                  className={'flx-center mt-20'}
                  onClick={() => {
                    setOpenDialog(false);
                    Mixpanel.track(action['appointment']['no']['title'], action['appointment']['no']['props']);
                    gtag('event', gaAction['appointment']['no']['title'], {
                      'event_category': gaAction['appointment']['no']['category'],
                    });
                  }}
                >No, don’t cancel
                </Button>
              </div>
            </div>
          </DialogContainer>
        </BackDrop>
      )}
      {/* {isMobile ? <FlexContainer justifyContent={'space-between'}>
        <IconsContainer onClick={() => {
          navigate('/home');
        } } className='d-flex'>
          <Icon name={'chervonLeft'} />
          <MenuHeader>
      My appointments      </MenuHeader>
        </IconsContainer>

      </FlexContainer> : null} */}
      <MainContainer
        bgColor={'#FAFAFC'}
        ref={dropDown}
        onClick={() => {
          if (OptDiv === true) {
            // setOptDiv(false);
          } else {
            // setOptDiv(true);
          }
        }}
      >
        <Header hideBackArrow={false} className="txt-left" desktopMenu={isMobile ? false : true} />
        {!loader ? (
          <ScrollSection
            id="scrollable-div"
            className={isMobile ? 'w-100 flex-1 mb-64' : 'w-100 flex-1'}
          >
            <DesktopWidth>
              {true ? (
                <BadgeContainer
                  className={
                    isMobile ? 'pos-unset w-100 br-0' : 'pos-unset w-100'
                  }
                  style={{maxWidth: '640px', margin: '0 auto'}}
                >
                  {isMobile ? (
                    <ContentContainer className={isMobile ? 'p-0' : 'br-bg'}>
                      <FlexContainer
                        className={isMobile ? 'ptb-0' : ''}
                        justifyContent={'space-between'}
                      >
                        <IconsContainer
                          onClick={() => {
                            navigate('/home');
                          }}
                        >
                          <Icon name={'chervonLeft'} />
                        </IconsContainer>
                      </FlexContainer>
                    </ContentContainer>
                  ) : null}
                  <MenuHeader>Your appointments </MenuHeader>
                  <BadgeRow className="item">
                    <BadgePill
                      className={type === 'upcoming' ? 'active' : ''}
                      onClick={() => {
                        updateType('upcoming');
                        Mixpanel.track(action['appointment']['upcoming']['title'], action['appointment']['upcoming']['props']);
                        gtag('event', gaAction['appointment']['upcoming']['title'], {
                          'event_category': gaAction['appointment']['upcoming']['category'],
                        });
                      }}
                    >
                      Upcoming
                    </BadgePill>
                    <BadgePill
                      className={type === 'past' ? 'active mlt-15' : ' mlt-15'}
                      onClick={() => {
                        updateType('past');
                        Mixpanel.track(action['appointment']['past']['title'], action['appointment']['past']['props']);
                        gtag('event', gaAction['appointment']['past']['title'], {
                          'event_category': gaAction['appointment']['past']['category'],
                        });
                      }}
                    >
                      Past
                    </BadgePill>
                  </BadgeRow>
                  <AppointmentsStatusCard
                    className="d-flex"
                    bgColor={type === 'past' ? '#CDEAE1' : '#FADDBC'}
                  >
                    <div className="d-flex  flex-1 gap-10 AppointmentStatusTitle">
                      <Icon name="calendar" />
                      {type === 'upcoming' ?
                        appointmentsList.length + ' appointments left' :
                        statsData['subscriptionPaymentsReceivedCount'] +
                          '/' +
                          statsData['subscriptionPlanDuration'] +
                          ' months complete'}
                    </div>
                    {/* <Button variant={'disabled'}
              size='large' width='110px'
              className={ 'flx-center clr-gray'}
            ><Icon name='plusIcon'/>Add</Button> */}
                  </AppointmentsStatusCard>
                  {appointmentsList.length ? (
                    <>
                      {appointmentsList.map((info: any, i: number) => {
                        return (
                          <BadgeRow key={i} className="my-10">
                            <ContentBox className="fl-col">
                              <BadgeRow className="w-100">
                                <ScheduleDiv>
                                  <div className="d-flex">
                                    {info['health_coach']['display_url'] ? (
                                      <IconsContainer className="w-46">
                                        <ImageWrapper className="blur-image">
                                          <img
                                            src={
                                              info['health_coach'][
                                                  'display_url'
                                              ]
                                            }
                                            alt="User"
                                          />
                                        </ImageWrapper>
                                      </IconsContainer>
                                    ) : (
                                      <ProDefImage className="w-50">
                                        {info['health_coach']['name'].charAt(0)}
                                        {info['health_coach']['name'].charAt(1)}
                                      </ProDefImage>
                                    )}
                                    <BadgeLabel className="w-500">
                                      {info['health_coach']['name']}
                                      <br></br>
                                      <span>Health Coach</span>
                                    </BadgeLabel>
                                  </div>
                                  {type !== 'past' &&
                              !info['rebook_appointment_enable'] ? <DropDiv>
                                <ImgDiv>
                                  <MenuImg
                                    src={menu}
                                    alt="menu"
                                    onClick={(e) => handleOpen(info['_id'])}
                                  />
                                </ImgDiv>
                                {OptDiv && info['_id'] === Id ? (
                                      <MenuOptDiv>
                                        <MenuOptions>
                                          <label
                                            onClick={() => {
                                              updateAppInfo(info, 'res');
                                              setOptDiv(!OptDiv);
                                              Mixpanel.track(action['appointment']['reschedule']['title'], action['appointment']['reschedule']['props']);
                                              gtag('event', gaAction['appointment']['reschedule']['title'], {
                                                'event_category': gaAction['appointment']['reschedule']['category'],
                                              });
                                            }}
                                          >
                                            Reschedule
                                          </label>
                                          <label
                                            onClick={() => {
                                              updateAppInfo(info, 'can');
                                              setOptDiv(!OptDiv);
                                              Mixpanel.track(action['appointment']['cancel']['title'], action['appointment']['cancel']['props']);
                                              gtag('event', gaAction['appointment']['cancel']['title'], {
                                                'event_category': gaAction['appointment']['cancel']['category'],
                                              });
                                            }}
                                          >
                                            Cancel appointment
                                          </label>
                                        </MenuOptions>
                                      </MenuOptDiv>
                                    ) : (
                                      false
                                    )}
                              </DropDiv> : null}
                                </ScheduleDiv>
                              </BadgeRow>
                              <BadgeRow className="w-100">
                                <BadgeLabel className="ptb-15">
                                  {dateFormats(
                                      info['start_date'],
                                      'ddd, MMM Do',
                                  )}
                                  &nbsp;
                                  {dateFormats(info['start_date'], 'h:mm a')}-
                                  {dateFormats(info['end_date'], 'h:mm a')}
                                </BadgeLabel>
                                {/* <BadgePill className={info['acuity_appointment_status']}>
                      {info['acuity_appointment_status']}</BadgePill> */}
                              </BadgeRow>
                              {/* <BadgeRow > */}
                              <div className="d-block gap-10  w-100">
                                {
                                  <Button
                                    variant={restrictUser === 'false' ? 'disabled' :
                                      info['pre_session_servery_enable'] ?
                                        'secondary' :
                                        'disabled'
                                    }
                                    size="large"
                                    width="100%"
                                    className={`flx-center clr-gray mb-10`}
                                    onClick={() => {
                                      if (info['pre_session_servery_enable']) {
                                        updateAppInfo(info);
                                        navigate('/pre-survey/' + info['_id']);
                                      }
                                      Mixpanel.track(action['appointment']['preCheckin']['title'], action['appointment']['preCheckin']['props']);
                                      gtag('event', gaAction['appointment']['preCheckin']['title'], {
                                        'event_category': gaAction['appointment']['preCheckin']['category'],
                                      });
                                    }}
                                  >
                                    Pre Check-in
                                  </Button>
                                }
                                {(!info['post_session_servery_enable'] &&
                                  type !== 'past' &&
                                  !info['pre_session_servery_enable']) ||
                                info['zoom_link_enable'] ? (
                                  <Button
                                    variant={restrictUser === 'false' ? 'disabled' :
                                      info['zoom_link_enable'] ?
                                        'primary' :
                                        'disabled'
                                    }
                                    size="large"
                                    width="100%"
                                    onClick={() => {
                                      if (info['zoom_link_enable']) {
                                        window.open(
                                            info['health_coach']['zoom_link'],
                                        );
                                      }
                                      Mixpanel.track(action['appointment']['joinMeet']['title'], action['appointment']['joinMeet']['props']);
                                      gtag('event', gaAction['appointment']['joinMeet']['title'], {
                                        'event_category': gaAction['appointment']['joinMeet']['category'],
                                      });
                                    }}
                                    className={'flx-center clr-gray'}
                                  >
                                    Join Meeting
                                  </Button>
                                ) : null}

                                {type === 'past' ? (
                                  <Button
                                    variant={restrictUser === 'false' ? 'disabled' :
                                      info['post_session_servery_enable'] ?
                                        'primary' :
                                        'disabled'
                                    }
                                    size="large"
                                    width="100%"
                                    className={'flx-center clr-gray'}
                                    onClick={() => {
                                      if (info['post_session_servery_enable']) {
                                        updateAppInfo(info);
                                        navigate('/post-survey/' + info['_id']);
                                      }
                                      Mixpanel.track(action['appointment']['postCheckin']['title'], action['appointment']['postCheckin']['props']);
                                      gtag('event', gaAction['appointment']['postCheckin']['title'], {
                                        'event_category': gaAction['appointment']['postCheckin']['category'],
                                      });
                                    }}
                                  >
                                    Post Check-in
                                  </Button>
                                ) : null}
                              </div>

                              {type !== 'past' &&
                              info['rebook_appointment_enable'] ? (
                                <BadgeRow className="w-100 js-cen">
                                  <Link
                                    className="link-st"
                                    onClick={() => {
                                      updateAppInfo(info);
                                      rebookAppoint(info);
                                      Mixpanel.track(action['appointment']['rebook']['title'], action['appointment']['rebook']['props']);
                                      gtag('event', gaAction['appointment']['rebook']['title'], {
                                        'event_category': gaAction['appointment']['rebook']['category'],
                                      });
                                    }}
                                  >
                                    Rebook Appointment
                                  </Link>
                                </BadgeRow>
                              ) : null}
                              {/* {type !== 'past' &&
                              !info['rebook_appointment_enable'] ? (
                                <BadgeRow className="w-100 js-cen">
                                  <Link
                                    className="link-st"
                                    onClick={() => {
                                      updateAppInfo(info, 'res');
                                      Mixpanel.track(action['appointment']['reschedule_cancel']['title'], action['appointment']['reschedule_cancel']['props']);
                                      gtag('event', gaAction['appointment']['reschedule_cancel']['title'], {
                                        'event_category': gaAction['appointment']['reschedule_cancel']['category'],
                                      });
                                    }}
                                  >
                                    Reschedule <span className='col'>or</span> cancel <span className='col'>appointment</span>
                                  </Link>
                                </BadgeRow>
                              ) : null} */}
                              {/* </BadgeRow> */}
                            </ContentBox>
                          </BadgeRow>
                        );
                      })}
                    </>
                  ) : (
                    <div className="text-center mh-250 d-flex js-cen">
                      {type === 'past' ?
                        'No appointments completed' :
                        'No  upcoming appointments'}
                    </div>
                  )}
                </BadgeContainer>
              ) : null}
            </DesktopWidth>
          </ScrollSection>
        ) : null}
        {isMobile ? <BotoomHeader /> : null}
      </MainContainer>
    </>
  );
}
