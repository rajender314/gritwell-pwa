/* eslint-disable max-len */
import Button from '@app/components/button';
import CommonInput from '@app/components/input';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Error} from '@app/styles/common-styles';
import {Footer, LinkText, IconTag} from './account-access-components';
import apiEndpoint from '@app/core/apiend_point';
import {setLocalStorage} from '@app/core/localStorageService';
import axios from 'axios';
import {createSearchParams, useNavigate} from 'react-router-dom';
import {emailPattern, passwordPattern} from '@app/core/pattern';
import Icon from '@app/components/icon';
import AlertDialog from '@app/components/alert-dialog';
import {ApiResponseProps, PayloadProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
// import {getProfileDetails} from '@app/utils';
import {isMobile} from 'react-device-detect';

/**
 * Renders Component.
 * @return {SignIn} renders Component.
 */
export default function SignIn() {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const {handleSubmit, register, formState: {errors}} = useForm();
  const [infoMsg, setInfoMsg] = useState<string>('');
  const [showSectionMsg, setShowSectionMsg] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isResend, updateResend] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    // localStorage.clear();
    setIsSubmitting(false);
  }, []);
  const onSubmit =(data:any) =>{
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    axios({
      url: process.env.REACT_APP_API_URL + apiEndpoint.signInApi,
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization':
        'Basic R3JpdHdlbGwtQ29yZTpablhaOXB0WEhiNzdwaE9KYkdVcQ=='},
      // eslint-disable-next-line max-len
      data: `username=${encodeURIComponent(data.email)}&password=${data.password}&offset=${offset}`,
    })
        .then(function(response: any) {
          if (response.data.status_code == 200) {
            setLocalStorage('token', response.data.token);
            getProfileData(response.data.token);
            // getProfileDetails();
            // setTimeout(() => {
            //   setIsSubmitting(false);
            //   const proDetails = JSON.parse(getLocalStorage('userData'));
            //   if (proDetails['subscription_plan_id']) {
            //     window.location.replace('/home');
            //   } else {
            //     window.location.replace('/add-payment');
            //   }
            // }, 2000);
          } else if (response.data.status_code == 402) {
            setInfoMsg(response.data.message);
            updateResend(response.data.is_resend);
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
        }).catch(function(error) {
          console.log(error);
        });
  };

  const getProfileData =async (token)=>{
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.getProfileApi,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code == 200) {
            const planInfo = {
              'plan_description': {
                'subject': [
                  'Comprehensive root-cause analysis',
                  '6-month customized advanced supplement regime  ',
                  'Individual appointments with your dedicated Functional Medicine (FM) trained health coach every other week',
                  'Daily messaging and support included for one year - check-ins with your personal care team advocate who will guide you through the program',
                ],
                'heading': 'What is included in this plan?',
              },
              'plan_video': {
                'heading': 'More about your plan',
                'video_url': 'https://www.youtube.com/embed/BtDMvA3EI0E',
              },
              '_id': '625d1d970ab8a93ddd00b9be',
              'plan_type': 'Comprehensive plan',
              'plan_slug': 'comprehensive',
              'plan_duration': '6',
              'duration_type': ' Months',
              'currency_type': '$',
              'plan_price': 229,
              'recurring_type': 'billed monthly',
              'status': true,
              'price_id': 'price_1Kt3NBJ906CRVF6JKF4zfzgx',
            };
            const proDetails = response.data;
            if (!proDetails['subscription_plan_info'] ) {
              proDetails['subscription_plan_info'] = planInfo;
            }
            setLocalStorage('userData', JSON.stringify(proDetails));
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
        });
  };
  const handleChange =(e:any)=>{
    // console.log(errors);
  };
  return (
    <>
      {/* <CommonSnackbar
        title="Error"
        appearance="error"
        message={infoMsg}
        open={showSectionMsg}
        close={() => setShowSectionMsg(false)}
      /> */}
      {showSectionMsg && <AlertDialog header="Login Failed!" alertType="danger"
        // eslint-disable-next-line max-len
        description={infoMsg}></AlertDialog>}
      <form onSubmit={handleSubmit(onSubmit)} onChange={handleChange}
        className='pb-30'>
        <div className='pos-rel pb-28'>
          <CommonInput type='email' name='email' placeholder='Email'
            iconName='email' register={register('email', {required: true,
              // eslint-disable-next-line max-len
              pattern: emailPattern})} />
          {errors.email &&
            <Error>Enter a valid email address.</Error>}
        </div>
        <div className={errors.password ? 'pos-rel pb-28 d-flex' :
         'pos-rel d-flex' }>
          <CommonInput className='fl-1' type={showPassword ? 'text':'password'}
            name='password' placeholder='Password'
            iconName='lock' register={register('password', {required: true,
              // eslint-disable-next-line max-len
              pattern: passwordPattern})}/>
          <IconTag onClick={()=>setShowPassword(!showPassword)}>
            <Icon name={showPassword ? 'openEye' : 'eye'}/>
          </IconTag>
          {errors.password &&
            <Error>Enter a valid password.</Error>}

        </div>
        <div className='d-flex pb-28 js-bet mt-16'>
          <LinkText onClick={()=>navigate('/forgot-password')}>
          Forgot password?</LinkText>
          {infoMsg && isResend ? <LinkText onClick={()=> {
            navigate({
              pathname: '/forgot-password',
              // eslint-disable-next-line max-len
              search: `?${createSearchParams({label: 'Resend email activation'})}`,
            });
          }}>
          Resend activation?</LinkText> : null}
        </div>
        <Footer className={isMobile? 'mt-17': ''}>
          <Button variant={isSubmitting ? 'disabled' :'primary'}
            type= 'submit'
            //   isLoading={props.isDisable}
            size='large' width='100%'
            className={isMobile? '' : 'mt-20'}
          >{isSubmitting ? 'Please Wait..' :'Log in'}</Button>
        </Footer>
      </form>
    </>
  );
}
