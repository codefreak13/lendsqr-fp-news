import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Button from './Button';
import {Text} from 'react-native';

describe('Button Component', () => {
  it('renders correctly with title', () => {
    const {getByText} = render(<Button title="Click Me" />);

    expect(getByText('Click Me')).toBeTruthy();
  });

  it('renders correctly with children', () => {
    const {getByText} = render(
      <Button>
        <Text>Child Content</Text>
      </Button>,
    );

    expect(getByText('Child Content')).toBeTruthy();
  });

  it('handles onPress event', () => {
    const onPressMock = jest.fn();
    const {getByTestId} = render(
      <Button testID="button" title="Click Me" onPress={onPressMock} />,
    );

    fireEvent.press(getByTestId('button'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('applies custom styles', () => {
    const customStyle = {backgroundColor: 'blue'};
    const textStyle = {color: 'white'};

    const {getByTestId, getByText} = render(
      <Button
        testID="button"
        title="Styled Button"
        customStyle={customStyle}
        textStyle={textStyle}
      />,
    );
    expect(getByTestId('button').props.style).toMatchObject(customStyle);
    expect(getByText('Styled Button').props.style).toContain(textStyle);
  });

  it('is disabled when the disabled prop is true', () => {
    const onPressMock = jest.fn();
    const {getByTestId} = render(
      <Button
        testID="button"
        title="Click Me"
        onPress={onPressMock}
        disabled={true}
      />,
    );

    const button = getByTestId('button');
    fireEvent.press(button);

    expect(onPressMock).not.toHaveBeenCalled();
  });
});
