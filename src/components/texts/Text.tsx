import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import {COLORS, hp} from '../../utils/utils';

type TextProps = {
  title?: string | number;
  customStyle?: TextStyle;
  testID?: string;
};

const textStyle = (style: {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: any;
}) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: style.fontSize,
      fontFamily: style.fontFamily,
      fontWeight: style.fontWeight,
      color: COLORS.Black,
    },
  });

  return styles;
};

const BaseText =
  (style: ReturnType<typeof textStyle>) => (Props: TextProps) => {
    const {title, customStyle, ...rest} = Props;

    return (
      <Text style={[style.text, customStyle]} {...rest}>
        {title}
      </Text>
    );
  };

export const RegularText = BaseText(textStyle({}));

export const MediumText = BaseText(
  textStyle({
    fontSize: hp(16),
  }),
);

export const BoldText = BaseText(
  textStyle({
    fontSize: hp(16),
    fontWeight: 'bold',
  }),
);
