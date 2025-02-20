/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import homeImg from '@app/assets/images/homescreen.png';
import homeImg2 from '@app/assets/images/homescreen-des.png';
import {AnimationCheck, BackDrop, BodyText2, ContentContainer, FlexContainer, IconsContainer,
  ImageWrapper,
  TestDialogContainer} from '../assesment-questions/assesment-questions-components';
import {DesktopWidth, Heading, InputLabel, MainContainer} from '@app/styles/common-styles';
import {isMobile} from 'react-device-detect';
import {useNavigate} from 'react-router-dom';
import Button from '@app/components/button';
import apiEndpoint, {InflaForm} from '@app/core/apiend_point';
import {ScrollSection}
  from '../boarding-screens/component/boarding-screen-components';
import Header from '@app/components/header';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';
import {Description} from '@app/components/layout-onBoarding/layout-onBoarding-components';
import {HeaderMain} from '@app/components/header/header-components';
import Icon from '@app/components/icon';
import {LayoutWrapper,
  LeftContainer,
  ImageContainer,
  RightContainer,
  RightContent,
  BackBtnContainer,
  BackIconContainer,
  TextContent,
  Actions,
  // ImageHolder
} from '../sign-up/component/signup.components';
import InflammationBG from '@app/assets/images/inflamation_BG.png';
import {CurrentPill, HomeToDoCardStatus, HomeToDoCardTitle, HomeToDoCards, InflamationHeading, InflamtionContent, NextPill, PopupDue, TimingStatus} from './home-components';
import CommonInput from '@app/components/input';
import {whiteSpace, cityPattern} from '@app/core/pattern';
import Checkbox from '@app/components/checkbox';
import Select from 'react-dropdown-select';
import {useForm} from 'react-hook-form';
import {ApiResponseProps, PayloadProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import {Error} from '@app/styles/common-styles';
import {getLocalStorage} from '@app/core/localStorageService';
import AnimationCheckmark from '@app/assets/images/animation-checkmark.gif';
import {dateFormats} from '@app/utils/dateformat';
import moment from 'moment-timezone';
import CommonSnackbar from '@app/core/snackbar';

/**
 * Renders Component.
 * @return {InflammationHome} renders Component.
 */
export default function InflammationHome() {
  const {handleSubmit, register, formState: {errors}, getValues} = useForm();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = getLocalStorage('token') ? getLocalStorage('token') : '';
  const [error, setError] = useState(false);
  const [storeState, setStoreState] = useState<any>([]);
  const [def, setDefault] = useState(true);
  // const searchParams = new URLSearchParams(location.search);
  const [isStateRequired, setIsStateRequired] = useState(false);
  const [state, setState] = useState<any>();
  const [showPopup, setShowPopup] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<any>({});
  const [nextPlan, setNextPlan] = useState<any>({});
  const currentDate = moment(new Date()).tz('GMT');
  const [infoMsg, setInfoMsg] = useState<string>('');
  const [showSectionMsg, setShowSectionMsg] = useState(false);
  useEffect(()=>{
    const userPlan= JSON.parse(getLocalStorage('todoData'));
    {userPlan.map((todo: any)=>{
      if (todo.code === 'REGISTER_INFLAMMATION_TEST') {
        setCurrentPlan(todo);
      }
      if (todo.code === 'TAKE_TIMELINE_ANALYSIS') {
        setNextPlan(todo);
      }
    });
    }
  }, [getLocalStorage('todoData')]);

  useEffect(()=>{
    getStates();
    Mixpanel.track(service['inflaHome']['title'],
        service['inflaHome']['props']);
    gtag('event', gaService['inflaHome']['title'], {
      'event_category': gaService['inflaHome']['category'],
    });
  }, []);
  const onSubmit =async (data:any) =>{
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    const params ={
      'name': data['name'].replace(/[\!@#\-_$%\^\&*,. ]+/g, ' '),
      // 'street_address': data['add_li_1'].replace(/[\!@#\-_$%\^\&*,. ]+/g, ' ') +' '+data['add_li_2'].replace(/[\!@#\-_$%\^\&*,. ]+/g, ' '),
      'streetAddress': data['add_li_1'].replace(/[\!@#\-_$%\^\&*,. ]+/g, ' '),
      'streetAddressTwo': data['add_li_2'] ? data['add_li_2'].replace(/[\!@#\-_$%\^\&*,. ]+/g, ' ') : '',
      'state': storeState.value,
      'city': data['city'].replace(/[\!@#\-_$%\^\&*,. ]+/g, ' '),
      'country': data['country'].replace(/[\!@#\-_$%\^\&*,. ]+/g, ' '),
      'zipCode': data['zipCode'].replace(/[\!@#\-_$%\^\&*,. ]+/g, ' '),
      'addressType': 'shipping',
      'isDefault': def,
    };
    // setStoreAddress(params);
    const apiObject: PayloadProps = {
      payload: params,
      method: 'POST',
      apiUrl: apiEndpoint.registerInflamationTest,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            setShowPopup(true);
            if (response.data.removeTests === false) {
              // setTimeout(() => {
              // setIsSubmitting(false);
              // params['billingAddressId'] = response.data.address._id;
              // params['shipingAddressId'] = response.data.address._id;
              // if (searchParams.get('isSubmit')) {
              //   setReShowPopup(true);
              //   setTimeout(() => {
              //     navigate('/home');
              //   }, 2000);
              //   return;
              // }
              // updateAddress(params);
              //   navigate({
              //     pathname: '/add-payment',
              //     search:
              //     // eslint-disable-next-line max-len
              //     `?${createSearchParams({paymentFee: price,
              //       addPay: 'true',
              //       id: id})}`,
              //   });
              // }, 1000);
            } else {
              // setShowPopup(true);
              setIsSubmitting(false);
            }
          } else {
            setShowSectionMsg(true);
            setInfoMsg(response.data ? response.data : response.data.message);
            setError(true);
            setIsSubmitting(false);
          }
        });
  };
  // const updateAddress =async (params:any) =>{
  //   if (isSubmitting) {
  //     return;
  //   }
  //   setIsSubmitting(true);


  //   const apiObject: PayloadProps = {
  //     payload: {
  //       'billingAddress': params,
  //       'shipingAddress': params,
  //       'billingAddressId': params['billingAddressId'],
  //       'shipingAddressId': params['shipingAddressId'],
  //     },
  //     method: 'put',
  //     apiUrl: apiEndpoint.order +'/'+id,
  //     headers: {Authorization: token},
  //   };
  //   await triggerApi(apiObject)
  //       .then((response: ApiResponseProps) => {
  //         if (response.status_code === 200) {
  //           setTimeout(() => {
  //             setIsSubmitting(false);
  //             if (searchParams.get('isSummary')) {
  //               navigate('/summary/'+ id);
  //             } else {
  //               navigate({
  //                 pathname: '/order-payment',
  //                 search:
  //               // eslint-disable-next-line max-len
  //               `?${createSearchParams({paymentFee: price,
  //                 addPay: 'true',
  //                 id: id})}`,
  //               });
  //             }
  //           }, 1000);
  //         } else {
  //           setIsSubmitting(false);
  //         }
  //       });
  // };
  const stateHandler = () => {
    if (!storeState.value) {
      setIsStateRequired(true);
    } else {
      setIsStateRequired(false);
    }
  };
  /**
   * @param {info} info
   * @param {index} i
   */
  async function getStates() {
    const apiObject: PayloadProps = {
      payload: {

      },
      method: 'GET',
      apiUrl: `${apiEndpoint.FilterApi}${('?type=' + 'states')}`,
      headers: {Authorization: getLocalStorage('token')},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            setState(response.data.states);
          }
        });
  }
  const showDue = (duedate: any) => {
    const dueDate = moment(duedate);
    const duration = moment.duration(dueDate.diff(currentDate));
    const hours = duration.asHours();
    const minutes = duration.asMinutes();
    if (minutes < 0) {
      return `Overdue`;
    } else if (hours > 0) {
      // setIsOverDue(false);
      return 'Due ' +
      dateFormats(
          duedate,
          'MMMM Do',
      );
    } else if (minutes > 0) {
      return 'Due ' +
      dateFormats(
          duedate,
          'MMMM Do',
      );
      // setIsOverDue(true);
    } else {
      // setIsOverDue(false);
      return `Overdue`;
    }
  };
  return (
    <>
      <CommonSnackbar
        title="Error"
        appearance={'error'}
        message={infoMsg}
        open={showSectionMsg}
        close={() => setShowSectionMsg(false)}
      />
      <MainContainer bgColor={isMobile? '#FFFFFF':'#FAFAFC'} >
        {!isMobile? <Header hideBackArrow={false} className='txt-left'
          desktopMenu={isMobile ? false : true}/>: null}
        {isMobile? <HeaderMain className={isMobile ? 'text-center d-flex js-bet p-10' :'text-center d-flex js-bet'}>
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
        </HeaderMain>: null}
        <LayoutWrapper>
          <LeftContainer style={{backgroundColor: '#B0DECF'}}>
            {/* {isMobile && <BackBtnContainer className='positioned'>
              <BackIconContainer onClick={() => {
                navigate('/rootcause-home');
              }}>
                <Icon name='backarrow'/>
              </BackIconContainer>
            </BackBtnContainer>} */}
            <ImageContainer className='d-flex justify-content-center'>
              {/* <ImageHolder> */}
              <img className={isMobile ? 'w-100' : ''} alt='inflammationBG' src={InflammationBG} />
              {/* </ImageHolder> */}
            </ImageContainer>
          </LeftContainer>
          <RightContainer>
            <RightContent>
              <div className="content-wrapper">
                {!isMobile && <BackBtnContainer className='pb-24'>
                  <BackIconContainer onClick={() => {
                    navigate('/rootcause-home');
                  }}>
                    <Icon name='backarrow'/>
                  </BackIconContainer>
                </BackBtnContainer>}
                <TextContent className='p-0'>
                  <CurrentPill>Current Step</CurrentPill>
                  <InflamationHeading className='m-0 py-16'>{currentPlan.name}</InflamationHeading>
                  {console.log(currentPlan.due_date)}
                  <div className='state_alert'>
                    {/* {moment().diff(
                        currentPlan.due_date,
                        'days',
                    ) < 0 && ( */}
                    <HomeToDoCardStatus style={showDue(currentPlan.due_date) === 'Overdue' ? {color: '#B11818'} : {}}>
                      {showDue(currentPlan.due_date )}
                      {/* {currentPlan.due_date ?
                                            'Due ' +
                                              dateFormats(
                                                  currentPlan.due_date,
                                                  'MMMM Do',
                                              ) :
                                            ''} */}
                    </HomeToDoCardStatus>
                    <TimingStatus>~30 seconds</TimingStatus>
                  </div>
                  <InflamtionContent className='mb-24'>Fill out your shipping information so we can mail you your at-home inflammation blood test. Once you submit your address, expect to receive your test in <span style={{fontWeight: '500'}}>2-5 business</span> days.</InflamtionContent>
                  <h4 className='m-0 mb-20 shippingAddr'>Add shipping address</h4>
                  <form onSubmit={handleSubmit(onSubmit)} >
                    <div className='pos-rel pb-30'>
                      <InputLabel >Full Name</InputLabel>
                      <CommonInput name='name' placeholder='Full Name'
                        register={register('name', {required: true})} />
                      {error ? getValues('name')?.match(whiteSpace) ?
              <Error className='topUnset bottomUnset mt-0' style={{marginTop: ' 0px'}}>name is not allowed to be empty</Error> : null : errors.name ?
              <Error className='topUnset bottomUnset mt-0' style={{marginTop: ' 0px'}}>Enter a valid Name</Error> : null}
                    </div>
                    <div className='pos-rel pb-30'>
                      <InputLabel>Street Address</InputLabel>
                      <CommonInput name='add_li_1' placeholder='Address line 1'
                        register={register('add_li_1', {required: true})} />
                      <CommonInput className='pt-10' name='add_li_2' placeholder='Address line 2'
                        register={register('add_li_2', {required: false})} />
                      {error ? getValues('add_li_1')?.match(whiteSpace) ?
              <Error className='topUnset bottomUnset mt-0' style={{marginTop: ' 0px'}}>street address is not allowed to be empty</Error> : null : errors.add_li_1 ?
            <Error className='topUnset bottomUnset mt-0' style={{marginTop: ' 0px'}}>Enter a Street Address</Error> : null}
                    </div>
                    <div className='d-flex gap-15 pb-30'>
                      <div className='pos-rel w-100'>
                        <InputLabel>City</InputLabel>
                        <CommonInput name='city' placeholder='City'
                          register={register('city', {required: true, pattern: cityPattern})} />
                        {error ? getValues('city')?.match(whiteSpace) ?
              <Error className='topUnset bottomUnset mt-0' style={{marginTop: ' 0px'}}>city is not allowed to be empty</Error> : null : errors.city ?
            <Error className='topUnset bottomUnset mt-0' style={{marginTop: ' 0px'}}>Enter a City</Error> : null}
                      </div>
                      <div className='pos-rel  w-100'>
                        <InputLabel>State</InputLabel>
                        <Select options={state}
                          onChange={(values) =>{
                            setIsStateRequired(false);
                            setStoreState(values[0]);
                          }}
                          className='custom_react_dropdown'
                          values={[]}
                          placeholder='Select' />
                        {/* <CommonInput name='state' placeholder='State'
                    register={register('state', {required: true})} /> */}
                        {isStateRequired &&
            <Error className='topUnset bottomUnset mt-0' style={{marginTop: ' 0px'}}>Select a State</Error>}
                      </div>
                    </div>

                    <div className='d-flex gap-15 pb-28'>
                      <div className='pos-rel w-100'>
                        <InputLabel>Country</InputLabel>
                        <CommonInput name='country' placeholder='Country' defaultValue='United States'
                          register={register('country', {required: true})} />
                        {error ? getValues('country')?.match(whiteSpace) ?
              <Error className='topUnset bottomUnset mt-0' style={{marginTop: ' 0px'}}>country is not allowed to be empty</Error> : null : errors.country ?
            <Error className='topUnset bottomUnset mt-0' style={{marginTop: ' 0px'}}>Enter a Country</Error> : null}
                      </div>
                      <div className='w-100 ' style={{position: 'relative'}}>
                        <InputLabel>Zip Code</InputLabel>
                        <CommonInput name='zipCode' placeholder='Zip Code'
                          register={register('zipCode', {required: true})} />
                        {error ? getValues('zipCode')?.match(whiteSpace) ?
              <Error className='topUnset bottomUnset mt-0' style={{marginTop: ' 0px'}}>street address is not allowed to be empty</Error> : null : errors.zipCode ?
            <Error className='topUnset bottomUnset mt-0' style={{marginTop: ' 0px'}}>Enter a Zip Code.</Error> : null}
                      </div>
                    </div>
                    <div className='d-flex js-bet pb-30 pt-10' >
                      <div className='customCheckBox inflamationCheckbox'>
                        <Checkbox
                          key={'1'}
                          label={'Set as default address'}
                          checked={def}
                          name={'default'}
                          onChange={(ev) => setDefault(!def)}
                          value={'true'}>
                          {'Set as default address'}
                        </Checkbox>
                      </div>
                    </div>
                    <Actions className='pb-40'>
                      <Button variant={isSubmitting ? 'disabled' : 'primary'}
                        className={'responsive-btn'}
                        type="submit"
                        size='large' width='100%'
                        onClick={()=>{
                          stateHandler();
                          Mixpanel.track(action['address']['confirm']['title'], action['address']['confirm']['props']);
                          gtag('event', gaAction['address']['confirm']['title'], {
                            'event_category': gaAction['address']['confirm']['category'],
                          });
                        }}
                      >{'Register my kit'}</Button>
                    </Actions>
                  </form>
                </TextContent>
                <div style={{background: '#F8F5F0', padding: (isMobile?'40px 24px 16px':'40px 40px 16px'), margin: (isMobile?'0 -24px -24px' : '0 -40px -40px')}}>
                  <NextPill className='mb-12'>Next Step</NextPill>
                  <HomeToDoCards
                    className={`${isMobile ? 'w-100' : ''}`} style={{cursor: 'inherit', borderTop: ' 10px solid #E8EAF1'}}
                  >
                    <div className="flex-1 dflex justify-content-between gap-24">
                      <div className='d-flex gap-12'>
                        <HomeToDoCardTitle>
                          {nextPlan.name}
                        </HomeToDoCardTitle>
                      </div>
                      <div className='dflex gap-12'>
                        {!isMobile && <PopupDue style={showDue(nextPlan.due_date) === 'Overdue' ? {color: '#B11818'} : {}}>
                          {showDue(nextPlan.due_date )}
                          {/* {nextPlan.due_date ?
                                            'Due ' +
                                              dateFormats(
                                                  nextPlan.due_date,
                                                  'MMMM Do',
                                              ) :
                                            ''} */}
                        </PopupDue>}
                        {/* <div>
                          {moment().diff(
                              userDetails['todo_list_dueDate'],
                              'days',
                          ) < 0 ? (
                                        <HomeToDoCardStatus>
                                          {todo.due_date ?
                                            'Due ' +
                                              dateFormats(
                                                  todo.due_date,
                                                  'MMMM Do',
                                              ) :
                                            'Complete'}
                                        </HomeToDoCardStatus>

                                      ) : (
                                        <HomeToDoCardStatus
                                          color={
                                            !userDetails[
                                                'inflamation_test_ordered'
                                            ] ?
                                              '#B11818' :
                                              ''
                                          }
                                        >
                                          {!userDetails[
                                              'inflamation_test_ordered'
                                          ] ?
                                            'Overdue ' :
                                            'Completed'}
                                        </HomeToDoCardStatus>

                                      )}
                        </div> */}
                        {/* <div>
                          <Icon name='chervonRight' />
                        </div> */}
                      </div>
                    </div>
                    {isMobile && <PopupDue style={showDue(nextPlan.due_date) === 'Overdue' ? {color: '#B11818'} : {}}>
                      {showDue(nextPlan.due_date )}
                      {/* {nextPlan.due_date ?
                                            'Due ' +
                                              dateFormats(
                                                  nextPlan.due_date,
                                                  'MMMM Do',
                                              ) :
                                            ''} */}
                    </PopupDue>}
                    {/* </div> */}
                    {/* <div>
                                    <Icon name="roundCheckInactive" />
                                  </div> */}
                    {/* </HomeToDoCardContainer> */}
                  </HomeToDoCards>
                </div>
              </div>
            </RightContent>
          </RightContainer>
        </LayoutWrapper>

        <ScrollSection id="scrollable-div" style={{display: 'none'}}>
          {/* <div className='pos-rel'> */}
          <DesktopWidth className={isMobile? 'p-0 intake-form-cardContainer ':
            'p-0 intake-form-cardContainer mt-40'}
          bgColor={'#ffffff'}>
            <div>
              <IconsContainer className='txt-rt bg-after left'
                onClick={() => {
                  navigate('/home');
                  Mixpanel.track(action['intakeHome']['homeLink']['title'],
                      action['intakeHome']['homeLink']['props']);
                  gtag('event', gaAction['intakeHome']['homeLink']['title'], {
                    'event_category': gaAction['intakeHome']['homeLink']['category'],
                  });
                }}>
                <ImageWrapper>
                  <img src={isMobile ? homeImg : homeImg2} alt="User" />
                </ImageWrapper>
              </IconsContainer>
            </div>
            <ContentContainer>
              <BodyText2 className='clr-green p-0'>{InflaForm['tagline']}
              </BodyText2>
              <Heading className='f-32'>
                {InflaForm['heading']}
              </Heading>
              <Description className='mb-16  font-s'>
                {InflaForm['content']}
              </Description>
              <BodyText2>
                <b>  {InflaForm['footer']}</b>
              </BodyText2>
              {!isMobile ? <FlexContainer className='my-22'>
                <Button variant={'primary'} size='large' width='50%'
                  onClick={() => {
                    navigate('/address/1/123?isSubmit=true');
                    Mixpanel.track(action['intakeHome']['getStarted']['title'],
                        action['intakeHome']['getStarted']['props']);
                    gtag('event', gaAction['intakeHome']['getStarted']['title'], {
                      'event_category': gaAction['intakeHome']['getStarted']['category'],
                    });
                  }}
                >Get Started</Button>
              </FlexContainer> : null}
            </ContentContainer>
          </DesktopWidth>
          {/* </div> */}
        </ScrollSection>
        {/* {isMobile? <DesktopWidth className='w-100 ptb-0 fixed-footer h-64'
          bgColor={'#ffffff'}>
          <>
            <FooterButtons bgColor={'#ffffff'}
              className={isMobile ? 'flx-center b-0' :
                   'b-0 justify-content-center'}>
              <Button variant={'primary'} size='large' width='100%'
                onClick={() => {
                  navigate('/address/1/123?isSubmit=true');
                  Mixpanel.track(action['intakeHome']['getStarted']['title'],
                      action['intakeHome']['getStarted']['props']);
                  gtag('event', gaAction['intakeHome']['getStarted']['title'], {
                    'event_category': gaAction['intakeHome']['getStarted']['category'],
                  });
                }}
              >Get Started</Button>
            </FooterButtons>
          </>
        </DesktopWidth>: null} */}
      </MainContainer>
      {showPopup && <>
        <BackDrop style={isMobile? {}: {alignItems: 'center'}}>
          <TestDialogContainer style={isMobile ? {} : {width: '320px'}} className='px-32'>
            <AnimationCheck><img src={AnimationCheckmark} alt='animation_checkmark' /></AnimationCheck>
            <div>
              <h2 className='popupHeader m-0'>You registered your Inflammation Test kit!</h2>
              <span className='popupCon mb-16'>Keep up the great work and continue on to the next step in your to do list!</span>
              <div className='popupTodoContainer mb-16 mt-16'>
                <HomeToDoCardTitle>Timeline Analysis</HomeToDoCardTitle>
                <div className='popupTimestamp'>{nextPlan.due_date ?
                                            'Due ' +
                                              dateFormats(
                                                  nextPlan.due_date,
                                                  'MMMM Do',
                                              ) :
                                            'Complete'}</div>
              </div>
              <Button variant={'primary'}
                type="button"
                className={'mb-16'}
                size='large' width='100%'
                onClick={()=>{
                  navigate('/timeline-quiz');
                }}
              >{'Continue'}</Button>
              <Button variant={'transparent'}
                type="button"
                size='large' width='100%'
                onClick={()=>{
                  navigate('/rootcause-home');
                }}
              >{'Back to home'}</Button>
            </div>
          </TestDialogContainer>
        </BackDrop>
      </>}
    </>
  );
}
