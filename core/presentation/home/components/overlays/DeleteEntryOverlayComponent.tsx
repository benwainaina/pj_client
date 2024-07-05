import {Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectEntryFromEntries} from '../../../../state_manager/home/selectors';
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
    <View
      style={{
        backgroundColor: 'white',
        position: 'absolute',
        width: '100%',
        alignSelf: 'center',
        padding: 12,
        bottom: 0,
      }}>
      <View style={{rowGap: 12}}>
        <Text
          style={{color: 'black', fontSize: 20, fontFamily: FONT_POPPINS.bold}}>
          {payload.title}
        </Text>
        <Text style={{color: 'black', fontFamily: FONT_POPPINS.regular}}>
          This entry will be deleted. To continue, click confirm.
        </Text>
      </View>

      <ButtonComponent
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
