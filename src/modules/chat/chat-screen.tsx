import Header from '@app/components/header';
import {whiteColor} from '@app/styles';
import {MainContainer} from '@app/styles/common-styles';
import React, {useEffect} from 'react';
import {isMobile} from 'react-device-detect';
import {ScrollSection} from
  '../boarding-screens/component/boarding-screen-components';
import {ChatDiv, ChatLabel} from './chat-component';
import Communication from '@app/assets/images/Communication.png';
import {setLocalStorage} from '@app/core/localStorageService';
const searchParams = new URLSearchParams(location.search);

/**
 * @return {ChatScreen}
 */
export default function ChatScreen() {
  useEffect(()=>{
    setLocalStorage('path', window.location.pathname);
  }, []);
  return (
    <React.Fragment>
      <MainContainer bgColor={whiteColor}>
        <Header
          className="justify-content-between"
          bgCol={isMobile ? '#E9DCCE' : ''}
          hideLogo={searchParams.get('hide') ? true : false}
          desktopMenu={
            isMobile ? false : searchParams.get('hide') ? false : true
          }
          chatData={'chatEndBack'}
          hideBackArrow={false}
        />
        {
          <ScrollSection id="scrollable-div" className="h-150 w-100">
            <ChatDiv>
              <img src={Communication} alt="chat icon" />
              <ChatLabel className='f-24'>
              We are working on finding your Care Manager match
              for your personal experience
              </ChatLabel>
              <ChatLabel className='f-24'>
              check back later!
              </ChatLabel>
            </ChatDiv>
          </ScrollSection>
        }
      </MainContainer>
    </React.Fragment>
  );
}
