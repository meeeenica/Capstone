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
import gender from '../assets/Icons/gender.png'
import icnAcct from '../assets/Icons/profile.png';

import SignUpView from '../screens/SignUp';


Parse.setAsyncStorage(AsyncStorage);

const carList = []

class ProfileScreen extends Component{
  static navigationOptions = ({ navigation }) => ({
      title: `${navigation.state.params.title}`,
       headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
          headerStyle:{
              backgroundColor:'white',
          },
      });

    constructor(props) {
      super(props);

      this.handlePress = this.handlePress.bind(this);
    }

    render(){
      const { navigate } = this.props.navigation;
      var currentUser = Parse.User.current();
      var Cars = Parse.Object.extend("Car");
      var query = new Parse.Query(Cars);
      query.equalTo('userId', {
          __type: 'Pointer',
          className: '_User',
          objectId: Parse.User.current().id
      });
      query.find({
        success: function(results) {
            console.log(results)
            if(results.length > 0) {
              this.SampleData=[];
            for (var i = 0; i < results.length; i++) {
                var object = results[i];
                var carPlate = object.get("carPlateNumber");
                var carName = object.get("carMake") + " " + object.get("carModel")+ " " + object.get("carYear");
                var carItem = {"ID":object.id, "Info":carName, "Value":carPlate};
                console.log(carItem)
                //global.myCars.push(<ListItem key={object.id} title={carName} rightTitle={carPlate}/>);
                carList.push(carItem);
            }
            }
        }
        });
      return (
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.placeImage}
              source={usrlogo}
            />
            <View style={{margin:10, flexDirection:'row', justifyContent: 'center',}}>
              <Image
                style={{width:25, height:25}}
                roundAvatar
                source={gender}
              />
              <Text>Name</Text>
            </View>

          </View>
  
          <View >
            <List containerStyle={styles.inputContainer}>
              {
                carList.map((l, i) => (
                  <ListItem noBorder
                    titleStyle={styles.listItemStyle}
                    //roundAvatar
                    //avatar={{uri:l.avatar}}
                    key={i}
                    title={l.Info}
                    onPress={() => {this.handlePress()}}
                  />
                ))
              }
          </List>
          </View>
        </View>
      );
    }

    handlePress()  {
      this.props.navigation.navigate('MSLogin');
      /*switch(name)
      {
        case 'Account Information':
        {
          this.props.navigation.navigate('MSLogin');
        }
      }*/
  }

  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#efe7da',
      alignItems: 'center',
      justifyContent: 'center',
  
    },
    listItemStyle:{
      fontSize: 14,
      //color: 'red',
    },
    logoContainer: {
      //flex: 1,
      
    },
    inputContainer: {
      //flex: 1,
      justifyContent: 'center',
      width: 300,
      padding: 10,
      backgroundColor: 'white',
      margin: 20,
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
  
  export default ProfileScreen;
