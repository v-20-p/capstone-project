import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Button from '../components/Button';
import { navigate } from './../node_modules/@react-navigation/routers/src/CommonActions';

const Menu = ({navigation}) => {
    return (
        <View>
            <Text style={{marginTop:20,padding:10,fontSize:20}}>porsnal informaton </Text>
            <Button title='profile' onPress={()=>{navigation.navigate("profile") }} />
           
            <View style={{marginTop:20,padding:10,flexDirection:"row",alignItems:"center",flexGrow:2}}>
                <Image source={require("../assets/Profile.png")} style={{width:100,height:100,borderRadius:100}}/>
                <TouchableOpacity
          activeOpacity={0.6}
         
          style={{}}
          onPress={()=>{}}>
          <Text style={{}}>
            g
          </Text>
        </TouchableOpacity>
                
                
                </View>


        </View>
    );
}

const styles = StyleSheet.create({})

export default Menu;
