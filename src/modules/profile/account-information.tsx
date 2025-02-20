/* eslint-disable max-len */
import Icon from '@app/components/icon';
import {DesktopWidth, MainContainer} from '@app/styles/common-styles';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ContentContainer, IconsContainer, ImageWrapper}
  from '../assesment-questions/assesment-questions-components';
import {InfoHeading, MenuHeader} from './profile-components';
import {BadgeLabel} from '../home/home-components';
import {FooterButtons, ScrollSection}
  from '../boarding-screens/component/boarding-screen-components';
import {getLocalStorage, setLocalStorage} from '@app/core/localStorageService';
import {useForm} from 'react-hook-form';
import CommonInput from '@app/components/input';
import {Error} from '@app/styles/common-styles';
import Button from '@app/components/button/button';
import apiEndpoint from '@app/core/apiend_point';
import {PayloadProps, ApiResponseProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import CommonSnackbar from '@app/core/snackbar';
import {formatPhoneNumbers, getProfileDetails} from '@app/utils';
import {ProDefImage} from '@app/styles/common-styles';
import Header from '@app/components/header';
import {isMobile} from 'react-device-detect';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';
import {IconTag} from '../sign-up/component/account-access-components';

/**
 * Renders Component.
 * @return {AccountInformation} renders Component.
 */
export default function AccountInformation() {
  const [userDetails, updateUserDetails] = useState<any>({});
  const [filename, updateFileName] = useState<any>({});
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const {handleSubmit, register, formState: {errors}, setValue} = useForm();
  const [isSubmitting, setIsSubmitting] = useState(true);
  const token = getLocalStorage('token') ? getLocalStorage('token') : '';
  const [infoMsg, setInfoMsg] = useState<string>('');
  const [showSectionMsg, setShowSectionMsg] = useState(false);
  const [apperance, setApperance] = useState('success');
  const [profileImage, setProfileImage] = useState('');
  const [loader, setLoader] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const restrictUser = sessionStorage.getItem('resctrict_user_actions');
  useEffect(()=>{
    setLoader(true);
    const userData= JSON.parse(getLocalStorage('userData'));
    updateUserDetails(userData);
    setValue('first_name', userData['first_name']);
    setValue('last_name', userData['last_name']);
    setValue('phone', userData['phone']);
    setValue('state', userData['state']);
    const profilePic = (userData.img_name) ? userData.display_url : '';
    setProfileImage(profilePic);
    setLoader(false);
    Mixpanel.track(service['accountInfo']['title'],
        service['accountInfo']['props']);
    gtag('event', gaService['accountInfo']['title'], {
      'event_category': gaService['accountInfo']['category'],
    });
  }, []);
  const handleChange =(e:any)=>{
    setIsSubmitting(false);
  };
  const handleInputChange = (e:any, field)=>{
    const formattedPhoneNumber = formatPhoneNumbers(e.target.value);
    setValue(field, formattedPhoneNumber);
  };
  const uploadChange= (e:any)=>{
    console.log(e.target.files[0]);
    const splitdata = e.target.files[0].name.split('.');
    const type = splitdata[splitdata.length - 1];
    if (e.target.files[0].size > 5197300) {
      setApperance('error');
      setInfoMsg('File exceeds maximum upload size of 5MB.');
      setShowSectionMsg(true);
      return;
    } else if (type !== 'png' && type !== 'jpeg' && type !== 'jpg' && type !== 'jfif') {
      setApperance('error');
      setInfoMsg('Please upload png or jpeg format only');
      setShowSectionMsg(true);
      return;
    } else {
      const body = new FormData();
      body.append('profile_pic', e.target.files[0]);
      const apiObject: PayloadProps = {
        payload: body,
        method: 'POST',
        apiUrl: apiEndpoint.uploadProfilePicApi,
        headers: {
          'Authorization': token,
          'Accept': '*/*',
          'enctype': 'multipart/form-data',
          'content-type': 'multipart/form-data',
        },
      };
      triggerApi(apiObject)
          .then((res: ApiResponseProps) => {
            if (res.success) {
              setProfileImage(res.data.file_path);
              updateFileName(res.data);
            }
          });
    }
  };
  /**
   * get Boarding JSON from the API.
   * @param {recoveryProps} data from the
   *  */
  function onSubmit(data) {
    Mixpanel.track(action['accountInformation']['save']['title'],
        action['accountInformation']['save']['props']);
    gtag('event', gaAction['accountInformation']['save']['title'], {
      'event_category': gaAction['accountInformation']['save']['category'],
    });
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    const apiObject: PayloadProps = {

      payload: {
        email: data.email,
        img_file_name: filename.original_name || userDetails.img_name,
        original_filename: filename.original_name || userDetails.img_name,
        img_unique_name: filename.filename || userDetails.img_name,
        first_name: data.first_name,
        last_name: data.last_name,
        state: data.state,
        phone: data.phone,
        id: userDetails._id,
      },
      method: 'PUT',
      apiUrl: apiEndpoint.getProfileApi,
      headers: {Authorization: token},
    };
    triggerApi(apiObject)
        .then((res: ApiResponseProps) => {
          setIsSubmitting(false);
          if (res.status_code == 200) {
            const data ={...userDetails, ...res.data};
            setLocalStorage('userData', JSON.stringify(data));
            getProfileDetails();
            setApperance('success');
            setInfoMsg(res.message);
            setShowSectionMsg(true);
            setIsSubmitting(true);
            window.location.reload();
          } else {
            setApperance('error');
            setInfoMsg(res.message);
            setShowSectionMsg(true);
            setIsSubmitting(true);
          }
        });
  }
  const deleteProfile = () => {
    const id = userDetails['_id'];
    const apiObject: PayloadProps = {
      payload: {},
      method: 'DELETE',
      apiUrl: apiEndpoint.deleteProfilePic + id,
      headers: {Authorization: token},
    };
    triggerApi(apiObject).then((res)=>{
      console.log(res);
      setIsSubmitting(false);
      setApperance('success');
      setInfoMsg(res.data);
      setShowSectionMsg(true);
      updateFileName({});
      userDetails['img_name'] = '';
    }).catch((error)=>{
      console.log(error);
    });
  };

  return (
    <>
      <CommonSnackbar
        title="Error"
        appearance={apperance}
        message={infoMsg}
        open={showSectionMsg}
        close={() => setShowSectionMsg(false)}
      />
      {!loader ? <MainContainer bgColor='white'>
        {!isMobile? <Header hideBackArrow={false} className='txt-left bg-white'
          desktopMenu={isMobile ? false : true}/>: null}
        <ScrollSection id="scrollable-div" className='h-150 w-100'>
          <DesktopWidth>

            <ContentContainer className={isMobile ?'p-0' : 'br-bg mt-40'}>
              <div className={isMobile ? 'p-24 pb-0' : 'p-0'} >
                <IconsContainer onClick={()=>{
                  navigate('/profile-menu');
                  Mixpanel.track(action['accountInformation']['back']['title'],
                      action['accountInformation']['back']['props']);
                  gtag('event', gaAction['accountInformation']['back']['title'], {
                    'event_category': gaAction['accountInformation']['back']['category'],
                  });
                }}>
                  <Icon name={'chervonLeft'} />
                </IconsContainer>

              </div>
              <ContentContainer className={isMobile? 'p-24' : 'pb-24' }>
                <MenuHeader >
                  Account Information
                </MenuHeader>
              </ContentContainer>
              <form name="pro-form"
                onSubmit={handleSubmit(onSubmit)} onChange={handleChange}>
                <ContentContainer className={isMobile? 'p-0' : 'ptb-0'}>
                  <IconsContainer className={isMobile ? 'layout2' : 'layout2 d-flex overflow' }>
                    {profileImage||userDetails['display_url'] ? <ImageWrapper className={isMobile ? 'text-center m-10 w-64' : 'text-center m-0 w-64 pos-rel'}>
                      <IconTag
                        onMouseEnter={()=>setShowDelete(true)}
                        onMouseLeave={()=>setShowDelete(false)}
                        onClick={()=>deleteProfile()}
                        className={showDelete ? (isMobile ? 'mobile_del': 'del'): 'hide'}
                      >
                        <Icon name='deleteIcon' />
                      </IconTag>
                      <img src={profileImage?profileImage:userDetails['display_url']} alt="User" onMouseEnter={()=>setShowDelete(true)} onMouseLeave={()=>setShowDelete(false)} />
                    </ImageWrapper> :
                     <ProDefImage className={isMobile ? 'w-64' : 'w-64 m-0'}>
                       {userDetails['first_name'].charAt(0)}{userDetails['last_name'].charAt(0)}
                     </ProDefImage>
                    }
                    <BadgeLabel className={restrictUser === 'false' ? 'restricted text-center file-upload m-0' : isMobile ? 'clr-grn text-center file-upload' :
                  'clr-grn text-center file-upload m-0' }>
                      <input type="file" accept='image/png, image/jpeg'
                        onChange={(e) => uploadChange(e)}
                        className='f-0 pointer'
                      >
                      </input>
              Edit Photo
                    </BadgeLabel>
                  </IconsContainer>
                  <div className='pos-rel flex-lb-input-1 d-flex'>
                    <label>First Name</label>
                    <CommonInput type='text' placeholder='First Name'
                      className='b-0 al-r'
                      register={register('first_name', {required: true})} />
                    {errors.first_name &&<Error>First name is required</Error>}
                  </div>
                  <div className='pos-rel flex-lb-input d-flex'>
                    <label>Last Name</label>
                    <CommonInput type='text' placeholder='Last Name'
                      className='b-0 al-r'
                      register={register('last_name', {required: true})} />
                    {errors.last_name &&<Error>Last name is required</Error>}
                  </div>
                  <div className='pos-rel flex-lb-input d-flex'>
                    <label>State</label>
                    <CommonInput type='text' placeholder='state'
                      className='b-0 al-r'
                      register={register('state', {required: false})} />
                    {errors.state &&<Error>First name is required</Error>}
                  </div>
                </ContentContainer>
                <ContentContainer className='pt-15' bgColor='#FAFAFC'>
                  <InfoHeading>
        ACCOUNT INFORMATION
                  </InfoHeading>
                </ContentContainer>
                <ContentContainer className={isMobile? 'p-0' : 'ptb-0'}>
                  <div className='pos-rel flex-lb-input d-flex'>
                    <label className='p-0'>
            Email
                    </label>
                    <BadgeLabel className='al-r'>
                      {userDetails['email']}
                    </BadgeLabel>
                  </div>
                  <div className='pos-rel flex-lb-input d-flex'>
                    <label>Phone Number</label>
                    <div className='w-145'>
                      <CommonInput type='text' placeholder='Phone'
                        className='b-0 al-r'
                        onKeyUp={(e:any)=> handleInputChange(e, 'phone')}
                        register={register('phone',
                            {required: true, minLength: 14})} />
                    </div>
                    {errors.phone &&<Error>Enter Valid Phone Number.</Error>}
                  </div>
                </ContentContainer>
                <ContentContainer className='pt-15' bgColor='#FAFAFC'>
                  <InfoHeading>
        Language
                  </InfoHeading>
                </ContentContainer>
                <ContentContainer className={isMobile? 'p-0' : 'ptb-0'}>
                  <div className='pos-rel flex-lb-input d-flex'>
                    <label>English</label>
                  </div>
                </ContentContainer>
                {/* <ContentContainer className='pt-15' bgColor='#FAFAFC'>
                  <InfoHeading>
        Other
                  </InfoHeading>
                </ContentContainer>
                <ContentContainer>
                  <BadgeRow className='bd-top'>
                    <BadgeLabel className='clr-red'>
            Deactivate account
                    </BadgeLabel>
                  </BadgeRow>
                </ContentContainer> */}
                <DesktopWidth className='w-100  br-tp py-15'>
                  <FooterButtons className={isMobile ? '' :'flx-6'}>
                    <Button variant={restrictUser === 'false' ? 'disabled' : isSubmitting ? 'disabled': 'primary'}
                      type="submit"
                      //   isLoading={props.isDisable}
                      size='large' width='100%'
                    >Save</Button>
                  </FooterButtons>
                </DesktopWidth>
              </form>
            </ContentContainer>
          </DesktopWidth>
        </ScrollSection>
      </MainContainer> : null}
    </>
  );
}
