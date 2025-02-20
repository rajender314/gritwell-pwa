/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import React from 'react';
import Header from '@app/components/header/header';
import {ScrollSection}
  from '@app/modules/boarding-screens/component/boarding-screen-components';
import {DesktopWidth, MainContainer} from '@app/styles/common-styles';
import {isMobile} from 'react-device-detect';
import {BackgroundImage, ButtonContainer, FilterHeading, FirstScreen} from './quitz-component';
import Button from '@app/components/button';
import {Description} from '@app/components/layout-onBoarding/layout-onBoarding-components';
import Icon from '@app/components/icon';
import {useNavigate} from 'react-router-dom';
import gtag from 'ga-gtag';

// import FormHeader from './FormHeader';
/**
 * Renders Component.
 * @return {questionScreen} renders Component.
 */
export default function firstScreen() {
  const navigate = useNavigate();
  return (
    <MainContainer bgColor="#F8F5F0" className="flx-start">

      <Header hideBackArrow={false} navigateLink="/" hideLogo={true} className="bg-white" homeLink={true} />
      {/* <Header className="txt-left" desktopMenu={false} hideBack={true}/> */}
      {/* <FormHeader /> */}
      {/* <Header navigateLink="/" hideLogo={true} className="bg-white" /> */}
      <ScrollSection id="scrollable-div" className={isMobile?'flex-1 flex-unset mb-64':'flex-1 flex-unset'}>

        <DesktopWidth className={isMobile ? ' m-auto' : 'w-1150 m-auto h-100 pos-rel'} >

          <div className='d-flex flex-1 form-page-intro' >
            <FirstScreen className=' p-24'>
              <FilterHeading className="font values " >
Complete our quiz to see where you lie on the <span style={{backgroundColor: '#E9DCCE'}}> Spectrum of Health</span>
              </FilterHeading>
              <BackgroundImage className="image" >
                <div className='arrow-position' >
                  <Icon name='uparrow'/>
                </div>
              </BackgroundImage>

              <Description className='alignss f-16s p-0'>A tool that shows you how your health is progressing (or regressing), and what that means. We'll also provide a personalized recommendation based on where you stand.</Description>
              {/* <div className={isMobile ? ' ' : 'd-flex  pt-30  '}> */}
              <ButtonContainer>
                <Button variant={'primary'} size='large' width={isMobile?'15%':'180px'} onClick={() => {
                  gtag('event', 'Health spectrum started', {
                    'event_category': 'submit',
                  });
                  navigate('/health-spectrum');
                }} >Take quiz</Button>
                <div className='d-flex gap-8'>  <Icon name='clock'/> <span className='takes'>Takes 2 minutes</span></div>
              </ButtonContainer>


            </FirstScreen>
          </div>
        </DesktopWidth>
      </ScrollSection>
    </MainContainer>
  );
}
