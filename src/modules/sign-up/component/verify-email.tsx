/* eslint-disable max-len */
import Button from '@app/components/button';
import Header from '@app/components/header';
import Icon from '@app/components/icon';
import {ContentContainer} from
  '@app/components/layout-onBoarding/layout-onBoarding-components';
import apiEndpoint from '@app/core/apiend_point';
import {PayloadProps, ApiResponseProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import {whiteColor} from '@app/styles';
import {MainContainer, DesktopWidth, Heading, PageCenter}
  from '@app/styles/common-styles';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';

/**
 * Renders Component.
 * @return {SignUp} renders Component.
 */
export default function VerifyEmail() {
  const navigate = useNavigate();
  const {id}: any = useParams();
  const [state, setState] = useState('');
  const d = new Date();
  const offset = d.getTimezoneOffset();
  useEffect(()=>{
    setState('verifying');
    setTimeout(() => {
      guestLogin();
    }, 1500);
    Mixpanel.track(service['verifyEmail']['title'],
        service['verifyEmail']['props']);
    gtag('event', gaService['verifyEmail']['title'], {
      'event_category': gaService['verifyEmail']['category'],
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
            verifyEmail(response.data.token);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
  }
  /**
   * @param {token} token for the api
   * get Boarding JSON from the API.
   *  */
  function verifyEmail(token) {
    const apiObject: PayloadProps = {
      payload: {
        token_id: id,
      },
      method: 'POST',
      apiUrl: apiEndpoint.resetPasswordApi,
      headers: {Authorization: token},
    };

    triggerApi(apiObject)
        .then((res: ApiResponseProps) => {
          // setIsSubmiting(false);
          if (res.status_code == 200) {
            setState('success');
          } else {
            setState('fail');
          }
        })
        .catch((err: object) => {
          console.log(err, 'Error');
        });
  }
  return (
    <>
      <MainContainer bgColor={whiteColor}>
        <Header hideBackArrow={false} hideLogo={true} />
        <PageCenter>
          <DesktopWidth>
            <ContentContainer className='flex-center'>
              {state === 'success' ? <div className='icon-cont'>
                <Icon name='check'/>
              </div> : null}
            </ContentContainer>
            <ContentContainer className='warning-message'>
              <Heading>{state === 'success' ?
              'Your email has been verified successfully.' :
              state === 'verifying' ? 'We are verifying your email.' :
               'Your verification link expired.'}</Heading>
              {(state !== 'success' && state !== 'verifying') && <p>Please click on “Resend Verification” on the log in screen to receive a new link.</p>}
            </ContentContainer>
            <ContentContainer className='button-container'>
              <Button variant={'primary'}
                size='large' width='100%'
                onClick={()=>{
                  navigate('/sign-in');
                  Mixpanel.track(action['verifyEmail']['logIn']['title'],
                      action['verifyEmail']['logIn']['props']);
                  gtag('event', gaAction['verifyEmail']['logIn']['title'], {
                    'event_category': gaAction['verifyEmail']['logIn']['category'],
                  });
                }}
              >Login</Button>
            </ContentContainer>
          </DesktopWidth>
        </PageCenter>
      </MainContainer>
    </>
  );
}
