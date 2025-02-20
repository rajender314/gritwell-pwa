/* eslint-disable max-len */
import Header from '@app/components/header';
import {profileBackgroudColor, whiteColor} from '@app/styles';
import {DesktopWidth, GProgressBar, GProgressBarFill, Heading, MainContainer, ProDefImage} from '@app/styles/common-styles';
import React, {useEffect, useState} from 'react';
import {ContentContainer, IconsContainer, ImageWrapper}
  from '../assesment-questions/assesment-questions-components';
import {ScrollSection}
  from '../boarding-screens/component/boarding-screen-components';
import {ContentSection, ProfileHeader}
  from './profile-components';
import cmImg from '@app/assets/images/userIcon.png';
import {BodyText3, Heading4}
  from '../recommend-plans/component/recommend-plans-components';
import {BadgeContainer, BadgeHeading, BadgeLabel, BadgeRow, DetailPara}
  from '../home/home-components';
import BotoomHeader from '@app/components/footer-menu';
import Button from '@app/components/button/button';
import Icon from '@app/components/icon/icon';
import {getLocalStorage, setLocalStorage} from '@app/core/localStorageService';
import TypeFormAnswers from '@app/components/type-form-answers';
import apiEndpoint, {confirmStatements} from '@app/core/apiend_point';
import {isMobile} from 'react-device-detect';
import {createSearchParams, useNavigate} from 'react-router-dom';
import {PayloadProps, ApiResponseProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import {CartCard, CartBrand, CartPill} from '../orders/orders-components';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';
import moment from 'moment';
import {Mixpanel} from '@app/App';
// import {daysDiffDuration} from '@app/utils/dateformat';

/**
 * Renders Component.
 * @return {AccountAccess} renders Component.
 */
export default function Profile() {
  const [userDetails, updateUserDetails] = useState<any>({});
  const [profileImage, setProfileImage] = useState(cmImg);
  const [openDialog, setOpenDialog] = useState(false);
  const [loader, setLoader] = useState(true);
  const [stats, updateStats] = useState({});
  const navigate = useNavigate();

  const [dialogData, updateDialogData] =
  useState(confirmStatements['intakeForm']);
  const [cartItems, updateCartItems] = useState([]);

  // const restrictUser = sessionStorage.getItem('resctrict_user_actions');
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
  useEffect(()=>{
    const userData= JSON.parse(getLocalStorage('userData'));
    updateUserDetails(userData);
    const profilePic = (userData.img_name) ? userData.display_url : cmImg;
    setProfileImage(profilePic);
    updateDialogData(confirmStatements['intakeForm']);
    getProfileData();
    getOrders();
    Mixpanel.track(service['profile']['title'], service['profile']['props']);
    gtag('event', gaService['profile']['title'], {
      'event_category': gaService['profile']['category'],
    });
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
          if (Data?.subscription_plan_info?.plan_slug==='rootcause') {
            // navigate('/rootcause-home');
          }
          setLocalStorage('userData', JSON.stringify(Data));
          updateUserDetails(Data);
          getCustStas();


          // getFirstAppointment();
        } else {
          Data['subscription_plan_info'] = planInfo;
          setLocalStorage('userData', JSON.stringify(Data));
          updateUserDetails(Data);
          getCustStas();
        }
      }
      getCustStas();
    });
  };
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
            setLoader(false);
          } else {
            setLoader(false);
          }
        });
  };
  const getOrders =async ()=>{
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.order,
      headers: {Authorization: getLocalStorage('token')},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            updateCartItems(response.data['orders']);
            // updateCartCount(response.data.count);
            // setLoader(false);
          }
        });
  };
  const navigateUser=(info)=>{
    if (!info['shipping_address_id']) {
      navigate('/address/'+info._id+ '/'+
      info.total_amount);
    } else if (!info['payment_transaction_id']) {
      navigate({
        pathname: '/add-payment',
        search:
        // eslint-disable-next-line max-len
        `?${createSearchParams({paymentFee: info.total_amount,
          addPay: 'true',
          id: info._id})}`,
      });
    } else {
      navigate({
        pathname: '/summary/'+info._id,
        search:
                          `?${createSearchParams({
                            isConfirmation: 'true'})}`,
      });
    }
  };
  return (
    <>
      {openDialog && <TypeFormAnswers dialogData={dialogData}
        // onCancel={(e:any)=>{
        //   setOpenDialog(false);
        // }}
        onCancel={setOpenDialog}/>
      }
      {!loader ? <MainContainer bgColor={isMobile ? '#FAF6ED' :whiteColor}>
        {/* {isMobile && userDetails['first_name'] ? <Header className='js-btwn gap-8' showSettings={true}/> :
       <Header className={isMobile ? 'txt-left' : 'txt-left bg-white' }
         desktopMenu={isMobile ? false : true}/>} */}
        {!isMobile? <Header hideBackArrow={false} className='txt-left bg-white'
          desktopMenu={isMobile ? false : true}/>: null}
        <ScrollSection id="scrollable-div"
          className={isMobile ? 'w-100 mb-64' : 'flex-1 w-100'}>
          <DesktopWidth className='w-1150 p-0'>

            <ContentContainer bgColor={profileBackgroudColor}
              className={isMobile ? 'pos-rel pb-0' : 'pos-rel pb-0'} >
              <div className={isMobile ? 'pb-24 d-flex rbc-time-header-cell' : 'd-none'}>
                <IconsContainer onClick={()=>{
                  navigate('/home');
                }}>
                  <Icon name={'chervonLeft'} />
                </IconsContainer>
                <IconsContainer onClick={()=>{
                  navigate('/profile-menu');
                }}>
                  <Icon name={'setings'} />
                </IconsContainer>
              </div>
              <ProfileHeader className='d-flex js-bet'>

                <div className='d-flex'>
                  {userDetails['display_url'] ?<IconsContainer className='br-50'>
                    <ImageWrapper className={isMobile ? 'text-center m-10 w-64': 'text-center m-10 w-98'}>
                      <img src={profileImage} alt="User" />
                    </ImageWrapper>
                  </IconsContainer> :
                   <ProDefImage className={isMobile? 'w-64' : 'w-98'}>
                     {userDetails['first_name'].charAt(0)}{userDetails['last_name'].charAt(0)}
                   </ProDefImage>
                  }
                  <ContentSection>
                    <Heading className={isMobile ? 'f-18' : 'f-32'}>{userDetails['first_name']}&nbsp;{userDetails['last_name']}</Heading>
                    <Heading4 className={isMobile ?'f-16' : 'f-16'}>{userDetails['email']}</Heading4>
                  </ContentSection>
                </div>
                {!isMobile ?
                 <IconsContainer onClick={() => {
                   navigate('/profile-menu');
                   Mixpanel.track(action['profile']['settings']['title'], action['profile']['settings']['props']);
                   gtag('event', gaAction['profile']['settings']['title'], {
                     'event_category': gaAction['profile']['settings']['category'],
                   });
                 }} className='d-flex'>
                   <Icon name='setings'
                   /><BadgeLabel className='clr-blu'>Settings</BadgeLabel></IconsContainer> : null}
              </ProfileHeader>
            </ContentContainer>
            <div className={isMobile ? '' : 'pos-rel'}>
              <ContentContainer bgColor={profileBackgroudColor}
                className={isMobile ? '': 'grid-col'}>
                {/* <ContentContainer bgColor={profileBackgroudColor}
                  className={isMobile ? 'prl-0 pos-rel' : 'w-100 bg-grad '}>
                  {userDetails['subscription_plan_info'] ?
              <BadgeContainer className={isMobile ? 't-100 ' : 'pxy-40 ' }>
                <BadgeRow className='r-1-pad-0'>
                  <BadgeHeading>
                    {userDetails['subscription_plan_info']['plan_duration']}
                    &nbsp;
                    {userDetails['subscription_plan_info']['duration_type']}
                  </BadgeHeading>
                  <BadgeHeading>
                    <BadgeLabel onClick={() =>{
                      console.log('');
                      Mixpanel.track(action['profile']['extendCare']['title'], action['profile']['extendCare']['props']);
                      gtag('event', gaAction['profile']['extendCare']['title'], {
                        'event_category': gaAction['profile']['extendCare']['category'],
                      });
                    }} className={restrictUser === 'false' ? 'restricted' : 'clr-blu'}>Extend my care</BadgeLabel>
                  </BadgeHeading>
                </BadgeRow>
                <BadgeRow className='pb-15'>
                  <BadgeHeading className='sub-head'>
                    {userDetails['subscription_plan_info']['plan_type']}
                  </BadgeHeading>
                </BadgeRow>
                {stats ? <>
                  <BadgeRow className={isMobile ? 'flx pb-15' : 'flx pb-15'}>
                    <BadgeHeading className='clr-black'>
                      {stats['subscriptionPaymentsReceivedCount']+ ' of '+stats['subscriptionPlanDuration'] +' months'}
                    </BadgeHeading>
                    <GProgressBar>
                      <GProgressBarFill
                        width={stats['subscriptionPlanDuration'] > 0 ?((stats['subscriptionPaymentsReceivedCount'] / stats['subscriptionPlanDuration']) * 100) + '%' : '0%'}>
                      </GProgressBarFill>
                    </GProgressBar>
                  </BadgeRow>
                  <BadgeRow className={isMobile ? 'flx flex-1 pb-15' : 'flx flex-1 pb-15'}>
                    <BadgeHeading className='clr-black'>
                      {stats['attendedAppointmentsCount']+ ' of '+stats['totalAppointmentsCount'] +' appointments'}
                    </BadgeHeading>
                    <GProgressBar >
                      <GProgressBarFill
                        width={stats['attendedAppointmentsCount'] ?((stats['attendedAppointmentsCount'] / stats['totalAppointmentsCount']) * 100) + '%' : '0%' }>
                      </GProgressBarFill>
                    </GProgressBar>
                  </BadgeRow>
                </> : <>
                  <BadgeRow className='r-1'>
                    <BadgeHeading className='sub-head2'>
                  0 of 6 months
                    </BadgeHeading>
                  </BadgeRow>
                  <BadgeRow className='r-1'>
                    <BadgeHeading className='sub-head2'>
                  No appointment scheduled
                    </BadgeHeading>
                  </BadgeRow>
                </> }
                <BadgeRow className={isMobile? 'r-1 mt-10 gap-10' : ' gap-24 mt-10'}>
                  <Button variant={restrictUser ==='false' ? 'disabled' : 'secondary'}
                    size='large' width='100%'
                    className=''
                    onClick={()=>{
                      navigate('/contact-us');
                      Mixpanel.track(action['profile']['needHelp']['title'], action['profile']['needHelp']['props']);
                      gtag('event', gaAction['profile']['needHelp']['title'], {
                        'event_category': gaAction['profile']['needHelp']['category'],
                      });
                    }}
                  >Need help?</Button>
                  <Button variant={restrictUser ==='false' ? 'disabled' : 'primary'}
                    size='large' width='100%'
                    className=''
                    onClick={()=>{
                      console.log('do nothing');
                      Mixpanel.track(action['profile']['whatsNext']['title'], action['profile']['whatsNext']['props']);
                      gtag('event', gaAction['profile']['whatsNext']['title'], {
                        'event_category': gaAction['profile']['whatsNext']['category'],
                      });
                    }}
                  >Whatâ€™s next</Button>
                </BadgeRow>
              </BadgeContainer>:null}
                </ContentContainer> */}
                <ContentContainer bgColor={profileBackgroudColor}
                  className={isMobile ? 'prl-0 pos-rel' : 'w-100 bg-grad '}>
                  {userDetails['subscription_plan_info'] ?
                  <BadgeContainer className={isMobile ? 't-100 ' : 'pxy-40 h-100 ' }>
                    <div>
                      {false && <>
                        {userDetails['display_url'] ?<IconsContainer className='br-50'>
                          <ImageWrapper className='text-center m-10 m-0 w-64'>
                            <img src={profileImage} alt="User" />
                          </ImageWrapper>
                        </IconsContainer> :
                   <ProDefImage className='w-64 m-0'>
                     {userDetails['first_name'].charAt(0)}{userDetails['last_name'].charAt(0)}
                   </ProDefImage>
                        }
                      </>}
                      <div className='align-norm'>
                        {/* <DetailPara className='f-18'>{userDetails['first_name']}&nbsp; {userDetails['last_name']}</DetailPara> */}
                        <DetailPara className='f-18'>{
                          userDetails['subscription_plan_info']['plan_type'] }</DetailPara>
                        <DetailPara className='f-17'>Purchased on {moment(userDetails['subscription_start_date']).format('MMM Do YYYY')}</DetailPara>
                        <DetailPara className='f-15 d-flex js-bet'>  <div>{userDetails['remaining_appointments'] > 0 ? userDetails['remaining_appointments'] : 'No' } appointments left</div>
                          <div>{userDetails['subscription_plan_info']['plan_duration']}
                            &nbsp;
                            {userDetails['subscription_plan_info']['duration_type']}</div></DetailPara>
                      </div>
                    </div>
                    <div className='mt-20 align-norm'>
                      {/* <DetailPara className='f-17'>{userDetails?.['current_plan_type'] !== 'A la Carte Appointments' ?
                      userDetails['subscription_plan_info']['plan_type'] : ''}</DetailPara> */}
                      {(userDetails['subscription_plan_info']['subscription_plan_type'] !== 'primary' &&
                      userDetails?.['current_plan_type'] !== 'A la Carte Appointments') ?
                        stats ?
                        <div>
                          {userDetails['subscription_plan_info']['subscription_plan_type'] === 'membership' &&
                userDetails['remaining_appointments'] < 1 ?
                <BadgeRow className='r-1-pad-0 align-items-center'>
                  <BadgeHeading className='clr-black mt-10'>
                  View your options below to choose when to meet with your coach.
                  </BadgeHeading>
                </BadgeRow> :
                         <>
                           {/* <BadgeRow className='r-1-pad-0 align-items-center'>
                             <BadgeHeading className='sub-head3 mt-10'>
                               {userDetails['subscription_plan_info']['plan_duration']}
                            &nbsp;
                               {userDetails['subscription_plan_info']['duration_type']}
                             </BadgeHeading>
                           </BadgeRow> */}
                           <BadgeRow className={isMobile ? 'flx pb-15' : 'flx pb-15 mt-10'}>
                             <BadgeHeading className='clr-black'>
                               {stats['subscriptionPaymentsReceivedCount']+ ' of '+stats['subscriptionPlanDuration'] +(stats['subscriptionPlanDuration'] > '1' ? ' months' : ' month')}
                             </BadgeHeading>
                             <GProgressBar className='col-grey'>
                               <GProgressBarFill className='col-green'
                                 width={stats['subscriptionPlanDuration'] > 0 ?((stats['subscriptionPaymentsReceivedCount'] / stats['subscriptionPlanDuration']) * 100) + '%' : '0%'}>
                               </GProgressBarFill>
                             </GProgressBar>
                           </BadgeRow>
                           <BadgeRow className={isMobile ? 'flx flex-1 pb-15' : 'flx flex-1 pb-15'}>
                             <BadgeHeading className='clr-black'>
                               {stats['attendedAppointmentsCount']+ ' of '+stats['totalAppointmentsCount'] +' appointments'}
                             </BadgeHeading>
                             <GProgressBar className='col-grey'>
                               <GProgressBarFill className='col-green'
                                 width={stats['attendedAppointmentsCount'] ?((stats['attendedAppointmentsCount'] / stats['totalAppointmentsCount']) * 100) + '%' : '0%' }>
                               </GProgressBarFill>
                             </GProgressBar>
                           </BadgeRow>
                         </>}</div> :
                          <>
                            <BadgeRow className='r-1'>
                              <BadgeHeading className='sub-head2'>
                          0 of 6 months
                              </BadgeHeading>
                            </BadgeRow>
                            <BadgeRow className='r-1'>
                              <BadgeHeading className='sub-head2'>
                          No appointment scheduled
                              </BadgeHeading>
                            </BadgeRow>
                          </> :
                      userDetails['current_plan_type'] === 'A la Carte Appointments' ?
                      stats['appointmentHistory'] && stats?.['appointmentHistory'].length ?
                        stats['appointmentHistory'].map((data, i)=>{
                          return (
                            <>
                              {data['plan_slug'] != 'A la Carte Appointments' ? <>
                                <BadgeRow className='r-1-pad-0 align-items-center' key={i}>
                                  <BadgeHeading className='sub-head3 mt-10'>
                                    {data['plan_type']}
                                  &nbsp;
                                  </BadgeHeading>
                                </BadgeRow>
                                <BadgeRow className={isMobile ? 'flx pb-15' : 'flx pb-15 mt-10'}>
                                  <BadgeHeading className='clr-black'>
                                    {data['subscriptionPaymentsReceivedCount']+ ' of '+data['subscriptionPlanDuration'] +
                                    data['subscriptionPlanDuration'] > '1' ? 'months' : 'month'}
                                  </BadgeHeading>
                                  <GProgressBar className='col-grey'>
                                    <GProgressBarFill className='col-green'
                                      width={data['subscriptionPlanDuration'] > 0 ?((data['subscriptionPaymentsReceivedCount'] / data['subscriptionPlanDuration']) * 100) + '%' : '0%'}>
                                    </GProgressBarFill>
                                  </GProgressBar>
                                </BadgeRow>
                                <BadgeRow className={isMobile ? 'flx flex-1 pb-15' : 'flx flex-1 pb-15'}>
                                  <BadgeHeading className='clr-black'>
                                    {data['attendedAppointmentsCount']+ ' of '+data['totalAppointmentsCount'] +' appointments'}
                                  </BadgeHeading>
                                  <GProgressBar className='col-grey'>
                                    <GProgressBarFill className='col-green'
                                      width={data['attendedAppointmentsCount'] ?((data['attendedAppointmentsCount'] / data['totalAppointmentsCount']) * 100) + '%' : '0%' }>
                                    </GProgressBarFill>
                                  </GProgressBar>
                                </BadgeRow>
                              </> : <>
                                <BadgeRow className='r-1-pad-0 align-items-center'>
                                  <BadgeHeading className='sub-head3 mt-10'>
                                    {data['plan_slug']}
                                  &nbsp;
                                  </BadgeHeading>
                                </BadgeRow>
                                <BadgeRow className={isMobile ? 'flx flex-1 pb-15' : 'flx flex-1 pb-15'}>
                                  <BadgeHeading className='clr-black'>
                                    {data['remaining_appointments'] + ' appointments to use before ' +moment(data['subscription_end_date']).format('MMM Do YYYY')}
                                  </BadgeHeading>
                                  <GProgressBar className='col-grey'>
                                    <GProgressBarFill className='col-green'
                                      width={data['remaining_appointments'] ? (((data['totalAppointmentsCount'] - data['remaining_appointments']) / data['totalAppointmentsCount']) * 100) + '%' : '100%'}>
                                    </GProgressBarFill>
                                  </GProgressBar>
                                </BadgeRow>
                              </>}
                            </>
                          );
                        }):

                        stats? <>
                          <BadgeRow className='r-1-pad-0 align-items-center'>
                            <BadgeHeading className='sub-head3 mt-10'>
                              {userDetails['current_plan_type']}
                                  &nbsp;
                            </BadgeHeading>
                          </BadgeRow>

                          <BadgeRow className={isMobile ? 'flx flex-1 pb-15' : 'flx flex-1 pb-15'}>
                            <BadgeHeading className='clr-black'>
                              {userDetails['remaining_appointments'] + ' appointments to use before ' +moment(userDetails['subscription_end_date']).format('MMM Do YYYY')}
                            </BadgeHeading>
                            <GProgressBar className='col-grey'>
                              <GProgressBarFill className='col-green'
                                width={stats['remaining_appointments'] ? (((stats['totalAppointmentsCount'] - stats['remaining_appointments']) / stats['totalAppointmentsCount']) * 100) + '%' : '100%'}>
                              </GProgressBarFill>
                            </GProgressBar>
                          </BadgeRow>
                        </>:<>
                          <BadgeRow className='r-1'>
                            <BadgeHeading className='sub-head2'>
                                    0 of 6 months
                            </BadgeHeading>
                          </BadgeRow>
                          <BadgeRow className='r-1'>
                            <BadgeHeading className='sub-head2'>
                                    No appointment scheduled
                            </BadgeHeading>
                          </BadgeRow>
                        </>:
                      null}
                    </div>
                    {userDetails?.subscription_plan_info?.plan_slug === 'rootcause' && userDetails['extendCareEnable'] ? <div className="mt-20">
                      <Button
                        variant={
                          'primary'
                        }
                        size="large"
                        width="100%"
                        onClick={() => {
                          navigate('/root-cause-care-options', {
                            state: {
                              coachData: userDetails['assignment_details']?.['ClientAssignments']?.['Health Coach'],
                            },
                          });
                        }}
                        className={'flx-center w-100'}
                      >
                        See care options
                      </Button>
                    </div> : null}
                    {checkSubscriptionStatus(userDetails) &&
                  userDetails['remaining_appointments'] < 1 && userDetails['subscription_plan_info']['subscription_plan_type'] !== 'primary_plan' ?
                   <div className="mt-20">
                     <Button
                       variant={
                         'primary'
                       }
                       size="large"
                       width="100%"
                       onClick={() => {
                         navigate('/extendplans?topUp=true');
                         Mixpanel.track(action['profile']['topUp']['title'], action['profile']['topUp']['props']);
                         gtag('event', gaAction['profile']['topUp']['title'], {
                           'event_category': gaAction['profile']['topUp']['category'],
                         });
                       }}
                       className={'flx-center w-100'}
                     >
                      Top up appointments
                     </Button>
                   </div> : !checkSubscriptionStatus(userDetails) && (userDetails?.subscription_plan_info?.plan_slug!=='rootcause' && userDetails?.subscription_plan_info?.plan_slug!=='rootcause_without_inflamation')? <div className="mt-20">
                     <Button
                       variant={
                         'primary'
                       }
                       size="large"
                       width="100%"
                       onClick={() => {
                         navigate('/extendplans', {
                           state: {
                             coachData: userDetails['assignment_details']?.['ClientAssignments']?.['Health Coach'],
                           },
                         });
                         Mixpanel.track(action['profile']['extendCare']['title'], action['profile']['extendCare']['props']);
                         gtag('event', gaAction['profile']['extendCare']['title'], {
                           'event_category': gaAction['profile']['extendCare']['category'],
                         });
                       }}
                       className={'flx-center w-100'}
                     >
                      View Options
                     </Button>
                   </div> : null}

                    <BadgeRow className='r-1-pad-0'>
                      <BadgeHeading></BadgeHeading>
                    </BadgeRow>
                  </BadgeContainer>: null}
                </ContentContainer>
                {!isMobile ? <ContentContainer bgColor={profileBackgroudColor} className={isMobile ? 'p-0' : 'w-100 bg-grad '}>
                  {isMobile ? <Heading4 className={isMobile ? 'm-0' : ''}>
                My documents
                  </Heading4> : null}
                  <BadgeContainer
                    className={isMobile ? 'l-0' :
                    'pxy-40 h-100'}>
                    {!isMobile ? <Heading4>
                My documents
                    </Heading4> : null}
                    {(userDetails?.subscription_plan_info?.plan_slug!=='rootcause' && userDetails?.subscription_plan_info?.plan_slug!=='rootcause_without_inflamation') &&!userDetails?.is_first_plan_rootcause?
                   <> <BadgeRow className='list-bet d-flex'
                     onClick={()=> {
                       if (userDetails['intake_submitted']) {
                         setOpenDialog(true);
                         updateDialogData(confirmStatements['intakeForm']);
                       }
                       Mixpanel.track(action['profile']['intakeForm']['title'], action['profile']['intakeForm']['props']);
                       gtag('event', gaAction['profile']['intakeForm']['title'], {
                         'event_category': gaAction['profile']['intakeForm']['category'],
                       });
                     }}>
                     <div className='d-flex'>
                       <IconsContainer className='px-4'>
                         <Icon name="inTakeN"/>
                       </IconsContainer>
                       <BadgeLabel>
                  Intake form
                       </BadgeLabel>
                     </div>
                     {userDetails['intake_submitted'] ?
                      <BodyText3 className='clr-green f-16 m-0'>View</BodyText3> :
null}
                   </BadgeRow>
                   <BadgeRow className='list-bet  d-flex'
                     onClick={()=> {
                       if (userDetails['symptom_analysis_submitted']) {
                         setOpenDialog(true);
                         updateDialogData(confirmStatements['symptomForm']);
                       }
                       Mixpanel.track(action['profile']['symptomAnalysis']['title'], action['profile']['symptomAnalysis']['props']);
                       gtag('event', gaAction['profile']['symptomAnalysis']['title'], {
                         'event_category': gaAction['profile']['symptomAnalysis']['category'],
                       });
                     }}>
                     <div className='d-flex'>
                       <IconsContainer>
                         <Icon name="symptom"/>
                       </IconsContainer>
                       <BadgeLabel>
                  Symptom analysis
                       </BadgeLabel>
                     </div>
                     {userDetails['symptom_analysis_submitted'] ?
                       <BodyText3 className='clr-green f-16 m-0'>View</BodyText3> :
                    null}
                   </BadgeRow></> :
                    <> <BadgeRow className='list-bet d-flex'
                      onClick={()=> {
                        if (userDetails['timeline_quiz_submitted']) {
                          setOpenDialog(true);
                          updateDialogData(confirmStatements['timelineForm']);
                        }
                        Mixpanel.track(action['profile']['intakeForm']['title'], action['profile']['intakeForm']['props']);
                        gtag('event', gaAction['profile']['intakeForm']['title'], {
                          'event_category': gaAction['profile']['intakeForm']['category'],
                        });
                      }}>
                      <div className='d-flex'>
                        <IconsContainer>
                          <Icon name="TestPad"/>
                        </IconsContainer>
                        <BadgeLabel>
               Timeline Form
                        </BadgeLabel>
                      </div>
                      {userDetails['timeline_quiz_submitted'] ?
                    <BodyText3 className='clr-green f-16 m-0'>View</BodyText3> :
null}
                    </BadgeRow>
                    <BadgeRow className='list-bet  d-flex'
                      onClick={()=> {
                        if (userDetails['root_cause_quiz_submitted']) {
                          setOpenDialog(true);
                          updateDialogData(confirmStatements['rootcauseForm']);
                        }
                        Mixpanel.track(action['profile']['symptomAnalysis']['title'], action['profile']['symptomAnalysis']['props']);
                        gtag('event', gaAction['profile']['symptomAnalysis']['title'], {
                          'event_category': gaAction['profile']['symptomAnalysis']['category'],
                        });
                      }}>
                      <div className='d-flex'>
                        <IconsContainer>
                          <Icon name="file"/>
                        </IconsContainer>
                        <BadgeLabel>
                Imbalance Analysis
                        </BadgeLabel>
                      </div>
                      {userDetails['root_cause_quiz_submitted'] ?
                     <BodyText3 className='clr-green f-16 m-0'>View</BodyText3> :
                  null}
                    </BadgeRow></> }
                  </BadgeContainer>
                </ContentContainer>: null}
              </ContentContainer>
            </div>

            <ContentContainer className={isMobile? '':'pt-15 pt-0'} bgColor={'#FAFAFC'}>
              <div className='maxw-900 d-flex flex-column gap-15 '>
                {isMobile ? <>
                  {isMobile ? <Heading4 className={isMobile ? 'm-0' : ''}>
                My documents
                  </Heading4> : null}
                  <BadgeContainer
                    className={isMobile ? ' w-100' :
                    'pxy-40'}>
                    {!isMobile ? <Heading4>
                My documents
                    </Heading4> : null}
                    {(userDetails?.subscription_plan_info?.plan_slug!=='rootcause' && userDetails?.subscription_plan_info?.plan_slug!=='rootcause_without_inflamation')&&!userDetails?.is_first_plan_rootcause?
                    <>
                      <BadgeRow className='list-bet d-flex'
                        onClick={()=> {
                          if (userDetails['intake_submitted']) {
                            setOpenDialog(true);
                            updateDialogData(confirmStatements['intakeForm']);
                          }
                          Mixpanel.track(action['profile']['intakeForm']['title'], action['profile']['intakeForm']['props']);
                          gtag('event', gaAction['profile']['intakeForm']['title'], {
                            'event_category': gaAction['profile']['intakeForm']['category'],
                          });
                        }}>
                        <div className='d-flex'>
                          <IconsContainer>
                            <Icon name="inTakeN"/>
                          </IconsContainer>
                          <BadgeLabel>
                  Intake form
                          </BadgeLabel>
                        </div>
                        {userDetails['intake_submitted'] ?
                      <BodyText3 className='clr-green f-16 m-0'>View</BodyText3> :
null}
                      </BadgeRow>
                      <BadgeRow className='list-bet  d-flex'
                        onClick={()=> {
                          if (userDetails['symptom_analysis_submitted']) {
                            setOpenDialog(true);
                            updateDialogData(confirmStatements['symptomForm']);
                          }
                          Mixpanel.track(action['profile']['symptomAnalysis']['title'], action['profile']['symptomAnalysis']['props']);
                          gtag('event', gaAction['profile']['symptomAnalysis']['title'], {
                            'event_category': gaAction['profile']['symptomAnalysis']['category'],
                          });
                        }}>
                        <div className='d-flex'>
                          <IconsContainer>
                            <Icon name="symptom"/>
                          </IconsContainer>
                          <BadgeLabel className='pl-2'>
                  Symptom analysis
                          </BadgeLabel>
                        </div>
                        {userDetails['symptom_analysis_submitted'] ?
                       <BodyText3 className='clr-green f-16 m-0'>View</BodyText3> :
                    null}
                      </BadgeRow>
                    </> : <>
                      <BadgeRow className='list-bet d-flex'
                        onClick={()=> {
                          if (userDetails['timeline_quiz_submitted']) {
                            setOpenDialog(true);
                            updateDialogData(confirmStatements['timelineForm']);
                          }
                          Mixpanel.track(action['profile']['intakeForm']['title'], action['profile']['intakeForm']['props']);
                          gtag('event', gaAction['profile']['intakeForm']['title'], {
                            'event_category': gaAction['profile']['intakeForm']['category'],
                          });
                        }}>
                        <div className='d-flex'>
                          <IconsContainer>
                            <Icon name="TestPad"/>
                          </IconsContainer>
                          <BadgeLabel>
               Timeline Form
                          </BadgeLabel>
                        </div>
                        {userDetails['timeline_quiz_submitted'] ?
                    <BodyText3 className='clr-green f-16 m-0'>View</BodyText3> :
null}
                      </BadgeRow>
                      <BadgeRow className='list-bet  d-flex'
                        onClick={()=> {
                          if (userDetails['root_cause_quiz_submitted']) {
                            setOpenDialog(true);
                            updateDialogData(confirmStatements['rootcauseForm']);
                          }
                          Mixpanel.track(action['profile']['symptomAnalysis']['title'], action['profile']['symptomAnalysis']['props']);
                          gtag('event', gaAction['profile']['symptomAnalysis']['title'], {
                            'event_category': gaAction['profile']['symptomAnalysis']['category'],
                          });
                        }}>
                        <div className='d-flex'>
                          <IconsContainer>
                            <Icon name="file"/>
                          </IconsContainer>
                          <BadgeLabel>
                Imbalance Analysis
                          </BadgeLabel>
                        </div>
                        {userDetails['root_cause_quiz_submitted'] ?
                     <BodyText3 className='clr-green f-16 m-0'>View</BodyText3> :
                  null}
                      </BadgeRow>
                    </> }
                  </BadgeContainer>
                </> : null}
                {<div className={isMobile ? 'd-flex mt-20 w-100' : 'd-flex js-bet w-100'} onClick={()=> {
                  Mixpanel.track(action['profile']['myOrders']['title'], action['profile']['myOrders']['props']);
                  gtag('event', gaAction['profile']['myOrders']['title'], {
                    'event_category': gaAction['profile']['myOrders']['category'],
                  });
                }}>
                  <Heading4 className={isMobile? 'm-0 flex-1':'m-0 flex-1'}
                  >
                My Orders
                  </Heading4>
                  {cartItems.length ? <Button variant={'secondary'} width={'auto'}
                    onClick={()=>navigate('/orders/1', {
                      state: {
                        data: 'Your orders',
                      },
                    })}>
                    View All
                  </Button> : null}
                </div>}

                {cartItems.length ? <>
                  {cartItems.slice(0, 3).map((info, i)=>{
                    return (
                      <><CartCard className={isMobile ?
                        'w-100 d-flex js-bet bg-whe' : 'w-100 d-flex js-bet bg-whe'}
                      onClick={
                        () =>{
                          navigateUser(info);
                          Mixpanel.track(`${action['profile']['order']['title']} ${info['order_id']} ${action['profile']['clicked']['title']}`, action['profile']['order']['props']);
                          gtag('event', gaAction['profile']['order']['title'], {
                            'event_category': gaAction['profile']['order']['category'],
                          });
                        }
                      }
                      key={i}><div className='flex-1'>
                          <CartBrand>
                            Order {info['order_id']}
                          </CartBrand>
                          <BadgeHeading className='f-16'
                            style={{color: info['order_status_data']['color']}}>
                            {info['order_status_data']['name']}
                          </BadgeHeading>
                        </div><CartPill className='bg-be'>
                          {info['order_products_data'].length}
                          {info['order_products_data'].length > 1 ? ' Items' : ' Item'}
                        </CartPill>
                      </CartCard>
                      </>
                    );
                  },
                  )}
                </>: <CartCard bgColor={'#ffffff'} className='w-100 d-flex js-bet flex-column gap-10 al-cen'
                  onClick={()=> navigate('/orders')}>
                  <BadgeHeading className='f-16'>
                  You have no Orders created yet, Shop recommended products
                  </BadgeHeading>
                  <Button variant='secondary' width='auto'
                    onClick={()=> {
                      navigate('/orders');
                      Mixpanel.track(action['profile']['keepShopping']['title'], action['profile']['keepShopping']['props']);
                      gtag('event', gaAction['profile']['keepShopping']['title'], {
                        'event_category': gaAction['profile']['keepShopping']['category'],
                      });
                    }}>
        Keep shopping
                  </Button>
                </CartCard> }
              </div>
            </ContentContainer>
          </DesktopWidth>
        </ScrollSection>
        {isMobile ? <BotoomHeader/> : null}
      </MainContainer> : null}
    </>
  );
}
