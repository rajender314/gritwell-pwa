/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import React from 'react';
import AlertDialog from '@app/components/alert-dialog';
import Button from '@app/components/button';
// import Icon from '@app/components/icon';
import CommonInput from '@app/components/input';
import apiEndpoint from '@app/core/apiend_point';
import {
  // getLocalStorage,
  setLocalStorage,
} from '@app/core/localStorageService';
import {emailPattern, passwordPattern} from '@app/core/pattern';
import {ApiResponseProps, PayloadProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {createSearchParams, useLocation, useNavigate} from 'react-router-dom';
import {
  IconTag,
  // IconTag,
  LinkText,
  // LoginContainer,
  // LoginTabContainer,
  // SignContainer,
} from './account-access-components';

// import {getProfileDetails} from '@app/utils';
// import Header from '@app/components/header';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
// import {
//   BodyText3,
//   SignInLabel,
// } from '@app/modules/recommend-plans/component/recommend-plans-components';
// import {whiteColor} from '@app/styles';
import gtag from 'ga-gtag';
import {Actions, LoginLinks, Error, ConfirmationText} from './signup.components';
import {Link} from '@app/styles/common-styles';
import Icon from '@app/components/icon';
import {isMobile} from 'react-device-detect';

/**
 * Renders Component.
 * @return {PlansSignIn} renders Component.
  * @param  {Props} props the api
 */
export default function PlansSignIn(props: any) {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const {
    handleSubmit,
    register,
    formState: {errors},
  } = useForm();
  const [infoMsg, setInfoMsg] = useState<string>('');
  const [showSectionMsg, setShowSectionMsg] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const [isResend, updateResend] = useState(false);
  // const [navUrl, updateNavUrl] = useState();

  const navigate = useNavigate();
  const searchParams = new URLSearchParams(useLocation().search);
  // const [isLive, updateIsLive] = useState(false);

  useEffect(() => {
    const isLve = searchParams.get('state') ? true : false;
    // updateIsLive(isLve);
    localStorage.setItem('isLive', JSON.stringify(isLve));
    localStorage.removeItem('userData');
    setIsSubmitting(false);
    // const configLists = getLocalStorage('configList') ?
    //   JSON.parse(getLocalStorage('configList')) :
    //   {
    //     ReactAppChatURL: process.env.React_App_CHAT_URL,
    //   };
    // const plansPage = configLists['plansPage'] ? configLists['plansPage'] : '';
    // const webSitePage = configLists['websiteUrl'] ?
    //   configLists['websiteUrl'] :
    //   'https://www.grit-well.com/';
    // const configUrl = localStorage.getItem('isLive') ? plansPage : webSitePage;
    // updateNavUrl(configUrl);
    Mixpanel.track(service['signin']['title'], service['signin']['props']);
    gtag('event', gaService['signin']['title'], {
      'event_category': gaService['signin']['category'],
    });
  }, []);
  // function checkNavUrl() {
  //   const configLists = getLocalStorage('configList') ? JSON.parse(getLocalStorage('configList')) : {
  //     ReactAppChatURL: process.env.React_App_CHAT_URL,
  //   };
  //   window.location.replace(configLists['plansPage'] ? configLists['plansPage'] : '');
  // }
  const onSubmit = (data: any) => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    axios({
      url: process.env.REACT_APP_API_URL + apiEndpoint.signInApi,
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
            setLocalStorage('token', response.data.token);
            getProfileData(response.data.token);
          } else if (response.data.status_code == 402) {
            setInfoMsg(response.data.message);
            // updateResend(response.data.is_resend);
            setShowSectionMsg(true);
            setIsSubmitting(false);
            setTimeout(() => {
              setShowSectionMsg(false);
            }, 3000);
          } else {
            setInfoMsg(response.data.message);
            setShowSectionMsg(true);
            setIsSubmitting(false);
            setTimeout(() => {
              setShowSectionMsg(false);
            }, 3000);
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
        localStorage.removeItem('configList');
        if (!proDetails['subscription_plan_info']) {
          proDetails['subscription_plan_info'] = planInfo;
        }
        setLocalStorage('userData', JSON.stringify(proDetails));
        console.log(proDetails, 'LoginData');
        if (proDetails['subscription_plan']['code'] === 'rootcause') {
          getLocation(token, proDetails);
        } else {
          if (proDetails['stripe_subscription_id']) {
            // navigate('/home');
            // window.location.href = process.env.REACT_APP_HOMEPAGE +'/home';
            window.location.replace(process.env.REACT_APP_HOMEPAGE +'home');
          } else {
            // navigate('/add-payment');
            window.location.replace(
                process.env.REACT_APP_HOMEPAGE +'add-payment');
          }
        }
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
              window.location.replace(process.env.REACT_APP_HOMEPAGE + 'location');
            } else if (proDetails['stripe_subscription_id']) {
              window.location.replace(process.env.REACT_APP_HOMEPAGE + 'home');
            } else {
              window.location.replace(process.env.REACT_APP_HOMEPAGE + 'plans');
            }
          }
        })
        .catch((err: object) => {
          console.log(err, 'Error');
        });
  };
  const handleChange = (e: any) => {
    // console.log(errors);
  };
  return (
    <>

      {showSectionMsg && (
        <AlertDialog
          header="Login Failed!"
          alertType="danger"
          onCancel={()=>setShowSectionMsg(false)}
          // eslint-disable-next-line max-len
          description={infoMsg}
        ></AlertDialog>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={handleChange}
      >
        <div className={'form-content ' + (isMobile? ' p-24':' p-40')}>
          <div className="form-field-wrapper">
            <CommonInput
              type="text"
              name="email"
              placeholder="Email"
              iconName="email"
              register={register('email', {
                required: true,
                // eslint-disable-next-line max-len
                pattern: emailPattern,
              })}
            />
            {errors.email && (
              <Error>Enter a valid email address.</Error>
            )}
          </div>
          <div className='form-field-wrapper' >
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <CommonInput
                className="fl-1"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                iconName="lock"
                register={register('password', {
                  required: true,
                  // eslint-disable-next-line max-len
                  pattern: passwordPattern,
                })}
              />
              <IconTag onClick={() => setShowPassword(!showPassword)}>
                <Icon name={showPassword ? 'openEye' : 'eye'} />
              </IconTag>
            </div>
            {errors.password && <Error>Enter a valid password.</Error>}
          </div>
          <LoginLinks>
            <LinkText
              className="lh-0"
              onClick={() => {
                navigate('/forgot-password');
                Mixpanel.track(
                    action['Signin']['forgotPassword']['title'],
                    action['Signin']['forgotPassword']['props'],
                );
                gtag('event', gaAction['Signin']['forgotPassword']['title'], {
                  'event_category': gaAction['Signin']['forgotPassword']['category'],
                });
              }}
            >
                        Forgot password?
            </LinkText>
            {true ? (
                        <LinkText
                          className="lh-0"
                          onClick={() => {
                            navigate({
                              pathname: '/forgot-password',
                              // eslint-disable-next-line max-len
                              search: `?${createSearchParams({
                                label: 'Resend email activation',
                              })}`,
                            });
                            Mixpanel.track(action['Signin']['resend']['title'], action['Signin']['resend']['props']);
                            gtag('event', gaAction['Signin']['resend']['title'], {
                              'event_category': gaAction['Signin']['resend']['category'],
                            });
                          }}
                        >
                          Resend verification?
                        </LinkText>
                      ) : null}
          </LoginLinks>
        </div>
        <Actions className={'footerAction ' + (isMobile? ' p-24':' p-40')}>
          <Button
            variant={isSubmitting ? 'disabled' : 'primary'}
            type="submit"
            size="large"
            width='200px'
            onClick={() => {
              Mixpanel.track(
                  action['Signin']['signinbtn']['title'],
                  action['Signin']['signinbtn']['props'],
              );
              gtag('event', gaAction['Signin']['signinbtn']['title'], {
                'event_category': gaAction['Signin']['signinbtn']['category'],
              });
            }}
          >
            {isSubmitting ? 'Please Wait..' : 'Log in'}
          </Button>
          <ConfirmationText className='show-on-mobile'>Not a member?
            <Link onClick={() => {
              props.setShowSignUp(!props.showSignUp);
              Mixpanel.track(action['Signup']['signinLink']['title'], action['Signup']['signinLink']['props']);
              gtag('event', gaAction['Signup']['signinLink']['title'], {
                'event_category': gaAction['Signup']['signinLink']['category'],
              });
            }}
            className='mx-4'
            >Sign Up
            </Link>
          </ConfirmationText>
        </Actions>
      </form>

    </>
  );
}
