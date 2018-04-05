import React, { Component } from "react";
import { StyleSheet, Text, View, 
  ScrollView, TextInput, Button, Image, 
  AsyncStorage, TouchableOpacity} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';
import {List, ListItem} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Parse from 'parse/react-native';

//Images
import usrlogo from '../assets/Icons/user.png';
import gender from '../assets/Icons/gender.png'
import icnAcct from '../assets/Icons/profile.png';

import SignUpView from '../screens/SignUp';


Parse.setAsyncStorage(AsyncStorage);


class design extends React.Component{
  onPress = (page) => {
    //alert(page);
    this.props.navigation.navigate(page.Page, {title: page.title });
  }

    constructor(props) {
      super(props);
      this.renderProfileOptions = this.renderProfileOptions.bind(this);
      this.renderOptions = this.renderOptions.bind(this);
    }

    renderProfileOptions(option) {
      return (< ListItem titleStyle={styles.listItemStyle}
        key={option.title}
        title={option.title}
        onPress={() => this.onPress(option)}
      />)
    }

    renderOptions = () => {
      options =  [{"title":"Account Information", "Page":"AccountInfo"},
                  {"title":"Add Car", "Page":"AddCar"},
                  {"title":"Address Book", "Page":"AddressBook"},
                  {"title":"Address Book -Add", "Page":"AddressBookAdd"},
                  {"title":"Car","Page":"Car"},
                  {"title":"Confirmation", "Page":"Confirmation"},
                  {"title":"Design File", "Page":"designFile"},
                  {"title":"Driver Certificate", "Page":"DriverCert"},
                  {"title":"Driver Certificate -Add", "Page":"DriverCertAdd"},
                  {"title":"List Of Requests", "Page":"Requests"},
                  {"title":"List of Trips", "Page":"TripList"},
                  {"title":"MS Login", "Page":"MSLogin"},
                  {"title": "Notifications", "Page":"Notifs"},
                  {"title":"Payment", "Page":"Payment"},
                  {"title":"Policy", "Page":"Policy"},
                  {"title": "Post Trip", "Page":"PostTrip"},
                  {"title": "Profile", "Page":"Profile"},
                  {"title": "Ratings & Reviews", "Page": "RandR"},
                  {"title": "Search", "Page":"Search"},
                  {"title": "Sign In", "Page":"SignIn"},
                  {"title": "Sign Up", "Page":"SignUp"},
                  {"title": "Trip Details", "Page":"TripDetails"},
                  {"title": "Trips", "Page":"Trips"},
                ]
      return options.map((p) => (
        this.renderProfileOptions(p)
      ))
    }

    render(){
      const { navigate } = this.props.navigation;
      return (
        <ScrollView>
          <View style={styles.container}>
            <List containerStyle={styles.inputContainer}>
              {this.renderOptions()}
            </List>
          </View>
        </ScrollView>
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
      width: 300,
      padding: 10,
      backgroundColor: 'white',
      margin: 20,
      borderBottomColor: 'white',
      borderTopColor:'white',
    },
    input2Container: {
      flex: 0.3,
      justifyContent: 'center',
      width: 300,
      padding: 4,
      borderColor: 'blue',
      backgroundColor: 'blue',
    },
    placeInput: {
      margin:10,
      padding:10,
      height:40,
      width:250,
      borderColor:'#aba398',
      borderWidth:1,
      backgroundColor:'#fff'
      //textAlign: 'center'
    },
    placeImage: {
      width: 150,
      height: 95
    },
    signInButton: {
      backgroundColor: '#c7b199',
      padding: 10,
      margin: 7,
      height: 40,
      borderRadius:10,
      width: 100,
      alignItems: 'center'
    },
    signUpButton: {
      backgroundColor: '#736356',
      padding: 10,
      margin: 7,
      height: 40,
      borderRadius:10,
      width:100,
      alignItems: 'center',
    },
    ButtonText:{
      color: 'white',
      fontSize:18,
      fontWeight:'bold'
    }
  });    
  
  export default design;
/*{
  list.map((l, i) => (
    <ListItem noBorder
      titleStyle={styles.listItemStyle}
      //roundAvatar
      //avatar={{uri:l.avatar}}
      key={i}
      title={l.name}
      onPress={() => this.onPress(l.name)}
      //button onPress={() => alert('hey')}//{this.handlePress(l.name)}}
    />
  ))
}*/