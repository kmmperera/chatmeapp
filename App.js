//react to react native

//import { StatusBar } from 'expo-status-bar';

import React,{useEffect,useState ,useRef} from "react";
import { StyleSheet, Text, View ,TouchableOpacity,Button} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import store from './store';
import { Provider } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";



import HomeScreen from './pages/home';
import SigninScreen from './pages/signin';
import SignupScreen from './pages/signup';
import ProfileDetailsScreen from './pages/profiledetails';
import ChatsScreen from './pages/chats';
import WorkDetailsScreen from './pages/workdetails';
import ContactScreen from './pages/contacts';
import InboxScreen from './pages/inbox';
import NewHomeScreen from './pages/newhome';
import styles from './pages/styles';


import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export default function App() {
const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

useEffect(() => {
  //  registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);



  return (
  //  <View style={styles.container}>
<Provider store={store}>
    <NavigationContainer >
	
      <Stack.Navigator>
      <Stack.Screen name="Newhome" component={NewHomeScreen}
        options={{ title: 'Chatme' }}
       />

        <Stack.Screen name="Home" component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
	<Stack.Screen name="Signin" component={SigninScreen} />
	<Stack.Screen name="Signup" component={SignupScreen} />
	<Stack.Screen name="WorkDetails" component={WorkDetailsScreen} />
        <Stack.Screen name="ProfileDetails" component={ProfileDetailsScreen} />
        <Stack.Screen name="Chats" component={ChatsScreen} />
        <Stack.Screen name="Contacts" component={ContactScreen} />
        <Stack.Screen name="Inbox" component={InboxScreen} />

      </Stack.Navigator>
	
    </NavigationContainer>
</Provider>
     // <StatusBar style="auto" />
  //  </View>
  );
}





