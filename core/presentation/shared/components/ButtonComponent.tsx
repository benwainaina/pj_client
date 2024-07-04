import {Text, TouchableHighlight} from 'react-native';

export const ButtonComponent = ({
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
