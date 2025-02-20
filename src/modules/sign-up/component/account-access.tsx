/* eslint-disable max-len */
import Header from '@app/components/header';
import Tabs from '@app/components/tabs';
import {LoginLabels} from '@app/core/labels-messages';
import {whiteColor} from '@app/styles';
import {DesktopWidth, Heading, MainContainer} from '@app/styles/common-styles';
import {useEffect, useState} from 'react';
import {LoginContainer, LoginTabContainer} from
  './account-access-components';
import SignIn from './sign-in';
import SignUp from './sign-up';
import React from 'react';
import {isMobile} from 'react-device-detect';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';

/**
 * Renders Component.
 * @return {AccountAccess} renders Component.
 */
export default function AccountAccess() {
  const [selectedTab, setTab] = useState('');

  useEffect(()=>{
    const str = window.location.pathname;
    const strArr = str.split('/');
    if (strArr.includes('sign-up')) {
      setTab(LoginLabels[0]);
    } else {
      setTab(LoginLabels[1]);
    }
    Mixpanel.track(service['accountAcess']['title'],
        service['accountAcess']['props']);
    gtag('event', gaService['accountAcess']['title'], {
      'event_category': gaService['accountAcess']['category'],
    });
  }, []);
  /**
   * @param {string} tab label value
    *On Tab Change.
   *  */
  function onSelectedTabClick(tab:string) {
    setTab(tab);
    Mixpanel.track(`${action['accountAccess']['access']['title']} ${tab} ${action['accountAccess']['select']['title']}`, action['accountAccess']['access']['props']);
    gtag('event', `${gaAction['accountAccess']['access']['title']} ${tab} ${gaAction['accountAccess']['select']['title']}`, {
      'event_category': gaAction['accountAccess']['access']['category'],
    });
  }


  return (
    <>
      <MainContainer bgColor={whiteColor}>
        <Header hideBackArrow={false} bgCol={isMobile ? '' : '#e9dcce66'} hideLogo={true} hideBack={true} />
        {/* <div className='pos-rel'> */}

        {/* </div> */}
        <LoginContainer>
          <DesktopWidth>
            <Heading className={isMobile? 'd-none' :
           'f-32 logInContainerTitle mt-40'}>
            Control health at its
              <span className='bg-highLighted'>roots</span></Heading>

            <LoginTabContainer
              className={isMobile ? 'z-2' : 'br-t-15 z-2 ' }>
              <Tabs
                type='secondary'
                labels={LoginLabels}
                onClick={onSelectedTabClick}
                selectedLabel={selectedTab}
              />
              {selectedTab === LoginLabels[0] ? <SignUp/> : <SignIn/> }
            </LoginTabContainer>
          </DesktopWidth>
        </LoginContainer>
      </MainContainer>
    </>
  );
}


