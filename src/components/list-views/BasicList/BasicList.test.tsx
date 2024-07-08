import React from 'react';
import {render} from '@testing-library/react-native';
import BasicList from './BasicList';
import {Character} from '../../../types';
import {Text} from 'react-native';

// Mock data for testing
const mockData: Character[] = [
  {
    id: '1',
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: {name: 'Earth (C-137)'},
    episode: [{name: 'Pilot'}],
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  },
  {
    id: '2',
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: {name: 'Earth (C-137)'},
    episode: [{name: 'Pilot'}],
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  },
];

describe('BasicList', () => {
  it('renders correctly with mock data', () => {
    const renderItem = ({item}: {item: Character}) => (
      <Text testID={`character-${item.id}`}>{item.name}</Text>
    );

    const {getByTestId, queryByTestId} = render(
      <BasicList
        data={mockData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onEndReached={() => {}}
      />,
    );

    // Check if all characters are rendered
    mockData.forEach(character => {
      expect(getByTestId(`character-${character.id}`)).toBeTruthy();
    });

    // Check for the empty list component
    expect(queryByTestId('emptyText')).toBeNull();
  });
});
