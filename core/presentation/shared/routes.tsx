import {useDispatch, useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useState} from 'react';
import {LoadingComponent} from './components/LoadingComponent';
import {
  selectIsValidatingToken,
  selectUserTokenValidity,
} from '../../state_manager/shared/selectors';
import {AuthComponent} from '../auth/AuthComponent';
import {HomeComponent} from '../home/HomeComponent';
import {useNavigation} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export const AppRoutes = () => {
  /**
   * hooks
   */
  const dispatch = useDispatch();
  const navigation = useNavigation();

  /**
   * selectors
   */
  const isValidatingToken = useSelector(selectIsValidatingToken);
  const tokenIsValid = useSelector(selectUserTokenValidity);

  /**
   * states
   */
  const [resolvingRoute, setResolvingRoute] = useState<boolean>(true);

  return isValidatingToken || tokenIsValid === undefined ? (
    <LoadingComponent message={'Getting ready...'} />
  ) : (
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
