import { View, Pressable, Text, StyleSheet, TextStyle } from 'react-native';

import { sectionTitle } from '../styles/sharedStyles';
import { AppColors, colorGuide } from '../styles/styleGuide';

const CategoryFilter = ({ categories, selections, onChange }) => {
  return (
    <>
      <Text style={styles.prompt as TextStyle}>Order for Delivery</Text>
      <View style={styles.container}>
        {categories.map((category, index) => (
          <Pressable
            style={[styles.item, selections[index] && styles.selectedItem]}
            key={index}
            onPress={() => {
              onChange(index);
            }}>
            <Text style={[styles.text, selections[index] && styles.selectedText]}>
              {categories[index]}
            </Text>
          </Pressable>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  prompt: {
    ...sectionTitle,
    marginBottom: 10,
  },
  container: {
    flexDirection: 'row',
  },
  item: {
    padding: 5,
    marginRight: 7,
    borderWidth: 1,
    borderColor: colorGuide.selectionBox.basic.borderColor,
    borderRadius: 10,
  },
  selectedItem: {
    backgroundColor: AppColors.darkGreen,
    borderColor: AppColors.darkGreen,
  },
  text: {
    color: colorGuide.selectionBox.basic.color,
    fontWeight: 'bold',
    fontSize: 13,
  },
  selectedText: {
    color: colorGuide.selectionBox.selected.color,
  },
});

export default CategoryFilter;