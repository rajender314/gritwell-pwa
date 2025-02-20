import React, {useEffect, useState} from 'react';
import {DesktopWidth, MainContainer} from '@app/styles/common-styles';
import {whiteColor} from '@app/styles';
import Icon from '@app/components/icon';
import {
  LocationContainer,
  LoginTabContainer,
  SignContainer} from './account-access-components';
import {isMobile} from 'react-device-detect';
import Button from '@app/components/button';
import {createSearchParams, useNavigate} from 'react-router-dom';
import {PayloadProps, ApiResponseProps} from '@app/schema/schema';
import apiEndpoint from '@app/core/apiend_point';
import {triggerApi} from '@app/services';
import {clearLocalStorage,
  getLocalStorage} from '@app/core/localStorageService';
import {Actions,
  BackBtnContainer,
  BackIconContainer,
  // BackBtnContainer,
  // BackIconContainer,
  ImageContainer,
  ImageHolder,
  LayoutWrapper,
  LeftContainer,
  LocationOptions,
  LogoWrapper,
  RightContainer,
  RightContent,
  TextContent,
} from './signup.components';
import {BackDrop,
  ExpectationContainer,
  IconsContainer,
} from '@app/modules/assesment-questions/assesment-questions-components';
import {HeaderMain} from '@app/components/header/header-components';

export type Menu = {
    label: string;
    key: string;
  };
/**
 * Renders Component.
 * @return {LocationDisclaimer} renders Component.
 */
export default function LocationDisclaimer() {
  const [selectedTab, setSelectedTab] = useState<any>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const token = getLocalStorage('token') ? getLocalStorage('token') : '';
  const [showPopup, setShowPopup] = useState(false);
  const menuItems = [
    {
      label: 'Yes, I am.',
      key: 'yes',
    },
    {
      label: 'No, I am not.',
      key: 'no',
    }];
  useEffect(() => {
    getLocation();
  }, []);
  const getLocation = () =>{
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.getLocation,
      headers: {Authorization: token},
    };

    triggerApi(apiObject)
        .then((res: ApiResponseProps) => {
          if (res.status_code == 200) {
            setSelectedTab(res.data.located_at_ny_nj_ri === null ? '' :
            res.data.located_at_ny_nj_ri === true ?
               'yes' : 'no');
          }
        })
        .catch((err: object) => {
          console.log(err, 'Error');
        });
  };
  const onMenuClick = (menu: Menu) => {
    setSelectedTab(menu.key);
    console.log(menu.key);
  };
  const onSubmit = () => {
    localStorage.setItem('location', selectedTab);
    const apiObject: PayloadProps = {
      payload: {
        located_at_ny_nj_ri: selectedTab === 'yes' ? true : false,
      },
      method: 'POST',
      apiUrl: apiEndpoint.locationApi,
      headers: {Authorization: token},
    };

    triggerApi(apiObject)
        .then((res: ApiResponseProps) => {
          if (res.status_code == 200) {
            if (selectedTab === 'yes') {
              navigate({
                pathname: '/locationscreen/',
                search: `?${createSearchParams({
                  isLocation: 'true'})}`,
              });
            } else {
              navigate({
                pathname: '/locationscreen/',
                search: `?${createSearchParams({
                  isLocation: 'false'})}`,
              });
            }
          }
        })
        .catch((err: object) => {
          console.log(err, 'Error');
        });
    setIsSubmitting(true);
  };

  const logoutSession = () => {
    const apiObject: PayloadProps = {
      payload: {},
      method: 'Post',
      apiUrl: apiEndpoint.logOut,
      headers: {Authorization: token},
    };
    triggerApi(apiObject).then((response: ApiResponseProps) => {
      clearLocalStorage();
      navigate('/sign-in');
    });
  };
  return (
    <>
      <MainContainer bgColor={whiteColor} style={{display: 'none'}}>
        <div className='signupScreen'>
          <div className={isMobile ?
            'd-flex jc-center partitionDiv w-100 h-250' :
             'd-flex jc-center partitionDiv w-50'}>
            <div>
              <div style={{position: 'absolute', left: '44px', top: '24px'}}>
                {!isMobile && <Icon name="headerLogo" />}
              </div>
              <Icon name='gritwellLogo'/>
            </div>
          </div>
          <LocationContainer className={isMobile ?
            'd-flex jc-center w-100' : 'w-50 d-flex jc-center'}>
            <DesktopWidth>
              <SignContainer>
                <LoginTabContainer
                  className={isMobile ? 'z-2' : 'z-2 px-24 py-40 '}
                >
                  {/* <div className='pointer'
                  onClick={() => window.location.replace(webSitePage)}
                  style={{marginLeft: '-2.5rem', marginTop: '1rem'}}
                ><Icon name='backarrow'/> </div> */}
                  <span className='confText'>
                    Before we proceed, confirm your location.</span>
                  <h2 className='confMainText mt-16 mb-32'>
                    Are you located in NY, NJ or RI?</h2>
                  <div className='disclaimer' >
                    {menuItems && menuItems.map((menu: Menu, index: number) =>
                      <div key={`healthprofile_memu_${index}`}
                        className={selectedTab === menu.key ?
                        'disclainerItem active' :
                         'disclainerItem'}
                        onClick={() => {
                          onMenuClick(menu);
                        }} >
                        <Icon
                          name={selectedTab === menu.key ?
                         'menudoticon' : 'emptyCheckbox' }/>
                        {menu.label}
                      </div>)}
                  </div>
                  <div className='mr-24 ml-24 mt-40'>
                    <Button variant={isSubmitting || !selectedTab ?
                   'disabled' : 'primary'}
                    className='pt-30 mt-20'
                    type="submit"
                    onClick={onSubmit}
                    size='large' width='100%'
                    >Continue</Button>
                  </div>
                </LoginTabContainer>
              </SignContainer>
            </DesktopWidth>
          </LocationContainer>
        </div>
      </MainContainer>


      <LayoutWrapper>
        {isMobile && <HeaderMain className={isMobile ?
         'text-center d-flex js-bet p-10' :'text-center d-flex js-bet'}>
          <IconsContainer className='d-flex mrt-6' onClick={() => {
            setShowPopup(true);
          }
          }>
            <Icon name={'chervonLeft'} />
          </IconsContainer>
          <IconsContainer className='flex-1'
            color='black'
            onClick={() => (0)
            }>
            <Icon name='headerLogo' />
          </IconsContainer>
        </HeaderMain>}
        <LeftContainer>
          <LogoWrapper>
            {!isMobile &&
            // <BackBtnContainer>
            //   <BackBtnContainer>
            //     <BackIconContainer onClick={() => setShowPopup(true)}>
            //       <Icon name='backarrow'/>
            //     </BackIconContainer>
            //   </BackBtnContainer>
            // </BackBtnContainer> :
            <Icon name="headerLogo" />}
          </LogoWrapper>
          <ImageContainer>
            <ImageHolder className='has-svg'>
              <Icon name='gritwellLogo'/>
            </ImageHolder>
          </ImageContainer>
        </LeftContainer>
        <RightContainer style={isMobile ? {} : {backgroundColor: '#F8F5F0'}}>
          <RightContent>
            <div className="content-wrapper">
              {!isMobile && <BackBtnContainer className='pb-24'>
                <BackIconContainer onClick={() => setShowPopup(true)}>
                  <Icon name='backarrow'/>
                </BackIconContainer>
              </BackBtnContainer>}
              <TextContent className='p-0'>
                <span className='confText'>
                    Before we proceed, confirm your location.</span>
                <h2 className='confMainText'>
                    Are you located in NY, NJ or RI?</h2>
                <div>
                  {menuItems && menuItems.map((menu: Menu, index: number) =>
                    <LocationOptions style={{display: 'flex'}}
                      key={`healthprofile_memu_${index}`}
                      className={selectedTab === menu.key ?
                        'disclainerItem mb-20 pointer active' :
                         'disclainerItem mb-20 pointer'}
                      onClick={() => {
                        onMenuClick(menu);
                      }} >
                      <Icon
                        name={selectedTab === menu.key ?
                         'menudoticon' : 'emptyCheckbox' }/>
                      {menu.label}
                    </LocationOptions>)}
                </div>
              </TextContent>
              <Actions>
                <Button variant={isSubmitting || !selectedTab ?
                   'disabled' : 'primary'}
                className={'responsive-btn'}
                type="submit"
                onClick={onSubmit}
                size='large' width='100%'
                >Continue</Button>
              </Actions>
            </div>
          </RightContent>
        </RightContainer>
      </LayoutWrapper>
      {showPopup && <>
        <BackDrop>
          <ExpectationContainer style={{width: '430px'}}>
            <div className='state_alert'>
              <div className='alertMainText d-flex'>
                <Icon name='warningicon'/>
                <div className='exprectInfo' style={{fontSize: '22px'}}>
                Would you like to logout?</div>
                {/* <h4 style={{margin: '0'}}>Alert</h4> */}
              </div>
              {/* <div className='pointer' onClick={() => setShowPopup(false)}>
                <Icon name='closeIcon'/>
              </div> */}
            </div>
            <Actions style={{flexDirection: 'row-reverse'}}>
              <Button variant={'primary'}
                className={'responsive-small-btn'}
                type="submit"
                onClick={logoutSession}
                size='large' width='100%'
              >Yes</Button>
              <Button variant={'secondary'}
                className={'responsive-small-btn'}
                type="submit"
                onClick={() => setShowPopup(false)}
                size='large' width='100%'
              >Cancel</Button>
            </Actions>
          </ExpectationContainer>
        </BackDrop>
      </>}
    </>
  );
}
