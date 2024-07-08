import React from 'react';
import {View, FlatList, StyleSheet, ListRenderItem} from 'react-native';
import {hp} from '../../../utils/utils';
import {Character} from '../../../types';
import {BoldText} from '../../texts';

type Props = {
  data: Character[];
  keyValue?: number;
  testID?: string;
  numColumns?: number;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  renderItem: ListRenderItem<Character>;
  keyExtractor: (item: Character, index: number) => string;
};

const BasicList = (props: Props) => {
  const {
    data,
    keyValue,
    testID,
    renderItem,
    numColumns,
    keyExtractor,
    onEndReached,
    onEndReachedThreshold,
  } = props;
  return (
    <FlatList
      data={data}
      key={keyValue}
      numColumns={numColumns}
      testID={testID}
      style={styles.listStyle}
      onEndReached={onEndReached}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={onEndReachedThreshold}
      ListEmptyComponent={
        <View style={styles.emptyListStyle}>
          <BoldText testID="emptyText" title="No Item" />
        </View>
      }
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  listStyle: {
    flex: 1,
    width: '100%',
  },
  emptyListStyle: {
    marginTop: hp(200),
    alignItems: 'center',
  },
  titleContainerStyle: {
    marginTop: hp(20),
    marginHorizontal: hp(10),
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
  },
});

export default BasicList;
