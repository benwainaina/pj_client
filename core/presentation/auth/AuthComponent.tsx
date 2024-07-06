import React from 'react';
import {LoginComponent} from './LoginComponent';
import {SignupComponent} from './SignupComponent';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const AuthStack = createNativeStackNavigator();

export const AuthComponent = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="login" component={LoginComponent} />
      <AuthStack.Screen name="signup" component={SignupComponent} />
    </AuthStack.Navigator>
  );
};
