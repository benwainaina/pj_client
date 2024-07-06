import React from 'react';
import {View} from 'react-native';
import {FONT_POPPINS} from '../../shared/utilities/constants/fonts.constants';
import {ButtonComponent} from '../../shared/components/ButtonComponent';
import {useDispatch} from 'react-redux';
import {setOverlayData} from '../../../state_manager/home/slice';

export const DeleteEntryComponent = ({
  entryId,
  title,
}: {
  entryId: string;
  title: string;
}) => {
  /**
   * hooks
   */
  const dispatch = useDispatch();

  /**
   * methods
   */
  const onDeletePress = () => {
    dispatch(
      setOverlayData({
        overlayData: {
          scope: 'delete',
          payload: {entryId, title},
        },
      }),
    );
  };

  return (
    <View>
      <ButtonComponent
        title="delete"
        disabled={false}
        onPress={() => onDeletePress()}
        style={{
          text: {
            color: 'red',
            textTransform: 'capitalize',
            fontFamily: FONT_POPPINS.regular,
            fontSize: 12,
          },
          button: {
            backgroundColor: 'white',
          },
        }}
      />
    </View>
  );
};
