/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import homeImg from '@app/assets/images/homescreen.png';
import homeImg2 from '@app/assets/images/homescreen-des.png';
import {BodyText2, ContentContainer, IconsContainer,
  ImageWrapper} from '../assesment-questions/assesment-questions-components';
import {TimeLineQuiz} from '@app/core/apiend_point';
import {DesktopWidth, Heading, MainContainer} from '@app/styles/common-styles';
import {Description} from
  '@app/components/layout-onBoarding/layout-onBoarding-components';
import {isMobile} from 'react-device-detect';
import {useNavigate} from 'react-router-dom';
import Button from '@app/components/button';
import Header from '@app/components/header';
import {ScrollSection} from
  '../boarding-screens/component/boarding-screen-components';
import {action} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction} from '@app/googleAnalytics/googleAnalytics';
import {HeaderMain} from '@app/components/header/header-components';
import Icon from '@app/components/icon';
import {Mixpanel} from '@app/App';
import {NextPill, HomeToDoCards, HomeToDoCardTitle, InflamtionContent, InflamationHeading, HomeToDoCardStatus, TimingStatus, CurrentPill, PopupDue} from '../home/home-components';
import {LayoutWrapper, LeftContainer, ImageContainer, RightContainer, RightContent, BackBtnContainer, BackIconContainer, TextContent, Actions} from '../sign-up/component/signup.components';
// import TimelineBG from '@app/assets/images/location-conf.jpg';
import {getLocalStorage} from '@app/core/localStorageService';
import {dateFormats} from '@app/utils/dateformat';
import moment from 'moment-timezone';
import LocationBG from '@app/assets/images/age_image.png';
/**
 * Renders Component.
 * @return {AssesmentQuestions} renders Component.
 */
export default function AssesmentQuestions() {
  const navigate = useNavigate();
  const [currentPlan, setCurrentPlan] = useState<any>({});
  const [nextPlan, setNextPlan] = useState<any>({});
  const currentDate = moment(new Date()).tz('GMT');

  useEffect(()=>{
    const userPlan= JSON.parse(getLocalStorage('todoData'));
    {userPlan.map((todo: any)=>{
      if (todo.code === 'TAKE_TIMELINE_ANALYSIS') {
        setCurrentPlan(todo);
      }
      if (todo.code === 'TAKE_IMBALANCE_ANALYSIS') {
        setNextPlan(todo);
      }
    });
    }
  }, [getLocalStorage('todoData')]);

  const showDue = (duedate: any) => {
    const dueDate = moment(duedate);
    const duration = moment.duration(dueDate.diff(currentDate));
    const hours = duration.asHours();
    const minutes = duration.asMinutes();
    if (minutes < 0) {
      return `Overdue`;
    } else if (hours > 0) {
      // setIsOverDue(false);
      return 'Due ' +
      dateFormats(
          duedate,
          'MMMM Do',
      );
    } else if (minutes > 0) {
      return 'Due ' +
      dateFormats(
          duedate,
          'MMMM Do',
      );
      // setIsOverDue(true);
    } else {
      // setIsOverDue(false);
      return `Overdue`;
    }
  };
  return (
    <>
      <MainContainer bgColor={isMobile? '#ffffff':'#FAFAFC'}
        className={isMobile ? 'fxh-100' : ''}>
        {!isMobile? <Header hideBackArrow={false} className='txt-left'
          desktopMenu={isMobile ? false : true}/>: null}
        {isMobile? <HeaderMain className={isMobile ? 'text-center d-flex js-bet p-10' :'text-center d-flex js-bet'}>
          <IconsContainer className='d-flex mrt-6' onClick={() => {
            navigate('/home');
          }
          }>
            <Icon name={'chervonLeft'} />
          </IconsContainer>
          <IconsContainer className='flex-1'
            color='black'
            onClick={() => (0)
            }>
            <Icon name='headerLogo' />
          </IconsContainer>
        </HeaderMain>: null}
        <LayoutWrapper className='with-header'>
          <LeftContainer style={{backgroundColor: '#EFEEEA'}}>
            {/* {isMobile && <BackBtnContainer className='positioned'>
              <BackIconContainer onClick={() => {
                navigate('/rootcause-home');
              }}>
                <Icon name='backarrow'/>
              </BackIconContainer>
            </BackBtnContainer>} */}
            <ImageContainer className='d-flex justify-content-center'>
              {/* <ImageHolder> */}
              <img alt='expectation-screen' className={isMobile ? 'w-100 h-100' : ''} src={LocationBG} />
              {/* </ImageHolder> */}
            </ImageContainer>
          </LeftContainer>
          <RightContainer>
            <RightContent>
              <div className="content-wrapper">
                {!isMobile && <BackBtnContainer className='pb-24'>
                  <BackIconContainer onClick={() => {
                    navigate('/rootcause-home');
                  }}>
                    <Icon name='backarrow'/>
                  </BackIconContainer>
                </BackBtnContainer>}
                <TextContent style={{padding: '0'}}>
                  <CurrentPill>Current Step</CurrentPill>
                  <InflamationHeading className='m-0 py-16'>{currentPlan.name}</InflamationHeading>
                  <div className='state_alert'>
                    <HomeToDoCardStatus style={showDue(currentPlan.due_date) === 'Overdue' ? {color: '#B11818'} : {}}>
                      {showDue(currentPlan.due_date )}
                      {/* {currentPlan.due_date ?
                                            'Due ' +
                                              dateFormats(
                                                  currentPlan.due_date,
                                                  'MMMM Do',
                                              ) :
                                            ''} */}
                    </HomeToDoCardStatus>
                    <TimingStatus>~20 minutes</TimingStatus>
                  </div>
                  <InflamtionContent className='mb-24'>This in-depth overview of your health history, lifestyle, environment, and other triggers helps us identify potential root causes in the past that may be contributing to symptoms today.</InflamtionContent>
                </TextContent>
                <Actions className='py-40'>
                  <Button variant={'primary'}
                    className={'responsive-Imbalance-btn'}
                    type="submit"
                    onClick={() => {
                      navigate('/timeline-quiz-questions');
                      Mixpanel.track(action['assesmentQues']['getStarted']['title'], action['assesmentQues']['getStarted']['props']);
                      gtag('event', gaAction['assesmentQues']['getStarted']['title'], {
                        'event_category': gaAction['assesmentQues']['getStarted']['category'],
                      });
                    }}
                    size='large' width='100%'
                  >Take Timeline Analysis</Button>
                </Actions>
                <div style={{background: '#F8F5F0', padding: '40px 24px 16px', margin: (isMobile?'0 -24px -24px' : '0 -40px -40px')}}>
                  <NextPill className='mb-12'>Next Step</NextPill>
                  <HomeToDoCards
                    className={`${isMobile ? 'w-100' : ''}`} style={{cursor: 'inherit', borderTop: ' 10px solid #E8EAF1'}}
                  >
                    <div className="flex-1 dflex justify-content-between gap-24">
                      <div className='d-flex gap-12'>
                        <HomeToDoCardTitle>
                          {nextPlan.name}
                        </HomeToDoCardTitle>
                      </div>
                      <div className='dflex gap-12'>
                        {!isMobile && <PopupDue style={showDue(nextPlan.due_date) === 'Overdue' ? {color: '#B11818'} : {}}>
                          {showDue(nextPlan.due_date )}
                          {/* {nextPlan.due_date ?
                                            'Due ' +
                                              dateFormats(
                                                  nextPlan.due_date,
                                                  'MMMM Do',
                                              ) :
                                            ''} */}
                        </PopupDue>}
                        {/* <div>
                          {moment().diff(
                              userDetails['todo_list_dueDate'],
                              'days',
                          ) < 0 ? (
                                        <HomeToDoCardStatus>
                                          {todo.due_date ?
                                            'Due ' +
                                              dateFormats(
                                                  todo.due_date,
                                                  'MMMM Do',
                                              ) :
                                            'Complete'}
                                        </HomeToDoCardStatus>

                                      ) : (
                                        <HomeToDoCardStatus
                                          color={
                                            !userDetails[
                                                'inflamation_test_ordered'
                                            ] ?
                                              '#B11818' :
                                              ''
                                          }
                                        >
                                          {!userDetails[
                                              'inflamation_test_ordered'
                                          ] ?
                                            'Overdue ' :
                                            'Completed'}
                                        </HomeToDoCardStatus>

                                      )}
                        </div> */}
                        {/* <div>
                          <Icon name='chervonRight' />
                        </div> */}
                      </div>
                    </div>
                    {isMobile && <PopupDue style={showDue(nextPlan.due_date) === 'Overdue' ? {color: '#B11818'} : {}}>
                      {showDue(nextPlan.due_date )}
                      {/* {nextPlan.due_date ?
                                            'Due ' +
                                              dateFormats(
                                                  nextPlan.due_date,
                                                  'MMMM Do',
                                              ) :
                                            ''} */}
                    </PopupDue>}
                  </HomeToDoCards>
                </div>
              </div>
            </RightContent>
          </RightContainer>
        </LayoutWrapper>
        <ScrollSection id="scrollable-div" style={{display: 'none'}}
          className={isMobile? 'mb-64 scroll-h' : 'mb-64'}>
          <DesktopWidth>
            <div className='pos-rel bg-white pr-0 radius-20' >
              <IconsContainer className='br-tp-bt'
                onClick={() => navigate('/')}>
                <ImageWrapper>
                  <img src={isMobile ? homeImg : homeImg2} alt="User" />
                </ImageWrapper>
              </IconsContainer>

              <ContentContainer className='pb-24 p-24'>
                <BodyText2 className='clr-blue mt-0 px-0'>
                  {TimeLineQuiz['tagline']}
                </BodyText2>
                <Heading className='f-32 m-0'>
                  {TimeLineQuiz['heading']}
                </Heading>
                <Description className='mb-16 text-align font-s'>
                  {TimeLineQuiz['content']}
                </Description>
                <BodyText2>
                  <b>  {TimeLineQuiz['footer']}</b>
                </BodyText2>
                {!isMobile? <div className='mt-40 mb-32 '>
                  <Button variant={'primary'} size='large' width='55%'
                    className={'w-40'}
                    onClick={() => {
                      navigate('/timeline-quiz-questions');
                      Mixpanel.track(action['assesmentQues']['getStarted']['title'], action['assesmentQues']['getStarted']['props']);
                      gtag('event', gaAction['assesmentQues']['getStarted']['title'], {
                        'event_category': gaAction['assesmentQues']['getStarted']['category'],
                      });
                    }}
                  >Get started</Button>
                </div>: null}
              </ContentContainer>
            </div>
          </DesktopWidth>

        </ScrollSection>
        {/* {isMobile? <DesktopWidth className='w-100 fixed-footer h-64 br-tp'>
          <FooterButtons className='js-end'>
            <Button variant={'primary'} size='large' width='40%'
              className={'w-40'}
              onClick={() => {
                navigate('/timeline-quiz-questions');
                Mixpanel.track(action['assesmentQues']['getStarted']['title'], action['assesmentQues']['getStarted']['props']);
                gtag('event', gaAction['assesmentQues']['getStarted']['title'], {
                  'event_category': gaAction['assesmentQues']['getStarted']['category'],
                });
              }}
            >Get started</Button>
          </FooterButtons>
        </DesktopWidth>: null} */}

      </MainContainer>
    </>
  );
}
