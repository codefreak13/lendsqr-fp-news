import {Dimensions} from 'react-native';
import {
  widthPercentageToDP as wdp,
  heightPercentageToDP as hdp,
} from 'react-native-responsive-screen';
import * as COLORS from './colors.utils';

const CustomHeight = 812;
const CustomWidth = 375;

export const hp = (value: number) => {
  const dimension = (value / CustomHeight) * 100;
  return hdp(`${dimension}%`);
};

export const wp = (value: number | string) => {
  if (typeof value === 'string') {
    return wdp(value);
  }
  const dimension = (value / CustomWidth) * 100;
  return wdp(`${dimension}%`);
};

export const capitalizeFirstLetter = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;

export const INPUT_TEST_ID = 'INPUT_TEST_ID';

export const CHARACTERS_LIST_TEST_ID = 'CHARACTERS_LIST_TEST_ID';

export const FAVORITE_LIST_BUTTON_TEST_ID = 'FAVORITE_LIST_BUTTON_TEST_ID';

export const SIGN_OUT_BUTTON_TEST_ID = 'SIGN_OUT_BUTTON_TEST_ID';

export const FAV_ICON_TEST_ID = 'FAV_ICON_TEST_ID';

export const DELETE_ICON_TEST_ID = 'DELETE_ICON_TEST_ID';

export const RIGHT_BUTTON_TEST_ID = 'RIGHT_BUTTON_TEST_ID';

export const LEFT_BUTTON_TEST_ID = 'LEFT_BUTTON_TEST_ID';

export const HEADER_TEST_ID = 'HEADER_TEST_ID';

export const MIDDLE_ICON_TEST_ID = 'MIDDLE_ICON_TEST_ID';

export const ON_CLEAR_TEST_ID = 'ON_CLEAR_TEST_ID';

export const LOADER_TEST_ID = 'LOADER_TEST_ID';

export const CONTINUE_BTN_TEST_ID = 'CONTINUE_BTN_TEST_ID';

export const LIST_ITEM_TEST_ID = 'LIST_ITEM_TEST_ID';

export const GOOGLE_TEST_ID = 'GOOGLE_TEST_ID';

export const FAV_LIST_TEST_ID = 'FAV_LIST_TEST_ID';

export {COLORS};
