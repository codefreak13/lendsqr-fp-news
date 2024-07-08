import React from 'react';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {BoldText, MediumText} from './Text';
import {COLORS, hp} from '../../utils/utils';

interface Props {
  title: string;
  testID?: string;
  mainStyle?: ViewStyle;
  contentStyle?: TextStyle;
  content: string | number;
}

const ListText = (props: Props) => {
  const {title, content, testID, contentStyle, mainStyle} = props;

  return (
    <View style={[styles.mainStyle, mainStyle]}>
      <BoldText title={title} customStyle={styles.titleStyle} />
      <MediumText
        testID={testID}
        title={content}
        customStyle={{...styles.contentStyle, ...contentStyle}}
      />
    </View>
  );
};

export default ListText;

const styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  titleStyle: {
    color: COLORS.Black,
    backgroundColor: COLORS.OffWhite,
    padding: hp(2),
    marginBottom: hp(1),
    marginRight: hp(5),
    alignSelf: 'center',
    minWidth: hp(65),
  },
  contentStyle: {
    color: COLORS.Black,
    maxWidth: hp(150),
    flexWrap: 'wrap',
  },
});
