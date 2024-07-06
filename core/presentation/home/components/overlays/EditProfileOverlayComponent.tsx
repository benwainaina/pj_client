import React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IDynamicObject} from '../../../shared/interfaces';
import {useDispatch, useSelector} from 'react-redux';
import {
  selctUserIsUpdatingProfile,
  selectUserProfile,
} from '../../../../state_manager/home/selectors';
import {TextInputComponent} from '../../../shared/components/TextInputComponent';
import {ButtonComponent} from '../../../shared/components/ButtonComponent';
import {FONT_POPPINS} from '../../../shared/utilities/constants/fonts.constants';
import {actionUpdateProfile} from '../../../../state_manager/home/actions';

export const EditProfileOverlayComponent = () => {
  /**
   * hooks
   */
  const dispatch = useDispatch();

  /**
   * states
   */
  const [updateProfileForm, setUpdateProfileForm] = useState<IDynamicObject>({
    username: '',
    newPassword: '',
    confirmNewPassword: '',
    currentPassword: '',
  });
  const [formIsValid, setFormIsValid] = useState<boolean>(false);
  const [username, setUsername] = useState('');

  /**
   * selectors
   */
  const userProfile = useSelector(selectUserProfile);
  const isUpdatingProfile = useSelector(selctUserIsUpdatingProfile);

  /**
   * effects
   */
  useEffect(() => {
    const _updateProfileForm = updateProfileForm;
    _updateProfileForm.username = userProfile?.username;
    setUpdateProfileForm(updateProfileForm);
    if (userProfile) {
      setUsername(userProfile.username);
    }
  }, [userProfile, updateProfileForm]);

  /**
   * handlers
   */
  const onFormFieldChange = (formField: string, formFieldValue: string) => {
    const _updateProfileForm = updateProfileForm;
    _updateProfileForm[formField] = formFieldValue;
    validateEntryForm();
  };

  const validateEntryForm = () => {
    let _formIsValid = true;
    // for (const field in updateProfileForm) {
    //   if (!updateProfileForm[field]) {
    //     _formIsValid = false;
    //     break;
    //   }
    // }

    /**
     * the username must be there
     */
    if (!updateProfileForm.username) {
      _formIsValid = false;
    }

    if (
      updateProfileForm.newPassword !== updateProfileForm.confirmNewPassword
    ) {
      _formIsValid = false;
    }

    setFormIsValid(_formIsValid);
  };

  const onUpdateProfile = () => {
    dispatch<any>(actionUpdateProfile({payload: updateProfileForm}));
  };

  return (
    <View style={STYLES.containerOne}>
      <TextInputComponent
        isSecure={false}
        placeholder="Your username"
        defaultValue={username}
        onNewValue={(newValue: string) => {
          onFormFieldChange('username', newValue);
          setUsername(newValue);
        }}
      />
      <TextInputComponent
        isSecure={true}
        placeholder="Your new password"
        onNewValue={(newValue: string) =>
          onFormFieldChange('newPassword', newValue)
        }
      />
      <TextInputComponent
        isSecure={true}
        placeholder="Confirm your new password"
        onNewValue={(newValue: string) =>
          onFormFieldChange('confirmNewPassword', newValue)
        }
      />
      <Text style={STYLES.titleOne}>
        Enter your current password below to continue
      </Text>
      <TextInputComponent
        isSecure={true}
        placeholder="Your current password"
        onNewValue={(newValue: string) =>
          onFormFieldChange('currentPassword', newValue)
        }
      />
      <ButtonComponent
        disabled={!formIsValid || isUpdatingProfile}
        title="Update"
        onPress={() => onUpdateProfile()}
        style={{
          button: {
            backgroundColor: 'black',
            padding: 12,
            borderRadius: 6,
            alignItems: 'center',
            opacity: formIsValid && !isUpdatingProfile ? 1 : 0.25,
          },
          text: {
            color: 'white',
            textTransform: 'uppercase',
            fontFamily: FONT_POPPINS.bold,
          },
        }}
      />
    </View>
  );
};

const STYLES = StyleSheet.create({
  containerOne: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 24,
    zIndex: 12,
    alignSelf: 'center',
    rowGap: 24,
  },
  titleOne: {
    color: 'black',
    fontFamily: FONT_POPPINS.regular,
    fontSize: 12,
  },
});
