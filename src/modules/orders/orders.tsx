/* eslint-disable max-len */
import Header from '@app/components/header';
import Icon from '@app/components/icon';
import {MainContainer, DesktopWidth, FlexContainer, Heading}
  from '@app/styles/common-styles';
import React, {useEffect, useState} from 'react';
import {isMobile} from 'react-device-detect';
import {useLocation, useNavigate} from 'react-router-dom';
import {ContentContainer, IconName, IconsContainer}
  from '../assesment-questions/assesment-questions-components';
import {ScrollSection}
  from '../boarding-screens/component/boarding-screen-components';
import Tabs from '@app/components/tabs';
import {OrderLabels} from '@app/core/labels-messages';
import Recommended from './recommened';
import Yourorders from './your-orders';
import apiEndpoint from '@app/core/apiend_point';
import {PayloadProps, ApiResponseProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import {getLocalStorage} from '@app/core/localStorageService';
import {dateFormats} from '@app/utils/dateformat';
import Spinner from '@app/components/icon/icons/loader';
import {IconCount} from '../recommendations/recommendations-components';
import BotoomHeader from '@app/components/footer-menu';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';

/**
 * Renders Component.
 * @return {Orders} renders Component.
 */
export default function Orders() {
  const navigate = useNavigate();
  const [selectedTab, setTab] = useState( OrderLabels[0]);
  const token = getLocalStorage('token') ? getLocalStorage('token') : '';
  const [recommendations, updateRecommendations] = useState([]);
  // const [cartItems, updateCartItems] = useState([]);
  const [loader, setLoader] = useState(true);
  const [healthPlanId, updateHealthId] = useState('');
  const [cartCount, updateCartCount] = useState(0);
  const [orderItems, updateOrderItems] = useState([]);
  // const {tab}: any = useParams();
  const location = useLocation();

  //   const [isDataLoading, dataLoaded] = useState(true);

  useEffect(()=>{
    setLoader(true);
    if (location.state?.data==='Your orders') {
      setTab(OrderLabels[1]);
    }
    // setTab(tab ? OrderLabels[tab] : OrderLabels[0] );
    // getOrders();
    getRecods(new Date());
    Mixpanel.track(service['orders']['title'], service['orders']['props']);
    gtag('event', gaService['orders']['title'], {
      'event_category': gaService['orders']['category'],
    });
  }, []);
  /**
   * @param {string} tab label value
    *On Tab Change.
   *  */
  function onSelectedTabClick(tab:string) {
    setLoader(true);
    setTab(tab);
    setLoader(false);
    Mixpanel.track(`${action['Orders']['order']['title']} ${tab} ${action['Orders']['click']['title']}`, action['Orders']['order']['props']);
    gtag('event', `${gaAction['Orders']['order']['title']} ${tab} ${gaAction['Orders']['click']['title']}`, {
      'event_category': gaAction['Orders']['order']['category'],
    });
  }

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
          if (response.status_code === 200) {
            // updateCartItems(response.data.cart);
            updateCartCount(response.data.count);
            setLoader(false);
          }
        });
  };
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
            updateOrderItems(response.data.orders);
            // updateCartCount(response.data.count);
            setLoader(false);
          }
        });
  };
  const getRecods =async (date)=>{
    const convrtDate = dateFormats(date, 'YYYY-MM-DD');
    const filter= `?planDate=${convrtDate}`;
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.myTests+filter,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            getOrders();
            getCartItems(response.data.healthPlanId);
            updateHealthId(response.data.healthPlanId);
            updateRecommendations(response.data);
            // updateLoader(false);
          } else {
            updateRecommendations([]);
            setLoader(false);
          }
        });
  };
  return (
    <MainContainer bgColor={'#FFFFFF'}>
      {!isMobile? <Header hideBackArrow={false} className='txt-left'
        desktopMenu={isMobile ? false : true}/>: null }
      <ScrollSection id="scrollable-div" className={isMobile?
        'w-100 flex-1 mb-64': 'w-100 flex-1'}>
        <DesktopWidth className='w-1150 ptb-0'>
          <ContentContainer className={isMobile ?'' :
           'br-bg-s my-10  ptl-30-100'}>
            <>
              <FlexContainer
                className={isMobile ? 'p-0 mb-20' : 'p-0'}
                justifyContent={'space-between'} >
                <IconsContainer className='d-flex gap-15' onClick={()=>{
                  navigate('/home');
                  Mixpanel.track(action['Orders']['back']['title'], action['Orders']['back']['props']);
                  gtag('event', gaAction['Orders']['back']['title'], {
                    'event_category': gaAction['Orders']['back']['category'],
                  });
                }}>
                  <Icon name={'chervonLeft'} />
                  <div className='nav-name d-flex'>Back to home</div>
                </IconsContainer>
              </FlexContainer>
              <FlexContainer
                justifyContent={'space-between'}
                className={isMobile? 'p-0 mb-32' : 'mt-40 p-10 px-0'} >
                <Heading className='f-24 m-0'>
                    Orders
                </Heading>
                <IconsContainer className='d-flex gap-10 pos-rel'
                  onClick={()=> {
                    navigate('/cart');
                    Mixpanel.track(action['Orders']['yourCart']['title'], action['Orders']['yourCart']['props']);
                    gtag('event', gaAction['Orders']['yourCart']['title'], {
                      'event_category': gaAction['Orders']['yourCart']['category'],
                    });
                  }}>
                  {!isMobile ? <IconName className='f-17'>
                     Your Cart</IconName> : null}
                  <Icon name='cart'/>
                  {cartCount > 0 ?<IconCount className='t-r-0'>{cartCount}
                  </IconCount> : null}
                </IconsContainer>
              </FlexContainer>
            </>
            <Tabs
              type='secondary'
              labels={OrderLabels}
              onClick={onSelectedTabClick}
              selectedLabel={selectedTab}
            />
            {!loader ?<> {selectedTab === OrderLabels[0] ?
            <Recommended TestData={recommendations} cartCount={cartCount}
              onFetch={()=>getCartItems(healthPlanId)}/> :
             <Yourorders Data={orderItems}/> }
            </> :
            <ContentContainer className='h-250 pos-rel'>
              <Spinner size='3px'/>
            </ContentContainer> }
          </ContentContainer>
        </DesktopWidth>
      </ScrollSection>
      {isMobile ? <BotoomHeader/> : null}
    </MainContainer> );
}
