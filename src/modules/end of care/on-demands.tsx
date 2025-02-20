/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import {isMobile} from 'react-device-detect';
import {

  ButtonDiv,
  ExtendContainer, ExtendTitle, MembershipContainer, MembershipDiv, MembershipLabel, MembershipPara, Plan, PlanPointsDiv, Points, PointSpan, SpanPoint, SubPointsDiv, SubPointsLabel, SubPointsPara, Title,

} from './designs-comonents';
import {createSearchParams, useLocation, useNavigate} from 'react-router-dom';
import {Ondemand} from '@app/core/apiend_point';
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
import Icon from '@app/components/icon/icon';
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

 * @return {MemberOptions} renders Component.
 */
export default function MemberOptions(prop: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [planDes, setPlanDes] = useState([]);
  const [coachData, setCoachData] = useState({});
  const [show, setShow] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedData, updateSelectedData] = useState(prop.plansData[0]);
  const [selectedID, setSelectedID] = useState(prop.plansData[0]?.['_id']);

  useEffect(()=>{
    setCoachData(location?.state?.coachData);
    if (prop.plansData && prop.plansData.length) {
      setPlanDes(prop.plansData);
    } else {
      setPlanDes([]);
    }
    Mixpanel.track(service['extendPlan']['title'], service['extendPlan']['props']);
    gtag('event', gaService['extendPlan']['title'], {
      'event-category': gaService['extendPlan']['category'],
    });
  }, []);

  const selectPlan = (id) => {
    const singlePlan = planDes.filter((item)=> {
      return item['_id'] === id;
    });
    updateSelectedData(singlePlan[0]);
    setSelectedID(singlePlan[0]?.['_id']);
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
            <div className="pos-rel bg-white p-0 shadow pb-15">
              <IconsContainer className="bg-after" onClick={() => navigate('/')}>
                <ImageWrapper>
                  <img src={isMobile ? homeImg : homeImg2} alt="User" />
                </ImageWrapper>
              </IconsContainer>
              <ExtendContainer>
                <Title>{Ondemand['heading']} </Title>
                <ExtendTitle className='pb-30'>{Ondemand['subheading']}&nbsp;
                  <strong>{coachData?.['name']}</strong>&nbsp;
                  {Ondemand['subheading2']}</ExtendTitle>
                {planDes.map((item, index) => {
                  return (
                    <>
                      <MembershipContainer key={index}
                        className={`mb-1 + ${item['_id'] === selectedID ? 'active' : ''}`}
                        onClick={()=>{
                          selectPlan(item['_id']);
                        }}>

                        <MembershipDiv>
                          <MembershipLabel className='d-flex'>
                        Purchase&nbsp;{item?.['plan_type']} &nbsp;
                            <span className='pointer' onClick={()=>{
                              setShow(!show);
                              Mixpanel.track(action['extendPlan']['infoIcon']['title'], action['extendPlan']['infoIcon']['props']);
                              gtag('event', gaAction['extendPlan']['infoIcon']['title'], {
                                'event-category': gaAction['extendPlan']['infoIcon']['category'],
                              });
                            }}><Icon name="info" /></span>
                          </MembershipLabel>
                          <MembershipPara>
                            ${item?.['plan_price']}/{item?.['duration_type'].toLowerCase()}, billed one-time
                          </MembershipPara>
                          {(show && item['_id'] === selectedID) && <>
                            <MembershipLabel className='f-14'>{Ondemand['question']}</MembershipLabel>
                            <MembershipPara className='f-11'>{Ondemand['answer']}</MembershipPara>
                          </>}
                        </MembershipDiv>
                      </MembershipContainer>
                    </>
                  );
                })}
                <Plan >
                  {selectedData?.['plan_description']?.['subject'].map((item:any, key: any)=>{
                    return (
                    selectedData['plan_description']['options'] ?
                    (
                      <>
                        <PlanPointsDiv key={key} >
                          <PointSpan>
                            <IconsContainer >
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.0001 0C4.48608 0 8.39233e-05 4.486 8.39233e-05 10C8.39233e-05 15.514 4.48608 20 10.0001 20C15.5141 20 20.0001 15.514 20.0001 10C20.0001 4.486 15.5141 0 10.0001 0ZM8.00108 14.413L4.28808 10.708L5.70008 9.292L7.99908 11.587L13.2931 6.293L14.7071 7.707L8.00108 14.413Z"
                                  fill={'#72c4aa'}/>

                              </svg>
                            </IconsContainer>
                          </PointSpan>
                          <Points>
                            {item.split('.')[0]}.
                            <SpanPoint onClick={()=>{
                              setShowOptions(!showOptions);
                              Mixpanel.track(action['extendPlan']['viewOptions']['title'], action['extendPlan']['viewOptions']['props']);
                              gtag('event', gaAction['extendPlan']['viewOptions']['title'], {
                                'event-category': gaAction['extendPlan']['viewOptions']['category'],
                              });
                            }}>{item.split('.')[1] !== undefined && item.split('.')[1]}</SpanPoint>
                          </Points>
                        </PlanPointsDiv>
                        {key === 0 && showOptions && <SubPointsDiv>
                          <SubPointsLabel>{selectedData['plan_description']['options']['heading'].charAt(0).toUpperCase() + selectedData['plan_description']['options']['heading'].slice(1)}</SubPointsLabel>
                          {selectedData['plan_description']['options']?.['options'].map((item, index) => {
                            return <SubPointsPara key={index}>{item}</SubPointsPara>;
                          })}
                        </SubPointsDiv>}
                      </>) : (
                        <PlanPointsDiv key={key} >
                          <PointSpan>
                            <IconsContainer >
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.0001 0C4.48608 0 8.39233e-05 4.486 8.39233e-05 10C8.39233e-05 15.514 4.48608 20 10.0001 20C15.5141 20 20.0001 15.514 20.0001 10C20.0001 4.486 15.5141 0 10.0001 0ZM8.00108 14.413L4.28808 10.708L5.70008 9.292L7.99908 11.587L13.2931 6.293L14.7071 7.707L8.00108 14.413Z"
                                  fill={'#72c4aa'}/>

                              </svg>
                            </IconsContainer>
                          </PointSpan>
                          <Points>
                            {item.split('.')[0]}.
                            <SpanPoint onClick={()=>{
                              setShowOptions(!showOptions);
                              Mixpanel.track(action['extendPlan']['viewOptions']['title'], action['extendPlan']['viewOptions']['props']);
                              gtag('event', gaAction['extendPlan']['viewOptions']['title'], {
                                'event-category': gaAction['extendPlan']['viewOptions']['category'],
                              });
                            }}>{item.split('.')[1] !== undefined && item.split('.')[1]}.</SpanPoint>
                          </Points>
                        </PlanPointsDiv>
                      )
                    );
                  })}

                </Plan>
              </ExtendContainer>
              {isMobile? null:<ButtonDiv className={`${isMobile? 'p-0  w-100 align-items-center gap-24  ':' gap-80 d-flex justify-content-center'} `} >


                <Button variant={'primary'} className='w-40  ' width='55%'
                  onClick={()=>{
                    navigate({
                      pathname: '/order-payment',
                      search:
                        // eslint-disable-next-line max-len
                        `?${createSearchParams({planType: 'extend',
                          paymentFee: selectedData?.['plan_price'],
                          addPay: 'true',
                          id: selectedData['_id']})}`,
                    }, {
                      state: {
                        data: selectedData,
                      },
                    });
                    Mixpanel.track(action['extendPlan']['continue']['title'], action['extendPlan']['continue']['props']);
                    gtag('event', gaAction['extendPlan']['continue']['title'], {
                      'event-category': gaAction['extendPlan']['continue']['category'],
                    });
                  }} >
                  {Ondemand['buttontext']}
                </Button>
              </ButtonDiv> }
            </div>

          </ContentContainer>
        </DesktopWidth>
      </ScrollSection>
      {isMobile? <DesktopWidth className='w-100 fixed-footer h-64 br-tp'>
        <FooterButtons bgColor='#fff' >
          <Button variant={'primary'} className='w-40'
            onClick={()=>{
              navigate({
                pathname: '/order-payment',
                search:
                      // eslint-disable-next-line max-len
                      `?${createSearchParams({planType: 'extend',
                        paymentFee: selectedData?.['plan_price'],
                        addPay: 'true',
                        id: selectedData['_id']})}`,
              }, {
                state: {
                  data: selectedData,
                },
              });
              Mixpanel.track(action['extendPlan']['continue']['title'], action['extendPlan']['continue']['props']);
              gtag('event', gaAction['extendPlan']['continue']['title'], {
                'event-category': gaAction['extendPlan']['continue']['category'],
              });
            }} >
            {Ondemand['buttontext']}
          </Button>
        </FooterButtons>
      </DesktopWidth>:null}
    </>
  );
}
