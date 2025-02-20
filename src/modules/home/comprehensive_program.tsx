/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import {IconsContainer} from '../assesment-questions/assesment-questions-components';
import {MainContainer} from '@app/styles/common-styles';

import {isMobile} from 'react-device-detect';
import {createSearchParams, useNavigate} from 'react-router-dom';
import Button from '@app/components/button';
import Header from '@app/components/header';
import {HeaderMain} from '@app/components/header/header-components';
import Icon from '@app/components/icon';
import {InflamtionContent, InflamationHeading, ViewProfile, PlanPageHeader} from '../home/home-components';
import {LayoutWrapper, LeftContainer, ImageContainer, RightContainer, RightContent, BackBtnContainer, BackIconContainer, TextContent, Actions, PlanImageHolder, ProgramCard, ProgramCardContent} from '../sign-up/component/signup.components';
// import MainJumstartBG from '@app/assets/images/Main_jumpstart_BG.png';
import MiniJumstartBG from '@app/assets/images/Main_jumpstartMini_BG.png';
import ComprehensiveBG from '@app/assets/images/comprehensive_planBG.png';
import apiEndpoint from '@app/core/apiend_point';
import {PayloadProps, ApiResponseProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import {getLocalStorage} from '@app/core/localStorageService';
/**
 * Renders Component.
 * @return {AssesmentQuestions} renders Component.
 */
export default function ComprehensiveProgram() {
  const navigate = useNavigate();
  const [selectedData, updateSelectedData] = useState({});
  const token = getLocalStorage('token') ? getLocalStorage('token') : '';

  useEffect(() => {
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.customerExtendCarePlans,
      headers: {Authorization: token},
    };
    triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code == 200) {
            // setPlanDes(response.data);
            const res = response['data'];
            res.map((plan: any)=>{
              if (plan.plan_slug === 'comprehensive') {
                updateSelectedData(plan);
              }
            });
            console.log(response['data']);
            // setSelectedID(response['data'][0]['_id']);
          }
        });
  }, []);
  return (
    <>
      <MainContainer bgColor={isMobile? '#ffffff':'#FAFAFC'}
        className={isMobile ? 'fxh-100' : ''}>
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
        <LayoutWrapper className='with-header'>
          <LeftContainer style={{backgroundColor: '#1E3653'}}>
            {/* {!isMobile && <BackBtnContainer className='positioned'>
              <BackIconContainer onClick={() => {
                navigate('/rootcause-home');
              }}>
                <Icon name='backarrow'/>
              </BackIconContainer>
            </BackBtnContainer>} */}
            <ImageContainer className='d-flex justify-content-center'>
              {/* <div> */}
              <img className='plansImageSyles' alt='inflammationBG' src={ComprehensiveBG} />
              {/* </div> */}
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
                  <PlanPageHeader className='mt-0 mb-1'>Comprehensive program</PlanPageHeader>
                  <div className='plansBoldText'>
                  $199 per month for 6 months
                  </div>
                  <InflamtionContent className='mb-32'>You’ll meet biweekly and work 1:1 with your functional medicine health coach to receive personalized recommendations on medical grade supplements, nutrition, testing, and more. </InflamtionContent>
                  <div>
                    <h3 className='plan-h3 m-0'>What’s included</h3>
                    <ul className='jumstart-plan-list'>
                      <li className='plans-li'>2 appointments per month</li>
                      <li className='plans-li'>Access to advanced testing</li>
                      <li className='plans-li'>Personalized health plan</li>
                      <li className='plans-li'>Unlimited care team messaging & support</li>
                    </ul>
                  </div>
                </TextContent>
                <Actions className='py-40 dflex flex-row confStyles justify-content-center'>
                  <Button variant={'secondary'}
                    className={'responsive-Imbalance-btn'}
                    type="submit"
                    onClick={() => {
                      navigate('/chat-end');
                    }}
                    size='large' width='100%'
                  >Speak to care manager</Button>
                  <Button variant={'primary'}
                    className={'responsive-Imbalance-btn'}
                    type="submit"
                    onClick={() => {
                      navigate(
                          {
                            pathname: '/order-payment',
                            search:
                          // eslint-disable-next-line max-len
                          `?${createSearchParams({
                            planType: selectedData?.['plan_slug'],
                            paymentFee: selectedData?.['plan_price'],
                            addPay: 'true',
                            id: selectedData['_id'],
                            userType: 'rootcause',
                          })}`,
                          },
                          {
                            state: {
                              rootData: selectedData,
                            },
                          },
                      );
                    }}
                    size='large' width='100%'
                  >Purchase program</Button>
                </Actions>
                <div style={{background: '#F8F5F0', padding: (isMobile?'40px 24px 16px':'40px 40px 16px'), margin: (isMobile?'0 -24px -24px' : '0 -40px -40px')}}>
                  <InflamationHeading className='mt-10'>Explore alternative plans</InflamationHeading>
                  <ProgramCard className='dflex'>
                    <PlanImageHolder><img src={MiniJumstartBG} alt='jumpstartPlan'/> </PlanImageHolder>
                    <ProgramCardContent>
                      <div className='w-100 d-flex justify-content-between'>
                        <ViewProfile>3 MONTHS</ViewProfile>
                        <div className='price'>$125/month</div>
                      </div>
                      <h3 className='planheader' style={{fontSize: '22px', margin: '16px 0', fontWeight: ' 400'}}>Jumpstart program</h3>
                      <Actions style={{flexDirection: 'row'}}>
                        <Button variant={'secondary'}
                          //   className={'responsive-btn'}
                          type="submit"
                          onClick={() => {
                            navigate('/jumpstart-program');
                          }}
                          size='large' width='100%'
                        >Learn more</Button>
                      </Actions>
                    </ProgramCardContent>
                  </ProgramCard>
                </div>
              </div>
            </RightContent>
          </RightContainer>
        </LayoutWrapper>
      </MainContainer>
    </>
  );
}
