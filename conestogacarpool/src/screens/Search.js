import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  AsyncStorage
} from 'react-native';

import DateTimePicker from 'react-native-modal-datetime-picker';
import {List, ListItem, ListView} from 'react-native-elements';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Parse from 'parse/react-native';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { MAP_TYPES } from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const conestogaDoon = { description: 'Conestoga Doon Campus', place_id:"ChIJs3uM33iKK4gRonp0aDEFEGk" };
const conestogaWaterloo = { description: 'Conestoga Waterloo Campus', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};
const conestogaCambridge = { description: 'Conestoga Cambridge Campus', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const conestogaGuelph = { description: 'Conestoga Guelph Campus', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const origin = {latitude: 37.3318456, longitude: -122.0296002};
const destination = {latitude: 37.771707, longitude: -122.4053769};
const GOOGLE_MAPS_APIKEY = 'AIzaSyDgzPFp9P3-WZ8po9Um3e4KDCwrB6rOiS4';
Parse.setAsyncStorage(AsyncStorage);


global.listTrip = [];

class DisplayLatLng extends React.Component{
  
  state = {
    trips: [],
    selectedTrip: '',
    tripId: "",
    tripDate: "",
    tripPrice: 0,
    tripTo: "",
    tripFrom:"",
    isDateTimePickerVisible: false,
  }

  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    this.setState({ departure_time: date })
    this._hideDateTimePicker();
  };

  handleDepartureTime = (text) => {
    this.setState({ departure_time: text })
  }
  
  
  constructor(props) {
    super(props);
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    this.renderResults = this.renderResults.bind(this);
    this.renderOptions = this.renderOptions.bind(this);

    // AirBnB's Office, and Apple Park
    this.state = {
      departureLocation: {
        latitude: 0,
        longitude: 0
      },
      departureLocationString: "",
      destinationLocation: {
        latitude: 0,
        longitude: 0,
      },
      destinationLocationString: "",
      departure_time: new Date(),
    };

    this.mapView = null;
  }

  forceUpdateHandler(){
    this.forceUpdate();
  };

  componentWillMount() {
    Parse.initialize('OZuPdqt9hfWl20AixyvWuQH1bAEKEfaG7fMAxL0T', '7diNfy6vKZrKB3edvl7xxG3wON2gsPE2SClWjVmN');
    Parse.serverURL = 'https://parseapi.back4app.com/';
  }

  handleDeparture = (text) => {
    this.setState({departureLocation : text})
    this.setState({departureLocationString : text.lat + "," + text.lng})
  }
  handleDestination = (text) => {
    this.setState({destinationLocation : text})
    this.setState({destinationLocationString : text.lat + "," + text.lng})
  }

  submitButtonHandler = () => {
    //alert(event);
    //this.saveLocation(this.state.region.latitude.toPrecision(7),this.state.region.longitude.toPrecision(7))
    global.listTrip = [];
    //console.log(global.listTrip)
    this.state.departureLocation.latitude = 0;
    this.state.departureLocation.longitude = 0;
    this.state.destinationLocation.latitude = 0;
    this.state.destinationLocation.longitude = 0;
    this.forceUpdateHandler();
    //console.log(this.departureLocation, this.destinationLocation);
  };

  saveLocation = (userLatitude, userLongitude) => {
    var Location = Parse.Object.extend("Location");
    var loc = new Location();
    loc.set("userLatitude", userLatitude);
    loc.set("userLongitude", userLongitude);

    loc.save(null, {
      success: function(user) {
        // Hooray! Let them use the app now.
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });
  }

  getList() {
    var destination = new Parse.GeoPoint({latitude: this.state.destinationLocation.lat, longitude: this.state.destinationLocation.lng});
    var query = new Parse.Query("Trip");
    var CarMakes = Parse.Object.extend("Trip");
    query.withinKilometers("Destination", destination, 10);
    query.find({
      success: function(results) {
        global.listTrip=[];
        console.log(results);
        if(results.length>0)
        {
          for (var i = 0; i < results.length; i++) {
            //console.log(i);
            var object = results[i];
            var tripId = object.id;
            var departureTime = object.get("Departure_time");
            var formattedTIme = (departureTime.getMonth() + 1) + "/" +  departureTime.getDate() +
            "/" +  departureTime.getFullYear()+ " "+ departureTime.getHours()+":"+departureTime.getMinutes();
            //console.log("Hour is" + formattedTIme);
            var price = object.get("Price");
            var note = object.get("Note");
            var frequency = object.get("Frequency");
            var seats = object.get("Seats");
            var car = object.get("Car");
            var tripObject = {"tripId":tripId,
                        "subtitle": formattedTIme.toString(),
                        "price":price,
                        "note":note,
                        "frequency": frequency,
                        "seats": seats,
                        "car": car,
                        "destination":object.get("Destination_address",
                      )
                      };
            //console.log(tripObject);
            global.listTrip.push(tripObject);
            this.renderOptions=this.renderOptions();
            //console.log('I am down here');
          }
          //this.renderOptions();
          //this.renderResults(trips);
        }
      }
    });
  }

  renderOptions() {
    //console.log("Hello");
    //this.renderOptions=this.renderOptions();
    //console.log(global.listTrip.length);
    if(global.listTrip.length > 0) {
      //list = [].concat(global.listTrip);
      //console.log("YAROSLAV");
      return global.listTrip.map((p) => (
        this.renderResults(p)
      )
    )
    }
  }

  getDetails(result) {
    this.props.navigation.navigate('TripDetails', {result: result});
  }

  renderResults(result) {
    return (< ListItem titleStyle={styles.listItemStyle}
      key={result.tripId}
      title={"To " + result.destination}
      subtitle={result.subtitle}
      rightTitle={"$" +result.price}
      onPress={() => this.getDetails(result)}
    />
    )
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.inputContainer}>
          {(this.state.departureLocation.latitude !== 0 && this.state.departureLocation.longitude !== 0
          && this.state.destinationLocation.latitude !== 0 && this.state.destinationLocation.longitude !== 0) &&
          <MapView
            initialRegion={{
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            style={StyleSheet.absoluteFill}
            ref={c => this.mapView = c}
            >
            <MapViewDirections
              origin={this.state.departureLocationString}
              destination={this.state.destinationLocationString}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="hotpink"
              onReady={(result) => {
                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: (width / 20),
                    bottom: (height / 20),
                    left: (width / 20),
                    top: (height / 20),
                  }
                });
              }}
              onError={(errorMessage) => {
              }}
            />
          </MapView>
          }
          {(this.state.departureLocation.latitude == 0 && this.state.departureLocation.longitude == 0
          && this.state.destinationLocation.latitude != 0 && this.state.destinationLocation.longitude != 0) &&
          <View style={[styles.inputContainer]}>
            <GooglePlacesAutocomplete
                placeholder='Enter departure'
                minLength={2} // minimum length of text to search
                autoFocus={false}
                fetchDetails={true}
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                  this.handleDeparture(details.geometry.location);
                  console.log("Departure")
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
                  textInpoutContainer: {
                    //display: "none"
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb',
                  },
                }}
                predefinedPlaces={[conestogaDoon]}
                currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                currentLocationLabel="Current location"
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GoogleReverseGeocodingQuery={{
                  // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                  
                }}
              />
          </View>
          }
          <View style={[styles.inputContainer]}>
            {(this.state.departureLocation.latitude == 0 || this.state.departureLocation.longitude == 0
            || this.state.destinationLocation.latitude == 0 || this.state.destinationLocation.longitude == 0) &&
              <GooglePlacesAutocomplete
                placeholder='Where to?'
                minLength={2} // minimum length of text to search
                autoFocus={false}
                fetchDetails={true}
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                  this.handleDestination(details.geometry.location);
                  this.getList();
                  this.renderOptions();
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
                currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                currentLocationLabel="Current location"
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GoogleReverseGeocodingQuery={{
                  // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }}
              />
            }
          </View>
          {(this.state.destinationLocation.latitude == 5 && this.state.destinationLocation.longitude == 5) &&
            <View style={[styles.inputContainer]}>
            </View>
          }
          <View style={styles.inputContainer}>
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
          <View style={styles.buttonContainer}>
              <TouchableOpacity
                    style = {[styles.button, styles.bubble]}
                    onPress= {this.submitButtonHandler}>
                    <Text>Reset</Text>
              </TouchableOpacity>
          </View>
        </View>
          <ScrollView style={{flex:2}}>
            <List>
              {this.renderOptions()}
            </List>
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer:{
    flex: 1,
    alignSelf: 'stretch'
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    //height:200,
  },
  listItemStyle: {
    
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  inputContainer:{
    flex: 1,//0.6,
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 100,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    flex:0.5,
    //marginVertical: 20,
    margin:7,
    backgroundColor: 'transparent',
  },
  buttonText: {
    textAlign: 'center',
  },
});

export default DisplayLatLng;
