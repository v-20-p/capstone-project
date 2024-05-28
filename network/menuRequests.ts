const MENU_ITEMS_URL =
  'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';

export async function getMenuItems() {
  try {
    const response = await fetch(MENU_ITEMS_URL);
    const json = await response.json();
    return json.menu;
  } catch (error) {
    console.error('Error fetching menu items', error);
  }
}

const IMAGE_FILE_NAME_PLACEHOLDER = '${imageFileName}';
const IMAGE_URL_TEMPLATE =
  'https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/' +
  `main/images/${IMAGE_FILE_NAME_PLACEHOLDER}?raw=true`;

export function getMenuItemImageUrl(fileName) {
  return IMAGE_URL_TEMPLATE.replace(IMAGE_FILE_NAME_PLACEHOLDER, fileName);
}