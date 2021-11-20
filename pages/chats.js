import React,{useEffect,useState,useRef} from "react";
import {  Text, View ,Button,TextInput , SafeAreaView, ScrollView,StyleSheet} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import {sendnotifications} from '../actions/admin/notifications';
import {getchat} from '../actions/admin/chats';
import {getallusers} from '../actions/admin/getuseractions';

import  io  from "socket.io-client";

const ChatsScreen = ({ navigation }) => {

	const dispatch=useDispatch();

		const auth=useSelector((state)=>{return state.auth});
		const chatsred=useSelector((state)=>{return state.chats});
		const {user :userred}=auth;
		const[message,setMessage]=useState("");
		const[reciever,setReciever]=useState(null);
		const allusers=useSelector((state)=>{return state.users});
		const [displaymessages,setDisplaymessages]=useState(chatsred.chats);
		let localchat=chatsred.chats;
		let chatuser={_id:reciever};
		
		const socket = useRef();
		const [arrivalMessage, setArrivalMessage] = useState(null);

		
		useEffect(() => {
  			socket.current = io("wss://impresaemployeedb.herokuapp.com:443");
  			socket.current.on("getMessage", (data) => {
    			 setArrivalMessage({
       		 sender: data.sender,
       		 message: data.message,
       			});
	

			
    			});
  		}, []);

		useEffect(() => {
    			socket.current.emit("addUser", userred._id);
   		       socket.current.on("welcome", (message)=>{setArrivalMessage(message)});
			//console.log(arrivalMessage);
  		}, [userred._id]);

		

		useEffect(() => {
	if(arrivalMessage){
    	let notifiction={message:arrivalMessage.message,reciever:userred._id,sender:arrivalMessage.sender};
	localchat=[...localchat,notifiction];
	dispatch({ type: "newmessage",payload:{localchat}});

	}
			console.log(arrivalMessage);
  		}, [arrivalMessage]);

		const goOnline=()=>{
		socket.current.emit("addUser", userred._id);
   		       socket.current.on("welcome", (message)=>{setArrivalMessage(message)});
			//console.log(arrivalMessage);
	}
	const socketMessage=()=>{
		let notifiction={message:message,reciever:reciever,sender:userred._id};
		localchat=[...localchat,notifiction];
		dispatch({ type: "newmessage",payload:{localchat}});
		socket.current.emit("sendMessage",{sender:userred._id, reciever:reciever, message:message});
		setMessage("");
	}

		
		
		const newstyles = StyleSheet.create({
			ownchat:{textAlign:"right",height:"50",marginTop:"10",marginBottom:"10",width:"40%",marginLeft:"50",
borderRadius:"5",},
			
			otherchat:{textAlign:"left",height:"50",marginTop:"10",width:"40%",borderRadius:"5",
marginBottom:"10",},
		});
		const ownchat={textAlign:"right",height:"50",marginTop:"10",marginBottom:"10",width:"40%",marginLeft:"50",
borderRadius:"5",};
		const otherchat={textAlign:"left",height:"50",marginTop:"10",width:"40%",borderRadius:"5",
marginBottom:"10",};
		useEffect(()=>{

		 dispatch(getallusers());
			
		},[]);
		
		useEffect(()=>{
		// if(reciever){
		// dispatch(getchat(chatuser));
		// }
		console.log("opennig chat");
		},[displaymessages]);

	const sendNoti=()=>{
	let notifiction={message:message,reciever:reciever,sender:userred._id};
	localchat=[...localchat,notifiction];
	dispatch({ type: "newmessage",payload:{localchat}});
	 dispatch(sendnotifications(notifiction));
	setMessage("");
	}
	const getChat=()=>{


	dispatch(getchat(chatuser));
	}




	return(
	   
		      <ScrollView style={{flex:1}} >

	
	<View  >
	<View className="formwrapper"  style={{display: "flex",alignItems: "center",justifyContent: "center",    flexDirection: "row",
}}>
	

	<View className="usernamewrapper">
	<View >
	{
	allusers.users && ( <View>
	{allusers.users.map((u,index) => (
		
            <Button title={u.firstName} key={u._id} onPress={() => setReciever(u._id)} />
              
           
          )) }
		</View> )

		}

	</View>

	<View><Button  title="CHAT" onPress={getChat}/></View>

	</View>

	<View className="chatboxwrapper">
	<View className="chatbox" >
	<View>{userred && localchat && (<View>{localchat.map((c,index)=>{
	//	let isownmessage;
	//if(userred._id ){
	//	 isownmessage = c.sender === userred._id  ;
	//}
	//style={isownmessage ? ownchat :otherchat  }
	//isownmessage ? newstyles.ownchat :newstyles.otherchat 
				return (<Text  key={index} >{c.message}</Text>)
				}
				)   }
				</View>)
		}

	</View>

	</View>
	<View><Text>Message</Text><TextInput  defaultValue={message} onChangeText={(message)=>{setMessage(message)}}/></View>


	<View><Button title="SEND"  onPress={sendNoti}/></View>
	<View><Button  title="GO ONLINE" onPress={goOnline}/></View>
	<View><Button  title="SOCKET MESSAGE" onPress={socketMessage}/></View>
	</View>
	</View>
	</View>
	
	
		</ScrollView>
	   

	);


}

export default ChatsScreen;