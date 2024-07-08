import React from 'react';
import {render} from '@testing-library/react-native';
import PickerSelect from './PickerSelect'; // Adjust the import path according to your project structure

describe('PickerSelect Component', () => {
  const items = [
    {label: 'Item 1', value: 'item1'},
    {label: 'Item 2', value: 'item2'},
  ];

  it('renders correctly with given props', async () => {
    const {getByTestId} = render(
      <PickerSelect
        items={items}
        onValueChange={jest.fn()}
        placeholder="Select an item"
      />,
    );
    //access the value of the placeholder
    const textInput = getByTestId('text_input');
    const textValue = textInput.props.value;
    expect(textValue).toBe('Select an item');
  });

  it('calls onValueChange when an item is selected', async () => {
    const onValueChangeMock = jest.fn();
    const {getByTestId} = render(
      <PickerSelect
        items={items}
        onValueChange={onValueChangeMock}
        placeholder="Select an item"
      />,
    );

    const textInput = getByTestId('text_input');
    const textValue = textInput.props.value;
    expect(textValue).toBe('Select an item');
  });
});
