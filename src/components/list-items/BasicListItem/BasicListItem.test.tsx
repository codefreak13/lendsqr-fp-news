import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import BasicListItem from './BasicListItem';
import {DELETE_ICON_TEST_ID, FAV_ICON_TEST_ID} from '../../../utils/utils';

const mockProps = {
  id: '1',
  name: 'Rick Sanchez',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  status: 'Alive',
  origin: 'Earth (C-137)',
  gender: 'Male',
  species: 'Human',
  episode: 'S01E01',
  onPress: jest.fn(),
  lastEpisode: 'S04E10',
  mainStyle: {},
  numOfEpisodes: 41,
  customStyle: {},
  imageStyle: {},
  contentStyle: {},
  favoriteListIds: ['1'],
  addToFavorite: jest.fn(),
  utilityIconStyle: {},
  deleteFromFavorite: jest.fn(),
};

describe('BasicListItem', () => {
  it('renders correctly', () => {
    const {getByText, getByTestId} = render(<BasicListItem {...mockProps} />);

    expect(getByText('Rick Sanchez')).toBeTruthy();
    expect(getByText('Alive')).toBeTruthy();
    expect(getByText('Earth (C-137)')).toBeTruthy();
    expect(getByText('Human')).toBeTruthy();
    expect(getByText('S01E01')).toBeTruthy();
    expect(getByText('S04E10')).toBeTruthy();
    expect(getByText('41')).toBeTruthy();
    expect(getByTestId(FAV_ICON_TEST_ID)).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const {getByTestId} = render(<BasicListItem {...mockProps} />);
    fireEvent.press(getByTestId(FAV_ICON_TEST_ID));
    expect(mockProps.addToFavorite).toHaveBeenCalled();
  });

  it('displays the correct favorite icon', async () => {
    const {findByTestId} = render(<BasicListItem {...mockProps} />);
    const favIcon = await findByTestId(FAV_ICON_TEST_ID);
    expect(favIcon).toBeTruthy();
  });

  it('calls deleteFromFavorite when delete icon is pressed', async () => {
    const {findByTestId} = render(<BasicListItem {...mockProps} />);
    const deleteIcon = await findByTestId(DELETE_ICON_TEST_ID);
    fireEvent.press(deleteIcon);
    expect(mockProps.deleteFromFavorite).toHaveBeenCalled();
  });
});
