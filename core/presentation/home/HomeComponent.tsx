import {ScrollView, Text, TouchableHighlight, View} from 'react-native';
import {EntriesListComponent} from './components/EntriesListComponent';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getEntryCategories} from '../../state_manager/home/actions';
import {OverlayComponent} from './components/overlays/OverlayComponent';
import {editFilterField, setOverlayData} from '../../state_manager/home/slice';
import {FONT_POPPINS} from '../shared/utilities/constants/fonts.constants';
import {
  selectEntriesCategories,
  selectUserProfile,
} from '../../state_manager/home/selectors';
import EditProfileSvg from '../assets/images/edit_profile.svg';
import CreateEntrySvg from '../assets/images/add_entry_icon.svg';
import ChevronDownSvg from '../assets/images/chevron_down.svg';
import {IPeriod} from '../shared/interfaces';

export const HomeComponent = () => {
  /**
   * hooks
   */
  const dispatch = useDispatch();

  /**
   * selectors
   */
  const userProfile = useSelector(selectUserProfile);

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
          <TouchableHighlight
            underlayColor={''}
            onPress={() =>
              dispatch<any>(
                setOverlayData({overlayData: {scope: 'updateProfile'}}),
              )
            }>
            <EditProfileSvg width={36} height={36} />
          </TouchableHighlight>
          <Text
            style={{
              fontFamily: FONT_POPPINS.bold,
              color: 'black',
              alignSelf: 'center',
              fontSize: 24,
              marginTop: 24,
            }}>
            Hello {userProfile?.username}!
          </Text>
        </View>
        <View style={{display: 'flex'}}>
          <EntryPeriodFilterComponent />
          <EntryFiltersListComponent />
        </View>
      </View>
      <View
        style={{
          flex: 2,
          overflow: 'scroll',
          height: '100%',
        }}>
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
        bottom: 12,
        right: '42%',
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
   * hooks
   */
  const dispatch = useDispatch();

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
    dispatch<any>(
      editFilterField({
        filterField: 'category',
        filterFieldValue: _activeCategory,
      }),
    );
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
   * hooks
   */
  const dispatch = useDispatch();

  /**
   * states
   */
  const [activePeriod, setActivePeriod] = useState('all');
  const [showActivePeriodPicker, setShowActivePeriodPicker] = useState(false);
  const availablePeriods = ['daily', 'weekly', 'monthly', 'all'];

  /**
   * handler methods
   */
  const onPeriodSelected = (period: IPeriod) => {
    setShowActivePeriodPicker(false);
    setActivePeriod(period);
    dispatch<any>(
      editFilterField({
        filterField: 'period',
        filterFieldValue: period,
      }),
    );
  };

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
      <TouchableHighlight
        underlayColor={''}
        onPress={() => setShowActivePeriodPicker(!showActivePeriodPicker)}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            columnGap: 8,
            borderBottomColor: '#ddd',
            borderBottomWidth: 1,
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'black',
              fontFamily: FONT_POPPINS.regular,
              textTransform: 'capitalize',
              fontSize: 12,
            }}>
            {activePeriod}
          </Text>
          <ChevronDownSvg />
        </View>
      </TouchableHighlight>
      {showActivePeriodPicker && (
        <View
          style={{
            position: 'absolute',
            top: '100%',
            backgroundColor: 'white',
            elevation: 7,
            zIndex: 3,
            width: '100%',
            padding: 12,
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            rowGap: 12,
          }}>
          {availablePeriods
            .filter(period => period !== activePeriod)
            .map((period, index) => (
              <TouchableHighlight
                key={index}
                underlayColor={''}
                onPress={() => onPeriodSelected(period)}>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: FONT_POPPINS.bold,
                    textTransform: 'capitalize',
                  }}>
                  {period}
                </Text>
              </TouchableHighlight>
            ))}
        </View>
      )}
    </View>
  );
};
