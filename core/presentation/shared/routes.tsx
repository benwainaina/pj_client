import {useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {LoadingComponent} from './LoadingComponent';
import {
  selectIsValidatingToken,
  selectUserTokenValidity,
} from '../../state_manager/shared/selectors';
import {AuthComponent} from '../auth/AuthComponent';
import {HomeComponent} from '../home/HomeComponent';

const Stack = createNativeStackNavigator();

export const AppRoutes = () => {
  /**
   * hooks
   */
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

  /**
   * constants
   */

  /**
   * effects
   */
  useEffect(() => {
    console.log('initialized');
  }, []);

  return isValidatingToken ? (
    <LoadingComponent message={'Loading'} />
  ) : (
    // <View>
    //   <Text>Lorem!</Text>
    // </View>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="auth" component={AuthComponent}></Stack.Screen>
      {/* {tokenIsValid ? (
        <Stack.Group>
          <Stack.Screen name="home" component={HomeComponent}></Stack.Screen>
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="auth" component={AuthComponent}></Stack.Screen>
        </Stack.Group>
      )} */}
    </Stack.Navigator>
  );
};
