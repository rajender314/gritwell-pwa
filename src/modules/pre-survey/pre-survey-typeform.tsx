import Icon from '@app/components/icon';
import {Description} from
  '@app/components/layout-onBoarding/layout-onBoarding-components';
import {getLocalStorage} from '@app/core/localStorageService';
import {BackDrop, CloseIcon, DialogContainer, IconsContainer} from
  '@app/modules/assesment-questions/assesment-questions-components';
import {FlexContainer, Heading3, MainContainer}
  from '@app/styles/common-styles';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';

/**
 * Renders Component.
 * @return {PreSurveyQuestionsTypeForm} renders Component.
 */
export default function PreSurveyQuestionsTypeForm() {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const [configData, updateConfigData]= useState({});
  const [userDetails, updateUserDetails] = useState({});
  const {id}: any = useParams();


  useEffect(()=>{
    const script = document.createElement('script');
    script.src = '//embed.typeform.com/next/embed.js';
    script.async = true;
    document.body.appendChild(script);
    const cData= JSON.parse(getLocalStorage('configList'));
    updateConfigData(cData);
    const userData= JSON.parse(getLocalStorage('userData'));
    updateUserDetails(userData);
    Mixpanel.track(service['preSurveyTypeform']['title'],
        service['preSurveyTypeform']['props']);
    gtag('event', gaService['preSurveyTypeform']['title'], {
      'event_category': gaService['preSurveyTypeform']['category'],
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
    Mixpanel.track(action['preSurveyType']['close']['title'],
        action['preSurveyType']['close']['props']);
    gtag('event', gaAction['preSurveyType']['close']['title'], {
      'event_category': gaAction['preSurveyType']['close']['category'],
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
        <FlexContainer justifyContent={'space-between'} className="w-100"
          style={{zIndex: '99'}}>
          <IconsContainer onClick={()=>{
            navigate('/pre-survey/'+id);
            Mixpanel.track(action['preSurveyType']['back']['title'],
                action['preSurveyType']['back']['props']);
            gtag('event', gaAction['preSurveyType']['back']['title'], {
              'event_category': gaAction['preSurveyType']['back']['category'],
            });
          }}>
            <Icon name={'backArrow'} />
          </IconsContainer>
          {/* <IconsContainer>
          <Icon name='headerLogo'/>
        </IconsContainer>
        <IconsContainer onClick={()=>{
          setOpenDialog(true);
        }}>
          <Icon name={'info'} />
        </IconsContainer> */}
        </FlexContainer>
        <div className='embed-code'
          data-tf-widget={configData['typeFormPreAppointmentId']}
          data-tf-iframe-props={'title='+
       configData['typeFormPreAppointmentTitle']}
          data-tf-medium="snippet"
          data-tf-hidden={'customer_email='+ userDetails['email']+
        ',appointment='+id }
          style={iframeStyle} ></div>
      </MainContainer>
    </>);
}
