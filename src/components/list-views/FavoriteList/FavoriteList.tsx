import React from 'react';
import BasicList from '../BasicList/BasicList';
import {Character} from '../../../types';
import {FavoriteItem} from '../../list-items';
import {FAV_LIST_TEST_ID} from '../../../utils/utils';

type Props = {
  data: Character[];
  onPress: (e: Character) => void;
};

const FavoriteList = (props: Props) => {
  const {data, onPress} = props;
  return (
    <BasicList
      data={data}
      testID={FAV_LIST_TEST_ID}
      renderItem={({item}) => (
        <FavoriteItem {...item} onPress={() => onPress(item)} />
      )}
      keyExtractor={(item, index) => item.id.toString() + index.toString()}
    />
  );
};

export default FavoriteList;
