/* eslint-disable max-len */
import Button from '@app/components/button';
import CommonInput from '@app/components/input';
// import {emailPattern, namePattern, usPhonePattern} from '@app/core/pattern';
import {BodyText3} from
  '@app/modules/recommend-plans/component/recommend-plans-components';
import {Link, Error} from '@app/styles/common-styles';
import React, {useEffect, useState} from 'react';
import {Footer} from './account-access-components';
import {useForm} from 'react-hook-form';
import {emailPattern, lowerCasePattern, minLenPattern,
  numberPattern, passwordPattern,
  specialPattern,
  upperCasePattern} from '@app/core/pattern';
import {getFAQs, setLocalStorage} from '@app/core/localStorageService';
import axios from 'axios';
import apiEndpoint from '@app/core/apiend_point';
import {PayloadProps, ApiResponseProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import CommonSnackbar from '@app/core/snackbar';
import AlertDialog from '@app/components/alert-dialog';
import {formatPhoneNumbers, getProfileDetails} from '@app/utils';
import {BadgeContainer, BadgeLabel, BadgeRow}
  from '@app/modules/home/home-components';
import {IconsContainer}
  from '@app/modules/assesment-questions/assesment-questions-components';
import Icon from '@app/components/icon';
import {isMobile} from 'react-device-detect';

/**
 * Renders Component.
 * @return {SignUp} renders Component.
 */
export default function SignUp() {
  const {handleSubmit, register, formState: {errors}, getValues,
    setValue} = useForm();
  const [guestToken, setGuestToken] = useState();
  const [infoMsg, setInfoMsg] = useState<string>('');
  const [showSectionMsg, setShowSectionMsg] = useState(false);
  const [isSubmitting, setIssubmitting] = useState(false);
  const [apperance, setApperance] = useState('success');
  const [openDialog, setOpenDialog] = useState(false);
  const [emailId, setEmailId] = useState('');
  const [pVale, setPvalue] = useState('');
  const [currLink, updateCurrLink] = useState('add-payment');
  // const searchParams = new URLSearchParams(location.search);

  useEffect(()=>{
    // console.log(searchParams.get('plan'), 123);
    setOpenDialog(false);
    guestLogin();
    setIssubmitting(false);
  }, []);
  const onSubmit =(data:any) =>{
    if (isSubmitting) {
      return;
    }
    setIssubmitting(true);
    data['status'] = true;
    setEmailId(data['email']);
    const apiObject: PayloadProps = {
      payload: data,
      method: 'POST',
      apiUrl: apiEndpoint.signUpAPI,
      headers: {Authorization: guestToken}};

    triggerApi(apiObject)
        .then((res: ApiResponseProps) => {
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
  const autoLogin =(data:any) =>{
    axios({
      url: process.env.REACT_APP_API_URL + apiEndpoint.autoLogin,
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
  const handleInputChange = (e:any, field)=>{
    const formattedPhoneNumber = formatPhoneNumbers(e.target.value);
    setValue(field, formattedPhoneNumber);
  };

  const handleChange =(e:any)=>{
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
      headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic R3JpdHdlbGwtQ29yZTpablhaOXB0WEhiNzdwaE9KYkdVcQ=='},
      data: `username=guest@gwc.com&password=Enter@123&offset=${offset}`,
    })
        .then(function(response: any) {
          if (response.status == 200) {
            setGuestToken(response.data.token);
            setLocalStorage('guestToken', response.data.token);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
  }
  return (
    <>
      <CommonSnackbar
        title="Error"
        appearance={apperance}
        message={infoMsg}
        open={showSectionMsg}
        close={() => setShowSectionMsg(false)}
      />
      {openDialog && <AlertDialog header="Account created!"
        // eslint-disable-next-line max-len
        description={'We have sent a verification email to the '+ emailId+
        ', Please confirm your email within 24 hours'}
        onCancel={()=> {
          window.location.replace(
              process.env.REACT_APP_HOMEPAGE +currLink);
        }}></AlertDialog>}
      <form onSubmit={handleSubmit(onSubmit)} onChange={handleChange}
        className='pb-30'>
        <div className='pos-rel pb-28'>
          <CommonInput type='text' placeholder='First Name'
            iconName='user' validate={getValues('first_name') ? true :false}
            register={register('first_name', {required: true})} />
          {errors.first_name &&<Error>First name is required</Error>}
        </div>
        <div className='pos-rel pb-28'>
          <CommonInput type='text' placeholder='Last Name'
            validate={getValues('last_name') ? true :false}
            iconName='user' register={register('last_name', {required: true})}/>
          {errors.last_name &&<Error>Last name is required</Error>}
        </div>
        <div className='pos-rel pb-28'>
          <CommonInput type='text' placeholder='Email'
            iconName='email'
            validate={getValues('email') &&
            getValues('email').match(emailPattern) ? true :false}
            register={register('email', {required: true,
              pattern: emailPattern})} />
          {errors.email &&
          <Error>Enter Valid Email Address.</Error>}
        </div>
        <div className='pos-rel pb-28'>
          <CommonInput type='phone' placeholder='Phone'
            iconName='phone' onKeyUp={(e:any)=> handleInputChange(e, 'phone')}
            validate={getValues('phone') &&
            getValues('phone').length === 14 ?
             true :false}
            register={register('phone', {required: true, minLength: 14})} />
          {errors.phone &&<Error>Enter Valid Phone Number.</Error>}
        </div>
        <div className='pos-rel pb-28'>
          <CommonInput type='password' placeholder='Password'
            iconName='lock'
            onKeyUp={(e)=> {
              setPvalue(e.target.value);
            }}
            validate={getValues('password') &&
            getValues('password').match(passwordPattern) ?
             true :false}
            register={register('password', {required: true,
            // eslint-disable-next-line max-len
              pattern: passwordPattern})} />
          {errors.password &&
          <Error>Enter Valid Password.</Error>}
        </div>
        {pVale ? <BadgeContainer className='pos-unset mb-10'>
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
        <Footer>
          <Button variant={isSubmitting ? 'disabled' : 'primary'} type="submit"
            size='large' width='100%' className={isMobile? '': 'mt-20'}
          >Sign up</Button>
          <BodyText3 className='f-15'>
            By signing up, you agree with the &nbsp;
            <Link onClick={()=> window.open(getFAQs('TermsofUse'))}>
            patient waiver form&nbsp;</Link> and  to our &nbsp;
            <Link onClick={()=> window.open(getFAQs('TermsofUse'))}>
                terms of service&nbsp;</Link> and&nbsp;
            <Link onClick={()=> window.open(getFAQs('PrivacyPolicy'))}>
                privacy policy</Link> .
          </BodyText3>
        </Footer>
      </form>

    </>
  );
}
