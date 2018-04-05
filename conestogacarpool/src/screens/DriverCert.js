import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button, Image, AsyncStorage, TouchableOpacity} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';
import {List, ListItem} from 'react-native-elements';

import Parse from 'parse/react-native';

Parse.setAsyncStorage(AsyncStorage);

class DriverCertScreen extends Component{
  static navigationOptions = ({ navigation }) => ({
      title: `${navigation.state.params.title}`,
       headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
          headerStyle:{
              backgroundColor:'white',
          },
      });
    
    
      constructor(props) {
        super(props);
        this.renderDriverCertOptions = this.renderDriverCertOptions.bind(this);
        this.renderOptions = this.renderOptions.bind(this);
      }
    
        renderDriverCertOptions(option) {
            return (< ListItem titleStyle={styles.listItemStyle}
              key={option.ID}
              title={option.Info}
              rightTitle={option.Value}
              hideChevron
              //rightIcon={{ name: 'arrow-right', type: 'font-awesome', style: { marginRight: 10, fontSize: 15, } }}
            />)
        }
    
        renderOptions = () => {
          SampleData =  [
                      {"ID":1, "Info": "Driving Licence", "Value": "P1234-12345-12345"},
                      {"ID":2, "Info": "Licence Plate Number", "Value":"ABCD 741"},
                      {"ID":3, "Info": "Car Make", "Value":  "TOYOTA"}, 
                      {"ID":4, "Info": "Car Color", "Value":  "Blue"},
                    ]                  
          return SampleData.map((p) => (
            this.renderDriverCertOptions(p)
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
                      <Text style = {styles.ButtonText}> Upload </Text>
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
  
  export default DriverCertScreen;
