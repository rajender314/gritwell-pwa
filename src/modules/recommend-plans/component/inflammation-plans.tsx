import {whiteColor} from '@app/styles';
import {DesktopWidth, MainContainer} from '@app/styles/common-styles';
import React, {useEffect, useState} from 'react';
import {isMobile} from 'react-device-detect';
import {LocationContainer,
  LoginTabContainer, PlansContainer,
  SignContainer} from '../../sign-up/component/account-access-components';
import Button from '@app/components/button/button';
import PlansBG from '@app/assets/images/plans-image.png';
import Icon from '@app/components/icon';
import {BackDrop,
  ExpectationContainer,
  IconsContainer,
} from '@app/modules/assesment-questions/assesment-questions-components';
import {createSearchParams, useNavigate} from 'react-router-dom';
import {ApiResponseProps, PayloadProps} from '@app/schema/schema';
import apiEndpoint from '@app/core/apiend_point';
import {getLocalStorage, setLocalStorage} from '@app/core/localStorageService';
import {triggerApi} from '@app/services';
import {LayoutWrapper,
  LeftContainer,
  LogoWrapper,
  ImageContainer,
  RightContainer,
  RightContent,
  BackBtnContainer,
  BackIconContainer,
  TextContent,
  Actions} from '@app/modules/sign-up/component/signup.components';
import {HeaderMain} from '@app/components/header/header-components';
/**
 * Renders Component.
 * @return {InflammationPlans} renders Component.
 */
export default function InflammationPlans() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const token = getLocalStorage('token') ? getLocalStorage('token') : '';
  const [plans, setPlans] = useState([]);
  const [allowedLocation, setAllowedLocation] = useState();
  const [selectedPlan, setSelectedPlan] = useState();
  const [storeLoc, setStoreLoc] = useState();
  const [isInflammation, setIsInflammation] = useState();

  useEffect(()=>{
    rootcausePlans();
    getLocation();
  }, []);

  const rootcausePlans = () => {
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.rootCausePlans,
      headers: {Authorization: token},
    };

    triggerApi(apiObject)
        .then((res: ApiResponseProps) => {
          if (res.status_code == 200) {
            setPlans(res.data.plans);
            setAllowedLocation(res.data.located_at_ny_nj_ri);
            // const plan= JSON.parse(getLocalStorage('planDetails'));
            setSelectedPlan(getLocalStorage('planDetails') ?
            JSON.parse(getLocalStorage('planDetails')).price_id:
            res.data.plans[0].price_id );
            setIsInflammation(getLocalStorage('planDetails') ?
             JSON.parse(getLocalStorage('planDetails')).plan_id :
              res.data.plans[0].plan_id);
          }
        })
        .catch((err: object) => {
          console.log(err, 'Error');
        });
  };
  const onSubmit = () => {
    rootCausePlan();
    navigate('/rootcause-payment');
    setIsSubmitting(true);
  };
  const planSelection = (data) =>{
    console.log(data);
    setIsInflammation(data.plan_id);
    setSelectedPlan(data.price_id);
  };

  const getLocation = () =>{
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.getLocation,
      headers: {Authorization: token},
    };

    triggerApi(apiObject)
        .then((res: ApiResponseProps) => {
          if (res.status_code == 200) {
            setStoreLoc(res.data.located_at_ny_nj_ri);
          }
        })
        .catch((err: object) => {
          console.log(err, 'Error');
        });
  };

  const rootCausePlan = () =>{
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: `${apiEndpoint.rootCausePlan}/${isInflammation}`,
      headers: {Authorization: token},
    };

    triggerApi(apiObject)
        .then((res: ApiResponseProps) => {
          if (res.status_code == 200) {
            setLocalStorage('planDetails', JSON.stringify(res.data));
          }
        })
        .catch((err: object) => {
          console.log(err, 'Error');
        });
  };
  return (
    <>
      <MainContainer bgColor={whiteColor} style={{display: 'none'}}>
        <div className='signupScreen' style={isMobile ? {overflow: 'auto'} :
         {}}>
          <div className={isMobile ?
          'd-flex jc-center partitionDiv w-100 h-250' :
           'd-flex jc-center w-50'}>
            <div className='w-100'>
              {isMobile ? <div className='pointer'
                onClick={() => {
                  if (storeLoc) {
                    navigate({
                      pathname: '/locationscreen/',
                      search: `?${createSearchParams({
                        isLocation: 'true'})}`,
                    });
                  } else {
                    navigate({
                      pathname: '/locationscreen/',
                      search: `?${createSearchParams({
                        isLocation: 'false'})}`,
                    });
                  }
                }}
                style={{position: 'absolute', left: '8px', top: '16px'}}
              ><Icon name='backarrow'/> </div> : ''}
              {!isMobile && <div style={{position: 'absolute',
                left: '44px', top: '24px'}}>
                <Icon name="headerLogo" />
              </div>}
              <img style={isMobile ? {width: '100%'} :
               {width: '100%', height: '100%'}} src={PlansBG} />
            </div>
          </div>
          <LocationContainer style={isMobile ? {overflow: 'unset'} :
           {alignItems: 'flex-start',
             padding: '24px', height: '100%', overflow: 'auto',
             boxSizing: 'border-box'}} className={isMobile ?
          'd-flex jc-center w-100' : 'w-50 d-flex jc-center'}>
            <DesktopWidth style={isMobile? {} : {display: 'flex',
              boxSizing: 'border-box', padding: '0'}}>
              <SignContainer>
                <LoginTabContainer style={{width: '100%'}}
                  className={isMobile ? 'z-2' : 'z-2 px-24 py-40 '}
                >
                  {isMobile ? '' : <div className='pointer'
                    onClick={() => {
                      if (storeLoc) {
                        navigate({
                          pathname: '/locationscreen/',
                          search: `?${createSearchParams({
                            isLocation: 'true'})}`,
                        });
                      } else {
                        navigate({
                          pathname: '/locationscreen/',
                          search: `?${createSearchParams({
                            isLocation: 'false'})}`,
                        });
                      }
                    }}
                    style={{marginLeft: '-0.5rem', marginTop: '1rem'}}
                  ><Icon name='backarrow'/> </div>}
                  <h2 className='confMainText mt-10 mb-12'>
                    {allowedLocation === true ?
                     'You are just a step away from starting your journey!' :
                   'Upgrade your assessment with an Inflammation Test'}</h2>
                  <div className='confText'>
                  Select your plan below</div>
                  {plans.map((plan: any, index: number)=>{
                    return <PlansContainer
                      className={plan.price_id === selectedPlan ?
                       'active' : 'inactive'}
                      onClick={()=> planSelection(plan)} key={index}>
                      <div className='d-flex justify-content-between'>
                        <div className='price'>${plan.plan_price} total</div>
                        <div className='pointer'>
                          <Icon name={plan.price_id === selectedPlan ?
                             'checkmarkIcon' : 'emptyCheckboxIcon'} /></div>
                      </div>
                      <h4 className='cardMainCon'>{plan.plan_title + ' ' +
                      plan.plan_type}</h4>
                      <ul>
                        {plan.plan_description.map((desc: any, index: number)=>{
                          return <li key={index}>{desc}</li>;
                        })}
                      </ul>
                    </PlansContainer>;
                  })}
                  <div className='mr-24 ml-24 mt-40'>
                    <Button variant={isSubmitting ?
                 'disabled' : 'primary'}
                    className='pt-30 mt-20'
                    type="submit"
                    onClick={onSubmit}
                    size='large' width='100%'
                    >Next</Button>
                  </div>
                </LoginTabContainer>
              </SignContainer>
            </DesktopWidth>
          </LocationContainer>
        </div>
      </MainContainer>

      <LayoutWrapper>
        {isMobile && <HeaderMain className={isMobile ?
         'text-center d-flex js-bet p-10' :'text-center d-flex js-bet'}>
          <IconsContainer className='d-flex mrt-6' onClick={() => {
            if (storeLoc) {
              navigate({
                pathname: '/locationscreen/',
                search: `?${createSearchParams({
                  isLocation: 'true'})}`,
              });
            } else {
              navigate({
                pathname: '/locationscreen/',
                search: `?${createSearchParams({
                  isLocation: 'false'})}`,
              });
            }
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
        </HeaderMain>}
        <LeftContainer style={{backgroundColor: '#FFF'}}>
          <LogoWrapper>
            {!isMobile &&
            //  <BackBtnContainer>
            //   <BackIconContainer onClick={() => {
            //     if (storeLoc) {
            //       navigate({
            //         pathname: '/locationscreen/',
            //         search: `?${createSearchParams({
            //           isLocation: 'true'})}`,
            //       });
            //     } else {
            //       navigate({
            //         pathname: '/locationscreen/',
            //         search: `?${createSearchParams({
            //           isLocation: 'false'})}`,
            //       });
            //     }
            //   }}>
            //     <Icon name='backarrow'/>
            //   </BackIconContainer>
            // </BackBtnContainer> :
              <Icon name="headerLogo" />}
          </LogoWrapper>
          <ImageContainer className='d-flex'>
            <img alt='expectation-screen'
              className='w-100' src={PlansBG} />
          </ImageContainer>
        </LeftContainer>
        <RightContainer style={isMobile ? {height: 'auto'} : {}}>
          <RightContent>
            <div className="outer-content-wrapper">
              {!isMobile && <BackBtnContainer className='pb-24'>
                <BackIconContainer onClick={() => {
                  if (storeLoc) {
                    navigate({
                      pathname: '/locationscreen/',
                      search: `?${createSearchParams({
                        isLocation: 'true'})}`,
                    });
                  } else {
                    navigate({
                      pathname: '/locationscreen/',
                      search: `?${createSearchParams({
                        isLocation: 'false'})}`,
                    });
                  }
                }}>
                  <Icon name='backarrow'/>
                </BackIconContainer>
              </BackBtnContainer>}
              <TextContent className='p-0'>
                <h2 className='m-0 plans-content'>
                  {allowedLocation === true ?
                     'Your journey to health starts here' :
                   'Upgrade your assessment with an Inflammation Test'}</h2>
                <div className={'plan-sub-content '+
                (isMobile?' my-24':'mt-8 mb-24' )}>
                  Select your plan below</div>
                {plans.map((plan: any, index: number)=>{
                  return <PlansContainer
                    className={plan.price_id === selectedPlan ?
                       'active' : 'inactive'}
                    onClick={()=> planSelection(plan)} key={index}>
                    <div className='d-flex justify-content-between'>
                      <div className='price'>${plan.plan_price}
                        <span style={{marginLeft: '8px', fontSize: '18px'}}>
                          total</span></div>
                      <div className='pointer'>
                        <Icon name={plan.price_id === selectedPlan ?
                             'checkmarkIcon' : 'emptyCheckboxIcon'} /></div>
                    </div>
                    <h4 className='cardMainCon'>{plan.plan_title + ' ' +
                      plan.plan_type}</h4>
                    <ul>
                      {plan.plan_description.map((desc: any, index: number)=>{
                        return <li key={index}>{desc}</li>;
                      })}
                    </ul>
                  </PlansContainer>;
                })}

              </TextContent>
              <Actions>
                <Button variant={isSubmitting ?
                 'disabled' : 'primary'}
                className={'responsive-btn'}
                type="submit"
                onClick={onSubmit}
                size='large' width='100%'
                >Next</Button>
              </Actions>
            </div>
          </RightContent>
        </RightContainer>
      </LayoutWrapper>
      {showPopup && <>
        <BackDrop style={isMobile? {alignItems: 'unset'}:
         {alignItems: 'center'}}>
          <ExpectationContainer style={isMobile ? {borderRadius: '0',
            minHeight: '0'} : {}}>
            <div className='state_alert mb-12'>
              <div className='alertMainText d-flex gap-8'>
                <Icon name='info'/>
                <h4 style={{margin: '0'}}>Information</h4> </div>
              <div className='pointer' onClick={() => setShowPopup(false)}>
                <Icon name='closeIcon'/>
              </div>
            </div>
            {/* <div className='alert_main_con mb-12'> */}
            <div className='exprectInfo'>
                Due to state laws, we are unable to send test kits
                 to NY, NJ, or RI. If desired, you can request the 9
                  markers in our Inflammation Test Kit from your doctor,
                   and we will include them in your final Root Cause
                    Report for you, providing our own analysis of these
                     results for you at no additional cost.</div>
            {/* </div> */}
          </ExpectationContainer>
        </BackDrop>
      </>}
    </>
  );
}
