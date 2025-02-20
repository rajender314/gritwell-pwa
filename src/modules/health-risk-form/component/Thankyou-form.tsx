/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import React from 'react';
import Header from '@app/components/header/header';
import {ScrollSection}
  from '@app/modules/boarding-screens/component/boarding-screen-components';
import {DesktopWidth, Loader, MainContainer} from '@app/styles/common-styles';
import {isMobile} from 'react-device-detect';
import {ButtonContainer, FilterHeading, FirstScreen} from './quitz-component';
import Button from '@app/components/button';
import {getLocalStorage} from '@app/core/localStorageService';
import Spinner from '@app/components/icon/icons/loader';
// import FormHeader from './FormHeader';
/**
 * Renders Component.
 * @return {questionScreen} renders Component.
 */
export default function ThankYou() {
  const getRedirectUrl=()=>{
    const redirectUrl = getLocalStorage('webreUrl') ? getLocalStorage('webreUrl') : '';
    window.location.replace(redirectUrl);
  };
  return (
    <MainContainer bgColor="#F8F5F0" className="flx-start">
      <Loader>
        <Spinner size="6px" />
      </Loader>
      {<div style={{display: 'none'}}><>
        {isMobile ? <Header hideBackArrow={false} navigateLink="/" hideLogo={true} className="bg-white" hideBack={true} /> :<Header hideBackArrow={false} navigateLink="/" hideLogo={true} className="bg-white"/> }
        <ScrollSection id="scrollable-div" className={isMobile?'flex-1 flex-unset mb-64':'flex-1 flex-unset'}>

          <DesktopWidth className={isMobile ? ' m-auto' : 'w-1150 m-auto'} >

            <div className='d-flex flex-1 form-page-intro' style={{maxWidth: '750px'}} >
              <FirstScreen className=' p-24'>
                <FilterHeading className="font values " >
              Thank you for filling out the form.
              Please click on below button to see your results.
                </FilterHeading>
                <ButtonContainer className='py-24' >
                  <Button variant={'primary'} size='medium' width='180px'
                    onClick={() => getRedirectUrl()} >View results</Button>
                  {/* <Link onClick={() => {
                  navigate('/home');
                }}>back to home</Link> */}
                </ButtonContainer>


              </FirstScreen>
            </div>
          </DesktopWidth>
        </ScrollSection>
      </> </div>}
    </MainContainer>
  );
}
