
import { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView,Image, StyleProp } from 'react-native';
import Button from '../components/Button';
import HeroBlock from '../components/HeroBlock';
import InfoField from '../components/InfoField';
import UserContext from '../contexts/UserContext';
import { saveUser } from '../persistence/userStorage';
import { blockTitle, contentContainer, screenContainer } from '../styles/sharedStyles';
import * as userUtils from '../utils/userUtils';

const OnBoarding = () => {
    
    const userContext = useContext(UserContext);
  
    if (!userContext) {
      throw new Error('OnBoarding must be used within a UserProvider');
    }
    const { setUser } = userContext;

    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
  
    const processUserData = () => {
      const currUser = { firstName, email, emailNotifications: {} };
      setUser(currUser);
      saveUser(currUser);
    };

  
    const isFirstNameValid = userUtils.isFirstNameValid(firstName);
    const isEmailValid = userUtils.isEmailValid(email);
    const isDataValid = isFirstNameValid && isEmailValid;
  
    return (
      <ScrollView style={screenContainer}>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={100}>
        <View style={{padding:10,justifyContent:"center",alignItems:"center"}}>
        <Image source={require("../assets/Logo.png")} />

        </View>
          <HeroBlock />
          <View style={contentContainer}>
            <Text style={blockTitle as any}>Let us get to know you</Text>
            <InfoField
              value={firstName}
              label="First name*"
            //   valid={isFirstNameValid }
              onChangeText={setFirstName}
            />
            <InfoField
              value={email}
              label="Email*"
            //   valid={isEmailValid}
              keyboardType="email-address"
              onChangeText={setEmail}
              autoCapitalize="none"
            />
            <View style={styles.buttonContainer}>
              <Button title="Menu" enabled={true} onPress={processUserData} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    buttonContainer: {
      marginTop: 20,
    },
  });
  
  export default OnBoarding;
