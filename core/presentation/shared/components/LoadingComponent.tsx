import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FONT_POPPINS} from '../utilities/constants/fonts.constants';

export const LoadingComponent = ({message}: {message?: string}) => {
  return (
    <View style={STYLES.containerOne}>
      <Text style={STYLES.textOne}>{message}</Text>
    </View>
  );
};

const STYLES = StyleSheet.create({
  containerOne: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textOne: {
    color: 'black',
    fontSize: 16,
    fontFamily: FONT_POPPINS.regular,
  },
});
