import {useState} from 'react';
import {Text, View} from 'react-native';
import {LoginComponent} from './LoginComponent';
import {SignupComponent} from './SignupComponent';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

type TActiveView = 'login' | 'signup';

const AuthStack = createNativeStackNavigator();

export const AuthComponent = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen
        name="signup"
        component={SignupComponent}></AuthStack.Screen>
      <AuthStack.Screen
        name="login"
        component={LoginComponent}></AuthStack.Screen>
    </AuthStack.Navigator>
  );
};
