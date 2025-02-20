/* eslint-disable max-len */
import Button from '@app/components/button';
import Header from '@app/components/header';
import CommonInput from '@app/components/input';
import {Description, IconsContainer} from
  '@app/components/layout-onBoarding/layout-onBoarding-components';
import {whiteColor} from '@app/styles';
import {MainContainer, DesktopWidth,
  Heading3, BottomChat} from '@app/styles/common-styles';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Error} from '@app/styles/common-styles';

import {LoginContainer, LoginTabContainer, Footer}
  from './account-access-components';
import apiEndpoint from '@app/core/apiend_point';
import {PayloadProps, ApiResponseProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import axios from 'axios';
import {forgotProps} from '@app/utils/props';
import CommonSnackbar from '@app/core/snackbar';
import {emailPattern} from '@app/core/pattern';
import {createSearchParams, useLocation, useNavigate} from 'react-router-dom';
import Icon from '@app/components/icon';
import {isMobile} from 'react-device-detect';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';
import {Actions, BackBtnContainer, BackIconContainer, ImageContainer, ImageHolder, LayoutWrapper, LeftContainer, LogoWrapper, RightContainer, RightContent} from './signup.components';

/**
 * Renders Component.
 * @return {SignUp} renders Component.
 */
export default function ForgotPassword() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [, updateLabels] = useState(['Forgot your password']);
  const [, setTab] = useState('Forgot your password');
  const {handleSubmit, register, formState: {errors}} = useForm();
  const [guestToken, setGuestToken] = useState();
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const [infoMsg, setInfoMsg] = useState<string>('');
  const [showSectionMsg, setShowSectionMsg] = useState(false);
  const [apperance, setApperance] = useState('success');
  const [isSubmiting, setIsSubmiting] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    updateLabels([searchParams.get('label') ?
     searchParams.get('label') :'Forgot your password']);
    setTab(searchParams.get('label') ? searchParams.get('label') :
     'Forgot your password' );
    guestLogin();
    setIsSubmiting(false);
    Mixpanel.track(service['forgotPassword']['title'],
        service['forgotPassword']['props']);
    gtag('event', gaService['forgotPassword']['title'], {
      'event_category': gaService['forgotPassword']['category'],
    });
  }, []);
  /**
   * get Boarding JSON from the API.
   *  */
  function guestLogin() {
    axios({
      url: process.env.REACT_APP_API_URL + apiEndpoint.guestLogin,
      method: 'POST',
      // eslint-disable-next-line max-len
      headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic R3JpdHdlbGwtQ29yZTpablhaOXB0WEhiNzdwaE9KYkdVcQ=='},
      data: `username=guest@gwc.com&password=Enter@123&offset=${offset}`,
    })
        .then(function(response: any) {
          if (response.status == 200) {
            setGuestToken(response.data.token);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
  }
  /**
   * get Boarding JSON from the API.
   * @param {forgotProps} data in the.
   *  */
  function onSubmit(data: forgotProps) {
    if (isSubmiting) {
      return;
    }
    setIsSubmiting(true);
    const apiObject: PayloadProps = {
      payload: {
        email: data.email,
      },
      method: 'POST',
      apiUrl: searchParams.get('label')? apiEndpoint.reSendEmailVerification:
       apiEndpoint.forgotApi,
      headers: {Authorization: guestToken},
    };

    triggerApi(apiObject)
        .then((res: ApiResponseProps) => {
          if (res.status_code == 200) {
            setApperance('success');
            setInfoMsg(res.data.message ? res.data.message : res.message);
            setShowSectionMsg(true);
            setIsSubmiting(false);
            setTimeout(() => {
              // eslint-disable-next-line max-len
              window.location.replace(process.env.REACT_APP_HOMEPAGE +'sign-in');
            }, 1500);
          } else {
            setApperance('error');
            setInfoMsg(res.data.message ? res.data.message : res.message);
            setShowSectionMsg(true);
            setIsSubmiting(false);
          }
        })
        .catch((err: object) => {
          console.log(err, 'Error');
        });
  }
  const handleChange =(e:any)=>{
    // console.log(e);
  };
  return (
    <>
      <CommonSnackbar
        title="Error"
        appearance={apperance}
        message={infoMsg}
        open={showSectionMsg}
        close={() => setShowSectionMsg(false)}
      />
      <MainContainer style={{display: 'none'}} bgColor={whiteColor}>
        <div className='signupScreen'>
          {isMobile ? <Header hideBackArrow={false} bgCol={isMobile ? '' : '#e9dcce66'} hideLogo={true} hideBack={true} /> : ''}
          {isMobile ? '' : <div className='d-flex jc-center partitionDiv w-50'>
            <div>
              <div style={{position: 'absolute', left: '44px', top: '24px'}}>
                <Icon name="headerLogo" />
              </div>
              <Icon name='gritwellLogo'/>
            </div>
          </div>}
          {/* <Header/> */}
          <LoginContainer className={isMobile ? 'd-flex jc-center w-100' : 'w-50 d-flex jc-center'}>
            <DesktopWidth className={'desktopStyles ' + (isMobile? '': 'mt-40')}>
              <LoginTabContainer className={isMobile ? 'py-40 pt-60 pos-rel' :
              'pt-90 pos-rel' }>
                <IconsContainer className={isMobile ?
             'w-40 b-0 mb-10 pointer' : 'mt-10 pointer '}
                style={{borderColor: 'transparent', top: '0', left: '0'}}
                onClick={()=>{
                  navigate('/sign-up');
                  Mixpanel.track(action['forgotPassword']['back']['title'],
                      action['forgotPassword']['back']['props']);
                  gtag('event', gaAction['forgotPassword']['back']['title'], {
                    'event_category': gaAction['forgotPassword']['back']['category'],
                  });
                }}>
                  <Icon name={'chervonLeft'} />
                </IconsContainer>
                <Heading3 className='txt-left f-24'>
                  {searchParams.get('label') ? ' Activate your email' :
                ' Forgot your password'}</Heading3>
                <Description className={isMobile? 'mt-20': 'mt-20'}>
                  {('Enter your email address and'+
                ' we’ll send a link to')+(searchParams.get('label') ?
                ' activate your email' :' reset your password.')}</Description>
                <form onSubmit={handleSubmit(onSubmit)} onChange={handleChange}
                  className='pb-30'>
                  <div className='pos-rel pb-28'>
                    <CommonInput type='text' name='email'
                      placeholder='Email'
                      iconName='email'
                      register={register('email', {required: true,
                        // eslint-disable-next-line max-len
                        pattern: emailPattern})} />
                    {errors.email &&
            <Error>Enter Valid Email Address.</Error>}

                  </div>
                  <Footer>
                    <Button variant={isSubmiting ? 'disabled' : 'primary'}
                      type="submit"
                      //   isLoading={props.isDisable}
                      size='large' width='100%'
                      className={isMobile?'' : 'mt-20'}
                      onClick={()=>{
                        Mixpanel.track(action['forgotPassword']['send']['title'],
                            action['forgotPassword']['send']['props']);
                        gtag('event', gaAction['forgotPassword']['send']['title'], {
                          'event_category': gaAction['forgotPassword']['send']['category'],
                        });
                      }}
                    >Send a link</Button>
                  </Footer>
                </form>
              </LoginTabContainer>
            </DesktopWidth>
            <BottomChat> <div
              className="d-flex"
              onClick={()=>{
                navigate({
                  pathname: '/open-chat',
                  search:
              // eslint-disable-next-line max-len
              `?${createSearchParams({hide: 'true'})}`,
                });
              }}
            >
              <Icon name="textMessage" />
            </div></BottomChat>
          </LoginContainer>
        </div>
      </MainContainer>

      <LayoutWrapper>
        <LeftContainer>
          <LogoWrapper>
            {isMobile ? <BackBtnContainer>
              <BackIconContainer onClick={() => navigate('/sign-in')}>
                <Icon name='backarrow'/>
              </BackIconContainer>
            </BackBtnContainer> : <Icon name="headerLogo" />}
          </LogoWrapper>
          <ImageContainer>
            <ImageHolder className='has-svg'>
              <Icon name='gritwellLogo'/>
            </ImageHolder>
          </ImageContainer>
        </LeftContainer>
        <RightContainer style={{backgroundColor: '#F8F5F0'}}>
          <RightContent>
            <div className="content-wrapper p-0">
              {!isMobile && <BackBtnContainer className='p-40 pb-24'>
                <BackIconContainer onClick={() => navigate('/sign-in')}>
                  <Icon name='backarrow'/>
                </BackIconContainer>
              </BackBtnContainer>}
              <Heading3 className={'txt-left  f-24 ' + (isMobile?'p-24':'px-40')}>
                {searchParams.get('label') ? ' Activate your email' :
                ' Forgot your password'}</Heading3>
              <Description className={isMobile? 'm-0 mb-24 px-24': 'mt-20 mb-24 px-40'}>
                {('Enter your email address and'+
                ' we’ll send a link to')+(searchParams.get('label') ?
                ' activate your email' :' reset your password.')}</Description>
              <form onSubmit={handleSubmit(onSubmit)} onChange={handleChange}
                className={isMobile?'pb-30 px-24':'pb-30 px-40'}>
                <div className='pos-rel pb-28' style={{flex: '1 1 0%', overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
                  <CommonInput type='text' name='email'
                    placeholder='Email'
                    iconName='email'
                    register={register('email', {required: true,
                      // eslint-disable-next-line max-len
                      pattern: emailPattern})} />
                  {errors.email &&
            <Error>Enter Valid Email Address.</Error>}

                </div>
                <Actions>
                  <Button variant={isSubmiting ? 'disabled' : 'primary'}
                    type="submit"
                    //   isLoading={props.isDisable}
                    size='large' width='100%'
                    className={'responsive-btn'}
                    onClick={()=>{
                      Mixpanel.track(action['forgotPassword']['send']['title'],
                          action['forgotPassword']['send']['props']);
                      gtag('event', gaAction['forgotPassword']['send']['title'], {
                        'event_category': gaAction['forgotPassword']['send']['category'],
                      });
                    }}
                  >Send a link</Button>
                </Actions>
              </form>
            </div>
          </RightContent>
        </RightContainer>
      </LayoutWrapper>
    </>
  );
}
