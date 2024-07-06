import {Text, TouchableHighlight} from 'react-native';

export const ButtonComponent = ({
  title,
  disabled,
  style,
  onPress,
}: {
  title: string;
  disabled: boolean;
  style: {button: {[style: string]: any}; text: {[style: string]: any}};
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
