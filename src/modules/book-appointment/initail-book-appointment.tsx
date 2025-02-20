/* eslint-disable max-len */
import Icon from '@app/components/icon';
import {IconsContainer} from
  '@app/modules/assesment-questions/assesment-questions-components';
import {FlexContainer, MainContainer} from '@app/styles/common-styles';
import {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import React from 'react';
import {getLocalStorage} from '@app/core/localStorageService';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';
import Header from '@app/components/header';
// import {HeaderMain} from '@app/components/header/header-components';
import {isMobile} from 'react-device-detect';
import {LayoutWrapper, RightContainer, RightContent, BackIconContainer} from '../sign-up/component/signup.components';
import {InflamationHeading, InflamtionContent} from '../home/home-components';

/**
 * Renders Component.
 * @return {BookAppointment} renders Component.
 */
export default function BookInitialAppointment() {
  const navigate = useNavigate();
  const [userDetails, updateUserDetails] = useState({});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const {id}: any = useParams();
  const [role, updateRole] = useState(id);
  const iframeStyle = {
    height: '85vh',
    border: '1px solid #cfcfcf',
  };
  useEffect(()=>{
    updateRole(id ? id === 'CM' ? 'Care Manager' : id : 'Health Coach');
    const script = document.createElement('script');
    script.src = 'https://embed.acuityscheduling.com/js/embed.js';
    script.async = true;
    document.body.appendChild(script);
    const userData= JSON.parse(getLocalStorage('userData'));
    updateUserDetails(userData);
    // setTimeout(() => {
    //   document.getElementById('email').value = '132';
    // }, 5000);
    Mixpanel.track(service['bookAppointment']['title'], service['bookAppointment']['props']);
    gtag('event', gaService['bookAppointment']['title'], {
      'event_category': gaService['bookAppointment']['category'],
    });
  }, []);
  return (
    <>
      <MainContainer bgColor={isMobile? '#ffffff':'#FAFAFC'}
        className={isMobile ? 'fxh-100' : ''}>
        {!isMobile? <Header hideBackArrow={false} className='txt-left'
          desktopMenu={isMobile ? false : true}/>: null}
        {/* {isMobile? <HeaderMain className={isMobile ? 'text-center d-flex js-bet p-10' :'text-center d-flex js-bet'}>
          <IconsContainer className='d-flex mrt-6' onClick={() => {
            navigate('/home');
          }
          }>
            <Icon name={'chervonLeft'} />
          </IconsContainer>
          <IconsContainer className='flex-1'
            color='black'
            onClick={() => (0)
            }>
            <Icon name='headerLogo' />
          </IconsContainer>
        </HeaderMain>: null} */}
        <LayoutWrapper>
          {/* <LeftContainer style={isMobile ? {display: 'none'} : {}}>
            <ImageContainer>
              <ImageHolder className='has-svg'>
                <Icon name='gritwellLogo'/>
              </ImageHolder>
            </ImageContainer>
          </LeftContainer> */}
          <RightContainer>
            <RightContent>
              <div className="content-wrapper" style={isMobile ? {height: 'auto'} : {height: '100%'}}>
                <BackIconContainer onClick={()=>{
                  navigate('/book-initial-appointment');
                  Mixpanel.track(action['bookAppointment']['back']['title'], action['bookAppointment']['back']['props']);
                  gtag('event', gaAction['bookAppointment']['back']['title'], {
                    'event_category': gaAction['bookAppointment']['back']['category'],
                  });
                }}>
                  <Icon name='backarrow'/>
                </BackIconContainer>
                <InflamationHeading style={{marginTop: '8px'}}>Select a time</InflamationHeading>
                <InflamtionContent className='mt-0'>Please select a day and time that works best.</InflamtionContent>
                <div className='appointmentNote'><span style={{fontWeight: 'bold'}}>Note:</span> If you reschedule or cancel within 24 hours of your appointment you will be charged a $25 fee</div>
                {userDetails['assignment_details'] && userDetails['assignment_details']['ClientAssignments'] &&
     <div className='embed-code text-center ovy-scroll iframe-cls'>
       { !(searchParams.get('link')) ? <iframe sandbox="allow-modals allow-forms allow-popups allow-scripts
        allow-same-origin allow-top-navigation allow-top-navigation-by-user-activation"
       src={'https://app.squarespacescheduling.com/schedule.php?owner='+
         userDetails['assignment_details']['ClientAssignments'][role]['acuity_owner_id']+
         '&calendarID='+userDetails['assignment_details']['ClientAssignments'][role]['acuity_calendar_id']+
         '&appointmentType='+userDetails['assignment_details']['ClientAssignments'][role]['appointment_type']+
        '&firstName='+userDetails['first_name']+'&lastName='+userDetails['last_name']+
        '&phone='+userDetails['phone']+'&email='+userDetails['email']}
       title="Schedule Appointment"
       style={iframeStyle}
       frameBorder="0"></iframe> :
        <iframe src={searchParams.get('link')} title="Schedule Appointment"
          style={iframeStyle}
          frameBorder="0"></iframe>}
     </div>}
              </div>
            </RightContent>
          </RightContainer>
        </LayoutWrapper>
      </MainContainer>
      <FlexContainer justifyContent={'space-between'} style={{display: 'none'}}>
        <IconsContainer onClick={()=>{
          navigate('/appointments');
          Mixpanel.track(action['bookAppointment']['back']['title'], action['bookAppointment']['back']['props']);
          gtag('event', gaAction['bookAppointment']['back']['title'], {
            'event_category': gaAction['bookAppointment']['back']['category'],
          });
        }}>
          <Icon name={'chervonLeft'} />
        </IconsContainer>
        {/* <IconsContainer>
          <Icon name='headerLogo'/>
        </IconsContainer> */}
      </FlexContainer>
    </>);
}
