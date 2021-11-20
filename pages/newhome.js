
import React,{useEffect} from "react";
import { StyleSheet, Text, View ,TouchableOpacity,Button} from 'react-native';
import { useDispatch, useSelector } from "react-redux";

import {signout,isUserLoggedIn} from '../actions/authactions';

import styles from './styles';
import NewContactScreen from './newcontacts';
import NewSigninScreen from './newlogin';

const NewHomeScreen = ({ navigation }) => {

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
	 <View style={styles.flexone}>
       

{auth.loggedin?	< >

<NewContactScreen navigation={navigation}/>

  </> :
  <View style={styles.flexone}  >
   <View style={styles.containerbig} >
  <Text style={styles.txtcenter}>Sign In </Text>
  <NewSigninScreen navigation={navigation}/>
       </View>

  <View style={styles.containerlil}>
  <Text style={styles.txtnormal}>Don't have an account yet ? </Text>
       <Button title="Signup"  style={styles.btn}
      onPress={() =>navigation.navigate('Signup')} />
     </View>
  </View>
}





	 </View>

	

  );
};
export default NewHomeScreen;