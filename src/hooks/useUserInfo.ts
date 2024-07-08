import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {APP_ROUTE, UserDetailScreenNavigationProp} from '../navigation/types';

const useUserInfo = () => {
  //navigation instance for list screen
  const navigation = useNavigation<UserDetailScreenNavigationProp>();

  const [form, setForm] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
  });
  const {fullName, phoneNumber, email} = form;

  const [errors, setErrors] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
  });

  const validateField = (field: string, value: string) => {
    let errorMessage = '';

    if (field === 'fullName') {
      if (!value) {
        errorMessage = 'Full Name is required';
      } else if (value.trim().split(' ').length < 2) {
        errorMessage = 'Please enter your full name (first and last name)';
      }
    } else if (field === 'phoneNumber') {
      if (!/^\d{11}$/.test(value)) {
        errorMessage = 'Phone Number must be 11 digits';
      }
    } else if (field === 'email') {
      if (!/\S+@\S+\.\S+/.test(value)) {
        errorMessage = 'Email is invalid';
      }
    }

    setErrors(prevState => ({...prevState, [field]: errorMessage}));
  };

  const onChangeFormValue = (field: string) => (value: string) => {
    setForm(prevState => ({...prevState, [field]: value}));
    validateField(field, value);
  };

  const navigateToSignIn = () => {
    navigation.navigate(APP_ROUTE.GOOGLE_SIGN_IN);
  };

  return {
    fullName,
    phoneNumber,
    email,
    onChangeFormValue,
    navigateToSignIn,
    errors,
  };
};

export default useUserInfo;
