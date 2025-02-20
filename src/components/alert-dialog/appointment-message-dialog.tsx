/* eslint-disable max-len */
import {getLocalStorage} from '@app/core/localStorageService';
import {
  BackDrop,
  DialogContainer,
  IconsContainer,
  ImageWrapper,
} from '@app/modules/assesment-questions/assesment-questions-components';
import {BadgeLabel, BadgeRow} from '@app/modules/home/home-components';
import React, {useEffect, useRef, useState} from 'react';
import cmImg from '@app/assets/images/userIcon.png';
import Calendar from '@app/assets/images/calendar.png';
import {Heading3, ProDefImage} from '@app/styles/common-styles';
import {
  Description,
  DescViewMore,
  ImgTitle,
} from '../layout-onBoarding/layout-onBoarding-components';
import {ContentLeft} from './alert-dialog-components';
import Icon from '../icon';
import {isMobile} from 'react-device-detect';
import {useNavigate} from 'react-router-dom';
import Button from '../button/button';
import {ApiResponseProps, PayloadProps} from '@app/schema/schema';
import apiEndpoint from '@app/core/apiend_point';
import {triggerApi} from '@app/services';
import moment from 'moment';

type Props = {
  header?: String;
  description?: String;
  creDate?: String;
  confirmBtn?: String;
  dialogData?: any;
  subscriptionId?: any;
  alertType?: string;
  width?: string;
  showCancelButton?: boolean;
  onCancel?: (e: any) => void;
};

const countLines = (element) => {
  const elementHeight = element.offsetHeight;
  const lineHeight = parseInt(window.getComputedStyle(element).lineHeight);
  const lines = elementHeight / lineHeight;
  return lines;
};

const useCountLines = (ref) => {
  const [titleLines, setTitleLines] = useState({});
  useEffect(() => {
    if (ref.current) {
      const lines = countLines(ref.current);
      setTitleLines(lines);
    }
  }, [ref.current]);

  return [titleLines];
};

/**
 * Renders Component.
 * @param  {Props} props the api
 * @return {View} renders Component.
 */
export default function AppointmentMsgDialog(props: Props) {
  const [userDetails, updateUserDetails] = useState({});
  const [loader, setLoader] = useState(true);
  const [viewMore, setViewMore] = useState(false);
  const [latestMsg, setLatestMsg] = useState({});
  const dialogRef = useRef(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const handler = (e) => {
      if (!dialogRef?.current?.contains(e.target)) {
        props.onCancel(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return ()=>{
      document.removeEventListener('mousedown', handler);
    };
  }, []);
  useEffect(() => {
    const userData = getLocalStorage('userData') ?
      JSON.parse(getLocalStorage('userData')) :
      {};
    updateUserDetails(userData);
    getLatestMsg();
    setLoader(false);
  }, []);

  const getLatestMsg = async () => {
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.myPreviousNotes,
      headers: {Authorization: getLocalStorage('token')},
    };
    await triggerApi(apiObject).then((response: ApiResponseProps) => {
      if (response.status_code == 200) {
        setLatestMsg(response['data']['result'][0]);
      }
    });
  };

  const textRef = useRef();
  const [textLines] = useCountLines(textRef);
  return (
    <>
      <BackDrop>
        <DialogContainer
          ref={dialogRef}
          className={`${isMobile ? 'm-view' : '' } lr-0 al-center ovy-scroll`}
          style={{width: props.width}}
        >
          {!loader ? (
            <>
              <div className="d-flex justify-content-between w-100">
                <Heading3 className={isMobile ? 'f-16 m-0 txt-left' : 'f-18 m-0'}>
                  Message from your last appointment
                </Heading3>
                <IconsContainer onClick={props.onCancel} className="icon-end ">
                  <Icon name="close" />
                </IconsContainer>
              </div>
              <ContentLeft>
                <BadgeRow className={isMobile ? 'flx-col-15' : null}>
                  {
                    <IconsContainer className="d-flex py-1 w-100">
                      {userDetails['assignment_details']['ClientAssignments'][
                          'Health Coach'
                      ]['display_url'] ? (
                        <ImageWrapper className="w-32">
                          <img
                            src={
                              userDetails['assignment_details'][
                                  'ClientAssignments'
                              ]['Health Coach']['display_url'] ?
                                userDetails['assignment_details'][
                                    'ClientAssignments'
                                ]['Health Coach']['display_url'] :
                                cmImg
                            }
                            alt="User"
                          />
                        </ImageWrapper>
                      ) : (
                        <ProDefImage className="w-40">
                          {userDetails['assignment_details'][
                              'ClientAssignments'
                          ]['Health Coach']['name'].charAt(0)}
                          {userDetails['assignment_details'][
                              'ClientAssignments'
                          ]['Health Coach']['name'].charAt(1)}
                        </ProDefImage>
                      )}
                      <ImgTitle className="f-18 mlt-15 w-100">
                        {' '}
                        <BadgeLabel className={`${isMobile ? 'p-0 f-14s fw' : 'p-0 f-15'}`}>
                          {userDetails['assignment_details'][
                              'ClientAssignments'
                          ]['Health Coach']['name'] ?
                            userDetails['assignment_details'][
                                'ClientAssignments'
                            ]['Health Coach']['name'] :
                            ''}
                        </BadgeLabel>
                        <div className='d-flex'>
                          <img src={Calendar} alt='calendar' width={15} height={15} /> &nbsp;
                          <BadgeLabel className={`${isMobile ? 'f-12' : 'f-14s'} p-0 bold`}>{latestMsg['session']}</BadgeLabel>&nbsp;
                          <BadgeLabel className={`${isMobile ? 'f-12' : 'f-14s'} p-0`}>
                            {moment.parseZone(latestMsg['date']).format('MMM Do, YYYY [at] H:mm')}
                          </BadgeLabel>
                        </div>
                      </ImgTitle>
                    </IconsContainer>
                  }
                </BadgeRow>
              </ContentLeft>
              <ContentLeft className='bg-shadow'>
                <Description ref={textRef} className={`${viewMore ? '' : 'line-clamp'} m-10 p-20 col-black line-break ${isMobile ? 'f-17s' : ''}`}>
                  {latestMsg['message']?.replaceAll(/\n\s*\n/g, '\n')}
                </Description>
                {textLines <= 7 ? null : <DescViewMore className='pl-20' onClick={()=>setViewMore(!viewMore)}>{viewMore ? 'View Less' : 'View More'}</DescViewMore>}
              </ContentLeft>
              <ContentLeft>
                <Button
                  variant={'secondary'}
                  width="auto"
                  onClick={() => {
                    navigate('/appointment-messages');
                  }}
                  className='hover'
                >
                  All Session Notes
                </Button>
              </ContentLeft>
            </>
          ) : null}
        </DialogContainer>
      </BackDrop>
    </>
  );
}
