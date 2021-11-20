import React,{useEffect,useState,useRef} from "react";
import {  Text, View ,Button,TouchableHighlight,StyleSheet,FlatList} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import {getallusers} from '../actions/admin/getuseractions';
import {signout,isUserLoggedIn} from '../actions/authactions';

const NewContactScreen = ({ navigation }) => {

		const dispatch=useDispatch();
		const auth=useSelector((state)=>{return state.auth});
		const {user :userred}=auth;
		const allusers=useSelector((state)=>{return state.users});
		const[reciever,setReciever]=useState(null);

    const logout=()=>{dispatch(signout());}

	useEffect(()=>{

		 dispatch(getallusers());
			
		},[]);


	return(
		
	<View  style={styles.flexone}>
	{
	allusers.users && ( <View  style={styles.flexone}>
	{auth.loggedin?	<View >

<Button title="Sign out"  
      onPress={logout} />

</View>:null}
		<FlatList
        
        data={allusers.users} 
        renderItem={({ item }) => (
          <TouchableHighlight onPress={()=>{
          navigation.navigate("Inbox",{_id:item._id,name:item.firstName});
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
borderBottomColor:"white",
borderBottomWidth:1 ,


},
texts:{
 
height:70, 
backgroundColor: "#DDDDDD",
textAlignVertical:"center",
textAlign:"center"
},


});



export default NewContactScreen;