/* eslint-disable max-len */
import Header from '@app/components/header/header';
import {ScrollSection} from '@app/modules/boarding-screens/component/boarding-screen-components';
import {DesktopWidth, Heading, MainContainer} from '@app/styles/common-styles';
import React from 'react';
import {isMobile} from 'react-device-detect';
// import IBS from './PNGimg/IBS.png';
// import Button from '@app/components/button';
import {Filtercontainer, FilterQuiz, ImageDiv, Imscontainer, OptionDivs, Options, Quitzcontainer} from './quitz-component';
/**
 * Renders Component.
 * @return {Imagequestion} renders Component.
 */
export default function Imagequestion() {
  return (
    <MainContainer bgColor="#F8F5F0" className="flx-start">

      {!isMobile ? <Header hideBackArrow={false} navigateLink="/" hideLogo={true} className="bg-white" /> : null}

      <ScrollSection id="scrollable-div" className={isMobile?'flex-1 flex-unset mb-64':'flex-1 flex-unset'}>

        <DesktopWidth className={isMobile ? ' m-auto' : 'w-1150 m-auto  '} >

          <Filtercontainer className='container'>
            <FilterQuiz className='gp-2'>
              <div>
                <Imscontainer>

                </Imscontainer>
                <ImageDiv>  <img src={''} alt="User" className='b-i' /></ImageDiv></div>
              < Quitzcontainer>
                <Heading className='quitz'> Do you have a diagnosed condition?</Heading>
                <OptionDivs className='colum' >
                  <Options className='b-c   ' >
                    <div >
                      <input type={'radio'} />
                      <label>Insomnia</label>
                    </div>
                  </Options>
                  <Options className='b-c  ' >
                    <div >
                      <input type={'radio'} />
                      <label>Insomnia</label>
                    </div>
                  </Options>


                </OptionDivs>
                {/* <div className='  d-flex  pt-30  '>
                  <Button variant={'primary'} size='large' width='25%'>Continue</Button>
                </div> */}
              </Quitzcontainer>
            </FilterQuiz>
          </Filtercontainer>

        </DesktopWidth >

      </ScrollSection>
    </MainContainer>
  );
}
