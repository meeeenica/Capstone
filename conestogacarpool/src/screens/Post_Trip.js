import React, { Component } from "react";
import { StyleSheet, Text, View, 
    ScrollView, TextInput, Button, Image, 
    AsyncStorage, TouchableOpacity} from 'react-native';
import {Header} from 'react-native-elements';
import Parse from 'parse/react-native';
import { StackNavigator } from 'react-navigation';
import { Picker } from 'react-native-picker-dropdown';
import DateTimePicker from 'react-native-modal-datetime-picker';
import MultiSelect from 'react-native-multiple-select';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { MAP_TYPES } from 'react-native-maps';



//Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

Parse.setAsyncStorage(AsyncStorage);
const navigate = ({ navigation }) => (<PostTripView navigation={navigation}/>);

class PostTrip extends Component{
  state = {
    departureLocation: {
      latitude: 0,
      longitude: 0
    },
    departureLocationString: "",
    destinationLocation: {
      latitude: 0,
      longitude: 0
    },
    departureAddress: "",
    destinationAddress: "",
    destinationLocationString: "",
    departure_time: new Date(),
    note: "",
    gender_preference: false,
    seats: 0,
    car: "",
    frequency: [],
    price: 0,
    isDateTimePickerVisible: false,
    items: [],
  }


  componentWillMount() {
    Parse.initialize('OZuPdqt9hfWl20AixyvWuQH1bAEKEfaG7fMAxL0T', '7diNfy6vKZrKB3edvl7xxG3wON2gsPE2SClWjVmN');
    Parse.serverURL = 'https://parseapi.back4app.com/';
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    this.setState({ departure_time: date })
    this._hideDateTimePicker();
  };

  handleDeparture = (text) => {
    this.setState({departureLocation : text})
    this.setState({departureLocationString : text.lat + "," + text.lng})
  }

  handleDestination = (text) => {
    this.setState({destinationLocation : text})
    this.setState({destinationLocationString : text.lat + "," + text.lng})
  }

  handleDepartureAddress = (text) => {
    this.setState({ departureAddress: text })
  }

  handleDestinationAddress = (text) => {
    this.setState({ destinationAddress: text })
  }

  handleDepartureTime = (text) => {
    this.setState({ departure_time: text })
  }
  
  handleNote = (text) => {
    this.setState({ note: text })
  }

  handleGenderPreferences = (bool) => {
    this.setState({ gender_preference: bool })
  }

  handleSeats = (number) => {
    this.setState({ seats: Number.parseInt(number, 10) })
  }

  handleCar = (text) => {
    this.setState({ car: text })
  }

  handleFrequency = selectedItems => {
    this.setState({ frequency: selectedItems });
  };

  handlePrice = (number) => {
    //number = int.Parse(number);
    var tripPrice = Number.parseInt(number, 10);
    this.setState({ price: tripPrice })
  }

  submitButtonHandler = () => {
    this.postTrip(this.state.departureLocation, this.state.destinationLocation, this.state.departure_time,
      this.state.note,this.state.gender_preference,this.state.seats,
      this.state.car,this.state.frequency,this.state.price, this.state.departureAddress, this.state.destinationAddress);
  };

  logOutButtonHandler() {
    const { params } = this.props.navigation.state;
    Parse.User.logOut().then(() => {
      const { params } = this.props.navigation.state;
      var currentUser = Parse.User.currentAsync();  // this will now be null
      console.log(currentUser);
      this.props.navigation.navigate('NavScreen', {title: ''});//
    });
  }

  postTrip = (departureLocation, destinationLocation, departure_time, note, gender_preference, seats, car, frequency, price, departureAddress, destinationAddress) => {
    var currentUser = Parse.User.currentAsync();
    var Trip = Parse.Object.extend("Trip");
    var trip = new Trip();
    var primaryTripId = "";
    var destinationGeoPoint = new Parse.GeoPoint({latitude: destinationLocation.lat, longitude: destinationLocation.lng});
    trip.set("Status", "Active");
    trip.set("PrimaryTripId", trip.id);
    trip.set("Departure", departureLocation);
    trip.set("Destination", destinationGeoPoint);
    trip.set("Destination_address", destinationAddress);
    trip.set("Departure_address",departureAddress);
    trip.set("Departure_time", departure_time);
    trip.set("Note", note);
    trip.set("userId", { "__type": "Pointer", "className": "_User", "objectId": Parse.User.current().id } );
    trip.set("Gender_Preference", gender_preference);
    trip.set("Seats", seats);
    trip.set("SeatsAvailable", seats);
    trip.set("Car", car);
    trip.set("Frequency", frequency);
    trip.set("Price", price);

    trip.save(null, {
      success: function(trip) {
        // Hooray! Let them use the app now.
        primaryTripId = trip.id;
        if(frequency.length > 0) {
          for(var i = 0; i < frequency.length; i++) {
            var currentUser = Parse.User.currentAsync();
            var Trip = Parse.Object.extend("Trip");
            var trip = new Trip();
            var frequencyArray = [frequency[i]];
            trip.set("Status", "Active");
            trip.set("PrimaryTripId", primaryTripId);
            trip.set("Departure", departureLocation);
            trip.set("Destination", destinationGeoPoint);
            trip.set("Destination_address", destinationAddress);
            trip.set("Departure_address",departureAddress);
            trip.set("Departure_time", departure_time);
            trip.set("Note", note);
            trip.set("userId", { "__type": "Pointer", "className": "_User", "objectId": Parse.User.current().id } );
            trip.set("Gender_Preference", gender_preference);
            trip.set("Seats", seats);
            trip.set("SeatsAvailable", seats);
            trip.set("Car", car);
            trip.set("Frequency", frequencyArray);
            trip.set("Price", price);
    
            trip.save(null, {
              success: function(trip) {
                // Hooray! Let them use the app now
              },
              error: function(trip, error) {
                // Show the error message somewhere and let the user try again.
                alert("Error: " + error.code + " " + error.message);
              }
            });
          }
        }
      },
      error: function(trip, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });
    
  }

  constructor(props) {
    super(props);
    this.logOutButtonHandler = this.logOutButtonHandler.bind(this);
  }

    render(){
        const { navigate } = this.props.navigation;
        const { frequency } = this.state;
        var currentUser = Parse.User.currentAsync();
        return (
          <ScrollView style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.header}>
                    Trip Details
                </Text>
                <View style={styles.inputView}>
                    <Ionicons name="md-search" 
                        size={16}  />
                    <GooglePlacesAutocomplete 
                        placeholder='Enter starting point'
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        fetchDetails={true}
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                          this.handleDepartureAddress(details.formatted_address);
                          this.handleDeparture(details.geometry.location);
                        }}
                        onChangeText = {this.handleAddress}
                        getDefaultValue={() => {
                          return '';//'200 Old Carriage Dr.'; // text input default value
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
                          loader: {
                            display: "none"
                          },
                          poweredContainer: {
                            display: "none",
                          },
                          container: {
                            //display: "none",
                            backgroundColor: "white"
                          },
                          textInputContainer: {
                            //display: "none"
                          },
                          predefinedPlacesDescription: {
                            color: '#1faadb',
                          },
                        }}
                        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                      currentLocationLabel={'Current Location'}
                        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                        GoogleReverseGeocodingQuery={{
                          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                          
                        }}
                      />
                </View>
                <View style={styles.inputView}>
                    <Ionicons name="md-search" 
                        size={16}  />
                    <GooglePlacesAutocomplete
                        placeholder='Enter destination'
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        fetchDetails={true}
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                          this.handleDestinationAddress(details.formatted_address);
                          this.handleDestination(details.geometry.location);
                        }}
                        onChangeText = {this.handleAddress}
                        getDefaultValue={() => {
                          return '';//'53 Verona street'; // text input default value
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
                          loader: {
                            display: "none"
                          },
                          poweredContainer: {
                            display: "none",
                          },
                          container: {
                            //display: "none",
                            backgroundColor: "white",   
                          },
                          textInpoutContainer: {
                            //display: "none"
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
                </View>
                <View style={styles.inputView}>
                    <Text>Date: </Text>
                    <TouchableOpacity onPress={this._showDateTimePicker} style = {styles.placeInput}>
                      <Text>{this.state.departure_time.toDateString()}</Text>
                    </TouchableOpacity>
                    <DateTimePicker style={{height:200}}
                      mode="datetime"
                      isVisible={this.state.isDateTimePickerVisible}
                      onConfirm={this._handleDatePicked}
                      onCancel={this._hideDateTimePicker}
                    />
                </View>
                <View style={styles.inputView}>
                    <Ionicons name="md-search" 
                        size={16}  />
                    <TextInput style = {styles.placeInput}
                        placeholder = "Notes"
                        //placeholderTextColor = '#c9c5c2'
                        //  secureTextEntry={true}
                        autoCapitalize = "none"
                        onChangeText = {this.handleNote}
                        />
                </View>
                <View style={styles.inputView}>
                    <Text>Gender: </Text>
                    <Picker style = {styles.placeInput}
                      selectedValue={false}
                      onValueChange={(itemValue, itemIndex) => this.setState({gender_preference: itemValue})}>
                      <Picker.Item label="Male" value = {false} />
                      <Picker.Item label="Female" value = {true} />
                    </Picker>
                </View>
                <View style={styles.inputView}>
                    <Text>Seats Available: </Text>
                    <Picker style = {styles.placeInput}
                      selectedValue={this.state.seats.toString()}
                      onValueChange={(itemValue, itemIndex) => this.setState({seats: itemValue})}>
                      <Picker.Item label="1" value ='1' />
                      <Picker.Item label="2" value = '2' />
                      <Picker.Item label="3" value = '3' />
                      <Picker.Item label="4" value = '4' />
                      <Picker.Item label="5" value = '5' />
                      <Picker.Item label="6" value = '6' />
                    </Picker>
                </View>
                <View style={styles.inputView}>
                    <Ionicons name="ios-car" 
                        size={16}  />
                    <TextInput style = {styles.placeInput}
                        placeholder = "Car"
                        //placeholderTextColor = '#c9c5c2'
                        //  secureTextEntry={true}
                        autoCapitalize = "none"
                        onChangeText = {this.handlePassword}
                        />
                </View>
                <View style={styles.inputViewTemp}>
                  <View style={{flexDirection:'row', flex:1}}>
                    <Text>Frequency</Text>
                    <MultiSelect
                      hideTags
                      items={[{
                        id: '1',
                        name: 'Monday',
                        alt: 'M',
                      }, {
                        id: '2',
                        name: 'Tuesday',
                        alt: 'T',
                      }, {
                        id: '3',
                        name: 'Wednesday',
                        alt: 'W',
                      }, {
                        id: '4',
                        name: 'Thursday',
                        alt: 'H',
                      }, {
                        id: '5',
                        name: 'Friday',
                        alt: 'F',
                      }, {
                        id: '6',
                        name: 'Saturday',
                        alt: 'St',
                      }, {
                        id: '7',
                        name: 'Sunday',
                        alt: 'Su',
                      }]}
                      uniqueKey="id"
                      ref={(component) => { this.multiSelect = component }}
                      onSelectedItemsChange={this.handleFrequency}
                      selectedItems={frequency}
                      selectText="Pick Frequency"
                      tagRemoveIconColor="#CCC"
                      tagBorderColor="#CCC"
                      tagTextColor="#CCC"
                      selectedItemTextColor="#CCC"
                      selectedItemIconColor="#CCC"
                      itemTextColor="#000"
                      displayKey="name"
                      searchInputStyle={{ color: '#CCC', alignSelf:'stretch' }}
                    />
                  </View>
                  <View  style={{flex:1, alignItems: 'center', alignSelf:'stretch'}}>
                    {(this.state.frequency.length > 0) && 
                    <View style={{flex:1, alignItems: 'center', alignSelf:'stretch'}}>
                      {this.multiSelect.getSelectedItemsExt(frequency)}
                    </View>
                    }
                  </View>
                </View>
                <View style={styles.inputView}>
                    <Ionicons name="md-search" 
                        size={16}  />
                    <TextInput style = {styles.placeInput}
                        placeholder = "Price"
                        //placeholderTextColor = '#c9c5c2'
                        //  secureTextEntry={true}
                        autoCapitalize = "none"
                        keyboardType="numeric"
                        onChangeText = {this.handlePrice}
                        />
                </View>
                <View style={styles.inputView}>
                <TouchableOpacity
                      style = {styles.signInButton}
                      onPress = {() => this.submitButtonHandler()}>
                      <Text style = {styles.ButtonText}> Submit </Text>
                </TouchableOpacity>
                <TouchableOpacity
                      style = {styles.signInButton}
                      onPress = {() => this.logOutButtonHandler()}>
                      <Text style = {styles.ButtonText}> Log Out </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )
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
    inputViewTemp:{
      flex:1,
      alignSelf:'stretch',
      //width:300,
      marginLeft:25,
      marginRight:25,
      //alignItems: 'center',
      flexDirection: 'column',
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
    }
})

export default PostTrip;