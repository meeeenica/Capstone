import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, 
  Button, Image, TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';
import CheckBox from 'react-native-check-box';
import Parse from 'parse/react-native';
import logo from '../assets/outlook-logo-vector.png';

class MSLoginScreen extends Component{
    state = {
      email:'',
      password:'',
      isChecked: false,
      isAuth: false
    }
    componentWillMount() {
      Parse.initialize('OZuPdqt9hfWl20AixyvWuQH1bAEKEfaG7fMAxL0T', '7diNfy6vKZrKB3edvl7xxG3wON2gsPE2SClWjVmN');
      Parse.serverURL = 'https://parseapi.back4app.com/';
    }
    onClick(isChecked) {
      this.setState({isChecked : !isChecked})
    }
    handleEmail = (text) => {
      this.setState({email : text})
    }
    validateEmail(email) {
      return (/^[\w.+\-]+@conestogac\.on\.ca$/.test(email));
    }
    handlePassword = (text) => {
      this.setState({password: text})
    }
    handleLogIn = (bool) => {
      this.setState({isAuth : bool})
    }
    logIn = (email, password) => {
      var checkEmail = new Parse.Query("ConestogaUser");
      checkEmail.equalTo("email", email);
      var checkPassword = new Parse.Query("ConestogaUser");
      checkPassword.equalTo("password", password);

      var mainQuery = Parse.Query.and(checkEmail, checkPassword);
      mainQuery.find()
      .then((results) => {
        results.length > 0 ? this.signIn(): alert('Wrong credentials');
      })
      .catch(function(error) {
        alert("Error: " + error.code + " " + error.message);
      });

    }
    signIn()  {
      if (this.validateEmail(this.state.email)) {
        this.props.navigation.navigate('SignUp', {userEmail: this.state.email});
      } else {
        alert('Invalid email');
      }
      }
      constructor(props) {
      super(props);
      this.signIn = this.signIn.bind(this);
    }
    render(){
      return (
        <View style={styles.MSContainer}>
          <View style={styles.MsLogo}>
            <Image
              source={logo}
              style={{width:250, height:150}}
            />
          </View>
          <View>
            <Text style={{marginLeft:20, color:'gray'}}>
              Microsoft Account  
              <Text
                style={{ color:'blue'}}>
                  &nbsp; What's This?
              </Text>
            </Text>
          </View>
          <View>
            <TextInput style = {styles.MSplaceInput}
              placeholder = "Username"
              placeholderTextColor = '#c9c5c2'
              autoCapitalize = "none"
              onChangeText = {this.handleEmail}
              />
            <TextInput style = {styles.MSplaceInput}
              placeholder = "Password"
              placeholderTextColor = '#c9c5c2'
              secureTextEntry={true}
              autoCapitalize = "none"
              onChangeText = {this.handlePassword}
              />
              <View>
                <CheckBox 
                style={{flex:1, padding:10,}}
                onClick={()=>this.onClick()}
                isChecked={this.state.isChecked}
                />
                <Text>
                  Keep me logged in
                </Text>
              </View>
          </View>
          <View>
            <TouchableOpacity
                  style = {styles.MSTextInputContainer}
                  onPress={() => this.logIn(this.state.email, this.state.password) }>
                  <Text style = {styles.ButtonText}> Sign In </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    //Microsoft Page Styles
    MsLogo: {
      paddingTop:100,
    },
    MSContainer:{
      flex:1,
      backgroundColor:'#fff',
      padding:20,
      //marginLeft:20
      //alignItems:'left',
      //justifyContent:'left',
    },
    MSTextInputContainer: {
      backgroundColor:'#007FC6', 
      width:100,
      justifyContent:'center',
      marginLeft: 13,
      padding:10,
      alignItems:'center'
    },
    MSplaceInput: {
      padding:10,
      height:40,
      marginLeft: 15,
      margin: 7,
      width:250,
      borderColor:'#aba398',
      borderWidth:1,
      backgroundColor:'#fff'
      //textAlign: 'center'
    },
  });
  
  export default MSLoginScreen;
