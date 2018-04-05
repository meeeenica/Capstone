import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button, Image, AsyncStorage, TouchableOpacity} from 'react-native';
import { StackNavigator } from 'react-navigation';

import Parse from 'parse/react-native';

import logo from '../assets/csmr_logo.png'

Parse.setAsyncStorage(AsyncStorage);
const navigate = ({ navigation }) => (<SignUpView navigation={navigation}/>);

class Confirmation extends Component{
  static navigationOptions = ({ navigation }) => ({
      title: `${navigation.state.params.title}`,
       headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
          headerStyle:{
              backgroundColor:'white',
          },
      });
    componentWillMount() {
      Parse.initialize('OZuPdqt9hfWl20AixyvWuQH1bAEKEfaG7fMAxL0T', '7diNfy6vKZrKB3edvl7xxG3wON2gsPE2SClWjVmN');
      Parse.serverURL = 'https://parseapi.back4app.com/';
    }
  
    submitButtonHandler = () => {
      //alert(event);
      this.signup(this.state.username, this.state.email, this.state.password)
    };
  
    handleUsername = (text) => {
      this.setState({ username: text })
    }
  
    handlePassword = (text) => {
      this.setState({password: text})
    }
  
    handleEmail = (text) => {
      this.setState({ email: text })
    }
  
    signup = (userName, userEmail, userPassword) => {
      //alert('Your email is: ' + userEmail + ' Your username is: ' + userName)
      var user = new Parse.User();
      user.set("username", userName);
      user.set("password", userPassword);
      user.set("email", userEmail);
  
      user.signUp(null, {
        success: function(user) {
          // Hooray! Let them use the app now.
          
        },
        error: function(user, error) {
          // Show the error message somewhere and let the user try again.
          alert("Error: " + error.code + " " + error.message);
        }
      });
      
   }
   handlePress()  {
    this.props.navigation.navigate('TabNav');
    }
    constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
    }
  
    render() {

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
            <Text style={styles.confirmText}>
                Thank you for signing up!
            </Text>
            <Text>
                Registration is now complete.    
            </Text>
          </View>
  
          <View style={styles.buttonsContainer}>
          <TouchableOpacity
                 style = {styles.signInButton}
                 onPress={() => this.handlePress()
                }>
                 <Text style = {styles.ButtonText}> Proceed to Sign In </Text>
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
    confirmText:{
        fontSize:24
    },
    inputContainer: {
      flex: 0.7,
      justifyContent: 'center',
    },
    buttonsContainer: {
      //flex: 0.3
    },
    placeImage: {
      width: 150,
      height: 95
    },
    signInButton: {
        backgroundColor: '#736356',
        padding: 10,
        margin: 7,
        height: 40,
        borderRadius:10,
        width:180,
        alignItems: 'center',
    },
    ButtonText:{
      color: 'white',
      fontSize:16,
      fontWeight:'bold'
    }
  });

  export default Confirmation;

  