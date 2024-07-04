import {
  Button,
  Keyboard,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import {FONT_POPPINS} from '../shared/utilities/constants/fonts.constants';
import {useState} from 'react';
import {IDynamicObject} from '../shared/interfaces';
import {dismissKeyboardUtility} from '../shared/utilities/keyboard.utility';
import {useDispatch, useSelector} from 'react-redux';
import {actionSignupUser} from '../../state_manager/auth/actions';
import {selectUserIsSigningUp} from '../../state_manager/auth/selectors';
import {useNavigation} from '@react-navigation/native';

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
    let formIsValid: boolean = true;
    for (const field in userDetails) {
      if (!userDetails[field]) {
        formIsValid = false;
        break;
      }
    }

    // check that the passwords match
    if (userDetails.password !== userDetails.confirmPassword) {
      formIsValid = false;
    }
    setFormIsValid(formIsValid);
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
        Your Personal Journal
      </Text>
      <View style={{width: '75%', rowGap: 12}}>
        <TextInputComponent
          isSecure={false}
          placeholder="Username"
          onNewValue={value => onFormFieldChange('username', value)}
        />
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
        <TextInputComponent
          isSecure={true}
          placeholder="Password"
          onNewValue={value => onFormFieldChange('confirmPassword', value)}
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
              opacity: formIsValid ? 1.0 : 0.3,
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
            Already a member?
          </Text>
          <TouchableHighlight
            underlayColor={'blue'}
            onPress={() => navigation.navigate('login')}>
            <Text
              style={{
                color: 'blue',
                fontFamily: FONT_POPPINS.bold,
                fontSize: 12,
                textDecorationLine: 'underline',
              }}>
              Login
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

const TextInputComponent = ({
  placeholder,
  onNewValue,
  isSecure,
}: {
  placeholder: string;
  onNewValue: any;
  isSecure: boolean;
}) => {
  return (
    <TextInput
      secureTextEntry={isSecure}
      placeholderTextColor={'black'}
      style={{
        fontFamily: FONT_POPPINS.regular,
        borderColor: '#ddd',
        borderWidth: 1,
        width: '100%',
        color: 'black',
        paddingLeft: 12,
        paddingVertical: 8,
        borderRadius: 4,
        fontSize: 12,
      }}
      placeholder={placeholder}
      onChangeText={value => onNewValue(value)}
    />
  );
};

const ButtonComponent = ({
  title,
  disabled,
  style,
  onPress,
}: {
  title: string;
  disabled: boolean;
  style: {button: {[style: string]: string}; text: {[style: string]: string}};
  onPress: Function;
}) => {
  return (
    <TouchableHighlight
      onPress={() => onPress()}
      disabled={disabled}
      underlayColor={style.button.backgroundColor}
      style={style.button}>
      <Text style={style.text}>{title}</Text>
    </TouchableHighlight>
  );
};
