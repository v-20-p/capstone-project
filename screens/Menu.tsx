import { Ionicons } from '@expo/vector-icons';
import debounce from 'lodash.debounce';
import { useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TextStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Avatar from '../components/Avatar';
import CategoryFilter from '../components/CategoryFilter';
import HeroBlock from '../components/HeroBlock';
import UserContext from '../contexts/UserContext';
import * as dataConsts from '../data/dataConsts';
import { getMenuItems, getMenuItemImageUrl } from '../network/menuRequests';
import * as DBService from '../persistence/dbService';
import {
  prepareMenuDirectory,
  getMenuItemImagePath,
  downloadMenuItemImage,
} from '../persistence/menuFileStorage';
import {
  input,
  inputContainer,
  contentContainer,
  blockTitle,
  paragraph,
} from '../styles/sharedStyles';
import { AppColors, colorGuide } from '../styles/styleGuide';

import { getInitials } from '../utils/userUtils';
import { addIds } from '../utils/menuUtils';

const Menu = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [query, setQuery] = useState('');
  const [selections, setSelections] = useState(dataConsts.MENU_CATEGORIES.map((item) => false));
  const insets = useSafeAreaInsets();
  const bottomInset = insets.bottom;

  const initials = getInitials(user.firstName, user.lastName);

  const loadData = useCallback(async () => {
    try {
      await DBService.createTable();
      //await DBService.dropTable();
      let items:any = await DBService.getMenuItems();
      if (items.length === 0) {
        items = await fetchDataFromNetwork();
        await DBService.saveMenuItems(items);
      }

      preprocessMenuItems(items);

      setMenuItems(items);
    } catch (error) {
      console.error('Error preparing menu data', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFilterChange = useCallback(async () => {
    if (!isLoading) {
      const hasNoSelection = selections.every((item) => item === false);
      const activeCategories = dataConsts.MENU_CATEGORIES.filter((_category, index) => {
        return hasNoSelection ? true : selections[index];
      });
      const filteredMenuItems = await DBService.filterByNameAndCategories(query, activeCategories);
      preprocessMenuItems(filteredMenuItems);
      setMenuItems(filteredMenuItems as any );
    }
  }, [isLoading, query, selections]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    handleFilterChange();
  }, [handleFilterChange]);

  const lookup = useCallback((query) => {
    setQuery(query);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const preprocessMenuItems = (items) => {
    items.forEach((item) => {
      if (!dataConsts.MISSING_IMAGES.get(item.image)) {
        item.imagePath = getMenuItemImagePath(item.image);
      }
    });
  };

  const fetchDataFromNetwork = async () => {
    let items = await getMenuItems();
    items = addIds(items);

    await prepareMenuDirectory();

    const downloadPromises = items.map(async (item) => {
      if (dataConsts.MISSING_IMAGES.get(item.image)) {
        console.debug('Missing image will be read from assets', item.image);
      } else {
        const imageUrl = getMenuItemImageUrl(item.image);
        return await downloadMenuItemImage(imageUrl, item.image);
      }
    });
    await Promise.allSettled(downloadPromises);

    return items;
  };

  const MenuItem = useCallback(({ name, price, description, image, imagePath }) => {
    let imageSource;
    if (!imagePath) {
      imageSource = dataConsts.MISSING_IMAGES.get(image);
    }
    return (
      <View style={menuStyles.container}>
        <View style={menuStyles.infoContainer}>
          <Text style={menuStyles.name as TextStyle}>{name}</Text>
          <Text style={menuStyles.description} numberOfLines={2}>
            {description}
          </Text>
          <Text style={menuStyles.price}>{'$' + price.toFixed(2)}</Text>
        </View>
        <Image
          style={menuStyles.image}
          source={imagePath ? { uri: imagePath } : imageSource}
          alt={`Photo of ${name}`}
        />
      </View>
    );
  }, []);

  const renderItem = ({ item }) => (
    <MenuItem
      name={item.name}
      price={item.price}
      description={item.description}
      image={item.image}
      imagePath={item.imagePath}
    />
  );

  const handleSelectionsChange = (index) => {
    const copy = [...selections];
    copy[index] = !selections[index];
    setSelections(copy);
  };

  const handleSearchChange = async (text) => {
    setSearchText(text);
    debouncedLookup(text);
  };

  const FlatListItemSeparator = () => {
    return <View style={menuStyles.separator} />;
  };

  const MenuAvatar = useCallback(() => {
    return (
      <TouchableOpacity
        style={styles.avatar}
        activeOpacity={0.6}
        onPress={() => navigation.navigate('profile')}>
        <Avatar imagePath={user.avatarPath} substitutionText={initials} size={50} />
      </TouchableOpacity>
    );
  }, [initials, navigation, user.avatarPath]);

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <HeroBlock />
          <MenuAvatar />
          <View style={styles.searchContainer}>
            <View style={searchBoxStyles.container}>
              <Ionicons name="search" size={20} style={searchBoxStyles.icon} />
              <TextInput
                style={searchBoxStyles.input}
                value={searchText}
                onChangeText={handleSearchChange}
                clearButtonMode="always"
              />
            </View>
          </View>
          <View style={styles.categoriesContainer}>
            <CategoryFilter
              categories={dataConsts.MENU_CATEGORIES}
              selections={selections}
              onChange={handleSelectionsChange}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.container}>
        <FlatListItemSeparator />
        {isLoading ? (
          <ActivityIndicator style={styles.activityIndicator} />
        ) : (
          <FlatList
            data={menuItems}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ItemSeparatorComponent={FlatListItemSeparator}
            showsVerticalScrollIndicator={false}
            keyboardDismissMode="on-drag"
            contentInset={{ bottom: bottomInset }}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: colorGuide.heroBlock.background,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  container: {
    ...contentContainer,
    flex: 1,
  },
  categoriesContainer: {
    ...contentContainer,
    paddingBottom: 0,
  },
  title: {
    fontSize: 30,
  },
  avatar: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  activityIndicator: {
    marginTop: 15,
  },
});

const menuStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  infoContainer: {
    flex: 3,
  },
  name: {
    ...blockTitle,
    flex: 1,
  },
  description: {
    ...paragraph,
    marginTop: 10,
    marginRight: 10,
    flex: 1,
  },
  price: {
    ...paragraph,
    marginTop: 10,
    flex: 1,
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: AppColors.lightGrey,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: colorGuide.separatorLine.color,
  },
});

const searchBoxStyles = StyleSheet.create({
  container: {
    ...inputContainer,
    padding: 0,
    backgroundColor: AppColors.white,
    flexDirection: 'row',
  },
  input: {
    ...input,
    flex: 1,
    padding: 0,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: AppColors.grey,
  },
  icon: {
    alignContent: 'center',
    padding: 10,
    color: AppColors.darkGrey,
  },
});

export default Menu;