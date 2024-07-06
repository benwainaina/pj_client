import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectAlertData} from '../../../state_manager/shared/selectors';
import {StyleSheet, Text, View} from 'react-native';
import {FONT_POPPINS} from '../utilities/constants/fonts.constants';
import {useEffect, useState} from 'react';
import {clearAlertData} from '../../../state_manager/shared/slice';

export const AlertComponent = () => {
  /**
   * hooks
   */
  const dispatch = useDispatch();

  /**
   * states
   */
  const [showAlert, setShowAlert] = useState(false);

  /**
   * selectors
   */
  const alertData = useSelector(selectAlertData);

  /**
   * effects
   */
  useEffect(() => {
    dispatch<any>(clearAlertData({}));
  }, [dispatch]);

  useEffect(() => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, alertData?.duration || 1000);
  }, [alertData]);

  return (
    <View
      style={{
        ...STYLES.containerOne,
        display: alertData && showAlert ? 'flex' : 'none',
        backgroundColor: alertData?.type === 'error' ? 'red' : 'green',
      }}>
      <Text style={STYLES.textOne}>{alertData?.message}</Text>
    </View>
  );
};

const STYLES = StyleSheet.create({
  containerOne: {
    width: '90%',
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    padding: 12,
    borderRadius: 6,
  },
  textOne: {fontFamily: FONT_POPPINS.bold, textAlign: 'center', fontSize: 12},
});
