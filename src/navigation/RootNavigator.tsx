import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {AuthStack, GuestStack} from './app/App';
import {useSelector} from 'react-redux';
import {RootState} from '../store';

const RootNavigator: React.FC = () => {
  // React Navigation defaults to a gray background - we want white
  const {userToken} = useSelector((state: RootState) => state.auth);

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };
  return (
    <NavigationContainer theme={theme}>
      {!userToken ? <GuestStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
