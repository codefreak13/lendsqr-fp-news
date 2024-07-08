import React from 'react';
import {Header} from '../../components/ui';
import {useDetail} from '../../hooks';
import {BasicListItem} from '../../components/list-items';

const DetailScreen = () => {
  const {
    numOfEpisodes,
    firstEpisode,
    lastEpisode,
    customStyle,
    originName,
    imageStyle,
    species,
    status,
    gender,
    goBack,
    image,
    name,
  } = useDetail();

  return (
    <>
      <Header
        leftButton={{
          onclick: () => goBack(),
        }}
        customMiddleIcon
        title="CHARACTER DETAIL"
      />
      <BasicListItem
        name={name}
        image={image}
        status={status}
        gender={gender}
        species={species}
        origin={originName}
        episode={firstEpisode}
        imageStyle={imageStyle}
        lastEpisode={lastEpisode}
        customStyle={customStyle}
        numOfEpisodes={numOfEpisodes}
      />
    </>
  );
};

export default DetailScreen;
