/* eslint-disable max-len */
import Icon from '@app/components/icon';
import {IconsContainer} from
  '@app/modules/assesment-questions/assesment-questions-components';
import {FlexContainer} from '@app/styles/common-styles';
import {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import React from 'react';
import {getLocalStorage} from '@app/core/localStorageService';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';

/**
 * Renders Component.
 * @return {BookAppointment} renders Component.
 */
export default function BookAppointment() {
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
      <FlexContainer justifyContent={'space-between'} >
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

      {userDetails['assignment_details'] && userDetails['assignment_details']['ClientAssignments'] &&
     <div className='embed-code-book text-center ovy-scroll iframe-cls'>
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
    </>);
}
