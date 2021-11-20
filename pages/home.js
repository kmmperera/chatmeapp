
import React,{useEffect} from "react";
import { StyleSheet, Text, View ,TouchableOpacity,Button} from 'react-native';
import { useDispatch, useSelector } from "react-redux";

import {signout,isUserLoggedIn} from '../actions/authactions';

import styles from './styles';



const HomeScreen = ({ navigation }) => {

const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

 

  useEffect(() => {
   console.log(auth.loggedin);
     // dispatch(isUserLoggedIn());
    	// dispatch(getallusers());
  }, []);
useEffect(() => {
   
      dispatch(isUserLoggedIn());
    	// dispatch(getallusers());
  }, []);






const logout=()=>{dispatch(signout());}
  return (
	 <View style={styles.container}>
       

{auth.loggedin?	< >


<View style={styles.container}>
       <Button title="Sign out"  style={styles.btn}
      onPress={logout} />
     </View>

<View style={styles.container}>
       <Button title="Profile Details"  style={styles.btn}
      onPress={() =>navigation.navigate('ProfileDetails')} />
     </View>



 <View style={styles.container}>
       <Button title="Contacts"  style={styles.btn}
      onPress={() =>navigation.navigate('Contacts')} />
     </View>    

 <View style={styles.container}>
       <Button title="New Home"  style={styles.btn}
      onPress={() =>navigation.navigate('Newhome')} />
     </View>        

  </> :null}

{!auth.loggedin?<>
<View style={styles.container}>
       <Button title="Signin"  style={styles.btn}
      onPress={() =>navigation.navigate('Signin')} />
     </View>

<View style={styles.container}>
       <Button title="Signup"  style={styles.btn}
      onPress={() =>navigation.navigate('Signup')} />
     </View>

<View style={styles.container}>
       <Button title="New Home"  style={styles.btn}
      onPress={() =>navigation.navigate('Newhome')} />
     </View>         
</> :null
}




	 </View>

	

  );
};
export default HomeScreen;