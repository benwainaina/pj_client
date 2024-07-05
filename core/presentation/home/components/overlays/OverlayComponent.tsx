import {TouchableHighlight, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectOverlayData} from '../../../../state_manager/home/selectors';
import {DeleteEntryOverlayComponent} from './DeleteEntryOverlayComponent';
import {clearOverlayData} from '../../../../state_manager/home/slice';
import {CreateEntryOverlayComponent} from './CreateEntryOverlayComponent';
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
        return <CreateEntryOverlayComponent />;
      case 'updateProfile':
        return <EditProfileOverlayComponent />;
      default:
        return <></>;
    }
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        display: overlayData?.scope ? 'flex' : 'none',
      }}>
      <View
        style={{
          width: '100%',
          display: 'flex',
          height: '100%',
          zIndex: 12,
        }}>
        <TouchableHighlight
          underlayColor={''}
          onPress={() => dispatch(clearOverlayData())}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.25)',
          }}>
          <></>
        </TouchableHighlight>
        {componentToRender()}
      </View>
    </View>
  );
};
