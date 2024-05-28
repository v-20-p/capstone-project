import * as FileSystem from 'expo-file-system';

import { prepareDirectory } from '../utils/fileUtils';

const MENU_PATH_REL = 'menu/';
const MENU_PATH = FileSystem.documentDirectory + MENU_PATH_REL;

export async function prepareMenuDirectory() {
  await prepareDirectory(MENU_PATH);
}

export function getMenuItemImagePath(imageName) {
  return MENU_PATH + imageName;
}

export async function downloadMenuItemImage(url, imageFileName) {
  try {
    const saveToPath = getMenuItemImagePath(imageFileName);
    await FileSystem.downloadAsync(url, saveToPath);
    return saveToPath;
  } catch (error) {
    console.error('Error downloading image', error);
  }
}
export function addIds(menuItems) {
    let i = 1;
    return menuItems.map((item) => ({ ...item, id: i++ }));
  }