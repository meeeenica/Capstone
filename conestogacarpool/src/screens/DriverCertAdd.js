import React, { Component } from "react";
import { StyleSheet, Text, View, 
  ScrollView, TextInput, Button, Image, 
  AsyncStorage, TouchableOpacity} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';
import {List, ListItem} from 'react-native-elements';
//Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

import Parse from 'parse/react-native';

Parse.setAsyncStorage(AsyncStorage);

class DriverCertAddScreen extends Component{
  static navigationOptions = ({ navigation }) => ({
      title: `${navigation.state.params.title}`,
       headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
          headerStyle:{
              backgroundColor:'white',
          },
      });
    
    constructor(props) {
      super(props);
      
    }



    render(){
        const navigation = this.props.navigation;
        return (
         
          <ScrollView style={styles.container}>
          <View style={styles.innerContainer}>
              <Text style={styles.header}>
                Add Driver Certificate 
              </Text>
  
              <View style={styles.inputView}>
              <Ionicons name="md-car" 
                  size={16}  />
                  <TextInput style = {styles.placeInput}
                      placeholder = "Driving Licence"
                      autoCapitalize = "none"
                      onChangeText = {this.handleCarYear}
                  />
              </View>
              <View style={styles.inputView}>
              <Ionicons name="md-car" 
                  size={16}  />
                  <TextInput style = {styles.placeInput}
                      placeholder = "Licence Plate Number"
                      autoCapitalize = "none"
                      onChangeText = {this.handleCarYear}
                  />
              </View>
              <View style={styles.inputView}>
              <Ionicons name="md-car" 
                  size={16}  />
                  <TextInput style = {styles.placeInput}
                      placeholder = "Car Make"
                      autoCapitalize = "none"
                      onChangeText = {this.handleCarYear}
                  />
              </View>
              <View style={styles.inputView}>
              <Ionicons name="md-car" 
                  size={16}  />
                  <TextInput style = {styles.placeInput}
                      placeholder = "Car Color"
                      autoCapitalize = "none"
                      onChangeText = {this.handleCarYear}
                  />
              </View>
              <View style={styles.inputView}></View>
  
              <View style={styles.buttonsContainer}>
                  <TouchableOpacity style = {styles.addButton}>
                          <Text style = {styles.ButtonText}> Add </Text>
                  </TouchableOpacity>
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
        },
        innerContainer:{
            flex:1,
            backgroundColor: '#fff',
            margin: 40,
            marginBottom: 10,
            paddingTop: 20,
            paddingBottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
        },
        header:{
            fontSize: 25,
            margin: 10,
        },
        inputView:{
            //flexDirection:'column',
            flex:1,
            alignSelf:'stretch',
            //width:300,
            marginLeft:25,
            marginRight:25,
            alignItems: 'center',
            flexDirection: 'row',
            borderTopColor: '#736356',
            borderTopWidth: 1,
            padding: 15,
        },
        placeInput:{
          borderTopColor: '#736356',
          borderBottomColor: '#736356',
          marginLeft: 15,
          flex: 1,
        },
      addButton: {
          backgroundColor: '#c7b199',
          padding: 10,
          margin: 7,
          height: 40,
          borderRadius:10,
          width: 100,
          alignItems: 'center'
      },
      ButtonText:{
        color: 'white',
        fontSize:18,
        fontWeight:'bold'
      }
      
    });    
  
  export default DriverCertAddScreen;