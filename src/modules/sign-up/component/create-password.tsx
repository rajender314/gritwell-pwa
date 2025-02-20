/* eslint-disable max-len */
import Button from '@app/components/button';
import Header from '@app/components/header';
import CommonInput from '@app/components/input';
import Tabs from '@app/components/tabs';
import apiEndpoint from '@app/core/apiend_point';
// import CommonSnackbar from '@app/core/snackbar';
import {PayloadProps, ApiResponseProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import {whiteColor} from '@app/styles';
import {MainContainer, DesktopWidth, PageCenter, Heading, Heading3} from '@app/styles/common-styles';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate, useParams} from 'react-router-dom';
import {Error} from '@app/styles/common-styles';

import {Footer, IconTag, LoginContainer, LoginTabContainer}
  from './account-access-components';
import {recoveryProps} from '@app/utils/props';
import {lowerCasePattern, minLenPattern, numberPattern, passwordPattern, specialPattern, upperCasePattern} from '@app/core/pattern';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';
import {BadgeContainer, BadgeLabel, BadgeRow} from '@app/modules/home/home-components';
import Icon from '@app/components/icon';
import {IconsContainer} from '@app/modules/assesment-questions/assesment-questions-components';
import {ContentContainer} from '@app/components/layout-onBoarding/layout-onBoarding-components';
import CommonSnackbar from '@app/core/snackbar';
import {LayoutWrapper, LeftContainer, LogoWrapper, ImageContainer, ImageHolder, RightContainer, RightContent, Actions} from './signup.components';

/**
 * Renders Component.
 * @return {SignUp} renders Component.
 */
export default function CreatePassword() {
  const {handleSubmit, register, formState: {errors}} = useForm();
  const Labels = ['Create Password'];
  const [selectedTab, setTab] = useState('Create Password');
  const {id}: any = useParams();
  const {type}: any = useParams();
  const [noRecovery, setNoRecovery] = useState(false);
  const [guestToken, setGuestToken] = useState();
  const [pVale, setPvalue] = useState('');
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const [showPassword, setShowPassword] = useState(false);
  const [confPassword, setConfPassword] = useState(false);
  const [confirmPass, setConfirmPass] = useState(false);
  const [showSectionMsg, setShowSectionMsg] = useState(false);
  // const [infoMsg, setInfoMsg] = useState<string>('');
  // const [showSectionMsg, setShowSectionMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  // const [apperance, setApperance] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    guestLogin();
    setIsSubmitting(false);
    Mixpanel.track(service['createPassword']['title'],
        service['createPassword']['props']);
    gtag('event', gaService['createPassword']['title'], {
      'event_category': gaService['createPassword']['category'],
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
          // alert(2)
          if (response.status == 200) {
            setGuestToken(response.data.token);
            setTimeout(() => {
              verifyToken(response.data.token);
            }, 100);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
  }
  /**
   * get Boarding JSON from the API.
   * @param {string} data from the
   *  */
  function verifyToken(data: string) {
    const apiObject: PayloadProps = {
      payload: {
        token_id: id,
        type: type,
      },
      method: 'POST',
      apiUrl: apiEndpoint.verifyTokenApi,
      headers: {Authorization: data},
    };

    triggerApi(apiObject)
        .then((res: ApiResponseProps) => {
          if (res.status_code && res.status_code == 200) {
            setNoRecovery(false);
          } else if (res.status_code && res.status_code == 402) {
            setNoRecovery(true);
            // setApperance('error');
            // setInfoMsg(res.message);
            // setShowSectionMsg(true);
          }
        })
        .catch((err: object) => {
          // history.replace('/sign-in');
        });
  }
  /**
   * get Boarding JSON from the API.
   * @param {recoveryProps} data from the
   *  */
  function onSubmit(data: recoveryProps) {
    if (isSubmitting) {
      return;
    }
    if (data.password !== data.confirmPassword && data.confirmPassword.length) {
      console.log(data.confirmPassword.length);
      setConfirmPass(true);
      // setApperance('error');
      setErrorMsg('Password and Confirm Password does not match');
      // setShowSectionMsg(true);
      return;
    } else {
      setConfirmPass(false);
      setErrorMsg('');
    }
    setIsSubmitting(true);
    const apiObject: PayloadProps = {
      payload: {
        token_id: id,
        password: data.password,
        confirm_password: data.confirmPassword,
        type: type,
      },
      method: 'POST',
      apiUrl: apiEndpoint.resetPasswordApi,
      headers: {Authorization: guestToken},
    };

    triggerApi(apiObject)
        .then((res: ApiResponseProps) => {
          // setIsSubmiting(false);
          if (res.status_code == 200) {
            setShowSectionMsg(true);
            // setApperance('success');
            // setInfoMsg(res.message);
            setTimeout(() => {
              navigate('/sign-in');
              location.reload();
            }, 1500);
            // setRecoveryShowSectionMsg(true);
            setTimeout(() => {
              //   clearLocalStorage();
              //   setRecoveryShowSectionMsg(false);
              navigate('/sign-in');
              window.location.reload();
              setIsSubmitting(false);
            }, 1000);
          } else {
            setConfirmPass(true);
            setErrorMsg('New password cannot be same as the current  password.');
            // setApperance('error');
            // setInfoMsg(res.message);
            // setShowSectionMsg(true);
            setIsSubmitting(false);
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
      {/* <CommonSnackbar
        title="Error"
        appearance={apperance}
        message={infoMsg}
        open={showSectionMsg}
        close={() => setShowSectionMsg(false)}
      /> */}
      <CommonSnackbar
        title="Error"
        appearance={'success'}
        message={'Password has been updated successfully'}
        open={showSectionMsg}
        close={() => setShowSectionMsg(false)}
      />
      <MainContainer bgColor={whiteColor} style={{display: 'none'}}>
        <Header hideBackArrow={false}/>
        {noRecovery ? <PageCenter>
          <DesktopWidth>
            <ContentContainer className='warning-message'>
              <Heading>Your verification link expired.</Heading>
              <p>Please click on “Forgot password” on the log in screen to receive a new link.</p>
            </ContentContainer>
            <ContentContainer className='button-container'>
              <Button variant={'primary'}
                size='large' width='100%'
                onClick={()=>{
                  navigate('/sign-up');
                  Mixpanel.track(action['verifyEmail']['logIn']['title'],
                      action['verifyEmail']['logIn']['props']);
                  gtag('event', gaAction['verifyEmail']['logIn']['title'], {
                    'event_category': gaAction['verifyEmail']['logIn']['category'],
                  });
                }}
              >Login</Button>
            </ContentContainer>
          </DesktopWidth>
        </PageCenter> : <LoginContainer>
          <DesktopWidth>
            <LoginTabContainer>
              <Tabs
                type='secondary'
                labels={Labels}
                onClick={(tab:any)=>{
                  setTab(tab);
                }}
                selectedLabel={selectedTab}
              />
              <form onSubmit={handleSubmit(onSubmit)} onChange={handleChange}>
                <div className='pos-rel d-flex pb-30'>
                  <CommonInput type={showPassword ? 'text' : 'password'} placeholder='Password'
                    iconName='lock' className='w-100'
                    onKeyUp={(e) => {
                      setPvalue(e.target.value);
                    }}
                    register={register('password', {required: true,
                    // eslint-disable-next-line max-len
                      pattern: passwordPattern})} />
                  <IconTag onClick={() => setShowPassword(!showPassword)}>
                    <Icon name={showPassword ? 'openEye' : 'eye'} />
                  </IconTag>
                  {errors.password &&
          <Error>Enter Valid Password.</Error>}

                </div>
                <div className='pos-rel d-flex pb-30'>
                  <CommonInput type={confPassword ? 'text' : 'password'} placeholder='Confirm Password'
                    iconName='lock' className='w-100'
                    register={register('confirmPassword', {required: true})} />
                  <IconTag onClick={() => setConfPassword(!confPassword)}>
                    <Icon name={confPassword ? 'openEye' : 'eye'} />
                  </IconTag>
                  {/* {errors.password &&
          <Error>Enter Valid Password.</Error>} */}
                  {confirmPass ? <Error>{errorMsg}</Error> : null}

                </div>

                {pVale ? <BadgeContainer className='pos-unset mb-10' style={{marginTop: '16px'}}>
                  <BadgeLabel className='p-0'>Rules</BadgeLabel>
                  <BadgeRow className='ptb-10'>
                    <BadgeLabel>
            One Upper Case Letter
                    </BadgeLabel>
                    <IconsContainer
                      className={ pVale &&
              pVale.match(upperCasePattern) ?
              'completed w-16' : 'gray w-16'}>
                      <Icon name={'check'}/>
                    </IconsContainer>
                  </BadgeRow>
                  <BadgeRow className='ptb-10'>
                    <BadgeLabel>
            One Lower Case Letter
                    </BadgeLabel>
                    <IconsContainer className={ pVale &&
              pVale.match(lowerCasePattern) ?
              'completed w-16' : 'gray w-16'}>
                      <Icon name={'check'}/>
                    </IconsContainer>
                  </BadgeRow>
                  <BadgeRow className='ptb-10'>
                    <BadgeLabel>
            One Number
                    </BadgeLabel>
                    <IconsContainer className={ pVale &&
              pVale.match(numberPattern) ?
              'completed w-16' : 'gray w-16'}>
                      <Icon name={'check'}/>
                    </IconsContainer>
                  </BadgeRow>
                  <BadgeRow className='ptb-10'>
                    <BadgeLabel>
            One Special Character
                    </BadgeLabel>
                    <IconsContainer className={ pVale &&
              pVale.match(specialPattern) ?
              'completed w-16' : 'gray w-16'}>
                      <Icon name={'check'}/>
                    </IconsContainer>
                  </BadgeRow>
                  <BadgeRow className='ptb-10'>
                    <BadgeLabel>
            Minimum length of 8 characters
                    </BadgeLabel>
                    <IconsContainer className={ pVale &&
              pVale.match(minLenPattern) ?
              'completed w-16' : 'gray w-16'}>
                      <Icon name={'check'}/>
                    </IconsContainer>
                  </BadgeRow>
                </BadgeContainer> : null}
                <Footer className='mt-8'>

                  <Button variant={isSubmitting ? 'disabled': 'primary'}
                    type="submit"
                    //   isLoading={props.isDisable}
                    size='large' width='100%'
                    onClick={()=>{
                      Mixpanel.track(action['createPassword']['update']['title'],
                          action['createPassword']['update']['props']);
                      gtag('event', gaAction['createPassword']['update']['title'], {
                        'event_category': gaAction['createPassword']['update']['category'],
                      });
                    }}
                  >Update</Button>

                </Footer>
              </form>
            </LoginTabContainer>
          </DesktopWidth>
        </LoginContainer>}
      </MainContainer>

      <LayoutWrapper>
        <LeftContainer>
          <LogoWrapper>
            {/* {isMobile ? <BackBtnContainer>
              <BackIconContainer onClick={() => navigate('/sign-in')}>
                <Icon name='backarrow'/>
              </BackIconContainer>
            </BackBtnContainer> : <Icon name="headerLogo" />} */}
          </LogoWrapper>
          <ImageContainer>
            <ImageHolder className='has-svg'>
              <Icon name='gritwellLogo'/>
            </ImageHolder>
          </ImageContainer>
        </LeftContainer>
        <RightContainer style={{backgroundColor: '#F8F5F0'}}>
          <RightContent>
            {noRecovery ? <PageCenter className='h-100'>
              <DesktopWidth>
                <ContentContainer className='warning-message'>
                  <Heading>Your verification link expired.</Heading>
                  <p className='text-center' style={{fontSize: '15px'}}>Please click on “Forgot password” on the log in screen to receive a new link.</p>
                </ContentContainer>
                <ContentContainer className='button-container'>
                  <Actions className='mb-24'>
                    <Button variant={'primary'}
                      size='large' width='100%'
                      className={'responsive-Imbalance-btn'}
                      onClick={()=>{
                        navigate('/sign-in');
                        Mixpanel.track(action['verifyEmail']['logIn']['title'],
                            action['verifyEmail']['logIn']['props']);
                        gtag('event', gaAction['verifyEmail']['logIn']['title'], {
                          'event_category': gaAction['verifyEmail']['logIn']['category'],
                        });
                      }}
                    >Login</Button>
                  </Actions>
                </ContentContainer>
              </DesktopWidth>
            </PageCenter> : <div className="content-wrapper">
              <Heading3 className='txt-left f-24 mt-24'>Create Password</Heading3>
              <form onSubmit={handleSubmit(onSubmit)} onChange={handleChange}>
                <div className='pos-rel pb-28' style={{flex: '1 1 0%', overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
                  <div className='pos-rel d-flex pb-30'>
                    <CommonInput type={showPassword ? 'text' : 'password'} placeholder='Password'
                      iconName='lock' className='w-100'
                      onKeyUp={(e) => {
                        setPvalue(e.target.value);
                      }}
                      register={register('password', {required: true,
                        // eslint-disable-next-line max-len
                        pattern: passwordPattern})} />
                    <IconTag onClick={() => setShowPassword(!showPassword)}>
                      <Icon name={showPassword ? 'openEye' : 'eye'} />
                    </IconTag>
                    {errors.password &&
          <Error>Enter Valid Password.</Error>}

                  </div>
                  <div className='pos-rel d-flex pb-30'>
                    <CommonInput type={confPassword ? 'text' : 'password'} placeholder='Confirm Password'
                      iconName='lock' className='w-100'
                      register={register('confirmPassword', {required: true})} />
                    <IconTag onClick={() => setConfPassword(!confPassword)}>
                      <Icon name={confPassword ? 'openEye' : 'eye'} />
                    </IconTag>
                    {errors.confirmPassword &&
          <Error>Enter Valid Confirm Password.</Error>}
                    {confirmPass && (!errors.confirmPassword) ? <Error>{errorMsg}</Error> : null}
                  </div>
                  {pVale ? <BadgeContainer className='pos-unset mb-10' style={{marginTop: '16px'}}>
                    <BadgeLabel className='p-0'>Rules</BadgeLabel>
                    <BadgeRow className='ptb-10'>
                      <BadgeLabel>
            One Upper Case Letter
                      </BadgeLabel>
                      <IconsContainer
                        className={ pVale &&
              pVale.match(upperCasePattern) ?
              'completed w-16' : 'gray w-16'}>
                        <Icon name={'check'}/>
                      </IconsContainer>
                    </BadgeRow>
                    <BadgeRow className='ptb-10'>
                      <BadgeLabel>
            One Lower Case Letter
                      </BadgeLabel>
                      <IconsContainer className={ pVale &&
              pVale.match(lowerCasePattern) ?
              'completed w-16' : 'gray w-16'}>
                        <Icon name={'check'}/>
                      </IconsContainer>
                    </BadgeRow>
                    <BadgeRow className='ptb-10'>
                      <BadgeLabel>
            One Number
                      </BadgeLabel>
                      <IconsContainer className={ pVale &&
              pVale.match(numberPattern) ?
              'completed w-16' : 'gray w-16'}>
                        <Icon name={'check'}/>
                      </IconsContainer>
                    </BadgeRow>
                    <BadgeRow className='ptb-10'>
                      <BadgeLabel>
            One Special Character
                      </BadgeLabel>
                      <IconsContainer className={ pVale &&
              pVale.match(specialPattern) ?
              'completed w-16' : 'gray w-16'}>
                        <Icon name={'check'}/>
                      </IconsContainer>
                    </BadgeRow>
                    <BadgeRow className='ptb-10'>
                      <BadgeLabel>
            Minimum length of 8 characters
                      </BadgeLabel>
                      <IconsContainer className={ pVale &&
              pVale.match(minLenPattern) ?
              'completed w-16' : 'gray w-16'}>
                        <Icon name={'check'}/>
                      </IconsContainer>
                    </BadgeRow>
                  </BadgeContainer> : null}
                </div>
                <Actions>
                  <Button variant={isSubmitting ? 'disabled': 'primary'}
                    type="submit"
                    className={'responsive-btn'}
                    //   isLoading={props.isDisable}
                    size='large' width='100%'
                    onClick={()=>{
                      Mixpanel.track(action['createPassword']['update']['title'],
                          action['createPassword']['update']['props']);
                      gtag('event', gaAction['createPassword']['update']['title'], {
                        'event_category': gaAction['createPassword']['update']['category'],
                      });
                    }}
                  >Update</Button>
                </Actions>
              </form>
            </div>}
          </RightContent>
        </RightContainer>
      </LayoutWrapper>
    </>
  );
}
