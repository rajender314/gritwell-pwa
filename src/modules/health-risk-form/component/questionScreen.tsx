/* eslint-disable max-len */
import Header from '@app/components/header/header';
import {Description} from '@app/components/layout-onBoarding/layout-onBoarding-components';
import {ContentContainer} from '@app/modules/assesment-questions/assesment-questions-components';
import {ScrollSection} from '@app/modules/boarding-screens/component/boarding-screen-components';
import {DesktopWidth, Heading, MainContainer} from '@app/styles/common-styles';
import React from 'react';
import {isMobile} from 'react-device-detect';
import Button from '@app/components/button';
import {OptionDivs, Options} from './quitz-component';
/**
 * Renders Component.
 * @return {questionScreen} renders Component.
 */
export default function questionScreen() {
  return (
    <MainContainer bgColor="#F8F5F0" className="flx-start">

      {!isMobile ? <Header hideBackArrow={false} navigateLink="/" hideLogo={true} className="bg-white" /> : null}

      <ScrollSection id="scrollable-div" className={isMobile?'flex-1 flex-unset mb-64':'flex-1 flex-unset'}>

        <DesktopWidth className={isMobile ? ' m-auto' : 'w-1150 m-auto'} >
          <ContentContainer
            bgColor={'transparent'}
            className={isMobile ? ' ' : 'py-0 plr-75'}
          >


            <Heading className='quitz'> Do you have any of the following symptoms?</Heading>
            <Description className='f-18'>
                We`ll explain why we consider these chronic syptoms when you get your results.
            </Description>
            <OptionDivs style={{paddingTop: '20px'}} className='fl-1'>
              <Options className='b-c  ' >
                <div >
                  <input type={'checkbox'} />
                  <label>Insomnia</label>
                </div>
              </Options>
              <Options className='b-c  ' >
                <div >
                  <input type={'checkbox'} />
                  <label>Insomnia</label>
                </div>
              </Options>
              <Options className='b-c  ' >
                <div >
                  <input type={'checkbox'} />
                  <label>Insomnia</label>
                </div>
              </Options>

            </OptionDivs>
            <OptionDivs>

            </OptionDivs>
            <div className=' d-flex  pt-30  '>
              <Button variant={'primary'} size='large' width='15%'>Continue</Button>
            </div>


          </ContentContainer>
        </DesktopWidth >  </ScrollSection>
    </MainContainer>
  );
}
