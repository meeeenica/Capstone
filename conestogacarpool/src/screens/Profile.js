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
import gender from '../assets/Icons/gender.png';
import icnAcct from '../assets/Icons/profile.png';

import SignUpView from '../screens/SignUp';


Parse.setAsyncStorage(AsyncStorage);


class ProfileScreen extends Component{

  onPress = (page) => {
    //alert(page);
    this.props.navigation.navigate(page.Page, {title:page.title});
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
      var currentUser = Parse.User.current();
      options =  [{"title":"Account Information", "Page":"Account Info"},
                  {"title":"Add Car", "Page":"Add Car"},
                  {"title":"Address Book", "Page":"Address Book"},
                  {"title":"Car", "Page":"Car"},
                  {"title":"Driver Certificate", "Page":"Driver Cert"},
                  {"title":"Payment", "Page":"Payment"},
                  {"title":"Policy", "Page":"Policy"},
                  {"title":"Rating & Reviews", "Page":"RandR"}
                ]
      return options.map((p) => (
        this.renderProfileOptions(p)
      ))
    }

    render(){
      const { navigate } = this.props.navigation;
      var currentUser = Parse.User.current();
      return (
        <ScrollView style={styles.container}>
        <View style={{flex: 1, backgroundColor: '#efe7da', alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.logoContainer}>
            <View style={{margin:10, flexDirection:'row', justifyContent: 'center', alignSelf:'stretch'}}>
              <Image
                style={styles.placeImage}
                source={usrlogo}
              />
            </View>
            <View style={{margin:10, flexDirection:'row', justifyContent: 'center', alignSelf:'stretch'}}>
              <Image
                style={{width:25, height:25}}
                roundAvatar
                source={gender}
              />
              <Text style={styles.textName}>{currentUser.get("firstName")} {currentUser.get("lastName")}</Text>
            </View>
          </View>
  
          <View >
            <List containerStyle={styles.inputContainer}>
              {this.renderOptions()}
            </List>
          </View>
        </View>
        </ScrollView>
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
    listItemStyle:{
      fontSize: 14,
      //color: 'red',
    },
    logoContainer: {
      borderColor: '#9B9B9B',
      justifyContent: 'center',
      alignItems: 'center'
    },
    inputContainer: {
      //flex: 1,
      justifyContent: 'center',
      width: 300,
      //padding: 10,
      backgroundColor: 'white',
      //margin: 20,
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
      borderRadius: 50,
      alignSelf:'stretch',
      width: 130,
      height: 130,
      //width: 150,
      //height: 95
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
    textName : {
      paddingLeft: 5,
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
  
  export default ProfileScreen;
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