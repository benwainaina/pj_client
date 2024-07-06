import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
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
    dispatch<any>(getEntryCategories());
  }, [dispatch]);

  return (
    <View style={HOME_COMPONENT_STYLES.containerOne}>
      <View style={HOME_COMPONENT_STYLES.containerTwo}>
        <View style={HOME_COMPONENT_STYLES.containerThree}>
          <TouchableHighlight
            underlayColor={''}
            onPress={() =>
              dispatch<any>(
                setOverlayData({overlayData: {scope: 'updateProfile'}}),
              )
            }>
            <EditProfileSvg width={36} height={36} />
          </TouchableHighlight>
          <Text style={HOME_COMPONENT_STYLES.containerFour}>
            Hello {userProfile?.username}!
          </Text>
        </View>
        <View style={HOME_COMPONENT_STYLES.containerFive}>
          <EntryPeriodFilterComponent />
          <EntryFiltersListComponent />
        </View>
      </View>
      <View style={HOME_COMPONENT_STYLES.containerSix}>
        <ScrollView>
          <EntriesListComponent />
        </ScrollView>
      </View>
      <OverlayComponent />
      <AddEntryButtonComponent />
    </View>
  );
};

const HOME_COMPONENT_STYLES = StyleSheet.create({
  containerOne: {
    display: 'flex',
    height: '100%',
    width: '100%',
    backgroundColor: '#fcfcfc',
  },
  containerTwo: {
    flex: 1,
    display: 'flex',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  containerThree: {
    display: 'flex',
    paddingTop: 12,
    justifyContent: 'space-between',
  },
  containerFour: {
    fontFamily: FONT_POPPINS.bold,
    color: 'black',
    alignSelf: 'center',
    fontSize: 24,
    marginTop: 24,
  },
  containerFive: {display: 'flex'},
  containerSix: {flex: 2, overflow: 'scroll', height: '100%'},
});

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
    <View style={ADD_ENTRY_BUTTON_COMPONENT_STYLES.containerOne}>
      <TouchableHighlight
        underlayColor={''}
        onPress={() => createEntry()}
        style={ADD_ENTRY_BUTTON_COMPONENT_STYLES.containerTwo}>
        <CreateEntrySvg />
      </TouchableHighlight>
    </View>
  );
};

const ADD_ENTRY_BUTTON_COMPONENT_STYLES = StyleSheet.create({
  containerOne: {
    position: 'absolute',
    bottom: 12,
    right: '42%',
    borderRadius: 50,
    zIndex: 10,
    backgroundColor: 'white',
    elevation: 12,
  },
  containerTwo: {
    padding: 12,
  },
});

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
    <View style={ENTRY_FILTERS_LIST_COMPONENT_STYLES.containerOne}>
      <ScrollView horizontal={true}>
        <TouchableHighlight
          underlayColor={''}
          style={{
            ...ENTRY_FILTERS_LIST_COMPONENT_STYLES.touchableOne,
            backgroundColor: activeCategory === 'all' ? 'black' : 'white',
          }}
          onPress={() => onActiveCategorySet('all')}>
          <Text
            style={{
              ...ENTRY_FILTERS_LIST_COMPONENT_STYLES.textOne,
              color: activeCategory === 'all' ? 'white' : 'black',
            }}>
            all
          </Text>
        </TouchableHighlight>
        {entryCategories.map(category => (
          <TouchableHighlight
            key={category.uuid}
            underlayColor={''}
            style={{
              ...ENTRY_FILTERS_LIST_COMPONENT_STYLES.touchableTwo,
              backgroundColor:
                activeCategory === category.uuid ? 'black' : 'white',
            }}
            onPress={() => onActiveCategorySet(category.uuid)}>
            <Text
              style={{
                ...ENTRY_FILTERS_LIST_COMPONENT_STYLES.textTwo,
                color: activeCategory === category.uuid ? 'white' : 'black',
              }}>
              {category.name}
            </Text>
          </TouchableHighlight>
        ))}
      </ScrollView>
    </View>
  );
};

const ENTRY_FILTERS_LIST_COMPONENT_STYLES = StyleSheet.create({
  containerOne: {display: 'flex', flexDirection: 'row', width: '100%'},
  touchableOne: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
    marginRight: 12,
  },
  touchableTwo: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
    marginRight: 12,
  },
  textOne: {
    fontFamily: FONT_POPPINS.bold,
    textTransform: 'capitalize',
  },
  textTwo: {fontFamily: FONT_POPPINS.bold, textTransform: 'capitalize'},
});

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
    <View style={ENTRY_PERIOD_FILTER_COMPONENT_STYLES.containerOne}>
      <TouchableHighlight
        underlayColor={''}
        onPress={() => setShowActivePeriodPicker(!showActivePeriodPicker)}>
        <View style={ENTRY_PERIOD_FILTER_COMPONENT_STYLES.containerTwo}>
          <Text style={ENTRY_PERIOD_FILTER_COMPONENT_STYLES.textOne}>
            {activePeriod}
          </Text>
          <ChevronDownSvg />
        </View>
      </TouchableHighlight>
      {showActivePeriodPicker && (
        <View style={ENTRY_PERIOD_FILTER_COMPONENT_STYLES.containerThree}>
          {availablePeriods
            .filter(period => period !== activePeriod)
            .map((period, index) => (
              <TouchableHighlight
                key={index}
                underlayColor={''}
                onPress={() => onPeriodSelected(period)}>
                <Text style={ENTRY_PERIOD_FILTER_COMPONENT_STYLES.textTwo}>
                  {period}
                </Text>
              </TouchableHighlight>
            ))}
        </View>
      )}
    </View>
  );
};

const ENTRY_PERIOD_FILTER_COMPONENT_STYLES = StyleSheet.create({
  containerOne: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    maxWidth: 230,
    marginBottom: 24,
    alignItems: 'center',
    columnGap: 16,
  },
  containerTwo: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 8,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  containerThree: {
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
  },
  textOne: {
    color: 'black',
    fontFamily: FONT_POPPINS.regular,
    textTransform: 'capitalize',
    fontSize: 12,
  },
  textTwo: {
    color: 'black',
    fontFamily: FONT_POPPINS.bold,
    textTransform: 'capitalize',
  },
});
