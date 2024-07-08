import React from 'react';
import {useListItem} from '../../../hooks';
import {ListItemProps} from '../../../types';
import BasicListItem from '../BasicListItem/BasicListItem';

const ListItem = (props: ListItemProps) => {
  const {
    id,
    name,
    image,
    status,
    species,
    onPress,
    mainStyle,
    originName,
    customStyle,
    firstEpisode,
    contentStyle,
    addToFavorite,
    utilityIconStyle,
    favoriteListIds,
  } = useListItem(props);

  return (
    <BasicListItem
      id={id}
      name={name}
      image={image}
      status={status}
      species={species}
      onPress={onPress}
      origin={originName}
      episode={firstEpisode}
      mainStyle={mainStyle}
      customStyle={customStyle}
      contentStyle={contentStyle}
      addToFavorite={addToFavorite}
      favoriteListIds={favoriteListIds}
      utilityIconStyle={utilityIconStyle}
    />
  );
};

export default ListItem;
