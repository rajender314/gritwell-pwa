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
import {getFAQs, setLocalStorage} from '@app/core/localStorageService';
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
  PlanError,
  PlanSecHead,
  PlansSection,
  PricingText,
} from '@app/modules/recommend-plans/component/recommend-plans-components';
import {
  FilterPill,
  FilterRow,
} from '@app/modules/recommendations/recommendations-components';
import {ApiResponseProps, PayloadProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import {whiteColor} from '@app/styles';
import {
  DesktopWidth,
  Error,
  Heading,
  Link,
  MainContainer,
} from '@app/styles/common-styles';
import {formatPhoneNumbers, getProfileDetails} from '@app/utils';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {isMobile} from 'react-device-detect';
import {useForm} from 'react-hook-form';
import {useLocation, useNavigate} from 'react-router-dom';
import {
  Footer,
  //   LoginContainer,
  LoginTabContainer,
  OldLoginContainer,
  SignContainer,
} from './account-access-components';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';

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
  const [currLink, updateCurrLink] = useState('add-payment');
  const [selKey, updateSelKey] = useState('Register');
  // const [navUrl, updateNavUrl] = useState();
  // const plan = 'rootcause';
  const navigate = useNavigate();
  // const {plan}: any = useParams();
  const searchParams = new URLSearchParams(useLocation().search);
  const plan = searchParams.get('plan');
  useEffect(() => {
    console.log(plan);
    localStorage.removeItem('userData');

    setOpenDialog(false);
    guestLogin();
    setIssubmitting(false);
    // const configLists = getLocalStorage('configList') ? JSON.parse(getLocalStorage('configList')) : {
    //   ReactAppChatURL: process.env.React_App_CHAT_URL,
    // };
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
    data['planSlug'] = plan;
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
        if (proDetails['stripe_subscription_id']) {
          // navigate('/home');
          updateCurrLink('home');
          // window.location.replace
          // (process.env.REACT_APP_HOMEPAGE +'home');
          // window.location.replace('/home');
        } else {
          updateCurrLink('add-payment');

          // navigate('/add-payment');
          // window.location.replace(
          //     process.env.REACT_APP_HOMEPAGE +'add-payment');
        }
      }
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
  return (
    <>
      <MainContainer bgColor={whiteColor}>
        <Header hideBackArrow={false} bgCol={isMobile ? '' : '#e9dcce66'} hideLogo={true} hideBack={true} />
        <OldLoginContainer>
          <DesktopWidth>
            <Heading
              className={
                isMobile ? 'd-none' : 'f-32 logInContainerTitle mt-40 mb-0'
              }
            >
              Control health at its
              <span className="bg-highLighted">roots</span>
            </Heading>
            {plan !== null && plan !== '' ? (
              <>
                <FilterRow className="justifycenter">
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
                </FilterRow>
                <SignContainer>
                  <LoginTabContainer
                    className={isMobile ? 'z-2' : 'br-t-15 z-2 p-10-64 '}
                  >
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
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      onChange={handleChange}
                      className="pb-30"
                    >
                      <BodyText3 className="sign-up-label">Sign Up</BodyText3>
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
                            setPvalue(e.target.value);
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
                        <BodyText3 className={isMobile ? 'f-15 mw-330' : 'f-15 align-l' }>
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
                        <BodyText3 className="align-l f-15">
                          Already a member?{' '}
                          <Link onClick={() => {
                            navigate('/plans-sign-in');
                            Mixpanel.track(action['Signup']['signinLink']['title'], action['Signup']['signinLink']['props']);
                            gtag('event', gaAction['Signup']['signinLink']['title'], {
                              'event_category': gaAction['Signup']['signinLink']['category'],
                            });
                          }}>
                            Log in
                          </Link>
                        </BodyText3>
                      </Footer>
                    </form>
                  </LoginTabContainer>
                </SignContainer>
              </>
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
            )}
          </DesktopWidth>
        </OldLoginContainer>
      </MainContainer>
    </>
  );
}
