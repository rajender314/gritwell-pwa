import {LayoutWrapper,
  LeftContainer,
  //   LogoWrapper,
  ImageContainer,
  RightContainer,
  RightContent,
  BackBtnContainer,
  Actions} from '@app/modules/sign-up/component/signup.components';
import React, {useEffect, useState} from 'react';
import Button from '../button';
// import Icon from '../icon';
import PaymentSuccessBG from '@app/assets/images/payment-succes-BG.png';
import {getLocalStorage} from '@app/core/localStorageService';
import {Mixpanel} from '@app/App';
import {action} from '@app/mixpanel/Service';
import {useNavigate} from 'react-router-dom';
import gtag from 'ga-gtag';
import {gaAction} from '@app/googleAnalytics/googleAnalytics';
import {isMobile} from 'react-device-detect';

/**
 * Renders Component.
 * @return {SuccessComponent} renders Component.
 */
export default function SuccessComponent() {
  const [userDetails, updateUserDetails] = useState<any>({});
  const navigate = useNavigate();
  useEffect(() => {
    const userData = getLocalStorage('userData') ?
          JSON.parse(getLocalStorage('userData')) :
          {};
    updateUserDetails(userData);
  }, []);

  return (
    <LayoutWrapper>
      <LeftContainer style={{background: '#F9D4A9'}}>
        {/* <LogoWrapper>
          <Icon name="headerLogo" />
        </LogoWrapper> */}
        <ImageContainer className='d-flex justify-content-center'>
          <img alt='expectation-screen' src={PaymentSuccessBG}
            className="plansImageSyles"/>
        </ImageContainer>
      </LeftContainer>
      <RightContainer style={{backgroundColor: '#F8F5F0'}}>
        <RightContent>
          <div className="success-wrapper">
            <BackBtnContainer>
              {/* <BackIconContainer onClick={() => console.log('success')}>
                <Icon name='backarrow'/>
              </BackIconContainer> */}
            </BackBtnContainer>
            <div className={'d-flex flex-column ' + (isMobile ?
             '' :'jc-center')}
            style={{maxWidth: '673px', margin: '0 auto'}}>
              <h1 className='successMainText mx-24-45 mt-16 mb-12'>
              Congratulations <span style={{textTransform: 'capitalize'}}
                >{userDetails.first_name}</span>!</h1>
              <div className={isMobile ? 'confText' : 'confText text-center'}>
                You’re one step closer to gathering insight
                 on what may be driving symptoms.
                 Let’s get this root cause assessment started!</div>
              <Actions className={isMobile ? 'w-100' : ''}>
                <Button variant={'primary'}
                  className={isMobile ? '': 'responsive-btn'}
                  type="submit"
                  onClick={() => {
                    navigate('/home');
                    Mixpanel.track(action['planJourney']['getStarted']['title'],
                        action['planJourney']['getStarted']['props']);
                    gtag('event',
                        gaAction['planJourney']['getStarted']['title'], {
                          'event_category':
                           gaAction['planJourney']['getStarted']['category'],
                        });
                  }}
                  size='large' width='100%'
                >Get started</Button>
              </Actions>
            </div>

          </div>
        </RightContent>
      </RightContainer>
    </LayoutWrapper>
  );
}
