import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {FONT_POPPINS} from '../utilities/constants/fonts.constants';

export const TextInputComponent = ({
  placeholder,
  onNewValue,
  isSecure,
  defaultValue,
}: {
  placeholder: string;
  onNewValue: any;
  isSecure: boolean;
  defaultValue?: string;
}) => {
  return (
    <TextInput
      secureTextEntry={isSecure}
      placeholderTextColor={'black'}
      style={STYLES.wrapper}
      placeholder={placeholder}
      onChangeText={value => onNewValue(value)}
      value={defaultValue}
    />
  );
};

const STYLES = StyleSheet.create({
  wrapper: {
    fontFamily: FONT_POPPINS.regular,
    borderColor: '#ddd',
    borderWidth: 1,
    width: '100%',
    color: 'black',
    paddingLeft: 12,
    paddingVertical: 8,
    borderRadius: 4,
    fontSize: 12,
  },
});
