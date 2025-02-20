/* eslint-disable max-len */
import mdImg from '@app/assets/images/visa.png';
import AlertDialog from '@app/components/alert-dialog';
import Button from '@app/components/button';
import Header from '@app/components/header';
import Icon from '@app/components/icon';
import Spinner from '@app/components/icon/icons/loader';
import Payment from '@app/components/payment/payment';
import apiEndpoint from '@app/core/apiend_point';
import {getFAQs, getLocalStorage, setLocalStorage} from '@app/core/localStorageService';
import CommonSnackbar from '@app/core/snackbar';
import {ApiResponseProps, PayloadProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import {whiteColor} from '@app/styles';
import {
  DesktopWidth, FlexContainer, Heading, Heading3, Link, Loader,
  MainContainer,
} from '@app/styles/common-styles';
import {PaymentSuccess} from '@app/utils';
import Radio from '@mui/material/Radio';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {isMobile} from 'react-device-detect';
import {createSearchParams, useLocation, useNavigate} from 'react-router-dom';
import {
  CardDetails, CardDetailsSec,
} from '../add-payment/add-payment-components';
import {
  BackDrop, ContentContainer, DialogContainer,
  IconsContainer, ImageWrapper, Pills, PillsContainer,
} from '../assesment-questions/assesment-questions-components';
import {ScrollSection} from '../boarding-screens/component/boarding-screen-components';
import {
  MembershipContainer,
  MembershipDiv,
  MembershipLabel,
  MembershipLabelDiv,
  MembershipPara,
} from '../end of care/designs-comonents';
import {BadgeContainer} from '../home/home-components';
import {MenuHeader} from '../profile/profile-components';
import {BodyText3, Heading4, ListItem, PlansSection} from '../recommend-plans/component/recommend-plans-components';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import {gtag} from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';

/**
 * Renders Component.
 * @return {BoardingScreen} renders Component.
 */
export default function OrderPayment() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [stripePromise, updateStripePromise] = useState( loadStripe('234141'));
  const [navLink, setNavLink] = useState<any>('/plan-journey');
  const [paymentStatus, setPaymentStatus] = React.useState<PaymentSuccess>({
    show: false,
    status: '',
  });
  const [showSectionMsg, setShowSectionMsg] = useState(false);
  const [infoMsg, setInfoMsg] = useState<string>('');
  const [apperance, setApperance] = useState('success');
  const [displayCard, setDisplayCard] = useState(false);
  const navigate = useNavigate();
  const [plansData, updatePlanDetails] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [cardsData, setCardsData] = useState([]);
  const [disableBtn, setDisableBtn] = useState(false);
  const [loader, setloader] = useState(false);
  const [defCardInfo, setDefCardInfo] = useState({});
  const [showCards, setShowCards] = useState(false);
  const [extendPlanData, setExtendPlanData] = useState<any>();
  const [planPackage, setPlanPackage] = useState<any>();
  const [rootUserPlan, setRootUserPlan] = useState<any>();
  const [failedPaymentCardData, setFailedPaymentCardData] = useState<any>();
  const [paymentText, updatePaymentText] = useState('Add Card');
  const restrictUser = sessionStorage.getItem('resctrict_user_actions');

  let cData= {};
  useEffect(()=>{
    setExtendPlanData(location?.state?.data);
    setPlanPackage(location?.state?.planData);
    setRootUserPlan(location?.state?.rootData);
    setFailedPaymentCardData(location?.state?.cardData);
    setloader(true);
    setTimeout(() => {
      cData= JSON.parse(getLocalStorage('configList'));
      updateStripePromise(loadStripe(cData['stripePublishabletKey']));
      addCardAPI({}, 'GET');
    }, 2000);
    setTimeout(() => {
      if (searchParams.get('link') || searchParams.get('showPaymentCards') ||
       searchParams.get('addPay') ) {
        setDisplayCard(false);
      } else {
        setDisplayCard(true);
      }
      if (searchParams.get('retryPayment')) {
        setDisplayCard(true);
        updatePaymentText('Confirm Payment');
      }
      setloader(false);
    }, 3000);
    setOpenDialog(false);
    Mixpanel.track(service['orderPayment']['title'], service['orderPayment']['props']);
    gtag('event', gaService['orderPayment']['title'], {
      'event-category': gaService['orderPayment']['category'],
    });
  }, []);


  /**
   * @param {tokenJson} tokenJson from api
  */
  async function addCard(tokenJson:any) {
    if (tokenJson) {
      const load={
        stripeTokenId: tokenJson.token_Key,
        isDefault: tokenJson.is_def,
      };
      addCardAPI(load, 'POST');
    }
  }
  /**
   * @param {payload} payload
   * @param {method} method
   */
  async function addCardAPI(payload, method) {
    const apiObject: PayloadProps = {
      payload: payload,
      method: method,
      apiUrl: apiEndpoint.cardsApi,
      headers: {Authorization: getLocalStorage('token')},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200 && method === 'POST') {
            // const load={
            //   cardId: response.data.stripe_card_id,
            //   planSlug: extendPlanData?.plan_slug ? extendPlanData.plan_slug : plansData?.['plan_slug'],
            // };
            // console.log(8888888);
            // debugger;
            // if (searchParams.get('planType') === 'extend' || searchParams.get('packageAppointment')) {
            //   setDisableBtn(true);
            //   makeExtendPlanPayment(response.data);
            //   return;
            // }
            // if (searchParams.get('planType') === 'rootcause') {
            //   setDisableBtn(true);
            //   makeRootUserPlanPayment(response.data);
            //   return;
            // }
            // if (searchParams.get('link')) {
            //   setDisableBtn(true);
            //   makeFeePayment(response.data);
            //   return;
            // } else if (searchParams.get('addPay')) {
            //   setDisableBtn(true);
            //   makeOrderPayment(response.data);
            //   return;
            // } else if (searchParams.get('showPaymentCards')) {
            // setDisableBtn(true);
            if (searchParams.get('retryPayment')) {
              retryPayment(response['data']);
              setDisableBtn(true);
              return;
            } else {
              setDisplayCard(false);
              setDisableBtn(true);
              addCardAPI({}, 'GET');
              updatePaymentText('Add Card');
            }
            // } else {
            //   makePaymentAPI(load);
            // }
          } else if (method === 'GET') {
            if (response.status_code === 200) {
              const cardsList = response.data;
              const list1 = cardsList.filter((card) => card.is_default);
              const list2 = cardsList.filter((card) => !card.is_default);
              setDefCardInfo(list1[0]);
              setCardsData([...list1, ...list2]);
              setDisableBtn(false);
            }
          } else {
            setDisableBtn(false);
            updatePaymentText('Add Card');
            setInfoMsg(response.data.message ?
              response.data.message : response.message);
            setShowSectionMsg(true);
            setApperance('error');
          }
        });
  }

  /**
 * Renders Component.
 * @param {payload} payload Component.
 * @param {cardHolderName} cardHolderName Component.
 * @param {token} token Component.
 */
  async function makePayment(payload: any, cardHolderName: string, token: any) {
    return;
    const {paymentMethod} = payload;
    setPaymentStatus({show: true, status: 'success'});
    if (searchParams.get('link')) {
      setDisableBtn(true);
      makeFeePayment(payload, cardHolderName);
      return;
    } else if (searchParams.get('addPay')) {
      setDisableBtn(true);
      makeOrderPayment(payload, cardHolderName);
      return;
    } else {
      const load = {
        cardHolderName: cardHolderName,
        paymentId: paymentMethod.id,
        planSlug: plansData['plan_type'],
      };
      makePaymentAPI(load);
    }
  }
  /**
   *
   * @param {payload} payload
   */
  async function makePaymentAPI(payload) {
    const apiObject: PayloadProps = {
      payload: payload,
      method: 'POST',
      apiUrl: apiEndpoint.paymentAPI,
      headers: {Authorization: getLocalStorage('token')},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            setOpenDialog(true);
            // if ( plansData['plan_slug']==='rootcause') {
            //   logoutGlobalSession();
            //   window.location.replace(cData['rcRedirectUrl'] ? cData['rcRedirectUrl'] : 'https://gritwell-1.webflow.io/home-v2' );
            // } else {
            setNavLink('/plan-journey');
            // }
            // setTimeout(() => {
            //   setOpenDialog(false);
            //   navigate('/plan-journey');
            // }, 4500);
            // setPlansData(response.data[0]);
          } else {
            setInfoMsg(response.data.message ?
                 response.data.message : response.message);
            setShowSectionMsg(true);
            setApperance('error');
          }
        });
  }
  /**
   * @param {info} info
   * @param {index} i
   */
  async function makeCardDefault(info, i) {
    const apiObject: PayloadProps = {
      payload: {
        cardId: info['_id'],
      },
      method: 'PUT',
      apiUrl: apiEndpoint.updateDefaultApi,
      headers: {Authorization: getLocalStorage('token')},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            const cardsList =[...cardsData];
            const idx= _.findIndex(cardsList, function(o: any) {
              return o.is_default;
            });
            cardsList[idx]['is_default'] = false;
            cardsList[i]['is_default'] = true;
            const list1 = cardsList.filter((card) => card.is_default);
            const list2 = cardsList.filter((card) => !card.is_default);
            setDefCardInfo(list1[0]);
            setCardsData([...list1, ...list2]);
          }
        });
  }

  /**
   *
   * @param {payload} payload Component.
   */
  async function retryPayment(payload: any) {
    setPaymentStatus({show: true, status: 'success'});
    const apiObject: PayloadProps = {
      payload: {
        subscriptionScheduleId: failedPaymentCardData['stripe_subscription_schedule_id'],
        cardId: payload['stripe_card_id'] ? payload['stripe_card_id'] : defCardInfo['stripe_card_id'],
        stripeInvoiceId: failedPaymentCardData['stripe_invoice_id'],
      },
      method: 'POST',
      apiUrl: apiEndpoint.retryPaymentApi,
      headers: {Authorization: getLocalStorage('token')},
    };
    await triggerApi(apiObject).then((response: ApiResponseProps)=>{
      if (response['status_code'] === 200) {
        setApperance('success');
        setInfoMsg('Payment successful');
        setShowSectionMsg(true);
        setTimeout(()=>{
          navigate('/billing-history');
        }, 2000);
      } else {
        setApperance('error');
        setInfoMsg('Payment failed');
        setShowSectionMsg(true);
        setDisableBtn(false);
        updatePaymentText('Confirm Payment');
      }
    })
        .catch((error)=>{
          setApperance('error');
          setInfoMsg('Payment failed');
          setShowSectionMsg(true);
          setDisableBtn(false);
          updatePaymentText('Confirm Payment');
        });
  }

  /**
 * Renders Component.
 * @param {payload} payload Component.
 * @param {cardHolderName} cardHolderName Component.
 */
  async function makeFeePayment(payload: any, cardHolderName?: string) {
    setPaymentStatus({show: true, status: 'success'});
    const apiObject: PayloadProps = {
      payload: {
        cardId: payload.stripe_card_id,
        appointmentId: searchParams.get('id'),
      },
      method: 'POST',
      apiUrl: apiEndpoint.appointmentPayment,
      headers: {Authorization: getLocalStorage('token')},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            setOpenDialog(true);
            setNavLink({
              pathname: '/book-appointment',
              search:
                `?${createSearchParams({link: searchParams.get('link')})}`,
            });


            // setTimeout(() => {
            //   setOpenDialog(false);
            //   setDisableBtn(false);
            //   navigate({
            //     pathname: '/book-appointment',
            //     search:
            //     `?${createSearchParams({link: searchParams.get('link')})}`,
            //   });
            // }, 4500);
          } else {
            setInfoMsg(response.data.message ?
                 response.data.message : response.message);
            setShowSectionMsg(true);
            setApperance('error');
          }
        });
  }
  /**
 * Renders Component.
 * @param {payload} payload Component.
 * @param {cardHolderName} cardHolderName Component.
 */
  async function makeOrderPayment(payload: any, cardHolderName?: string) {
    setPaymentStatus({show: true, status: 'success'});
    const apiObject: PayloadProps = {
      payload: {
        cardId: payload.stripe_card_id,
      },
      method: 'put',
      apiUrl: apiEndpoint.order +'/'+searchParams.get('id'),
      headers: {Authorization: getLocalStorage('token')},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            // setOpenDialog(true);
            navigate('/summary/'+ searchParams.get('id'));

            // setTimeout(() => {
            //   setOpenDialog(false);
            //   setDisableBtn(false);
            //   navigate({
            //     pathname: '/book-appointment',
            //     search:
            //     `?${createSearchParams({link: searchParams.get('link')})}`,
            //   });
            // }, 4500);
          } else {
            setInfoMsg(response.data.message ?
                   response.data.message : response.message);
            setShowSectionMsg(true);
            setApperance('error');
          }
        });
  }

  /**
 * Renders Component.
 * @param {payload} payload Component.
 * @param {cardHolderName} cardHolderName Component.
 */
  async function makeExtendPlanPayment(payload: any, cardHolderName?: string) {
    setPaymentStatus({show: true, status: 'success'});
    const payloadData={
      planSlug: extendPlanData?.plan_slug ? extendPlanData.plan_slug : plansData['plan_slug'],
      cardId: payload.stripe_card_id,
    };
    const apiObject: PayloadProps = {
      payload: payloadData,
      method: 'POST',
      apiUrl: apiEndpoint.planExtend,
      headers: {Authorization: getLocalStorage('token')},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            setInfoMsg(`Payment ${response?.message}`);
            setShowSectionMsg(true);
            setTimeout(()=>{
              navigate('/home');
            }, 2000);
          } else {
            setDisableBtn(false);
            setInfoMsg(response?.message);
            setShowSectionMsg(true);
            setApperance('error');
          }
        });
  }
  /**
 * Renders Component.
 * @param {payload} payload Component.
 * @param {cardHolderName} cardHolderName Component.
 */
  async function makePlanPackagePayment(payload: any, cardHolderName?: string) {
    setPaymentStatus({show: true, status: 'success'});
    const payloadData={
      planSlug: extendPlanData?.plan_slug ? extendPlanData.plan_slug : plansData?.['plan_slug'],
      cardId: payload.stripe_card_id,
    };
    const apiObject: PayloadProps = {
      payload: payloadData,
      method: 'POST',
      apiUrl: apiEndpoint.planExtend,
      headers: {Authorization: getLocalStorage('token')},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            setInfoMsg(`Payment ${response?.message}`);
            setShowSectionMsg(true);
            setTimeout(()=>{
              navigate('/home');
            }, 2000);
          } else {
            setDisableBtn(false);
            setInfoMsg(response?.message);
            setShowSectionMsg(true);
            setApperance('error');
          }
        });
  }

  /**
 * Renders Component.
 * @param {payload} payload Component.
 * @param {cardHolderName} cardHolderName Component.
 */
  async function makeRootUserPlanPayment(payload: any, cardHolderName?: string) {
    setPaymentStatus({show: true, status: 'success'});
    const payloadData={
      planSlug: extendPlanData?.plan_slug ? extendPlanData.plan_slug : rootUserPlan?.['plan_slug'],
      cardId: payload.stripe_card_id,
    };
    const apiObject: PayloadProps = {
      payload: payloadData,
      method: 'POST',
      apiUrl: apiEndpoint.planExtend,
      headers: {Authorization: getLocalStorage('token')},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            setInfoMsg(`Payment ${response?.message}`);
            setShowSectionMsg(true);
            getProfileData();
            setTimeout(()=>{
              navigate('/home');
            }, 2000);
          } else {
            setDisableBtn(false);
            setInfoMsg(response?.message);
            setShowSectionMsg(true);
            setApperance('error');
          }
        });
  }
  const getProfileData = async () => {
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.getProfileApi,
      headers: {Authorization: getLocalStorage('token')},
    };
    await triggerApi(apiObject).then((response: ApiResponseProps) => {
      if (response.status_code == 200) {
        setLocalStorage('userData', JSON.stringify(response.data));
      }
    });
  };

  useEffect(()=>{
    setDisplayCard(false);
    const userData= JSON.parse(getLocalStorage('userData'));
    updatePlanDetails(userData['subscription_plan_info']);
  }, []);
  return (
    <>
      {loader ? <Loader>
        <Spinner size="6px" />
      </Loader> : null}
      <CommonSnackbar
        title="Error"
        appearance={apperance}
        message={infoMsg}
        open={showSectionMsg}
        close={() => setShowSectionMsg(false)}
      />

      {openDialog && (searchParams.get('link')) ?
       <AlertDialog header="Payment Successful!"
         description= { !(searchParams.get('link')) ?
        'Please continue with your journey...' :
         'Please Reschedule/Cancel the appointment...'}
         onCancel={()=> {
           navigate(navLink);
           setOpenDialog(false);
         }}/> : (openDialog && !(searchParams.get('link')))&&
         <BackDrop><DialogContainer className={isMobile ?
         'fill-wid-80 al-center  ovy-scroll' : 'al-center  ovy-scroll'}>
           <ContentContainer>
             <PlansSection className='payment-page p-4-24'>
               <div className={isMobile ? '' : 'd-flex js-bet'}>
                 <BodyText3>{plansData['plan_duration']}&nbsp;
                   {plansData['duration_type']}</BodyText3>
                 <BodyText3 className='f-17'>{plansData['currency_type']}
                   {plansData['plan_price']}/
                   {plansData['recurring_type']}</BodyText3>
               </div>
               {<BodyText3 className='mt-0 f-17-r'>
                 {plansData['plan_type']}
               </BodyText3>}
               <BodyText3 className='c-white f-15'>
                        See our <Link onClick={() =>
                   window.open(getFAQs('FAQs'))}>
                          FAQs</Link>
                 <span> for the cancellation policy.</span></BodyText3>
             </PlansSection>
             <div className={isMobile ? '' : 'd-flex gap-15'}>
               <div>
                 <Heading4>
                   {plansData['plan_description']['heading']}
                 </Heading4>
                 <ul className='p-20'>
                   {plansData['plan_description']['subject'].
                       map((info:any, i:number)=>{
                         return (
                           <ListItem key={i} className='pb-8'>
                             <span>
                               {info}
                             </span>
                           </ListItem>
                         );
                       })}
                 </ul>
               </div>
             </div>
             <Button variant={'primary'}
               size='large' width='100%'
               onClick={()=>{
                 navigate(navLink);
                 setOpenDialog(false);
                 Mixpanel.track(action['orderPayment']['gotIt']['title'], action['orderPayment']['gotIt']['props']);
                 gtag('event', gaAction['orderPayment']['gotIt']['title'], {
                   'event-category': gaAction['orderPayment']['gotIt']['category'],
                 });
               }}
               className={ 'flx-center'}
             >Got it</Button>
           </ContentContainer>
         </DialogContainer>
         </BackDrop>}
      <MainContainer bgColor={whiteColor}>
        {/* { <Header/> } */}
        {!isMobile ? <Header hideBackArrow={false} className='txt-left bg-white'
          desktopMenu={isMobile ? false : true}/>: null}
        <ScrollSection id="scrollable-div"
          className={
            (searchParams.get('showPaymentCards') ? isMobile?
          ' h-150 w-100 flex-9 w-100' : ' h-150 w-100 flex-9' :isMobile?
          ' flex-1 w-100' : ' flex-1')}>
          <DesktopWidth >
            {/* <BadgeContainer
              className={isMobile ? 'pos-unset w-100 br-0' :
              'pos-unset w-86' }> */}
            {/* <ContentContainer className={isMobile ?'p-0' : 'br-bg'}> */}

            {/* </BadgeContainer> */}
            {!isMobile && displayCard &&
             !searchParams.get('showPaymentCards') &&
            !searchParams.get('addPay') ?
             <PillsContainer>
               <Pills className='active'>
                 <IconsContainer className='d-flex'>
                   <Icon name="check"/>
                 </IconsContainer>
              Health Assessment
               </Pills>
               <Pills className='active'>
                 <IconsContainer className='d-flex'>
                   <Icon name="check"/>
                 </IconsContainer>
              Your Results
               </Pills>
               <Pills className='active'>
                 <IconsContainer className='d-flex'>
                   <Icon name="check"/>
                 </IconsContainer>
              Basic Information
               </Pills>
               <Pills className='current'>
             4&nbsp;&nbsp;&nbsp; Payment method
               </Pills>
             </PillsContainer> : null}
            {displayCard &&
            <><ContentContainer
              className={isMobile ? '' : 'br-bg '}>
              <div className={isMobile ? ' pb-15' : 'p-0'}>
                <IconsContainer onClick={() => {
                  if (searchParams.get('retryPayment')) {
                    // setDisplayCard(true);
                    navigate(-1);
                  }
                  setDisplayCard(false);
                  setShowCards(true);
                  Mixpanel.track(action['orderPayment']['back']['title'], action['orderPayment']['back']['props']);
                  gtag('event', gaAction['orderPayment']['back']['title'], {
                    'event-category': gaAction['orderPayment']['back']['category'],
                  });
                } }>
                  <Icon name={'chervonLeft'} />
                </IconsContainer>
              </div>
              <div className={isMobile ? '' :'ptl-30-60'}>
                {!(searchParams.get('link')) ? <Heading className='mt-0 f-24'>
                  {(searchParams.get('showPaymentCards')) ? 'Add a new card' :
                   'Add payment method'}
                </Heading> : null}
                {searchParams.get('addPay') ? showCards ?
                    <Link className='f-14-fl' onClick={() => {
                      setShowCards(false);
                      setDisplayCard(true);
                    } }>
                      Add Card</Link> : <> {cardsData.length ?
                        <Link className='f-14-fl'
                          onClick={() => {
                            setShowCards(true);
                            setDisplayCard(false);
                            Mixpanel.track(action['orderPayment']['viewCard']['title'], action['orderPayment']['viewCard']['props']);
                            gtag('event', gaAction['orderPayment']['viewCard']['title'], {
                              'event-category': gaAction['orderPayment']['viewCard']['category'],
                            });
                          } }>
                          View Cards</Link> : null} </> : null}
                {!(searchParams.get('link')) &&
                    !searchParams.get('showPaymentCards') &&
                    !searchParams.get('addPay') ?
                    <PlansSection className='payment-page p-4-24'>
                      <div className={isMobile ? '' : 'd-flex js-bet'}>
                        <BodyText3>{plansData['plan_duration']}&nbsp;
                          {plansData['duration_type']}</BodyText3>
                        <BodyText3 className='f-17'>{plansData['currency_type']}
                          {plansData['plan_price']}/
                          {plansData['recurring_type']}</BodyText3>
                      </div>
                      {<BodyText3 className='mt-0 f-17-r'>
                        {plansData['plan_type']}
                      </BodyText3>}
                      <BodyText3 className='c-white f-15'>
                        See our <Link onClick={() =>
                          window.open(getFAQs('FAQs'))}>
                          FAQs</Link>
                        <span> for the cancellation policy.</span></BodyText3>
                    </PlansSection> : null}
                {displayCard ? <Elements stripe={stripePromise}>
                  <Payment
                    amount={(searchParams.get('paymentFee')) ?
                        (searchParams.get('paymentFee')) :
                        plansData['plan_price']}
                    transactionPayment={makePayment}
                    tokenId={addCard}
                    paymentText={paymentText}
                    disableBtn={disableBtn}
                    isRootcausePayment={true}
                    setDisableBtn={setDisableBtn}
                    updatePaymentText={updatePaymentText}
                    onCancel={() => console.log('cancel')}
                    paymentStatus={paymentStatus}
                    saveCard={searchParams.get('showPaymentCards') ?
                     true : false}
                    disMsg={searchParams.get('addPay') ||
                        searchParams.get('showPaymentCards') ?
                        true : false} />
                </Elements> : null}
              </div>
            </ContentContainer></>}
            {!displayCard && <BadgeContainer
              className={isMobile ? 'pos-unset w-100 br-0' : 'pos-unset w-86'}>
              {searchParams.get('showPaymentCards') ?
    <div className={isMobile ? 'p-24 pb-0' : 'p-0'}>
      <IconsContainer onClick={()=>{
        navigate(-1);
        Mixpanel.track(action['orderPayment']['back']['title'], action['orderPayment']['back']['props']);
        gtag('event', gaAction['orderPayment']['back']['title'], {
          'event-category': gaAction['orderPayment']['back']['category'],
        });
      }}>
        <Icon name={'chervonLeft'} />
      </IconsContainer>
    </div>: null}
              <div className={isMobile? 'p-0' : 'pb-24' }>
                <FlexContainer
                  className={'ptb-0' } justifyContent={'space-between'} >
                  <IconsContainer onClick={()=>{
                    navigate(-1);
                    Mixpanel.track(action['orderPayment']['back']['title'], action['orderPayment']['back']['props']);
                    gtag('event', gaAction['orderPayment']['back']['title'], {
                      'event-category': gaAction['orderPayment']['back']['category'],
                    });
                  }}>
                    <Icon name={'chervonLeft'} />
                  </IconsContainer>
                  <div className='d-flex gap-10'>
                    {!extendPlanData && !planPackage && !rootUserPlan &&
                    <IconsContainer className='w-32-ico active' >
                      <Icon name={'shipping'} />
                    </IconsContainer>}
                    <IconsContainer className='w-32-ico active'>
                      <Icon name={'address'} />
                    </IconsContainer>
                    <IconsContainer className='w-32-ico' >
                      <Icon name={'check'} />
                    </IconsContainer>
                  </div>
                </FlexContainer>
                <MenuHeader>
                  {extendPlanData || planPackage || rootUserPlan ? 'Select payment method' : 'Payment method'}
                </MenuHeader></div>
              {extendPlanData && <div>
                <MembershipContainer className='my-2 active'>
                  <MembershipDiv>
                    <MembershipLabel>
                      {extendPlanData?.['plan_type']}
                    </MembershipLabel>
                    <MembershipPara>
                      ${extendPlanData?.['plan_price']}/
                      {extendPlanData?.['duration_type']?.charAt(0) + extendPlanData?.['duration_type']?.slice(1).toLowerCase()}, billed one-time
                    </MembershipPara>
                  </MembershipDiv>
                </MembershipContainer>
              </div>}
              {planPackage && <div>
                <MembershipContainer className='my-2 active'>
                  <MembershipDiv>
                    <MembershipLabel>
                      {planPackage[0]?.['plan_type']}
                    </MembershipLabel>
                    <MembershipPara>
                      ${planPackage[0]?.['plan_price']}&nbsp;
                      (${planPackage[0]?.['plan_price']/planPackage[0]?.['no_of_appointments']}/Appointment)
                    </MembershipPara>
                  </MembershipDiv>
                </MembershipContainer>
              </div>}
              {rootUserPlan && <div>
                <MembershipContainer className='my-2 active'>
                  <MembershipDiv>
                    <MembershipLabelDiv>
                      <MembershipLabel className='fw-100'>
                        {rootUserPlan['plan_duration']}{' '}{rootUserPlan['duration_type']}
                      </MembershipLabel>
                      <MembershipPara>
                        {rootUserPlan['currency_type']}{rootUserPlan['plan_price']}/month
                      </MembershipPara>
                    </MembershipLabelDiv>
                    <div>
                      <MembershipLabel className='f-18'>
                        {rootUserPlan?.['plan_type']}
                      </MembershipLabel>
                    </div>
                  </MembershipDiv>
                </MembershipContainer>
              </div>}
              <ContentContainer className='p-0'>
                <CardDetailsSec >
                  {cardsData.map((info:any, i:number)=>{
                    return (<>
                      {i== 0 ? <Heading3 className='f-18 mt-0'>
                      Default</Heading3> : null}
                      {i== 1 ? <Heading3 className='f-18'>
                      Other</Heading3> : null}
                      <CardDetails key={i}
                        onClick={()=> makeCardDefault(info, i)}
                        className={info['is_default'] ? 'active' : ''}>
                        <Radio
                          checked={info['is_default'] == true}
                          value="a"
                          name="radio-buttons"
                          inputProps={{'aria-label': 'A'}}
                          sx={info['is_default'] == true ? {'&.Mui-checked': {
                            color: '#1E3653',
                          }} : {}}
                        />
                        <IconsContainer>
                          <ImageWrapper>
                            <img src={mdImg} alt="User" />
                          </ImageWrapper>
                        </IconsContainer>
                        <BodyText3 className='ml-10'>
                          { 'XXXX XXXX XXXX '+ info['card_number']}
                        </BodyText3>
                      </CardDetails>
                    </>);
                  })
                  }
                  <> <Link className={restrictUser === 'false' ? 'restricted' :
                    'f-14'} onClick={()=>{
                    setDisplayCard(true);
                    setShowCards(false);
                    Mixpanel.track(action['orderPayment']['newCard']['title'], action['orderPayment']['newCard']['props']);
                    gtag('event', gaAction['orderPayment']['newCard']['title'], {
                      'event-category': gaAction['orderPayment']['newCard']['category'],
                    });
                  }}>
                   +Add a New Card </Link>
                  {!searchParams.get('showPaymentCards') &&
                 !searchParams.get('addPay') ?
                  <Button variant={restrictUser === 'false' ?
                    'disabled' : cardsData.length === 0 ? 'disabled' : disableBtn ? 'disabled':'primary'}
                  size='large' width='100%'
                  onClick={()=>{
                    const idx= _.findIndex(cardsData, function(o: any) {
                      return o.is_default;
                    });
                    if (!disableBtn) {
                      makeFeePayment(cardsData[idx]);
                    }
                    setDisableBtn(true);
                    Mixpanel.track(action['orderPayment']['continue']['title'], action['orderPayment']['continue']['props']);
                    gtag('event', gaAction['orderPayment']['continue']['title'], {
                      'event-category': gaAction['orderPayment']['continue']['category'],
                    });
                  }}
                  className={ 'flx-center mt-10'}
                  >Continue</Button>:null}
                  {!searchParams.get('planType') && !searchParams.get('packageAppointment') && !searchParams.get('userType') && searchParams.get('addPay') ?
                  <Button variant={restrictUser === 'false' ?
                    'disabled' : cardsData.length === 0 ? 'disabled' : disableBtn ? 'disabled':'primary'}
                  size='large' width='100%'
                  onClick={()=>{
                    if (!disableBtn) {
                      if (searchParams.get('retryPayment')) {
                        retryPayment(defCardInfo);
                      } else {
                        makeOrderPayment(defCardInfo);
                      }
                    }
                    setDisableBtn(true);
                    Mixpanel.track(action['orderPayment']['continue']['title'], action['orderPayment']['continue']['props']);
                    gtag('event', gaAction['orderPayment']['continue']['title'], {
                      'event-category': gaAction['orderPayment']['continue']['category'],
                    });
                  }}
                  className={ 'flx-center mt-10'}
                  >Continue</Button>:null}
                  {searchParams.get('planType') && !searchParams.get('userType') ?
                  <>
                    <Button variant={restrictUser === 'false' ?
                      'disabled' : cardsData.length === 0 ? 'disabled' : disableBtn ? 'disabled':'primary'}
                    size='large' width='100%'
                    onClick={()=>{
                      if (!disableBtn) {
                        makeExtendPlanPayment(defCardInfo);
                      }
                      setDisableBtn(true);
                      Mixpanel.track(action['orderPayment']['continue']['title'], action['orderPayment']['continue']['props']);
                      gtag('event', gaAction['orderPayment']['continue']['title'], {
                        'event-category': gaAction['orderPayment']['continue']['category'],
                      });
                    }}
                    className={ 'flx-center mt-10'}
                    >Continue</Button>
                  </>:null}
                  {searchParams.get('packageAppointment') ?
                  <Button variant={restrictUser === 'false' ?
                    'disabled' : cardsData.length === 0 ? 'disabled' : disableBtn ? 'disabled':'primary'}
                  size='large' width='100%'
                  onClick={()=>{
                    if (!disableBtn) {
                      makePlanPackagePayment(defCardInfo);
                    }
                    setDisableBtn(true);
                    Mixpanel.track(action['orderPayment']['continue']['title'], action['orderPayment']['continue']['props']);
                    gtag('event', gaAction['orderPayment']['continue']['title'], {
                      'event-category': gaAction['orderPayment']['continue']['category'],
                    });
                  }}
                  className={ 'flx-center mt-10'}
                  >Continue</Button>:null}
                  {searchParams.get('userType') ?
                  <Button variant={restrictUser === 'false' ?
                    'disabled' : cardsData.length === 0 ? 'disabled' : disableBtn ? 'disabled':'primary'}
                  size='large' width='100%'
                  onClick={()=>{
                    if (!disableBtn) {
                      makeRootUserPlanPayment(defCardInfo);
                    }
                    setDisableBtn(true);
                    Mixpanel.track(action['orderPayment']['continue']['title'], action['orderPayment']['continue']['props']);
                    gtag('event', gaAction['orderPayment']['continue']['title'], {
                      'event-category': gaAction['orderPayment']['continue']['category'],
                    });
                  }}
                  className={ 'flx-center mt-10'}
                  >Confirm</Button>:null}
                  </>
                </CardDetailsSec>
              </ContentContainer>
            </BadgeContainer>}
          </DesktopWidth>
        </ScrollSection>
      </MainContainer>
    </>
  );
}
