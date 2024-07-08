import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {COLORS, wp, hp} from '../../../utils/utils';

interface itemsProps {
  label: string;
  value: string;
}

type Props = {
  items: itemsProps[];
  onValueChange: (value: string) => void;
  placeholder?: string;
  value?: string;
  style?: ViewStyle;
  textInputProps?: ViewStyle;
};

export default function PickerSelect(props: Props) {
  const {items, onValueChange, placeholder, value, style, textInputProps} =
    props;
  return (
    <View style={styles.container} testID="picker-select">
      <RNPickerSelect
        onValueChange={(textValue: string) => onValueChange(textValue)}
        items={items}
        value={value}
        placeholder={{label: placeholder, value: ''}}
        style={{...pickerSelectStyles, ...style}}
        textInputProps={textInputProps}
        useNativeAndroidPickerStyle={false}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: hp(50),
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: hp(16),
    padding: hp(5),
    borderWidth: 2,
    borderColor: COLORS.Grey,
    borderRadius: 4,
    color: COLORS.Black,
  },
  inputAndroid: {
    fontSize: hp(16),
    paddingHorizontal: hp(5),
    paddingVertical: hp(5),
    borderWidth: 0.5,
    borderColor: COLORS.DarkGrey,
    borderRadius: hp(8),
    color: COLORS.Black,
  },
  inputAndroidContainer: {
    width: wp(70),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(5),
  },
  inputIOSContainer: {
    width: wp(70),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(5),
  },
});
