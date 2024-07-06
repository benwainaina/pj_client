import React from 'react';
import {LoginComponent} from './LoginComponent';
import {SignupComponent} from './SignupComponent';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, Text, View} from 'react-native';
import {FONT_POPPINS} from '../shared/utilities/constants/fonts.constants';
import LogoSvg from '../assets/images/logo.svg';

const AuthStack = createNativeStackNavigator();

export const AuthComponent = () => {
  return (
    <View style={STYLES.containerOne}>
      <View style={STYLES.containerTwo}>
        <LogoSvg width={48} height={48} />
        <Text style={STYLES.textOne}>Personal Journal</Text>
      </View>
      <View style={STYLES.containerThree}>
        <AuthStack.Navigator screenOptions={{headerShown: false}}>
          <AuthStack.Screen name="login" component={LoginComponent} />
          <AuthStack.Screen name="signup" component={SignupComponent} />
        </AuthStack.Navigator>
      </View>
    </View>
  );
};

const STYLES = StyleSheet.create({
  containerOne: {height: '100%', width: '100%'},
  containerTwo: {
    padding: 24,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 12,
  },
  containerThree: {height: '100%', width: '100%', flex: 2},
  textOne: {
    color: 'black',
    fontFamily: FONT_POPPINS.bold,
    fontSize: 20,
    textAlign: 'center',
  },
});
