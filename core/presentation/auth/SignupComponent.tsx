import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {FONT_POPPINS} from '../shared/utilities/constants/fonts.constants';
import {useState} from 'react';
import {IDynamicObject} from '../shared/interfaces';
import {dismissKeyboardUtility} from '../shared/utilities/keyboard.utility';
import {useDispatch, useSelector} from 'react-redux';
import {actionSignupUser} from '../../state_manager/auth/actions';
import {selectUserIsSigningUp} from '../../state_manager/auth/selectors';
import {useNavigation} from '@react-navigation/native';
import {ButtonComponent} from '../shared/components/ButtonComponent';
import {TextInputComponent} from '../shared/components/TextInputComponent';

export const SignupComponent = () => {
  /**
   * hooks
   */
  const dispatch = useDispatch();
  const navigation = useNavigation();

  /**
   * selectors
   */
  const isSigningUpUser = useSelector(selectUserIsSigningUp);

  /**
   * states
   */
  const [userDetails, setUserDetails] = useState<IDynamicObject>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  /**
   * common methods
   */
  const onFormFieldChange = (
    formFieldControl: string,
    formFieldValue: string,
  ) => {
    const _userForm = userDetails;
    _userForm[formFieldControl] = formFieldValue;
    checkIfFormIsValid();
    setUserDetails(_userForm);
  };

  const checkIfFormIsValid = () => {
    let _formIsValid: boolean = true;
    for (const field in userDetails) {
      if (!userDetails[field]) {
        _formIsValid = false;
        break;
      }
    }

    if (userDetails.password !== userDetails.confirmPassword) {
      _formIsValid = false;
    }
    setFormIsValid(_formIsValid);
  };

  const onSignupPress = () => {
    dismissKeyboardUtility();
    dispatch<any>(
      actionSignupUser({
        userDetails: {
          username: userDetails.username,
          email: userDetails.email,
          password: userDetails.password,
        },
      }),
    );
  };

  return (
    <View style={STYLES.containerOne}>
      <Text style={STYLES.titleOne}>Sign Up</Text>
      <View style={STYLES.containerTwo}>
        <TextInputComponent
          isSecure={false}
          placeholder="Username"
          onNewValue={(value: string) => onFormFieldChange('username', value)}
        />
        <TextInputComponent
          isSecure={false}
          placeholder="Email"
          onNewValue={(value: string) => onFormFieldChange('email', value)}
        />
        <TextInputComponent
          isSecure={true}
          placeholder="Password"
          onNewValue={(value: string) => onFormFieldChange('password', value)}
        />
        <TextInputComponent
          isSecure={true}
          placeholder="Password"
          onNewValue={(value: string) =>
            onFormFieldChange('confirmPassword', value)
          }
        />
        <ButtonComponent
          title={isSigningUpUser ? 'Please wait...' : 'Sign Up'}
          disabled={!formIsValid || isSigningUpUser}
          style={{
            button: {
              backgroundColor: 'black',
              padding: 12,
              cursor: 'pointer',
              textAlign: 'center',
              justifyContent: 'center',
              borderRadius: 6,
              opacity: formIsValid && !isSigningUpUser ? 1.0 : 0.3,
              marginTop: 12,
            },
            text: {
              color: 'white',
              textTransform: 'uppercase',
              textAlign: 'center',
              fontWeight: 'bold',
            },
          }}
          onPress={() => onSignupPress()}
        />
        <View style={STYLES.containerThree}>
          <Text style={STYLES.titleThree}>Already a member?</Text>
          <TouchableHighlight
            underlayColor={''}
            onPress={() => navigation.navigate('login')}>
            <Text style={STYLES.titleFour}>Login</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

const STYLES = StyleSheet.create({
  containerOne: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 48,
  },
  titleOne: {fontFamily: FONT_POPPINS.bold, color: 'black', fontSize: 20},
  containerTwo: {width: '75%', rowGap: 12},
  containerThree: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 4,
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleThree: {
    color: 'black',
    fontFamily: FONT_POPPINS.regular,
    fontSize: 12,
  },
  titleFour: {
    color: 'blue',
    fontFamily: FONT_POPPINS.bold,
    fontSize: 12,
    textDecorationLine: 'underline',
  },
});
