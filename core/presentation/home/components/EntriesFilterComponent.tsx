import {useEffect} from 'react';
import {Text, View} from 'react-native';
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
  }, [filters]);

  return (
    <View
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        padding: 12,
        position: 'relative',
      }}>
      {entries?.length ? (
        <EntriesPresentComponent entries={entries} />
      ) : (
        <NoEntriesPresentComponent />
      )}
    </View>
  );
};

const NoEntriesPresentComponent = () => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32,
      }}>
      <Text
        style={{
          color: 'black',
          fontFamily: FONT_POPPINS.bold,
          fontSize: 16,
          width: '80%',
          textAlign: 'center',
        }}>
        You have not journalled anything here yet!
      </Text>
    </View>
  );
};

const EntriesPresentComponent = ({entries}: {entries: Array<IEntry>}) => {
  /**
   * selectors
   */
  const categories = useSelector(selectKVEntriesCategories);

  return (
    <View
      style={{
        paddingTop: 24,
        rowGap: 24,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
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

const EntryComponent = ({
  entry,
  categories,
  isLastOfType,
}: {
  entry: IEntry;
  categories: IDynamicObject;
  isLastOfType: boolean;
}) => {
  return (
    <View
      style={{
        width: '90%',
        padding: 12,
        backgroundColor: 'white',
        elevation: 12,
        borderRadius: 12,
        rowGap: 12,
        marginBottom: isLastOfType ? 24 : 0,
      }}>
      <View
        style={{
          flexDirection: 'row',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{color: 'black', fontFamily: FONT_POPPINS.bold}}>
          {entry.title}
        </Text>
        <Text style={{color: 'black', fontFamily: FONT_POPPINS.bold}}>
          {dateFormatterUtility(entry.date, 'dddd DD MMMM YYYY')}
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 'fit-content',
            backgroundColor: 'black',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderTopLeftRadius: 12,
            borderBottomRightRadius: 12,
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: FONT_POPPINS.bold,
              textTransform: 'capitalize',
            }}>
            {categories[entry.category]}
          </Text>
        </View>
        <DeleteEntryComponent entryId={entry.uuid} title={entry.title} />
      </View>
    </View>
  );
};
