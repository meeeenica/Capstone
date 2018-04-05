import React from "react";
import { StackNavigator } from "react-navigation";


//Screens
import AcctInfoScreen from '../screens/AccountInfo';
import AddBookScreen from '../screens/AddressBook';
import AddBookScreenAdd from '../screens/AddressBookAdd';
import AddCarScreen from '../screens/AddCarScreen';
import CarScreen from '../screens/Cars';
import ConfirmScreen from '../screens/Confirmation';
import DesFileScreen from '../screens/designFile';
import DriveCertScreen from '../screens/DriverCert';
import DriveCertAddScreen from '../screens/DriverCertAdd';
import ReqScreen from '../screens/ListOfRequests';
import TripListScreen from '../screens/ListOfTrips';
import MSLoginScreen from '../screens/MSLogin';
import NotifsScreen from '../screens/Notifications';
import PaymentScreen from '../screens/Payment';
import PolicyScreen from '../screens/Policy';
import PostTripScreen from '../screens/Post_Trip';
import ProfileScreen from '../screens/Profile';
import RandRScreen from '../screens/RandR';
import SearchScreen from '../screens/Search';
import SignInScreen from '../screens/SignIn';
import SignUpScreen from '../screens/SignUp';
import TripDetailsScreen from '../screens/TripDetails';
import TripsScreen from '../screens/Trips';


//Stack Navigator for setting screen and navigation paths
const NavigationContainer  = StackNavigator(
  {
    AccountInfo:  {      screen : AcctInfoScreen,         title: 'AccountInfo'              },
    AddressBook:  {      screen : AddBookScreen,          title: 'AddressBook'              },
    AddressBookAdd:  {      screen : AddBookScreenAdd,          title: 'AddressBook Add'     },
    AddCar:       {      screen : AddCarScreen,           title: 'AddCar'                   },
    Car:          {      screen : CarScreen,              title: 'Car'                      },
    Confirmation: {      screen : ConfirmScreen,          title: 'Confirmation'             },
    designFile:   {      screen : DesFileScreen,          title: 'designFile'               },
    DriverCert:   {      screen : DriveCertScreen,        title: 'DriverCert'               },
    DriverCertAdd:   {      screen : DriveCertAddScreen,        title: 'DriverCertAdd'               },
    Requests:     {      screen : ReqScreen,              title: 'Requests'                 },
    TripList:     {      screen : TripListScreen,         title: 'TripList'                 },
    MSLogin:      {      screen : MSLoginScreen,          title: 'MSLogin'                  },
    Notifs:       {      screen : NotifsScreen,           title: 'Notifs'                   },
    Payment:      {      screen : PaymentScreen,          title: 'Payment'                  },
    Policy:       {      screen : PolicyScreen,           title: 'Policy'                   },
    PostTrip:     {      screen : PostTripScreen,         title: 'PostTrip'                 },
    Profile:      {      screen : ProfileScreen,          title: 'Profile'                  },
    RandR:        {      screen : RandRScreen,            title: 'RatingsAndReviews'        },
    Search:       {      screen : SearchScreen,           title: 'Search'                   },
    SignIn:       {      screen : SignInScreen,           title: 'SignIn'                   },
    SignUp:       {      screen : SignUpScreen,           title: 'SignUp'                   },
    TripDetails:  {      screen : TripDetailsScreen,      title: 'TripDetails'              },
    Trips:        {      screen : TripsScreen,            title: 'Trips'                    },
  },
  {
    initialRouteName: 'designFile',
    headerMode: 'screen',
    header: 'Designer File'
    //navigationOptions: {
    //    headerVisible: false,
    //}
  }
);

export default class App extends React.Component {
  static navigationOptions = {
    header: 'Hello',
  }
  render() {
    return <NavigationContainer />;
  }
}