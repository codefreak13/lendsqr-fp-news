import remoteConfig from '@react-native-firebase/remote-config';
import {ErrorLogger} from './logger.utils';

export async function GetWebClientIdConfig(): Promise<string | null> {
  try {
    const rawData = remoteConfig().getValue('webClientId').asString();
    // check if empty data was returned
    if (!rawData) {
      remoteConfig()
        .fetchAndActivate()
        .then(() => {
          /* do nothing */
        });
      return Promise.resolve(null);
    }
    return Promise.resolve(rawData);
  } catch (e) {
    ErrorLogger(e as Error);
    return Promise.resolve(null);
  }
}
