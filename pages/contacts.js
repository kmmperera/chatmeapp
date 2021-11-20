import React,{useEffect,useState,useRef} from "react";
import {  Text, View ,Button,TouchableHighlight,StyleSheet,FlatList} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import {getallusers} from '../actions/admin/getuseractions';

const ContactScreen = ({ navigation }) => {

		const dispatch=useDispatch();
		const auth=useSelector((state)=>{return state.auth});
		const {user :userred}=auth;
		const allusers=useSelector((state)=>{return state.users});
		const[reciever,setReciever]=useState(null);


	useEffect(()=>{

		 dispatch(getallusers());
			
		},[]);


	return(
		
	<View  style={styles.flexone}>
	{
	allusers.users && ( <View  style={styles.flexone}>
	
		<FlatList
        
        data={allusers.users} 
        renderItem={({ item }) => (
          <TouchableHighlight onPress={()=>{
          navigation.navigate("Inbox",{_id:item._id});
          }} >
          <View style={styles.views} >
          <Text  style={styles.texts}>{item.firstName}  </Text>
          </View>
	 </TouchableHighlight> )
          }
        keyExtractor={(item) => item._id}
  
 />
           
		</View> )

		}

	</View>


	);


}
const styles = StyleSheet.create({
flexone:{
  flex: 1,

},
views:{
borderBottomColor:"black",
borderBottomWidth:1 

},
texts:{
height:70, 
backgroundColor: "#DDDDDD",

},


});



export default ContactScreen;