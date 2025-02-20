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
 * @return {AssesmentQuestionsTypeForm} renders Component.
 */
export default function AssesmentQuestionsTypeForm() {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const [configData, updateConfigData]= useState({});
  const [loader, setLoader] = useState(true);

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
    Mixpanel.track(service['assesmentQuestionsTypeform']['title'], service['assesmentQuestionsTypeform']['props']);
    gtag('event', gaService['assesmentQuestionsTypeform']['title'], {
      'event_category': gaService['assesmentQuestionsTypeform']['category'],
    });
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
    Mixpanel.track(action['assesmentQuesType']['close']['title'], action['assesmentQuesType']['close']['props']);
    gtag('event', gaAction['assesmentQuesType']['close']['title'], {
      'event_category': gaAction['assesmentQuesType']['close']['category'],
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
      <MainContainer bgColor='#f9d4a9'>
        <FlexContainer justifyContent={'space-between'}
          style={{zIndex: '99'}}
          alignItems={'center'} className="bg-bie w-98">
          <IconsContainer className='clr-green plr-10' onClick={()=>{
            navigate('/assesment');
            Mixpanel.track(action['assesmentQuesType']['back']['title'], action['assesmentQuesType']['back']['props']);
            gtag('event', gaAction['assesmentQuesType']['back']['title'], {
              'event_category': gaAction['assesmentQuesType']['back']['category'],
            });
          }}>
            <Icon name={'backArrow'} />
          </IconsContainer>
          <IconsContainer color='black'>
            <Icon name='headerLogo'/>
          </IconsContainer>
          <IconsContainer className='plr-10' onClick={()=>{
            setOpenDialog(true);
          }}>
            <Icon name={'info'} />
          </IconsContainer>
        </FlexContainer>
        <div className='embed-code bg-bie'
          data-tf-widget={configData['typeFormHealthAssesmentId']}
          data-tf-iframe-props={'title='+
      configData['typeFormHealthAssesmentTitle']}
          data-tf-medium="snippet"
          data-tf-hidden="utm_source=xxxxx,utm_medium=xxxxx,
   utm_campaign=xxxxx,utm_term=xxxxx"
          style={iframeStyle} ></div>
      </MainContainer>
    </>);
}
