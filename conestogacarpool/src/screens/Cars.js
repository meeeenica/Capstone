import React, { Component } from "react";
import { StyleSheet, Text, View, 
  ScrollView, TextInput, Button, Image, 
  AsyncStorage, TouchableOpacity} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';
import {List, ListItem, ListView} from 'react-native-elements';

import Parse from 'parse/react-native';

Parse.setAsyncStorage(AsyncStorage);

global.myCars = [];

class AccountInfo extends React.Component{

  constructor(props) {
    super(props);
    this.renderCarOptions = this.renderCarOptions.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
  }

    componentWillMount() {
        Parse.initialize('OZuPdqt9hfWl20AixyvWuQH1bAEKEfaG7fMAxL0T', '7diNfy6vKZrKB3edvl7xxG3wON2gsPE2SClWjVmN');
        Parse.serverURL = 'https://parseapi.back4app.com/'; 
      }
      
  static navigationOptions = ({ navigation }) => ({
      title: `${navigation.state.params.title}`,
       headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
          headerStyle:{
              backgroundColor:'white',
          },
      });


  renderCarOptions(option) {
    //console.log(option);
    return (
        < ListItem 
            key={option.ID}
            title={option.Info}
            rightTitle={option.Value}
            hideChevron
        />
        )
    }

  renderOptions(carList) {
    console.log(carList);
      //return carList.map((p) => this.renderCarOptions(p));
      if(carList.length>0){
      const UserCars = carList;
      const listCars = UserCars.map((UserCars)=> 
      < ListItem 
        key={UserCars.ID}
        title={UserCars.Info}
        rightTitle={UserCars.Value}
        hideChevron
        />
      );
      return (
        <List containerStyle={styles.inputContainer}>
          {listCars}
        </List>
      );}
    }

    render(){
      const navigation = this.props.navigation;
      const carList = [];
      var currentUser = Parse.User.current();
      var Cars = Parse.Object.extend("Car");
      var query = new Parse.Query(Cars);
      //console.log(Parse.User.current().id);
      query.equalTo('userId', {
          __type: 'Pointer',
          className: '_User',
          objectId: Parse.User.current().id
      });
      query.find({
      success: function(results) {
          //console.log(results)
          if(results.length > 0) {
            this.SampleData=[];
          for (var i = 0; i < results.length; i++) {
              var object = results[i];
              var carPlate = object.get("carPlateNumber");
              var carName = object.get("carMake").toString() + " " + object.get("carModel").toString()+ " " + object.get("carYear").toString();
              /*console.log(carObject);
              var carItem = "{ Key=\""+object.id+
              "\" Info=\""+ carName +
              "\" rightTitle=\""+ carPlate +"\"}";*/
              var carItem = {"ID":object.id, "Info":carName, "Value":carPlate};
              //console.log(carItem)
              //global.myCars.push(<ListItem key={object.id} title={carName} rightTitle={carPlate}/>);
              carList.push(carItem);
              global.myCars.push(carItem);
          }
          }
      }
      });
      return( 
        <View style={styles.container}>
          {this.renderOptions(carList)}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style = {styles.uploadButton}>
                        <Text style = {styles.ButtonText}> Edit </Text>
                </TouchableOpacity>
            </View>
        </View>
      );
    }

    componentDidMount(){
        
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
  
  export default AccountInfo;
