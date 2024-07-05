import {TouchableHighlight, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectOverlayData} from '../../../../state_manager/home/selectors';
import {DeleteEntryOverlayComponent} from './DeleteEntryOverlayComponent';
import {clearOverlayData} from '../../../../state_manager/home/slice';
import {CreateEntryOverlayComponent} from './CreateEntryOverlayComponent';

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
        backgroundColor: 'rgba(0,0,0,0.25)',
        display: overlayData?.scope ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableHighlight
        underlayColor={''}
        onPress={() => dispatch(clearOverlayData())}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}>
        <></>
      </TouchableHighlight>
      <View
        style={{
          zIndex: 1,
          width: '90%',
          display: 'flex',
        }}>
        {componentToRender()}
      </View>
    </View>
  );
};
