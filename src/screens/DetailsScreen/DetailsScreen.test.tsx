import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import DetailScreen from './DetailScreen';
import {LEFT_BUTTON_TEST_ID} from '../../utils/utils';
import useDetail from '../../hooks/useDetail';

// Mocking the useDetail hook
jest.mock('../../hooks/useDetail', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    numOfEpisodes: 3,
    firstEpisode: 'Episode 1',
    lastEpisode: 'Episode 3',
    customStyle: {backgroundColor: 'blue'},
    originName: 'Earth',
    imageStyle: {width: 100, height: 100},
    species: 'Human',
    status: 'Alive',
    gender: 'Male',
    goBack: jest.fn(),
    image: 'https://example.com/image.jpg',
    name: 'John Doe',
  })),
}));

describe('DetailScreen Component', () => {
  it('renders Header and BasicListItem with correct props', () => {
    const {getByText} = render(<DetailScreen />);

    expect(getByText('CHARACTER DETAIL')).toBeTruthy();

    // Assert BasicListItem rendering with correct props
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('Alive')).toBeTruthy();
    expect(getByText('Male')).toBeTruthy();
    expect(getByText('Human')).toBeTruthy();
    expect(getByText('Earth')).toBeTruthy();
    expect(getByText('Episode 1')).toBeTruthy();
    expect(getByText('Episode 3')).toBeTruthy();
  });

  it('Call the goBack function when the goBack btn is pressed', () => {
    const mockOnGoBack = jest.fn();
    (useDetail as jest.Mock).mockReturnValue({
      numOfEpisodes: 3,
      firstEpisode: 'Episode 1',
      lastEpisode: 'Episode 3',
      customStyle: {backgroundColor: 'blue'},
      originName: 'Earth',
      imageStyle: {width: 100, height: 100},
      species: 'Human',
      status: 'Alive',
      gender: 'Male',
      goBack: mockOnGoBack,
      image: 'https://example.com/image.jpg',
      name: 'John Doe',
    });

    const {getByTestId} = render(<DetailScreen />);

    const leftBtn = getByTestId(LEFT_BUTTON_TEST_ID);
    fireEvent.press(leftBtn);
    expect(mockOnGoBack).toHaveBeenCalled();
  });
});
