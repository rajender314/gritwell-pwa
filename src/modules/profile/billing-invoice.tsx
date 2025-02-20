/* eslint-disable max-len */
import {DesktopWidth, FlexContainer, MainContainer}
  from '@app/styles/common-styles';
import React, {useEffect, useState} from 'react';
import {ContentContainer, IconsContainer, ImageWrapper} from
  '../assesment-questions/assesment-questions-components';
import {useNavigate, useParams} from 'react-router-dom';
import Icon from '@app/components/icon';
import {BadgeRow, BadgeLabel} from '../home/home-components';
import {MenuHeader} from './profile-components';
import apiEndpoint from '@app/core/apiend_point';
import {ApiResponseProps, PayloadProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import {getLocalStorage} from '@app/core/localStorageService';
import mdImg from '@app/assets/images/visa.png';
import Button from '@app/components/button';
import {ScrollSection}
  from '../boarding-screens/component/boarding-screen-components';
import {whiteColor} from '@app/styles';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';

/**
 * Renders Component.
 * @return {AccountAccess} renders Component.
 */
export default function BillingInvoice() {
  const navigate = useNavigate();
  const [invoiceDetails, setInvoiceDetails] = useState({});
  const [path, updatePath] =useState('');
  const token = getLocalStorage('token') ? getLocalStorage('token') : '';
  const {id}: any = useParams();
  const restrictUser = sessionStorage.getItem('resctrict_user_actions');

  useEffect(()=>{
    getBillingInvoice();
    Mixpanel.track(service['billingInvoice']['title'], service['billingInvoice']['props']);
    gtag('event', gaService['billingInvoice']['title'], {
      'event_category': gaService['billingInvoice']['category'],
    });
  }, []);
  const getBillingInvoice =async ()=>{
  // const filter= `?onlyFirstAppointment=${true}`;
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.billingInvoice+'/'+id,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            setInvoiceDetails(response.data);
          }
        });
    const apiObject2: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.downloadInvoice+'/'+id,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject2)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            updatePath(response.data);
          }
        });
  };
  return (
    <>
      <MainContainer bgColor={whiteColor}>
        <ScrollSection id="scrollable-div" className='flex-1'>
          <DesktopWidth>
            <FlexContainer justifyContent={'space-between'} >
              <IconsContainer onClick={()=>{
                navigate('/billing-history');
                Mixpanel.track(action['billingInvoice']['back']['title'], action['billingInvoice']['back']['props']);
                gtag('event', gaAction['billingInvoice']['back']['title'], {
                  'event_category': gaAction['billingInvoice']['back']['category'],
                });
              }}>
                <Icon name={'chervonLeft'} />
              </IconsContainer>
            </FlexContainer>
            <ContentContainer className='pt-0'>
              <MenuHeader>
                {invoiceDetails['created_date']}
              </MenuHeader>
              <BadgeRow className='list clr-bl'>
                <BadgeLabel className='bold p-0'>Invoice</BadgeLabel>
              </BadgeRow>
              <BadgeRow className='list clr-bl p-0'>
                <BadgeLabel className='clr-gray p-0'>
                  {invoiceDetails['order_id']}</BadgeLabel>
              </BadgeRow>
              <BadgeRow className='list clr-bl'>
                <BadgeLabel className='bold p-0'>To</BadgeLabel>
              </BadgeRow>
              <BadgeRow className='list clr-bl p-0'>
                <BadgeLabel className='clr-gray p-0'>
                  {invoiceDetails['userName']}</BadgeLabel>
              </BadgeRow>
              <BadgeRow className='list clr-bl'>
                <BadgeLabel className='bold p-0'>Product</BadgeLabel>
              </BadgeRow>
              <BadgeRow className='list-bet clr-bl p-0  d-flex js-bet'>
                <BadgeLabel className='clr-gray p-0 d-flex js-bet'>
                  {invoiceDetails['plan_recurring_type']}&nbsp;
                  {invoiceDetails['transaction_type']}</BadgeLabel>
                <BadgeLabel className='clr-gray p-0'>
            ${invoiceDetails['amount'] ?
             invoiceDetails['amount'].toFixed(2) : ''}</BadgeLabel>
              </BadgeRow>
              <BadgeRow className='list-bet clr-bl d-flex js-bet'>
                <BadgeLabel className='bold p-0'><b>TOTAL</b></BadgeLabel>
                <BadgeLabel className='bold p-0'>
                  <b> ${invoiceDetails['amount'] ?
             invoiceDetails['amount'].toFixed(2) : ''}</b></BadgeLabel>
              </BadgeRow>
              <BadgeRow className='list clr-bl'>
                <BadgeLabel className='bold'>Payment method</BadgeLabel>
              </BadgeRow>
              <BadgeRow className='list clr-bl p-0'>
                <IconsContainer>
                  <ImageWrapper>
                    <img src={mdImg} alt="User" />
                  </ImageWrapper>
                </IconsContainer>
                <BadgeLabel className='clr-gray f-14'>
            XXXX XXXX XXXX {invoiceDetails['card_number']}</BadgeLabel>
              </BadgeRow>
              <BadgeRow className='list clr-bl'>
                <Button variant={restrictUser ==='false' ? 'disabled' : 'primary'}
                  size='large' width='auto'
                  onClick={()=>{
                    window.open(path);
                    Mixpanel.track(action['billingInvoice']['download']['title'], action['billingInvoice']['download']['props']);
                    gtag('event', gaAction['billingInvoice']['download']['title'], {
                      'event_category': gaAction['billingInvoice']['download']['category'],
                    });
                  }}
                  className={'flx-center mt-10'}
                >Download Pdf</Button>
              </BadgeRow>
            </ContentContainer>
          </DesktopWidth>
        </ScrollSection>
      </MainContainer>
    </>
  );
}

