import React, {ReactNode, useMemo} from 'react';
import {ViewStyle, TextStyle, TouchableOpacity} from 'react-native';
import {BoldText} from '../../texts';
import {COLORS} from '../../../utils/utils';

type ButtonProps = {
  customStyle?: ViewStyle;
  title?: string;
  onPress?: () => void;
  textStyle?: TextStyle;
  testID?: string;
  disabled?: boolean;
  children?: ReactNode;
};

const Button = (props: ButtonProps) => {
  const {
    customStyle,
    onPress,
    title,
    textStyle,
    children,
    testID,
    disabled,
    ...rest
  } = props;

  const buttonStyle = useMemo(() => {
    if (disabled) {
      return {...customStyle, backgroundColor: COLORS.OffWhite};
    }
    return customStyle;
  }, [customStyle, disabled]);

  return (
    <TouchableOpacity
      testID={testID}
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      {...rest}>
      {title ? <BoldText customStyle={textStyle} title={title} /> : children}
    </TouchableOpacity>
  );
};

export default Button;
