/* eslint-disable max-len */
import apiEndpoint from '@app/core/apiend_point';
import {getLocalStorage, setLocalStorage} from '@app/core/localStorageService';
import {PayloadProps, ApiResponseProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';

const disableLogs = function() {
  const console: any = (function(oldCons) {
    return {
      log: () => { },
      info: () => { },
      warn: () => { },
      error: () => { },
      verbose: () =>{ },
    };
  })(window.console);
  window.console = console;
};
export default disableLogs;
export const clearCacheData = () => {
  caches.keys().then((names) => {
    names.forEach((name) => {
      caches.delete(name);
    });
  });
};
export const checkInternetConnection =(()=>{
  if (navigator.onLine) {
  // do nothing
  } else {
    alert('No internet connection found. App is running in offline mode.');
  }
});

export const scrollTop=(()=>{
  const myDiv = document.getElementById('scrollable-div');
  myDiv.scrollTop = 0;
});
export type PaymentSuccess = {
  show: boolean;
  status: string;
};
/**
   * @param {from} n to the function
   *  @return {formatelement} global component
   * get Boarding JSON from the API.
   *  */
export function currencyFormat(n: any) {
  return n = new Intl.NumberFormat().format(n);
}
/**
     * get Boarding JSON from the API.
     * @param {type} type gfgg
   *  */
export function getProfileDetails(type?:any) {
  const planInfo = {
    'plan_description': {
      'subject': [
        'Comprehensive root-cause analysis',
        '6-month customized advanced supplement regime  ',
        'Individual appointments with your dedicated Functional Medicine (FM) trained health coach every other week',
        'Daily messaging and support included for one year - check-ins with your personal care team advocate who will guide you through the program',
      ],
      'heading': 'What is included in this plan?',
    },
    'plan_video': {
      'heading': 'More about your plan',
      'video_url': 'https://www.youtube.com/embed/BtDMvA3EI0E',
    },
    '_id': '625d1d970ab8a93ddd00b9be',
    'plan_type': 'Comprehensive plan',
    'plan_slug': 'comprehensive',
    'plan_duration': '6',
    'duration_type': ' Months',
    'currency_type': '$',
    'plan_price': 229,
    'recurring_type': 'monthly',
    'status': true,
    'price_id': 'price_1Kt3NBJ906CRVF6JKF4zfzgx',
  };
  const apiObject: PayloadProps = {
    payload: {},
    method: 'GET',
    apiUrl: apiEndpoint.getProfileApi,
    headers: {Authorization: getLocalStorage('token') ?
     getLocalStorage('token') : ''},
  };
  triggerApi(apiObject)
      .then((response: ApiResponseProps) => {
        if (response.status_code == 200) {
          const Data = response.data;
          if (Data.success) {
            if ( Data['subscription_plan_info']) {
              setLocalStorage('userData', JSON.stringify(Data));
            } else {
              Data['subscription_plan_info'] = planInfo;
              setLocalStorage('userData', JSON.stringify(Data));
            }
          } else {
            // window.location.replace('/sign-in');
          }
        }
      });
}
/**
   * @param {from} value to the function
   *  @return {formatednumbe} global component
   * get Boarding JSON from the API.
   *  */
export function formatPhoneNumbers(value) {
  // if input value is falsy eg if the user deletes the input, then just return
  if (!value) return value;

  // clean the input for any non-digit values.
  const phoneNumber = value.replace(/[^\d]/g, '');

  // phoneNumberLength is used to know when to
  // apply our formatting for the phone number
  const phoneNumberLength = phoneNumber.length;

  // we need to return the value with no formatting if its less then four digits
  // this is to avoid weird behavior
  // that occurs if you  format the area code to early

  if (phoneNumberLength < 4) return phoneNumber;

  // if phoneNumberLength is greater than 4 and less the 7 we start to return
  // the formatted number
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }

  // finally, if the phoneNumberLength is greater then seven, we add the last
  // bit of formatting and return it.
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6,
  )}-${phoneNumber.slice(6, 10)}`;
}
let configList ={};
/**
     * get Boarding JSON from the API.
     * @param {data} data config
   *  */
export function updateConfigListData(data) {
  configList = data;
}
/**
     * get Boarding JSON from the API.
 * @return {configList} Application routes are instialized here.
   *  */
export function getConfigListData() {
  return configList;
}

// eslint-disable-next-line require-jsdoc
export function logoutGlobalSession() {
  const apiObject: PayloadProps = {
    payload: {},
    method: 'Post',
    apiUrl: apiEndpoint.logOut,
    headers: {Authorization: getLocalStorage('token') ?
    getLocalStorage('token') : ''},
  };
  triggerApi(apiObject)
      .then((response: ApiResponseProps) => {
        // navigate('/sign-in');
      });
}
