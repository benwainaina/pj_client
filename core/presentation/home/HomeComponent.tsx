import {Button, ScrollView, Text, TouchableHighlight, View} from 'react-native';
import {EntriesListComponent} from './components/EntriesFilterComponent';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getEntryCategories} from '../../state_manager/home/actions';
import {OverlayComponent} from './components/overlays/OverlayComponent';
import {setOverlayData} from '../../state_manager/home/slice';
import {FONT_POPPINS} from '../shared/utilities/constants/fonts.constants';
import {
  selectEntriesCategories,
  selectEntriesFilters,
} from '../../state_manager/home/selectors';
import {ButtonComponent} from '../shared/components/ButtonComponent';
import EditProfileSvg from '../assets/images/edit_profile.svg';
import CreateEntrySvg from '../assets/images/add_entry_icon.svg';

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
      <View
        style={{
          flex: 1,
          display: 'flex',
          paddingHorizontal: 16,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            display: 'flex',
            paddingTop: 12,
            justifyContent: 'space-between',
          }}>
          <EditProfileSvg width={36} height={36} />
          <Text
            style={{
              fontFamily: FONT_POPPINS.bold,
              color: 'black',
              alignSelf: 'center',
              fontSize: 24,
              marginTop: 24,
            }}>
            Hello benson!
          </Text>
        </View>
        <View style={{display: 'flex'}}>
          <EntryPeriodFilterComponent />
          <EntryFiltersListComponent />
        </View>
      </View>
      <View style={{flex: 2, overflow: 'scroll'}}>
        <ScrollView>
          <EntriesListComponent />
        </ScrollView>
      </View>
      <OverlayComponent />
      <AddEntryButtonComponent />
    </View>
  );
};

const AddEntryButtonComponent = () => {
  /**
   * hooks
   */
  const dispatch = useDispatch();

  /**
   * handler methods
   */
  const createEntry = () => {
    dispatch<any>(setOverlayData({overlayData: {scope: 'create'}}));
  };

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 24,
        right: 24,
        borderRadius: 50,
        zIndex: 10,
        backgroundColor: 'white',
        elevation: 12,
      }}>
      <TouchableHighlight
        underlayColor={''}
        onPress={() => createEntry()}
        style={{padding: 12}}>
        <Text style={{color: 'black', fontFamily: FONT_POPPINS.bold}}>
          <CreateEntrySvg />
        </Text>
      </TouchableHighlight>
    </View>
  );
};

const EntryFiltersListComponent = () => {
  /**
   * states
   */
  const [activeCategory, setActiveCategory] = useState('all');

  /**
   * selectors
   */
  const entryCategories = useSelector(selectEntriesCategories);

  /**
   * handlers
   */
  const onActiveCategorySet = (_activeCategory: string) => {
    setActiveCategory(_activeCategory);
  };

  return (
    <View style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
      <ScrollView horizontal={true}>
        <TouchableHighlight
          underlayColor={''}
          style={{
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderColor: '#ddd',
            borderWidth: 1,
            borderRadius: 6,
            marginRight: 12,
            backgroundColor: activeCategory === 'all' ? 'black' : 'white',
          }}
          onPress={() => onActiveCategorySet('all')}>
          <Text
            style={{
              color: activeCategory === 'all' ? 'white' : 'black',
              fontFamily: FONT_POPPINS.bold,
              textTransform: 'capitalize',
            }}>
            all
          </Text>
        </TouchableHighlight>
        {entryCategories.map(category => (
          <TouchableHighlight
            key={category.uuid}
            underlayColor={''}
            style={{
              paddingVertical: 6,
              paddingHorizontal: 12,
              borderColor: '#ddd',
              borderWidth: 1,
              borderRadius: 6,
              marginRight: 12,
              backgroundColor:
                activeCategory === category.uuid ? 'black' : 'white',
            }}
            onPress={() => onActiveCategorySet(category.uuid)}>
            <Text
              style={{
                color: activeCategory === category.uuid ? 'white' : 'black',
                fontFamily: FONT_POPPINS.bold,
                textTransform: 'capitalize',
              }}>
              {category.name}
            </Text>
          </TouchableHighlight>
        ))}
      </ScrollView>
    </View>
  );
};

const EntryPeriodFilterComponent = () => {
  /**
   * states
   */
  const [activePeriod, setActivePeriod] = useState('every day');
  const [showActivePeriodPicker, setShowActivePeriodPicker] = useState(false);
  const availablePeriods = ['daily', 'weekly', 'monthly'];

  return (
    <View
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        maxWidth: 230,
        marginBottom: 24,
        alignItems: 'center',
        columnGap: 16,
      }}>
      <Text
        style={{
          color: 'black',
          fontFamily: FONT_POPPINS.bold,
        }}>
        Period
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          columnGap: 8,
          borderBottomColor: '#ddd',
          borderBottomWidth: 1,
        }}>
        <ButtonComponent
          title={activePeriod}
          onPress={() => {}}
          style={{
            button: {
              borderColor: 'white',
              borderWidth: 2,
              width: 'auto',
              backgroundColor: 'white',
            },
            text: {
              color: 'black',
              fontFamily: FONT_POPPINS.regular,
              textTransform: 'capitalize',
              fontSize: 12,
            },
          }}
        />
        <View></View>
      </View>
      {showActivePeriodPicker && (
        <View>
          {availablePeriods
            .filter(period => period !== activePeriod)
            .map((period, index) => (
              <TouchableHighlight
                key={index}
                underlayColor={''}
                onPress={() => {
                  console.log('period', period);
                }}></TouchableHighlight>
            ))}
        </View>
      )}
    </View>
  );
};
