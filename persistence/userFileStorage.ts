import * as FileSystem from 'expo-file-system';

import * as FileUtils from '../utils/fileUtils';

const USER_AVATAR_PATH_REL = 'user/avatar/';
const USER_AVATAR_PATH = FileSystem.documentDirectory + USER_AVATAR_PATH_REL;

async function prepareUserAvatarDirectory() {
  await FileUtils.prepareDirectory(USER_AVATAR_PATH);
}

function getUserAvatarUri(fileName) {
  return USER_AVATAR_PATH + fileName;
}

export async function saveUserAvatar(fromUri) {
  await prepareUserAvatarDirectory();
  const fileName = FileUtils.getFileName(fromUri);
  const targetUri = getUserAvatarUri(fileName);

  if (fromUri !== targetUri) {
    await clearUserAvatarDirectory();
    try {
      await FileSystem.copyAsync({
        from: fromUri,
        to: targetUri,
      });
    } catch (error) {
      console.info('Error while saving user avatar', error);
    }
  }

  return targetUri;
}

export async function deleteUserAvatar() {
  await clearUserAvatarDirectory();
}

async function clearUserAvatarDirectory() {
  const targetInfo = await FileSystem.getInfoAsync(USER_AVATAR_PATH);
  if (targetInfo.exists) {
    try {
      const files = await FileSystem.readDirectoryAsync(targetInfo.uri);
      const deletePromises = files.map(async (file) => {
        try {
          const fileUri = USER_AVATAR_PATH + file;
          return await FileSystem.deleteAsync(fileUri);
        } catch (error) {
          console.error('Error deleting file', error);
        }
      });
      await Promise.allSettled(deletePromises);
    } catch (error) {
      console.info('Error while deleting user avatar', error);
    }
  }
}