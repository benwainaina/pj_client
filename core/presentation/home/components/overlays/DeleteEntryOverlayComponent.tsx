import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {ButtonComponent} from '../../../shared/components/ButtonComponent';
import {FONT_POPPINS} from '../../../shared/utilities/constants/fonts.constants';
import {deleteUserEntry} from '../../../../state_manager/home/actions';

export const DeleteEntryOverlayComponent = ({
  payload,
}: {
  payload: {title: string; entryId: string};
}) => {
  /**
   * hooks
   */
  const dispatch = useDispatch();

  /**
   * handler methods
   */
  const confirmEntryDeletion = () =>
    dispatch<any>(deleteUserEntry({entryId: payload.entryId}));

  return (
    <View style={STYLES.containerOne}>
      <View style={STYLES.containerTwo}>
        <Text style={STYLES.titleOne}>{payload.title}</Text>
        <Text style={STYLES.titleTwo}>
          This entry will be deleted. To continue, click confirm.
        </Text>
      </View>

      <ButtonComponent
        disabled={false}
        title="confirm"
        style={{
          button: {
            backgroundColor: 'red',
            padding: 12,
            borderRadius: 6,
            alignItems: 'center',
            marginTop: 24,
          },
          text: {
            color: 'white',
            textTransform: 'uppercase',
            fontFamily: FONT_POPPINS.bold,
          },
        }}
        onPress={() => confirmEntryDeletion()}
      />
    </View>
  );
};

const STYLES = StyleSheet.create({
  containerOne: {
    backgroundColor: 'white',
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    padding: 12,
    bottom: 0,
  },
  containerTwo: {rowGap: 12},
  titleOne: {
    color: 'black',
    fontSize: 20,
    fontFamily: FONT_POPPINS.bold,
    textTransform: 'capitalize',
  },
  titleTwo: {color: 'black', fontFamily: FONT_POPPINS.regular},
});
