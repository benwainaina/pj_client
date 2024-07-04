import {useDispatch, useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {LoadingComponent} from './components/LoadingComponent';
import {
  selectIsValidatingToken,
  selectUserTokenValidity,
} from '../../state_manager/shared/selectors';
import {AuthComponent} from '../auth/AuthComponent';
import {HomeComponent} from '../home/HomeComponent';
import {actionValidateToken} from '../../state_manager/home/actions';

const Stack = createNativeStackNavigator();

export const AppRoutes = () => {
  /**
   * hooks
   */
  const dispatch = useDispatch();

  /**
   * selectors
   */
  const isValidatingToken = useSelector(selectIsValidatingToken);
  const tokenIsValid = useSelector(selectUserTokenValidity);

  /**
   * states
   */
  const [resolvingRoute, setResolvingRoute] = useState<boolean>(true);

  /**
   * constants
   */

  return isValidatingToken ? (
    <LoadingComponent message={'Getting ready...'} />
  ) : (
    // <View>
    //   <Text>Lorem!</Text>
    // </View>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {tokenIsValid ? (
        <Stack.Group>
          <Stack.Screen name="home" component={HomeComponent}></Stack.Screen>
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="auth" component={AuthComponent}></Stack.Screen>
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};
