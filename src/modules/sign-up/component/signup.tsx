/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
import Button from '@app/components/button';
import CommonInput from '@app/components/input';
// import {emailPattern, namePattern, usPhonePattern} from '@app/core/pattern';
import AlertDialog from '@app/components/alert-dialog';
import Header from '@app/components/header';
import Icon from '@app/components/icon';
import {Description} from '@app/components/layout-onBoarding/layout-onBoarding-components';
import apiEndpoint from '@app/core/apiend_point';
import {getFAQs, setLocalStorage, getLocalStorage} from '@app/core/localStorageService';
import {
  emailPattern,
  lowerCasePattern,
  minLenPattern,
  numberPattern,
  passwordPattern,
  specialPattern,
  upperCasePattern,
} from '@app/core/pattern';
import CommonSnackbar from '@app/core/snackbar';
import {IconsContainer} from '@app/modules/assesment-questions/assesment-questions-components';
import {
  BadgeContainer,
  BadgeLabel,
  BadgeRow,
} from '@app/modules/home/home-components';
import {
  BodyText3,
  // PlanError,
  PlanSecHead,
  PlansSection,
  PricingText,
} from '@app/modules/recommend-plans/component/recommend-plans-components';
// import {
//   FilterPill,
//   FilterRow,
// } from '@app/modules/recommendations/recommendations-components';
import {ApiResponseProps, PayloadProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import {whiteColor} from '@app/styles';
import {
  DesktopWidth,
  Link,
  MainContainer,
} from '@app/styles/common-styles';
import {formatPhoneNumbers, getProfileDetails} from '@app/utils';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {isMobile} from 'react-device-detect';
import {useForm} from 'react-hook-form';
import {useLocation} from 'react-router-dom';
import {
  Footer,
  LoginContainer,
  LoginTabContainer,
  SignContainer,
} from './account-access-components';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';
import Tabs from '@app/components/tabs';
import {LoginLabels} from '@app/core/labels-messages';
import PlansSignIn from './signin';
import {LayoutWrapper, LeftContainer, LogoWrapper, ImageContainer, Actions, RightContainer, RightContent, ConfirmationText, BackBtnContainer, BackIconContainer, Error, ImageHolder} from './signup.components';
// import NotificationDialog from '@app/components/notification-dialog/notification-dialog';
/**
 * Renders Component.
 * @return {PlansSignUP} renders Component.
 */
export default function PlansSignUP() {
  const {
    handleSubmit,
    register,
    formState: {errors},
    getValues,
    setValue,
    clearErrors,
  } = useForm();
  const [guestToken, setGuestToken] = useState();
  const [planData, setPlanData] = useState([]);
  const [infoMsg, setInfoMsg] = useState<string>('');
  const [showSectionMsg, setShowSectionMsg] = useState(false);
  const [isSubmitting, setIssubmitting] = useState(false);
  const [apperance, setApperance] = useState('success');
  const [openDialog, setOpenDialog] = useState(false);
  const [emailId, setEmailId] = useState('');
  const [pVale, setPvalue] = useState('');
  const [showPassword, setShowPassword] = useState('password');
  const [userValue, setUserValue] = useState({
    'first_name': false,
    'last_name': false,
    'email': '',
    'phone': '',
  });
  const [currLink, updateCurrLink] = useState('plans');
  // const [selKey, updateSelKey] = useState('Register');
  // const [navUrl, updateNavUrl] = useState();
  // const plan = 'rootcause';
  // const navigate = useNavigate();
  // const {plan}: any = useParams();
  const searchParams = new URLSearchParams(useLocation().search);
  const plan = searchParams.get('plan');
  const [showSignUp, setShowSignUp] = useState(window.location.href.includes('sign-in') ? false : true);
  const configLists = getLocalStorage('configList') ? JSON.parse(getLocalStorage('configList')) : '';
  const [dynamicClass, setDynamicClass] = useState(false);
  const webSitePage = configLists['websiteUrl'] ?
      configLists['websiteUrl'] :
      'https://www.grit-well.com/';
  useEffect(() => {
    localStorage.removeItem('userData');
    console.log(window.location.href);
    setOpenDialog(false);
    guestLogin();
    setIssubmitting(false);
   
    
    // updateNavUrl(configLists['plansPage'] ? configLists['plansPage'] : '' );
    Mixpanel.track(service['signup']['title'], service['signup']['props']);
    gtag('event', gaService['signup']['title'], {
      'event_category': gaService['signup']['category'],
    });
  }, []);

  const getPlansData = (tok) => {
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.getSubscriptionsPlan,
      headers: {
        Authorization: tok,
      },
    };
    triggerApi(apiObject).then((response: ApiResponseProps) => {
      setPlanData(response.data);
    });
  };

  const newData = planData?.filter((item) => item.plan_slug === plan);

  const onSubmit = (data: any) => {
    if (isSubmitting) {
      return;
    }
    setIssubmitting(true);
    data['status'] = true;
    data['planSlug'] = 'rootcause';
    setEmailId(data['email']);
    const apiObject: PayloadProps = {
      payload: data,
      method: 'POST',
      apiUrl: apiEndpoint.signUpAPI,
      headers: {Authorization: guestToken},
    };

    triggerApi(apiObject).then((res: ApiResponseProps) => {
      if (res.status_code && res.status_code == 200) {
        autoLogin(data);
        setInfoMsg(res.data.message ? res.data.message : res.message);
        setShowSectionMsg(true);
        setApperance('success');
        setIssubmitting(false);
        setOpenDialog(true);
      } else {
        setInfoMsg(res.data.message ? res.data.message : res.message);
        setShowSectionMsg(true);
        setApperance('error');
        setIssubmitting(false);
      }
    });
  };
  const autoLogin = (data: any) => {
    axios({
      url: process.env.REACT_APP_API_URL + apiEndpoint.autoLogin,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic R3JpdHdlbGwtQ29yZTpablhaOXB0WEhiNzdwaE9KYkdVcQ==',
      },
      // eslint-disable-next-line max-len
      data: `username=${encodeURIComponent(data.email)}&password=${
        data.password
      }&offset=${offset}`,
    })
        .then(function(response: any) {
          if (response.data.status_code == 200) {
            localStorage.removeItem('configList');
            setLocalStorage('token', response.data.token);
            getProfileData(response.data.token);
            // getPlansData(response.data.token);
            getProfileDetails();
          // setTimeout(() => {
          //   navigate('/add-payment');
          //   location.reload();
          // }, 4500);
          } else if (response.status_code == 402) {
            setInfoMsg(response.data.message);
            setShowSectionMsg(true);
          // setIsSubmitting(false);
          } else {
            setInfoMsg(response.data.message);
            setShowSectionMsg(true);
          // setIsSubmitting(false);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
  };
  const getProfileData = async (token) => {
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.getProfileApi,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject).then((response: ApiResponseProps) => {
      if (response.status_code == 200) {
        const planInfo = {
          plan_description: {
            subject: [
              'Comprehensive root-cause analysis',
              '6-month customized advanced supplement regime  ',
              'Individual appointments with your dedicated Functional Medicine (FM) trained health coach every other week',
              'Daily messaging and support included for one year - check-ins with your personal care team advocate who will guide you through the program',
            ],
            heading: 'What is included in this plan?',
          },
          plan_video: {
            heading: 'More about your plan',
            video_url: 'https://www.youtube.com/embed/BtDMvA3EI0E',
          },
          _id: '625d1d970ab8a93ddd00b9be',
          plan_type: 'Comprehensive plan',
          plan_slug: 'comprehensive',
          plan_duration: '6',
          duration_type: ' Months',
          currency_type: '$',
          plan_price: 229,
          recurring_type: 'billed monthly',
          status: true,
          price_id: 'price_1Kt3NBJ906CRVF6JKF4zfzgx',
        };
        const proDetails = response.data;
        if (!proDetails['subscription_plan_info']) {
          proDetails['subscription_plan_info'] = planInfo;
        }
        setLocalStorage('userData', JSON.stringify(proDetails));
        getLocation(token, proDetails);
        // if (proDetails['stripe_subscription_id']) {
        // navigate('/home');
        // updateCurrLink('location');
        // updateCurrLink('home');
        // window.location.replace
        // (process.env.REACT_APP_HOMEPAGE +'home');
        // window.location.replace('/home');
        // } else {
        //   updateCurrLink('add-payment');

        // navigate('/add-payment');
        // window.location.replace(
        //     process.env.REACT_APP_HOMEPAGE +'add-payment');
        // }
      }
    });
  };
  const getLocation = (token, proDetails) =>{
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.getLocation,
      headers: {Authorization: token},
    };

    triggerApi(apiObject)
        .then((res: ApiResponseProps) => {
          if (res.status_code == 200) {
            if (res.data.located_at_ny_nj_ri === null) {
              console.log(res.data.located_at_ny_nj_ri);
              updateCurrLink('location');
            } else if (proDetails['stripe_subscription_id']) {
              updateCurrLink('home');
            } else {
              updateCurrLink('plans');
            }
          }
        })
        .catch((err: object) => {
          console.log(err, 'Error');
        });
  };
  const handleInputChange = (e: any, field) => {
    const formattedPhoneNumber = formatPhoneNumbers(e.target.value);
    setValue(field, formattedPhoneNumber);
  };

  const handleChange = (e: any) => {
    // console.log(errors);
  };
  
  const d = new Date();
  const offset = d.getTimezoneOffset();
  /**
   * get Boarding JSON from the API.
   *  */
  function guestLogin() {
    axios({
      url: process.env.REACT_APP_API_URL + 'guestLogin',
      method: 'POST',
      // eslint-disable-next-line max-len
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic R3JpdHdlbGwtQ29yZTpablhaOXB0WEhiNzdwaE9KYkdVcQ==',
      },
      data: `username=guest@gwc.com&password=Enter@123&offset=${offset}`,
    })
        .then(function(response: any) {
          if (response.status == 200) {
            setGuestToken(response.data.token);
            getPlansData(response.data.token);
            // setGuestData(true);
            setLocalStorage('guestToken', response.data.token);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
  }
  const [selectedTab, setTab] = useState(window.location.href.includes('sign-in') ? LoginLabels[1] : LoginLabels[0]);

  const onSelectedTabClick = (tab:string) => {
    clearErrors();
    // updateLoader(true);
    if (tab === 'Sign up') {
      setShowSignUp(true);
    } else {
      // navigate('/sign-in');
      setShowSignUp(false);
    }
    setTab(tab);
    // updateLoader(false);
    // Mixpanel.track(`${tab} ${action['tests']['click']['title']}`,
    //     action['tests']['click']['props']);
    // gtag('event', `${tab} ${gaAction['tests']['click']['title']}`, {
    //   'event_category': gaAction['tests']['click']['category'],
    // });
  };

  const passValidation = (e: any) =>{
    setPvalue(e);
    setDynamicClass(true);
    if (e === '') {
      setDynamicClass(false);
    }
  };

  return (
    <>
      <MainContainer bgColor={whiteColor} style={{'display': 'none'}}>
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
          <LoginContainer className={isMobile ? 'd-flex jc-center w-100' : 'w-50 d-flex jc-center'}>
            <DesktopWidth className={'desktopStyles ' + (dynamicClass ? 'testclass' : '')}>
              {/* <Heading
              className={
                isMobile ? 'd-none' : 'f-32 logInContainerTitle mt-40 mb-0'
              }
            >
              Control health at its
              <span className="bg-highLighted">roots</span>
            </Heading> */}
              {/* {plan !== null && plan !== '' ? (
              <> */}
              {/* <FilterRow className="justifycenter">
                  <FilterPill
                    className={
                          isMobile ?
                            selKey === 'Register' ?
                              'w-120 activee f-13' :
                              'w-120 disable f-13' :
                        selKey === 'Register' ?
                        'w-215 activee f-13' :
                        'w-215 disable f-13'
                    }
                    onClick={() => updateSelKey('Register')}
                  >
                    1. Register
                  </FilterPill>
                  <FilterPill
                    className={
                      isMobile ?
                        selKey === 'Payment' ?
                          'w-120 activee f-13' :
                          'w-120 disable f-13' :
                        selKey === 'Payment' ?
                        'w-215 activee f-13' :
                        'w-215 disable f-13'
                    }
                    onClick={() => updateSelKey('Payment')}
                  >
                    2. Payment
                  </FilterPill>
                  <FilterPill
                    className={
                     isMobile ?
                        selKey === 'Onboard' ?
                          'w-120 activee f-13' :
                          'w-120 disable f-13' :
                        selKey === 'Onboard' ?
                        'w-215 activee f-13' :
                        'w-215 disable f-13'
                    }
                    onClick={() => updateSelKey('Onboard')}
                  >
                    3. Onboard
                  </FilterPill>
                </FilterRow> */}
              <SignContainer>
              
                <LoginTabContainer
                  className={isMobile ? 'z-2' : 'z-2 p-10-64 '}
                >
                  {isMobile ? '' : <div className='pointer' onClick={() => window.location.replace(webSitePage)} style={{marginLeft: '-2.5rem', marginTop: '1rem'}}><Icon name='backarrow'/> </div>}
                  <CommonSnackbar
                    title="Error"
                    appearance={apperance}
                    message={infoMsg}
                    open={showSectionMsg}
                    close={() => setShowSectionMsg(false)}
                  />
                  {openDialog && (
                    <AlertDialog
                      header="Account created!"
                      // eslint-disable-next-line max-len
                      description={
                        'We have sent a verification email to the ' +
                          emailId +
                          ', Please confirm your email within 24 hours'
                      }
                      onCancel={() => {
                        window.location.replace(
                            process.env.REACT_APP_HOMEPAGE + currLink,
                        );
                      }}
                    ></AlertDialog>
                  )}
                  {isMobile ? '' : <Tabs
                    type='secondary'
                    labels={LoginLabels}
                    onClick={onSelectedTabClick}
                    selectedLabel={selectedTab}
                  />}
                  {isMobile ? <div className='sign_up'>{showSignUp? 'Sign Up' : 'Log In'} </div> : ''}
                  {showSignUp ? <form
                    onSubmit={handleSubmit(onSubmit)}
                    onChange={handleChange}
                    className="pb-30"
                  >
                    {newData?.map((item, index) => {
                      return (
                        <PlansSection
                          key={index}
                          className="payment-page border"
                        >
                          <PlanSecHead>
                            {item.plan_slug !== 'rootcause' ? <BodyText3 className="m-0">
                              {item.plan_duration} {item.duration_type}
                            </BodyText3> :
                              <BodyText3 className="m-0">
                                ONE TIME
                              </BodyText3>}
                            {item.plan_duration > 1 ? (
                                <PricingText className="f-17 lh-22">
                                  {item.currency_type}
                                  {item.plan_price}
                                  {item.plan_slug !== 'rootcause' && item.recurring_type}
                                </PricingText>
                              ) : (
                                <PricingText className="f-17 lh-22">
                                  {item.currency_type} {item.plan_price}
                                </PricingText>
                              )}
                          </PlanSecHead>
                          <Description className="m-0 f-17">
                            {item.plan_type}
                          </Description>
                        </PlansSection>
                      );
                    })}
                    <div className="pos-rel p-t-4">
                      <CommonInput
                        type="text"
                        placeholder="First Name"
                        iconName="user"
                        validate={getValues('first_name') ? true : false}
                        register={register('first_name', {required: true, onChange(e) {
                          if (e.target.value !== '') {
                            setUserValue({...userValue, first_name: true});
                          } else {
                            setUserValue({...userValue, first_name: false});
                          }
                          setValue('first_name', e.target.value);
                        }})}
                      />
                      {errors.first_name && (
                        <Error>First name is required</Error>
                      )}
                    </div>
                    <div className="pos-rel p-t-4">
                      <CommonInput
                        type="text"
                        placeholder="Last Name"
                        validate={userValue['last_name']}
                        iconName="user"
                        register={register('last_name', {required: true, onChange(e) {
                          if (e.target.value !== '') {
                            setUserValue({...userValue, last_name: true});
                          } else {
                            setUserValue({...userValue, last_name: false});
                          }
                          setValue('last_name', e.target.value);
                        }})}
                      />
                      {errors.last_name && (
                        <Error>Last name is required</Error>
                      )}
                    </div>
                    <div className="pos-rel p-t-4">
                      <CommonInput
                        type="text"
                        placeholder="Email"
                        iconName="email"
                        validate={
                            userValue.email.match(emailPattern) ?
                              true :
                              false
                        }
                        register={register('email', {
                          required: true,
                          pattern: emailPattern,
                          onChange(e) {
                            if (e.target.value !== '') {
                              setUserValue({...userValue, email: e.target.value});
                            } else {
                              setUserValue({...userValue, email: ''});
                            }
                            setValue('email', e.target.value);
                          },
                        })}
                      />
                      {errors.email && (
                        <Error>Enter Valid Email Address.</Error>
                      )}
                    </div>
                    <div className="pos-rel p-t-4">
                      <CommonInput
                        type="phone"
                        placeholder="Phone"
                        iconName="phone"
                        onKeyUp={(e: any) => handleInputChange(e, 'phone')}
                        validate={
                            userValue.phone.length === 14 ?
                              true :
                              false
                        }
                        register={register('phone', {
                          required: true,
                          minLength: 14,
                          onChange(e) {
                            if (e.target.value.length <= 14) {
                              setUserValue({...userValue, phone: e.target.value});
                            }
                            setValue('phone', e.target.value);
                          },
                        })}
                      />
                      {errors.phone && (
                        <Error>Enter Valid Phone Number.</Error>
                      )}
                    </div>
                    <div className="pos-rel d-flex justify-content-between p-t-4 mb-20">
                      <CommonInput
                        type={showPassword === 'text' ? 'text' : 'password'}
                        placeholder="Password"
                        iconName="lock"
                        className='w-100'
                        viewPass={setShowPassword}
                        showPass={showPassword}
                        onKeyUp={(e) => {
                          passValidation(e.target.value);
                        }}
                        validate={
                            getValues('password') &&
                            getValues('password').match(passwordPattern) ?
                              true :
                              false
                        }
                        register={register('password', {
                          required: true,
                          // eslint-disable-next-line max-len
                          pattern: passwordPattern,
                        })}
                      />
                      {errors.password && (
                        <Error>Enter Valid Password.</Error>
                      )}
                    </div>
                    {pVale ? (
                        <BadgeContainer className="pos-unset mb-10">
                          <BadgeLabel className="p-0">Rules</BadgeLabel>
                          <BadgeRow className="ptb-10">
                            <BadgeLabel>Atleast One Upper Case Letter</BadgeLabel>
                            <IconsContainer
                              className={
                                pVale && pVale.match(upperCasePattern) ?
                                  'completed w-16' :
                                  'gray w-16'
                              }
                            >
                              <Icon name={'check'} />
                            </IconsContainer>
                          </BadgeRow>
                          <BadgeRow className="ptb-10">
                            <BadgeLabel>Atleast One Lower Case Letter</BadgeLabel>
                            <IconsContainer
                              className={
                                pVale && pVale.match(lowerCasePattern) ?
                                  'completed w-16' :
                                  'gray w-16'
                              }
                            >
                              <Icon name={'check'} />
                            </IconsContainer>
                          </BadgeRow>
                          <BadgeRow className="ptb-10">
                            <BadgeLabel>Atleast One Number</BadgeLabel>
                            <IconsContainer
                              className={
                                pVale && pVale.match(numberPattern) ?
                                  'completed w-16' :
                                  'gray w-16'
                              }
                            >
                              <Icon name={'check'} />
                            </IconsContainer>
                          </BadgeRow>
                          <BadgeRow className="ptb-10">
                            <BadgeLabel>Atleast One Special Character</BadgeLabel>
                            <IconsContainer
                              className={
                                pVale && pVale.match(specialPattern) ?
                                  'completed w-16' :
                                  'gray w-16'
                              }
                            >
                              <Icon name={'check'} />
                            </IconsContainer>
                          </BadgeRow>
                          <BadgeRow className="ptb-10">
                            <BadgeLabel>
                              Minimum length of 8 characters
                            </BadgeLabel>
                            <IconsContainer
                              className={
                                pVale && pVale.match(minLenPattern) ?
                                  'completed w-16' :
                                  'gray w-16'
                              }
                            >
                              <Icon name={'check'} />
                            </IconsContainer>
                          </BadgeRow>
                        </BadgeContainer>
                      ) : null}
                    <Footer>
                      <Button
                        variant={isSubmitting ? 'disabled' : 'primary'}
                        type="submit"
                        size="large"
                        width="100%"
                        className={isMobile ? '' : 'mt-8'}
                        onClick={()=> {
                          Mixpanel.track(action['Signup']['signupBtn']['title'], action['Signup']['signupBtn']['props']);
                          gtag('event', gaAction['Signup']['signupBtn']['title'], {
                            'event_category': gaAction['Signup']['signupBtn']['category'],
                          });
                        }}
                      >
                          Sign up
                      </Button>
                      <BodyText3 className={isMobile ? 'f-15 text-left' : 'f-15 align-l' }>
                          By signing up, you agree with the &nbsp;
                        <Link
                          onClick={() => {
                            window.open(getFAQs('TermsofUse'));
                            Mixpanel.track(action['Signup']['pwForm']['title'], action['Signup']['pwForm']['props']);
                            gtag('event', gaAction['Signup']['pwForm']['title'], {
                              'event_category': gaAction['Signup']['pwForm']['category'],
                            });
                          }}
                        >
                            patient waiver form&nbsp;
                        </Link>{' '}
                          and to our &nbsp;
                        <Link
                          onClick={() => {
                            window.open(getFAQs('TermsofUse'));
                            Mixpanel.track(action['Signup']['termsOfService']['title'], action['Signup']['termsOfService']['props']);
                            gtag('event', gaAction['Signup']['termsOfService']['title'], {
                              'event_category': gaAction['Signup']['termsOfService']['category'],
                            });
                          }}
                        >
                            terms of service&nbsp;
                        </Link>{' '}
                          and&nbsp;
                        <Link
                          onClick={() => {
                            window.open(getFAQs('PrivacyPolicy'));
                            Mixpanel.track(action['Signup']['privacyPolicy']['title'], action['Signup']['privacyPolicy']['props']);
                            gtag('event', gaAction['Signup']['privacyPolicy']['title'], {
                              'event_category': gaAction['Signup']['privacyPolicy']['category'],
                            });
                          }}
                        >
                            privacy policy
                        </Link>{' '}
                          .
                      </BodyText3>
                    </Footer>
                  </form> : <PlansSignIn /> }
                  {isMobile &&
                    <BodyText3 className="align-l f-15 d-flex jc-center gap-8">
                      <span>{showSignUp? 'Already a member' : 'Not a member'}?</span>                    
                      <Link onClick={() => {
                        setShowSignUp(!showSignUp);
                        Mixpanel.track(action['Signup']['signinLink']['title'], action['Signup']['signinLink']['props']);
                        gtag('event', gaAction['Signup']['signinLink']['title'], {
                          'event_category': gaAction['Signup']['signinLink']['category'],
                        });
                      }}>
                        {showSignUp ? 'Log in' : 'Sign Up'}
                      </Link>
                    </BodyText3>
                  }
                </LoginTabContainer>
              </SignContainer>
              {/* </>
            ) : (
              <SignContainer className="er">
                <LoginTabContainer
                  className={isMobile ? 'z-2' : 'br-t-15 z-2 p-10-64 '}
                >
                  <div>
                    <PlanError>
                      Please select plan to continue sign up!
                    </PlanError>
                    <Link
                      className="align"
                      onClick={() => {
                        navigate('/');
                        Mixpanel.track(action['Signup']['Goto']['title'], action['Signup']['Goto']['props']);
                        gtag('event', gaAction['Signup']['Goto']['title'], {
                          'event_category': gaAction['Signup']['Goto']['category'],
                        });
                      }}
                    >
                      GO TO PLANS PAGE
                    </Link>
                  </div>
                </LoginTabContainer>
              </SignContainer>
            )} */}
            </DesktopWidth>
          </LoginContainer>
        </div>
      </MainContainer>

      <LayoutWrapper>
        <LeftContainer style={isMobile ? {display: 'none'} : {}}>
          <LogoWrapper>
            <Icon name="headerLogo" />
          </LogoWrapper>
          <ImageContainer>
            <ImageHolder className='has-svg'>
              <Icon name='gritwellLogo'/>
            </ImageHolder>
          </ImageContainer>
        </LeftContainer>
        <RightContainer style={isMobile ? {} : {backgroundColor: '#F8F5F0'}}>
          <RightContent>
            {/* {isMobile ? <Header bgCol={isMobile ? '' : '#e9dcce66'} hideLogo={true} hideBack={true} /> : ''} */}
            <div className="content-wrapper p-0">
              <BackBtnContainer className={isMobile?'p-24': ' p-40 pb-24'} >
                <BackIconContainer onClick={() => window.location.replace(webSitePage)}>
                  <Icon name='backarrow'/>
                </BackIconContainer>
              </BackBtnContainer>
              {isMobile ? <div className='sign_up m-0 px-24'>{showSignUp? 'Sign Up' : 'Log In'} </div> : ''}
              {isMobile ? '' :<Tabs
                type='secondary'
                labels={LoginLabels}
                onClick={onSelectedTabClick}
                selectedLabel={selectedTab}
                classN={isMobile?'mb-0 p-24': ' mb-0 px-40'}
              />}
              {showSignUp ?
              <form
                onSubmit={handleSubmit(onSubmit)}
                onChange={handleChange}
              >
                {newData?.map((item, index) => {
                  return (
                    <PlansSection
                      key={index}
                      className="payment-page border"
                    >
                      <PlanSecHead>
                        {item.plan_slug !== 'rootcause' ? <BodyText3 className="m-0">
                          {item.plan_duration} {item.duration_type}
                        </BodyText3> :
                              <BodyText3 className="m-0">
                                ONE TIME
                              </BodyText3>}
                        {item.plan_duration > 1 ? (
                                <PricingText className="f-17 lh-22">
                                  {item.currency_type}
                                  {item.plan_price}
                                  {item.plan_slug !== 'rootcause' && item.recurring_type}
                                </PricingText>
                              ) : (
                                <PricingText className="f-17 lh-22">
                                  {item.currency_type} {item.plan_price}
                                </PricingText>
                              )}
                      </PlanSecHead>
                      <Description className="m-0 f-17">
                        {item.plan_type}
                      </Description>
                    </PlansSection>
                  );
                })}
                {/* <div className="form-content p-40"> */}
                <div className={'form-content ' + (isMobile? ' p-24':' p-40')}>
                  <div className='form-field-wrapper'>
                    <CommonInput
                      type="text"
                      placeholder="First Name"
                      iconName="user"
                      validate={getValues('first_name') ? true : false}
                      register={register('first_name', {required: true, onChange(e) {
                        if (e.target.value !== '') {
                          setUserValue({...userValue, first_name: true});
                        } else {
                          setUserValue({...userValue, first_name: false});
                        }
                        setValue('first_name', e.target.value);
                      }})}
                    />
                    {errors.first_name && (
                      <Error>First name is required</Error>
                    )}
                  </div>
                  <div className='form-field-wrapper'>
                    <CommonInput
                      type="text"
                      placeholder="Last Name"
                      validate={userValue['last_name']}
                      iconName="user"
                      register={register('last_name', {required: true, onChange(e) {
                        if (e.target.value !== '') {
                          setUserValue({...userValue, last_name: true});
                        } else {
                          setUserValue({...userValue, last_name: false});
                        }
                        setValue('last_name', e.target.value);
                      }})}
                    />
                    {errors.last_name && (
                      <Error>Last name is required</Error>
                    )}
                  </div>
                  <div className='form-field-wrapper'>
                    <CommonInput
                      type="text"
                      placeholder="Email"
                      iconName="email"
                      validate={
                              userValue.email.match(emailPattern) ?
                                true :
                                false
                      }
                      register={register('email', {
                        required: true,
                        pattern: emailPattern,
                        onChange(e) {
                          if (e.target.value !== '') {
                            setUserValue({...userValue, email: e.target.value});
                          } else {
                            setUserValue({...userValue, email: ''});
                          }
                          setValue('email', e.target.value);
                        },
                      })}
                    />
                    {errors.email && (
                      <Error>Enter Valid Email Address.</Error>
                    )}
                  </div>
                  <div className='form-field-wrapper'>
                    <CommonInput
                      type="phone"
                      placeholder="Phone"
                      iconName="phone"
                      onKeyUp={(e: any) => handleInputChange(e, 'phone')}
                      validate={
                              userValue.phone.length === 14 ?
                                true :
                                false
                      }
                      register={register('phone', {
                        required: true,
                        minLength: 14,
                        onChange(e) {
                          if (e.target.value.length <= 14) {
                            setUserValue({...userValue, phone: e.target.value});
                          }
                          setValue('phone', e.target.value);
                        },
                      })}
                    />
                    {errors.phone && (
                      <Error>Enter Valid Phone Number.</Error>
                    )}
                  </div>
                  <div className="form-field-wrapper">
                    <CommonInput
                      type={showPassword === 'text' ? 'text' : 'password'}
                      placeholder="Password"
                      iconName="lock"
                      className='w-100'
                      viewPass={setShowPassword}
                      showPass={showPassword}
                      onKeyUp={(e) => {
                        passValidation(e.target.value);
                      }}
                      validate={
                              getValues('password') &&
                              getValues('password').match(passwordPattern) ?
                                true :
                                false
                      }
                      register={register('password', {
                        required: true,
                        // eslint-disable-next-line max-len
                        pattern: passwordPattern,
                      })}
                    />
                    {errors.password && (
                      <Error>Enter Valid Password.</Error>
                    )}
                  </div>
                  {pVale ? (
                        <BadgeContainer style={{padding: '20px 16px'}}>
                          <BadgeLabel className="p-0">Rules</BadgeLabel>
                          <BadgeRow className="ptb-10">
                            <BadgeLabel className='p-0'>Atleast One Upper Case Letter</BadgeLabel>
                            <IconsContainer
                              className={
                                pVale && pVale.match(upperCasePattern) ?
                                  'completed w-16' :
                                  'gray w-16'
                              }
                            >
                              <Icon name={'check'} />
                            </IconsContainer>
                          </BadgeRow>
                          <BadgeRow className="ptb-10">
                            <BadgeLabel className='p-0'>Atleast One Lower Case Letter</BadgeLabel>
                            <IconsContainer
                              className={
                                pVale && pVale.match(lowerCasePattern) ?
                                  'completed w-16' :
                                  'gray w-16'
                              }
                            >
                              <Icon name={'check'} />
                            </IconsContainer>
                          </BadgeRow>
                          <BadgeRow className="ptb-10">
                            <BadgeLabel className='p-0'>Atleast One Number</BadgeLabel>
                            <IconsContainer
                              className={
                                pVale && pVale.match(numberPattern) ?
                                  'completed w-16' :
                                  'gray w-16'
                              }
                            >
                              <Icon name={'check'} />
                            </IconsContainer>
                          </BadgeRow>
                          <BadgeRow className="ptb-10">
                            <BadgeLabel className='p-0'>Atleast One Special Character</BadgeLabel>
                            <IconsContainer
                              className={
                                pVale && pVale.match(specialPattern) ?
                                  'completed w-16' :
                                  'gray w-16'
                              }
                            >
                              <Icon name={'check'} />
                            </IconsContainer>
                          </BadgeRow>
                          <BadgeRow className="ptb-10">
                            <BadgeLabel className='p-0'>
                              Minimum length of 8 characters
                            </BadgeLabel>
                            <IconsContainer
                              className={
                                pVale && pVale.match(minLenPattern) ?
                                  'completed w-16' :
                                  'gray w-16'
                              }
                            >
                              <Icon name={'check'} />
                            </IconsContainer>
                          </BadgeRow>
                        </BadgeContainer>
                      ) : null}
                </div>
                <Actions className={'footerAction ' + (isMobile? ' p-24':' p-40')}>
                  <Button
                    variant={isSubmitting ? 'disabled' : 'primary'}
                    type="submit"
                    size="large"
                    className={'responsive-btn'}
                    onClick={()=> {
                      Mixpanel.track(action['Signup']['signupBtn']['title'], action['Signup']['signupBtn']['props']);
                      gtag('event', gaAction['Signup']['signupBtn']['title'], {
                        'event_category': gaAction['Signup']['signupBtn']['category'],
                      });
                    }}
                  >
                      Sign up
                  </Button>
                  <ConfirmationText className='text-sm-left'>
                    By signing up, you are agree with the
                    <Link
                      onClick={() => {
                        window.open(getFAQs('TermsofUse'));
                        Mixpanel.track(action['Signup']['pwForm']['title'], action['Signup']['pwForm']['props']);
                        gtag('event', gaAction['Signup']['pwForm']['title'], {
                          'event_category': gaAction['Signup']['pwForm']['category'],
                        });
                      }}
                      className='mx-4'
                    >
                          patient waiver form
                    </Link>
                    and to our
                    <Link
                      onClick={() => {
                        window.open(getFAQs('TermsofUse'));
                        Mixpanel.track(action['Signup']['termsOfService']['title'], action['Signup']['termsOfService']['props']);
                        gtag('event', gaAction['Signup']['termsOfService']['title'], {
                          'event_category': gaAction['Signup']['termsOfService']['category'],
                        });
                      }}
                      className='mx-4'
                    >
                                  terms of service
                    </Link>
                    and
                    <Link
                      onClick={() => {
                        window.open(getFAQs('PrivacyPolicy'));
                        Mixpanel.track(action['Signup']['privacyPolicy']['title'], action['Signup']['privacyPolicy']['props']);
                        gtag('event', gaAction['Signup']['privacyPolicy']['title'], {
                          'event_category': gaAction['Signup']['privacyPolicy']['category'],
                        });
                      }}
                      className='mx-4'
                    >
                                  privacy policy
                    </Link>
                  </ConfirmationText>
                  <ConfirmationText className='show-on-mobile'>Already a member?
                    <Link onClick={() => {
                      clearErrors();
                      setShowSignUp(!showSignUp);
                      Mixpanel.track(action['Signup']['signinLink']['title'], action['Signup']['signinLink']['props']);
                      gtag('event', gaAction['Signup']['signinLink']['title'], {
                        'event_category': gaAction['Signup']['signinLink']['category'],
                      });
                    }}
                    className='mx-4'
                    >Log in
                    </Link>
                  </ConfirmationText>
                </Actions>
              </form> : <PlansSignIn setShowSignUp={setShowSignUp} showSignUp= {showSignUp}/> }
            </div>
          </RightContent>
        </RightContainer>
      </LayoutWrapper>
      <CommonSnackbar
        title="Error"
        appearance={apperance}
        message={infoMsg}
        open={showSectionMsg}
        close={() => setShowSectionMsg(false)}
      />
      {openDialog && (
        <>
          {/* <NotificationDialog /> */}
          <AlertDialog
            header="Account created!"
            // eslint-disable-next-line max-len
            description={
              'We have sent a verification email to ' +
                          emailId +
                          '. Please confirm your email within 24 hours'
            }
            onCancel={() => {
              window.location.replace(
                  process.env.REACT_APP_HOMEPAGE + currLink,
              );
            }}
          ></AlertDialog>
        </>
      )}
    </>
  );
}
