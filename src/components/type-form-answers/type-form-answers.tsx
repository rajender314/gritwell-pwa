/* eslint-disable max-len */
import {DesktopWidth, Heading3, Loader, MainContainer}
  from '@app/styles/common-styles';
import React, {useEffect, useState} from 'react';
import {Description} from '../layout-onBoarding/layout-onBoarding-components';
import Button from '../button';
import {getLocalStorage} from '@app/core/localStorageService';
import {PayloadProps, ApiResponseProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import {ContentBox} from '@app/modules/home/home-components';
import {FooterButtons, ScrollSection} from
  '@app/modules/boarding-screens/component/boarding-screen-components';
import {ContentContainer}
  from '@app/modules/assesment-questions/assesment-questions-components';
import {whiteColor} from '@app/styles';
import Spinner from '../icon/icons/loader';
import {isMobile} from 'react-device-detect';
import Header from '../header';
import {Mixpanel} from '@app/App';
import {action} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction} from '@app/googleAnalytics/googleAnalytics';

type Props = {
    header ?:String;
    dialogData?:any;
    // onCancel?: (e: any) => void
  onCancel?: any;

}
/**
 * Renders Component.
 * @param  {Props} props the api
 * @return {AlertDialog} renders Component.
 */
export default function TypeFormAnswers(props: Props) {
  const [dialogStatus, updateDialogStatus] = useState('intial');
  const [dialogMsg, updateDialogMsg] =
  useState(props['dialogData']['description']);
  const [qList, setQList] = useState([]);
  const [loader, setLoader] = useState(true);
  const restrictUser = sessionStorage.getItem('resctrict_user_actions');
  useEffect(()=>{
    setLoader(true);
    getData();
  }, []);

  /**
   * @param {payload} payload
   * @param {method} method
   */
  async function getData() {
    updateDialogStatus('intial');
    updateDialogMsg(props['dialogData']['loadingMsg']);
    console.log(dialogMsg);
    const apiObject: PayloadProps = {
      payload: {

      },
      method: 'GET',
      apiUrl: props['dialogData']['getAPI'],
      headers: {Authorization: getLocalStorage('token')},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            setQList(response.data.typeform);
            setLoader(false);
          } else {
            setLoader(false);
          }
        });
  }

  /**
   * @param {payload} payload
   * @param {method} method
   */
  async function confirm() {
    updateDialogStatus('loading');
    updateDialogMsg(props['dialogData']['loadingMsg']);
    const apiObject: PayloadProps = {
      payload: {

      },
      method: 'GET',
      apiUrl: props['dialogData']['downloadAPI'],
      headers: {Authorization: getLocalStorage('token')},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            window.open(response.data);
            setTimeout(()=>{
            //   updateDialogStatus('confirmed');
              updateDialogMsg(response.data);
            }, 1000);
            // setTimeout(() => {
            //   props.onCancel(true);
            // }, 3000);
          } else {
            // updateDialogStatus('error');
            updateDialogMsg(response.data);
            // setTimeout(() => {
            //   props.onCancel(true);
            // }, 2000);
          }
        });
  }

  return (
    <>
      {
        <>
          {loader ? <Loader>
            <Spinner size="6px" />
          </Loader> : null}
          <MainContainer bgColor={whiteColor}
            className={isMobile ? 'fxh-100' : ''}>
            <Header hideBackArrow={false}
              className="justify-content-between"
              desktopMenu={isMobile ? false : true}
            />
            <Heading3>
              {props['dialogData']['heading']}
            </Heading3>
            <ScrollSection id="scrollable-div" className={isMobile?
              'flex-1  mb-96 scroll-h256': 'flex-1 flex-unset mb-96'}>
              <DesktopWidth >
                {qList.length ? <ContentContainer
                  className={isMobile?'py-0':'p-0'}>
                  {qList.map((info:any, i:number)=>{
                    return (
                      <>

                        <ContentBox key={i} className="w-100 m-auto  flex-column align-items-start">
                          <div className='d-flex align-items-start gap-8'>
                            {i + 1}.
                            <div>
                              <Description className='f-17 m-0'>
                                {info['question']}
                              </Description>
                              <Description className='f-17 ans'>
                                {info['answer']}
                              </Description>
                            </div>
                          </div>
                          {info['children'].length ? info['children'].map((det:any, j:number)=>{
                            return (
                              <ContentBox key={j} className="w-100 m-auto">
                                <div className='d-flex align-items-start gap-8'>
                                  {i + 1}.{j + 1}.
                                  <div>
                                    <Description className='f-17 m-0'>
                                      {det['question']}
                                    </Description>
                                    <Description className='f-17 ans'>
                                      {det['answer']}
                                    </Description>
                                  </div>
                                </div>
                              </ContentBox>
                            );
                          }) : ''}
                        </ContentBox>

                      </>
                    );
                  },
                  )
                  }
                </ContentContainer>:
            <ContentContainer className='h-250 text-center  '>
              No Data Found
            </ContentContainer>
                }
              </DesktopWidth>
            </ScrollSection>
            <DesktopWidth className={isMobile?
          'w-100 fixed-footer h-64 max-h-64 b-64':
          'w-100 fixed-footer h-64 max-h-64'}
            bgColor={whiteColor}>
              <>
                <FooterButtons >
                  <Button variant={restrictUser ==='false' ? 'disabled' : dialogStatus == 'intial' && qList.length ?
                'primary' : 'disabled'}
                  size='large' width='100%'
                  onClick={()=>{
                    if (qList.length) {
                      confirm();
                    }
                    Mixpanel.track(action['typeFormAns']['download']['title'],
                        action['typeFormAns']['download']['props']);
                    gtag('event', gaAction['typeFormAns']['download']['title'], {
                      'event_category': gaAction['typeFormAns']['download']['category'],
                    });
                  }}
                  className={'flx-center'}
                  >Download</Button>
                  <Button variant={restrictUser ==='false' ? 'disabled' : 'secondary'}
                    size='large' width='100%'
                    onClick={()=>{
                      props.onCancel(false);
                      Mixpanel.track(action['typeFormAns']['cancel']['title'],
                          action['typeFormAns']['cancel']['props']);
                      gtag('event', gaAction['typeFormAns']['cancel']['title'], {
                        'event_category': gaAction['typeFormAns']['cancel']['category'],
                      });
                    }}
                    className={'flx-center'}
                  >Cancel</Button>
                </FooterButtons>

              </>
            </DesktopWidth>

          </MainContainer>
        </>}

    </>
  );
}
