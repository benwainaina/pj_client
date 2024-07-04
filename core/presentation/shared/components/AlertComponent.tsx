import {useSelector} from 'react-redux';
import {selectAlertData} from '../../../state_manager/shared/selectors';
import {Text, View} from 'react-native';
import {FONT_POPPINS} from '../utilities/constants/fonts.constants';
import {useEffect, useState} from 'react';

export const AlertComponent = () => {
  /**
   * states
   */
  const [showAlert, setShowAlert] = useState(false);

  /**
   * selectors
   */
  const alertData = useSelector(selectAlertData);

  useEffect(() => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, alertData?.duration || 1000);
  }, [alertData]);

  return (
    <View
      style={{
        display: alertData && showAlert ? 'flex' : 'none',
        backgroundColor: alertData?.type === 'error' ? 'red' : 'green',
        width: '90%',
        position: 'absolute',
        bottom: 12,
        alignSelf: 'center',
        padding: 12,
        borderRadius: 6,
      }}>
      <Text
        style={{
          fontFamily: FONT_POPPINS.bold,
          textAlign: 'center',
          fontSize: 12,
        }}>
        {alertData?.message}
      </Text>
    </View>
  );
};
