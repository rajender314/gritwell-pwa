import {useEffect, useState} from 'react';
import Header from '@app/components/header';
import {isMobile} from 'react-device-detect';
import apiEndpoint from '@app/core/apiend_point';
import {Loader, MainContainer} from '@app/styles/common-styles';
import {ApiResponseProps, PayloadProps} from '@app/schema/schema';
import {getLocalStorage} from '@app/core/localStorageService';
import {triggerApi} from '@app/services';
import Spinner from '@app/components/icon/icons/loader';
import Extend from './extend-plans';
import React from 'react';
import MemberOptions from './on-demands';
import {useLocation} from 'react-router-dom';
/**
 * Renders Component.
 * @return {Endofcare} renders Component.
 */
export default function EndOfCare() {
  const [extendplans, setExtendplans]=useState([]);
  const [spinner, showSpinner] = useState(true);
  const token = getLocalStorage('token') ? getLocalStorage('token') : '';
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  useEffect(()=>{
    showSpinner(true);
    getExtendPlan();
  }, []);
  const getExtendPlan = async () =>{
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.customerExtendCarePlans,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code == 200) {
            setExtendplans(response.data);
            showSpinner(false);
          } else {
            setExtendplans([]);
            showSpinner(false);
          }
        });
  };
  return (
    <>
      {spinner ? (
        <Loader>
          <Spinner size="6px" />
        </Loader>
      ) : null}
      {!spinner ?<MainContainer bgColor='#fff'>
        <Header
          className="justify-content-between"
          bgCol={isMobile ? '#ffffff' : '#ffffff'}
          desktopMenu={isMobile ? false : true}
          showMessage={true}
          hideBack={false}
          hideBackArrow={false}
        />{
       searchParams.get('topUp') ? <Extend plansData={extendplans}/>:
        <MemberOptions plansData={extendplans}/> }
      </MainContainer> : null}

    </>
  );
}
