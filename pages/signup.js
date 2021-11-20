import React,{useEffect,useState} from "react";
import {  Text, View ,TouchableOpacity,Button,TextInput} from 'react-native';
import { useDispatch, useSelector } from "react-redux";

import {signout} from '../actions/authactions';
import styles from './styles';
import {signup} from '../actions/authactions';
import registerForPushNotificationsAsync from './pushtokens';
const SignupScreen = ({ navigation }) => {

const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const[firstname,setFirstname]=useState("");
	const[lastname,setLastname]=useState("");
	const[email,setEmail]=useState("");
	const[password,setPassword]=useState("");
	const [expoPushToken, setExpoPushToken] = useState(null);
	const {user :userred}=auth;
	
	useEffect(() => {
   
      console.log(auth.signup);
    
	console.log(auth.error);
  }, [auth.signup,auth.error]);
useEffect(()=>{
		registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

},[]);
	
	const submitfunc=(e)=>{
		e.preventDefault();

		if(expoPushToken){
		const user={firstname,lastname,email,password,expoPushToken};
		dispatch(signup(user));
		cleanupfunc();
		}
		
	}
	const cleanupfunc=()=>{
		setFirstname("");
		setLastname("");
		setEmail("");
		setPassword("");
		
	}
	if(auth.signup){
		navigation.navigate("Signin");
		}


 return(
<>
		        <Text>First Name</Text>
			<TextInput  style={styles.txt} defaultValue={firstname} onChangeText={(firstname)=>{setFirstname(firstname);}}/>
		
			<Text>Last Name</Text>
			<TextInput  style={styles.txt} defaultValue={lastname} onChangeText={(lastname)=>{setLastname(lastname);}}/>
		
			<Text>Email</Text>
			<TextInput  style={styles.txt} defaultValue={email} onChangeText={(email)=>{setEmail(email);}}/>
		
			<Text>PASSWORD</Text>
			<TextInput style={styles.txt} defaultValue={password} onChangeText={(password)=>{setPassword(password);}}/>
	    
	         	<Button  title="SUBMIT" onPress={submitfunc}/>
	   
	   <Text>{userred.firstName && userred.firstName } </Text>
	   {auth.error && (<Text>{auth.error}</Text>) } 
	
     
		</>
 
	);
}

export default SignupScreen;