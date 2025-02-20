/* eslint-disable max-len */
import AlertDialog from '@app/components/alert-dialog';
import Button from '@app/components/button';
import Header from '@app/components/header';
import Icon from '@app/components/icon';
import {Description} from
  '@app/components/layout-onBoarding/layout-onBoarding-components';
import {confirmStatements} from '@app/core/apiend_point';
import {getLocalStorage} from '@app/core/localStorageService';
import {whiteColor} from '@app/styles';
import {MainContainer, DesktopWidth, Heading}
  from '@app/styles/common-styles';
import React, {useEffect, useState} from 'react';
import {isMobile} from 'react-device-detect';
import {useNavigate} from 'react-router-dom';
import {ContentContainer, IconsContainer} from
  '../assesment-questions/assesment-questions-components';
import {ScrollSection} from
  '../boarding-screens/component/boarding-screen-components';
import {PlansSection, BodyText3, PricingText} from
  '../recommend-plans/component/recommend-plans-components';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';

/**
 * Renders Component.
 * @return {HealthPlan} renders Component.
 */
export default function HealthPlan() {
  const [plansData, updatePlanDetails] = useState({});
  const [userDetails, updateUserDetails] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, updateDialogData] =
  useState(confirmStatements['pauseSubscription']);
  const navigate = useNavigate();

  useEffect(()=>{
    const userData= JSON.parse(getLocalStorage('userData'));
    updateUserDetails(userData);
    updatePlanDetails(userData['subscription_plan_info']);
    updateDialogData(confirmStatements['cancelSubscription']);
    Mixpanel.track(service['healthPlan']['title'], service['healthPlan']['props']);
    gtag('event', gaService['healthPlan']['title'], {
      'event_category': gaService['healthPlan']['category'],
    });
  }, []);
  /**
   * @param {token} type from api
  */
  async function updateDialog(type:any) {
    updateDialogData(confirmStatements[type]);
    setOpenDialog(true);
  }
  return (<>
    <MainContainer bgColor={whiteColor}>
      <Header hideBackArrow={false} className='txt-left bg-white'
        desktopMenu={isMobile ? false : true}/>
      <ScrollSection id="scrollable-div"
        className={isMobile ?'h-150' : 'h-150 flex-1'}>
        <DesktopWidth>
          <ContentContainer className={isMobile ?'p-0' : 'br-bg mt-40'}>
            <div className={isMobile ? 'p-24 pb-0' : 'p-0'} >
              <IconsContainer onClick={()=>{
                navigate('/profile-menu');
                Mixpanel.track(action['healthPlan']['back']['title'], action['healthPlan']['back']['props']);
                gtag('event', gaAction['healthPlan']['back']['title'], {
                  'event_category': gaAction['healthPlan']['back']['category'],
                });
              }}>
                <Icon name={'chervonLeft'} />
              </IconsContainer>

            </div>
            {openDialog && <AlertDialog dialogData={dialogData}
              subscriptionId ={userDetails['stripe_subscription_id']}
              onCancel={(e:any)=>{
                setOpenDialog(false);
                if (e == 'confirm') {
                  location.reload();
                }
              }}/>
            }
            <ContentContainer className='health-page pt-0'>
              <Heading>
            Health Plan
              </Heading>
              <PlansSection className='payment-page'>
                <BodyText3>{plansData['plan_duration'] }
                  {plansData['duration_type']}</BodyText3>
                <PricingText>{plansData['currency_type']}
                  {plansData['plan_price']}/
                  {plansData['recurring_type']}
                </PricingText>
                <Description>{plansData['plan_type']}</Description>
              </PlansSection>
              {userDetails['subscription_status'] != 'cancel' &&<>
                <Button variant={'primary'}
                  size='large' width='100%'
                  onClick={()=>{
                    updateDialog(userDetails['subscription_status'] ==
                       'active' ?
                  'pauseSubscription' : 'resumeSubscription');
                  }}
                  className={'flx-center m-10'}
                >{userDetails['subscription_status'] === 'active' ?
            'Pause' : 'Resume'}</Button>
                <Button variant={'secondary'}
                  size='large' width='100%'
                  onClick={()=>{
                    updateDialog('cancelSubscription');
                    Mixpanel.track(action['healthPlan']['cancel']['title'], action['healthPlan']['cancel']['props']);
                    gtag('event', gaAction['healthPlan']['cancel']['title'], {
                      'event_category': gaAction['healthPlan']['cancel']['category'],
                    });
                  }}
                  className={'flx-center m-10'}
                >Cancel</Button></>}
              {/* <Button variant={'primary'}
              size='large' width='100%'
              onClick={()=>{
                updateDialog('cancelSubscription');
              }}
              className={'flx-center m-10'}
            >Extend</Button> */}
            </ContentContainer>
          </ContentContainer>
        </DesktopWidth>
      </ScrollSection>
    </MainContainer>

  </>
  );
}
