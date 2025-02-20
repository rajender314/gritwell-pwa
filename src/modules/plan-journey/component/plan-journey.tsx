/* eslint-disable max-len */
import {
  BodyText2,
  ContentContainer,
  IconsContainer,
  ImageWrapper,
} from '@app/modules/assesment-questions/assesment-questions-components';
import {
  DesktopWidth,
  GWSliderCard,
  GWSliderContentHolder,
  GWSliderImageHolder,
  GWSliderSection,
  Heading,
  Heading3,
  MainContainer,
} from '@app/styles/common-styles';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import vector from '@app/assets/images/journeyimage.png';
import vector1 from '@app/assets/images/journeyimage-des.png';
import {
  CardCureentStatus,
  CardLabel,
  DTrackCard,
  MonthLabel,
  PlanJourneyCard,
  PlanJourneyDecor,
  PlanJourneyTrack,
  PlanJourneyWrapper,
  PlanTrackCard,
  // TrackCard,
  TrackHeader,
} from './plan-journey-components';
import Icon from '@app/components/icon';
import {whiteColor} from '@app/styles';
import {
  FooterButtons,
  ScrollSection,
} from '@app/modules/boarding-screens/component/boarding-screen-components';
import Button from '@app/components/button';
import {isMobile} from 'react-device-detect';
import {getLocalStorage} from '@app/core/localStorageService';
import React from 'react';
import Header from '@app/components/header';
// eslint-disable-next-line max-len
import {Description} from '@app/components/layout-onBoarding/layout-onBoarding-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import {PayloadProps, ApiResponseProps} from '@app/schema/schema';
import apiEndpoint from '@app/core/apiend_point';
import {triggerApi} from '@app/services';
import {BadgeLabel} from '@app/modules/home/home-components';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
// import {logoutGlobalSession} from '@app/utils';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';

// import {useNavigate} from 'react-router-dom';
/**
 * Renders Component.
 * @return {PlanJourney} renders Component.
 */
export default function PlanJourney() {
  const navigate = useNavigate();
  const [stories, updateStories] = useState([]);
  const [loader, updateLoader] = useState(true);
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
          slidesToScroll: 1,
          infinite: false,
        },
      },
    ],
  };

  const [userPlan, setUserPlan] = useState<any>();
  // const [configDa, updateConfigData] = useState({

  // });
  const [plan, updatePlan] = useState(userPlan?.subscription_plan_info?.plan_slug);
  useEffect(() => {
    updateLoader(true);
    getStories();
    const data = JSON.parse(localStorage.getItem('userData'));
    // const cData= JSON.parse(getLocalStorage('configList'));
    // updateConfigData(cData);
    setUserPlan(data);
    updatePlan(data?.subscription_plan_info?.plan_slug);
    Mixpanel.identify(userPlan?._id);
    Mixpanel.track(service['plan_Jouney']['title'], service['plan_Jouney']['props']);
    gtag('event', gaService['plan_Jouney']['title'], {
      'event_category': gaService['plan_Jouney']['category'],
    });
  }, []);
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
        updateLoader(false);
      } else {
        updateStories([]);
        updateLoader(false);
      }
    });
  };

  const [trackList, setTrackList] = useState([]);
  const rootcauseTrackList = [
    {
      desc: 'Complete  Timeline Analysis',
      bgColor: '#FCFAF6',
      icon: 'inTakeN',
      class: 't-18-pl',
      iconColor: '#CDEAE1',
      active: 'active',
    },
    {
      desc: 'Complete Imbalance Analysis',
      bgColor: '#FAFAFC',
      icon: 'delay',
      class: 't-18-pl',
      iconColor: '#F9D4A9',
    },
    {
      desc: 'Receive & Complete Inflammation Test',
      bgColor: '#FCFAF6',
      icon: 'team',
      class: 't-18-pl',
      iconColor: '#EEF0F4',
    },
    {
      desc: 'Receive & Review Results',
      bgColor: '#FCFAF6',
      icon: 'heart',
      class: 't-18-pl',
      iconColor: '#EEF0F4',
    },
    {
      desc: 'Book 1:1 Appointment with Health Caoch',
      bgColor: '#EEF0F4',
      icon: 'symptom',
      class: 't-18-pl',
      iconColor: '#EEF0F4',
    },
  ];
  const jumpstartTrackList = [
    {
      desc: 'Complete matching assessment',
      bgColor: '#FCFAF6',
      icon: 'inTakeN',
      class: 't-18-pl',
      iconColor: '#CDEAE1',
      active: 'active',
    },
    {
      desc: 'Complete in depth health history & analysis',
      bgColor: '#FAFAFC',
      icon: 'delay',
      class: 't-18-pl',
      iconColor: '#F9D4A9',
    },
    {
      desc: 'Meet your functional medicine health coach',
      bgColor: '#FAFAFC;',
      icon: 'team',
      class: 't-18-pl',
      iconColor: '#EEF0F4',
    },
    {
      desc: 'Receive phases of care for your journey',
      bgColor: '#FAFAFC;',
      icon: 'heart',
      class: 't-18-pl',
      iconColor: '#EEF0F4',
    },
    {
      desc: 'Receive a personalized health plan ',
      bgColor: '#FAFAFC;',
      icon: 'symptom',
      class: 't-18-pl',
      iconColor: '#EEF0F4',
    },
    {
      desc: 'Monthly appointments with your coach',
      bgColor: '#FAFAFC;',
      icon: 'calendar',
      class: 't-18-pl',
      iconColor: '#EEF0F4',
    },
    {
      desc: 'A healthier version of you',
      bgColor: '#FAFAFC;',
      icon: 'userCheck',
      class: 't-18-pl',
      iconColor: '#EEF0F4',
    },
  ];
  const comperhensiveTrackList = [
    {
      desc: 'Complete matching assessment',
      bgColor: '#FCFAF6',
      icon: 'inTakeN',
      class: 't-18-pl',
      iconColor: '#CDEAE1',
      active: 'active',
    },
    {
      desc: 'Complete in depth health history & analysis',
      bgColor: '#FAFAFC',
      icon: 'delay',
      class: 't-18-pl',
      iconColor: '#F9D4A9',
      active: '',
    },
    {
      desc: 'Meet your functional medicine health coach',
      bgColor: '#FAFAFC;',
      icon: 'team',
      class: 't-18-pl',
      iconColor: '#EEF0F4',
      // view: true,
    },
    {
      desc: 'Receive phases of care for your journey',
      bgColor: '#FAFAFC;',
      icon: 'heart',
      class: 't-18-pl',
      iconColor: '#EEF0F4',
    },
    {
      desc: 'Receive a personalized health plan ',
      bgColor: '#FAFAFC;',
      icon: 'symptom',
      class: 't-18-pl',
      iconColor: '#EEF0F4',
    },
    {
      desc: 'Bi-weekly appointments with your coach',
      bgColor: '#FAFAFC;',
      icon: 'calendar',
      class: 't-18-pl',
      iconColor: '#EEF0F4',
    },
    {
      desc: 'A healthier version of you',
      bgColor: '#FAFAFC;',
      icon: 'userCheck',
      class: 't-18-pl',
      iconColor: '#EEF0F4',
    },
  ];

  useEffect(() => {
    // setTimeout(() => {
    //   // navigate('/');
    // }, 1000);

    // eslint-disable-next-line no-unused-vars
    const userData = getLocalStorage('userData') ?
      JSON.parse(getLocalStorage('userData')) :
      {};
    const planSlug= userData?.subscription_plan_info?.plan_slug;
    updatePlan(userData?.subscription_plan_info?.plan_slug);

    if (planSlug === 'rootcause') {
      setTrackList(rootcauseTrackList);
    } else if (planSlug === 'jumpstart') {
      setTrackList(jumpstartTrackList);
    } else {
      setTrackList(comperhensiveTrackList);
    }
  }, []);
  return (
    <>
      <MainContainer
        bgColor="#ffff"
        className={isMobile ? 'flx-start fxh-100' : ''}
      >
        {!isMobile ? (
          <Header hideBackArrow={false} className="txt-left" desktopMenu={false} hideBack={true}/>
        ) : null}
        <ScrollSection
          id="scrollable-div"
          className={isMobile ? 'flex-1 mb-64 scroll-h64' : 'flex-1'}
        >
          <div className="pos-rel">
            <div
              className={
                isMobile ?
                  '' :
                  'pos-rel d-flex justify-content-end ' +
                    'bg-blue bg-after left  max-vw max-w'
              }
            >
              {
                <IconsContainer
                  className={isMobile ? 'bg-after left' : 'bg-wh'}
                  onClick={() => navigate('/home')}
                >
                  <ImageWrapper>
                    <img src={isMobile ? vector : vector1} alt="User" />
                  </ImageWrapper>
                </IconsContainer>
              }
            </div>
            <DesktopWidth
              className={isMobile ? '' : 'w-1150 ptb-0 commonSection-padding'}
            >
              <ContentContainer className="ptb-0">
                <Heading
                  className={isMobile ? 'f-32' : 'f-32  m-0 text-center'}
                >
                  An overview of your journey
                </Heading>
              </ContentContainer>
              {isMobile ? (
                <ContentContainer
                  className={
                    isMobile ? 'tracking-cont pos-rel' : 'tracking-cont pos-rel'
                  }
                >
                  {trackList.map((info: any, i: number) => {
                    return (
                      <>
                        {plan === 'rootcause' ? (
                          <div>
                            {i === 0 ? <MonthLabel>Start</MonthLabel> : ''}
                            {i === 4 ? <MonthLabel>End</MonthLabel> : ''}
                          </div>
                        ) : plan === 'jumpstart' ? (
                          <>
                            {i === 0 ? <MonthLabel>1st month</MonthLabel> : ''}
                            {i === 6 ? <MonthLabel>2-3rd month</MonthLabel> :
                              ''}
                          </>
                        ) : (
                          <>
                            {i === 0 ? (
                              <MonthLabel className="b-0">1st month</MonthLabel>
                            ) : (
                              ''
                            )}
                            {i === 6 ? <MonthLabel>6th month</MonthLabel> : ''}
                            {i === 5 ? (
                              <MonthLabel>2nd - 5th month</MonthLabel>
                            ) : (
                              ''
                            )}
                          </>
                        )}
                        <PlanTrackCard className={i == 0 ? 'active pos-rel' : ''}>
                          <TrackHeader key={i} color={info['iconColor']}>
                            <IconsContainer
                              key={i}
                              className="track-icons h-21 br-rad"
                              color={info['iconColor']}
                            >
                              <Icon name={info['icon']} />
                            </IconsContainer>
                            <BodyText2 className="f-17">
                              {info['desc']}
                            </BodyText2>
                            {info['view'] ? (
                              <span
                                className="text-center d-flex p-8
                                  active"
                                onClick={() => {
                                  if (info['view']) {
                                    navigate('/phases-care');
                                  }
                                }}
                              >
                                <Icon name="chevronRightCircled" />
                              </span>
                            ) : null}
                          </TrackHeader>
                        </PlanTrackCard>
                      </>
                    );
                  })}
                </ContentContainer>
              ) : null}
              {!isMobile ? (
                <ContentContainer className={isMobile ? '' : 'ptb-0'}>
                  <div>
                    <PlanJourneyWrapper>
                      <PlanJourneyTrack className={plan === 'rootcause' ?
                        'center' : ''}>
                        {trackList.map((info: any, i: number) => {
                          return (
                            <>
                              <PlanJourneyCard
                                className={
                                  info['active'] ? 'active' : 'inactive'
                                }
                              >
                                {plan === 'rootcause' ? (
                                  <div>
                                    {i === 0 ? (
                                      <CardLabel>Start</CardLabel>
                                    ) : (
                                      ''
                                    )}
                                    {i === 4 ? <CardLabel>End</CardLabel> : ''}
                                  </div>
                                ) : plan === 'jumpstart' ? (
                                  <div>
                                    {i === 0 ? (
                                      <CardLabel>1st month</CardLabel>
                                    ) : (
                                      ''
                                    )}
                                    {i === 6 ? (
                                      <CardLabel>2-3rd month</CardLabel>
                                    ) : (
                                      ''
                                    )}
                                  </div>
                                ) : (
                                  <div>
                                    {i === 0 ? (
                                      <CardLabel className="b-0">
                                        1st month
                                      </CardLabel>
                                    ) : (
                                      ''
                                    )}
                                    {i === 6 ? (
                                      <CardLabel>6th month</CardLabel>
                                    ) : (
                                      ''
                                    )}
                                    {i === 5 ? (
                                      <CardLabel>2nd - 5th month</CardLabel>
                                    ) : (
                                      ''
                                    )}
                                  </div>
                                )}
                                <DTrackCard
                                  bgColor={info['bgColor']}
                                  color={info['iconColor']}
                                  className="cust-border h-165"
                                >
                                  <div key={i} className="flex-column m-0 ">
                                    <IconsContainer
                                      key={i}
                                      className="w-100-br"
                                      color={info['iconColor']}
                                    >
                                      <Icon name={info['icon']} />
                                    </IconsContainer>
                                    <div>
                                      <BodyText2 className="f-17 text-center ">
                                        {info['desc']}
                                      </BodyText2>
                                      {info['view'] ? (
                                        <CardCureentStatus
                                          className="text-center
                                  active"
                                          onClick={() => {
                                            if (info['view']) {
                                              navigate('/phases-care');
                                            }
                                          }}
                                        >
                                          View details
                                        </CardCureentStatus>
                                      ) : null}
                                    </div>
                                  </div>
                                </DTrackCard>
                                {/* {info['view'] ?
                                 <BadgePill className='text-center
                                  active mt-20 mb-10 '>
                                  You are here</BadgePill> : null} */}
                              </PlanJourneyCard>
                            </>
                          );
                        })}
                        <PlanJourneyDecor></PlanJourneyDecor>
                      </PlanJourneyTrack>
                    </PlanJourneyWrapper>
                  </div>
                  <div className="d-flex justify-content-center mt-24">
                    <Button
                      variant="primary"
                      size="large"
                      width="300px"
                      onClick={() => {
                        navigate('/home');
                        Mixpanel.track(action['planJourney']['getStarted']['title'], action['planJourney']['getStarted']['props']);
                        gtag('event', gaAction['planJourney']['getStarted']['title'], {
                          'event_category': gaAction['planJourney']['getStarted']['category'],
                        });
                      }}
                    >
                      Get Started
                    </Button>
                  </div>
                </ContentContainer>
              ) : null}
              {/* <ContentContainer bgColor={plansBackgroundColor}>
                <SubHeading3>
              Case Studies
                </SubHeading3>
              </ContentContainer> */}
            </DesktopWidth>
          </div>
          <GWSliderSection bgColor={'#E9DCCE'}>
            <DesktopWidth
              className={isMobile ? 'm-auto' : 'w-1150 m-auto ptb-0'}
            >
              <ContentContainer
                bgColor={'transparent'}
                className={isMobile ? 'py-0' : 'py-0'}
              >
                <Heading3
                  className={isMobile ? 'align-left mb-32' : 'align-left mb-32'}
                  style={{marginTop: '0'}}
                >
                  Inspiration from our community
                </Heading3>
                {!loader ? (
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
                                <div
                                  className=" clientDetails d-flex flex-column
                              align-items-start"
                                >
                                  <span className="clientName">
                                    {info['name']}
                                  </span>
                                  <span className="clientAge">
                                    Age
                                    {info['age']}
                                  </span>
                                </div>
                                <BadgeLabel
                                  className="get-details p-0"
                                  onClick={() => {
                                    window.open(info['doc_file_name']);
                                    Mixpanel.track(action['planJourney']['caseStudy']['title'], action['planJourney']['caseStudy']['props']);
                                    gtag('event', gaAction['planJourney']['caseStudy']['title'], {
                                      'event_category': gaAction['planJourney']['caseStudy']['category'],
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
                ) : null}
              </ContentContainer>
            </DesktopWidth>
          </GWSliderSection>
        </ScrollSection>

        {isMobile ? (
          <DesktopWidth
            className="w-100 ptb-0 fixed-footer h-64"
            bgColor={whiteColor}
          >
            <>
              <FooterButtons
                bgColor={whiteColor}
                className={
                  isMobile ? 'flx-center b-0' : 'b-0 justify-content-center'
                }
              >
                <Button
                  variant={'primary'}
                  size="large"
                  width="100%"
                  onClick={() => {
                    // if (userPlan?.subscription_plan_info?.plan_slug===
                    //   'rootcause') {
                    //   logoutGlobalSession();
                    //   window.location.replace(configDa['rcRedirectUrl'] ? configDa['rcRedirectUrl'] : 'https://gritwell-1.webflow.io/home-v2' );
                    // } else {
                    navigate('/home');
                    // }
                  }}
                  className={'flx-center'}
                >
                  {isMobile ? 'Get Started' : 'Continue to next step'}
                </Button>
              </FooterButtons>
            </>
          </DesktopWidth>
        ) : null}
      </MainContainer>
    </>
  );
}
