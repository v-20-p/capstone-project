import { View, Text, Image, StyleSheet } from 'react-native';

import { title, subtitle, leadText, contentContainer } from '../styles/sharedStyles';
import { AppColors } from '../styles/styleGuide';

const introText =
  'We are a family owned Mediterranean restaurant, ' +
  'focused on traditional recipes served with a modern twist.';

const HeroBlock = () => {
  const imageSource = require('../assets/hero.png');

  return (
    <View style={styles.container}>
      <Text style={[title, styles.title]}>Little Lemon</Text>
      <Text style={[subtitle, styles.subtitle]}>Chicago</Text>
      <View style={styles.introContainer}>
        <Text style={[styles.introText, leadText]}>{introText}</Text>
        <Image style={styles.introImage} source={imageSource} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...contentContainer,
    backgroundColor: AppColors.darkGreen,
    paddingBottom: 15,
  },
  title: {
    lineHeight: 50,
  },
  subtitle: {
    lineHeight: 30,
    position: 'relative',
    top: -10,
  },
  introContainer: {
    flexDirection: 'row',
  },
  introText: {
    flex: 2,
    paddingRight: 10,
  },
  introImage: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 20,
  },
});

export default HeroBlock;
