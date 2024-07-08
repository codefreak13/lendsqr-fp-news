import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Header, Input} from '../../components/ui';
import {useUserInfo} from '../../hooks';
import {COLORS, hp} from '../../utils/utils';
import {RegularText} from '../../components/texts';
import {CONTINUE_BTN_TEST_ID} from '../../utils/utils';

const UserDetailsScreen = () => {
  const {
    fullName,
    phoneNumber,
    email,
    errors,
    onChangeFormValue,
    navigateToSignIn,
  } = useUserInfo();

  return (
    <View style={styles.mainStyle}>
      <Header customMiddleIcon title="USER DETAILS" />
      <Input
        value={fullName}
        placeholder="Full Name"
        setValue={onChangeFormValue('fullName')}
        customStyle={styles.inputStyle}
      />
      {errors.fullName ? (
        <RegularText title={errors.fullName} customStyle={styles.errorText} />
      ) : null}

      <Input
        value={phoneNumber}
        placeholder="Phone Number"
        setValue={onChangeFormValue('phoneNumber')}
        customStyle={styles.inputStyle}
        keyboardType="decimal-pad"
      />
      {errors.phoneNumber ? (
        <RegularText
          title={errors.phoneNumber}
          customStyle={styles.errorText}
        />
      ) : null}
      <Input
        value={email}
        placeholder="Email"
        setValue={onChangeFormValue('email')}
        customStyle={styles.inputStyle}
      />
      {errors.email ? (
        <RegularText title={errors.email} customStyle={styles.errorText} />
      ) : null}
      <View style={styles.flexStyle} />
      <Button
        testID={CONTINUE_BTN_TEST_ID}
        title="Continue"
        customStyle={styles.buttonStyle}
        disabled={
          !fullName ||
          !phoneNumber ||
          !email ||
          !!errors.email ||
          !!errors.fullName ||
          !!errors.phoneNumber
        }
        onPress={navigateToSignIn}
      />
    </View>
  );
};

export default UserDetailsScreen;

const styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: hp(15),
  },
  inputStyle: {
    marginVertical: hp(20),
  },
  buttonStyle: {
    borderColor: COLORS.DarkGrey,
    padding: hp(10),
    borderRadius: 8,
    marginVertical: hp(50),
    borderWidth: 1,
  },
  flexStyle: {
    flex: 1,
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginHorizontal: hp(3),
    fontSize: 12,
    marginTop: -hp(15),
  },
});
