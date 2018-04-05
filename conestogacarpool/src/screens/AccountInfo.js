import React, { Component } from "react";
import { StyleSheet, Text, View, 
  ScrollView, TextInput, Button, Image, 
  AsyncStorage, TouchableOpacity} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';
import {List, ListItem} from 'react-native-elements';

import Parse from 'parse/react-native';

Parse.setAsyncStorage(AsyncStorage);

class AccountInfo extends React.Component{
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
          key={option.ID}
          //text={option.Info}
          title={option.Info}
          rightTitle={option.Value}
          hideChevron
          //rightIcon={{ name: 'arrow-right', type: 'font-awesome', style: { marginRight: 10, fontSize: 15, } }}
        />)
    }

    renderOptions = () => {
      var currentUser = Parse.User.current();
      //console.log(Parse.User.current().get("firstName") );
      SampleData =  [
                  {"ID":1, "Info": "ID", "Value": currentUser.id},
                  {"ID":2, "Info": "Username", "Value": currentUser.get("username")},
                  {"ID":3, "Info": "Name", "Value":currentUser.get("firstName")+" "+ currentUser.get("lastName")},
                  {"ID":4, "Info": "Student Number", "Value":  currentUser.get("studentId").toString()}, 
                  {"ID":5, "Info": "Email", "Value":  currentUser.get("email")},
                  {"ID":6, "Info": "Phone Number", "Value": currentUser.get("phoneNumber")},
                  {"ID":7, "Info": "Gender", "Value": currentUser.get("gender")},
                ]                  
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
                <TouchableOpacity style = {styles.uploadButton}>
                        <Text style = {styles.ButtonText}> Edit </Text>
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
    uploadButton: {
      backgroundColor: '#736356',
      padding: 10,
      margin: 7,
      height: 40,
      borderRadius:10,
      width:100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    ButtonText:{
      color: 'white',
      fontSize:18,
      fontWeight:'bold'
    },
  
  });    
  
  export default AccountInfo;
