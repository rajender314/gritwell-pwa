/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import {DesktopWidth, MainContainer} from '@app/styles/common-styles';
import React, {useEffect, useState} from 'react';
import {ContentContainer, IconsContainer} from
  '../assesment-questions/assesment-questions-components';
import {createSearchParams, useNavigate} from 'react-router-dom';
import Icon from '@app/components/icon';
import {BadgeRow, BadgeLabel} from '../home/home-components';
import {MenuHeader} from './profile-components';
import {FooterButtons, ScrollSection} from
  '../boarding-screens/component/boarding-screen-components';
import {isMobile} from 'react-device-detect';
import Header from '@app/components/header';
import {whiteColor} from '@app/styles';
import {LoginContainer} from '../tests/tests-components';
import AlertDialog from '../../components/alert-dialog/alert-dialog';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';

/**
 * Renders Component.
 * @return {AccountAccess} renders Component.
 */
export default function ProfileMenu() {
  const navigate = useNavigate();
  const [showAlertModal, setShowAlertModal] = useState(false);

  function logoutAlert() {
    setShowAlertModal(true);
  };

  useEffect(()=>{
    Mixpanel.track(service['profileMenu']['title'],
        service['profileMenu']['props']);
    gtag('event', gaService['profileMenu']['title'], {
      'event_category': gaService['profileMenu']['category'],
    });
  }, []);

  return (
    <>
      <MainContainer bgColor={whiteColor}>
        {!isMobile? <Header hideBackArrow={false} className='txt-left bg-white'
          desktopMenu={isMobile ? false : true}/>: null}
        <ScrollSection id="scrollable-div" className='flex-9 w-100'>
          <LoginContainer className={isMobile ? 'w-100' :
           'w-100 d-flex js-cen'}>
            <DesktopWidth>
              <ContentContainer className={isMobile ?'p-0' : 'br-bg  mt-40'}>
                <div className={isMobile ? 'p-24 pb-0' : 'p-0'}>
                  <IconsContainer onClick={()=>{
                    navigate('/profile');
                    Mixpanel.track(action['profileMenu']['back']['title'],
                        action['profileMenu']['back']['props']);
                    gtag('event', gaAction['profileMenu']['back']['title'], {
                      'event_category': gaAction['profileMenu']['back']['category'],
                    });
                  }}>
                    <Icon name={'chervonLeft'} />
                  </IconsContainer>
                </div>
                <ContentContainer className=''>
                  <MenuHeader className='pb-20'>
              Settings
                  </MenuHeader>
                  <BadgeRow className='list clr-bl' onClick={()=>{
                    navigate('/account-info');
                    Mixpanel.track(action['profileMenu']['accountInfo']['title'],
                        action['profileMenu']['accountInfo']['props']);
                    gtag('event', gaAction['profileMenu']['accountInfo']['title'], {
                      'event_category': gaAction['profileMenu']['accountInfo']['category'],
                    });
                  }}>
                    <IconsContainer className='d-flex'>
                      <Icon name="profile"/>
                    </IconsContainer>
                    <BadgeLabel>
          Account information
                    </BadgeLabel>
                  </BadgeRow>
                  <BadgeRow className='list clr-bl' onClick={()=>{
                    navigate('/change-password');
                    Mixpanel.track(action['profileMenu']['password']['title'], action['profileMenu']['password']['props']);
                    gtag('event', gaAction['profileMenu']['password']['title'], {
                      'event_category': gaAction['profileMenu']['password']['category'],
                    });
                  }}>
                    <IconsContainer className='d-flex'>
                      <Icon name="lock"/>
                    </IconsContainer>
                    <BadgeLabel>
          Password
                    </BadgeLabel>
                  </BadgeRow>
                  <BadgeRow className='list clr-bl'
                    onClick={()=>{
                      navigate({
                        pathname: '/add-payment',
                        search:
            // eslint-disable-next-line max-len
            `?${createSearchParams({showPaymentCards: 'true'})}`,
                      });
                      Mixpanel.track(action['profileMenu']['paymentMethod']['title'], action['profileMenu']['paymentMethod']['props']);
                      gtag('event', gaAction['profileMenu']['paymentMethod']['title'], {
                        'event_category': gaAction['profileMenu']['paymentMethod']['category'],
                      });
                    }}>
                    <IconsContainer className='d-flex'>
                      <Icon name="payment"/>
                    </IconsContainer>
                    <BadgeLabel>
          Payment method
                    </BadgeLabel>
                  </BadgeRow>
                  <BadgeRow className='list clr-bl' onClick={()=>{
                    navigate('/billing-history');
                    Mixpanel.track(action['profileMenu']['billingHistory']['title'], action['profileMenu']['billingHistory']['props']);
                    gtag('event', gaAction['profileMenu']['billingHistory']['title'], {
                      'event_category': gaAction['profileMenu']['billingHistory']['category'],
                    });
                  }}>
                    <IconsContainer className='d-flex'>
                      <Icon name="billing"/>
                    </IconsContainer>
                    <BadgeLabel>
          Billing history
                    </BadgeLabel>
                  </BadgeRow>
                  <BadgeRow className='list clr-bl' onClick={()=>{
                    navigate('/open-chat');
                    Mixpanel.track(action['profileMenu']['chat']['title'], action['profileMenu']['chat']['props']);
                    gtag('event', gaAction['profileMenu']['chat']['title'], {
                      'event_category': gaAction['profileMenu']['chat']['category'],
                    });
                  }}>
                    <IconsContainer className='d-flex'>
                      <Icon name="textMessage"/>
                    </IconsContainer>
                    <BadgeLabel>
         Chat
                    </BadgeLabel>
                  </BadgeRow>
                  <BadgeRow className='list clr-bl' onClick={()=>{
                    navigate('/contact-us');
                    Mixpanel.track(action['profileMenu']['contactUs']['title'], action['profileMenu']['contactUs']['props']);
                    gtag('event', gaAction['profileMenu']['contactUs']['title'], {
                      'event_category': gaAction['profileMenu']['contactUs']['category'],
                    });
                  }}>
                    <IconsContainer className='d-flex'>
                      <Icon name="email"/>
                    </IconsContainer>
                    <BadgeLabel>
          Contact Us
                    </BadgeLabel>
                  </BadgeRow>
                  {/* <BadgeRow className='list clr-bl' onClick={()=>{
                  navigate('/health-plan');
                }}>
                  <IconsContainer className='d-flex'>
                    <Icon name="extendCare"/>
                  </IconsContainer>
                  <BadgeLabel>
          Health plan
                  </BadgeLabel>
                </BadgeRow> */}
                  <DesktopWidth
                    className={isMobile ? 'w-100 fixed-footer br-tp' :
                   'br-tp p-0'}>
                    <FooterButtons className={isMobile? '': 'plr-0'}>
                      <BadgeRow className='list clr-bl'
                        onClick={()=>{
                          logoutAlert();
                          Mixpanel.track(action['profileMenu']['logOut']['title'], action['profileMenu']['logOut']['props']);
                          gtag('event', gaAction['profileMenu']['logOut']['title'], {
                            'event_category': gaAction['profileMenu']['logOut']['category'],
                          });
                        }}>
                        <IconsContainer className='d-flex'>
                          <Icon name="logout"/>
                        </IconsContainer>
                        <BadgeLabel>
            Log out
                        </BadgeLabel>
                      </BadgeRow>
                    </FooterButtons>
                  </DesktopWidth>
                </ContentContainer>
              </ContentContainer>
            </DesktopWidth>
          </LoginContainer>
        </ScrollSection>

      </MainContainer>
      {showAlertModal && <AlertDialog showCancelButton={true}
        header="Log out" description='Are you sure want you to log out?'
        onCancel={()=> {
          navigate('/sign-up');
          setShowAlertModal(false);
        }}
        onClickCancel={()=> {
          setShowAlertModal(false);
        }} alertType="danger" />}
    </>
  );
}

