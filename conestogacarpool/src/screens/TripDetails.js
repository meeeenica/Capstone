import React, { Component } from "react";
import { StyleSheet, Text, View, 
    ScrollView, TextInput, Button, Image, 
    AsyncStorage, TouchableOpacity,} from 'react-native';
import { Header } from 'react-native-elements';
import Parse from 'parse/react-native';
//Images
import usrlogo from '../assets/Icons/user.png';
import gender from '../assets/Icons/gender.png'
//Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import MatCommIcons from 'react-native-vector-icons/MaterialCommunityIcons';

Parse.setAsyncStorage(AsyncStorage);

class TripDetails extends Component {
    componentWillMount() {
        Parse.initialize('OZuPdqt9hfWl20AixyvWuQH1bAEKEfaG7fMAxL0T', '7diNfy6vKZrKB3edvl7xxG3wON2gsPE2SClWjVmN');
        Parse.serverURL = 'https://parseapi.back4app.com/';
      }

    joinButtonHandler = () => {
        this.joinTrip();
      };

    joinTrip() {
        const { params } = this.props.navigation.state;
        var query = new Parse.Query("JoinRequest");
        query.equalTo("tripId", params.result.tripId);
        query.equalTo("userId", Parse.User.currentAsync().id);
        query.find({
        success: function(results) {
            console.log(results);
           if(results) {
               alert("Can't join twice,sorry");
           }
           else if(results === 0) {
            var query = new Parse.Query("JoinRequest");
            var currentUserId = Parse.User.currentAsync().id;
            var JoinRequest = Parse.Object.extend("JoinRequest");
            var joinRequest = new JoinRequest();
    
            joinRequest.set("TripId", params.result.tripId);
            joinRequest.set("UserId", { "__type": "Pointer", "className": "_User", "objectId": Parse.User.current().id } );
            joinRequest.set("Status", "Awaiting reply");
    
            joinRequest.save(null, {
                success: function(joinRequest) {
                  // Hooray! Let them use the app now
                },
                error: function(trip, error) {
                  // Show the error message somewhere and let the user try again.
                  alert("Error: " + error.code + " " + error.message);
                }
              });
           }
        },
        error: function(error) {
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
    render(){
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        for(var i = 0; i < params.result.frequency.length; i++)
        {
            console.log(params.result.frequency[i]);
            switch(params.result.frequency[i] )
            {
                case 1: console.log("Mon");break;
                case 2: console.log("Tue");break;
                case 3: console.log("Wed");break;
                case 4: console.log("Thu");break;
                case 5: console.log("Fri");break;
                case 6: console.log("Sat");break;
                case 7: console.log("Sun");break;
            }
            var wkStart = params.result.frequency[0]; 
            var wkEnd = 0;
            console.log(wkStart);
            if ((params.result.frequency[i]+1 == params.result.frequency[i + 1])) {
                if(wkStart== params.result.frequency[i]){
                    console.log("Same");
                }
            }
            
        }
        return (
          <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.mapContainer}>
                    <Text></Text>
                </View>
                <View style={styles.driverContainer}>
                    <Image
                        style={styles.placeImage}
                        source={usrlogo}
                        />
                     <View style={{margin:5, flexDirection:'row', justifyContent: 'center',}}>
                        <Image
                            style={{width:20, height:20}}
                            roundAvatar
                            source={gender}
                        />
                        <Text style={styles.textName}> Name</Text>
                    </View>
                    <View style={styles.carContainer}>
                    <View style={{flexDirection:'row'}}>
                        <MatCommIcons name="alarm" size={20} style = {{color: '#efe7da'}}/>
                        <Text>{params.result.subtitle}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <MatCommIcons name="car-hatchback" size={20} style = {{color: '#efe7da'}}/>
                        <Text>{params.result.car}</Text>
                    </View>
                    </View>
                </View>

                <View style={styles.inputView}>
                    <Text style = {styles.placeInput}>Notes: {params.result.notes}</Text>
                </View>
                <View style={styles.inputView}>
                    <Text style = {styles.placeInput}>Seats: {params.result.seats}</Text>
                    <View style={{margin:5, flexDirection:'row', justifyContent: 'flex-end',}}>
                    <Image
                            style={{width:20, height:20}}
                            roundAvatar
                            source={gender}
                        />
                    <Image
                            style={{width:20, height:20}}
                            roundAvatar
                            source={gender}
                        />
                    <Image
                            style={{width:20, height:20}}
                            roundAvatar
                            source={gender}
                        />
                    <Image
                            style={{width:20, height:20}}
                            roundAvatar
                            source={gender}
                        />
                    </View>
                </View>
                <View style={styles.inputView}>
                    <Text style = {styles.placeInput}>Frequency: {params.result.frequency}</Text>
                </View>
                <View style={styles.inputView}>
                    <Text style = {styles.placeInput}>Price: {params.result.price}</Text>
                </View>
                
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity
                    style = {styles.signInButton}
                    onPress = {() => this.joinButtonHandler()}>
                    <View style={{flexDirection:'row'}}>
                        <MatCommIcons name="account-plus" size={30} style = {{color: 'white'}}/>
                        <Text style = {styles.ButtonText}>  Join </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style = {styles.signUpButton}>
                    <View style={{flexDirection:'row'}}>
                        <MatCommIcons name="comment-multiple-outline" size={30} style = {{color: 'white'}}/>
                        <Text style = {styles.ButtonText}>  Contact </Text>
                    </View>
                </TouchableOpacity>
            </View>
          </View>
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
        margin: 10,
        marginBottom: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapContainer:{
        height:200,
    },
    driverContainer:{
        height:80,
        flexDirection:'column',
        flex:1,
        margin:25,
        alignItems: 'center',
        flexDirection: 'row',
    },
    carContainer:{
        marginLeft:25,
        justifyContent: 'flex-end',
    },
    btnContainer: {
        backgroundColor: '#efe7da',
        //alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft:50,
        paddingRight:50,
        flexDirection: 'row',
        marginBottom: 50,
      },
    header:{
        fontSize: 25,
        margin: 10,
    },
    inputView:{
        flexDirection:'column',
        flex:1,
        marginLeft:25,
        marginRight:25,
        alignItems: 'center',
        flexDirection: 'row',
        borderTopColor: '#736356',
        borderTopWidth: 1,
    },
    signInButton: {
        backgroundColor: '#c7b199',
        padding: 10,
        margin: 7,
        height: 45,
        borderRadius:10,
        width: 130,
        alignItems: 'center',
      },
      signUpButton: {
        backgroundColor: '#736356',
        padding: 10,
        margin: 7,
        height: 45,
        borderRadius:10,
        width:130,
        alignItems: 'center',
      },
      ButtonText:{
        color: 'white',
        fontSize:18,
        fontWeight:'bold',
        marginBottom: 50,
      },
      placeInput:{
        borderTopColor: '#736356',
        borderBottomColor: '#736356',
        marginLeft: 15,
        flex: 1,
    },
})

export default TripDetails;