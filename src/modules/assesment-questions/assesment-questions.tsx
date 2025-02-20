/* eslint-disable max-len */
import React, {useEffect} from 'react';
import homeImg from '@app/assets/images/homescreen.png';
import homeImg2 from '@app/assets/images/homescreen-des.png';
import {BodyText2, ContentContainer, IconsContainer,
  ImageWrapper,
  Pills,
  PillsContainer} from './assesment-questions-components';
import {AssesmentHomePage} from '@app/core/apiend_point';
import {DesktopWidth, Heading, MainContainer} from '@app/styles/common-styles';
import {Description} from
  '@app/components/layout-onBoarding/layout-onBoarding-components';
import {isMobile} from 'react-device-detect';
import {useNavigate} from 'react-router-dom';
import Button from '@app/components/button';
import Header from '@app/components/header';
import {FooterButtons, ScrollSection} from
  '../boarding-screens/component/boarding-screen-components';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';

/**
 * Renders Component.
 * @return {AssesmentQuestions} renders Component.
 */
export default function AssesmentQuestions() {
  const navigate = useNavigate();
  useEffect(()=>{
    Mixpanel.track(service['assesmentQuestions']['title'], service['assesmentQuestions']['props']);
    gtag('event', gaService['assesmentQuestions']['title'], {
      'event_category': gaService['assesmentQuestions']['category'],
    });
  }, []);
  return (
    <>
      <MainContainer bgColor={isMobile? '#ffffff':'#FAFAFC'}
        className={isMobile ? 'fxh-100' : ''}>
        {!isMobile ? <Header hideBackArrow={false} navigateLink='/' hideLogo={true}/> : null}
        <ScrollSection id="scrollable-div"
          className={isMobile? 'mb-64 scroll-h' : 'mb-64'}>
          <DesktopWidth>
            {!isMobile ? <PillsContainer>
              <Pills className='current'>
              1&nbsp;&nbsp; Health Assessment
              </Pills>
              <Pills>
              2&nbsp;&nbsp;  Your Results
              </Pills>
              <Pills>
              3&nbsp;&nbsp;  Basic Information
              </Pills>
              <Pills>
             4&nbsp;&nbsp;  Payment method
              </Pills>
            </PillsContainer> : null}
            <div className='pos-rel bg-white pr-0' >
              <IconsContainer className='br-tp-bt'
                onClick={() => navigate('/')}>
                <ImageWrapper>
                  <img src={isMobile ? homeImg : homeImg2} alt="User" />
                </ImageWrapper>
              </IconsContainer>

              <ContentContainer className='pb-24'>
                <BodyText2 className='clr-blue mt-0 px-0'>
                  {AssesmentHomePage['tagline']}
                </BodyText2>
                <Heading className='f-32 m-0'>
                  {AssesmentHomePage['heading']}
                </Heading>
                <Description className='mb-16'>
                  {AssesmentHomePage['content']}
                </Description>
                <BodyText2>
                  <b>~6 minutes to complete </b>
                </BodyText2>
              </ContentContainer>
            </div>
          </DesktopWidth>

        </ScrollSection>
        <DesktopWidth className='w-100 fixed-footer h-64 br-tp'>
          <FooterButtons >
            <Button variant={'primary'} size='large' width='40%'
              className={'w-40'}
              onClick={() => {
                navigate('/assesment-questions');
                Mixpanel.track(action['assesmentQues']['getStarted']['title'], action['assesmentQues']['getStarted']['props']);
                gtag('event', gaAction['assesmentQues']['getStarted']['title'], {
                  'event_category': gaAction['assesmentQues']['getStarted']['category'],
                });
              }}
            >Get started</Button>
          </FooterButtons>
        </DesktopWidth>

      </MainContainer>
    </>
  );
}
