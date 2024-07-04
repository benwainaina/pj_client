import {Text, TouchableHighlight, View} from 'react-native';
import {FONT_POPPINS} from '../shared/utilities/constants/fonts.constants';
import {useState} from 'react';
import {IDynamicObject} from '../shared/interfaces';
import {dismissKeyboardUtility} from '../shared/utilities/keyboard.utility';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserIsLogginIn} from '../../state_manager/auth/selectors';
import {useNavigation} from '@react-navigation/native';
import {TextInputComponent} from '../shared/components/TextInputComponent';
import {ButtonComponent} from '../shared/components/ButtonComponent';
import {actionLoginUser} from '../../state_manager/auth/actions';

export const LoginComponent = () => {
  /**
   * hooks
   */
  const dispatch = useDispatch();
  const navigation = useNavigation();

  /**
   * selectors
   */
  const isLogginInUser = useSelector(selectUserIsLogginIn);

  /**
   * states
   */
  const [userCredentials, setUserCredentials] = useState<IDynamicObject>({
    email: '',
    password: '',
  });
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  /**
   * common methods
   */
  const onFormFieldChange = (
    formFieldControl: string,
    formFieldValue: string,
  ) => {
    const _userCredentials = userCredentials;
    _userCredentials[formFieldControl] = formFieldValue;
    checkIfFormIsValid();
    setUserCredentials(_userCredentials);
  };

  const checkIfFormIsValid = () => {
    let _formIsValid: boolean = true;
    for (const field in userCredentials) {
      if (!userCredentials[field]) {
        _formIsValid = false;
        break;
      }
    }
    setFormIsValid(_formIsValid);
  };

  const onLoginPress = () => {
    dismissKeyboardUtility();
    // TODO: login goes here
    dispatch<any>(actionLoginUser({userCredentials}));
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: 48,
      }}>
      <Text
        style={{fontFamily: FONT_POPPINS.bold, color: 'black', fontSize: 20}}>
        Login
      </Text>
      <View style={{width: '75%', rowGap: 12}}>
        <TextInputComponent
          isSecure={false}
          placeholder="Email"
          onNewValue={value => onFormFieldChange('email', value)}
        />
        <TextInputComponent
          isSecure={true}
          placeholder="Password"
          onNewValue={value => onFormFieldChange('password', value)}
        />
        <ButtonComponent
          title={isLogginInUser ? 'Please wait...' : 'Login'}
          disabled={!formIsValid || isLogginInUser}
          style={{
            button: {
              backgroundColor: 'black',
              padding: 12,
              cursor: 'pointer',
              textAlign: 'center',
              justifyContent: 'center',
              borderRadius: 6,
              opacity: formIsValid && !isLogginInUser ? 1.0 : 0.3,
              marginTop: 12,
            },
            text: {
              color: 'white',
              textTransform: 'uppercase',
              textAlign: 'center',
              fontWeight: 'bold',
            },
          }}
          onPress={() => onLoginPress()}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            columnGap: 4,
            marginTop: 24,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'black',
              fontFamily: FONT_POPPINS.regular,
              fontSize: 12,
            }}>
            Dont have an account yet?
          </Text>
          <TouchableHighlight
            underlayColor={''}
            onPress={() => navigation.navigate('signup')}>
            <Text
              style={{
                color: 'blue',
                fontFamily: FONT_POPPINS.bold,
                fontSize: 12,
                textDecorationLine: 'underline',
              }}>
              Sign Up
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};
