import {IconName, IconsContainer} from
  '@app/modules/assesment-questions/assesment-questions-components';
import {FooterButtons} from
  '@app/modules/boarding-screens/component/boarding-screen-components';
import * as React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Icon from '../icon/icon';
type Props = {
  className ?:string;
}

/**
 * Renders Component.
 * @param {Props} props properties *
 * @return {Component} The Header global Component.
 */
export default function BotoomHeader(props : Props) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <FooterButtons className='js-around al-center fixed'>
        <IconsContainer className={location.pathname === '/home' ?
        'active flex-col' : 'flex-col'} onClick={()=>{
          navigate('/home');
        }}>
          <Icon name={'home'} />
          <IconName>
          Home
          </IconName>
        </IconsContainer>
        <IconsContainer
          className={location.pathname.includes('health-journey') ?
        'active flex-col' : 'flex-col'} onClick={()=>{
            navigate('/health-journey');
          }}>
          <Icon name={'journey'} />
          <IconName>
Journey
          </IconName>
        </IconsContainer>
        <IconsContainer className={location.pathname.includes( 'test') ?
        'active flex-col' : 'flex-col'} onClick={()=>{
          navigate('/tests');
        }}>
          <Icon name={'test'} />
          <IconName>
          Tests
          </IconName>

        </IconsContainer>

        <IconsContainer className={location.pathname.includes('/appointments') ?
        'active flex-col' : 'flex-col'} onClick={()=>{
          navigate('/appointments');
        }}>
          <Icon name={'calendar'} />
          <IconName>
          Schedule
          </IconName>

        </IconsContainer>
        <IconsContainer className={location.pathname === '/care-team' ?
        'active flex-col' : 'flex-col'} onClick={()=>{
          navigate('/care-team');
        }}>
          <Icon name={'usersIcon'} />
          <IconName>
          Care Team
          </IconName>
        </IconsContainer>
      </FooterButtons>

    </>
  );
}
