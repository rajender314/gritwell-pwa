/* eslint-disable max-len */
import Header from '@app/components/header';
import Icon from '@app/components/icon';
import {getLocalStorage} from '@app/core/localStorageService';
import {
  DesktopWidth,
  GProgressBar,
  GProgressBarFill,
  Heading,
  Heading3,
  MainContainer,
  Loader,
} from '@app/styles/common-styles';
import {useEffect, useState} from 'react';
import Button from '@app/components/button/button';
import {isMobile} from 'react-device-detect';
import {useNavigate} from 'react-router-dom';
import {
  BodyText2,
  ContentContainer,
  IconName,
  IconsContainer,
} from '../assesment-questions/assesment-questions-components';
import {
  ScrollSection,
} from '../boarding-screens/component/boarding-screen-components';
import {
  BadgeContainer,
  BadgeHeading,
  BadgeLabel,
  BadgeRow,
  GWColumn,
  GWColumnLeft,
  GWColumnRight,
  HeroBannerHeading,
  HeroBannerSection,
  HeroBannerSubHeading,
} from '../home/home-components';
import {
  CardCureentStatus,
  CardLabel,
  DTrackCard,
  MonthLabel,
  PlanJourneyCard,
  PlanJourneyDecor,
  PlanJourneyTrack,
  PlanJourneyWrapper,
  TrackCard,
  TrackHeader,
} from '../plan-journey/component/plan-journey-components';
import {Description} from '@app/components/layout-onBoarding/layout-onBoarding-components';
import React from 'react';
import apiEndpoint from '@app/core/apiend_point';
import {PayloadProps, ApiResponseProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import {dateFormats} from '@app/utils/dateformat';
import BotoomHeader from '@app/components/footer-menu';
import Spinner from '@app/components/icon/icons/loader';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';
import _ from 'lodash';

/**
 * Renders Component.
 * @return {HealthJourney} renders Component.
 */
export default function HealthJourney() {
  const navigate = useNavigate();
  const [trackList, setUpdateList] = useState<any>([
    {
      desc: 'Complete Health Assessment',
      bg_color: '#FCFAF6',
      icon: 'inTakeN',
      class: 't-18-pl',
      icon_color: '#CDEAE1',
      active: 'active',
    },
    {
      desc: 'Health history & Symptom Analysis',
      bg_color: '#E8F4F3',
      icon: 'delay',
      class: 't-18-pl',
      icon_color: '#E9DCCE',
      active: 'active',
    },
    {
      desc: 'Meet Your Health Coach',
      bg_color: '#F3F7FA;',
      icon: 'team',
      class: 't-18-pl',
      icon_color: '#E9DCCE',
      active: 'active',
    },
    {
      desc: 'Receive Phases of Care',
      bg_color: '#FCFAF6',
      icon: 'heart',
      class: 't-18-pl',
      icon_color: '#CDEAE1',
      active: 'active',
      view: true,
    },
    {
      desc: 'Receive Reccomendations',
      bg_color: '#EEF0F4',
      icon: 'symptom',
      class: 't-18-pl',
      icon_color: '#E9DCCE',
    },
    {
      desc: 'Bi-weekly Appointments',
      bg_color: '#EEF0F4',
      icon: 'calendar',
      class: 't-18-pl',
      icon_color: '#CDEAE1',
    },
    {
      desc: 'A Better You',
      bg_color: '#EEF0F4',
      icon: 'userCheck',
      class: 't-18-pl',
      icon_color: '#F9D4A9',
    },
  ]);
  const [userDeatails, updateUserDetails] = useState({});
  const [isPlanDtl, setIsPlanDtl] = useState(false);
  const token = getLocalStorage('token') ? getLocalStorage('token') : '';
  const [statsData, updateStatsData] = useState({});
  const [curStep, updateCurStep] = useState(1);
  const [loader, updateLoader] = useState(true);

  const restrictUser = sessionStorage.getItem('resctrict_user_actions');
  const [plan, updatePlan] = useState();

  useEffect(() => {
    updateLoader(true);
    setIsPlanDtl(false);
    const userData = getLocalStorage('userData') ?
      JSON.parse(getLocalStorage('userData')) :
      {};
    updateUserDetails(userData);
    updateCurStep(1);
    updateCurrent(userData);
    setUpdateList(userData?.healthJourney);
    updatePlan(userData?.subscription_plan_info?.plan_slug);
    getCustStats();
    Mixpanel.track(service['healtJourney']['title'], service['healtJourney']['props']);
    gtag('event', gaService['healtJourney']['title'], {
      'event_category': gaService['healtJourney']['category'],
    });
  }, []);
  const updateCurrent =async (data:any)=>{
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.phases,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject).then((response: ApiResponseProps) => {
      if (response.status_code === 200) {
        // phData = response.data.result;
      } else {

      }
      const idx= _.findIndex(data?.healthJourney, function(o: any) {
        return o.code === data['current_health_journey_status'];
      });
      // console.log(idx);
      if (idx > -1) {
        updateCurStep(idx + 1);
      } else {
        updateCurStep(1);
      }
    });
    // if (data['current_health_journey_status'] == 'a_better_you') {
    //   updateCurStep(7);
    // } else if (data['current_health_journey_status'] === 'bi-weekly_appointments') {
    //   updateCurStep(6);
    // } else if (data['current_health_journey_status'] === 'advanced_testing') {
    //   updateCurStep(5);
    // } else if (phData.length) {
    //   updateCurStep(4);
    // } else if (data['assignment_details']['hc_assigned']) {
    //   updateCurStep(3);
    // } else if (data['intake_submitted'] && data['symptom_analysis_submitted']) {
    //   updateCurStep(2);
    // } else {
    //   updateCurStep(1);
    // }
    updateLoader(false);
  };
  const getCustStats =async ()=>{
    // const filter= `?onlyFirstAppointment=${true}`;
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.custStatus,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            updateStatsData(response.data);
          } else {

          }
        });
  };
  return (

    <MainContainer bgColor="#ffff" className="flx-start">
      {loader ? <Loader>
        <Spinner size="6px" />
      </Loader> : null}
      <Header hideBackArrow={false} className="txt-left" desktopMenu={isMobile ? false : true} />

      {!loader ? <ScrollSection id="scrollable-div" className={isMobile?'flex-1 flex-unset mb-64':'flex-1 flex-unset'}>
        {!isPlanDtl ? <><HeroBannerSection
          bgColor={'#E9DCCE'}
          className={isMobile ? 'm-auto p-0' : 'm-auto'}
          style={{border: 'none', minHeight: 'unset'}}
        >
          <DesktopWidth className={isMobile ? ' m-auto' : 'w-1150 m-auto'}>
            <ContentContainer
              bgColor={'transparent'}
              className={isMobile ? ' ' : 'py-0 plr-75'}
            >
              <GWColumn
                className={
                  isMobile ?
                    'd-flex flx-col align-items-start' :
                    'd-flex gapXY-80 align-items-start '
                }
              >
                <GWColumnRight className="flex-1">
                  <HeroBannerHeading
                    className={isMobile ? 'f-30 mb-16' : 'f-36 mb-24'}
                  >
                    {(userDeatails ? userDeatails['first_name'] : '') +
                      `'s Health Journey`}
                  </HeroBannerHeading>
                  <HeroBannerSubHeading className={isMobile ? ' f-18 mb-10' : 'HeaderSubText f-24 mb-32'}>
                    You have the grit to get well
                  </HeroBannerSubHeading>
                </GWColumnRight>

                <GWColumnLeft className={isMobile ? 'w-100' : ''}>
                  {!isMobile? <Button variant="secondary" width="auto"
                    onClick={()=> {
                      // setIsPlanDtl(true);

                      Mixpanel.track(action['healthJourney']['planDetails']['title'], action['healthJourney']['planDetails']['props']);
                      gtag('event', gaAction['healthJourney']['planDetails']['title'], {
                        'event_category': gaAction['healthJourney']['planDetails']['category'],
                      });
                      navigate('/profile');
                    }}>
                    See plan details
                  </Button>: null}
                  {isMobile? <BadgeLabel className='get-details' onClick={()=> navigate('/profile')}>
                    See plan details</BadgeLabel>: null}
                </GWColumnLeft>
              </GWColumn>
            </ContentContainer>
          </DesktopWidth>
        </HeroBannerSection>
        <DesktopWidth className="w-1150">
          <ContentContainer className='ptb-0'>
            <Heading className={isMobile ? 'f-24' : 'f-32 mb-0  plr-78'}>
              {userDeatails?.['current_plan_type'] !== 'A la Catre Appointments' ? 'Deep Dive Program' :'Care Extension'}
            </Heading>
          </ContentContainer>
          {isMobile ? (
            <ContentContainer className={(plan!= 'rootcause' && plan!= 'rootcause_without_inflamation') && userDeatails?.['current_plan_type'] !== 'A la Catre Appointments' ? 'tracking-cont-health pos-rel pointer' : 'tracking-cont-health pos-rel'}>
              {trackList.map((info: any, i: number) => {
                return (
                  <>
                    {(plan != 'rootcause' && plan!= 'rootcause_without_inflamation') && userDeatails?.['current_plan_type'] !== 'A la Catre Appointments' ? <> {i === 0 ? (
                      <MonthLabel className="b-0">1st Month</MonthLabel>
                    ) : (
                      ''
                    )}
                    {userDeatails?.['current_plan_type'] !== 'A la Catre Appointments' ? <>{i === trackList.length - 1 ? <MonthLabel> {plan !== 'jumpstart' ? '6th Month' : '2-3rd month' }</MonthLabel> : ''}
                      {i === 5 && plan !== 'jumpstart' ? <MonthLabel>2nd - 5th Month</MonthLabel> : ''}</> : null}
                    </> : null}
                    <TrackCard className={i < curStep && (plan != 'rootcause' && plan != 'rootcause_without_inflamation')? 'pointers active pos-rel' : i < curStep ? 'active pos-rel' : 'inactive'}>
                      <TrackHeader key={i} color={ i < curStep ? info['icon_color'] : '#EEF0F4'}>
                        <IconsContainer
                          key={i}
                          className="track-icons h-21 br-rad"
                          color={i < curStep ? info['icon_color'] : ''}
                        >
                          <Icon name={info['icon']} />
                        </IconsContainer>
                        <div className='d-flex flex-1'>
                          <BodyText2 className="f-14 flex-1">{info['desc']}</BodyText2>
                          {info['view'] ?
                                 <span className='d-flex p-8
                                  active' onClick={()=>{
                                   if (info['view']) {
                                     navigate('/phases-care');
                                     Mixpanel.track(action['healthJourney']['viewPhases']['title'], action['healthJourney']['viewPhases']['props']);
                                     gtag('event', gaAction['healthJourney']['viewPhases']['title'], {
                                       'event_category': gaAction['healthJourney']['viewPhases']['category'],
                                     });
                                   }
                                 }}><Icon name='chevronRightCircled'/></span> : null}
                        </div>
                      </TrackHeader>
                    </TrackCard>
                  </>
                );
              })}
            </ContentContainer>
          ) : null}
          <ContentContainer className={isMobile? ' ': 'py-0 pb-15'}>
            {!isMobile ? (
              <div>
                <PlanJourneyWrapper className='test'>
                  <PlanJourneyTrack className={(plan !='rootcause' && plan!= 'rootcause_without_inflamation') ? 'pointers' : null}>
                    {trackList.map((info: any, i: number) => {
                      return (
                        <>
                          <PlanJourneyCard className={i < curStep ? 'active' : 'inactive'} >
                            {(plan != 'rootcause' && plan!= 'rootcause_without_inflamation') && userDeatails?.['current_plan_type'] !== 'A la Catre Appointments' ?<> {i === 0 ? (
                              <CardLabel>1st month</CardLabel>
                            ) : i === 5 && plan !== 'jumpstart' ? (
                              <CardLabel>2nd - 5th month</CardLabel>
                            ) : i === trackList.length -1 ? (
                              <CardLabel>{plan !== 'jumpstart' ? '6th Month' : '2-3rd month' }</CardLabel>
                            ) : (
                              ''
                            )}</> : null}
                            <DTrackCard
                              bgColor={i < curStep ? info['bg_color'] : ''}
                              color={i < curStep ? info['icon_color'] : ''}
                              className="cust-border h-165"
                              onClick={()=>{
                                if (info['view']) {
                                  navigate('/phases-care');
                                  Mixpanel.track(action['healthJourney']['viewPhases']['title'], action['healthJourney']['viewPhases']['props']);
                                  gtag('event', gaAction['healthJourney']['viewPhases']['title'], {
                                    'event_category': gaAction['healthJourney']['viewPhases']['category'],
                                  });
                                }
                              }}
                            >
                              <div key={i} className="flex-column m-0 ">
                                <IconsContainer
                                  key={i}
                                  className="w-100-br"
                                  color={i < curStep ? info['icon_color'] : ''}
                                >
                                  <Icon name={info['icon']} />
                                </IconsContainer>
                                <div>
                                  <BodyText2 className="f-14 text-center ">
                                    {info['desc']}
                                  </BodyText2>
                                  {info['view'] ?
                                 <CardCureentStatus className='text-center
                                  active' onClick={()=>{
                                   if (info['view']) {
                                     navigate('/phases-care');
                                   }
                                 }}>
                                  View details</CardCureentStatus> : null}
                                </div>
                              </div>
                            </DTrackCard>
                          </PlanJourneyCard>
                        </>
                      );
                    })}
                    <PlanJourneyDecor></PlanJourneyDecor>
                  </PlanJourneyTrack>
                </PlanJourneyWrapper>
              </div>
            ) : null}

            <div className="d-flex flex-column mt-10">
              <Heading3>What happens after my initial program?</Heading3>
              <span className='underLinedArrow'><Icon name='underLineArrow'/></span>
            </div>
          </ContentContainer>{' '}
        </DesktopWidth>
        <HeroBannerSection
          bgColor={'#FAFAFC'}
          className={isMobile ? 'm-auto ' : 'm-auto p-0'}
          style={{border: 'unset', minHeight: 'unset'}}
        >
          <DesktopWidth className={isMobile ? ' m-auto' : 'w-1150 m-auto ptb-0 w-78'}>
            <ContentContainer bgColor={'transparent'} className={isMobile? 'py-0': ''}><div className='d-flex py-0'>
              <Heading3 className={isMobile? 'mt-0': ''}>As a Gritwell Member, you can choose between:</Heading3>
            </div>
            <div
              className={
                isMobile ?
                  'pos-rel d-flex flx-cont flex-column  gap-10' :
                  'd-flex gap-10'
              }
            >
              <BadgeContainer className=" bg-bone align-self">
                <Heading3 className='align-left m-0 mb-10'>Program Extension</Heading3>
                <Description>
                  Continue your monthly subscription and meet your coach twice a
                  month for as long as you need, with the option to end at any
                  time
                </Description>
              </BadgeContainer>
              <BadgeContainer className=" bg-bone align-self">
                <Heading3 className='align-left m-0 mb-10'>Flexible Care</Heading3>
                <Description>
                Purchase appointments for periodic check ins, your choice between 4 or 8 appointments to use when you wish throughout the remainder of the year
                </Description>
              </BadgeContainer>
            </div>

            <Description className='mt-20'>
              Either way, you’ll maintain access to our care advocate support,
              community and orders for the remainder of the year.
            </Description>
            <div className="d-flex justify-content-center mt-30">
              <Button variant={restrictUser === 'false' ? 'disabled' : 'primary'} width="auto"
                className=''
                onClick={()=>{
                  navigate('/open-chat');
                  Mixpanel.track(action['healthJourney']['chatWithManager']['title'], action['healthJourney']['chatWithManager']['props']);
                  gtag('event', gaAction['healthJourney']['chatWithManager']['title'], {
                    'event_category': gaAction['healthJourney']['chatWithManager']['category'],
                  });
                }}>
                Chat with a care manager
              </Button>
            </div>
            </ContentContainer>
          </DesktopWidth>
        </HeroBannerSection></> :

         <><HeroBannerSection
           bgColor={'#E9DCCE'}
           className={'m-auto p-0'}
           style={{borderColor: 'transparent', minHeight: 'unset'}}
         >
           <DesktopWidth className={isMobile ? ' m-auto' : 'w-1150 m-auto'}>
             <ContentContainer
               bgColor={'transparent'}
               className={isMobile ? ' ' : 'py-0'}
             >
               <div className="pb-30">
                 <IconsContainer
                   className="d-flex"
                   onClick={() => {
                     setIsPlanDtl(false);
                     Mixpanel.track(action['healthJourney']['back']['title'], action['healthJourney']['back']['props']);
                     gtag('event', gaAction['healthJourney']['back']['title'], {
                       'event_category': gaAction['healthJourney']['back']['category'],
                     });
                   }}
                 >
                   <Icon name="backArrow" />
                   <IconName className="mlt-15 f-14">Back</IconName>
                 </IconsContainer>
               </div>
               <GWColumn
                 className={isMobile ?
                  'd-flex flx-col' :
                  'd-flex gapXY-80 align-items-start '}
               >
                 <GWColumnRight className="flex-1">
                   <HeroBannerHeading
                     className={isMobile ? 'f-30 mb-16' : 'f-36 mb-24'}
                   >
                     {(userDeatails ? userDeatails['first_name'] : '') +
                      `'s Health Journey`}
                   </HeroBannerHeading>
                   <HeroBannerSubHeading>
                    You have the grit to get welll
                   </HeroBannerSubHeading>
                 </GWColumnRight>
               </GWColumn>

               <div
                 className={isMobile ?
                  'pos-rel d-flex flx-cont flex-column  gap-10' :
                  'd-flex gap-10 mt-30 align-items-stretch'}
               >
                 <BadgeContainer className={isMobile ? 't-100 w-100 mt-20' : 'pxy-40'}>
                   <BadgeRow>
                     <BadgeHeading className="">
                      Ongoing Care program
                     </BadgeHeading>
                   </BadgeRow>
                   <BadgeRow
                     className={isMobile ? 'flx flex-1 my-22' : 'flx flex-1 my-22'}
                   >
                     <BadgeHeading className="clr-black">
                       {/* 1 of 12 months */}
                       {statsData['subscriptionPaymentsReceivedCount']+ ' of '+statsData['subscriptionPlanDuration'] +' months'}
                     </BadgeHeading>
                     <GProgressBar>
                       <GProgressBarFill
                         width={statsData['subscriptionPlanDuration'] > 0 ?((statsData['subscriptionPaymentsReceivedCount'] / statsData['subscriptionPlanDuration']) * 100) + '%' : '0%'}>
                         {/* width={ 100 ?(100+2) * 100) + '%' : '0%' } */}
                       </GProgressBarFill>
                     </GProgressBar>
                   </BadgeRow>
                   <BadgeRow>
                     <BadgeHeading>Started on
                       {dateFormats(userDeatails['subscription_start_date'], ' ddd, MMM Do YYYY')}</BadgeHeading>
                   </BadgeRow>
                 </BadgeContainer>

                 <BadgeContainer className={isMobile ? 't-100 w-100' : 'pxy-40'}>
                   <BadgeRow>
                     <BadgeHeading className="">
                      Your Appointments
                     </BadgeHeading>
                   </BadgeRow>
                   <BadgeRow
                     className={isMobile ? 'flx flex-1 my-22' : 'flx flex-1 my-22'}
                   >
                     <BadgeHeading className="clr-black">
                       {statsData['attendedAppointmentsCount']+ ' of '+statsData['totalAppointmentsCount'] +' appointments'}
                     </BadgeHeading>
                     <GProgressBar>
                       <GProgressBarFill width={statsData['attendedAppointmentsCount'] ?((statsData['attendedAppointmentsCount'] / statsData['totalAppointmentsCount']) * 100) + '%' : '0%' }>
                         {/* width={ 100 ?(100+2) * 100) + '%' : '0%' } */}
                       </GProgressBarFill>
                     </GProgressBar>
                   </BadgeRow>
                   <BadgeRow>
                     {/* <BadgeHeading>Start on 16 June 2022</BadgeHeading> */}
                   </BadgeRow>
                 </BadgeContainer>
               </div>
             </ContentContainer>
           </DesktopWidth>
         </HeroBannerSection><div className={isMobile ? 'plr-30' :'plr-60'}>
           <DesktopWidth className={isMobile ? ' m-auto' : 'w-1150 m-auto'}>
             <ContentContainer>
               <div className='d-flex'><Heading3>Become a Gritwell Member</Heading3></div>
               <Description className='m-0 mb-10'>
                After your first six months you are eligible to become a member:
               </Description>
               <ul>
                 <li className='gw-li mb-20'>Book one-time appointments with your health coach at member friendly rates </li>
                 <li className='gw-li mb-20'>Purchase multiple appointments in bulk and save more</li>
                 <li className='gw-li mb-20'>Supplement ordering and discounts</li>
                 <li className='gw-li mb-20'>Care team access for questions and support</li>
               </ul>
             </ContentContainer>
           </DesktopWidth>
         </div></>}
      </ScrollSection> : null}
      {isMobile ? <BotoomHeader /> : null}
    </MainContainer>
  );
}
