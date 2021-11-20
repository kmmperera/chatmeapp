import React,{useEffect,useState} from "react";
import {  Text, View ,TouchableOpacity,Button,TextInput} from 'react-native';
import { useDispatch, useSelector } from "react-redux";

import {signout} from '../actions/authactions';
import styles from './styles';

import {signin} from '../actions/authactions';

const SigninScreen = ({ navigation }) => {

 
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const[username,setUsername]=useState("");
	const[password,setPassword]=useState("");
	const {user :userred}=auth;
	const [authstate,setAuthstate]=useState(auth.loggedin);
	
	useEffect(() => {
   
      console.log(userred.firstName);
    
	console.log(auth.error);
  }, [userred.firstName,auth.error]);

	useEffect(() => {
   
      
    if(auth.loggedin){navigation.navigate("Home")}
	
  }, [auth.loggedin]);
	
	const submitfunc=()=>{
		
		const user={username,password};
		dispatch(signin(user));
		cleanupfunc();
	}
	const cleanupfunc=()=>{
		setUsername("");
		setPassword("");
		}

	// if(auth.loggedin){navigation.navigate("Home")}

return(
 
 


	<>
		
   <Text>USERNAME</Text>
   <TextInput style={styles.txt} defaultValue={username} onChangeText={(username)=>{setUsername(username);}}/>
   <Text>PASSWORD</Text>
   <TextInput style={styles.txt} defaultValue={password}  onChangeText={(password)=>{setPassword(password);}}/>
   <Button  title="SUBMIT" onPress={submitfunc}/>
	  
	  </>



	);
}

export default SigninScreen;