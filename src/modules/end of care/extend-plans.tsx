/* eslint-disable max-len */
import {useEffect, useState} from 'react';
import React from 'react';
import {isMobile} from 'react-device-detect';
import {
  ButtonDiv,
  Card, CardDiv, CardHead, CardHeadDiv, CardLabel, CardPara, ExtendContainer, ExtendTitle, Title,

} from './designs-comonents';
import {createSearchParams, useNavigate} from 'react-router-dom';
import Button from '@app/components/button';
import {
  IconsContainer,
  ImageWrapper,
} from '../assesment-questions/assesment-questions-components';
import {DesktopWidth} from '@app/styles/common-styles';
import {FooterButtons, ScrollSection} from '../boarding-screens/component/boarding-screen-components';
import {ContentContainer} from '../assesment-questions/assesment-questions-components';
import homeImg2 from '@app/assets/images/homescreen3-des.png';
import homeImg from '@app/assets/images/homescreen3.png';
import {Extendplans} from '@app/core/apiend_point';
import {Mixpanel} from '@app/App';
import gtag from 'ga-gtag';
import {action, service} from '@app/mixpanel/Service';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';

type Props = {
  plansData:any;
}
/**
 * Renders Component.
 *  @param  {Props} prop the api
 * @return {Extend} renders Component.
 */
export default function Extend(prop :Props) {
  const [id, setId] = useState();
  const [extendPlanData, setExtendPlanData] = useState<any>();
  const [extendPlans, setExtendPlans] = useState(prop['plansData']);
  const navigate = useNavigate();

  useEffect(()=>{
    setExtendPlans(prop['plansData']);
    Mixpanel.track(service['planTopUp']['title'], service['planTopUp']['props']);
    gtag('event', gaService['planTopUp']['title'], {
      'event-category': gaService['planTopUp']['category'],
    });
  }, []);

  /**
   * @param {any} id
   */
  function handlePackage(id:any) {
    const singleData = extendPlans.filter((item)=> item._id === id);
    setExtendPlanData(singleData);
    setId(singleData[0]._id);
    Mixpanel.track(`${singleData[0]['plan_type']} ${action['planTopUp']['select']['title']}`, action['planTopUp']['select']['props']);
    gtag('event', `${singleData[0]['plan_type']} ${gaAction['planTopUp']['select']['title']}`, {
      'event-category': gaAction['planTopUp']['select']['category'],
    });
  };

  return (
    <>
      <ScrollSection
        id="scrollable-div"
        className={
            isMobile ? 'flex-1 flex-unset mb-64 pb-30' : 'flex-1 flex-unset '
        }
      >
        <DesktopWidth >
          <ContentContainer
            bgColor={'transparent'}
            className={isMobile ? 'p-0 d-flex js-cen' : 'py-0 d-flex js-cen'}
          >
            <div className="pos-rel bg-white pr-0 shadow pb-15">
              <IconsContainer
                className="bg-after" onClick={() => navigate('/')}>
                <ImageWrapper>
                  <img src={isMobile ? homeImg : homeImg2} alt="User" />
                </ImageWrapper>
              </IconsContainer>

              <ExtendContainer>
                <Title>{Extendplans['heading']} </Title>
                <ExtendTitle>{Extendplans['subheading']}
                </ExtendTitle>
              </ExtendContainer>
              <CardDiv className="card-div">
                {extendPlans.map((item:any, key: any)=>{
                  return <Card key={key}
                    className={id === item._id ? 'active ' : ''}
                    onClick={() => handlePackage(item._id)}
                  >
                    {item['no_of_appointments'] === 4 && <CardHeadDiv>
                      <CardHead>Most Popular</CardHead>
                    </CardHeadDiv>}
                    <CardLabel className='tr-10'>{item['plan_type']}</CardLabel>
                    <CardPara>{item['currency_type']}
                      {item['plan_price']} ({item['currency_type']}
                      {item['plan_price']/ item['no_of_appointments']}/Appointment) valid with active membership</CardPara>
                  </Card>;
                }) }
              </CardDiv>
              {isMobile? null:<ButtonDiv
                className={`${isMobile?
                 'p-0  w-100 align-items-center gap-24  ':' gap-80'} `} >

                <Button variant={'secondary'} className={isMobile ? 'w-40 flex-1' : 'w-40 flex-1 br-12'}
                  onClick={()=>{
                    navigate(-1);
                    Mixpanel.track(action['planTopUp']['buyLater']['title'], action['planTopUp']['buyLater']['props']);
                    gtag('event', gaAction['planTopUp']['buyLater']['title'], {
                      'event-category': gaAction['planTopUp']['buyLater']['category'],
                    });
                  }}>
                  {Extendplans['buttontext1']}
                </Button>
                <Button variant={'primary'} className={isMobile ? 'w-40 flex-1' : 'w-40 flex-1 col br-12'}
                  onClick={()=>{
                    navigate({
                      pathname: '/order-payment',
                      search:
                        `?${createSearchParams({packageAppointment: extendPlanData[0]?.['no_of_appointments'],
                          paymentFee: extendPlanData[0]?.['plan_price'],
                          addPay: 'true',
                          id: extendPlanData[0]['_id']})}`,
                    }, {
                      state: {
                        // planData: extendPlanData?.length ? extendPlanData[0] : {},
                        data: extendPlanData.length ? extendPlanData[0] : {},
                      },
                    });
                    Mixpanel.track(action['planTopUp']['continue']['title'], action['planTopUp']['continue']['props']);
                    gtag('event', gaAction['planTopUp']['continue']['title'], {
                      'event-category': gaAction['planTopUp']['continue']['category'],
                    });
                  }} >
                  {Extendplans['buttontext']}
                </Button>
              </ButtonDiv> }
            </div>
          </ContentContainer>
        </DesktopWidth>
      </ScrollSection>

      {isMobile? <DesktopWidth className='w-100 fixed-footer h-64 br-tp'>
        <FooterButtons >
          <ButtonDiv className={`${isMobile?
                 'p-0  w-100 align-items-center gap-24  ':'w-100 gap-80'} `} >
            <Button variant={'secondary'} className='w-40  flex-1'
              onClick={()=>{
                navigate(-1);
                Mixpanel.track(action['planTopUp']['buyLater']['title'], action['planTopUp']['buyLater']['props']);
                gtag('event', gaAction['planTopUp']['buyLater']['title'], {
                  'event-category': gaAction['planTopUp']['buyLater']['category'],
                });
              }}>
              {Extendplans['buttontext1']}
            </Button>
            <Button variant={'primary'} className={isMobile ? 'w-40 flex-1' : 'w-40 flex-1 col'}
              onClick={()=>{
                navigate({
                  pathname: '/order-payment',
                  search:
                    `?${createSearchParams({packageAppointment: extendPlanData[0]?.['no_of_appointments'],
                      paymentFee: extendPlanData[0]?.['plan_price'],
                      addPay: 'true',
                      id: extendPlanData[0]['_id']})}`,
                }, {
                  state: {
                    // planData: extendPlanData?.length ? extendPlanData[0] : {},
                    data: extendPlanData.length ? extendPlanData[0] : {},
                  },
                });
                Mixpanel.track(action['planTopUp']['continue']['title'], action['planTopUp']['continue']['props']);
                gtag('event', gaAction['planTopUp']['continue']['title'], {
                  'event-category': gaAction['planTopUp']['continue']['category'],
                });
              }} >
              {Extendplans['buttontext']}
            </Button>
          </ButtonDiv>
        </FooterButtons>
      </DesktopWidth>:null}
    </>
  );
}
