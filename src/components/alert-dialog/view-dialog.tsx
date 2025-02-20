/* eslint-disable max-len */
import {getLocalStorage} from '@app/core/localStorageService';
import {BackDrop, DialogContainer, IconsContainer, ImageWrapper}
  from '@app/modules/assesment-questions/assesment-questions-components';
import {BadgeLabel, BadgePill, BadgeRow} from '@app/modules/home/home-components';
import React, {useEffect, useRef, useState} from 'react';
import cmImg from '@app/assets/images/userIcon.png';
// import cer1 from '@app/assets/images/cer1.png';
// import cer2 from '@app/assets/images/cer2.png';
import {Heading3, ProDefImage} from '@app/styles/common-styles';
import {Description, ImgTitle} from '../layout-onBoarding/layout-onBoarding-components';
import {ContentLeft} from './alert-dialog-components';
import Icon from '../icon';
import {isMobile} from 'react-device-detect';


type Props = {
    header ?:String;
    description?:String;
    creDate?:String;
    confirmBtn?:String;
    dialogData?:any;
    subscriptionId?:any;
    alertType?:string;
    width?: string;
    showCancelButton?: boolean
  onCancel?: (e: any) => void

}
/**
 * Renders Component.
 * @param  {Props} props the api
 * @return {View} renders Component.
 */
export default function ViewDialog(props: Props) {
  const [userDetails, updateUserDetails] = useState({});
  const [loader, setLoader] = useState(true);
  const dialogRef = useRef(null);
  useEffect(()=>{
    const handler = (e: any) => {
      if (!dialogRef.current?.contains(e.target)) {
        props.onCancel(false);
      };
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);
  useEffect(()=>{
    const userData= getLocalStorage('userData')?
     JSON.parse(getLocalStorage('userData')) :{};
    updateUserDetails(userData);
    setLoader(false);
  }, []);
  return (
    <>
      <BackDrop><DialogContainer ref={dialogRef} className='align-items-center ovy-scroll' style={{width: props.width}}>
        {!loader ?<>
          <div className='d-flex justify-content-end w-100'> <IconsContainer onClick={props.onCancel} className="icon-end ">
            <Icon name='close'/>
          </IconsContainer></div>
          {props['header'] != 'message' ?<div className='p-16 w-100'>
            <BadgePill className='dialog-pill width-unset bg-col '>
              {props['header']}
            </BadgePill>
            <IconsContainer className="layout2 mt-20">
              <ImageWrapper className='text-center m-10 w-80'>
                {userDetails['assignment_details']['ClientAssignments'][props['header']]['display_url'] ?
                <img style={{boxShadow: 'rgb(204, 204, 204) 0px 2px 4px'}} src={userDetails['assignment_details']['ClientAssignments'][props['header']]['display_url'] ?
                    userDetails['assignment_details']['ClientAssignments'][props['header']]['display_url'] :cmImg} alt="User" />:
                      <ProDefImage className='w-72'>{userDetails['assignment_details']['ClientAssignments']['Health Coach']['name'].charAt(0)}
                      </ProDefImage>}
              </ImageWrapper>
              <BadgeLabel className='pending transparent text-center mb-10 p-0 no-pointer w-500 fs-20'>
                {userDetails['assignment_details']['ClientAssignments'][props['header']]['name']}
              </BadgeLabel>
            </IconsContainer>
            <ContentLeft>
              <Heading3 className={isMobile ? 'f-16 m-0' : 'f-18 m-0'}>Background</Heading3>
              <Description className='m-10'>{userDetails['assignment_details']['ClientAssignments'][props['header']]['background']}</Description>
            </ContentLeft>
            {/* <ContentLeft>
              <Heading3 className='f-16 m-0'>Certifications</Heading3>
              <div className='d-flex mt-10'>
                <ImageWrapper>
                  <img src={cer1} alt="User" />
                </ImageWrapper>
                <ImageWrapper className='mlt-15'>
                  <img src={cer2} alt="User" />
                </ImageWrapper>
              </div>
            </ContentLeft> */}
          </div> :
           <ContentLeft>
             <Heading3 className={isMobile ? 'f-16 m-0' : 'f-18 m-0'}>Message from your latest appointment</Heading3>
             <Description className='m-10 line-break'>{[props['description']]}</Description>
             <BadgeRow className={isMobile ? 'flx-col-15' : null}>
               {<IconsContainer className='d-flex'>
                 {userDetails['assignment_details']['ClientAssignments']['Health Coach']['display_url'] ? <ImageWrapper className='w-32'>
                   <img src={userDetails['assignment_details']['ClientAssignments']['Health Coach']['display_url'] ?
                    userDetails['assignment_details']['ClientAssignments']['Health Coach']['display_url'] :cmImg}
                   alt="User" />
                 </ImageWrapper> :
                 <ProDefImage className='w-40'>{userDetails['assignment_details']['ClientAssignments']['Health Coach']['name'].charAt(0)}
                   {userDetails['assignment_details']['ClientAssignments']['Health Coach']['name'].charAt(1)}</ProDefImage>}
                 <ImgTitle className='f-18 mlt-15'> <BadgeLabel className='p-0 f-15'>
                   {userDetails['assignment_details']['ClientAssignments']['Health Coach']['name'] ?
                    userDetails['assignment_details']['ClientAssignments']['Health Coach']['name'] :
                  ''}
                 </BadgeLabel>
                 </ImgTitle>
               </IconsContainer>}
             </BadgeRow>
             {props['creDate'] ? <BadgePill className={isMobile ? 'mt-20 bg-bei' : 'mt-20 fit-content bg-bei'}>
               {props['creDate']}
             </BadgePill> : null}
           </ContentLeft>}
        </> :
        null}
      </DialogContainer>
      </BackDrop>
    </>
  );
}
