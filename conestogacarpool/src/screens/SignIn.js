import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button, Image, AsyncStorage, TouchableOpacity} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';

import Parse from 'parse/react-native';

import logo from '../assets/csmr_logo.png'

import SignUpView from '../screens/SignUp';


Parse.setAsyncStorage(AsyncStorage);

class SignInScreen extends Component{
    state = {
      username: "",
      password: "",
      email: ""
    }
    componentWillMount() {
      Parse.initialize('OZuPdqt9hfWl20AixyvWuQH1bAEKEfaG7fMAxL0T', '7diNfy6vKZrKB3edvl7xxG3wON2gsPE2SClWjVmN');
      Parse.serverURL = 'https://parseapi.back4app.com/';
    }
    handleUsername = (text) => {
      this.setState({username : text})
    }
    handlePassword = (text) => {
      this.setState({password: text})
    }
    login = (username, pass) => {
      Parse.User.logIn(username, pass, {
        success: () => {
          this.props.navigation.navigate('TabNav', {title: 'Post a Trip'});//
        },
        error: () => {
          alert('Wrong credentials. Try again');
        }
      });
    }

    signup()  {
      this.props.navigation.navigate('MSLogin');
    }

    Designer() {
      this.props.navigation.navigate('designerScreen');
    }

    constructor(props) {
      super(props);

      this.signup = this.signup.bind(this);
      this.login = this.login.bind(this);
      this.Designer = this.Designer.bind(this);
    }


    render(){
      const navigation = this.props.navigation;
      return (
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.placeImage}
              source={logo}
              onPress={() => this.Designer()}
            />
          </View>
  
          <View style={styles.inputContainer}>
            <TextInput style = {styles.placeInput}
              placeholder = "Username"
              placeholderTextColor = '#c9c5c2'
              autoCapitalize = "none"
              onChangeText = {this.handleUsername}
              />
            <TextInput style = {styles.placeInput}
              placeholder = "Password"
              placeholderTextColor = '#c9c5c2'
              secureTextEntry={true}
              autoCapitalize = "none"
              onChangeText = {this.handlePassword}
              />
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
                  disabled={!this.state.username||!this.state.password}
                  style = {styles.signInButton}
                  onPress = { () => this.login(this.state.username, this.state.password) }>
                  <Text style = {styles.ButtonText}> Sign In </Text>
            </TouchableOpacity>
            <TouchableOpacity
                  style = {styles.signUpButton}
                  onPress={ () => this.Designer() }>
                  <Text style = {styles.ButtonText}> Sign Up </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
      componentWillMount();
    }
 }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#efe7da',
      alignItems: 'center',
      justifyContent: 'center',
  
    },
    logoContainer: {
      //flex: 0.3,
      
    },
    inputContainer: {
      flex: 0.6,
      justifyContent: 'center',
    },
    buttonsContainer: {
      //flex: 0.3
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
  
  export default SignInScreen;
