import React from 'react';
import {useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {LoadingComponent} from './components/LoadingComponent';
import {
  selectIsValidatingToken,
  selectUserTokenValidity,
} from '../../state_manager/shared/selectors';
import {AuthComponent} from '../auth/AuthComponent';
import {HomeComponent} from '../home/HomeComponent';

const Stack = createNativeStackNavigator();

export const AppRoutes = () => {
  /**
   * selectors
   */
  const isValidatingToken = useSelector(selectIsValidatingToken);
  const tokenIsValid = useSelector(selectUserTokenValidity);

  return isValidatingToken || tokenIsValid === undefined ? (
    <LoadingComponent message={'Getting ready...'} />
  ) : (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {tokenIsValid ? (
        <Stack.Group>
          <Stack.Screen name="home" component={HomeComponent} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="auth" component={AuthComponent} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};
