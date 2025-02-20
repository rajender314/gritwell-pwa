/* eslint-disable max-len */
// export const namePattern = /^[a-zA-Z ]{1,15}*$/;
export const emailPattern =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const usPhonePattern=
'/^([0-9]{3}\)[0-9]{3}-[0-9]{4}$/';
export const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#-_$%^&*])(?=.{8,})/;
export const upperCasePattern = /^(?=.*[A-Z])(?=.{1,})/;
export const lowerCasePattern = /^(?=.*[a-z])(?=.{1,})/;
export const numberPattern = /^(?=.*[0-9])(?=.{1,})/;
export const specialPattern = /^(?=.*[\!@#\-_$%\^\&*])(?=.{1,})/;
export const minLenPattern = /^(.{8,})*$/;
export const whiteSpace = /^\s*$/;
export const cityPattern = /^(?=.*[a-zA-Z])(?=.{1,})/;
export const msgPattern = /^(?=.*[a-zA-Z])(?=.{1,})/;
