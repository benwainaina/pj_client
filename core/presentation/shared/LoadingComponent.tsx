import {Text, View} from 'react-native';
import {FONT_POPPINS} from './utilities/constants/fonts.constants';

export const LoadingComponent = ({message}: {message?: string}) => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          color: 'black',
          fontSize: 16,
          fontFamily: FONT_POPPINS.regular,
        }}>
        {message}
      </Text>
    </View>
  );
};
