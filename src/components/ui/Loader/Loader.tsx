import React from 'react';
import {ActivityIndicator, StyleSheet, View, ViewStyle} from 'react-native';
import {SIZE} from '../../../types';
import {COLORS, LOADER_TEST_ID} from '../../../utils/utils';

type Props = {
  color?: string;
  size?: SIZE;
  loadingStyle?: ViewStyle;
};

const LoadingIcon = (props: Props) => {
  const {color, size, loadingStyle} = props;

  return (
    <View style={[styles.loading, loadingStyle]}>
      <ActivityIndicator
        testID={LOADER_TEST_ID}
        size={size ? size : 'small'}
        color={color ? color : COLORS.Black}
      />
    </View>
  );
};

export default LoadingIcon;

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
