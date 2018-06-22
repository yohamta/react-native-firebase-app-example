import { Platform } from 'react-native';

const extractObject = object => {
  let { ios, android, ...base } = object; // eslint-disable-line prefer-const
  if (ios && Platform.OS === 'ios') {
    base = { ...base, ...ios };
  }
  if (android && Platform.OS === 'android') {
    base = { ...base, ...android };
  }
  return base;
};

const createObject = object => {
  const object2 = extractObject(object);
  const platformObject = {};
  Object.keys(object2).forEach(name => {
    if (typeof object2[name] !== 'object') {
      platformObject[name] = object2[name];
      return;
    }
    platformObject[name] = extractObject(object2[name]);
  });
  return platformObject;
};

export { createObject }; // eslint-disable-line import/prefer-default-export
