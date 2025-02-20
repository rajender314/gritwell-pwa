/* eslint-disable max-len */
import React from 'react';
import mdImg from '@app/assets/images/visa.png';
import Header from '@app/components/header';
import Icon from '@app/components/icon';
import Spinner from '@app/components/icon/icons/loader';
import apiEndpoint from '@app/core/apiend_point';
import {getLocalStorage} from '@app/core/localStorageService';
import CommonSnackbar from '@app/core/snackbar';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import {ApiResponseProps, PayloadProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import {whiteColor} from '@app/styles';
import {
  DesktopWidth,
  Heading3,
  Loader,
  MainContainer,
} from '@app/styles/common-styles';
import {dateFormats} from '@app/utils/dateformat';
import {useEffect, useState} from 'react';
import {isMobile} from 'react-device-detect';
import gtag from 'ga-gtag';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {
  CardDetails,
  CardDetailsSec,
} from '../add-payment/add-payment-components';
import {
  BodyText2,
  ContentContainer,
  IconsContainer,
  ImageWrapper,
} from '../assesment-questions/assesment-questions-components';
import {ScrollSection} from '../boarding-screens/component/boarding-screen-components';
import {BadgePill} from '../home/home-components';
import {Item, MenuHeader} from './profile-components';
import moment from 'moment';

/**
 * Renders Component.
 * @return {BillingHistory} renders Component.
 */
export default function BillingHistory() {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const {} = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = getLocalStorage('token') ? getLocalStorage('token') : '';
  const [infoMsg, setInfoMsg] = useState<string>('');
  const [showSectionMsg, setShowSectionMsg] = useState(false);
  const [apperance, setApperance] = useState('success');
  const [billingList, setBillingList] = useState([]);
  const [downloadLink, updateDownlaodLink] = useState('');
  const [loader, setLoader] = useState(true);
  const [billingHistory, setBillingHistory] = useState({});
  const [tab, setTab] = useState('Subscription');
  useEffect(() => {
    setLoader(true);
    setTimeout(()=>{
      getBillingHistory();
    }, 2000);
    Mixpanel.track(
        service['billingHistory']['title'],
        service['billingHistory']['props'],
    );
    gtag('event', gaService['billingHistory']['title'], {
      'event_category': gaService['billingHistory']['category'],
    });
  }, []);

  /**
   * get Boarding JSON from the API.
   *  */
  function getBillingHistory() {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.billingHistory,
      headers: {Authorization: token},
    };
    triggerApi(apiObject).then((res: ApiResponseProps) => {
      setIsSubmitting(false);
      if (res.status_code == 200) {
        setBillingList(res.data.result);
        setBillingHistory(
            {
              Subscription: res.data.subscriptionPayments,
              order: res.data.ordersPayments,
            },
        );
        setLoader(false);
        // setApperance('success');
        // setInfoMsg(res.message);
        // setShowSectionMsg(true);
        // setIsSubmitting(false);
      } else {
        setApperance('error');
        setInfoMsg(res.message);
        setShowSectionMsg(true);
        setIsSubmitting(false);
        setLoader(false);
      }
    });
    const apiObject2: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.downloadHistory,
      headers: {Authorization: token},
    };
    triggerApi(apiObject2).then((res: ApiResponseProps) => {
      if (res.status_code == 200) {
        updateDownlaodLink(res.data);
      } else {
      }
    });
  }

  return (
    <>
      <CommonSnackbar
        title="Error"
        appearance={apperance}
        message={infoMsg}
        open={showSectionMsg}
        close={() => setShowSectionMsg(false)}
      />
      {loader ? (
        <Loader>
          <Spinner size="6px" />
        </Loader>
      ) : null}
      <MainContainer bgColor={whiteColor}>
        {!isMobile ? (
          <Header
            hideBackArrow={false}
            className="txt-left bg-white"
            desktopMenu={isMobile ? false : true}
          />
        ) : null}
        <ScrollSection
          id="scrollable-div"
          className={isMobile ? 'h-150 w-100' : 'h-150 flex-1'}
        >
          <DesktopWidth>
            <ContentContainer className={isMobile ? '' : 'br-bg  mt-40'}>
              <div className={isMobile ? ' pb-0 ' : ''}>
                <IconsContainer
                  onClick={() => {
                    navigate('/profile-menu');
                  }}
                >
                  <Icon name={'chervonLeft'} />
                </IconsContainer>
              </div>
              <ContentContainer className={isMobile ? 'px-0  pt-30' : 'pb-24'}>
                <MenuHeader className="flx-center">
                  <Item> Billing History</Item>
                  {billingList.length ? (
                    <Item
                      className="link"
                      onClick={() => {
                        window.open(downloadLink);
                        Mixpanel.track(
                            action['billingHistory']['download']['title'],
                            action['billingHistory']['download']['props'],
                        );
                        gtag('event', gaAction['billingHistory']['download']['title'], {
                          'event_category': gaAction['billingHistory']['download']['category'],
                        });
                      }}
                    >
                      Download pdf
                    </Item>
                  ) : null}
                </MenuHeader>
                <div
                  className={isMobile ? 'd-flex mt-20 js-bet' : 'd-flex mt-20'}
                >
                  <BadgePill
                    className={tab === 'Subscription' ? 'active-clr pw-35' : 'disabled pw-35'}
                    onClick={() => {
                      setTab('Subscription');
                      Mixpanel.track(
                          action['billingHistory']['subscription']['title'],
                          action['billingHistory']['subscription']['props'],
                      );
                      gtag('event', gaAction['billingHistory']['subscription']['title'], {
                        'event_category': gaAction['billingHistory']['subscription']['category'],
                      });
                    }}
                  >
                    Subscription
                  </BadgePill>
                  <BadgePill
                    className={tab === 'order' ? 'active-clr pw-35 mlt-15' : 'disabled pw-35 mlt-15'}
                    onClick={() => {
                      setTab('order');
                      Mixpanel.track(
                          action['billingHistory']['order']['title'],
                          action['billingHistory']['order']['props'],
                      );
                      gtag('event', gaAction['billingHistory']['order']['title'], {
                        'event_category': gaAction['billingHistory']['order']['category'],
                      });
                    }}
                  >
                    Orders
                  </BadgePill>
                </div>
              </ContentContainer>
              {billingList.length ? (
                <ContentContainer className="p-0">
                  <CardDetailsSec>
                    <Heading3 className="head-bill">{moment().year()}</Heading3>
                    {billingHistory[tab].map((info: any, i: number) => {
                      return (
                        info['payment_status'] !== 'fail' ?
                        <CardDetails
                          key={i}
                          className={`${info['payment_status'] === 'processing' ? 'br-yellow' : 'br-1'} flx-start p-22`}
                          onClick={() =>
                            navigate('/billing-invoice/' + info['_id'])
                          }
                        >
                          <div className="d-flex-str gap-15   ">
                            <IconsContainer>
                              <ImageWrapper>
                                <img src={mdImg} alt="User" />
                              </ImageWrapper>
                            </IconsContainer>
                            <div className={`${isMobile ? 'w-140' : ''} ml-10 mt-0`}>
                              <BodyText2 className="m-0 p-0 rg-font mb-10">
                                {info['transaction_type']}
                              </BodyText2>
                              <BodyText2 className="m-0 p-0 clr-black">
                                {dateFormats(
                                    info['created_date'],
                                    'D MMMM YYYY',
                                )}
                              </BodyText2>
                            </div>
                          </div>
                          <div className={`${isMobile ? 'w-max' : ''} ml-0 mt-0 mrt-12`}>
                            <BodyText2 className={`${info['payment_status'] === 'processing' ? 'p-0' : ''} mt-0 lh-27`}>
                                $ {info['amount'].toFixed(2)}
                            </BodyText2>
                            {info['payment_status'] === 'processing' && <BodyText2 className={`f-12 process p-0 pt-4 m-0 left-0`}>
                              Processing
                            </BodyText2>}
                          </div>
                          {/* <BadgePill>
                    default
                      </BadgePill> */}
                        </CardDetails> :
                        <CardDetails
                          key={i}
                          className="flx-start p-22 br-red-1 pointer"
                          onClick={() =>
                            // navigate('/billing-invoice/' + info['_id'])
                            navigate(`/order-payment?addPay=true&id=${info['_id']}&retryPayment=true`, {
                              state: {
                                cardData: info,
                              },
                            })
                          }
                        >
                          <div className="d-flex-str gap-15   ">
                            <IconsContainer>
                              <ImageWrapper>
                                <img src={mdImg} alt="User" />
                              </ImageWrapper>
                            </IconsContainer>
                            <div className="ml-10 mt-0">
                              <BodyText2 className="m-0 p-0 rg-font mb-10">
                                {info['transaction_type']}
                              </BodyText2>
                              <BodyText2 className="m-0 p-0 clr-black">
                                {dateFormats(
                                    info['created_date'],
                                    'D MMMM YYYY',
                                )}
                              </BodyText2>
                            </div>
                          </div>
                          <div className='d-flex'>
                            <div className={`${isMobile ? 'w-max' : ''} ml-0 mt-0 mrt-12`}>
                              <BodyText2 className="mt-0 p-0 lh-27">
                                $ {info['amount'].toFixed(2)}
                              </BodyText2>
                              <BodyText2 className={`f-12 error p-0 m-0 left-0 pt-4`}>
                                Retry payment
                              </BodyText2>
                            </div>
                            <IconsContainer>
                              <Icon name='ChevronRightCircledRed' />
                            </IconsContainer>
                          </div>
                        </CardDetails>
                      );
                    })}
                  </CardDetailsSec>
                </ContentContainer>
              ) : (
                <ContentContainer className="h-250">
                  Billing History not found.
                </ContentContainer>
              )}
            </ContentContainer>
          </DesktopWidth>
        </ScrollSection>
      </MainContainer>
    </>
  );
}
