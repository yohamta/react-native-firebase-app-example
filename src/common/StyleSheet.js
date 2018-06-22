import { StyleSheet } from 'react-native';
import { createObject } from './Functions';

export default {
  create: object => StyleSheet.create(createObject(object)),
};
