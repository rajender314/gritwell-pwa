/* eslint-disable max-len */
import axios from 'axios';
import React from 'react';
import gtag from 'ga-gtag';
// import googletag from 'ga-gtag';
import {useEffect, useState} from 'react';
import './App.css';
import apiEndpoint from './core/apiend_point';
import {getLocalStorage, setLocalStorage} from './core/localStorageService';
import {ApiResponseProps, PayloadProps} from './schema/schema';
import {triggerApi} from './services';
import {
  clearCacheData,
  getProfileDetails,
  updateConfigListData,
} from './utils';
import mixpanel from 'mixpanel-browser';
import Spinner from './components/icon/icons/loader';
import {Loader} from './styles/common-styles';
import {AuthProvider} from './providers';
import {RoutesGrit} from './routes';
import ReactPixel from 'react-facebook-pixel';
// import disableLogs from './utils/general';
// import {useNavigate} from 'react-router-dom';
// const navigate = useNavigate();

/**
 * Renders Component.
 * @return {Routes} Application routes are instialized here.
 */
function App() {
  // const [configData, setConfigData] = useState<any>([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    if (getLocalStorage('configList')) {
      const data = JSON.parse(getLocalStorage('configList'));
      // setConfigData(data);
      // if (window.location.pathname === '/health-spectrum') {
      //   googletag('config', data?.hsGAnalytics);
      //   googletag(data?.hsGAnalytics, {
      //     debug: true,
      //   });
      // } else {
      gtag('config', data?.gAnalytics);
      gtag('config', data?.googleAdGtagCode);
      gtag(data?.gAnalytics, {
        debug: true,
      });
      // }
      mixpanel.init(data.mixpanel ? data.mixpanel : '1', {
        debug: true,
      });
      ReactPixel.init(data.facebookMetaPixel ? data.facebookMetaPixel : '1');
      ReactPixel.pageView();
      actionCall();
    }
    // ReactPixel.init('1144645979525139');
    // ReactPixel.pageView();
    clearCacheData();
    // disableLogs();
    if (!getLocalStorage('faqs')) {
      getFAQs();
    }
    if (!getLocalStorage('configList')) {
      guestLogin();
    }
    if (getLocalStorage('token') && !getLocalStorage('userData')) {
      getProfileDetails();
    }
    gtag(window.location.pathname + window.location.search);
    // if (window.location.pathname === '/health-spectrum') {
    //   googletag(window.location.pathname + window.location.search);
    // }
  }, [window.location]);
  /**
   * function for calling data
   */
  function getFAQs() {
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.signInDocs,
    };
    triggerApi(apiObject).then((res: ApiResponseProps) => {
      setLocalStorage('faqs', JSON.stringify(res.data));
    });
  }
  /**
   * get Boarding JSON from the API.
   *  */
  function guestLogin() {
    const d = new Date();
    const offset = d.getTimezoneOffset();
    axios({
      url: process.env.REACT_APP_API_URL + 'guestLogin',
      method: 'POST',
      // eslint-disable-next-line max-len
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization':
         'Basic R3JpdHdlbGwtQ29yZTpablhaOXB0WEhiNzdwaE9KYkdVcQ==',
      },
      data: `username=guest@gwc.com&password=Enter@123&offset=${offset}`,
    })
        .then(function(response: any) {
          if (response.status == 200) {
            getConfigList(response.data.token);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
  }
  /**
   * function for calling data
   * @param {token} token guest token
   */
  function getConfigList(token) {
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.configApi,
      headers: {Authorization: token},
    };
    triggerApi(apiObject).then((res: ApiResponseProps) => {
      updateConfigListData(res.data.result);
      // if (window.location.pathname === '/health-spectrum') {
      //   googletag('config', res.data.result?.hsGAnalytics);
      //   googletag(res.data.result?.hsGAnalytics, {
      //     debug: true,
      //   });
      // } else {
      gtag('config', res.data.result?.gAnalytics);
      gtag('config', res.data.result?.googleAdGtagCode);
      gtag(res.data.result?.gAnalytics, {
        debug: true,
      });
      // }
      mixpanel.init(res.data.result.mixpanel ? res.data.result.mixpanel : '1', {
        debug: true,
      });
      ReactPixel.init(res.data.result.facebookMetaPixel ? res.data.result.facebookMetaPixel : '1');
      ReactPixel.pageView();
      actionCall();
      setLocalStorage('configList', JSON.stringify(res.data.result));
      window.location.reload();
    });
  }
  setTimeout(() => {
    setLoader(false);
  }, 2000);

  return loader ? (
    <Loader>
      <Spinner size="6px" />
    </Loader>
  ) : (
    <div className="App">
      <AuthProvider>
        <RoutesGrit />
      </AuthProvider>
    </div>
  );
}
/**
 * function for calling data
 * @return {data} from
 */
function actionCall() {
  return {
    identify: (id: any) => {
      mixpanel.identify(id);
    },
    alias: (id: any) => {
      mixpanel.alias(id);
    },
    track: (name: any, props: any) => {
      mixpanel.track(name, props);
    },
  };
}
export const Action = actionCall();
export const Mixpanel = Action;
export default App;
