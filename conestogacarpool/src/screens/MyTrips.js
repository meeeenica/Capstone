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
Parse.setAsyncStorage(AsyncStorage);

global.myTrips = [];

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

  componentWillMount() {
    Parse.initialize('OZuPdqt9hfWl20AixyvWuQH1bAEKEfaG7fMAxL0T', '7diNfy6vKZrKB3edvl7xxG3wON2gsPE2SClWjVmN');
    Parse.serverURL = 'https://parseapi.back4app.com/';
    
    //this.getList();
    var query = new Parse.Query("Trip");
    query.equalTo("userId", { "__type": "Pointer", "className": "_User", "objectId": Parse.User.current().id });
    query.equalTo("PrimaryTripId", undefined);
    query.find({
    success: function(results) {
        global.myTrips = [];
        console.log(results);
        if(results.length>0)
        {
          for (var i = 0; i < results.length; i++) {
            console.log(i);
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
            global.myTrips.push(tripObject);
            this.renderOptions=this.renderOptions();
            //console.log('I am down here');
          }
          //this.renderOptions();
          //this.renderResults(trips);
        }
      }
    });
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
      //myTrips = []
    };

    this.mapView = null;
  }

  forceUpdateHandler(){
    this.forceUpdate();
  };

  

  handleDeparture = (text) => {
    this.setState({departureLocation : text})
    this.setState({departureLocationString : text.lat + "," + text.lng})
  }
  handleDestination = (text) => {
    this.setState({destinationLocation : text})
    this.setState({destinationLocationString : text.lat + "," + text.lng})
  }

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
    
  }

  renderOptions() {
    //console.log("Hello");
    //this.renderOptions=this.renderOptions();
    //console.log(global.listTrip.length);
    if(global.myTrips.length > 0) {
      //list = [].concat(global.listTrip);
      //console.log("YAROSLAV");
      return global.myTrips.map((p) => (
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

  postTrip()  {
    this.props.navigation.navigate('Post Trip', {title:'Post Trip'});
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={{flex:1}}>
            <List style={{flex:2}}>
                {this.renderOptions()}
            </List>
            <View  style={{flex:1, alignItems:'center', alignSelf:'stretch', paddingTop:10}}>
                <TouchableOpacity style = {styles.addButton}
                    onPress={ () => this.postTrip() }>
                    <Text style = {styles.ButtonText}> Post a Trip </Text>
                </TouchableOpacity>
            </View>
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
  addButton: {
    backgroundColor: '#736356',
    padding: 10,
    margin: 7,
    height: 40,
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonText:{
    color: 'white',
    fontSize:18,
    fontWeight:'bold'
  },
});

export default DisplayLatLng;
