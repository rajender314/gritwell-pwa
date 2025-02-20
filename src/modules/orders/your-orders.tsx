/* eslint-disable max-len */
import apiEndpoint from '@app/core/apiend_point';
import {getLocalStorage} from '@app/core/localStorageService';
import {PayloadProps, ApiResponseProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import {Heading3} from '@app/styles/common-styles';
import React, {useEffect, useState} from 'react';
import {isMobile} from 'react-device-detect';
import {createSearchParams, useNavigate} from 'react-router-dom';
import {ContentContainer}
  from '../assesment-questions/assesment-questions-components';
import {BadgeHeading, BadgeLabel} from '../home/home-components';
import {CartBrand, CartCard, CartPill} from './orders-components';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';
type Props = {
    Data :any;
}
/**
 * Renders Component.
 * @param  {Props} props the api *
 * @return {YourOrders} renders Component.
 */
export default function Yourorders(props : Props) {
  const [cartItems, updateCartItems] = useState(props['Data']);
  const [loader, setLoader] = useState(true);
  const token = getLocalStorage('token') ? getLocalStorage('token') : '';
  const navigate = useNavigate();
  useEffect(()=>{
    getOrders();
    Mixpanel.track(service['yourOrders']['title'], service['yourOrders']['props']);
    gtag('event', gaService['yourOrders']['title'], {
      'event_category': gaService['yourOrders']['category'],
    });
  }, []);
  const getOrders =async ()=>{
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.order,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            updateCartItems(response.data['orders']);
            // updateCartCount(response.data.count);
            setLoader(false);
          }
        });
  };
  const navigateUser=(info)=>{
    if (!info['shipping_address_id']) {
      navigate('/address/'+info._id+ '/'+
      info.total_amount);
    } else if (!info['payment_transaction_id']) {
      navigate({
        pathname: '/order-payment',
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
      {!loader ?<ContentContainer className={isMobile ?
       'p-0 flex-column d-flex gap-15' :
       'p-0 flex-column d-flex gap-15'}>
        {
       cartItems.length ? <>
         {cartItems.map((info, i)=>{
           return (
             <CartCard bgColor={info['order_status_data']['back_ground_color']}
               className={isMobile ?
              'w-100 d-flex js-bet' : 'w-100 d-flex js-bet'}
               key={i}
               onClick={() =>{
                 navigateUser(info);
                 Mixpanel.track(action['yourOrders']['order']['title'], action['yourOrders']['order']['props']);
                 gtag('event', gaAction['yourOrders']['order']['title'], {
                   'event_category': gaAction['yourOrders']['order']['category'],
                 });
               }}>
               <div>
                 <CartBrand>
                Order #{info['order_id']}
                 </CartBrand>
                 <BadgeHeading className='f-18 f-400'
                 >
                   {info['order_status_data']['name']}
                 </BadgeHeading>
               </div>
               <CartPill >
                 {info['order_products_data'].length}
                 {info['order_products_data'].length > 1 ?
                  ' Items' : ' Item'}
               </CartPill>
             </CartCard>
           );
         },
         )}
       </>: <ContentContainer className='h-250 text-center'>
         <Heading3 className='f-24'>
         You haven’t ordered any products
         </Heading3>
         <BadgeLabel>
         Once you place an order, your orders will appear here so you can easily get back to them!
         </BadgeLabel>
       </ContentContainer>}
      </ContentContainer> : null}
    </>
  );
}
