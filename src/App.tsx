import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import Screens from './navigation/RootNavigator';
import store, {persistor} from './store';
import {PersistGate} from 'redux-persist/integration/react';
import codePush from 'react-native-code-push';
import {codePushOptions, initializeCodePush} from './utils/updates.utils';
import ErrorBoundary from './utils/errorBoundary.utils';

const App = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      initializeCodePush();
    }, 60000);

    return function cleanUp() {
      clearTimeout(timer);
    };
  }, []);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaView style={styles.backgroundStyle}>
            <StatusBar barStyle={'light-content'} />
            <Screens />
          </SafeAreaView>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
};

export default codePush(codePushOptions)(App);

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
  },
});
