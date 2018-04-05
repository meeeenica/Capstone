import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button, Image, AsyncStorage, TouchableOpacity} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';

import Parse from 'parse/react-native';

Parse.setAsyncStorage(AsyncStorage);

class SignInScreen extends Component{
  /*static navigationOptions = ({ navigation }) => ({
      title: `${navigation.state.params.title}`,
       headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
          headerStyle:{
              backgroundColor:'white',
          },
      });*/
    constructor(props) {
      super(props);

    }


    render(){
      const navigation = this.props.navigation;
      return (
        <View style={styles.container}>
          
        </View>
      );
    }
 }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#efe7da',
      alignItems: 'center',
      justifyContent: 'center',
  
    },
    
  });    
  
  export default SignInScreen;
