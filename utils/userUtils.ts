import { unMask } from 'react-native-mask-text';

export function getInitials(firstName:string, lastName:string) {
  const fistNamePart = firstName ? firstName[0] : '';
  const lastNamePart = lastName ? lastName[0] : '';
  return `${fistNamePart}${lastNamePart}`.toUpperCase();
}

export function isFirstNameValid(firstName:string) {
  return isNotEmpty(firstName);
}

export function isEmailValid(email:string) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
}

export function isPhoneNumberValid(phoneNumber:string) {
  return !phoneNumber || unmaskPhoneNumber(phoneNumber).length === 10;
}

export function unmaskPhoneNumber(phoneNumber:string) {
  return unMask(phoneNumber);
}

function isNotEmpty(string:string) {
  return string !== null && string.trim() !== '';
}