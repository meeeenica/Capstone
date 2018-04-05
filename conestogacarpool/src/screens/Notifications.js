import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button, Image, AsyncStorage, TouchableOpacity} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Parse from 'parse/react-native';

import logo from '../assets/csmr_logo.png'

import SignUpView from '../screens/SignUp';


Parse.setAsyncStorage(AsyncStorage);

class SignInScreen extends Component{

  
    state = {
      startPlaceId: "",
      finishPlaceId: ""
    }
    handleStartPlaceId = (text) => {
      this.setState({startPlaceId : text})
    }

    handleFinishPlaceId = (text) => {
      this.setState({finishPlaceId : text})
    }

    saveTrip(startPlaceId, finishPlaceId) {

    }

    constructor(props) {
      super(props);
      this.handlePress = this.handlePress.bind(this);
    }

    render(){
      const { navigate } = this.props.navigation;
      return (
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.placeImage}
              source={logo}
            />
          </View>
  
          <View style={styles.inputContainer}>
          <GooglePlacesAutocomplete
            placeholder='Enter departure'
            minLength={2} // minimum length of text to search
            autoFocus={false}
            fetchDetails={true}
            onPress={(data) => { // 'details' is provided when fetchDetails = true
              console.log(data);
              alert(data.place_id);
              this.handleStartPlaceId(data.place_id);
            }}
            onChangeText = {this.handleAddress}
            getDefaultValue={() => {
              return ''; // text input default value
            }}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'AIzaSyCxon7lJqu1aMOWk3MrQSJyXZwE18dwWSI',
              language: 'en', // language of the results
              types: 'address', // default: 'geocode'
            }}
            styles={{
              description: {
                fontWeight: 'bold',
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
            
            currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
            currentLocationLabel="Current location"
            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={{
              // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
              
            }}
          />

<GooglePlacesAutocomplete
            placeholder='Enter destination'
            minLength={2} // minimum length of text to search
            autoFocus={false}
            fetchDetails={true}
            onPress={(data) => { // 'details' is provided when fetchDetails = true
              console.log(data);
              alert(data.place_id);
              this.handleFinishPlaceId(data.place_id);
            }}
            onChangeText = {this.handleAddress}
            getDefaultValue={() => {
              return ''; // text input default value
            }}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'AIzaSyCxon7lJqu1aMOWk3MrQSJyXZwE18dwWSI',
              language: 'en', // language of the results
              types: 'address', // default: 'geocode'
            }}
            styles={{
              description: {
                fontWeight: 'bold',
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
            
            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={{
              // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
              
            }}
          />

          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
                  style = {styles.signInButton}
                  onPress = {
                      () => this.login(this.state.address, this.state.password)
                  }>
                  <Text style = {styles.ButtonText}> Sign In </Text>
            </TouchableOpacity>
            <TouchableOpacity
                  style = {styles.signUpButton}
                  onPress={() => this.handlePress() }>
                  <Text style = {styles.ButtonText}> Sign Up </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    handlePress()  {
      this.props.navigation.navigate('MSLogin');
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
      width: 120,
      height: 90
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
