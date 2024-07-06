import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import {FONT_POPPINS} from '../../../shared/utilities/constants/fonts.constants';
import {TextInputComponent} from '../../../shared/components/TextInputComponent';
import {useDispatch, useSelector} from 'react-redux';
import {selectEntriesCategories} from '../../../../state_manager/home/selectors';
import {useEffect, useState} from 'react';
import {
  IEntry,
  IEntryCategory,
} from '../../../../state_manager/home/interfaces';
import {ButtonComponent} from '../../../shared/components/ButtonComponent';
import {IDynamicObject} from '../../../shared/interfaces';
import DatePicker from 'react-native-date-picker';
import {dateFormatterUtility} from '../../../shared/utilities/dateFormatter.utility';
import {
  actionCreateUserEntry,
  actionUpdateUserEntry,
} from '../../../../state_manager/home/actions';
import {dismissKeyboardUtility} from '../../../shared/utilities/keyboard.utility';

export const CreateOrUpdateEntryOverlayComponent = ({
  entry,
}: {
  entry?: IEntry;
}) => {
  /**
   * hooks
   */
  const dispatch = useDispatch();

  /**
   * states
   */
  const [showCategories, setShowCategories] = useState(false);
  const [categorySearchText, setCategorySearchText] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const [category, setCategory] = useState('');
  const [entryForm, setEntryForm] = useState<IDynamicObject>({
    category: '',
    title: '',
    content: '',
    date: new Date(),
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [journalDate, setJournalDate] = useState(new Date());
  const [entryTitle, setEntryTitle] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  /**
   * selectors
   */
  const entryCategories = useSelector(selectEntriesCategories);

  /**
   * effects
   */
  useEffect(() => {
    if (entry) {
      const _entryForm = {
        category: entry.category,
        title: entry.title,
        content: entry.content,
        date: entry.date,
      };
      const _category = entryCategories.find(
        entryCategory => entryCategory.uuid === entry.category,
      );
      if (_category) {
        setCategory(_category?.name);
      }
      setEntryForm(_entryForm);
      setJournalDate(new Date(_entryForm.date));
      setEntryTitle(_entryForm.title);
      setIsSelected(true);
    }
  }, [entry, entryCategories]);

  /**
   * handler methods
   */
  const onCategorySearch = (searchText: string) => {
    setCategorySearchText(searchText);
    setCategory(searchText);
    setIsSelected(false);
    if (searchText) {
      setShowCategories(true);
    } else {
      setShowCategories(false);
    }
    onEntryFormChange('category', searchText);
  };

  const onCategorySelected = (_category: IEntryCategory) => {
    setShowCategories(false);
    setIsSelected(true);
    setCategory(_category.name);
    onEntryFormChange('category', _category.uuid);
  };

  const onEntryFormChange = (formControl: string, formFieldValue: any) => {
    const _entryForm = entryForm;
    _entryForm[formControl] = formFieldValue;
    validateEntryForm();
    setEntryForm(_entryForm);
  };

  const validateEntryForm = () => {
    let _formIsValid = true;
    for (const field in entryForm) {
      if (!entryForm[field]) {
        _formIsValid = false;
        break;
      }
    }
    setFormIsValid(_formIsValid);
  };

  const onSubmitJournal = () => {
    entryForm.createCategory = !isSelected;
    if (entry) {
      entryForm.uuid = entry.uuid;
      dispatch<any>(actionUpdateUserEntry({entry: entryForm as IEntry}));
    } else {
      dispatch<any>(actionCreateUserEntry({entry: entryForm as IEntry}));
    }
    dismissKeyboardUtility();
  };

  return (
    <View style={STYLES.containerOne}>
      <View style={STYLES.containerTwo}>
        <Text style={STYLES.titleOne}>
          {entry ? 'Edit Entry' : 'Create An Entry'}
        </Text>
        <View style={STYLES.containerThree}>
          <View style={STYLES.containerFour}>
            <TextInputComponent
              placeholder="Category"
              onNewValue={(searchText: string) => onCategorySearch(searchText)}
              isSecure={false}
              defaultValue={category}
            />
            {showCategories && (
              <EntryCategoriesListComponent
                searchText={categorySearchText}
                onPickCategory={(_category: IEntryCategory) =>
                  onCategorySelected(_category)
                }
              />
            )}
          </View>
          <TextInputComponent
            placeholder="Journal title"
            onNewValue={(textContent: string) => {
              setEntryTitle(textContent);
              onEntryFormChange('title', textContent);
            }}
            isSecure={false}
            defaultValue={entryTitle}
          />
          <TextInput
            placeholder="What are you journaling about"
            onChangeText={textContent =>
              onEntryFormChange('content', textContent)
            }
            multiline={true}
            numberOfLines={7}
            placeholderTextColor={'black'}
            style={STYLES.journalContentInput}
            defaultValue={entryForm.content}
          />
          <DatePicker
            modal
            open={showDatePicker}
            date={journalDate}
            onConfirm={date => {
              setShowDatePicker(false);
              onEntryFormChange('date', date);
              setJournalDate(date);
            }}
            onCancel={() => setShowDatePicker(false)}
          />
          <TouchableHighlight
            underlayColor={''}
            onPress={() => {
              setShowDatePicker(true);
            }}>
            <Text style={STYLES.titleTwo}>
              {journalDate
                ? dateFormatterUtility(journalDate, 'dddd DD MMMM YYYY')
                : 'Add date'}
            </Text>
          </TouchableHighlight>
          <ButtonComponent
            disabled={!formIsValid}
            title={entry ? 'Save' : 'Create'}
            onPress={() => onSubmitJournal()}
            style={{
              button: {
                backgroundColor: 'black',
                padding: 12,
                borderRadius: 6,
                alignItems: 'center',
                marginTop: 24,
                opacity: formIsValid ? 1 : 0.25,
              },
              text: {
                color: 'white',
                textTransform: 'uppercase',
                fontFamily: FONT_POPPINS.bold,
              },
            }}
          />
        </View>
      </View>
    </View>
  );
};

const EntryCategoriesListComponent = ({
  searchText,
  onPickCategory,
}: {
  searchText: string;
  onPickCategory: any;
}) => {
  /**
   * selectors
   */
  const entriesCategories = useSelector(selectEntriesCategories);
  const [filteredEntriesCategories, setFilteredEntriesCategories] = useState<
    Array<IEntryCategory>
  >([]);

  useEffect(() => {
    const filtered = entriesCategories.filter(category =>
      category?.name?.toLowerCase().includes(searchText),
    );
    setFilteredEntriesCategories(filtered);
  }, [searchText, entriesCategories]);

  return (
    <View
      style={{
        ...STYLES.containerFive,
        display: filteredEntriesCategories.length ? 'flex' : 'none',
      }}>
      {filteredEntriesCategories.map(category => (
        <TouchableHighlight
          key={category.uuid}
          underlayColor={''}
          onPress={() => {
            onPickCategory(category);
          }}>
          <Text style={STYLES.titleThree}>{category.name}</Text>
        </TouchableHighlight>
      ))}
    </View>
  );
};

const STYLES = StyleSheet.create({
  containerOne: {
    width: '100%',
    borderRadius: 6,
    alignSelf: 'center',
    bottom: 0,
    position: 'absolute',
  },
  containerTwo: {
    backgroundColor: 'white',
    width: '100%',
    alignSelf: 'center',
    padding: 24,
    rowGap: 24,
  },
  containerThree: {rowGap: 12},
  containerFour: {position: 'relative', zIndex: 1},
  containerFive: {
    backgroundColor: 'white',
    position: 'absolute',
    top: '100%',
    zIndex: 1,
    width: '100%',
    elevation: 2,
    padding: 12,
    borderRadius: 2,
  },
  titleOne: {color: 'black', fontFamily: FONT_POPPINS.bold},
  titleTwo: {
    color: 'black',
    fontFamily: FONT_POPPINS.bold,
    textDecorationLine: 'underline',
    marginTop: 12,
  },
  titleThree: {
    color: 'black',
    textTransform: 'capitalize',
    fontFamily: FONT_POPPINS.bold,
  },
  journalContentInput: {
    fontFamily: FONT_POPPINS.regular,
    borderColor: '#ddd',
    borderWidth: 1,
    width: '100%',
    color: 'black',
    paddingLeft: 12,
    paddingVertical: 8,
    borderRadius: 4,
    fontSize: 12,
    alignItems: 'flex-start',
  },
});
