/* eslint-disable max-len */
import Button from '@app/components/button';
import CommonInput from '@app/components/input';
import apiEndpoint from '@app/core/apiend_point';
import CommonSnackbar from '@app/core/snackbar';
import {PayloadProps, ApiResponseProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import {whiteColor} from '@app/styles';
import {MainContainer, DesktopWidth}
  from '@app/styles/common-styles';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {Error} from '@app/styles/common-styles';

import {recoveryProps} from '@app/utils/props';
import {passwordPattern} from '@app/core/pattern';
import {getLocalStorage} from '@app/core/localStorageService';
import {ContentContainer, IconsContainer}
  from '../assesment-questions/assesment-questions-components';
import Icon from '@app/components/icon/icon';
import {MenuHeader} from './profile-components';
import {FooterButtons, ScrollSection}
  from '../boarding-screens/component/boarding-screen-components';
import Header from '@app/components/header';
import {isMobile} from 'react-device-detect';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';
import {IconTag} from '../sign-up/component/account-access-components';

/**
 * Renders Component.
 * @return {SignUp} renders Component.
 */
export default function ChangePassword() {
  const {handleSubmit, register, formState: {errors}} = useForm();
  const [noRecovery, setNoRecovery] = useState(false);
  const [infoMsg, setInfoMsg] = useState<string>('');
  const [showSectionMsg, setShowSectionMsg] = useState(false);
  const [apperance, setApperance] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const token = getLocalStorage('token') ? getLocalStorage('token') : '';
  const restrictUser = sessionStorage.getItem('resctrict_user_actions');

  useEffect(() => {
    setNoRecovery(false);
    setIsSubmitting(false);
    Mixpanel.track(service['changePassword']['title'],
        service['changePassword']['props']);
    gtag('event', gaService['changePassword']['title'], {
      'event_category': gaService['changePassword']['category'],
    });
  }, []);
  /**
   * get Boarding JSON from the API.
   * @param {recoveryProps} data from the
   *  */
  function onSubmit(data: recoveryProps) {
    Mixpanel.track(action['changePassword']['save']['title'],
        action['changePassword']['save']['props']);
    gtag('event', gaAction['changePassword']['save']['title'], {
      'event_category': gaAction['changePassword']['save']['category'],
    });
    if (isSubmitting) {
      return;
    }
    if (data.password !== data.confirmPassword) {
      setApperance('error');
      setInfoMsg('Password and Confirm Passwords does not match');
      setShowSectionMsg(true);
      return;
    }
    setIsSubmitting(true);
    const apiObject: PayloadProps = {
      payload: {
        oldPassword: data.oldpassword,
        password: data.password,
        confirmPassword: data.confirmPassword,
        // id: userId
      },
      method: 'POST',
      apiUrl: apiEndpoint.changePasswordApi,
      headers: {Authorization: token},
    };

    triggerApi(apiObject)
        .then((res: ApiResponseProps) => {
          // setIsSubmiting(false);
          if (res.status_code == 200) {
            setApperance('success');
            setInfoMsg(res.message);
            setShowSectionMsg(true);
            setTimeout(() => {
              navigate('/sign-up');
              location.reload();
            }, 1500);
            // setRecoveryShowSectionMsg(true);
            setTimeout(() => {
              //   clearLocalStorage();
              //   setRecoveryShowSectionMsg(false);
              setIsSubmitting(false);

              navigate('/sign-up');
              window.location.reload();
            }, 1600);
          } else {
            setApperance('error');
            setInfoMsg(res.message);
            setShowSectionMsg(true);
            setIsSubmitting(false);
          }
        })
        .catch((err: object) => {
          console.log(err, 'Error');
        });
  }
  const handleChange =()=>{
    // console.log(errors);
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
      <MainContainer bgColor={whiteColor}>
        {!isMobile? <Header hideBackArrow={false} className='txt-left bg-white'
          desktopMenu={isMobile ? false : true}/>: null}
        <ScrollSection id="scrollable-div" className='h-150 w-100 '>
          <DesktopWidth>
            <ContentContainer className={isMobile ?'p-0' : 'br-bg mt-40'}>
              <div className={isMobile ? 'p-24 pb-0' : 'p-0'} >
                <IconsContainer onClick={()=>{
                  navigate('/profile-menu');
                  Mixpanel.track(action['changePassword']['back']['title'],
                      action['changePassword']['back']['props']);
                  gtag('event', gaAction['changePassword']['back']['title'], {
                    'event_category': gaAction['changePassword']['back']['category'],
                  });
                }}>
                  <Icon name={'chervonLeft'} />
                </IconsContainer>

              </div>
              <ContentContainer className={isMobile? 'p-24' : 'pb-24' }>
                <MenuHeader>
      Password
                </MenuHeader>
              </ContentContainer>
              {noRecovery|| true ?
              <form onSubmit={handleSubmit(onSubmit)} onChange={handleChange}
                className={isMobile? 'p-24 py-0' : 'pad-30 py-0'}>
                <div className={isMobile ? 'pos-rel  d-flex-col':
                'pos-rel flex-lb-input d-flex'}>
                  <label className='mw-155'>Current Password</label>
                  <div className={isMobile ? 'd-flex justify-content-between' : 'd-flex'}>
                    <CommonInput type={showCurrentPassword ? 'text' : 'password'} placeholder='Current Password'
                      className={isMobile ?'p-12' : 'b-0 mrt-12'}
                      register={register('oldpassword', {required: true,
                      // eslint-disable-next-line max-len
                        pattern: passwordPattern})} />
                    <IconTag className='b-none' onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                      <Icon name={showCurrentPassword ? 'openEye' : 'eye'} />
                    </IconTag>
                  </div>
                  {errors.oldpassword &&
          <Error className={isMobile ? 'mt-32' : ''}>Enter Valid  Password.</Error>}
                </div>
                <div className={isMobile ? 'pos-rel d-flex-col mt-20':
                'pos-rel flex-lb-input d-flex'}>
                  <label className='mw-155'>New Password</label>
                  <div className={isMobile ? 'd-flex justify-content-between' : 'd-flex'}>
                    <CommonInput type={showPassword ? 'text' : 'password'} placeholder='Password'
                      className={isMobile ?'p-12' : 'b-0 mrt-12'}
                      register={register('password', {required: true,
                      // eslint-disable-next-line max-len
                        pattern: passwordPattern})} />
                    <IconTag className='b-none' onClick={() => setShowPassword(!showPassword)}>
                      <Icon name={showPassword ? 'openEye' : 'eye'} />
                    </IconTag>
                  </div>
                  {errors.password &&
          <Error className={isMobile ? 'mt-32' : ''}>Enter Valid New Password.</Error>}
                </div>
                <div className={isMobile ? 'pos-rel d-flex-col mt-20':
                'pos-rel flex-lb-input d-flex'}>
                  <label className='mw-155'>Confirm Password</label>
                  <div className={isMobile ? 'd-flex justify-content-between' : 'd-flex'}>
                    <CommonInput type={showConfirmPassword ? 'text' : 'password'} placeholder='Confirm Password'
                      className={isMobile ?'p-12' : 'b-0 mrt-12'}
                      register={register('confirmPassword', {required: true,
                      // eslint-disable-next-line max-len
                        pattern: passwordPattern})} />
                    <IconTag className='b-none' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      <Icon name={showConfirmPassword ? 'openEye' : 'eye'} />
                    </IconTag>
                  </div>
                  {errors.confirmPassword &&
          <Error className={isMobile ? 'mt-32' : ''}>Enter Valid Confirm Password.</Error>}

                </div>
                <DesktopWidth className='w-100 fixed-footer'>
                  <FooterButtons className={isMobile ? '' :'flx-6'}>
                    <Button variant={restrictUser === 'false' ? 'disabled' :
                      isSubmitting ? 'disabled': 'primary'}
                    type="submit"
                    //   isLoading={props.isDisable}
                    size='large' width='100%'
                    >Save</Button>
                  </FooterButtons>
                </DesktopWidth>
              </form> :
            null}
            </ContentContainer>
          </DesktopWidth>
        </ScrollSection>
      </MainContainer>
    </>
  );
}
