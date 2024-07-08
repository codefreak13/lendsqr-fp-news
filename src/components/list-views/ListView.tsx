import React from 'react';
import BasicList from './BasicList/BasicList';
import {ListItem} from '../../components/list-items';
import {Character, VIEW_TYPE} from '../../types';
import {CHARACTERS_LIST_TEST_ID} from '../../utils/utils';

type Props = {
  data: Character[];
  viewType: string;
  loadMore: () => void;
  onPress: (item: Character) => void;
  addToFavorite: (item: Character) => void;
};

const ListView = (props: Props) => {
  const {data, viewType, loadMore, onPress, addToFavorite} = props;
  return (
    <BasicList
      data={data}
      onEndReached={loadMore}
      testID={CHARACTERS_LIST_TEST_ID}
      onEndReachedThreshold={25}
      keyValue={viewType === VIEW_TYPE.grid ? 1 : 0}
      numColumns={viewType === VIEW_TYPE.grid ? 2 : 0}
      keyExtractor={(item, index) => item.id.toString() + index.toString()}
      renderItem={({item}) => (
        <ListItem
          {...item}
          viewType={viewType}
          onPress={() => onPress(item)}
          addToFavorite={() => addToFavorite(item)}
        />
      )}
    />
  );
};

export default ListView;
