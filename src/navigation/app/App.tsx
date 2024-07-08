import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ListScreen,
  FavoriteScreen,
  DetailScreen,
  UserDetailScreen,
  GoogleSignInScreen,
} from '../../screens/';

import {AppStackParamList, APP_ROUTE} from '../../navigation/types';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={APP_ROUTE.LIST} component={ListScreen} />
      <Stack.Screen name={APP_ROUTE.FAVORITE} component={FavoriteScreen} />
      <Stack.Screen name={APP_ROUTE.DETAIL} component={DetailScreen} />
    </Stack.Navigator>
  );
};

const GuestStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={APP_ROUTE.USER_DETAIL} component={UserDetailScreen} />
      <Stack.Screen
        name={APP_ROUTE.GOOGLE_SIGN_IN}
        component={GoogleSignInScreen}
      />
    </Stack.Navigator>
  );
};

export {AuthStack, GuestStack};
