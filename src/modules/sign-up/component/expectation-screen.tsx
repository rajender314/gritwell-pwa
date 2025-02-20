import {whiteColor} from '@app/styles';
import {DesktopWidth, MainContainer} from '@app/styles/common-styles';
import React, {useEffect, useState} from 'react';
import {isMobile} from 'react-device-detect';
import {LocationContainer,
  LoginTabContainer, SignContainer} from './account-access-components';
import Button from '@app/components/button/button';
import LocationBG from '@app/assets/images/location-conf.jpg';
import Icon from '@app/components/icon';
import {BackDrop,
  ExpectationContainer,
  IconsContainer,
} from '@app/modules/assesment-questions/assesment-questions-components';
import {useNavigate} from 'react-router-dom';
import {Actions, BackBtnContainer,
  BackIconContainer,
  ImageContainer,
  LayoutWrapper,
  LeftContainer,
  LogoWrapper,
  RightContainer,
  RightContent,
  TextContent} from './signup.components';
import {HeaderMain} from '@app/components/header/header-components';
/**
 * Renders Component.
 * @return {ExpectationScreen} renders Component.
 */
export default function ExpectationScreen() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  useEffect(()=>{
    console.log(searchParams.get('isLocation'));
  }, []);
  const onSubmit = () => {
    if (searchParams.get('isLocation') === 'true') {
      navigate('/plans');
    } else {
      navigate('/plans');
    }

    setIsSubmitting(true);
  };
  return (
    <>
      <MainContainer bgColor={whiteColor} style={{display: 'none'}}>
        <div className='signupScreen' style={isMobile ? {overflow: 'auto'} :
         {}}>

          {/* <div className="leftPart">
            <Icon name="headerLogo" />
            <div className="image-container">
              <img src={LocationBG} />
            </div>
          </div> */}

          <div className={isMobile ?
          'w-100 h-250' :
           'd-flex jc-center partitionDiv w-50'}>
            <img style={isMobile ? {width: '100%'} :
               {width: '100%', height: '100%'}} src={LocationBG} />
            <div className='w-100'>
              {isMobile ? <div className='pointer'
                onClick={() => navigate('/location')}
                style={{position: 'absolute', left: '8px', top: '16px'}}
              ><Icon name='backarrow'/> </div> : ''}
              <div>
                {!isMobile && <div style={{position: 'absolute',
                  left: '44px', top: '24px'}}>
                  <Icon name="headerLogo" />
                </div>}
                {/* <img src={LocationBG} /> */}
              </div>
            </div>
          </div>
          <LocationContainer className={isMobile ?
          'd-flex jc-center w-100' : 'w-50 d-flex jc-center'} style={isMobile ?
             {overflow: 'unset'} :
           {}}>
            <DesktopWidth>
              <SignContainer>
                <LoginTabContainer
                  className={isMobile ? 'z-2' : 'z-2 px-24 py-40 '}
                >
                  {isMobile ? '' : <div className='pointer'
                    onClick={() => navigate('/location')}
                    style={{marginLeft: '-0.5rem', marginTop: '1rem'}}
                  ><Icon name='backarrow'/> </div>}
                  <h2 className='confMainText mt-10 mb-32'>
                  What to expect</h2>
                  {searchParams.get('isLocation') === 'true' ?
                  <span className='confText'>
                Our Root Cause Assessment will help to identify the
                 potential root causes and imbalances driving symptoms.
                 You’ll receive a 1:1 appointment with a functional medicine
                   health coach to review your report in detail & discuss next
                    steps. Since you are located in NY, NJ, or RI, your analysis
                     will not include the add on inflammation test.
                    <span style={{width: '24px', height: '24px',
                      display: 'inline-flex', alignItems: 'center',
                      justifyContent: 'center'}}
                    onClick={() => setShowPopup(true)}
                    className='pointer'>
                      <Icon name='info'/></span>
                  </span> : <span className='confText'>
                  Our Root Cause Analysis will identify the potential root
                   causes driving symptoms. You’ll get a 1:1 appointment with
                    a functional medicine health coach to review it & discuss
                     next steps. Since we cannot order test kits to NY, NJ, or
                      RI, we’ve reduced the price to $115 ($249 crossed out)
                       for you.<span onClick={() => setShowPopup(true)}
                      className='pointer'>
                      <Icon name='info'/></span>
                  </span>}
                  <div className='mr-24 ml-24 mt-40'>
                    <Button variant={isSubmitting ?
                 'disabled' : 'primary'}
                    className='pt-30 mt-20'
                    type="submit"
                    onClick={onSubmit}
                    size='large' width='100%'
                    >Continue</Button>
                    {/* <Button variant={'secondary'}
                      className='pt-30 mt-20'
                      type="button"
                      onClick={() => ('')}
                      size='large' width='100%'
                    >Chat with Care Manager</Button> */}
                  </div>
                </LoginTabContainer>
              </SignContainer>
            </DesktopWidth>
          </LocationContainer>
        </div>
      </MainContainer>

      <LayoutWrapper>
        {isMobile && <HeaderMain className={isMobile ?
         'text-center d-flex js-bet p-10' :'text-center d-flex js-bet'}>
          <IconsContainer className='d-flex mrt-6' onClick={() => {
            navigate('/location');
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
        </HeaderMain>}
        <LeftContainer style={{backgroundColor: '#e7dbce'}}>
          <LogoWrapper>
            {!isMobile &&
            // <BackBtnContainer>
            //   <BackIconContainer onClick={() => navigate('/location')}>
            //     <Icon name='backarrow'/>
            //   </BackIconContainer>
            // </BackBtnContainer> :
            <Icon name="headerLogo" />}
          </LogoWrapper>
          <ImageContainer className='d-flex'>
            <img alt='expectation-screen'
              className='w-100' src={LocationBG} />
          </ImageContainer>
        </LeftContainer>
        <RightContainer style={{backgroundColor: '#F8F5F0'}}>
          <RightContent>
            <div className="content-wrapper">
              {!isMobile && <BackBtnContainer className='pb-24'>
                <BackIconContainer onClick={() => navigate('/location')}>
                  <Icon name='backarrow'/>
                </BackIconContainer>
              </BackBtnContainer>}
              <TextContent className='p-0'>
                <h2 className='confMainText mb-24' style={{marginTop: '0'}}>
                  What to expect</h2>
                {searchParams.get('isLocation') === 'true' ?
                  <span className='confText'>
               Our Root Cause Assessment will help to identify the
                 potential root causes and imbalances driving symptoms.
                 You’ll receive a 1:1 appointment with a functional medicine
                   health coach to review your report in detail & discuss next
                    steps. Since you are located in NY, NJ, or RI, your analysis
                     will not include the add on inflammation
                    <span className='pos-relative'>test.
                      <span style={{position: 'absolute', top: '2px',
                        display: 'inline-flex', alignItems: 'center',
                        justifyContent: 'center'}}
                      onClick={() => setShowPopup(true)}
                      className='pointer'>
                        <Icon name='info'/></span></span>
                  </span> : <span className='confText'>
                  Our Root Cause Assessment will help to identify the potential
                   root causes and imbalances driving symptoms. You’ll receive
                    an Inflammation Test Kit and a 1:1 appointment with a
                     functional medicine health coach to review your report
                      and test results in detail, as well as discuss next
                       steps.
                  </span>}
              </TextContent>
              <Actions>
                <Button variant={isSubmitting ?
                 'disabled' : 'primary'}
                className={'responsive-btn'}
                type="submit"
                onClick={onSubmit}
                size='large' width='100%'
                >Continue</Button>
              </Actions>
            </div>
          </RightContent>
        </RightContainer>
      </LayoutWrapper>
      {showPopup && <>
        <BackDrop>
          <ExpectationContainer>
            <div className='state_alert mb-12'>
              <div className='alertMainText d-flex gap-8'>
                <Icon name='info'/>
                <h4 style={{margin: '0'}}>Information</h4> </div>
              <div className='pointer' onClick={() => setShowPopup(false)}>
                <Icon name='closeIcon'/>
              </div>
            </div>
            {/* <div className='alert_main_con mb-12'> */}
            <div className='exprectInfo'>
            Due to state laws, we are unable to send at-home
             blood test kits to NY, NJ, or RI. If desired, you
              can request the biomarkers in our Inflammation
               Test Kit from your doctor and we will also include
                an analysis of your inflammation levels in your
                 Root Cause Report.</div>
            {/* </div> */}
          </ExpectationContainer>
        </BackDrop>
      </>}
    </>
  );
}
