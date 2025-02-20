/* eslint-disable max-len */
import Icon from '@app/components/icon';
import {MainContainer, FlexContainer, DesktopWidth, InputLabel, Link, Heading3, Loader}
  from '@app/styles/common-styles';
import {useEffect, useState} from 'react';
import {createSearchParams, useNavigate, useParams} from 'react-router-dom';
import {BackDrop, ContentContainer, IconsContainer, TestDialogContainer} from
  '../assesment-questions/assesment-questions-components';
import {ScrollSection} from
  '../boarding-screens/component/boarding-screen-components';
import {BadgeContainer}
  from '../home/home-components';
import {MenuHeader} from '../profile/profile-components';
import CommonSnackbar from '@app/core/snackbar';
import apiEndpoint from '@app/core/apiend_point';
import {PayloadProps, ApiResponseProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import {getLocalStorage} from '@app/core/localStorageService';
import {isMobile} from 'react-device-detect';
import Header from '@app/components/header';
import BotoomHeader from '@app/components/footer-menu';
import React from 'react';
import CommonInput from '@app/components/input';
import {useForm} from 'react-hook-form';
import {Error} from '@app/styles/common-styles';
import Button from '@app/components/button';
import Checkbox from '@app/components/checkbox';
import {CardDetails} from '../add-payment/add-payment-components';
import {Radio} from '@mui/material';
import {BodyText3} from '../recommend-plans/component/recommend-plans-components';
import _ from 'lodash';
import Spinner from '@app/components/icon/icons/loader';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';
import {cityPattern, whiteSpace} from '@app/core/pattern';
import Select from 'react-dropdown-select';
/**
 * Renders Component.
 * @return {Appointments} renders Component.
 */
export default function Address() {
  const navigate = useNavigate();
  const token = getLocalStorage('token') ? getLocalStorage('token') : '';
  const {handleSubmit, register, setValue, formState: {errors}, getValues} = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [def, setDefault] = useState(false);
  const {id, price}: any = useParams();
  const [addList, updateAddList] = useState([]);
  const [defAddress, setDefAddress] = useState({});
  const [loader, setLoader] = useState(true);
  const searchParams = new URLSearchParams(location.search);
  const [reShowPopup, setReShowPopup] = useState(false);
  const [error, setError] = useState(false);
  const [showForm, setShowForm]=useState(false);
  const [state, setState] = useState<any>();
  const [isStateRequired, setIsStateRequired] = useState(false);
  const [storeState, setStoreState] = useState<any>([]);
  const [showPopup, setShowPopup] = useState(false);
  const userData = JSON.parse(localStorage.getItem('userData'));
  // const [selIndex, setSelectedIndex] = useState(-1);
  // const [storeAddress, setStoreAddress] = useState<any>([]);
  const [removeAddrId, setRemoveAddrId] = useState();
  const [storeAddrState, setStoreAddState] = useState<any>();
  const [defState, setDefState] = useState<any>([]);

  useEffect(()=>{
    // updateType('upcoming');
    // setDefState({
    //   '_id': '630469ab9ba53455eec3f91f',
    //   'value': '630469ab9ba53455eec3f91f',
    //   'label': 'Alaska',
    // }),
    getStates();
    if (searchParams.get('isSummary')) {
      setShowForm(true);
    }
    getAddress();
    setIsSubmitting(false);
    setLoader(true);
    Mixpanel.track(service['address']['title'], service['address']['props']);
    gtag('event', gaService['address']['title'], {
      'event_category': gaService['address']['category'],
    });
  }, []);
  useEffect(()=>{
    if (searchParams.get('isSummary')) {
      setValue('name', defAddress['name']);
      setValue('add_li_1', defAddress['street_address_one']);
      setValue('add_li_2', defAddress['street_address_two']);
      setValue('city', defAddress['city']);
      setValue('state', defAddress['state']);
      setValue('country', defAddress['country']);
      setValue('zipCode', defAddress['zip_code']);
    }
  }, [defAddress]);

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
      method: 'post',
      apiUrl: apiEndpoint.address,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            setRemoveAddrId(response.data.address._id);
            if (response.data.removeTests === false) {
              setTimeout(() => {
                // setIsSubmitting(false);
                params['billingAddressId'] = response.data.address._id;
                params['shipingAddressId'] = response.data.address._id;
                if (searchParams.get('isSubmit')) {
                  setReShowPopup(true);
                  setTimeout(() => {
                    navigate('/home');
                  }, 2000);
                  return;
                }
                updateAddress(params);
              //   navigate({
              //     pathname: '/add-payment',
              //     search:
              //     // eslint-disable-next-line max-len
              //     `?${createSearchParams({paymentFee: price,
              //       addPay: 'true',
              //       id: id})}`,
              //   });
              }, 1000);
            } else {
              setShowPopup(true);
              setIsSubmitting(false);
            }
          } else {
            setError(true);
            setIsSubmitting(false);
          }
        });
  };
  const verifyAddress = (params) =>{
    setStoreAddState(params.shipingAddress.state.name);
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: `${apiEndpoint.verifyAddress}/${params.shipingAddressId}`,
      headers: {Authorization: getLocalStorage('token')},
    };
    triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.data.validAddress === true) {
            updateAddress(params);
          } else {
            setShowPopup(true);
          }
        });
  };
  const updateAddress =async (params:any) =>{
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);


    const apiObject: PayloadProps = {
      payload: {
        'billingAddress': params,
        'shipingAddress': params,
        'billingAddressId': params['billingAddressId'],
        'shipingAddressId': params['shipingAddressId'],
      },
      method: 'put',
      apiUrl: apiEndpoint.order +'/'+id,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            setTimeout(() => {
              setIsSubmitting(false);
              if (searchParams.get('isSummary')) {
                navigate('/summary/'+ id);
              } else {
                navigate({
                  pathname: '/order-payment',
                  search:
                // eslint-disable-next-line max-len
                `?${createSearchParams({paymentFee: price,
                  addPay: 'true',
                  id: id})}`,
                });
              }
            }, 1000);
          } else {
            setIsSubmitting(false);
          }
        });
  };
  const getAddress =async () =>{
    const apiObject: PayloadProps = {
      payload: {
      },
      method: 'get',
      apiUrl: apiEndpoint.address,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            const cardsList =[...response.data.addresses];
            const idx= _.findIndex(cardsList, function(o: any) {
              return o.is_default;
            });
            if (idx < 0 && cardsList.length ) {
              cardsList[0]['is_default'] = true;
            }
            const list1 = cardsList.filter((card) => card.is_default);
            const list2 = cardsList.filter((card) => !card.is_default);
            setDefAddress(list1[0]);
            console.log(list1[0]);
            const addrObj: any = {
              'label': list1[0] && list1[0].state && list1[0].state.name,
              'value': list1[0] && list1[0].state && list1[0].state._id,
            };
            setDefState(addrObj);
            updateAddList([...list1, ...list2]);
            setLoader(false);
            // setTimeout(() => {
            //   setIsSubmitting(false);
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
            setIsSubmitting(false);
            setLoader(false);
            updateAddList([]);
          }
        });
  };
  /**
   * @param {info} info
   * @param {index} i
   */
  async function makeCardDefault(info, i) {
    const apiObject: PayloadProps = {
      payload: {

      },
      method: 'PUT',
      apiUrl: apiEndpoint.makeDefAdd+info['_id'],
      headers: {Authorization: getLocalStorage('token')},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            const cardsList =[...addList];
            const idx= _.findIndex(cardsList, function(o: any) {
              return o.is_default;
            });
            cardsList[idx]['is_default'] = false;
            cardsList[i]['is_default'] = true;
            const list1 = cardsList.filter((card) => card.is_default);
            const list2 = cardsList.filter((card) => !card.is_default);
            setDefAddress(list1[0]);
            const addrObj: any = {
              'label': list1[0] && list1[0].state && list1[0].state.name,
              'value': list1[0] && list1[0].state && list1[0].state._id,
            };
            setDefState(addrObj);
            // setDefState(list1[0].state.name);
            updateAddList([...list1, ...list2]);
          }
        });
  }
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
  const stateHandler = () => {
    if (!storeState.value) {
      setIsStateRequired(true);
    } else {
      setIsStateRequired(false);
    }
  };
  const RemoveTests = () =>{
    const apiObject: PayloadProps = {
      payload: {

      },
      method: 'POST',
      apiUrl: `${apiEndpoint.removeTests}`,
      headers: {Authorization: getLocalStorage('token')},
    };
    triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            navigate('/cart');
            Mixpanel.track(action['Orders']['yourCart']['title'], action['Orders']['yourCart']['props']);
            gtag('event', gaAction['Orders']['yourCart']['title'], {
              'event_category': gaAction['Orders']['yourCart']['category'],
            });
          }
        });
  };
  const removeAddress = () =>{
    setShowPopup(false);
    if (!removeAddrId) return;
    const apiObject: PayloadProps = {
      payload: {},
      method: 'DELETE',
      apiUrl: `${apiEndpoint.removeAddress}/${removeAddrId}`,
      headers: {Authorization: getLocalStorage('token')},
    };
    triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            console.log(response);
          }
        });
  };
  return (
    <>
      <CommonSnackbar
        title="Error"
        appearance={'success'}
        message={'Address added successfully'}
        open={reShowPopup}
        close={() => setReShowPopup(false)}
      />
      {loader ? <Loader>
        <Spinner size="6px" />
      </Loader> : null}
      <MainContainer bgColor={'#FAFAFC'} className={isMobile ?
         'flx-start fxh-100' : ''}>
        {!isMobile? <Header className='txt-left' hideBackArrow={false}
          desktopMenu={isMobile ? false : true}/>: null}
        <ScrollSection id="scrollable-div" className={isMobile? 'mb-64 scroll-h64 w-100 flex-1':'w-100 flex-1'}>
          <DesktopWidth className='m-auto'>
            {true ?
        <BadgeContainer className={isMobile ? 'pos-unset w-100 br-0' : 'pos-unset w-86' }>
          {/* <ContentContainer className={isMobile ?'p-0' : 'br-bg'}> */}
          <FlexContainer className={'ptb-0' } justifyContent={'space-between'} >
            <IconsContainer onClick={()=>{
              navigate(-1);
              Mixpanel.track(action['address']['back']['title'], action['address']['back']['props']);
              gtag('event', gaAction['address']['back']['title'], {
                'event_category': gaAction['address']['back']['category'],
              });
            }}>
              <Icon name={'chervonLeft'} />
            </IconsContainer>
            <div className='d-flex gap-10'>
              { !searchParams.get('isSubmit') ? <><IconsContainer className='w-32-ico active' >
                <Icon name={'shipping'} />
              </IconsContainer>
              <IconsContainer className='w-32-ico'>
                <Icon name={'address'} />
              </IconsContainer>
              <IconsContainer className='w-32-ico' >
                <Icon name={'check'} />
              </IconsContainer> </>: null}
            </div>
          </FlexContainer>
          {/* </ContentContainer> */}
          <ContentContainer className={isMobile ? 'p-0' : ''}>
            <MenuHeader className='flx-center'>
              <div>Shipping</div>
              {!searchParams.get('isSubmit') &&( !addList.length ||showForm ? <Link className='f-14' onClick={()=>{
                getAddress();
                setShowForm(false);
                Mixpanel.track(action['address']['savedAddress']['title'], action['address']['savedAddress']['props']);
                gtag('event', gaAction['address']['savedAddress']['title'], {
                  'event-category': gaAction['address']['savedAddress']['category'],
                });
              }}>
               View saved addresses</Link> :
              <Link className='f-14' onClick={()=> updateAddList([])}>Add new</Link>)}
            </MenuHeader>
            {!addList.length ||showForm?<form onSubmit={handleSubmit(onSubmit)} >
              <div className='pos-rel pb-30 pt-30'>
                <InputLabel >Full Name</InputLabel>
                <CommonInput name='name' placeholder='Full Name'
                  register={register('name', {required: true})} />
                {error ? getValues('name')?.match(whiteSpace) ?
              <Error className='topUnset bottomUnset '>name is not allowed to be empty</Error> : null : errors.name ?
              <Error className='topUnset bottomUnset '>Enter a valid Name.</Error> : null}
              </div>
              <div className='pos-rel pb-30'>
                <InputLabel>Street Address</InputLabel>
                <CommonInput name='add_li_1' placeholder='Address line 1'
                  register={register('add_li_1', {required: true})} />
                <CommonInput name='add_li_2' placeholder='Address line 2'
                  register={register('add_li_2', {required: false})} />
                {error ? getValues('add_li_1')?.match(whiteSpace) ?
              <Error className='topUnset bottomUnset '>street address is not allowed to be empty</Error> : null : errors.add_li_1 ?
            <Error className='topUnset bottomUnset '>Enter a Street Address.</Error> : null}
              </div>
              <div className='d-flex gap-15'>
                <div className='pos-rel  pb-24'>
                  <InputLabel>City</InputLabel>
                  <CommonInput name='city' placeholder='City'
                    register={register('city', {required: true, pattern: cityPattern})} />
                  {error ? getValues('city')?.match(whiteSpace) ?
              <Error className='topUnset bottomUnset '>city is not allowed to be empty</Error> : null : errors.city ?
            <Error className='topUnset bottomUnset '>Enter a City.</Error> : null}
                </div>
                <div className='pos-rel  pb-24'>
                  <InputLabel>State</InputLabel>
                  <Select options={state}
                    onChange={(values) =>{
                      setIsStateRequired(false);
                      setStoreState(values[0]);
                      setStoreAddState(values[0].label);
                    }}
                    className='custom_react_dropdown'
                    values={searchParams.get('isSummary') ? [defState] : []}
                    placeholder='Select' />
                  {/* <CommonInput name='state' placeholder='State'
                    register={register('state', {required: true})} /> */}
                  {isStateRequired &&
            <Error className='topUnset bottomUnset '>Enter a State.</Error>}
                </div>
              </div>

              <div className='d-flex gap-15'>
                <div className='pos-rel  pb-30'>
                  <InputLabel>Country</InputLabel>
                  <CommonInput name='country' placeholder='Country' defaultValue='United States'
                    register={register('country', {required: true})} />
                  {error ? getValues('country')?.match(whiteSpace) ?
              <Error className='topUnset bottomUnset '>country is not allowed to be empty</Error> : null : errors.country ?
            <Error className='topUnset bottomUnset '>Enter a Country.</Error> : null}
                </div>
                <div className='pb-30' style={{position: 'relative'}}>
                  <InputLabel>Zip Code</InputLabel>
                  <CommonInput name='zipCode' placeholder='Zip Code'
                    register={register('zipCode', {required: true})} />
                  {error ? getValues('zipCode')?.match(whiteSpace) ?
              <Error className='topUnset bottomUnset '>street address is not allowed to be empty</Error> : null : errors.zipCode ?
            <Error className='topUnset bottomUnset '>Enter a Zip Code.</Error> : null}
                </div>
              </div>
              <div className='d-flex js-bet pb-30 pt-10' >
                <div className='customCheckBox'>
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
              <Button variant={isSubmitting ? 'disabled' : 'primary'}
                className="mt-8"
                type="submit"
                size='large' width='100%'
                onClick={()=>{
                  stateHandler();
                  Mixpanel.track(action['address']['confirm']['title'], action['address']['confirm']['props']);
                  gtag('event', gaAction['address']['confirm']['title'], {
                    'event_category': gaAction['address']['confirm']['category'],
                  });
                }}
              >{'Confirm'}</Button>
            </form> : null}
            {!showForm&& addList.map((info:any, i:number)=>{
              return (<>
                {i== 0 ? <Heading3 className='f-18'>
                      Default address</Heading3> : null}
                {i== 1 ? <Heading3 className='f-18'>
                      Other address</Heading3> : null}
                <CardDetails key={i} onClick={()=> makeCardDefault(info, i)}
                  className={info['is_default'] ? 'active' : ''}>
                  {!info['is_default'] ? <Radio
                    checked={info['is_default'] == true}
                    value="a"
                    name="radio-buttons"
                    inputProps={{'aria-label': 'A'}}
                  /> : null}
                  <div className='d-grid'>
                    <BodyText3 className='ml-10 mb-0'>
                      {info['name']}
                    </BodyText3>
                    <BodyText3 className='ml-10 mt-0 clr-gray word-break'>
                      {info['street_address_one']?.replace(/[,]+/g, ' ').trim()+' '+(info['street_address_two'] ? info['street_address_two']?.replace(/[,]+/g, ' ').trim() : '')},&nbsp;
                      {info['city']?.replace(/[,]+/g, ' ').trim()},{info.state.name}, {info['country']?.replace(/[,]+/g, ' ').trim()},&nbsp;
                      {info['zip_code']?.replace(/[,]+/g, ' ').trim()}
                    </BodyText3>
                  </div>
                </CardDetails>
              </>);
            })
            }
            {!showForm&&addList.length ? <Button variant={isSubmitting ? 'disabled' : 'primary'}
              className="mt-32"
              onClick={()=>{
                const params = {
                  'billingAddress': defAddress,
                  'shipingAddress': defAddress,
                  'billingAddressId': defAddress['_id'],
                  'shipingAddressId': defAddress['_id']};
                verifyAddress(params);
                Mixpanel.track(action['address']['confirm']['title'], action['address']['confirm']['props']);
                gtag('event', gaAction['address']['confirm']['title'], {
                  'event_category': gaAction['address']['confirm']['category'],
                });
              }}
              size='large' width='100%'
            >{'Confirm'}</Button> : null}
          </ContentContainer>
        </BadgeContainer> : null}
          </DesktopWidth>
        </ScrollSection>
        {isMobile ? <BotoomHeader/> : null}
      </MainContainer>
      {showPopup && <>
        <BackDrop style={isMobile? {alignItems: 'unset'}: {alignItems: 'center'}}><TestDialogContainer style={isMobile ? {borderRadius: '0'} : {}}>
          <div className='state_alert mb-12'>
            <div className='alertMainText'>Alert!</div>
            <div className='pointer' onClick={() => removeAddress()}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.22517 4.81196C6.03657 4.6298 5.78397 4.52901 5.52177 4.53129C5.25957 4.53357 5.00876 4.63874 4.82335 4.82414C4.63794 5.00955 4.53278 5.26036 4.5305 5.52256C4.52822 5.78476 4.62901 6.03736 4.81117 6.22596L10.5862 12.001L4.81017 17.776C4.71466 17.8682 4.63848 17.9786 4.58607 18.1006C4.53366 18.2226 4.50607 18.3538 4.50492 18.4866C4.50377 18.6193 4.52907 18.751 4.57935 18.8739C4.62963 18.9968 4.70388 19.1085 4.79778 19.2024C4.89167 19.2963 5.00332 19.3705 5.12622 19.4208C5.24911 19.4711 5.38079 19.4964 5.51357 19.4952C5.64635 19.4941 5.77757 19.4665 5.89958 19.4141C6.02158 19.3617 6.13192 19.2855 6.22417 19.19L12.0002 13.415L17.7752 19.19C17.9638 19.3721 18.2164 19.4729 18.4786 19.4706C18.7408 19.4684 18.9916 19.3632 19.177 19.1778C19.3624 18.9924 19.4676 18.7416 19.4698 18.4794C19.4721 18.2172 19.3713 17.9646 19.1892 17.776L13.4142 12.001L19.1892 6.22596C19.3713 6.03736 19.4721 5.78476 19.4698 5.52256C19.4676 5.26036 19.3624 5.00955 19.177 4.82414C18.9916 4.63874 18.7408 4.53357 18.4786 4.53129C18.2164 4.52901 17.9638 4.6298 17.7752 4.81196L12.0002 10.587L6.22517 4.81096V4.81196Z" fill="#68787A"/>
            </svg>
            </div>
          </div>
          <div className='alert_main_con mb-12'>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.99 20C4.46846 19.9945 -0.00367557 15.5149 2.26684e-06 9.99334C0.00368465 4.47179 4.48179 -0.00183754 10.0033 5.66223e-07C15.5249 0.00183981 20 4.47845 20 10C19.9967 15.5254 15.5154 20.0022 9.99 20ZM2 10.172C2.04732 14.5732 5.64111 18.1095 10.0425 18.086C14.444 18.0622 17.9995 14.4875 17.9995 10.086C17.9995 5.6845 14.444 2.10977 10.0425 2.08599C5.64111 2.06245 2.04732 5.59876 2 10V10.172ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z" fill="#E53249"/>
            </svg>
            <span>An item in your cart cannot be processed. Please remove it to continue</span>
          </div>
          <div className='mb-32'>
          Hi {`${userData['first_name']}`}, There is an item in your cart that cannot be processed based on your location (<span style={{fontWeight: 600}}>{storeAddrState}</span>). Note that in certain states, NY, NJ and RI we are unable to process testing because of certain laws. Please message your care manager if you have any concerns.
          </div>
          <div className='alert_button'>
            <div className='alert_cancel pointer' onClick={() => removeAddress()}>Cancel</div>
            <div><Button className={'btn_padding'} variant={'primary'} onClick={RemoveTests}>Remove Tests</Button></div>
          </div>
        </TestDialogContainer>
        </BackDrop>
      </>}
    </>
  );
}

