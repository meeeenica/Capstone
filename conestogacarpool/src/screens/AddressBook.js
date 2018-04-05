import React, { Component } from "react";
import { StyleSheet, Text, View, 
  ScrollView, TextInput, Button, Image, 
  AsyncStorage, TouchableOpacity} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';
import {List, ListItem} from 'react-native-elements';

import Parse from 'parse/react-native';

Parse.setAsyncStorage(AsyncStorage);

class AddressBookScreen extends Component{
  static navigationOptions = ({ navigation }) => ({
      title: `${navigation.state.params.title}`,
       headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
          headerStyle:{
              backgroundColor:'white',
          },
      });
    
    constructor(props) {
      super(props);
      this.renderProfileOptions = this.renderProfileOptions.bind(this);
      this.renderOptions = this.renderOptions.bind(this);
    }

    renderProfileOptions(option) {
        return (< ListItem titleStyle={styles.listItemStyle}
          key={option.title}
          title={option.title}
          rightTitle={option.rightTitle}
        />)
    }

    renderOptions = () => {

      var currentUser = Parse.User.current();
      var UserHome = {"title":"Home","rightTitle":currentUser.get("address")+ ", " +currentUser.get("province")};
      SampleData =  [
                  {"title": "School", "rightTitle": "Conestoga College, 299 Doon Valley Dr."},
                  {"title": "Work", "rightTitle": "Fairview Park, 2960 Kingsway Dr."},
                  {"title": "Shop", "rightTitle": "Conestoga Mall, 2960 Kingsway Dr."},
                ]   

      SampleData.push(UserHome);
                               
      return SampleData.map((p) => (
        this.renderProfileOptions(p)
      ))
    }

    render(){
      const navigation = this.props.navigation;
      return (
        <View style={styles.container}>
          <List containerStyle={styles.inputContainer}>
                {this.renderOptions()}
            </List>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style = {styles.addButton}>
                        <Text style = {styles.ButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
      );
    }
 }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#efe7da',
      alignItems: 'center',
      //justifyContent: 'center',
    },
    listItemStyle:{
      fontSize: 14,
      //color: 'red',
    },
    logoContainer: {
      //flex: 1,
      
    },
    inputContainer: {
      //flex: 1,
      justifyContent: 'center',
      width: "100%",
      //padding: 10,
      //backgroundColor: 'white',
      //margin: 20,
      borderBottomColor: 'white',
      borderTopColor:'white',
    },
    buttonsContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 30,
    },
    addButton: {
     borderWidth:1,
     borderColor:'rgba(0,0,0,0.1)',
     alignItems:'center',
     justifyContent:'center',
     width:60,
     height:60,
     backgroundColor:'rgba(255,255,255, 0.7)',
     borderRadius:100,
    },
    ButtonText:{
      color: '#ddd',
      fontSize:45,
      fontWeight:'bold'
    },
    
  });    
  
  export default AddressBookScreen;