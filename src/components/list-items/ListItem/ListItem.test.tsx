import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ListItem from './ListItem';
import {ListItemProps} from '../../../types';
import useListItem from '../../../hooks/useListItem';
import {FAV_ICON_TEST_ID} from '../../../utils/utils';

// Mock the useListItem hook
jest.mock('../../../hooks/useListItem', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    id: '1',
    name: 'Rick Sanchez',
    image: 'https://example.com/image.jpg',
    status: 'Alive',
    species: 'Human',
    onPress: jest.fn(),
    addToFavorite: jest.fn(),
    originName: 'Earth',
    firstEpisode: 'Pilot',
    deleteFavoriteItem: jest.fn(),
    favoriteListIds: ['1'],
  }),
}));

describe('ListItem', () => {
  const mockProps: ListItemProps = {
    id: '1',
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    status: 'Alive',
    species: 'Human',
    origin: {name: 'Earth (C-137)'},
    episode: [{name: 'Pilot'}],
    viewType: 'list',
    addToFavorite: jest.fn(),
    onPress: jest.fn(),
    gender: 'male',
  };

  it('renders correctly', () => {
    const {getByText} = render(<ListItem {...mockProps} />);

    expect(getByText('Rick Sanchez')).toBeTruthy();
    expect(getByText('Alive')).toBeTruthy();
    expect(getByText('Human')).toBeTruthy();
    expect(getByText('Earth')).toBeTruthy();
    expect(getByText('Pilot')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    (useListItem as jest.Mock).mockReturnValue({
      id: '1',
      name: 'Rick Sanchez',
      image: 'https://example.com/image.jpg',
      status: 'Alive',
      species: 'Human',
      onPress: mockOnPress,
      addToFavorite: jest.fn(),
    });

    const {getByText} = render(<ListItem {...mockProps} />);

    fireEvent.press(getByText('Rick Sanchez'));
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('calls addToFavorite when add to favorite icon is pressed', () => {
    const mockOnAddToFav = jest.fn();
    (useListItem as jest.Mock).mockReturnValue({
      id: '1',
      name: 'Rick Sanchez',
      image: 'https://example.com/image.jpg',
      status: 'Alive',
      species: 'Human',
      onPress: jest.fn(),
      addToFavorite: mockOnAddToFav,
    });
    const {getByTestId} = render(<ListItem {...mockProps} />);

    fireEvent.press(getByTestId(FAV_ICON_TEST_ID));
    expect(mockOnAddToFav).toHaveBeenCalled();
  });
});
