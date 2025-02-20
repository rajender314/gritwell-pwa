/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React from 'react';
import apiEndpoint from '@app/core/apiend_point';
import {setLocalStorage} from '@app/core/localStorageService';
import {ApiResponseProps, PayloadProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import {useEffect, useState} from 'react';
import {DesktopWidth, Link, Loader, MainContainer} from '../../../styles/common-styles';
import LayoutOnBoarding from '@app/components/layout-onBoarding';
import Button from '@app/components/button';
import {FooterButtons, MainSection, MenuItems, ScrollSection}
  from './boarding-screen-components';
import {useNavigate} from 'react-router-dom';
import {appBackgroundColor, secondaryBackgroundColor,
  whiteColor} from '@app/styles';
import {HeaderMain} from '@app/components/header/header-components';
import Icon from '@app/components/icon';
import {BodyText2, IconsContainer} from
  '@app/modules/assesment-questions/assesment-questions-components';
import {isMobile} from 'react-device-detect';
import axios from 'axios';
import Spinner from '@app/components/icon/icons/loader';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';

/**
 * Renders Component.
 * @return {BoardingScreen} renders Component.
 */
export default function BoardingScreen() {
  const bgColors =[appBackgroundColor, whiteColor,
    secondaryBackgroundColor];

  const [onBoardingData, updateOnBoardingData] = useState([]);
  const [screenState, setScreenState] = useState(0);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    setScreenState(0);
    guestLogin();
    Mixpanel.track(service['boardingScreen']['title'], service['boardingScreen']['props']);
    gtag('event', gaService['boardingScreen']['title'], {
      'event_category': gaService['boardingScreen']['category'],
    });
  }, []);
  const d = new Date();
  const offset = d.getTimezoneOffset();
  function guestLogin() {
    axios({
      url: process.env.REACT_APP_API_URL + 'guestLogin',
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic R3JpdHdlbGwtQ29yZTpablhaOXB0WEhiNzdwaE9KYkdVcQ=='},
      data: `username=guest@gwc.com&password=Enter@123&offset=${offset}`,
    })
        .then(function(response: any) {
          if (response.status == 200) {
            getBoardingData(response.data.token);
            setLocalStorage('guestToken', response.data.token);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
  }

  /**
   * @param {from} token to the function
   * get Boarding JSON from the API.
   *  */
  async function getBoardingData(token:any) {
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.getBoardingDataAPI,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            updateOnBoardingData(response.data);
            setLoader(false);
          }
        },
        );
  }
  return (
    <>
      {loader ? <Loader>
        <Spinner size="6px" />
      </Loader> : null}
      {!loader ?<MainContainer className={isMobile ? 'fxh-100' : ''} bgColor={bgColors[screenState]}>
        {isMobile ? <HeaderMain className={isMobile ? 'text-center d-flex js-bet p-10' :'text-center d-flex js-bet'}>
          <div className='d-flex'>
            {screenState > 0 ?<IconsContainer className='d-flex mrt-6'
              onClick={()=>{
                setScreenState(screenState - 1);
              }}>
              <Icon name={'backArrow'} />
            </IconsContainer> : null}
            <IconsContainer className='flex-1'
              color='black'
              onClick={() => setScreenState(0)
              }>
              <Icon name='headerLogo' />
            </IconsContainer>
          </div>
          <div>
            <BodyText2>
              <Link onClick={()=>navigate('/sign-up')}
                className="tx-n f-17"> Log in</Link>
            </BodyText2>
          </div>
        </HeaderMain> :
         <HeaderMain className='text-center' >
           <IconsContainer className='flex-1'
             color='black' onClick={() => setScreenState(0)
             }>
             <Icon name='headerLogo' />
           </IconsContainer>
           <MenuItems className='gap-10'>
             <Button variant={'primary'}
               width='auto'
               className={'header-btn'}
               onClick={()=>{
                 navigate('/assesment');
                 Mixpanel.track(action['boardingScreen']['signup']['title'], action['boardingScreen']['signup']['props']);
                 gtag('event', gaAction['boardingScreen']['signup']['title'], {
                   'event_category': gaAction['boardingScreen']['signup']['category'],
                 });
               }}
             >Sign up</Button>
             {/* <Button variant={'secondary'}
               width='auto'
               className={'header-btn mlt-15'}
               onClick={()=>{
                 navigate('/sign-in');
               }}
             >Log In</Button> */}
             <BodyText2 className='mlt-40'>
               <Link onClick={()=>{
                 navigate('/sign-up');
                 Mixpanel.track(action['boardingScreen']['login']['title'], action['boardingScreen']['login']['props']);
                 gtag('event', gaAction['boardingScreen']['login']['title'], {
                   'event_category': gaAction['boardingScreen']['login']['category'],
                 });
               }}
               className="tx-n f-17"> Log in</Link>
             </BodyText2>
           </MenuItems>
         </HeaderMain>}
        <ScrollSection id="scrollable-div" className={isMobile ? 'flex-1 mb-64 scroll-h' : 'flex-1'}>
          <DesktopWidth className={isMobile? 'pos-rel': 'pos-rel mt-40'}>
            <>
              {screenState > 0 && !isMobile ?<IconsContainer className='d-flex icn-bck'
                onClick={()=>{
                  setScreenState(screenState - 1);
                  Mixpanel.track(action['boardingScreen']['back']['title'], action['boardingScreen']['back']['props']);
                  gtag('event', gaAction['boardingScreen']['back']['title'], {
                    'event_category': gaAction['boardingScreen']['back']['category'],
                  });
                }}>
                <Icon name={'chervonLeft'} />
              </IconsContainer> : null}
              <MainSection className={'r-border pb-0 l-'+ screenState}>
                {onBoardingData.length ? <LayoutOnBoarding
                  layoutData={onBoardingData[screenState ? screenState : 0]} >
                </LayoutOnBoarding> : null}
                {!isMobile ?<div className={screenState === 2 ? 'd-flex js-end pad-30 pb-15' : 'd-flex js-bet pad-30 pb-15'}>
                  <Button variant={screenState < (onBoardingData.length - 1)?
            'secondary' : 'primary'} width={'25%'}
                  onClick={()=>{
                    navigate('/assesment');
                    Mixpanel.track(action['boardingScreen']['getStarted']['title'], action['boardingScreen']['getStarted']['props']);
                    gtag('event', gaAction['boardingScreen']['getStarted']['title'], {
                      'event_category': gaAction['boardingScreen']['getStarted']['category'],
                    });
                  }}
                  >Get Started</Button>
                  {screenState < (onBoardingData.length - 1) ?
         <Button variant={ 'primary'} width={'25%'}
           onClick={() => {
             const myDiv = document.getElementById('scrollable-div');
             myDiv.scrollTop = 0;
             setScreenState(screenState + 1);
           }}
         >{'Learn more'}</Button>: null}
                </div> : null}

              </MainSection>
            </>

          </DesktopWidth>
        </ScrollSection>
        {isMobile ? <DesktopWidth className='w-100 fixed-footer h-64 max-h-64 br-tp'bgColor={bgColors[screenState]}>
          <>
            <FooterButtons bgColor={bgColors[screenState]} className={screenState === 2 ? 'flx-end' : ''}
            >
              <Button variant={screenState < (onBoardingData.length - 1)?
            'secondary' : 'primary'}
              size='large' width='100%'
              onClick={()=>{
                navigate('/assesment');
                Mixpanel.track(action['boardingScreen']['getStarted']['title'], action['boardingScreen']['getStarted']['props']);
                gtag('event', gaAction['boardingScreen']['getStarted']['title'], {
                  'event_category': gaAction['boardingScreen']['getStarted']['category'],
                });
              }}
              >Get Started</Button>
              {screenState < (onBoardingData.length - 1) ?
         <Button variant={isMobile ? 'primary' : 'secondary'} size='large' width='100%'
           onClick={() => {
             const myDiv = document.getElementById('scrollable-div');
             myDiv.scrollTop = 0;
             setScreenState(screenState + 1);
           }}
         >{'Learn more'}</Button>: null}
            </FooterButtons>

          </>
        </DesktopWidth> : null}


      </MainContainer>: null}
    </>
  );
}
