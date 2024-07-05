import {Text, TextInput, TouchableHighlight, View} from 'react-native';
import {FONT_POPPINS} from '../../../shared/utilities/constants/fonts.constants';
import {TextInputComponent} from '../../../shared/components/TextInputComponent';
import {useSelector} from 'react-redux';
import {selectEntriesCategories} from '../../../../state_manager/home/selectors';
import {useEffect, useState} from 'react';
import {IEntryCategory} from '../../../../state_manager/home/interfaces';
import {ButtonComponent} from '../../../shared/components/ButtonComponent';
import {IDynamicObject} from '../../../shared/interfaces';
import DatePicker from 'react-native-date-picker';
import {dateFormatterUtility} from '../../../shared/utilities/dateFormatter.utility';

export const CreateEntryOverlayComponent = () => {
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
  const [showDatePicker, setShowDatePicker] = useState(false);

  /**
   * handler methods
   */
  const onCategorySearch = (searchText: string) => {
    setCategorySearchText(searchText);
    setCategory(searchText);
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

  const onEntryFormChange = (formControl: string, formFieldValue: string) => {
    const _entryForm = entryForm;
    _entryForm[formControl] = formFieldValue;
    validateEntryForm();
    setEntryForm(_entryForm);
  };

  const validateEntryForm = () => {
    console.log('entryForm', entryForm);
    let _formIsValid = true;
    for (const field in entryForm) {
      if (!entryForm[field]) {
        _formIsValid = false;
        console.log('breaking');
        break;
      }
    }
    console.log('_formIsValid', _formIsValid);
    setFormIsValid(_formIsValid);
  };

  const onSubmitCreateJournal = () => {
    console.log('entryform', entryForm);
  };

  return (
    <View
      style={{
        width: '90%',
        borderRadius: 6,
        alignSelf: 'center',
      }}>
      <View
        style={{
          backgroundColor: 'white',
          width: '100%',
          alignSelf: 'center',
          padding: 24,
          borderRadius: 6,
          rowGap: 24,
        }}>
        <Text style={{color: 'black', fontFamily: FONT_POPPINS.bold}}>
          Create An Entry
        </Text>
        <View style={{rowGap: 12}}>
          <View>
            <TextInputComponent
              placeholder="Category"
              onNewValue={searchText => onCategorySearch(searchText)}
              isSecure={false}
              defaultValue={category}
            />
            {showCategories && (
              <EntryCategoriesListComponent
                searchText={categorySearchText}
                onPickCategory={category => onCategorySelected(category)}
              />
            )}
          </View>
          <TextInputComponent
            placeholder="Journal title"
            onNewValue={textContent => onEntryFormChange('title', textContent)}
            isSecure={false}
          />
          <TextInput
            placeholder="What are you journaling about"
            onChangeText={textContent =>
              onEntryFormChange('content', textContent)
            }
            multiline={true}
            numberOfLines={7}
            placeholderTextColor={'black'}
            style={{
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
            }}
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
            <Text
              style={{
                color: 'black',
                fontFamily: FONT_POPPINS.bold,
                textDecorationLine: 'underline',
                marginTop: 12,
              }}>
              {journalDate
                ? dateFormatterUtility(journalDate, 'dddd DD MMMM YYYY')
                : 'Add date'}
            </Text>
          </TouchableHighlight>
          <ButtonComponent
            disabled={!formIsValid}
            title="Create"
            onPress={() => onSubmitCreateJournal()}
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

  //   TODO filter categories based on the search key
  useEffect(() => {
    const filtered = entriesCategories.filter(category =>
      category.name.toLowerCase().includes(searchText),
    );
    setFilteredEntriesCategories(filtered);
  }, [searchText]);

  return (
    <View
      style={{
        backgroundColor: 'white',
        position: 'absolute',
        bottom: -48,
        zIndex: 1,
        width: '100%',
        elevation: 2,
        padding: 12,
        borderRadius: 2,
      }}>
      {filteredEntriesCategories.map(category => (
        <TouchableHighlight
          key={category.uuid}
          underlayColor={''}
          onPress={() => {
            console.log('category', category.uuid);
            onPickCategory(category);
          }}>
          <Text
            style={{
              color: 'black',
              textTransform: 'capitalize',
              fontFamily: FONT_POPPINS.bold,
            }}>
            {category.name}
          </Text>
        </TouchableHighlight>
      ))}
    </View>
  );
};
