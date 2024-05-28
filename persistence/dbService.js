import * as SQLite from 'expo-sqlite';

const DB_NAME = 'little_lemon';
const MENU_ITEMS_TABLE = 'menu_items';

const db = SQLite.openDatabase(DB_NAME);

export async function createTable() {
  await db.transactionAsync(async (tx) => {
    try {
      await tx.executeSqlAsync(
        `create table if not exists ${MENU_ITEMS_TABLE} ` +
          '(id integer primary key not null, name varchar(255) not null, ' +
          'description varchar(255), price decimal not null, ' +
          'category varchar(8) not null, image varchar(50));',
        [],
      );
    } catch (error) {
      console.error('Error creating menu items table', error);
    }
  });
}

export async function dropTable() {
  await db.transactionAsync(async (tx) => {
    try {
      await tx.executeSqlAsync(`drop table if exists ${MENU_ITEMS_TABLE};`, []);
    } catch (error) {
      console.error('Error creating menu items table', error);
    }
  });
}

export async function getMenuItems() {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'select * from ' + MENU_ITEMS_TABLE,
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (error) => {
          console.error('Error reading menu items from DB', error);
        },
      );
    });
  });
}

export async function saveMenuItems(menuItems) {
  return await db.transactionAsync(async (tx) => {
    try {
      const itemValues = menuItems.map(
        (item) =>
          `(${item.id}, "${item.name}", "${item.description}", ${item.price}, "${item.category}", "${item.image}")`,
      );
      const valuesString = itemValues.join(',');
      await tx.executeSqlAsync(
        'insert into ' +
          MENU_ITEMS_TABLE +
          ' (id, name, description, price, category, image) values ' +
          valuesString,
        [],
      );
    } catch (error) {
      console.error('Error saving menu items to DB', error);
    }
  });
}

export async function filterByNameAndCategories(name, categories) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const categoriesParam = categories.map((item) => `'${item.toLowerCase()}'`).join(',');
      tx.executeSql(
        `select * from ${MENU_ITEMS_TABLE} where name like '%${name}%' and category in (${categoriesParam})`,
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (error) => {
          console.error('Error filtering menu items from DB', error);
        },
      );
    });
  });
}