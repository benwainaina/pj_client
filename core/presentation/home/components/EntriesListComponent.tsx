import React from 'react';
import {useEffect} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getUserEntries} from '../../../state_manager/home/actions';
import {
  selectEntriesFilters,
  selectIsFetchingEntries,
  selectKVEntriesCategories,
  selectUserEntries,
} from '../../../state_manager/home/selectors';
import {FONT_POPPINS} from '../../shared/utilities/constants/fonts.constants';
import {IEntry} from '../../../state_manager/home/interfaces';
import {IDynamicObject} from '../../shared/interfaces';
import {DeleteEntryComponent} from './DeleteEntryComponent';

import {dateFormatterUtility} from '../../shared/utilities/dateFormatter.utility';
import {setOverlayData} from '../../../state_manager/home/slice';

export const EntriesListComponent = () => {
  /**
   * hooks
   */
  const dispatch = useDispatch();

  /**
   * selectors
   */
  const isFetchingEntries = useSelector(selectIsFetchingEntries);
  const entries = useSelector(selectUserEntries);
  const filters = useSelector(selectEntriesFilters);

  /**
   * effects
   */
  useEffect(() => {
    dispatch<any>(getUserEntries({filters: {}}));
  }, []);

  useEffect(() => {
    dispatch<any>(getUserEntries({filters}));
  }, [filters, dispatch]);

  return (
    <View style={ENTRIES_LIST_COMPONENT_STYLES.containerOne}>
      {entries?.length ? (
        <EntriesPresentComponent entries={entries} />
      ) : (
        <NoEntriesPresentComponent />
      )}
    </View>
  );
};

const ENTRIES_LIST_COMPONENT_STYLES = StyleSheet.create({
  containerOne: {
    display: 'flex',
    height: '100%',
    width: '100%',
    padding: 12,
    position: 'relative',
  },
});

const NoEntriesPresentComponent = () => {
  return (
    <View style={NO_ENTRIES_PRESENT_COMPONENT_STYLES.containerOne}>
      <Text style={NO_ENTRIES_PRESENT_COMPONENT_STYLES.textOne}>
        You have not journalled anything here yet!
      </Text>
    </View>
  );
};

const NO_ENTRIES_PRESENT_COMPONENT_STYLES = StyleSheet.create({
  containerOne: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  textOne: {
    color: 'black',
    fontFamily: FONT_POPPINS.bold,
    fontSize: 16,
    width: '80%',
    textAlign: 'center',
  },
});

const EntriesPresentComponent = ({entries}: {entries: Array<IEntry>}) => {
  /**
   * selectors
   */
  const categories = useSelector(selectKVEntriesCategories);

  return (
    <View style={ENTRIES_PRESENT_COMPONENT_STYLES.containerOne}>
      {entries.map((entry, index) => (
        <EntryComponent
          key={entry.uuid}
          entry={entry}
          categories={categories}
          isLastOfType={index === entries.length - 1}
        />
      ))}
    </View>
  );
};

const ENTRIES_PRESENT_COMPONENT_STYLES = StyleSheet.create({
  containerOne: {
    paddingTop: 24,
    rowGap: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const EntryComponent = ({
  entry,
  categories,
  isLastOfType,
}: {
  entry: IEntry;
  categories: IDynamicObject;
  isLastOfType: boolean;
}) => {
  /**
   * hooks
   */
  const dispatch = useDispatch();

  return (
    <TouchableHighlight
      style={ENTRY_COMPONENT_STYLES.containerOne}
      underlayColor={'white'}
      onPress={() =>
        dispatch<ny>(
          setOverlayData({overlayData: {scope: 'edit', payload: entry}}),
        )
      }>
      <View
        style={{
          ...ENTRY_COMPONENT_STYLES.containerTwo,
          marginBottom: isLastOfType ? 24 : 0,
        }}>
        <View style={ENTRY_COMPONENT_STYLES.containerThree}>
          <Text style={ENTRY_COMPONENT_STYLES.titleOne}>{entry.title}</Text>
          <Text style={ENTRY_COMPONENT_STYLES.titleTwo}>
            {dateFormatterUtility(entry.date, 'dddd DD MMMM YYYY')}
          </Text>
        </View>
        <View style={ENTRY_COMPONENT_STYLES.containerFour}>
          <View style={ENTRY_COMPONENT_STYLES.containerFive}>
            <Text style={ENTRY_COMPONENT_STYLES.titleThree}>
              {categories[entry.category]}
            </Text>
          </View>
          <DeleteEntryComponent entryId={entry.uuid} title={entry.title} />
        </View>
      </View>
    </TouchableHighlight>
  );
};

const ENTRY_COMPONENT_STYLES = StyleSheet.create({
  containerOne: {width: '100%', alignItems: 'center'},
  containerTwo: {
    width: '100%',
    padding: 12,
    backgroundColor: 'white',
    elevation: 12,
    borderRadius: 12,
    rowGap: 24,
  },
  containerThree: {
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'space-between',
  },
  containerFour: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerFive: {
    backgroundColor: 'black',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderTopLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  titleOne: {
    color: 'black',
    fontFamily: FONT_POPPINS.bold,
    textTransform: 'capitalize',
  },
  titleTwo: {
    color: 'black',
    fontFamily: FONT_POPPINS.regular,
    fontSize: 12,
  },
  titleThree: {
    color: 'white',
    fontFamily: FONT_POPPINS.bold,
    textTransform: 'capitalize',
  },
});
