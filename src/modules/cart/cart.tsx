/* eslint-disable max-len */
import Button from '@app/components/button';
import Header from '@app/components/header';
import Icon from '@app/components/icon';
import Spinner from '@app/components/icon/icons/loader';
import apiEndpoint from '@app/core/apiend_point';
import {getLocalStorage} from '@app/core/localStorageService';
import {PayloadProps, ApiResponseProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import {MainContainer, DesktopWidth, FlexContainer,
  Heading, Heading3, Loader, Link}
  from '@app/styles/common-styles';
import React, {useEffect, useState} from 'react';
import {isMobile} from 'react-device-detect';
import {useNavigate} from 'react-router-dom';
import {ContentContainer, IconsContainer}
  from '../assesment-questions/assesment-questions-components';
import {ScrollSection}
  from '../boarding-screens/component/boarding-screen-components';
import {BadgeHeading, BadgeLabel} from '../home/home-components';
import {CartCard, CartBrand, CartContainer}
  from '../orders/orders-components';
import {CostTitle} from './cart-component';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';

/**
 * Renders Component.
 * @return {cart} renders Component.
 */
export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, updateCartItems] = useState([]);
  const [loader, setLoader] = useState(true);
  const token = getLocalStorage('token') ? getLocalStorage('token') : '';
  const [costData, updateCostData] = useState({
    subTotal: 0,
    tax: 0,
    shipping: 0,
    total: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() =>{
    setLoader(true);
    // const userData= getLocalStorage('userData')?
    // JSON.parse(getLocalStorage('userData')) :{};
    getActiveHealthPlan();
    // if (userData['active_health_plan'] &&
    //  userData['active_health_plan']['_id'] ) {
    //   getCartItems(userData['active_health_plan']['_id']);
    // } else {
    //   getProfileData();
    //   // updateCartItems([]);
    // }
    Mixpanel.track(service['cart']['title'], service['cart']['props']);
    gtag('event', gaService['cart']['title'], {
      'event_category': gaService['cart']['category'],
    });
  }, []);

  const getActiveHealthPlan = async () =>{
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.currentHealthPlan,
      headers: {Authorization: getLocalStorage('token')},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          // if (response.status_code == 200) {
          getCartItems(response.data?.['active_health_plan']?.['_id']);
          // }
        });
  };

  const getCartItems =async (id)=>{
    const filter= `?healthPlanId=${id}`;

    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.cart+filter,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code == 200) {
            updateCartItems(response.data.cart);
            costData['shipping'] = response.data.shippingCost;
            costData['tax'] = response.data.estimatedTax ?
                  response.data.estimatedTax : 0;
            updateCostData(costData);
            calculateCost(response.data.cart);
            setTimeout(() => {
              setLoader(false);
            }, 10);
          } else {
            updateCartItems([]);
            setLoader(false);
          }
        });
  };
  const calculateCost =(data)=>{
    let subTotal = 0;
    data.map((item, i)=>{
      subTotal = subTotal + (item['quantity'] * item['product_info']['price']);
    });
    const costDataCpy = {...costData};
    costDataCpy['subTotal'] = subTotal;
    costDataCpy['total'] = subTotal;
    updateCostData(costDataCpy);
  };
  const addToCart =async (info, i)=>{
    // if (info['cartQuantity'] < 1) {
    //   return;
    // }
    const apiObject: PayloadProps = {
      payload: {
        'healthPlanId': info['health_plan_id'],
        'productId': info['product_id'],
        'productType': info['product_type'],
        'quantity': info['quantity'],
      },
      method: 'POST',
      apiUrl: apiEndpoint.cart,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            if (info['quantity'] < 1) {
              const ctItems = [...cartItems];
              ctItems.splice(i, 1);
              updateCartItems(ctItems);
            }
            // props.onFetch('');
            // setTimeout(() => {
            //   setShowPopup(true);
            // }, 10);
            // setTimeout(() => {
            //   setShowPopup(false);
            // }, 2000);
          }
        });
  };
  const submitOrder =async () =>{
    Mixpanel.track(action['cart']['checkout']['title'], action['cart']['checkout']['props']);
    gtag('event', gaAction['cart']['checkout']['title'], {
      'event_category': gaAction['cart']['checkout']['category'],
    });
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    const apiObject: PayloadProps = {
      payload: {
        orderProducts: cartItems,
      },
      method: 'POST',
      apiUrl: apiEndpoint.order,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            setTimeout(() => {
              navigate('/address/'+response.data.order._id+ '/'+
               response.data.order.total_amount);
            }, 1000);
          }
        });
  };
  return (
    <MainContainer bgColor={'#FFFFFF'}>
      <Header hideBackArrow={false} className='txt-left'
        desktopMenu={isMobile ? false : true}/>
      {loader ? <Loader>
        <Spinner size="6px" />
      </Loader> : null}
      {!loader ? <ScrollSection id="scrollable-div" className='w-100 flex-1'>
        <DesktopWidth className='w-1150 m-auto'>
          <ContentContainer className={isMobile ?'p-10' :
             'br-bg-s ptl-30-100'}>
            <>
              <FlexContainer
                className={isMobile ? 'ptb-0' : 'p-0'}
                justifyContent={'space-between'} >
                <IconsContainer onClick={()=>{
                  navigate(-1);
                  Mixpanel.track(action['cart']['back']['title'], action['cart']['back']['props']);
                  gtag('event', gaAction['cart']['back']['title'], {
                    'event_category': gaAction['cart']['back']['category'],
                  });
                }}>
                  <Icon name={'chervonLeft'} />
                </IconsContainer>
              </FlexContainer>
              <FlexContainer
                justifyContent={'space-between'} className='p-10' >
                <Heading className='f-32 m-0'>
                Your Cart
                </Heading>
              </FlexContainer>
            </>
            <ContentContainer className={isMobile ? 'p-0 al-col-cen gap-15' :
             'p-0 al-start gap-15'}>
              {
    cartItems.length ? <>
      <CartContainer className='flex-1'>
        {cartItems.map((info, i)=>{
          return (
            <CartCard className='w-100 d-flex js-bet' key={i}>
              <div>
                <CartBrand>
                  {info['product_info']['brand']}
                </CartBrand>
                <BadgeHeading className='sub-head mb-8'>
                  {info['product_info']['name']}
                </BadgeHeading>
                <BadgeHeading className='sub-head mb-8 clr-gr'>
                ${info['product_info']['price']}
                </BadgeHeading>
              </div>
              <div className='align-norm'>
                <div className='d-flex gap-10'>
                  <IconsContainer className={'d-flex '+(info['quantity'] < 2 ?
               'not_allowed' : '')}
                  onClick={()=>{
                    if (info['quantity'] > 1) {
                      const ctItems = [...cartItems];
                      ctItems[i]['quantity'] = info['quantity'] -1;
                      updateCartItems(ctItems);
                      calculateCost(cartItems);
                      addToCart(ctItems[i], i);
                      // updateCount(count -1);
                    }
                    Mixpanel.track(action['cart']['minus']['title'], action['cart']['minus']['props']);
                    gtag('event', gaAction['cart']['minus']['title'], {
                      'event_category': gaAction['cart']['minus']['category'],
                    });
                  }}>
                    <Icon name="minus"/>
                  </IconsContainer>
                  <BadgeHeading className='f-16'>{info['quantity']}</BadgeHeading>
                  <IconsContainer className={'d-flex '+ (info['quantity'] > 9 ?
               'not_allowed' : '')}
                  onClick={()=>{
                    if (info['quantity'] < 10) {
                      const ctItems = [...cartItems];
                      ctItems[i]['quantity'] = info['quantity'] +1;
                      updateCartItems(ctItems);
                      calculateCost(cartItems);
                      addToCart(ctItems[i], i);
                    }
                    Mixpanel.track(action['cart']['plus']['title'], action['cart']['plus']['props']);
                    gtag('event', gaAction['cart']['plus']['title'], {
                      'event_category': gaAction['cart']['plus']['category'],
                    });
                  }}>  <Icon name="plus"/>
                  </IconsContainer>

                </div>
                <Link className='al-dan'
                  onClick={()=>{
                    if (info['quantity']) {
                      const ctItems = [...cartItems];
                      ctItems[i]['quantity'] = 0;
                      updateCartItems(ctItems);
                      calculateCost(cartItems);
                      addToCart(ctItems[i], i);
                    }
                    Mixpanel.track(action['cart']['remove']['title'], action['cart']['remove']['props']);
                    gtag('event', gaAction['cart']['remove']['title'], {
                      'event_category': gaAction['cart']['remove']['category'],
                    });
                  }}>Remove</Link>
              </div>
            </CartCard>
          );
        },
        )}
        <CartCard className='w-100 d-flex js-bet flx-col'>
          <BadgeHeading className='f-16'>
      Shop recommended products
          </BadgeHeading>
          <Button variant='secondary' width='auto'
            onClick={()=> {
              navigate('/orders');
              Mixpanel.track(action['cart']['keepShopping']['title'], action['cart']['keepShopping']['props']);
              gtag('event', gaAction['cart']['keepShopping']['title'], {
                'event_category': gaAction['cart']['keepShopping']['category'],
              });
            }}>
        Keep shopping
          </Button>
        </CartCard>

      </CartContainer>
    </>: <ContentContainer className='h-250 text-center'>
      <Heading3 className='f-24'>
            You have not added any items to the cart yet!
      </Heading3>
      <BadgeLabel className='default-cursor'>
            Click&nbsp;
        <span className='underline pointer' onClick={()=>{
          navigate('/orders/1');
        }}>here</span> to access your recommendations and order with us.
      </BadgeLabel>
    </ContentContainer>}
              { cartItems.length && costData['subTotal'] > 0 ?
             <CartCard className={isMobile?
             'w-100 d-flex js-bet flx-col':'w-83 d-flex js-bet flx-col flex-1'}>
               <FlexContainer justifyContent={'space-between'}
                 className='ptb-0 w-100'>
                 <CostTitle>
                  SUBTOTAL
                 </CostTitle>
                 <CostTitle>
                  $ {costData['subTotal'].toFixed(2)}
                 </CostTitle>
               </FlexContainer>
               <FlexContainer justifyContent={'space-between'}
                 className='ptb-0 w-100'>
                 <CostTitle>
                  SHIPPING
                 </CostTitle>
                 <CostTitle>
                   {/* $ {costData['shipping']} */}
                  Calculated at checkout
                 </CostTitle>
               </FlexContainer>
               <FlexContainer justifyContent={'space-between'}
                 className='ptb-0 w-100'>
                 <CostTitle>
                  Estimated TAX
                 </CostTitle>
                 <CostTitle>
                   {/* $ {costData['tax']} */}
                   Calculated at checkout
                 </CostTitle>
               </FlexContainer>
               <FlexContainer justifyContent={'space-between'}
                 className='ptb-0 w-100'>
                 <CostTitle className='bold'>
                  TOTAL
                 </CostTitle>
                 <CostTitle className='bold'>
                  $ {costData['total'].toFixed(2)}
                 </CostTitle>
               </FlexContainer>
               <Button variant={isSubmitting ? 'disabled' :'primary'}
                 onClick={submitOrder}>
                Check out
               </Button>
             </CartCard> : null}
            </ContentContainer>
          </ContentContainer>
        </DesktopWidth>
      </ScrollSection> : null}
    </MainContainer>
  );
}
