/* eslint-disable max-len */
import Icon from '@app/components/icon';
import Spinner from '@app/components/icon/icons/loader';
import {Description} from
  '@app/components/layout-onBoarding/layout-onBoarding-components';
import {getLocalStorage} from '@app/core/localStorageService';
import {BackDrop, CloseIcon, DialogContainer, IconsContainer} from
  '@app/modules/assesment-questions/assesment-questions-components';
import {FlexContainer, Heading3, Loader, MainContainer}
  from '@app/styles/common-styles';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';
/**
 * Renders Component.
 * @return {TimelineQuestionsTypeForm} renders Component.
 */
export default function TimelineQuestionsTypeForm() {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const [configData, updateConfigData]= useState({});
  const [loader, setLoader] = useState(true);
  const [userDetails, updateUserDetails] = useState({});


  useEffect(()=>{
    const script = document.createElement('script');
    script.src = '//embed.typeform.com/next/embed.js';
    script.async = true;
    document.body.appendChild(script);
    const cData= JSON.parse(getLocalStorage('configList'));
    updateConfigData(cData);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
    Mixpanel.track(service['timeQuestionsTypeform']['title'], service['timeQuestionsTypeform']['props']);
    gtag('event', gaService['timeQuestionsTypeform']['title'], {
      'event_category': gaService['timeQuestionsTypeform']['category'],
    });
    const userData= JSON.parse(getLocalStorage('userData'));
    updateUserDetails(userData);
  }, []);
  const iframeStyle = {
    // height: '80vh',
    display: 'flex',
    flex: '1',
    width: '100%',
    // border: '1px solid #cfcfcf',
  };
  /**
   * onclose function declaration
   */
  function onClose() {
    setOpenDialog(false);
    Mixpanel.track(action['timeQuesType']['close']['title'], action['timeQuesType']['close']['props']);
    gtag('event', gaAction['timeQuesType']['close']['title'], {
      'event_category': gaAction['timeQuesType']['close']['category'],
    });
  }
  return (
    <>
      {loader ? <Loader>
        <Spinner size="3px" />
      </Loader> : null}
      {openDialog && <BackDrop><DialogContainer>
        <CloseIcon onClick={onClose}>
          <Icon name="close" />
        </CloseIcon>
        <Heading3>
        What is the Health Assessment?
        </Heading3>
        <Description>
        The Health Assessment enables us to match you to the
         appropriate level of care to address the root cause of symptoms.
          <br/><br/>
          <b>Please note:</b>
          If you leave mid-quiz your answers will not be saved.
        </Description>
      </DialogContainer>
      </BackDrop>}
      <MainContainer bgColor='#e8dbce'>
        <FlexContainer
          style={{zIndex: '99'}}
          alignItems={'center'} className="bg-bie w-98">
          <IconsContainer className='clr-green plr-10' onClick={()=>{
            navigate('/timeline-quiz');
            Mixpanel.track(action['timeQuesType']['back']['title'], action['timeQuesType']['back']['props']);
            gtag('event', gaAction['timeQuesType']['back']['title'], {
              'event_category': gaAction['timeQuesType']['back']['category'],
            });
          }}>
            <Icon name={'backArrow'} />
          </IconsContainer>
          <IconsContainer color='black' className='w-100 dflex justify-content-center'>
            <Icon name='headerLogo'/>
          </IconsContainer>
          {/* <IconsContainer className='plr-10' onClick={()=>{
            setOpenDialog(true);
          }}>
            <Icon name={'info'} />
          </IconsContainer> */}
        </FlexContainer>
        <div
          data-tf-widget={configData['typeFormTImelineQuizId']}
          data-tf-iframe-props={'title='+
      configData['typeFormTImelineQuizTitle']}
          data-tf-medium="snippet"
          data-tf-hidden={'customer_email='+ userDetails['email']}
          style={iframeStyle} ></div>
      </MainContainer>
    </>);
}
