/* eslint-disable max-len */
import homeImg from '@app/assets/images/checkIn.png';
import homeImg1 from '@app/assets/images/checkIn-des.png';

import {PreSurveyData} from '@app/core/apiend_point';
import {DesktopWidth, Heading, MainContainer} from '@app/styles/common-styles';
import {isMobile} from 'react-device-detect';
import {useNavigate, useParams} from 'react-router-dom';
import Button from '@app/components/button';
import {BodyText2, ContentContainer,
  FlexContainer, IconsContainer, ImageWrapper}
  from '../assesment-questions/assesment-questions-components';
import {FooterButtons, ScrollSection}
  from '../boarding-screens/component/boarding-screen-components';
import Header from '@app/components/header';
import React, {useEffect} from 'react';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';

/**
 * Renders Component.
 * @return {AssesmentQuestions} renders Component.
 */
export default function PreSurvey() {
  const navigate = useNavigate();
  const {id}: any = useParams();

  useEffect(()=>{
    Mixpanel.track(service['preSurvey']['title'],
        service['preSurvey']['props']);
    gtag('event', gaService['preSurvey']['title'], {
      'event_category': gaService['preSurvey']['category'],
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
                  Mixpanel.track(action['preSurvey']['home']['title'],
                      action['preSurvey']['home']['props']);
                  gtag('event', gaAction['preSurvey']['home']['title'], {
                    'event_category': gaAction['preSurvey']['home']['category'],
                  });
                }}>
                <ImageWrapper>
                  <img src={isMobile ? homeImg : homeImg1} alt="User" />
                </ImageWrapper>
              </IconsContainer>
            </div>
            <ContentContainer>
              <BodyText2 className='clr-green'>{PreSurveyData['tagline']}
              </BodyText2>
              <Heading className='f-32'>
                {PreSurveyData['heading']}
              </Heading>
              {!isMobile ? <FlexContainer className='my-22'>
                <Button variant={'primary'} size='large' width='50%'
                  onClick={() => {
                    navigate('/pre-survey-questions/'+id);
                    Mixpanel.track(action['preSurvey']['startNow']['title'],
                        action['preSurvey']['startNow']['props']);
                    gtag('event', gaAction['preSurvey']['startNow']['title'], {
                      'event_category': gaAction['preSurvey']['startNow']['category'],
                    });
                  }}
                >Start now</Button>
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
                  navigate('/pre-survey-questions/'+id);
                  Mixpanel.track(action['preSurvey']['startNow']['title'],
                      action['preSurvey']['startNow']['props']);
                  gtag('event', gaAction['preSurvey']['startNow']['title'], {
                    'event_category': gaAction['preSurvey']['startNow']['category'],
                  });
                }}
              >Start now</Button>
            </FooterButtons>
          </>
        </DesktopWidth>: null}


      </MainContainer>

    </>
  );
}
