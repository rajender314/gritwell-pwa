/* eslint-disable max-len */
import Header from '@app/components/header';
import Payment from '@app/components/payment/payment';
import {whiteColor} from '@app/styles';
import {DesktopWidth, Heading, Heading3, Link, Loader,
  PaymentHeader,
  PaymentMainScreen}
  from '@app/styles/common-styles';
import React, {useEffect, useState} from 'react';
import {ContentContainer,
  IconsContainer, ImageWrapper,
  //  Pills, PillsContainer,
}
  from '../assesment-questions/assesment-questions-components';
import {PlansSection, BodyText3}
  from '../recommend-plans/component/recommend-plans-components';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {PaymentSuccess} from '@app/utils';
import {ApiResponseProps, PayloadProps} from '@app/schema/schema';
import apiEndpoint from '@app/core/apiend_point';
import {getLocalStorage} from '@app/core/localStorageService';
import {triggerApi} from '@app/services';
import {createSearchParams, useLocation, useNavigate} from 'react-router-dom';
import {ScrollSection}
  from '../boarding-screens/component/boarding-screen-components';
// import AlertDialog from '@app/components/alert-dialog';
import CommonSnackbar from '@app/core/snackbar';
import mdImg from '@app/assets/images/visa.png';
import {CardDetailsSec, CardDetails} from './add-payment-components';
import Radio from '@mui/material/Radio';
import _ from 'lodash';
import Button from '@app/components/button';
import Icon from '@app/components/icon';
import Spinner from '@app/components/icon/icons/loader';
import {isMobile} from 'react-device-detect';
import {MenuHeader} from '../profile/profile-components';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';
import {BackBtnContainer, BackIconContainer, ImageHolder, LayoutWrapper, LeftContainer, LogoWrapper, RightContainer, RightContent} from '../sign-up/component/signup.components';
import PaymentImage from '@app/assets/images/paymentInflammation2x.png';
import WithoutInflammationBG from '@app/assets/images/Paymentwithout2x.png';
import {HeaderMain} from '@app/components/header/header-components';
/**
 * Renders Component.
 * @return {BoardingScreen} renders Component.
 */
export default function RootcausePayment() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [stripePromise, updateStripePromise] = useState( loadStripe('234141'));
  // const [navLink, setNavLink] = useState<any>('/payment-succes');
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
  // const [openDialog, setOpenDialog] = useState(false);
  const [cardsData, setCardsData] = useState([]);
  const [disableBtn, setDisableBtn] = useState(false);
  const [loader, setloader] = useState(false);
  const [defCardInfo, setDefCardInfo] = useState({});
  const [showCards, setShowCards] = useState(false);
  const [paymentText, updatePaymentText] = useState('Confirm');
  const [codeStatus, setCodeStatus] = useState('');
  const [savedAmt, setSavedAmt] = useState();
  const [discAmt, setDiscAmt] = useState();
  const [couponCode, setCouponCode] = useState('');
  let cData= {};

  useEffect(()=>{
    setDisplayCard(false);
    const userPlan= JSON.parse(getLocalStorage('planDetails'));
    updatePlanDetails(userPlan);
  }, [getLocalStorage('planDetails')]);

  useEffect(()=>{
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
      setloader(false);
    }, 3000);
    // setOpenDialog(false);
    Mixpanel.track(service['addPayment']['title'], service['addPayment']['props']);
    gtag('event', gaService['addPayment']['title'], {
      'event_category': gaService['addPayment']['category'],
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
            const load={
              ...((codeStatus !== 'error' && couponCode) && {coupon: couponCode}),
              cardId: response.data.stripe_card_id,
              planSlug: plansData['plan_slug'],
            };
            if (searchParams.get('link')) {
              setDisableBtn(true);
              makeFeePayment(response.data);
              return;
            } else if (searchParams.get('addPay')) {
              setDisableBtn(true);
              makeOrderPayment(response.data);
              return;
            } else if (searchParams.get('showPaymentCards')) {
              setDisableBtn(true);
              setDisplayCard(false);
              addCardAPI({}, 'GET');
            } else {
              makePaymentAPI(load);
            }
          } else if (method === 'GET') {
            if (response.status_code === 200) {
              const cardsList = response.data;
              const list1 = cardsList.filter((card) => card.is_default);
              const list2 = cardsList.filter((card) => !card.is_default);
              setDefCardInfo(list1[0]);
              setCardsData([...list1, ...list2]);
            }
          } else {
            setDisableBtn(false);
            updatePaymentText('Confirm');
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
   * @param {payload} data
   */
  async function makePaymentAPI(data) {
    updatePaymentText('Processing...');
    const Promo = getLocalStorage('promo') ? getLocalStorage('promo') : '';
    const apiObject: PayloadProps = {
      payload: {
        'cardId': data.cardId,
        'coupon': Promo,
        'plan_id': plansData['plan_id']},
      method: 'POST',
      apiUrl: apiEndpoint.rootCausePaymentApi,
      headers: {Authorization: getLocalStorage('token')},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            setDisableBtn(true);
            navigate('/payment-success');
            Mixpanel.track(action['add_payment']['purchaseDone']['title'], action['add_payment']['purchaseDone']['props']);
            gtag('event', gaAction['add_payment']['purchaseDone']['title'], {
              'event_category': gaAction['add_payment']['purchaseDone']['category'],
            });
            // setOpenDialog(true);
            // if ( plansData['plan_slug']==='rootcause') {
            //   logoutGlobalSession();
            //   window.location.replace(cData['rcRedirectUrl'] ? cData['rcRedirectUrl'] : 'https://gritwell-1.webflow.io/home-v2' );
            // } else {
            // }
            // setTimeout(() => {
            //   setOpenDialog(false);
            //   navigate('/plan-journey');
            // }, 4500);
            // setPlansData(response.data[0]);
          } else {
            setDisableBtn(false);
            updatePaymentText('Confirm');
            setInfoMsg(response.data.message ?
              response.data.message : response.message);
            setShowSectionMsg(true);
            setApperance('error');
            Mixpanel.track(action['add_payment']['purchaseFail']['title'], action['add_payment']['purchaseFail']['props']);
            gtag('event', gaAction['add_payment']['purchaseFail']['title'], {
              'event_category': gaAction['add_payment']['purchaseFail']['category'],
            });
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
            // setOpenDialog(true);
            // setNavLink('/appointments');
            navigate({
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

  const applyCode = (data: string) => {
    setCouponCode(data);
    const apiObject: PayloadProps = {
      payload: {
        'coupon': data,
        'product_id': plansData['product_id'],
      },
      method: 'POST',
      apiUrl: apiEndpoint.applyPromoCode,
      headers: {Authorization: getLocalStorage('token')},
    };
    triggerApi(apiObject).then((response: ApiResponseProps)=>{
      if (response['status_code'] === 200) {
        setCodeStatus('success');
        setSavedAmt(response['data']['savedAmount']);
        setDiscAmt(response['data']['amount']);
      } else {
        setCodeStatus('error');
      }
    });
  };
  const restrictUser = sessionStorage.getItem('resctrict_user_actions');
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
      {/* {openDialog && (searchParams.get('link')) ?
       <AlertDialog header="Payment Successful!"
         description= { !(searchParams.get('link')) ?
        'Please continue with your journey...' :
         'Please Reschedule/Cancel the aappointment...'}
         onCancel={()=> {
           navigate(navLink);
           setOpenDialog(false);
         }}/> : (openDialog && !(searchParams.get('link')))&&
         <BackDrop><DialogContainer className={isMobile ?
         'fill-wid-80 al-center  ovy-scroll' : 'al-center  ovy-scroll'}>
           <ContentContainer className='p-0'>
             <Heading className='f-32-42'>Congratulations</Heading>
             <BodyText3 className='f-16-21'>
             You’re one step closer to gathering insight
on what may be driving symptoms. Let’s get this root cause analysis stated!
             </BodyText3>
             <div className={isMobile ? '' : 'd-flex gap-15'}>
             </div>
             <div className='d-flex js-end'>
               <Button variant={'secondary'}
                 size='large' width='30%'
                 onClick={()=>{
                   navigate(navLink);
                   setOpenDialog(false);
                 }}
                 className={ 'flx-center blue'}
               >Next</Button>
             </div>
           </ContentContainer>
         </DialogContainer>
         </BackDrop>} */}
      {/* <PaymentMainScreen style={isMobile ? {flexDirection: 'column', alignItems: 'center'} : {}} bgColor={whiteColor}> */}
      <PaymentMainScreen style={{display: 'none'}} bgColor={whiteColor}>
        {isMobile && <Header hideLogo={true} hideBackArrow={false}/> }
        {/* <div className={isMobile ? '' : 'signupScreen'}> */}
        {!isMobile && <div className={isMobile ?
            'd-flex jc-center partitionDiv w-100 h-250' :
             'd-flex jc-center partitionDiv w-50 pos-relative'}>
          <div>
            <div style={{position: 'absolute', left: '44px', top: '24px'}}>
              <Icon name="headerLogo" />
            </div>
            {!isMobile && !(searchParams.get('link')) &&
                    !searchParams.get('showPaymentCards') &&
                    !searchParams.get('addPay') ?
                    <PlansSection className='payment-page p-4-24'>
                      <div className={isMobile ? '' : 'd-flex js-bet'}>


                        <BodyText3 className='fw-400'>YOUR ORDER</BodyText3>
                        <div className='d-flex gap-4'>
                          <BodyText3 className={(discAmt && codeStatus !== 'error') ? 'line-through f-15' : 'f-17'}>

                            {plansData['plan_slug'] !== 'rootcause' && plansData['recurring_type']}</BodyText3>
                          {(discAmt && codeStatus !== 'error') && <BodyText3 className='f-17 clr-bl'>{plansData['currency_type']}
                            {discAmt}
                            {plansData['plan_slug'] !== 'rootcause' && plansData['recurring_type']}*</BodyText3>}
                        </div>
                      </div>
                      {<BodyText3 className='mt-0 f-20-r'>
                        {plansData['plan_title']} {plansData['plan_type']}
                      </BodyText3>}
                      <BodyText3 className='c-grey f-15 fw-400' style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>Total (incl. taxes)</div>
                        <div>{plansData['currency_type']}{plansData['plan_price']}</div></BodyText3>
                    </PlansSection> : null}
          </div></div>}
        {/* {!isMobile? <Header className='txt-left bg-white'
          desktopMenu={isMobile ? false : true}/>: null} */}
        <ScrollSection id="scrollable-div"
          className={
            (searchParams.get('showPaymentCards') ? isMobile?
          ' h-150 w-100 flex-9 w-100' : ' h-150 w-100 flex-9' :isMobile?
          ' flex-1 w-100' : ' flex-1 d-flex')}>
          <DesktopWidth >
            {/* {!isMobile && displayCard &&
             !searchParams.get('showPaymentCards') &&
            !searchParams.get('addPay') ?
             <PillsContainer>
               <Pills className='active'>
                 <IconsContainer className='d-flex'>
                   <Icon name="check"/>
                 </IconsContainer>
              Register
               </Pills>
               <Pills className='current'>
              Payment
               </Pills>
               <Pills>
             Onboard
               </Pills>
             </PillsContainer> : null} */}
            {displayCard &&
            <><ContentContainer
              className={isMobile ? '' : 'br-bg '}>
              <div className={isMobile ? ' pb-15' : 'p-0'}>
                <IconsContainer onClick={() => {
                  navigate('/plans');
                  // setDisplayCard(false);
                  // setShowCards(true);
                  Mixpanel.track(action['add_payment']['back']['title'], action['add_payment']['back']['props']);
                  gtag('event', gaAction['add_payment']['back']['title'], {
                    'event_category': gaAction['add_payment']['back']['category'],
                  });
                } }>
                  <Icon name={'chervonLeft'} />
                </IconsContainer>
              </div>
              <div className={isMobile ? '' :'mt-30'}>
                {!(searchParams.get('link')) ? <Heading className='mt-0 f-24'>
                  {(searchParams.get('showPaymentCards')) ? 'Add a new card' :
                   'Add payment method'}
                </Heading> : null}
                {searchParams.get('addPay') ? showCards ?
                   <Link className={restrictUser === 'false' ? 'restricted' : 'f-14-fl'} onClick={() => {
                     setShowCards(false);
                     setDisplayCard(true);
                     Mixpanel.track(action['add_payment']['addCard']['title'], action['add_payment']['addCard']['props']);
                     gtag('event', gaAction['add_payment']['addCard']['title'], {
                       'event_category': gaAction['add_payment']['addCard']['category'],
                     });
                   }}>
                      Confirm</Link> : <> {cardsData.length ?
                        <Link className='f-14-fl'
                          onClick={() => {
                            setShowCards(true);
                            setDisplayCard(false);
                          } }>
                          View Cards</Link> : null} </> : null}
                {isMobile && !(searchParams.get('link')) &&
                    !searchParams.get('showPaymentCards') &&
                    !searchParams.get('addPay') ?
                    <PlansSection className='payment-page p-4-24'>
                      <div className={isMobile ? '' : 'd-flex js-bet'}>

                        <BodyText3>YOUR ORDER</BodyText3>
                        <div className='d-flex gap-4'>
                          {(discAmt && codeStatus !== 'error') && <BodyText3 className='f-17 clr-bl'>{plansData['currency_type']}
                            {discAmt}
                            {plansData['plan_slug'] !== 'rootcause' && plansData['recurring_type']}*</BodyText3>}
                        </div>
                      </div>
                      {<BodyText3 className='mt-0 f-17-r'>
                        {plansData['plan_title']} {plansData['plan_type']}
                      </BodyText3>}
                      <BodyText3 className='c-grey f-15 fw-400' style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>Total (incl. taxes)</div>
                        <div>{plansData['currency_type']}{plansData['plan_price']}</div></BodyText3>
                    </PlansSection> : null}
                {displayCard ? <Elements stripe={stripePromise}>
                  <Payment
                    amount={(searchParams.get('paymentFee')) ?
                        (searchParams.get('paymentFee')) :
                        plansData['plan_price']}
                    transactionPayment={makePayment}
                    tokenId={addCard}
                    disableBtn={disableBtn}
                    setDisableBtn={setDisableBtn}
                    paymentText={paymentText}
                    updatePaymentText={updatePaymentText}
                    onCancel={() => console.log('cancel')}
                    paymentStatus={paymentStatus}
                    setDiscAmt={setDiscAmt}
                    showPromoField={searchParams.get('showPaymentCards') ? '' : 'show'}
                    applyPromoCode={applyCode}
                    setCouponCode={setCouponCode}
                    codeStatus={codeStatus}
                    savedAmt={savedAmt}
                    setCodeStatus={setCodeStatus}
                    saveCard={searchParams.get('showPaymentCards') ?
                     true : false}
                    disMsg={searchParams.get('addPay') ||
                        searchParams.get('showPaymentCards') ?
                        true : false} />
                </Elements> : null}
              </div>
            </ContentContainer></>}
            {!displayCard && <ContentContainer
              className={isMobile ? 'p-0' : 'br-bg mt-40'}>
              {searchParams.get('showPaymentCards') ?
    <div className={isMobile ? 'p-24 pb-0' : 'p-0'}>
      <IconsContainer onClick={()=>{
        navigate(-1);
        Mixpanel.track(action['add_payment']['back']['title'], action['add_payment']['back']['props']);
        gtag('event', gaAction['add_payment']['back']['title'], {
          'event_category': gaAction['add_payment']['back']['category'],
        });
      }}>
        <Icon name={'chervonLeft'} />
      </IconsContainer>
    </div>: null}
              <ContentContainer className={isMobile? 'p-24' : 'pb-24' }>
                <MenuHeader>
              Payment method
                </MenuHeader></ContentContainer>
              <ContentContainer className='pt-0'>
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

                  <> <Link className={restrictUser === 'false' ? 'restricted' : 'f-14'} onClick={()=>{
                    setDisplayCard(true);
                    setShowCards(false);
                    Mixpanel.track(action['add_payment']['addNewCard']['title'], action['add_payment']['addNewCard']['props']);
                    gtag('event', gaAction['add_payment']['addNewCard']['title'], {
                      'event_category': gaAction['add_payment']['addNewCard']['category'],
                    });
                  }}>
                   +Add a New Card </Link>
                  {!searchParams.get('showPaymentCards') &&
                 !searchParams.get('addPay') ?
                  <Button variant={disableBtn ? 'disabled':'primary'}
                    size='large' width='100%'
                    onClick={()=>{
                      const idx= _.findIndex(cardsData, function(o: any) {
                        return o.is_default;
                      });
                      if (!disableBtn) {
                        makeFeePayment(cardsData[idx]);
                      }
                      setDisableBtn(true);
                    }}
                    className={ 'flx-center mt-10'}
                  >Continue</Button>:null}
                  {searchParams.get('addPay') ?
                  <Button variant={disableBtn ? 'disabled':'primary'}
                    size='large' width='100%'
                    onClick={()=>{
                      if (!disableBtn) {
                        makeOrderPayment(defCardInfo);
                      }
                      setDisableBtn(true);
                    }}
                    className={ 'flx-center mt-10'}
                  >Continue</Button>:null}
                  </>
                </CardDetailsSec>
              </ContentContainer>
            </ContentContainer>}
          </DesktopWidth>
        </ScrollSection>
        {/* </div> */}
      </PaymentMainScreen>

      <LayoutWrapper>
        {isMobile && <HeaderMain className={isMobile ?
         'text-center d-flex js-bet p-10' :'text-center d-flex js-bet'}>
          <IconsContainer className='d-flex mrt-6' onClick={() => {
            navigate('/plans');
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
        </HeaderMain>}
        <LeftContainer className='h-unset'>
          <div>
            <LogoWrapper style={isMobile ? {} : {}}>
              {!isMobile &&
              //  <BackBtnContainer>
              //   <BackIconContainer onClick={() => navigate('/plans')}>
              //     <Icon name='backarrow'/>
              //   </BackIconContainer>
              // </BackBtnContainer> :
               <Icon name="headerLogo" />}
            </LogoWrapper>
            {isMobile && !(searchParams.get('link')) ? <Heading style={isMobile ? {marginLeft: '25px', marginTop: '20px'} : {}} className={'paymentHeaderstyles ' + (isMobile ? 'p-0' : 'px-24 m-0')}>
              {(searchParams.get('showPaymentCards')) ? 'Add a new card' :
                   'Add payment method'}
            </Heading> : null}
          </div>
          <div className='d-flex' style={{flex: '1'}}>
            <ImageHolder className='has-svg payment'>
              <PlansSection className='payment-page p-24  maxWidth-443'>
                <div> <img src={plansData['plan_type'] === 'only' ? WithoutInflammationBG : PaymentImage} alt='paymentLeftContainerImage' /></div>
                <div className={isMobile ? '' : 'd-flex js-bet'}>


                  <BodyText3 className='fw-400'>YOUR ORDER</BodyText3>
                  <div className='d-flex gap-4'>
                    {/* <BodyText3 className={(discAmt && codeStatus !== 'error') ? 'line-through f-15' : 'f-17'}>

                      {plansData['plan_slug'] !== 'rootcause' && plansData['recurring_type']}</BodyText3> */}
                  </div>
                </div>
                {<BodyText3 className='mt-0 f-20-r'>
                  {plansData['plan_title']} {plansData['plan_type']}
                </BodyText3>}
                <BodyText3 className='c-grey f-16 fw-400' style={{display: 'flex', justifyContent: 'space-between'}}>
                  <div>Total (incl. taxes)</div>
                  <div className='dflex gap-8 '>
                    <div className='f-24' style={(discAmt && codeStatus !== 'error') ? {textDecoration: 'line-through', opacity: '0.6', fontSize: '18px'} : {}}>{plansData['currency_type']}{plansData['plan_price']}</div>
                    {(discAmt && codeStatus !== 'error') && <div className='f-24 clr-bl'>
                      <div>{plansData['currency_type']}{discAmt}
                        {plansData['plan_slug'] !== 'rootcause' && plansData['recurring_type']}*</div></div>}
                  </div></BodyText3>
                {(discAmt && codeStatus !== 'error') && <p className='mt-8 mb-20'>*Discount applicable only for the first payment</p>}
              </PlansSection>
            </ImageHolder>
          </div>
        </LeftContainer>
        <RightContainer>
          <RightContent>
            <div className="content-wrapper">
              {!isMobile && <BackBtnContainer className='pb-24'>
                <BackIconContainer onClick={() => navigate('/plans')}>
                  <Icon name='backarrow'/>
                </BackIconContainer>
              </BackBtnContainer>}
              {/* <div className={isMobile ? '' :'mt-30'}> */}
              {!isMobile && !(searchParams.get('link')) ? <PaymentHeader className='m-0 mb-24 f-24'>
                {(searchParams.get('showPaymentCards')) ? 'Add a new card' :
                   'Add payment method'}
              </PaymentHeader> : null}
              {searchParams.get('addPay') ? showCards ?
                   <Link className={restrictUser === 'false' ? 'restricted' : 'f-14-fl'} onClick={() => {
                     setShowCards(false);
                     setDisplayCard(true);
                     Mixpanel.track(action['add_payment']['addCard']['title'], action['add_payment']['addCard']['props']);
                     gtag('event', gaAction['add_payment']['addCard']['title'], {
                       'event_category': gaAction['add_payment']['addCard']['category'],
                     });
                   }}>
                      Add Card</Link> : <> {cardsData.length ?
                        <Link className='f-14-fl'
                          onClick={() => {
                            setShowCards(true);
                            setDisplayCard(false);
                          } }>
                          View Cards</Link> : null} </> : null}
              {/* {isMobile && !(searchParams.get('link')) &&
                    !searchParams.get('showPaymentCards') &&
                    !searchParams.get('addPay') ?
                    <PlansSection className='payment-page p-4-24'>
                      <div className={isMobile ? '' : 'd-flex js-bet'}>

                        <BodyText3>YOUR ORDER</BodyText3>
                        <div className='d-flex gap-4'>
                          {(discAmt && codeStatus !== 'error') && <BodyText3 className='f-17 clr-bl'>{plansData['currency_type']}
                            {discAmt}
                            {plansData['plan_slug'] !== 'rootcause' && plansData['recurring_type']}*</BodyText3>}
                        </div>
                      </div>
                      {<BodyText3 className='mt-0 f-17-r'>
                        {plansData['plan_title']} {plansData['plan_type']}
                      </BodyText3>}
                      <BodyText3 className='c-grey f-15 fw-400' style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>Total (incl. taxes)</div>
                        <div>{plansData['currency_type']}{plansData['plan_price']}</div></BodyText3>
                    </PlansSection> : null} */}
              {/* {(discAmt && codeStatus !== 'error') && <p className='mt-8 mb-32'>*Discount applicable only for the first payment</p>} */}
              {displayCard ?
                <Elements stripe={stripePromise}>
                  <Payment
                    amount={(searchParams.get('paymentFee')) ?
                          (searchParams.get('paymentFee')) :
                          plansData['plan_price']}
                    transactionPayment={makePayment}
                    tokenId={addCard}
                    disableBtn={disableBtn}
                    setDisableBtn={setDisableBtn}
                    isRootcausePayment={false}
                    paymentText={paymentText}
                    updatePaymentText={updatePaymentText}
                    onCancel={() => console.log('cancel')}
                    paymentStatus={paymentStatus}
                    setDiscAmt={setDiscAmt}
                    showPromoField={searchParams.get('showPaymentCards') ? '' : 'show'}
                    applyPromoCode={applyCode}
                    setCouponCode={setCouponCode}
                    codeStatus={codeStatus}
                    savedAmt={savedAmt}
                    setCodeStatus={setCodeStatus}
                    saveCard={searchParams.get('showPaymentCards') ?
                      true : false}
                    disMsg={searchParams.get('addPay') ||
                          searchParams.get('showPaymentCards') ?
                          true : false} />
                </Elements> : null}
              {/* </div> */}
            </div>
          </RightContent>
        </RightContainer>
      </LayoutWrapper>
    </>
  );
}
