import React, {ReactNode} from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {COLORS, DEVICE_HEIGHT, DEVICE_WIDTH} from '../../../utils/utils';
import {BoldText} from '../../texts';
import {
  HEADER_TEST_ID,
  LEFT_BUTTON_TEST_ID,
  MIDDLE_ICON_TEST_ID,
  RIGHT_BUTTON_TEST_ID,
} from '../../../utils/utils';

export type HeaderButton = {
  text?: string;
  child?: ReactNode;
  onclick?: () => void;
};

export type HeaderProps = {
  leftButton?: HeaderButton;
  rightButton?: HeaderButton;
  customMiddleIcon?: ReactNode;
  showBottomBorder?: boolean;
  customHeaderStyles?: ViewStyle;
  middleIconStyle?: TextStyle;
  title?: string;
};

/**
 * Custom Navigation Header component
 */
const Header = (props: HeaderProps) => {
  const {
    leftButton,
    rightButton,
    showBottomBorder,
    customMiddleIcon,
    customHeaderStyles,
    middleIconStyle,
    title,
  } = props;

  return (
    <View
      style={[
        styles.header,
        showBottomBorder ? styles.bottomBorder : null,
        customHeaderStyles ? customHeaderStyles : null,
      ]}
      testID={HEADER_TEST_ID}>
      {leftButton && (
        <View style={styles.leftButton}>
          <TouchableOpacity
            onPress={() => leftButton?.onclick?.()}
            testID={LEFT_BUTTON_TEST_ID}>
            {leftButton?.child ?? (
              <FontAwesome name="arrow-left" size={16} color={COLORS.Black} />
            )}
          </TouchableOpacity>
        </View>
      )}

      {customMiddleIcon && (
        <View style={styles.customMiddleIcon}>
          {title ? (
            <BoldText
              customStyle={{...styles.customStyle, ...middleIconStyle}}
              title={title}
              testID={MIDDLE_ICON_TEST_ID}
            />
          ) : (
            customMiddleIcon
          )}
        </View>
      )}

      {rightButton && (
        <View style={styles.rightButton}>
          <TouchableOpacity
            onPress={() => rightButton?.onclick?.()}
            testID={RIGHT_BUTTON_TEST_ID}>
            {rightButton.child}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Header;

const headerImageSize = DEVICE_HEIGHT / 8;
const height = DEVICE_HEIGHT / 16;

const styles = StyleSheet.create({
  header: {
    height: height,
    flexDirection: 'row',
    alignItems: 'center',
    width: DEVICE_WIDTH,
  },
  leftButton: {
    position: 'absolute',
    left: 15,
    zIndex: 1,
  },
  headerIcon: {
    height: headerImageSize,
    width: headerImageSize,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  customMiddleIcon: {
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  logo: {
    resizeMode: 'contain',
    borderRadius: 5,
  },
  bottomBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.Grey,
  },
  rightButton: {
    position: 'absolute',
    right: 15,
    alignItems: 'flex-end',
  },
  customStyle: {
    color: COLORS.Black,
  },
});
