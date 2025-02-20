/* eslint-disable max-len */
import React, {useRef} from 'react';
import Button from '@app/components/button';
import Icon from '@app/components/icon';
import {Description} from '@app/components/layout-onBoarding/layout-onBoarding-components';
import apiEndpoint from '@app/core/apiend_point';
import {getLocalStorage} from '@app/core/localStorageService';
import CommonSnackbar from '@app/core/snackbar';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import {ApiResponseProps, PayloadProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import {FlexContainer, Heading3} from '@app/styles/common-styles';
import {useEffect, useState} from 'react';
import {isMobile} from 'react-device-detect';
import {useNavigate} from 'react-router-dom';
import {
  BackDrop,
  ContentContainer,
  DialogContainer,
  IconName,
  IconsContainer,
} from '../assesment-questions/assesment-questions-components';
import {BadgeHeading, BadgeLabel, BadgePill} from '../home/home-components';
import {IconCount} from '../recommendations/recommendations-components';
import {CartBrand, CartCard, CartContainer} from './orders-components';
import gtag from 'ga-gtag';

type Props = {
  TestData: any;
  onFetch: (e: any) => void;
  cartCount: any;
};
/**
 * Renders Component.
 * @param  {Props} props the api *
 * @return {Recommend} renders Component.
 */
export default function Recommended(props: Props) {
  //   const token = getLocalStorage('token') ? getLocalStorage('token') : '';
  //   const [isDataLoading, dataLoaded] = useState(true);
  const [recommendations, updateRecommendations] = useState(props['TestData']);
  const [selRow, updateSelRow] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const token = getLocalStorage('token') ? getLocalStorage('token') : '';
  const [showPopup, setShowPopup] = useState(false);
  const [msg, setMsg] = useState(false);
  const restrictUser = sessionStorage.getItem('resctrict_user_actions');
  const dialogRef = useRef(null);
  useEffect(()=>{
    const handler = (e: any) => {
      if (!dialogRef.current?.contains(e.target)) {
        setOpenDialog(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () =>{
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    if (props['TestData'] && props['TestData']['tests']) {
      const Data = [
        ...props['TestData']['tests'],
        ...props['TestData']['supplements'],
      ];
      Data.map((info, i) => {
        Data[i]['quantity'] = 0;
      });
      updateRecommendations(Data);
    } else {
      updateRecommendations([]);
    }
    Mixpanel.track(service['recommened']['title'], service['recommened']['props']);
    gtag('event', gaService['recommened']['title'], {
      'event_category': gaService['recommened']['category'],
    });
  }, []);
  const addToCart = async (info) => {
    // if (info['cartQuantity'] < 1) {
    //   return;
    // }
    const apiObject: PayloadProps = {
      payload: {
        healthPlanId: props['TestData']['healthPlanId'],
        productId: info['supplement_id'] ?
          info['supplement_id'] :
          info['test_id'],
        productType: info['supplement_id'] ? 'supplements' : 'tests',
        quantity: info['cartQuantity'],
      },
      method: 'POST',
      apiUrl: apiEndpoint.cart,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject).then((response: ApiResponseProps) => {
      if (response.status_code === 200) {
        props.onFetch('');
        setTimeout(() => {
          setShowPopup(true);
        }, 10);
        setTimeout(() => {
          setShowPopup(false);
        }, 2000);
      }
    });
  };
  return (
    <ContentContainer className={isMobile ? 'p-0' : 'p-0'}>
      <CommonSnackbar
        title="Error"
        appearance={msg ? 'error' : 'success'}
        message={msg ? 'Item Removed from Cart' : 'Item Added to Cart'}
        open={showPopup}
        close={() => setShowPopup(false)} />
      {openDialog && <BackDrop><DialogContainer ref={dialogRef}
        className={isMobile ? 'h-100 w-100' : 'ovy-scroll maxWidth-640'}>
        <div className='d-flex js-bet'>
          <IconsContainer className="d-flex" onClick={()=>{
            setOpenDialog(false);
            Mixpanel.track(action['recommened']['back']['title'], action['recommened']['back']['props']);
            gtag('event', gaAction['recommened']['back']['title'], {
              'event_category': gaAction['recommened']['back']['category'],
            });
          }}>
            <Icon name='chervonLeft'/>
          </IconsContainer>
          <IconsContainer className='d-flex gap-10 pos-rel'
            onClick={()=> {
              navigate('/cart');
              Mixpanel.track(action['recommened']['yourCart']['title'], action['recommened']['yourCart']['props']);
              gtag('event', gaAction['recommened']['yourCart']['title'], {
                'event_category': gaAction['recommened']['yourCart']['category'],
              });
            }}>
            {!isMobile ? <IconName className='f-15'>
               Your Cart</IconName> : null}
            <Icon name='cart'/>
            <IconCount className='t-r-0'>{props['cartCount']}</IconCount>
          </IconsContainer>
        </div>
        <div className='p-18'>
          <div className='d-flex js-bet mb-16'>
            <BadgeLabel className='d-flex uppercase p-0 f-15 '>
              {selRow['brand']}
            </BadgeLabel>
            <BadgeHeading className='clr-bl wei-700 f-32'>
                ${selRow['price']}
            </BadgeHeading>
          </div>
          <Heading3 className="f-24 d-flex txt-left">
            {selRow['type']}{selRow['name']}

          </Heading3>
          <div className='d-flex my-22'>
            <BadgeLabel className='p-0'>
              {selRow['brand']}
            </BadgeLabel>
            <BadgePill className="bg-E2D2C0 mlt-15 default">
              {selRow['units'] ? selRow['units'] : '0 Capsules'}
            </BadgePill>
          </div>
          <Description className="f-17 mb-32">
            {selRow['description']}
          </Description>

          {/* {selRow['price'] ? <div className='d-flex gap-15'>
            <div className='d-flex gap-8'>
              <IconsContainer
                className={restrictUser === 'false' ? 'restrict d-flex' : 'd-flex '+
                (selRow['cartQuantity'] < 2 ? 'not_allowed' : '')}
                onClick={()=>{
                  if (selRow['cartQuantity'] > 1) {
                    const selRowCpy = {...selRow};
                    selRowCpy['cartQuantity'] = selRowCpy['cartQuantity'] - 1;
                    updateSelRow(selRowCpy);
                  }
                  Mixpanel.track(action['recommened']['minus']['title'], action['recommened']['minus']['props']);
                  gtag('event', gaAction['recommened']['minus']['title'], {
                    'event_category': gaAction['recommened']['minus']['category'],
                  });
                }}
              >
                <Icon name="chervonLeft" />
              </IconsContainer>
              <IconsContainer
                className="d-flex gap-10 pos-rel"
                onClick={() => {
                  navigate('/cart');
                  Mixpanel.track(
                      action['recommened']['yourCart']['title'],
                      action['recommened']['yourCart']['props'],
                  );
                  gtag('event', gaAction['recommened']['yourCart']['title'], {
                    'event_category': gaAction['recommened']['yourCart']['category'],
                  });
                }}
              >
                {!isMobile ? (
                  <IconName className="f-15">Your Cart</IconName>
                ) : null}
                <Icon name="cart" />
                <IconCount className="t-r-0">{props['cartCount']}</IconCount>
                <BadgeHeading className='f-16 min-w-16'>
                  {selRow['cartQuantity']}</BadgeHeading>
              </IconsContainer>
              <IconsContainer className={restrictUser === 'false' ? 'restrict d-flex' : 'd-flex ' + (selRow['cartQuantity'] >
            parseInt(props['TestData']['cartProductMaxQuantity']) -1 ?
           'not_allowed' : '')}
              onClick={()=>{
                if (selRow['cartQuantity'] <
               parseInt(props['TestData']['cartProductMaxQuantity'])) {
                  const selRowCpy = {...selRow};
                  selRowCpy['cartQuantity'] = selRowCpy['cartQuantity'] + 1;
                  updateSelRow(selRowCpy);
                }
                Mixpanel.track(action['recommened']['plus']['title'], action['recommened']['plus']['props']);
                gtag('event', gaAction['recommened']['plus']['title'], {
                  'event_category': gaAction['recommened']['plus']['category'],
                });
              }}>  <Icon name="plus"/>
              </IconsContainer>
            </div>
            <div className="p-18">
              <div className="d-flex js-bet mb-16">
                <BadgeLabel className="d-flex uppercase p-0 f-15 ">
                  {selRow['brand']}
                </BadgeLabel>
                <BadgeHeading className="clr-bl wei-700 f-32">
                  ${selRow['price']}
                </BadgeHeading>
              </div>
              <Heading3 className="f-24 d-flex txt-left">
                {selRow['type']}
                {selRow['name']}
              </Heading3>
              <div className="d-flex js-bet my-22">
                <BadgeLabel className="p-0">{250}mg bottle</BadgeLabel>
                <BadgePill className="bg-E2D2C0 mlt-15">
                  {selRow['quantity'] + ' Capsules'}
                </BadgePill>
              </div>
              <Description className="f-17 mb-32">
                {selRow['description']}
              </Description>

            </div>
          </div> : null } */}
          {selRow['price'] ? (
                <div className="d-flex gap-15">
                  <div className="d-flex gap-8">
                    <IconsContainer
                      className={
                        restrictUser === 'false' ?
                          'restrict d-flex' :
                          'd-flex ' +
                            (selRow['cartQuantity'] < 1 ? 'not_allowed' : '')
                      }
                      onClick={() => {
                        if (selRow['cartQuantity'] > 0) {
                          const selRowCpy = {...selRow};
                          selRowCpy['cartQuantity'] =
                            selRowCpy['cartQuantity'] - 1;
                          updateSelRow(selRowCpy);
                        }
                        Mixpanel.track(
                            action['recommened']['minus']['title'],
                            action['recommened']['minus']['props'],
                        );
                        gtag('event', gaAction['recommened']['minus']['title'], {
                          'event_category': gaAction['recommened']['minus']['category'],
                        });
                      }}
                    >
                      <Icon name="minus" />
                    </IconsContainer>
                    <BadgeHeading className="f-16 min-w-16 text-center">
                      {selRow['cartQuantity']}
                    </BadgeHeading>
                    <IconsContainer
                      className={
                        restrictUser === 'false' ?
                          'restrict d-flex' :
                          'd-flex ' +
                            (selRow['cartQuantity'] >
                            parseInt(
                                props['TestData']['cartProductMaxQuantity'],
                            ) -
                              1 ?
                              'not_allowed' :
                              '')
                      }
                      onClick={() => {
                        if (
                          selRow['cartQuantity'] <
                          parseInt(props['TestData']['cartProductMaxQuantity'])
                        ) {
                          const selRowCpy = {...selRow};
                          selRowCpy['cartQuantity'] =
                            selRowCpy['cartQuantity'] + 1;
                          updateSelRow(selRowCpy);
                        }
                        Mixpanel.track(
                            action['recommened']['plus']['title'],
                            action['recommened']['plus']['props'],
                        );
                        gtag('event', gaAction['recommened']['plus']['title'], {
                          'event_category': gaAction['recommened']['plus']['category'],
                        });
                      }}
                    >
                      {' '}
                      <Icon name="plus" />
                    </IconsContainer>
                  </div>
                  <Button variant={restrictUser ==='false' ? 'disabled' : selRow['cartQuantity'] > 0 ?
             'primary' : 'disabled'}
                  className=''
                  width='auto' onClick={() => {
                    addToCart(selRow);
                    Mixpanel.track(action['recommened']['addToCart']['title'], action['recommened']['addToCart']['props']);
                    gtag('event', gaAction['recommened']['addToCart']['title'], {
                      'event_category': gaAction['recommened']['addToCart']['category'],
                    });
                  }}
                  >{'Add to Cart'}
                  </Button>
                </div>
              ) : null}
        </div>
      </DialogContainer>
      </BackDrop>}
      <CartContainer>
        {recommendations.length ? (
          <>
            {recommendations.map((info: any, i: number) => {
              return (
                info['recommendationsStatusInfo']['code'] !== 'ordered' && info['recommendationsStatusInfo']['code'] !== 'processing' && info['recommendationsStatusInfo']['code'] !== 'results_in' ?
                <CartCard
                  key={i}
                  className={
                    isMobile ?
                      'd-flex flex-column js-bet mheight-197 align-items-unset' :
                      'd-flex flex-column align-items-unset mheight-172'
                  }
                >
                  <div
                    className="flex-1"
                    onClick={() => {
                      updateSelRow(info);
                      setOpenDialog(true);
                    }}
                  >
                    <CartBrand className="caps">{info['brand']}</CartBrand>
                    <BadgeHeading className="sub-head mb-8">
                      {info['name']}
                    </BadgeHeading>
                    <BadgeHeading className="sub-head clr-bl wei-700">
                      ${info['price']}
                    </BadgeHeading>
                  </div>
                  <FlexContainer justifyContent={'end'} className="p-0 pt-8">
                    <div className="d-flex gap-10">
                      {info['price'] ? (
                        <div className="d-flex gap-15">
                          <div
                            className={
                              isMobile ?
                                'd-flex gap-10 d-flex justify-content-end' :
                                'd-flex gap-10'
                            }
                          >
                            <IconsContainer
                              className={
                                restrictUser === 'false' ?
                                  'restrict d-flex' :
                                  'd-flex ' +
                                    (info['cartQuantity'] < 1 ?
                                      'not_allowed' :
                                      '')
                              }
                              onClick={() => {
                                if (info['cartQuantity'] > 0) {
                                  const recommenCpy = [...recommendations];
                                  recommenCpy[i]['cartQuantity'] =
                                    recommenCpy[i]['cartQuantity'] - 1;
                                  updateRecommendations(recommenCpy);
                                  addToCart(recommenCpy[i]);
                                  setMsg(true);
                                }
                                Mixpanel.track(action['recommened']['minus']['title'], action['recommened']['minus']['props']);
                                gtag('event', gaAction['recommened']['minus']['title'], {
                                  'event_category': gaAction['recommened']['minus']['category'],
                                });
                              }}>
                              <Icon name="minus"/>
                            </IconsContainer>
                            <BadgeHeading className='f-16'>
                              {info['cartQuantity'] ? info['cartQuantity'] : 0}</BadgeHeading>
                            <IconsContainer className={restrictUser === 'false' ? 'restrict d-flex' : (info['cartQuantity'] >
                              parseInt(
                                  props['TestData']['cartProductMaxQuantity']) -1 ?
           'not_allowed' : '' + 'd-flex')}
                            onClick={()=>{
                              if (info['cartQuantity'] <
                          parseInt(
                              props['TestData']['cartProductMaxQuantity'])) {
                                const recommenCpy = [...recommendations];
                                recommenCpy[i]['cartQuantity'] =
                                recommenCpy[i]['cartQuantity'] + 1;
                                updateRecommendations(recommenCpy);
                                addToCart(recommenCpy[i]);
                                setMsg(false);
                              }
                              Mixpanel.track(action['recommened']['plus']['title'], action['recommened']['plus']['props']);
                              gtag('event', gaAction['recommened']['plus']['title'], {
                                'event_category': gaAction['recommened']['plus']['category'],
                              });
                            }}>  <Icon name="plus"/>
                            </IconsContainer>

                          </div>
                          {/* <IconsContainer className={info['cartQuantity'] < 1?
                            'not_allowed' : ''} onClick={()=>addToCart(info)}>
                        <Icon name='cartPlus'/>
                      </IconsContainer> */}
                          {/* <Button variant={info['cartQuantity'] > 0 ?
                       'primary' : 'disabled'}
                      width='auto' onClick={()=>addToCart(info)}
                      >{'Add to Cart'}</Button> */}
                        </div>
                      ) : null}
                    </div>
                  </FlexContainer>
                </CartCard> : null
              );
            })}
          </>
        ) : (
          <ContentContainer className="h-250 text-center">
            <Heading3 className="f-24">
              You don’t have any recommended products just yet!
            </Heading3>
            <BadgeLabel>
              Stay tuned, your recommendations will be added soon.
            </BadgeLabel>
          </ContentContainer>
        )}
      </CartContainer>
    </ContentContainer>
  );
}
