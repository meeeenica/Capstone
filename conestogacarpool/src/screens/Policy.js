import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button, Image, AsyncStorage, TouchableOpacity} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';

import Parse from 'parse/react-native';

Parse.setAsyncStorage(AsyncStorage);

class PolicyScreen extends Component{
  static navigationOptions = ({ navigation }) => ({
      title: `${navigation.state.params.title}`,
       headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
          headerStyle:{
              backgroundColor:'white',
          },
      });
    
    
    constructor(props) {
      super(props);

    }


    render(){
      const navigation = this.props.navigation;
      return (
        <View style={styles.container}>
          <View style={styles.policyContainer}>
            <Text>This policy applies to any users of the application in Conestoga College.</Text>
            <Text> {'\n'}1. *****************************************</Text>
            <Text> {'\n'}2. *****************************************</Text>
            <Text> {'\n'}3. *****************************************</Text>
            <Text> {'\n'}4. *****************************************</Text>
            <Text> {'\n'}5. *****************************************</Text>
            <Text> {'\n'}6. *****************************************</Text>
            <Text> {'\n'}7. *****************************************</Text>
            <Text> {'\n'}8. *****************************************</Text>
            <Text> {'\n'}9. *****************************************</Text>
            <Text> {'\n'}10. *****************************************</Text>
          </View>
        </View>
      );
    }
 }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#efe7da',
      //alignItems: 'center',
      //justifyContent: 'center',
  
    },
    policyContainer: {
      backgroundColor: '#fff',
      margin: 10,
      padding:10,
    },
  });    
  
  export default PolicyScreen;
