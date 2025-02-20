/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
import homeImg2 from '@app/assets/images/homescreen3-des.png';
import homeImg from '@app/assets/images/homescreen3.png';
import Button from '@app/components/button';
import Header from '@app/components/header';
import Icon from '@app/components/icon';
import Spinner from '@app/components/icon/icons/loader';
import {Description} from '@app/components/layout-onBoarding/layout-onBoarding-components';
import apiEndpoint, {PlansPage} from '@app/core/apiend_point';
import {getFAQs, setLocalStorage} from '@app/core/localStorageService';
import {
  BodyText2,
  ContentContainer,
  IconsContainer,
  ImageWrapper,
  Pills,
  PillsContainer,
  PlanDiv,
} from '@app/modules/assesment-questions/assesment-questions-components';
import {
  FooterButtons,
  ScrollSection,
} from '@app/modules/boarding-screens/component/boarding-screen-components';
import FAQ from '@app/modules/faq/FAQ';
import {FaqLabel, FaqLabelDiv} from '@app/modules/faq/faq-components';
import {ApiResponseProps, PayloadProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import {whiteColor} from '@app/styles/colors';
import {
  DesktopWidth,
  GProgressBar,
  GProgressBarFill,
  Heading,
  Loader,
  MainContainer,
} from '@app/styles/common-styles';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {isMobile} from 'react-device-detect';
import {Link} from 'react-router-dom';
import {useNavigate, useParams} from 'react-router-dom';
import {
  BodyText3,
  Heading4,
  ListItem,
  PlansSection,
  PricingText,
  VideoContainer,
} from './recommend-plans-components';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';

/**
 * Renders Component.
 * @return {RecommendPlans} renders Component.
 */
export default function RecommendPlans() {
  const navigate = useNavigate();
  const {type}: any = useParams();
  const [plansData, setPlansData]: any = useState({});
  const [loader, setLoader] = useState(false);
  // const [userInformation, setUserInformation] = useState({
  //   name: '',
  //   email: '',
  // });

  // if (user === null || user === 'null' || user === '') {
  //   sessionStorage.setItem('user-info', JSON.stringify(null));
  // } else {
  //   sessionStorage.setItem('user-info', JSON.stringify(userInformation));
  // }

  useEffect(() => {
    setLoader(true);
    guestLogin();

    // const userInfo = user.split('-');
    // setUserInformation({name: userInfo[0], email: userInfo[1]});
    Mixpanel.track(service['recommendedPlans']['title'], service['recommendedPlans']['props']);
    gtag('event', gaService['recommendedPlans']['title'], {
      'event_category': gaService['recommendedPlans']['category'],
    });
  }, []);
  const d = new Date();
  const offset = d.getTimezoneOffset();

  /**
   * get Boarding JSON from the API.
   *  */
  function guestLogin() {
    axios({
      url: process.env.REACT_APP_API_URL + 'guestLogin',
      method: 'POST',
      // eslint-disable-next-line max-len
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic R3JpdHdlbGwtQ29yZTpablhaOXB0WEhiNzdwaE9KYkdVcQ==',
      },
      data: `username=guest@gwc.com&password=Enter@123&offset=${offset}`,
    })
        .then(function(response: any) {
          if (response.status == 200) {
            getPlansData(response.data.token);
            setLocalStorage('guestToken', response.data.token);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
  }
  /**
   *@param {from} token
   * gets Plans Data renders Component.
   */
  async function getPlansData(token) {
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.getPlansAPI + type,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject).then((response: ApiResponseProps) => {
      if (response.status_code === 200) {
        setPlansData(response.data[0]);
        setLoader(false);
      }
    });
  }
  return (
    <>
      {loader ? (
        <Loader>
          <Spinner size="6px" />
        </Loader>
      ) : null}
      <MainContainer bgColor="#FAFAFC">
        {!isMobile ? <Header hideBackArrow={false} navigateLink="/" hideLogo={true} /> : null}
        <ScrollSection id="scrollable-div" className="flex-9">
          <DesktopWidth>
            {!isMobile ? (
              <PillsContainer>
                <Pills className="active">
                  <IconsContainer className="d-flex">
                    <Icon name="check" />
                  </IconsContainer>
                  &nbsp;&nbsp;Health Assessment
                </Pills>
                <Pills className="current">2&nbsp;&nbsp; Your Results</Pills>
                <Pills>3&nbsp;&nbsp; Basic Information</Pills>
                <Pills>4&nbsp;&nbsp; Payment method</Pills>
              </PillsContainer>
            ) : null}
            <div className="pos-rel bg-white pr-0">
              <IconsContainer
                className="bg-after"
                onClick={() => navigate('/')}
              >
                <ImageWrapper>
                  <img src={isMobile ? homeImg : homeImg2} alt="User" />
                </ImageWrapper>
              </IconsContainer>
              {plansData && plansData['plan_description'] ? (
                <>
                  <ContentContainer>
                    <BodyText2 className="clr-blue pl-0">
                      {PlansPage['tagline']}
                    </BodyText2>
                    <Heading className="f-32 m-0 mb-16">
                      {PlansPage['heading']}
                    </Heading>
                    {/* -------------- Commented by Vandana Kumawat ------------------- */}

                    <Description className="m-0 mb-20">
                      {PlansPage['content']}
                    </Description>
                    <PlansSection className="payment-page">
                      <div>
                        {/* -------------- Commented by Vandana Kumawat ------------------- */}

                        {/* <BodyText3 className='m-0'>
                        {plansData['plan_duration']}&nbsp;
                        {plansData['duration_type']}</BodyText3> */}
                        {plansData['plan_duration'] > 1 ? (
                          <BodyText3 className="m-0">
                            {plansData['plan_duration']}&nbsp;
                            {plansData['duration_type']}
                          </BodyText3>
                        ) : (
                          <BodyText3 className="m-0">
                            ONE TIME ANALYSIS
                          </BodyText3>
                        )}
                        {
                          <PricingText className="py-5">
                            {plansData['currency_type']}
                            {plansData['plan_price']}
                            {plansData['plan_duration'] > 1 ? (
                              <span>
                                / &nbsp;
                                {plansData['recurring_type']}
                              </span>
                            ) : (
                              <span>
                                &nbsp;
                                {/* -------------- Commented by Vandana Kumawat ------------------- */}
                                {/* {plansData['recurring_type']} */}
                                total
                              </span>
                            )}
                          </PricingText>
                        }
                      </div>
                      <Description className="m-0">
                        {plansData['plan_type']}
                      </Description>

                      {/* -------------- Commented by Vandana Kumawat ------------------- */}

                      <BodyText3 className="c-white mb-0">
                        See our{' '}
                        <Link
                          to=""
                          onClick={() => {
                            window.open(getFAQs('FAQs'));
                            Mixpanel.track(action['recommendPlans']['FAQPolicy']['title'], action['recommendPlans']['FAQPolicy']['props']);
                            gtag('event', gaAction['recommendPlans']['FAQPolicy']['title'], {
                              'event_category': gaAction['recommendPlans']['FAQPolicy']['category'],
                            });
                          }}
                        >
                          FAQs
                        </Link>
                        <span> for the cancellation policy.</span>
                      </BodyText3>
                    </PlansSection>
                  </ContentContainer>
                  <ContentContainer bgColor={'#FAFAFC'}>
                    <Heading4 className="mt-0 mb-20">
                      {plansData['plan_description']['heading']}
                    </Heading4>
                    <div
                      className={
                        isMobile ? '' : 'd-flex align-items-start gap-15'
                      }
                    >
                      <PlanDiv className="p-r">
                        <ul className="m-0">
                          {plansData['plan_description']['subject'].map(
                              (info: any, i: number) => {
                                return (
                                  <ListItem key={i} className="pb-24">
                                    {info}
                                  </ListItem>
                                );
                              },
                          )}
                        </ul>
                      </PlanDiv>
                      <PlanDiv>
                        {isMobile ? (
                          <Heading4 className="mt-20">
                            {plansData['plan_video']['heading']}
                          </Heading4>
                        ) : null}
                        <VideoContainer
                          style={{height: '180px', width: '100%'}}
                        >
                          <iframe
                            width="100%"
                            height="100%"
                            src={plansData['plan_video']['video_url']}
                          ></iframe>
                        </VideoContainer>
                      </PlanDiv>
                    </div>
                  </ContentContainer>
                </>
              ) : null}
              <ContentContainer>
                <Heading4 className="m-0 fw-600 mb-20">
                  {plansData?.results_info &&
                    Object.values(plansData?.results_info)[0]}
                </Heading4>
                <PlansSection
                  className={isMobile ? 'bei-page' : 'bei-page p-40'}
                >
                  {plansData?.results_info?.description?.map((ele, index) => {
                    return (
                      <React.Fragment key={index}>
                        {ele.heading ? (
                          <Description className="f-18-28">
                            {ele.heading} <span>{ele.subHeading}</span>
                          </Description>
                        ) : (
                          <Description className="f-18-28">
                            {ele.value} <span>{ele.subHeading}</span>
                          </Description>
                        )}
                        <div className="d-flex">
                          <GProgressBar className="mb-32 mt-8">
                            <GProgressBarFill
                              width={ele.value}
                            ></GProgressBarFill>
                          </GProgressBar>
                        </div>
                      </React.Fragment>
                    );
                  })}

                  {/* -------------- Commented by Vandana Kumawat ------------------- */}

                  {/* <Description className='f-18-28'>
              80% improvement <span>in digestive issues.</span>
                  </Description>
                  <GProgressBar className='mb-32 mt-8'>
                    <GProgressBarFill width='80%'>                  
                    </GProgressBarFill>
                  </GProgressBar>
                  <Description className='f-18-28'>
              75% less <span>migraines and headaches.</span>
                  </Description>
                  <GProgressBar className='mb-32 mt-8'>
                    <GProgressBarFill width='75%'>                  
                    </GProgressBarFill>
                  </GProgressBar>
                  <Description className='f-18-28 mt-8'>
              65% improvement <span>in anxiety.</span>
                  </Description>      
                  <GProgressBar className='mt-8'>
                    <GProgressBarFill width='65%'>                  
                    </GProgressBarFill>
                  </GProgressBar>                         */}
                </PlansSection>
              </ContentContainer>
              <ContentContainer>
                <Heading4 className="m-0 fw-600 mb-20">
                  Frequently Asked Questions
                </Heading4>
                <FAQ data={plansData['faqs']} />
              </ContentContainer>

              {/* -------------- Commented by Vandana Kumawat ------------------- */}

              {/* <ContentContainer bgColor={color2} 
                className={isMobile ? 'mb-50' : ''}>
                <Heading4 className='c-white mt-0'>
                Still have questions?
                </Heading4>
                <Description className='c-white'>
                Schedule a call to discuss your unique
                 situation and how we can help.
                </Description>
                <Button variant={'secondary'} size='large' 
                  width={isMobile ? '100%' : '50%'}   
                  className='mt-20' onClick={()=>{
                    navigate('/open-chat');
                  }}              
                >Chat with a care manager</Button>              
              </ContentContainer>              */}
            </div>
          </DesktopWidth>
        </ScrollSection>
        <DesktopWidth
          className={
            isMobile ?
              'w-100 fixed-footer h-64' :
              'w-100 fixed-footer ds-footer'
          }
          bgColor={whiteColor}
        >
          <>
            <FooterButtons
              bgColor={whiteColor}
              className={isMobile ? 'flx-center b-0' : 'flx-end b-0'}
            >
              {/* <Button
                variant={'primary'}
                size="large"
                width="100%"
                className={isMobile ? 'flx-center' : 'flx-center'}
                onClick={() => navigate('/sign-up')}
              >
                Continue to Sign up
              </Button> */}
              <Button onClick={() => {
                navigate('/sign-up');
                Mixpanel.track(action['recommendPlans']['purchase']['title'], action['recommendPlans']['purchase']['props']);
                gtag('event', gaAction['recommendPlans']['purchase']['title'], {
                  'event_category': gaAction['recommendPlans']['purchase']['category'],
                });
              }}>
                Purchase Plan
              </Button>
              <FaqLabelDiv>
                <FaqLabel>See more details</FaqLabel>
              </FaqLabelDiv>
            </FooterButtons>
          </>
        </DesktopWidth>
      </MainContainer>
    </>
  );
}
