/* eslint-disable max-len */
import React, {useEffect} from 'react';
import homeImg from '@app/assets/images/home3.png';
import homeImg1 from '@app/assets/images/home3-des.png';
import {BodyText2, ContentContainer, FlexContainer, IconsContainer,
  ImageWrapper} from '../assesment-questions/assesment-questions-components';
import {DesktopWidth, Heading, MainContainer} from '@app/styles/common-styles';
import {isMobile} from 'react-device-detect';
import {useNavigate} from 'react-router-dom';
import Button from '@app/components/button';
import {IntakeForm} from '@app/core/apiend_point';
import {FooterButtons, ScrollSection}
  from '../boarding-screens/component/boarding-screen-components';
import Header from '@app/components/header';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';
/**
 * Renders Component.
 * @return {IntakeHome} renders Component.
 */
export default function IntakeHome() {
  const navigate = useNavigate();
  useEffect(()=>{
    Mixpanel.track(service['intakeHome']['title'],
        service['intakeHome']['props']);
    gtag('event', gaService['intakeHome']['title'], {
      'event_category': gaService['intakeHome']['category'],
    });
  }, []);
  return (
    <>
      <MainContainer bgColor={isMobile? '#FFFFFF':'#FAFAFC'} >
        {!isMobile? <Header hideBackArrow={false} className='txt-left'
          desktopMenu={isMobile ? false : true}/>: null}
        <ScrollSection id="scrollable-div">
          {/* <div className='pos-rel'> */}
          <DesktopWidth className={isMobile? 'p-0 intake-form-cardContainer ':
            'p-0 intake-form-cardContainer mt-40'}
          bgColor={'#ffffff'}>
            <div>
              <IconsContainer className='txt-rt bg-after left'
                onClick={() => {
                  navigate('/home');
                  Mixpanel.track(action['intakeHome']['homeLink']['title'],
                      action['intakeHome']['homeLink']['props']);
                  gtag('event', gaAction['intakeHome']['homeLink']['title'], {
                    'event_category': gaAction['intakeHome']['homeLink']['category'],
                  });
                }}>
                <ImageWrapper>
                  <img src={isMobile ? homeImg : homeImg1} alt="User" />
                </ImageWrapper>
              </IconsContainer>
            </div>
            <ContentContainer>
              <BodyText2 className='clr-green'>{IntakeForm['tagline']}
              </BodyText2>
              <Heading className='f-32'>
                {IntakeForm['heading']}
              </Heading>
              {!isMobile ? <FlexContainer className='my-22'>
                <Button variant={'primary'} size='large' width='50%'
                  onClick={() => {
                    navigate('/intake-form');
                    Mixpanel.track(action['intakeHome']['getStarted']['title'],
                        action['intakeHome']['getStarted']['props']);
                    gtag('event', gaAction['intakeHome']['getStarted']['title'], {
                      'event_category': gaAction['intakeHome']['getStarted']['category'],
                    });
                  }}
                >Get Started</Button>
              </FlexContainer> : null}
            </ContentContainer>
          </DesktopWidth>
          {/* </div> */}
        </ScrollSection>
        {isMobile? <DesktopWidth className='w-100 ptb-0 fixed-footer h-64'
          bgColor={'#ffffff'}>
          <>
            <FooterButtons bgColor={'#ffffff'}
              className={isMobile ? 'flx-center b-0' :
                   'b-0 justify-content-center'}>
              <Button variant={'primary'} size='large' width='100%'
                onClick={() => {
                  navigate('/intake-form');
                  Mixpanel.track(action['intakeHome']['getStarted']['title'],
                      action['intakeHome']['getStarted']['props']);
                  gtag('event', gaAction['intakeHome']['getStarted']['title'], {
                    'event_category': gaAction['intakeHome']['getStarted']['category'],
                  });
                }}
              >Get Started</Button>
            </FooterButtons>
          </>
        </DesktopWidth>: null}


      </MainContainer>
    </>
  );
}
