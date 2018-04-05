import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button, Image, AsyncStorage, TouchableOpacity, ScrollView} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';
import { Picker } from 'react-native-picker-dropdown';
import Parse from 'parse/react-native';
//Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

Parse.setAsyncStorage(AsyncStorage);

class SignInScreen extends Component {

  state = {
    cars: [],
    selectedCar: 'a',
    carMake: "",
    carMakeIndex: 0,
    carModel: "",
    carYear: 0,
    carPlateNumber: "",
  }

  componentWillMount() {
    Parse.initialize('OZuPdqt9hfWl20AixyvWuQH1bAEKEfaG7fMAxL0T', '7diNfy6vKZrKB3edvl7xxG3wON2gsPE2SClWjVmN');
    Parse.serverURL = 'https://parseapi.back4app.com/';

      var CarMakes = Parse.Object.extend("CarMakesModels");
      var query = new Parse.Query(CarMakes);
      makesArray = [];
      modelsArray = [];

      query.ascending("brand");
      query.limit(1000);
      query.find({
        success: function(results) {
          if(results.length > 0) {
            for (var i = 0; i < results.length; i++) {
              var object = results[i];
              var carMake = object.get("brand");
              var carModel = object.get("models");
              makesArray.push(<Picker.Item key={i} value={carMake} label={carMake} />);
            }
          }
        } 
      }); 
      console.log(makesArray);
  }

  getCarModels() {
    var CarMakes = Parse.Object.extend("CarMakesModels");
    var query = new Parse.Query(CarMakes);
    query.equalTo("brand", this.state.carMake);
    query.limit(1000);
    query.find({
      success: function(results) {
        if(results.length > 0) {
          for (var i = 0; i < results.length; i++) {
            var object = results[i];
            var carModel = object.get("models");
            for(var i = 0; i < carModel.length; i++) {
              modelsArray.push(<Picker.Item key={i} value={carModel[i]} label={carModel[i]} />);
            }
          }
        }
        else {
          return null;
        }
      } 
    }); 
  }

  handleCarMake = (text) => {
    this.setState({ carMake: text })
    this.getCarModels();
  }

  handleCarModel = (text) => {
    this.setState({ carModel: text })
  }

  handleCarYear = (number) => {
    this.setState({ carYear: number })
  }

  handleCarPlateNumber = (text) => {
    this.setState({ carPlateNumber: text })
  }

  submitButtonHandler = () => {
    this.saveCar(this.state.carMake, this.state.carModel, this.state.carYear, this.state.carPlateNumber);
  };


  saveCar(carMake, carModel, carYear, carPlateNumber) {
    var Car = Parse.Object.extend("Car");
    var car = new Car();
    
    car.set("userId", { "__type": "Pointer", "className": "_User", "objectId": Parse.User.current().id } );
    car.set("carMake", carMake);
    car.set("carModel", carModel);
    car.set("carYear", carYear);
    car.set("carPlateNumber", carPlateNumber);

    car.save(null, {
      success: function(trip) {
        // Hooray! Let them use the app now.
        alert('Saved!');
      },
      error: function(trip, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });
  }

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
              Add car
            </Text>
            <View style={styles.inputView}>
            <Ionicons name="md-car" 
                size={16}  />
            <Picker style = {styles.placeInput}
                selectedValue = {this.state.carMake}
                onValueChange={this.handleCarMake}>
                {makesArray}
            </Picker>
            </View>
            <View style={styles.inputView}>
            <Ionicons name="md-car" 
                size={16}  />
            <Picker style = {styles.placeInput}
                selectedValue = {this.state.carModel}
                onValueChange={this.handleCarModel}>
                {modelsArray}
            </Picker>
            </View>
            <View style={styles.inputView}>
            <Ionicons name="md-car" 
                size={16}  />
            <TextInput style = {styles.placeInput}
                placeholder = "Car year"
                //placeholderTextColor = '#c9c5c2'
                //  secureTextEntry={true}
                autoCapitalize = "none"
                onChangeText = {this.handleCarYear}
            />
            </View>
            <View style={styles.inputView}>
            <Ionicons name="md-car" 
                size={16}  />
            <TextInput style = {styles.placeInput}
                placeholder = "Car plate"
                //placeholderTextColor = '#c9c5c2'
                //  secureTextEntry={true}
                autoCapitalize = "none"
                onChangeText = {this.handleCarPlateNumber}
            />
            </View>
            <View style={styles.inputView}>
                <TouchableOpacity
                      style = {styles.signInButton}
                      onPress = {() => this.submitButtonHandler()}>
                      <Text style = {styles.ButtonText}> Submit </Text>
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
    signInButton: {
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
    },
  });    
  
  export default SignInScreen;
