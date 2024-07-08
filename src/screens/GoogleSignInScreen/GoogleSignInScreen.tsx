import React from 'react';
import {GoogleSigninButton} from 'react-native-google-signin';
import {Header} from '../../components/ui';
import {useAuth} from '../../hooks';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {GOOGLE_TEST_ID} from '../../utils/utils';

const GoogleSignInScreen = () => {
  const {loading, goBack, signIn} = useAuth();

  return (
    <>
      <Header
        leftButton={{
          onclick: () => goBack(),
        }}
        customMiddleIcon
        title="SIGN IN"
      />
      <View style={styles.flex} />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <GoogleSigninButton
          testID={GOOGLE_TEST_ID}
          onPress={signIn}
          style={styles.mainStyle}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainStyle: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  flex: {
    flex: 0.4,
  },
});

export default GoogleSignInScreen;
