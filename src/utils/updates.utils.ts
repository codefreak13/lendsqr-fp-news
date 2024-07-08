import {Alert} from 'react-native';
import codePush, {CodePushOptions} from 'react-native-code-push';

export const initializeCodePush = () => {
  codePush.sync({}, status => {
    if (status === codePush.SyncStatus.UPDATE_INSTALLED) {
      Alert.alert(
        'Update Installed',
        'New updates have been installed. Restart the app to start using them.',
        [
          {
            text: 'Do it later',
          },
          {
            text: 'Restart',
            onPress: () => {
              codePush.restartApp();
            },
          },
        ],
        {cancelable: false},
      );
    }
  });
};

export const codePushOptions: CodePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL,
  mandatoryInstallMode: codePush.InstallMode.ON_NEXT_RESTART,
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
};
