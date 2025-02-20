/* eslint-disable max-len */
import React, {useEffect, useRef, useState} from 'react';
import {IconsContainer} from '../assesment-questions/assesment-questions-components';
import {MainContainer} from '@app/styles/common-styles';
import {isMobile} from 'react-device-detect';
import {Link, useNavigate} from 'react-router-dom';
import Button from '@app/components/button';
import Header from '@app/components/header';
// import {FooterButtons} from
//   '../boarding-screens/component/boarding-screen-components';
import {action} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction} from '@app/googleAnalytics/googleAnalytics';
import {HeaderMain} from '@app/components/header/header-components';
import Icon from '@app/components/icon';
import {Mixpanel} from '@app/App';
import {InflamtionContent, InflamationHeading, CurrentPill, Plancard, ViewProfile} from '../home/home-components';
import {LayoutWrapper, LeftContainer, ImageContainer, RightContainer, RightContent, BackBtnContainer, BackIconContainer, Actions, PlanCardsWrapper} from '../sign-up/component/signup.components';
import ReceiveReportBG from '@app/assets/images/receive-reportBG.png';
import JumpstartBG from '@app/assets/images/jumpstart-planBG.png';
import ComprehensiveBG from '@app/assets/images/comprehensive_planBG.png';
import {getLocalStorage} from '@app/core/localStorageService';
import {PdfLinkContainer, PdfLinks} from '@app/components/layout-onBoarding/layout-onBoarding-components';
import Download from '@app/assets/images/download.png';
import {whiteColor} from '@app/styles';
/**
 * Renders Component.
 * @return {AssesmentQuestions} renders Component.
 */
export default function ReceiveReport() {
  const navigate = useNavigate();
  const [userDetails, updateUserDetails] = useState({});
  const ref = useRef(null);
  const [showPdfLinkContainer, setShowPdfLinkContainer] = useState(false);
  const token = getLocalStorage('token') ? getLocalStorage('token') : '';
  useEffect(()=>{
    const userData =
    getLocalStorage('userData') ? JSON.parse(getLocalStorage('userData')): {};
    updateUserDetails(userData);
  }, []);

  useEffect(()=>{
    const handler = (e: any) => {
      if (!ref.current?.contains(e.target)) {
        setShowPdfLinkContainer(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () =>{
      document.removeEventListener('mousedown', handler);
    };
  }, [status]);

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
          <LeftContainer style={{backgroundColor: '#FADDBC'}}>
            {/* {isMobile && <BackBtnContainer className='positioned'>
              <BackIconContainer onClick={() => {
                navigate('/rootcause-home');
              }}>
                <Icon name='backarrow'/>
              </BackIconContainer>
            </BackBtnContainer>} */}
            <ImageContainer className='d-flex justify-content-center'>
              {/* <ImageHolder> */}
              <img className={isMobile ? 'w-100' : ''} alt='inflammationBG' src={ReceiveReportBG} />
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
                <div>
                  <CurrentPill>Current Step</CurrentPill>
                  <InflamationHeading className='m-0 py-16'>Receive your report</InflamationHeading>
                  <InflamtionContent className='mt-0 mb-24'>Your results are in - go through them carefully so you can discuss any questions you have with your health coach!</InflamtionContent>
                </div>
                <Actions className='pb-40'>
                  <Button variant={userDetails['test_results'] && userDetails['test_results'].length ? 'primary' : 'disabled'}
                    className={'responsive-btn'}
                    type="submit"
                    onClick={()=>{
                      if (userDetails['test_results'] && userDetails['test_results'].length) {
                      // openPdfViewDocumnet();
                        setShowPdfLinkContainer(!showPdfLinkContainer);
                        Mixpanel.track(action['tests']['testResult']['title'],
                            action['tests']['testResult']['props']);
                        gtag('event', gaAction['tests']['testResult']['title'], {
                          'event_category': gaAction['tests']['testResult']['category'],
                        });
                      }
                    }}
                    size='large' width='100%'
                  >Download Test Results</Button>
                </Actions>
                {showPdfLinkContainer && <PdfLinkContainer ref={ref} style={isMobile ? {left: '40%', bottom: '35%'} : {left: '40%', bottom: '10%'}}>
                  <Link className='m-0 tx-n cursor-default' to={''}>Download Files</Link>
                  <div>
                    {userDetails['test_results'].length > 0 && userDetails['test_results'].map((item, index)=>{
                      return (
                        <PdfLinks key={index} className={`${userDetails['test_results'].length > 1 ? 'border-bottom' : 'border-none' } d-flex`} onClick={()=>{
                          window.open(`${process.env.REACT_APP_API_URL}client/download/testresults/${item['testResultId']}?token=${token.replace('Bearer ', '')}`);
                        }}>
                          <p className='mrt-12' title={item['document_name']}>
                            {item['document_name'].length > 10 ? item['document_name'].slice(0, 10)+'...' : item['document_name']}
                          </p>
                          <img src={Download} alt='Download pdf button' width={20}
                            className='pointer' />
                        </PdfLinks>
                      );
                    })}
                  </div>
                </PdfLinkContainer>}
                <div style={{background: '#F8F5F0', padding: (isMobile?'40px 24px 16px':'40px 24px'), margin: (isMobile?'0 -24px -24px' : '0 -40px -40px')}}>
                  <InflamationHeading className='m-0 mb-16'>What’s next?</InflamationHeading>
                  <InflamtionContent className='mt-0'>Review your care options below to continue meeting with your coach.</InflamtionContent>
                  <PlanCardsWrapper>
                    <Plancard bgColor={whiteColor}>
                      <div style={{height: '200px'}}><img src={JumpstartBG} alt='jumpstartPlan' style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}/> </div>
                      <div className='p-24' style={{flex: '1', display: 'flex', flexDirection: 'column'}}>
                        <div className='d-flex justify-content-between'>
                          <ViewProfile style={{fontWeight: '400'}}>3 MONTHS</ViewProfile>
                          <div className='price'>$125/month</div>
                        </div>
                        <h3 className='planheader'>The Jumpstart Program</h3>
                        <div className='planContent'>1x Month 1:1’s with your functional medicine health coach to receive personalized guidance on testing, medical grade supplements, nutrition and more.</div>
                        <Actions className='in-card' style={{flexDirection: 'row'}}>
                          <Button variant={'secondary'}
                            //   className={'responsive-btn'}
                            type="submit"
                            onClick={() => {
                              navigate('/jumpstart-program');
                            }}
                            size='large' width='100%'
                          >Learn more</Button><Button variant={'primary'}
                            //   className={'responsive-btn'}
                            type="submit"
                            onClick={() => {

                            }}
                            size='large' width='100%'
                          >Purchase</Button>
                        </Actions>
                      </div>
                    </Plancard>
                    <Plancard bgColor={whiteColor}>
                      <div style={{height: '200px'}}><img src={ComprehensiveBG} alt='jumpstartPlan' style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}/> </div>
                      <div className='p-24'>
                        <div className='d-flex justify-content-between'>
                          <ViewProfile style={{fontWeight: '400'}}>6 MONTHS</ViewProfile>
                          <div className='price'>$199/month</div>
                        </div>
                        <h3 className='planheader'>The Comprehensive Program</h3>
                        <div className='planContent'>2x Month 1:1’s with your functional medicine health coach to receive personalized guidance on testing, medical grade supplements, nutrition and more.</div>
                        <Actions style={{flexDirection: 'row'}}>
                          <Button variant={'secondary'}
                            //   className={'responsive-btn'}
                            type="submit"
                            onClick={() => {
                              navigate('/comprehensive-program');
                            }}
                            size='large' width='100%'
                          >Learn more</Button><Button variant={'primary'}
                            //   className={'responsive-btn'}
                            type="submit"
                            onClick={() => {

                            }}
                            size='large' width='100%'
                          >Purchase</Button>
                        </Actions>
                      </div>
                    </Plancard>
                  </PlanCardsWrapper>
                </div>
              </div>
            </RightContent>
          </RightContainer>
        </LayoutWrapper>
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
