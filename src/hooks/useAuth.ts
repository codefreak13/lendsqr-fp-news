import {
  GoogleSignin as GoogleSigning,
  statusCodes,
} from 'react-native-google-signin';
import {useDispatch} from 'react-redux';
import {Alert} from 'react-native';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Character} from '../types';
import {APP_ROUTE, FavoriteScreenNavigationProp} from '../navigation/types';
import {GetWebClientIdConfig} from '../utils/remoteConfig.utils';
import {AppDispatch} from '../store';
import {clearUserInfo, setUserInfo} from '../store/slices/authSlice';
import {ErrorLogger} from '../utils/logger.utils';
import useFirebaseAnalytics from './useFirebaseAnalytics';

const isGoogleSignInError = (error: unknown): error is {code: string} => {
  return typeof error === 'object' && error !== null && 'code' in error;
};

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const analytics = useFirebaseAnalytics();
  const configure = async () => {
    try {
      const webClientId = await GetWebClientIdConfig();
      if (!webClientId) {
        return;
      }
      GoogleSigning.configure({
        scopes: [
          'https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/userinfo.profile',
        ],
        webClientId,
      });
    } catch (error) {
      ErrorLogger(error as Error);
    }
  };

  const navigation = useNavigation<FavoriteScreenNavigationProp>();
  const dispatch: AppDispatch = useDispatch();

  const signIn = async () => {
    try {
      setLoading(true);
      await configure();
      await GoogleSigning.hasPlayServices();
      setTimeout(async () => {
        const {idToken} = await GoogleSigning.signIn();
        dispatch(setUserInfo(idToken));
        setLoading(false);
        analytics.trackAuthentication('Google');
      }, 100);
    } catch (error) {
      setLoading(false);
      if (isGoogleSignInError(error)) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          Alert.alert('Cancel');
        } else if (error.code === statusCodes.IN_PROGRESS) {
          Alert.alert('Signin in progress');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          Alert.alert('PLAY_SERVICES_NOT_AVAILABLE');
        } else {
          console.log(error);
          Alert.alert('Error');
        }
      }
    }
  };

  const signOut = async () => {
    try {
      dispatch(clearUserInfo());
      if (await GoogleSigning.isSignedIn()) {
        await GoogleSigning.signOut();
      }
      analytics.trackLogOut;
    } catch (error) {
      console.error(error);
    }
  };

  const goBack = () => navigation.goBack();

  const onPress = (item: Character) => {
    navigation.navigate(APP_ROUTE.DETAIL, item);
  };

  useEffect(() => {
    configure();
  }, []);

  return {
    loading,
    onPress,
    goBack,
    signIn,
    signOut,
  };
};

export default useAuth;
