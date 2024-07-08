import React from 'react';
import {Header} from '../../components/ui';
import {FavoriteList} from '../../components/list-views';
import {useFavorite} from '../../hooks';

const FavoriteScreen = () => {
  const {favoriteList, goBack, onPress} = useFavorite();

  return (
    <>
      <Header
        leftButton={{
          onclick: () => goBack(),
        }}
        customMiddleIcon
        title="FAVORITE CHARACTERS"
      />
      <FavoriteList data={favoriteList} onPress={onPress} />
    </>
  );
};

export default FavoriteScreen;
