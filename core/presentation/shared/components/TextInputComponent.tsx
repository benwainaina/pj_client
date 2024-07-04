import {TextInput} from 'react-native';
import {FONT_POPPINS} from '../utilities/constants/fonts.constants';

export const TextInputComponent = ({
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
