/* eslint-disable max-len */
import Icon from '@app/components/icon';
import {MainContainer, FlexContainer, DesktopWidth, Heading3, Loader, Link}
  from '@app/styles/common-styles';
import {useEffect, useState} from 'react';
import {createSearchParams, useNavigate, useParams} from 'react-router-dom';
import {BackDrop, ContentContainer, DialogContainer, IconsContainer, ImageWrapper} from
  '../assesment-questions/assesment-questions-components';
import {ScrollSection} from
  '../boarding-screens/component/boarding-screen-components';
import {BadgeContainer, BadgeRow}
  from '../home/home-components';
import {MenuHeader} from '../profile/profile-components';
import apiEndpoint from '@app/core/apiend_point';
import {PayloadProps, ApiResponseProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import {getLocalStorage} from '@app/core/localStorageService';
import {isMobile} from 'react-device-detect';
import Header from '@app/components/header';
import BotoomHeader from '@app/components/footer-menu';
import React from 'react';
import Button from '@app/components/button';
import {ItemCount, ItemHeading, ItemName} from './orders-components';
import mdImg from '@app/assets/images/visa.png';
import Spinner from '@app/components/icon/icons/loader';
import vector from '@app/assets/images/bg-succ.png';
import vector1 from '@app/assets/images/bg-suc-1.png';
import {dateFormats} from '@app/utils/dateformat';
import CommonSnackbar from '@app/core/snackbar';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';

/**
 * Renders Component.
 * @return {Appointments} renders Component.
 */
export default function Summary() {
  const navigate = useNavigate();
  const token = getLocalStorage('token') ? getLocalStorage('token') : '';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const {id}: any = useParams();
  const [orderData, setorderData] = useState<any>({});
  // const [selIndex, setSelectedIndex] = useState(-1);
  const [loader, setLoader] = useState(false);
  const [openDialog, updateDialog] = useState(false);
  const searchParams = new URLSearchParams(location.search);
  const [invoiceLink, setInvoiceLink] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [err, setErr] = useState('');

  const restrictUser = sessionStorage.getItem('resctrict_user_actions');

  useEffect(()=>{
    // updateType('upcoming');
    setIsSubmitting(false);
    getOrderDetails();
    setLoader(true);
    Mixpanel.track(service['summary']['title'], service['summary']['props']);
    gtag('event', gaService['summary']['title'], {
      'event_category': gaService['summary']['category'],
    });
  }, []);
  const getOrderDetails =async () =>{
    const apiObject: PayloadProps = {
      payload: {},
      method: 'get',
      apiUrl: apiEndpoint.order +'/'+id,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            setorderData(response.data.order);
            setLoader(false);
            getOrderInvoice();
          } else {
            setorderData({});
            setLoader(false);
          }
        });
  };
  const getOrderInvoice =async () =>{
    const apiObject: PayloadProps = {
      payload: {},
      method: 'get',
      apiUrl: apiEndpoint.downloadOrder +id,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            setInvoiceLink(response.data);
            // setorderData(response.data.order);
            // setLoader(false);
            // getOrderInvoice();
          } else {
            // setorderData({});
            // setLoader(false);
          }
        });
  };
  const onSubmit =async (data:any) =>{
    if (searchParams.get('isConfirmation') ) {
      navigate('/orders/1', {
        state: {
          data: 'Your orders',
        },
      });
      Mixpanel.track(action['summary']['goToOrders']['title'], action['summary']['goToOrders']['props']);
      gtag('event', gaAction['summary']['goToOrders']['title'], {
        'event_category': gaAction['summary']['goToOrders']['category'],
      });
      return;
    }
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    const apiObject: PayloadProps = {
      payload: {
        'status': 'submit',
        'cardId': orderData['card_data']['stripe_card_id'],
        'billingAddressId': orderData['billing_address_id'],
        'shipingAddressId': orderData['shipping_address_id'],
      },
      method: 'put',
      apiUrl: apiEndpoint.order +'/'+id,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          // navigate({
          //   pathname: '/summary/'+orderData._id,
          //   search:
          //             `?${createSearchParams({
          //               isConfirmation: 'true'})}`,
          // });
          if (response.status_code === 200) {
            updateDialog(true);
            navigate({
              pathname: '/summary/'+orderData._id,
              search:
                    `?${createSearchParams({
                      isConfirmation: 'true'})}`,
            });
            setTimeout(() => {
              setIsSubmitting(false);
              updateDialog(false);
            }, 3000);
          } else {
            setShowPopup(true);
            setErr(response.data ? response.data : response.message);
            setIsSubmitting(false);
          }
        });
  };

  return (
    <>
      <MainContainer bgColor={'#FAFAFC'}>
        {openDialog ? <BackDrop><DialogContainer className='flx-cen pos-rel w-50'>
          <IconsContainer className='icon-t-25'>
            <ImageWrapper>
              <img src={vector} alt="User" />
            </ImageWrapper>
          </IconsContainer>
          <IconsContainer className='icon-3-50'>
            <ImageWrapper>
              <img src={vector1} alt="User" />
            </ImageWrapper>
          </IconsContainer>
          <Heading3>
          Your order has been
submitted!          </Heading3>
          <ItemHeading className='lh-21'>
We will send you a confirmation email shortly!
          </ItemHeading>
        </DialogContainer></BackDrop> : null}
        {loader ? <Loader>
          <Spinner size="6px" />
        </Loader> : null}
        <CommonSnackbar
          title="Error"
          appearance={'error'}
          message={err}
          open={showPopup}
          close={() => setShowPopup(false)} />
        {!isMobile? <Header hideBackArrow={false} className='txt-left'
          desktopMenu={isMobile ? false : true}/>: null}
        <ScrollSection id="scrollable-div" className={isMobile?'w-100 flex-1 mb-64':'w-100 flex-1'}>
          <DesktopWidth>
            {true ?
        <BadgeContainer className={isMobile ? 'pos-unset w-100 br-0' : 'pos-unset w-86' }>
          {/* <ContentContainer className={isMobile ?'p-0' : 'br-bg'}> */}
          <FlexContainer className={'ptb-0' } justifyContent={'space-between'} >
            <IconsContainer onClick={()=>{
              navigate('/orders/1', {
                state: {
                  data: 'Your orders',
                },
              });
              Mixpanel.track(action['summary']['back']['title'], action['summary']['back']['props']);
              gtag('event', gaAction['summary']['back']['title'], {
                'event_category': gaAction['summary']['back']['category'],
              });
            }}>
              <Icon name={'chervonLeft'} />
            </IconsContainer>
            {console.log(searchParams.get('isConfirmation'))}
            {!searchParams.get('isConfirmation') ? <div className='d-flex gap-10'>
              <IconsContainer className='w-32-ico active' >
                <Icon name={'shipping'} />
              </IconsContainer>
              <IconsContainer className='w-32-ico active'>
                <Icon name={'address'} />
              </IconsContainer>
              <IconsContainer className='w-32-ico active' >
                <Icon name={'check'} />
              </IconsContainer>
            </div> : null}
          </FlexContainer>
          {/* </ContentContainer> */}
          {!loader ?<>
            <ContentContainer className={isMobile ? 'p-0' : ''}>
              <MenuHeader className='mb-10'>
                {!searchParams.get('isConfirmation') ? 'Order summary' : 'Order #'+ orderData.order_id}
              </MenuHeader>
              <div className='d-flex js-bet mb-20'>
                <Link className='f-14 no-pointer'>
                  { searchParams.get('isConfirmation') ? 'Confirmed '+ dateFormats(orderData.created_date, 'MM/DD/YYYY') :
            'Items in order'}
                </Link>
                {invoiceLink ? <Link className={restrictUser === 'false' ? 'restrict' : 'f-14'} onClick={()=>{
                  window.open(invoiceLink);
                  Mixpanel.track(action['summary']['invoice']['title'], action['summary']['invoice']['props']);
                  gtag('event', gaAction['summary']['invoice']['title'], {
                    'event_category': gaAction['summary']['invoice']['category'],
                  });
                }}>
                  Download Invoice
                </Link> : null}
              </div>
              {orderData &&orderData['order_products_data'] && orderData['order_products_data'].length ? <>
                {orderData['order_products_data'].map((info, i)=>{
                  return (<BadgeContainer className='pos-unset w-100 cart-itemCard' key={i}>
                    <BadgeRow className='' >
                      <div>
                        <ItemName>{info['product_name']}</ItemName>
                        <ItemCount> Quantity {info['quantity']}</ItemCount>
                      </div>
                      {searchParams.get('isConfirmation') ? <Link className='f-14'>${info['price']}</Link> : null}

                    </BadgeRow>
                  </BadgeContainer>);
                })
                }
                <div className='mt-20 flx-col-10'>
                  <div className='d-flex js-bet'>
                    <ItemHeading> Shipping address</ItemHeading>
                    {/* { !searchParams.get('isConfirmation') ? <Link className='f-14'
                      onClick={()=>
                        navigate({
                          pathname: '/address/'+orderData._id+ '/'+
                          orderData['total_amount'],
                          search:
                            // eslint-disable-next-line max-len
                            `?${createSearchParams({
                              isSummary: 'true'})}`,
                        })}
                    > Edit</Link> : null} */}
                  </div>
                  {console.log(orderData, 'gan')}
                  <ItemName className='clr-gray word-break'>{orderData['shipping_address_data']['street_address_one']?.replace(/[,]+/g, ' ').trim()+' '+(orderData['shipping_address_data']['street_address_two'] ? orderData['shipping_address_data']['street_address_two']?.replace(/[,]+/g, ' ').trim() : '')},&nbsp;
                    {orderData['shipping_address_data']['city']?.replace(/[,]+/g, ' ').trim()}, {orderData.shipping_address_data.state.name}, {orderData['shipping_address_data']['country']?.replace(/[,]+/g, ' ').trim()},&nbsp;
                    {orderData['shipping_address_data']['zip_code']?.replace(/[,]+/g, ' ').trim()}</ItemName>
                </div>
                <div className='mt-20 flx-col-10'>
                  <div className='d-flex js-bet'>
                    <ItemHeading>Payment method</ItemHeading>
                    {!searchParams.get('isConfirmation') ? <Link className='f-14' onClick={()=>
                      navigate({
                        pathname: '/order-payment',
                        search:
                            // eslint-disable-next-line max-len
                            `?${createSearchParams({paymentFee: orderData['total_amount'],
                              addPay: 'true',
                              id: id})}`,
                      })}
                    > Edit</Link> : null}
                  </div>
                  <div className='d-flex gap-10'>
                    <IconsContainer>
                      <ImageWrapper>
                        <img src={mdImg} alt="User" />
                      </ImageWrapper>
                    </IconsContainer>
                    <ItemName className='clr-gray'>XXXX XXXX XXXX&nbsp;{orderData['card_data']['card_number']}</ItemName>
                  </div>
                </div>
                <div className='mt-20 flx-col-10'>
                  <div className='d-flex js-bet'>
                    <ItemName className='clr-bl'> SUBTOTAL</ItemName>
                    <ItemName className='clr-bl'> ${orderData['without_tax_amount']}</ItemName>
                  </div>
                  <div className='d-flex js-bet'>
                    <ItemName className='clr-bl'> SHIPPING</ItemName>
                    <ItemName className='clr-bl'> ${orderData['shipping_amount']}</ItemName>
                  </div>
                  <div className='d-flex js-bet'>
                    <ItemName className='clr-bl'> TAXES</ItemName>
                    <ItemName className='clr-bl'> ${orderData['tax_amount']}</ItemName>
                  </div>
                  <div className='d-flex js-bet'>
                    <ItemName className='clr-bl bold'> TOTAL</ItemName>
                    <ItemName className='clr-bl bold'> ${orderData['total_amount']}</ItemName>
                  </div>
                </div>
              </> :
            <ContentContainer className='h-250 text-center'>
              <Heading3 className='f-24'>
                  You don’t have any products yet!
              </Heading3>
            </ContentContainer>}
            </ContentContainer>
            {(orderData &&orderData['order_status_data'] &&
             !(searchParams.get('isConfirmation') ) && orderData['order_status_data']['code'] != 'submitted') ?
            <Button variant={restrictUser === 'false' ? 'disabled' : isSubmitting ? 'disabled' : 'primary'}
              className='pt-30 mt-20'
              type="submit"
              onClick={onSubmit}
              size='large' width='100%'
            >Submit order</Button> : null}
          </> : null}
          {( (searchParams.get('isConfirmation') )) ?
            <Button variant={restrictUser === 'false' ? 'disabled' : isSubmitting ? 'disabled' : 'primary'}
              className='pt-30 mt-20'
              type="submit"
              onClick={onSubmit}
              size='large' width='100%'
            >Go to Orders</Button> : null}

        </BadgeContainer> : null}
          </DesktopWidth>
        </ScrollSection>
        {isMobile ? <BotoomHeader/> : null}
      </MainContainer>
    </>
  );
}
