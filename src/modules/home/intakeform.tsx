import Icon from '@app/components/icon';
import {Description} from
  '@app/components/layout-onBoarding/layout-onBoarding-components';
import {getLocalStorage} from '@app/core/localStorageService';
import {BackDrop, CloseIcon, DialogContainer, IconsContainer} from
  '@app/modules/assesment-questions/assesment-questions-components';
import {FlexContainer, Heading3,
  MainContainer} from '@app/styles/common-styles';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';

/**
 * Renders Component.
 * @return {IntakeForm} renders Component.
 */
export default function IntakeForm() {
  const [openDialog, setOpenDialog] = useState(false);
  const [configData, updateConfigData]= useState({});
  const [userDetails, updateUserDetails] = useState({});

  const navigate = useNavigate();

  useEffect(()=>{
    const script = document.createElement('script');
    script.src = '//embed.typeform.com/next/embed.js';
    script.async = true;
    document.body.appendChild(script);
    const cData= JSON.parse(getLocalStorage('configList'));
    updateConfigData(cData);
    const userData= JSON.parse(getLocalStorage('userData'));
    updateUserDetails(userData);
    Mixpanel.track(service['intakeForm']['title'],
        service['intakeForm']['props']);
    gtag('event', gaService['intakeForm']['title'], {
      'event_category': gaService['intakeForm']['category'],
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
    Mixpanel.track(action['intakeForm']['close']['title'],
        action['intakeForm']['close']['props']);
    gtag('event', gaAction['intakeForm']['close']['title'], {
      'event_category': gaAction['intakeForm']['close']['category'],
    });
  }
  return (
    <>
      {openDialog && <BackDrop><DialogContainer className='t-10'>
        <CloseIcon onClick={onClose}>
          <Icon name="close" />
        </CloseIcon>
        <Heading3>
        What is the intake form and why is it important?        </Heading3>
        <Description>
        The intake form helps us understand
        your unique timeline, medical, family
        and lifestyle history, so that we can
         best determine an individualized
         approach to address the root cause(s)
          of your symptoms. Health issues are usually
           influenced by many factors - so we must
           accurately assess all factors! Thank you
            for allowing us to be thorough!
        </Description>
      </DialogContainer>
      </BackDrop>}
      <MainContainer bgColor='#f9d4a9'>
        <FlexContainer justifyContent={'space-between'} className="w-98">
          <IconsContainer onClick={()=>{
            navigate('/intake-home');
            Mixpanel.track(action['intakeForm']['back']['title'],
                action['intakeForm']['back']['props']);
            gtag('event', gaAction['intakeForm']['back']['title'], {
              'event_category': gaAction['intakeForm']['back']['category'],
            });
          }}>
            <Icon name={'backArrow'} />
          </IconsContainer>
          <IconsContainer color='black'>
            <Icon name='headerLogo'/>
          </IconsContainer>
          <IconsContainer onClick={()=>{
            setOpenDialog(true);
            Mixpanel.track(action['intakeForm']['info']['title'],
                action['intakeForm']['info']['props']);
            gtag('event', gaAction['intakeForm']['info']['title'], {
              'event_category': gaAction['intakeForm']['info']['category'],
            });
          }}>
            <Icon name={'info'} />
          </IconsContainer>
        </FlexContainer>
        <div className='embed-code'
          data-tf-widget={configData['typeFormIntakeId']}
          data-tf-iframe-props={'title='+configData['typeFormIntakeTitle']}
          data-tf-medium="snippet"
          data-tf-hidden={'customer_email='+ userDetails['email']}
          style={iframeStyle} ></div>
      </MainContainer>
    </>);
}
