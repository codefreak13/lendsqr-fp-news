import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import FavoriteItem from './FavoriteItem';
import useListItem from '../../../hooks/useListItem';
import {DELETE_ICON_TEST_ID, LIST_ITEM_TEST_ID} from '../../../utils/utils';
import {ListItemProps} from '../../../types';

// Mock the useListItem hook
jest.mock('../../../hooks/useListItem', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    id: '1',
    name: 'Bruce Sanchez',
    image: 'https://example.com/image.jpg',
    status: 'Alive',
    species: 'Human',
    onPress: jest.fn(),
    addToFavorite: jest.fn(),
    originName: 'Earth',
    firstEpisode: 'Pilot',
    contentStyle: {width: 250},
    deleteFavoriteItem: jest.fn(),
  }),
}));

describe('FavoriteItem Component', () => {
  const mockedOnPress = jest.fn();
  const mockProps: ListItemProps = {
    id: '1',
    name: 'Bruce Sanchez',
    status: 'Alive',
    episode: [{name: 'Pilot'}],
    gender: 'Male',
    species: 'Human',
    image: 'https://example.com/image.jpg',
    origin: {name: 'Earth'},
    viewType: 'list',
    addToFavorite: jest.fn(),
    onPress: mockedOnPress,
  };

  it('renders correctly with provided props', () => {
    const {getByText} = render(<FavoriteItem {...mockProps} />);

    expect(getByText('Bruce Sanchez')).toBeTruthy();
    expect(getByText('Alive')).toBeTruthy();
    expect(getByText('Pilot')).toBeTruthy();
    expect(getByText('Human')).toBeTruthy();
    expect(getByText('Earth')).toBeTruthy();
  });

  it('calls onPress when the item is pressed', () => {
    const onPressMock = jest.fn();
    (useListItem as jest.Mock).mockReturnValue({
      id: '1',
      name: 'Bruce Sanchez',
      image: 'https://imahe.com',
      status: 'alive',
      species: 'alien',
      onPress: onPressMock,
      addToFavorite: jest.fn(),
      originName: 'Earth',
      firstEpisode: 'Pilot',
      deleteFavoriteItem: jest.fn(),
    });
    const {getByTestId} = render(<FavoriteItem {...mockProps} />);
    const listItem = getByTestId(LIST_ITEM_TEST_ID);
    fireEvent.press(listItem);
    expect(onPressMock).toHaveBeenCalled();
  });

  it('calls deleteFavoriteItem when delete action is triggered', () => {
    const deleteFavoriteItemMock = jest.fn();
    (useListItem as jest.Mock).mockReturnValue({
      id: '1',
      name: 'Bruce Sanchez',
      image: 'https://imahe.com',
      status: 'alive',
      species: 'alien',
      onPress: jest.fn(),
      addToFavorite: jest.fn(),
      originName: 'Earth',
      firstEpisode: 'Pilot',
      deleteFavoriteItem: deleteFavoriteItemMock,
    });

    const {getByTestId} = render(<FavoriteItem {...mockProps} />);
    const deleteButton = getByTestId(DELETE_ICON_TEST_ID);
    fireEvent.press(deleteButton);
    expect(deleteFavoriteItemMock).toHaveBeenCalled();
  });
});
