import React from 'react';
import {useListItem} from '../../../hooks';
import {ListItemProps} from '../../../types';
import BasicListItem from '.././BasicListItem/BasicListItem';

const FavoriteItem = (props: ListItemProps) => {
  const {
    name,
    image,
    status,
    species,
    onPress,
    originName,
    firstEpisode,
    contentStyle,
    deleteFavoriteItem,
  } = useListItem(props);

  return (
    <BasicListItem
      name={name}
      status={status}
      episode={firstEpisode}
      species={species}
      image={image}
      origin={originName}
      contentStyle={contentStyle}
      onPress={onPress}
      deleteFromFavorite={deleteFavoriteItem}
    />
  );
};

export default FavoriteItem;
