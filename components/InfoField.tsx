import { Text, View, TextInput, StyleSheet, TextInputProperties } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';

import { input, inputContainer, inputLabel } from '../styles/sharedStyles';

interface InfoFieldProps {
  label: string;
  value?: string;
  mask?: string;
  keyboardType?: TextInputProperties['keyboardType'];
  autoCapitalize?: TextInputProperties['autoCapitalize'];
  onChangeText: (text: string) => void;
}

const InfoField = ({
  label,
  value,
  mask,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  onChangeText,
}: InfoFieldProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Input
        style={styles.input}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        mask={mask}
        autoCapitalize={autoCapitalize}
        clearButtonMode="always"
      />
    </View>
  );
};

const Input = (props:any) => {
  return props.mask? <MaskedTextInput {...props} /> : <TextInput {...props} />;
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  input: {
   ...inputContainer,
   ...input,
  },
  label: {
   ...inputLabel,
    marginBottom: 5,
  },
});

export default InfoField;