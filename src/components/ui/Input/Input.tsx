import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  ViewStyle,
  View,
} from 'react-native';
import {COLORS, hp} from '../../../utils/utils';
import {ON_CLEAR_TEST_ID} from '../../../utils/utils';

type InputProps = {
  customStyle?: ViewStyle;
  value?: string;
  setValue?: (x: string) => void;
  placeholder?: string;
  numberOfLines?: number;
  multiline?: boolean;
  testID?: string;
  editable?: boolean;
  onClear?: () => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad';
};

const Input = (props: InputProps) => {
  const {
    customStyle,
    value,
    setValue,
    placeholder,
    numberOfLines,
    multiline,
    testID,
    editable,
    keyboardType,
    onBlur,
    onClear,
  } = props;

  return (
    <View style={{...styles.main, ...customStyle}}>
      <TextInput
        value={value}
        onChangeText={text => setValue && setValue(text)}
        style={styles.input}
        placeholder={placeholder}
        numberOfLines={numberOfLines}
        multiline={multiline}
        testID={testID}
        editable={editable}
        keyboardType={keyboardType}
        onBlur={onBlur}
        placeholderTextColor={COLORS.Black}
      />
      {onClear && (
        <Ionicons
          onPress={onClear}
          name="close-circle-outline"
          size={20}
          color={COLORS.Black}
          style={styles.clearStyle}
          testID={ON_CLEAR_TEST_ID}
        />
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    maxHeight: hp(50),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: hp(0.7),
    borderColor: COLORS.Black,
    backgroundColor: COLORS.White,
    borderRadius: hp(8),
  },
  input: {
    height: hp(50),
    width: '90%',
    paddingLeft: hp(5),
    color: COLORS.Black,
  },
  clearStyle: {
    marginRight: hp(10),
  },
});
