import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import { colorGuide } from '../styles/styleGuide';

type ButtonProps = {
  title: string;
  isDestructive?: boolean;
  enabled?: boolean;
  onPress: () => void;
};

const Button: React.FC<ButtonProps> = ({ title, isDestructive = false, enabled = true, onPress }) => {
    return (
        <TouchableOpacity
          activeOpacity={0.6}
          disabled={!enabled}
          style={[
            styles.container,
            isDestructive? styles.destructiveContainer : styles.basicContainer,
           !enabled && styles.disabled,
          ]}
          onPress={enabled? onPress : undefined}>
          <Text style={[styles.text, isDestructive? styles.destructiveText : styles.basicText]}>
            {title}
          </Text>
        </TouchableOpacity>
      );
    };

const styles = StyleSheet.create({
  container: {
    borderRadius: 7,
    padding: 10,
    borderWidth: 1,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  basicContainer: {
    backgroundColor: colorGuide.button.basic.background,
    borderColor: colorGuide.button.basic.borderColor,
  },
  basicText: {
    color: colorGuide.button.basic.color,
  },
  destructiveContainer: {
    backgroundColor: colorGuide.button.destructive.color,
    borderColor: colorGuide.button.destructive.borderColor,
  },
  destructiveText: {
    fontWeight: 'normal',
    color: colorGuide.button.destructive.color,
  },
  disabled: {
    opacity: 0.6,
  },
});

export default Button;
