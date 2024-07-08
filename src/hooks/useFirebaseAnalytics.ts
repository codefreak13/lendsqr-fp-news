import {useCallback} from 'react';
import analytics from '@react-native-firebase/analytics';
import {Platform} from 'react-native';
import {Character, ITrackEventData, VIEW_TYPE} from '../types';

function useFirebaseAnalytics() {
  const trackEvent = useCallback(
    async (eventName: string, data: ITrackEventData = {}) => {
      const eventProperties = data;
      analytics().logEvent(eventName, eventProperties);
    },
    [],
  );

  const trackAuthentication = useCallback(
    (method: string) => {
      trackEvent('authentication', {
        Method: method,
        OS: Platform.OS,
        time: new Date().toISOString(),
      });
    },
    [trackEvent],
  );

  const trackFavoriteScreenPress = useCallback(() => {
    trackEvent('favorite_screen');
  }, [trackEvent]);

  const trackItemDetailPress = useCallback(
    (character: Character) => {
      trackEvent('item_detail_screen', {
        id: character.id,
        name: character.name,
        status: character.status,
        gender: character.gender,
      });
    },
    [trackEvent],
  );

  const trackViewType = useCallback(
    (type: VIEW_TYPE.grid | VIEW_TYPE.list) => {
      trackEvent('view_type', {ViewType: type});
    },
    [trackEvent],
  );

  const trackFilterType = useCallback(
    (type: string) => {
      trackEvent('filter_type', {FilterType: type});
    },
    [trackEvent],
  );

  const trackLogOut = useCallback(() => {
    trackEvent('log_out', {
      time: new Date().toISOString(),
    });
  }, [trackEvent]);

  const trackAddFavoriteItem = useCallback(
    (character: Character) => {
      trackEvent('added_favorite_item', {
        id: character.id,
        name: character.name,
        status: character.status,
        gender: character.gender,
      });
    },
    [trackEvent],
  );

  const trackDeleteFavoriteItem = useCallback(
    (character: Character) => {
      trackEvent('deleted_favorite_item', {
        id: character.id,
        name: character.name,
        status: character.status,
        gender: character.gender,
      });
    },
    [trackEvent],
  );

  return {
    trackLogOut,
    trackAuthentication,
    trackAddFavoriteItem,
    trackDeleteFavoriteItem,
    trackFavoriteScreenPress,
    trackItemDetailPress,
    trackViewType,
    trackFilterType,
  };
}

export default useFirebaseAnalytics;
