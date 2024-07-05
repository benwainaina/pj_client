import {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getUserEntries} from '../../../state_manager/home/actions';
import {
  selectIsFetchingEntries,
  selectKVEntriesCategories,
  selectUserEntries,
} from '../../../state_manager/home/selectors';
import {FONT_POPPINS} from '../../shared/utilities/constants/fonts.constants';
import {IEntry} from '../../../state_manager/home/interfaces';
import {IDynamicObject} from '../../shared/interfaces';
import {DeleteEntryComponent} from './DeleteEntryComponent';

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

  /**
   * effects
   */
  useEffect(() => {
    dispatch<any>(getUserEntries({filters: {}}));
  }, []);

  return (
    <View>
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
      }}>
      <Text
        style={{color: 'black', fontFamily: FONT_POPPINS.bold, fontSize: 16}}>
        You have not journalled anything yet!
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
      {entries.map(entry => (
        <EntryComponent
          key={entry.uuid}
          entry={entry}
          categories={categories}
        />
      ))}
    </View>
  );
};

const EntryComponent = ({
  entry,
  categories,
}: {
  entry: IEntry;
  categories: IDynamicObject;
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
          {entry.date}
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
