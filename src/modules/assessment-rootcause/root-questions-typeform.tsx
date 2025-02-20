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
 * @return {RoottQuestionsTypeForm} renders Component.
 */
export default function RootQuestionsTypeForm() {
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
    Mixpanel.track(service['rootQuestionsTypeform']['title'], service['rootQuestionsTypeform']['props']);
    gtag('event', gaService['rootQuestionsTypeform']['title'], {
      'event_category': gaService['rootQuestionsTypeform']['category'],
    });
    const userData= JSON.parse(getLocalStorage('userData'));
    updateUserDetails(userData);
  }, []);
  const iframeStyle = {
    // height: '80vh',
    display: 'flex',
    flex: '1',
    // border: '1px solid #cfcfcf',
  };
  /**
   * onclose function declaration
   */
  function onClose() {
    setOpenDialog(false);
    Mixpanel.track(action['rootQuesType']['close']['title'], action['rootQuesType']['close']['props']);
    gtag('event', gaAction['rootQuesType']['close']['title'], {
      'event_category': gaAction['rootQuesType']['close']['category'],
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
      <MainContainer bgColor='#E2D2C0'>
        <FlexContainer
          style={{zIndex: '99'}}
          alignItems={'center'} className="bg-bie w-98">
          <IconsContainer className='clr-green plr-10' onClick={()=>{
            navigate('/rootcause-assessment');
            Mixpanel.track(action['rootQuesType']['back']['title'], action['rootQuesType']['back']['props']);
            gtag('event', gaAction['rootQuesType']['back']['title'], {
              'event_category': gaAction['rootQuesType']['back']['category'],
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
        <div className='embed-code bg-bie'
          data-tf-widget={configData['typeFormRootCauseQuizId']}
          data-tf-iframe-props={'title='+
      configData['typeFormRootCauseQuizTitle']}
          data-tf-medium="snippet"
          data-tf-hidden={'customer_email='+ userDetails['email']}
          style={iframeStyle} ></div>
      </MainContainer>
    </>);
}
