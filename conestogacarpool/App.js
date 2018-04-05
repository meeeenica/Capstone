import { Navigation } from 'react-native-navigation';
import { Provider } from "react-redux";
import { StackNavigator } from 'react-navigation';

//Screens
import NavScreen from '../conestogacarpool/src/navigation/navigation';

//Register Navigation Screen Component
Navigation.registerComponent('conestoga-carpool.NavScreen', () => NavScreen);


// Start an App
Navigation.startSingleScreenApp({
  screen: {
    screen: 'conestoga-carpool.NavScreen',
    title: 'Share My Ride',
    navigatorStyle: {
      navBarHidden: true
    }
  },
  headerMode: null
});

