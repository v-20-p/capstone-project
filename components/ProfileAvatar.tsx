import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

import Avatar from './Avatar';
import { iconTextButton } from '../styles/sharedStyles';
import * as userUtils from '../utils/userUtils';

const ProfileAvatar = ({ profile, onChange }) => {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      updateProfileAvatar(result.assets[0].uri);
    }
  };

  const clearAvatar = () => {
    updateProfileAvatar('');
  };

  const updateProfileAvatar = (newAvatarPath) => {
    onChange(newAvatarPath);
  };

  const initials = userUtils.getInitials(profile.firstName, profile.lastName);

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.6} onPress={pickImage}>
        <Avatar imagePath={profile.avatarPath} substitutionText={initials} size={120} />
      </TouchableOpacity>
      <TouchableOpacity style={clearButtonStyles.container} onPress={clearAvatar}>
        <MaterialIcons name="clear" style={iconTextButton.icon} />
        <Text style={iconTextButton.text}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const clearButtonStyles = StyleSheet.create({
  container: {
   ...iconTextButton.container,
    marginTop: 10,
  } as ViewStyle,
});

export default ProfileAvatar;