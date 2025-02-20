/* eslint-disable guard-for-in */
import axios from '../axios/http';
import {PayloadProps} from '../schema/schema';
const apiBaseUrl = process.env.REACT_APP_API_URL;
// import json from '../core/tempApi'
/**
 * Renders Component.
 * @param {PayloadProps} params is the inpur param.
 * @return {params} from  The Resp Component.
 */
export async function triggerApi(params: PayloadProps) {
  return getResponse(params);
  // alert(JSON.stringify(params));
}

/**
 * Renders Component.
 * @param {PayloadProps} response is the inpur param.
 * @return {params} from  The Resp Component.
 */
export async function triggerApiFake(response) {
  return new Promise((resolve, reject) => {
    if (response) {
      resolve(response);
    } else {
      reject(new Error('Something went wrong'));
    }
  });
}

/**
 * Renders Component.
 * @param {params} params is the inpur param.
 * @return {Response} from  The Resp Component.
 */
function getResponse(params) {
  const bodyFormData = new FormData();
  for (const key in params.payload) {
    bodyFormData.append(key, params.payload[key]);
  }
  const methodTypes = ['GET', 'POST', 'PUT', 'DELETE'];

  if (methodTypes.indexOf(params.method.toUpperCase()) !== -1) {
    // do nothing
  } else {
    params.method = 'GET';
  }
  return axios({
    method: params.method,
    url: apiBaseUrl + params.apiUrl,
    data: params.payload,
    headers: params.headers ? params.headers : {},
  })
      .then((res) => {
        const response = res.data;
        return response;
      })
      .catch((err) => {
        console.log(err, 'Error');
      });
}
