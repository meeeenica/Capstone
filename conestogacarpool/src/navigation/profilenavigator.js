import React from "react";
import { StackNavigator } from "react-navigation";


//Screens
import AccountInfoScreen from '../screens/AccountInfo';
import AddCarScreen from '../screens/AddCarScreen';
import AddressBookScreen from '../screens/AddressBook';
import CarScreen from '../screens/Cars';
import DriverCertScreen from '../screens/DriverCert';
import PaymentScreen from '../screens/Payment';
import PolicyScreen from '../screens/Policy';
import ProfileScreen from '../screens/Profile';
import RandRScreen from '../screens/RandR';


//Stack Navigator for setting screen and navigation paths
const NavigationContainer  = StackNavigator(
  {
    'Account Info': {
      screen: AccountInfoScreen,
      navigationOptions: {title: 'Account Information',}
    },
    'Add Car': {
      screen: AddCarScreen,
      navigationOptions: {title: 'Add Car'}
    },
    'Address Book': {
      screen: AddressBookScreen,
      navigationOptions: {title: 'Address Book'}
    },
    Cars: {
      screen: CarScreen,
      navigationOptions: {title: 'My Registered Cars'}
    },
    'Driver Cert': {
      screen: DriverCertScreen,
      navigationOptions: {title: 'Driver Certificate'}
    },
    Payment: {
      screen: PaymentScreen,
      navigationOptions: {title:'Payment'}
    },
    Policy: {
      screen: PolicyScreen,
      navigationOptions: {title:'Policy'}
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {title: 'My Profile'}
    },
    RandR:
    {
      screen:RandRScreen,
      navigationOptions: {title: 'Ratings & Reviews'}
    }
  },
  {
    initialRouteName: 'Profile',
    headerMode: 'screen',
    header: 'My Profile'
    //navigationOptions: {
    //    headerVisible: false,
    //}
  }
);

export default class App extends React.Component {
  static navigationOptions = {
    header: null,
  }
  render() {
    return <NavigationContainer />;
  }
}