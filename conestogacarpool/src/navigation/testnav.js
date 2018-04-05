import React from "react";
import { StackNavigator } from "react-navigation";
import { AsyncStorage} from 'react-native';

//Screens
import SignUpScreen from '../screens/SignUp';
import MSLoginScreen from '../screens/MSLogin';
import TabNavMain from '../navigation/tabnavigator';
import ConfirmScreen from '../screens/Confirmation';
import Parse from 'parse/react-native';

Parse.setAsyncStorage(AsyncStorage);

//Stack Navigator for setting screen and navigation paths
const MainNavigationContainer  = StackNavigator(
  {
    SignUp: {
      screen: SignUpScreen,
      title: 'Sign Up'
    },
    MSLogin: {
      screen: MSLoginScreen,
      title: 'Microsoft Log In'
    },
    TabNav: {
      screen:TabNavMain,
      navigatorStyle: {
        //navBarHidden: false,
        title: 'Header title'
      }
    },
    Confirm: {
      screen:ConfirmScreen,
      title: 'Sign Up Confirmation'
    },
  },
  {
    initialRouteName: 'Confirm',
    headerMode: "none",
    navigatorStyle: {
      navBarHidden: true
    },
  }
);

export default class App extends React.Component {

  componentWillMount() {
    Parse.initialize('OZuPdqt9hfWl20AixyvWuQH1bAEKEfaG7fMAxL0T', '7diNfy6vKZrKB3edvl7xxG3wON2gsPE2SClWjVmN');
    Parse.serverURL = 'https://parseapi.back4app.com/';
  }
  static navigationOptions = {
    header: 'none',
    //title: 'Hello'
  }
  render() {
    Parse.User.enableUnsafeCurrentUser();
    var currentUser = Parse.User.currentAsync();
    if (currentUser._sessionToken) {
      Parse.User.become(currentUser._sessionToken).then(function (user) {
        // The current user is now set to user.
      }, function (error) {
        // The token could not be validated.
      });
      return <TabNavMain />;
    } else {
        return <MainNavigationContainer />;
    }
  }
}
 