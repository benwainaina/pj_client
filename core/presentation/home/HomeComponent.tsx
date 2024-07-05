import {View} from 'react-native';
import {EntriesListComponent} from './components/EntriesFilterComponent';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getEntryCategories} from '../../state_manager/home/actions';
import {OverlayComponent} from './components/overlays/OverlayComponent';

export const HomeComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEntryCategories());
  }, []);

  return (
    <View
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        backgroundColor: '#fcfcfc',
      }}>
      {/* TODO: icon for toggling edit profile goes here */}
      {/* TODO: header for filters goes here */}
      <EntriesListComponent />
      <OverlayComponent />
    </View>
  );
};
