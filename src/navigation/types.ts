import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Character} from '../types';

/// We use enums to prevent the use of strings across the application - i.e, write once

export const enum APP_ROUTE {
  LIST = 'LIST',
  FAVORITE = 'FAVORITE',
  DETAIL = 'DETAIL',
  USER_DETAIL = 'USER_DETAIL',
  GOOGLE_SIGN_IN = 'GOOGLE_SIGN_IN',
}

export type AppStackParamList = {
  [APP_ROUTE.LIST]: undefined;
  [APP_ROUTE.FAVORITE]: undefined;
  [APP_ROUTE.DETAIL]: Character;
  [APP_ROUTE.USER_DETAIL]: undefined;
  [APP_ROUTE.GOOGLE_SIGN_IN]: undefined;
};

export type ListScreenNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  APP_ROUTE.LIST
>;

export type FavoriteScreenNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  APP_ROUTE.FAVORITE
>;

export type DetailScreenRouteProp = RouteProp<
  AppStackParamList,
  APP_ROUTE.DETAIL
>;

export type DetailScreenNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  APP_ROUTE.DETAIL
>;

export type UserDetailScreenNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  APP_ROUTE.USER_DETAIL
>;

export type GoogleSignInScreenNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  APP_ROUTE.GOOGLE_SIGN_IN
>;
