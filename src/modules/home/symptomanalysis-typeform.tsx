/* eslint-disable max-len */
import Icon from '@app/components/icon';
import {Description} from
  '@app/components/layout-onBoarding/layout-onBoarding-components';
import {getLocalStorage} from '@app/core/localStorageService';
import {BackDrop, CloseIcon, DialogContainer, IconsContainer} from
  '@app/modules/assesment-questions/assesment-questions-components';
import {FlexContainer, Heading3, MainContainer}
  from '@app/styles/common-styles';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';

/**
 * Renders Component.
 * @return {SymptomAnalysis} renders Component.
 */
export default function SymptomAnalysis() {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const [configData, updateConfigData]= useState({});
  const [userDetails, updateUserDetails] = useState({});

  useEffect(()=>{
    const script = document.createElement('script');
    script.src = '//embed.typeform.com/next/embed.js';
    script.async = true;
    document.body.appendChild(script);
    const cData= JSON.parse(getLocalStorage('configList'));
    updateConfigData(cData);
    const userData= JSON.parse(getLocalStorage('userData'));
    updateUserDetails(userData);
    Mixpanel.track(service['symptomAnalysisTypeform']['title'],
        service['symptomAnalysisTypeform']['props']);
    gtag('event', gaService['symptomAnalysisTypeform']['title'], {
      'event_category': gaService['symptomAnalysisTypeform']['category'],
    });
  }, []);
  const iframeStyle = {
    height: '80vh',
    border: '1px solid #cfcfcf',
  };
  /**
   * onclose function declaration
   */
  function onClose() {
    setOpenDialog(false);
    Mixpanel.track(action['symptomAnalysisType']['close']['title'],
        action['symptomAnalysisType']['close']['props']);
    gtag('event', gaAction['symptomAnalysisType']['close']['title'], {
      'event_category': gaAction['symptomAnalysisType']['close']['category'],
    });
  }
  return (
    <>
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
      <MainContainer bgColor='#f9d4a9'>
        <FlexContainer justifyContent={'space-between'} className="w-98"
          style={{zIndex: '99'}}>
          <IconsContainer onClick={()=>{
            navigate('/symptom-home');
            Mixpanel.track(action['symptomAnalysisType']['back']['title'],
                action['symptomAnalysisType']['back']['props']);
            gtag('event', gaAction['symptomAnalysisType']['back']['title'], {
              'event_category': gaAction['symptomAnalysisType']['back']['category'],
            });
          }}>
            <Icon name={'backArrow'} />
          </IconsContainer>
          <IconsContainer color='black'>
            <Icon name='headerLogo'/>
          </IconsContainer>
          <IconsContainer onClick={()=>{
            // setOpenDialog(true);
            Mixpanel.track(action['symptomAnalysisType']['info']['title'],
                action['symptomAnalysisType']['info']['props']);
            gtag('event', gaAction['symptomAnalysisType']['info']['title'], {
              'event_category': gaAction['symptomAnalysisType']['info']['category'],
            });
          }}>
            <Icon name={'info'} />
          </IconsContainer>
        </FlexContainer>
        <div className='embed-code'
          data-tf-widget={configData['typeFormSymptomAnalysisId']}
          data-tf-iframe-props={'title='+
        configData['typeFormSymptomAnalysisTitle']}
          data-tf-medium="snippet"
          data-tf-hidden={'customer_email='+ userDetails['email']}
          style={iframeStyle} ></div>
      </MainContainer>
    </>);
}
