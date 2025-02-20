/* eslint-disable max-len */
import {whiteColor} from '@app/styles';
import {MainContainer, DesktopWidth}
  from '@app/styles/common-styles';
import {useNavigate} from 'react-router-dom';

import {ContentContainer, IconsContainer}
  from '../assesment-questions/assesment-questions-components';
import Icon from '@app/components/icon/icon';
import {MenuHeader} from './profile-components';
import {ScrollSection}
  from '../boarding-screens/component/boarding-screen-components';
import Header from '@app/components/header';
import {isMobile} from 'react-device-detect';
import React, {useEffect} from 'react';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';

/**
 * Renders Component.
 * @return {SignUp} renders Component.
 */
export default function ContactUs() {
  const navigate = useNavigate();

  useEffect(()=>{
    Mixpanel.track(service['contactUs']['title'], action['contactUs']['props']);
    gtag('event', gaService['contactUs']['title'], {
      'event_category': gaService['contactUs']['category'],
    });
  }, []);
  return (
    <>

      <MainContainer bgColor={whiteColor}>
        {!isMobile? <Header hideBackArrow={false} className='txt-left bg-white'
          desktopMenu={isMobile ? false : true}/>: null}
        <ScrollSection id="scrollable-div" className='h-150 w-100 '>
          <DesktopWidth>
            <ContentContainer className={isMobile ?'p-0' : 'br-bg mt-40'}>
              <div className={isMobile ? 'p-24 pb-0' : 'p-0'} >
                <IconsContainer onClick={()=>{
                  navigate(-1);
                  Mixpanel.track(action['contactUs']['back']['title'], action['contactUs']['back']['props']);
                  gtag('event', gaAction['contactUs']['back']['title'], {
                    'event_category': gaAction['contactUs']['back']['category'],
                  });
                }}>
                  <Icon name={'chervonLeft'} />
                </IconsContainer>

              </div>
              <ContentContainer className=''>
                <MenuHeader className='br-bot text-center'>      Contact Us
                </MenuHeader>
                <div className='mt-20 pb-30'>
                “For any questions regarding your subscription or health plan
                 please text your Care Manager at&nbsp;&nbsp;
                  <a href={`tel:7076523205`}
                    onClick={()=>{
                      Mixpanel.track(action['contactUs']['phone']['title'], action['contactUs']['phone']['props']);
                      gtag('event', gaAction['contactUs']['phone']['title'], {
                        'event_category': gaAction['contactUs']['phone']['category'],
                      });
                    }}>
                    (707) 652-3205</a>
                  &nbsp;&nbsp;or email us at&nbsp;&nbsp;
                  <a href={`mailto:hello@grit-well.com`}
                    onClick={()=>{
                      Mixpanel.track(action['contactUs']['email']['title'], action['contactUs']['email']['props']);
                      gtag('event', gaAction['contactUs']['email']['title'], {
                        'event_category': gaAction['contactUs']['email']['category'],
                      });
                    }}>
                    hello@grit-well.com </a>”
                </div>
              </ContentContainer>
            </ContentContainer>
          </DesktopWidth>
        </ScrollSection>
      </MainContainer>
    </>
  );
}
