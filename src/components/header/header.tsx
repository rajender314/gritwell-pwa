/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
/* eslint-disable valid-jsdoc */
import cmImg from '@app/assets/images/userIcon.png';
import {
  clearLocalStorage,
  getLocalStorage,
} from '@app/core/localStorageService';
import {IconsContainer} from '@app/modules/assesment-questions/assesment-questions-components';
import {
  BTWSpan,
  HeaderDiv,
  ProDefImage,
  ProfileDropdown,
  ProfileDropdownItem,
  ProfileDropdownMenu,
} from '@app/styles/common-styles';
import React, {useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Icon from '../icon';
import {HeaderMain, HeaderMenuItem} from './header-components';
// import {isMobile} from 'react-device-detect';
import Back from '@app/assets/images/back.png';
import apiEndpoint from '@app/core/apiend_point';
import {gaAction} from '@app/googleAnalytics/googleAnalytics';
import {Mixpanel} from '@app/App';
import {action} from '@app/mixpanel/Service';
import {ApiResponseProps, PayloadProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import {useEffect} from 'react';
import {isMobile} from 'react-device-detect';
import gtag from 'ga-gtag';
import AlertDialog from '../alert-dialog/alert-dialog';
// import {BadgeContainer, BadgeRow} from '@app/modules/home/home-components';

type Props = {
  className?: string;
  showSettings?: boolean;
  navigateLink?: string;
  desktopMenu?: boolean;
  bgCol?: string;
  hideLogo?: boolean;
  showMessage?: boolean;
  hideBack?: boolean;
  homeLink?: boolean;
  chatData?: string;
  hideBackArrow?: boolean;
};

/**
 * Renders Component.
 * @param {Props} props properties *
 * @return {Component} The Header global Component.
 */
export default function Header(props: Props) {
  const navigate = useNavigate();
  const [userDetails, updateUserDetails] = React.useState({});
  const [showProfileMenuDropdown, setShowDropdownMenu] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const token = getLocalStorage('token') ? getLocalStorage('token') : '';
  const [navUrl, updateNavUrl] = useState();

  const profileDropdownOpen = () => {
    setShowDropdownMenu(!showProfileMenuDropdown);
    Mixpanel.track(
        action['Header']['profileDropdown']['title'],
        action['Header']['profileDropdown']['props'],
    );
    gtag('event', gaAction['Header']['profileDropdown']['title'], {
      'event_category': gaAction['Header']['profileDropdown']['category'],
    });
  };
  React.useEffect(() => {
    const userData = getLocalStorage('userData') ?
      JSON.parse(getLocalStorage('userData')) :
      {};
    updateUserDetails(userData);
    const configLists = getLocalStorage('configList') ?
      JSON.parse(getLocalStorage('configList')) :
      {
        ReactAppChatURL: process.env.React_App_CHAT_URL,
      };
    updateNavUrl(configLists['plansPage'] ? configLists['plansPage'] : '');
    console.log(navUrl);
  }, []);
  function checkNavUrl() {
    const userData = getLocalStorage('userData') ?
      JSON.parse(getLocalStorage('userData')) :
      {};
    updateUserDetails(userData);
    const configLists = getLocalStorage('configList') ?
      JSON.parse(getLocalStorage('configList')) :
      {
        ReactAppChatURL: process.env.React_App_CHAT_URL,
      };
    const plansPage = configLists['plansPage'] ? configLists['plansPage'] : '';
    const webSitePage = configLists['websiteUrl'] ?
      configLists['websiteUrl'] :
      'https://www.grit-well.com/';
    const configUrl = localStorage.getItem('isLive')|| window.location.href.includes('health') ?
    webSitePage : plansPage;
    window.location.replace(configUrl);
    updateNavUrl(configUrl);
  }
  function logoutAlert() {
    setShowAlertModal(true);
  }

  async function logoutSession() {
    const apiObject: PayloadProps = {
      payload: {},
      method: 'Post',
      apiUrl: apiEndpoint.logOut,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject).then((response: ApiResponseProps) => {
      navigate('/sign-in');
    });
  }

  // eslint-disable-next-line require-jsdoc
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowDropdownMenu(false);
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <>
      {!props['desktopMenu'] ? (
        <HeaderMain
          className={
            props['className'] ? props['className'] : 'text-center gap-8'
          }
          bgColor={props['bgCol'] ? props['bgCol'] : 'transparent'}
        >
          {!props.hideBackArrow && <span className='mrt-12'><img src={Back} width={20} className='pointer' onClick={()=>{
            window.location.pathname.includes('health-spectrum-start') ? checkNavUrl() : props.chatData === 'chatEndBack' ? navigate('/home') : props.chatData === 'rootHome' ? navigate(-2) : navigate(-1);
          }} /></span>}
          <HeaderDiv className={isMobile? '':'pos-rel'}>
            {/* <BTWSpan className={isMobile ? 'w-15' : 'w-auto'}></BTWSpan> */}
            {!isMobile && <BTWSpan
              className={'w-auto absolute left-0'}
              onClick={() => {
                checkNavUrl();
                Mixpanel.track(
                    action['Header']['backToWeb']['title'],
                    action['Header']['backToWeb']['props'],
                );
                gtag('event', gaAction['Header']['backToWeb']['title'], {
                  'event_category': gaAction['Header']['backToWeb']['category'],
                });
              }}
            >
              {isMobile ? (
               null
              ) : (
                <>
                  Back To Website
                </>
              )}
            </BTWSpan>}
            <span
              className={`${isMobile} ? ${userDetails['stripe_subscription_id']} ? 'align-left w-100' : 'text-center w-100' : 'text-center w-70' 
              ${(!props.hideBackArrow) && 'text-center'} `}
              onClick={() => {
                navigate(
                  props['navigateLink'] ?
                    props['navigateLink'] :
                    userDetails['stripe_subscription_id'] ?
                    '/home' :
                    '/sign-up',
                );
                Mixpanel.track(
                    action['Header']['logo']['title'],
                    action['Header']['logo']['props'],
                );
                gtag('event', gaAction['Header']['logo']['title'], {
                  'event_category': gaAction['Header']['logo']['category'],
                });
              }}
            >
              <Icon name="headerLogo" />
            </span>
            <span></span>
          </HeaderDiv>
          {props.showSettings ? (
            <span
              className="d-flex"
              onClick={() => {
                navigate('/profile-menu');
                Mixpanel.track(
                    action['Header']['settings']['title'],
                    action['Header']['settings']['props'],
                );
                gtag('event', gaAction['Header']['settings']['title'], {
                  'event_category': gaAction['Header']['settings']['category'],
                });
              }}
            >
              <Icon name="setings" />
            </span>
          ) : null}
          {props.showMessage ? (
            <span
              className="d-flex mrt-12"
              onClick={() => {
                navigate('/open-chat');
                Mixpanel.track(
                    action['Header']['chat']['title'],
                    action['Header']['chat']['props'],
                );
                gtag('event', gaAction['Header']['chat']['title'], {
                  'event_category': gaAction['Header']['chat']['category'],
                });
              }}
            >
              <Icon name="textMessage" />
            </span>
          ) : null}
          {!props.hideLogo ? (
            <div>
              <div
                onClick={() => {
                  navigate('/profile');
                  Mixpanel.track(
                      action['Header']['profile']['title'],
                      action['Header']['profile']['props'],
                  );
                  gtag('event', gaAction['Header']['profile']['title'], {
                    'event_category': gaAction['Header']['profile']['category'],
                  });
                }}
              >
                {userDetails['display_url'] &&
                userDetails['stripe_subscription_id'] ? (
                  <IconsContainer className="w-35 text-center">
                    <img
                      src={
                        userDetails && userDetails['display_url'] ?
                          userDetails['display_url'] :
                          cmImg
                      }
                      alt="User"
                    />
                  </IconsContainer>
                ) : userDetails['first_name'] ? (
                  <ProDefImage className="w-35 test">
                    {userDetails['first_name'] ?
                      userDetails['first_name'].charAt(0) +
                        userDetails['last_name'].charAt(0) :
                      null}
                  </ProDefImage>
                ) : null}
              </div>
            </div>
          ) : null}
        </HeaderMain>
      ) : (
        <HeaderMain bgColor={props['bgCol'] ? props['bgCol'] : 'transparent'}>
          <div
            onClick={() => {
              navigate(
                props['navigateLink'] ?
                  props['navigateLink'] :
                  getLocalStorage('token') ?
                  '/home' :
                  '/sign-up',
              );
              Mixpanel.track(
                  action['Header']['logo']['title'],
                  action['Header']['logo']['props'],
              );
              gtag('event', gaAction['Header']['logo']['title'], {
                'event_category': gaAction['Header']['logo']['category'],
              });
            }}
          >
            <Icon name="headerLogo" />
          </div>
          <div className="d-flex gap-30">
            <HeaderMenuItem
              className={location.pathname.includes('home') ? 'active' : ''}
              onClick={() => {
                navigate('/home');
                Mixpanel.track(
                    action['Header']['home']['title'],
                    action['Header']['home']['props'],
                );
                gtag('event', gaAction['Header']['home']['title'], {
                  'event_category': gaAction['Header']['home']['category'],
                });
              }}
            >
              Home
            </HeaderMenuItem>
            {/* <HeaderMenuItem className={location.pathname ===
         '/recommendations' ?
         'active' : ''}
        onClick={()=>{
          navigate('/recommendations');
        }}>
          Daily Goals
        </HeaderMenuItem> */}
            <HeaderMenuItem
              className={
                location.pathname.includes('health-journey') ? 'active' : ''
              }
              onClick={() => {
                navigate('/health-journey');
                Mixpanel.track(
                    action['Header']['journey']['title'],
                    action['Header']['journey']['props'],
                );
                gtag('event', gaAction['Header']['journey']['title'], {
                  'event_category': gaAction['Header']['journey']['category'],
                });
              }}
            >
              Journey
            </HeaderMenuItem>
            <HeaderMenuItem
              className={location.pathname.includes('test') ? 'active' : ''}
              onClick={() => {
                navigate('/tests');
                Mixpanel.track(
                    action['Header']['tests']['title'],
                    action['Header']['tests']['props'],
                );
                gtag('event', gaAction['Header']['tests']['title'], {
                  'event_category': gaAction['Header']['tests']['category'],
                });
              }}
            >
              Tests
            </HeaderMenuItem>
            <HeaderMenuItem
              className={
                location.pathname.includes('appointments') ? 'active' : ''
              }
              onClick={() => {
                navigate('/appointments');
                Mixpanel.track(
                    action['Header']['schedule']['title'],
                    action['Header']['schedule']['props'],
                );
                gtag('event', gaAction['Header']['schedule']['title'], {
                  'event_category': gaAction['Header']['schedule']['category'],
                });
              }}
            >
              Schedule
            </HeaderMenuItem>
            <HeaderMenuItem
              className={
                location.pathname.includes('care-team') ? 'active' : ''
              }
              onClick={() => {
                navigate('/care-team');
                Mixpanel.track(
                    action['Header']['careTeam']['title'],
                    action['Header']['careTeam']['props'],
                );
                gtag('event', gaAction['Header']['careTeam']['title'], {
                  'event_category': gaAction['Header']['careTeam']['category'],
                });
              }}
            >
              Care Team
            </HeaderMenuItem>
          </div>
          {!props.hideLogo ? (
            <div className="d-flex gap-24">
              <div className="d-flex">
                <Icon name="notificationBellIcon" />
              </div>
              <ProfileDropdown
                ref={wrapperRef}
                className="ProfileDropdown"
                onClick={profileDropdownOpen}
              >
                <div className="br-1">
                  {userDetails['display_url'] ? (
                    <IconsContainer className="w-35 text-center">
                      <img
                        src={
                          userDetails && userDetails['display_url'] ?
                            userDetails['display_url'] :
                            cmImg
                        }
                        alt="User"
                      />
                    </IconsContainer>
                  ) : (
                    <ProDefImage className="w-35">
                      {userDetails['first_name'] ?
                        userDetails['first_name'].charAt(0) +
                          userDetails['last_name'].charAt(0) :
                        null}
                    </ProDefImage>
                  )}
                  <IconsContainer className="ro-90">
                    <Icon name="chervonLeft" />
                  </IconsContainer>
                </div>
                {showProfileMenuDropdown && (
                  <ProfileDropdownMenu className="ProfileDropdownMenu">
                    <ProfileDropdownItem
                      className={
                        location.pathname.includes('profile') ? 'active' : ''
                      }
                      onClick={() => {
                        navigate('/profile');
                        Mixpanel.track(
                            action['Header']['profileOpt']['title'],
                            action['Header']['profileOpt']['props'],
                        );
                        gtag('event', gaAction['Header']['profileOpt']['title'], {
                          'event_category': gaAction['Header']['profileOpt']['category'],
                        });
                      }}
                    >
                      <span className="d-flex">
                        <Icon name="user" />
                      </span>
                      Profile
                    </ProfileDropdownItem>
                    <ProfileDropdownItem
                      className={
                        location.pathname.includes('chat') ? 'active' : ''
                      }
                      onClick={() => {
                        navigate('/open-chat');
                        Mixpanel.track(
                            action['Header']['chat']['title'],
                            action['Header']['chat']['props'],
                        );
                        gtag('event', gaAction['Header']['chat']['title'], {
                          'event_category': gaAction['Header']['chat']['category'],
                        });
                      }}
                    >
                      <span className="d-flex">
                        <Icon name="textMessage" />
                      </span>
                      Chat
                    </ProfileDropdownItem>
                    <ProfileDropdownItem
                      className=""
                      onClick={() => {
                        logoutAlert();
                        Mixpanel.track(
                            action['Header']['logout']['title'],
                            action['Header']['logout']['props'],
                        );
                        gtag('event', gaAction['Header']['logout']['title'], {
                          'event_category': gaAction['Header']['logout']['category'],
                        });
                      }}
                    >
                      <span className="d-flex">
                        <Icon name="logout" />
                      </span>
                      Log out
                    </ProfileDropdownItem>
                  </ProfileDropdownMenu>
                )}
              </ProfileDropdown>
            </div>
          ) : null}
        </HeaderMain>
      )}
      {showAlertModal && (
        <AlertDialog
          showCancelButton={true}
          header="Log out"
          description="Are you sure want you to log out?"
          onCancel={() => {
            clearLocalStorage();
            logoutSession();
            setShowAlertModal(false);
          }}
          onClickCancel={() => {
            setShowAlertModal(false);
          }}
          alertType="danger"
        />
      )}
    </>
  );
}
