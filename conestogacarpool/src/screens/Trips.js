import React, { Component } from "react";
import { StyleSheet, Text, View, 
  ScrollView, TextInput, Button, Image, 
  AsyncStorage, TouchableOpacity} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MatCommIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Parse from 'parse/react-native';

Parse.setAsyncStorage(AsyncStorage);
const navigate = ({ navigation }) => (<TripView navigation={navigation}/>);

class TripScreen extends Component{

  requestTrip()  {
    this.props.navigation.navigate('My Trips', {title:'My Trips'});
  }

  offerRide(){
    this.props.navigation.navigate('Requested Trips', {title: 'Requested Trips'});
  }

  constructor(props) {
    super(props);
    this.requestTrip = this.requestTrip.bind(this);
    this.offerRide = this.offerRide.bind(this);
  }

    render(){
      const { params } = this.props.navigation.state;
      const navigation = this.props.navigation;
      return (
        <View style={styles.container}>
          <View style={styles.btnContainer}>
            <TouchableOpacity
                  style = {styles.signInButton}
                  onPress = { () => this.requestTrip()}>
                  <View style={{flexDirection:'row'}}>
                    <MatCommIcons name="car-sports" size={30} style = {{color: 'white'}}/>
                    <Text style = {styles.ButtonText}>  My Trips </Text>
                  </View>
            </TouchableOpacity>
            <TouchableOpacity
                  style = {styles.signUpButton}
                  onPress={ () => this.offerRide() }>
                  <View style={{flexDirection:'row'}}>
                    <MatCommIcons name="human-handsup" size={30} style = {{color: 'white'}}/>
                    <Text style = {styles.ButtonText}>  List of Requests </Text>
                  </View>
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
      justifyContent: 'center',
      flexDirection: 'column'
    },
    btnContainer: {
      flex: 0.25,
      backgroundColor: '#efe7da',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'column',
      
    },
    signInButton: {
      backgroundColor: '#c7b199',
      padding: 10,
      margin: 7,
      height: 45,
      borderRadius:10,
      width: 250,
      alignItems: 'center',
    },
    signUpButton: {
      backgroundColor: '#736356',
      padding: 10,
      margin: 7,
      height: 45,
      borderRadius:10,
      width:250,
      alignItems: 'center',
    },
    ButtonText:{
      color: 'white',
      fontSize:18,
      fontWeight:'bold',
      marginBottom: 50,
    }
  });    
  
  export default TripScreen;
