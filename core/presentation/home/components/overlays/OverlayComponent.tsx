import React from 'react';
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectOverlayData} from '../../../../state_manager/home/selectors';
import {DeleteEntryOverlayComponent} from './DeleteEntryOverlayComponent';
import {clearOverlayData} from '../../../../state_manager/home/slice';
import {CreateOrUpdateEntryOverlayComponent} from './CreateOrUpdateEntryOverlayComponent';
import {EditProfileOverlayComponent} from './EditProfileOverlayComponent';

export const OverlayComponent = () => {
  /**
   * selectors
   */
  const overlayData = useSelector(selectOverlayData);
  const dispatch = useDispatch();

  /**
   * common methods
   */
  const componentToRender = () => {
    switch (overlayData?.scope) {
      case 'delete':
        return <DeleteEntryOverlayComponent payload={overlayData.payload} />;
      case 'create':
      case 'edit':
        return (
          <CreateOrUpdateEntryOverlayComponent entry={overlayData.payload} />
        );
      case 'updateProfile':
        return <EditProfileOverlayComponent />;
      default:
        return <></>;
    }
  };

  return (
    <View
      style={{
        ...STYLES.containerOne,
        display: overlayData?.scope ? 'flex' : 'none',
      }}>
      <View style={STYLES.containerTwo}>
        <TouchableHighlight
          underlayColor={''}
          onPress={() => dispatch(clearOverlayData({}))}
          style={STYLES.touchableOne}>
          <></>
        </TouchableHighlight>
        {componentToRender()}
      </View>
    </View>
  );
};

const STYLES = StyleSheet.create({
  containerOne: {width: '100%', height: '100%', position: 'absolute'},
  containerTwo: {width: '100%', display: 'flex', height: '100%', zIndex: 12},
  touchableOne: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
});
