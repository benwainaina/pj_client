import {TouchableHighlight} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectOverlayData} from '../../../../state_manager/home/selectors';
import {DeleteEntryOverlayComponent} from './DeleteEntryOverlayComponent';
import {clearOverlayData} from '../../../../state_manager/home/slice';

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
      default:
        return <></>;
    }
  };

  return (
    <TouchableHighlight
      underlayColor={''}
      onPress={() => dispatch(clearOverlayData())}
      style={{
        display: overlayData?.scope ? 'flex' : 'none',
        backgroundColor: 'rgba(0,0,0,0.25)',
        width: '100%',
        height: '100%',
        position: 'absolute',
      }}>
      {componentToRender()}
    </TouchableHighlight>
  );
};
