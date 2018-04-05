import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button, Image, AsyncStorage, TouchableOpacity} from 'react-native';
import { StackNavigator } from 'react-navigation';

import Parse from 'parse/react-native';

import logo from '../assets/csmr_logo.png'

Parse.setAsyncStorage(AsyncStorage);
const navigate = ({ navigation }) => (<SignUpView navigation={navigation}/>);

class SignUpScreen extends Component{
    componentWillMount() {
      Parse.initialize('OZuPdqt9hfWl20AixyvWuQH1bAEKEfaG7fMAxL0T', '7diNfy6vKZrKB3edvl7xxG3wON2gsPE2SClWjVmN');
      Parse.serverURL = 'https://parseapi.back4app.com/';
    }
  
    submitButtonHandler = () => {
      //alert(event);
      const { params } = this.props.navigation.state;
      this.signup(this.state.username, params.userEmail, this.state.password)
    };
  
    handleUsername = (text) => {
      this.setState({ username: text })
    }

    handleEmail = (text) => {
      this.setState({ email: text })
    }
  
    handlePassword = (text) => {
      this.setState({ password: text })
    }
  
    signup = (userName, userEmail, userPassword) => {
      //alert('Your email is: ' + userEmail + ' Your username is: ' + userName)
      var Location = Parse.Object.extend("ConestogaUser");
      var loc = new Location();
      loc.set("email", userEmail);
      loc.set("password", userPassword);

      loc.save(null, {
        success: function(user) {
          // Hooray! Let them use the app now.
        },
        error: function(user, error) {
          // Show the error message somewhere and let the user try again.
          alert("Error: " + error.code + " " + error.message);
        }
      });
      }
    constructor(props) {
    super(props);
    }
  
    render() {
      const { params } = this.props.navigation.state;
      const navigation = this.props.navigation;
      return (
        <View style={styles.container}>
  
          <View style={styles.logoContainer}>
  
          <Image
            style={styles.placeImage}
            source={logo}
          />
  
          </View>
  
          <View style={styles.inputContainer}>
  
          <TextInput
            style={styles.placeInput}
            placeholder="Email"
            onChangeText = {this.handleEmail}
            value={params.userEmail}
            editable={false} 
            selectTextOnFocus={false}
            //onChangeText={this.placeNameChangedHandler}
          />
  
          <TextInput
            style={styles.placeInput}
            placeholder="Username"
            onChangeText = {this.handleUsername}
            //onChangeText={this.placeNameChangedHandler}
          />
  
          <TextInput
            secureTextEntry={true}
            style={styles.placeInput}
            placeholder="Password"
            onChangeText = {this.handlePassword}
            //value={this.state.placeName}
          />
  
          <TextInput
            secureTextEntry={true}
            style={styles.placeInput}
            placeholder="Confirm password"
            //value={this.state.placeName}
          />
          </View>
  
          <View style={styles.buttonsContainer}>
  
  
          <TouchableOpacity
                 style = {styles.signUpButton}
                 onPress= {this.submitButtonHandler}>
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
      /*width: '100%',
      paddingTop: 50,
      flex: 1, 
      //backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',*/
      //flexDirection: 'column',
      flex: 1,
      backgroundColor: '#efe7da',
      alignItems: 'center',
      justifyContent: 'center',
  
    },
    logoContainer: {
      //flex: 0.3,
      
    },
    inputContainer: {
      flex: 0.7,
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

  export default SignUpScreen;

  