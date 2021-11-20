import React,{useEffect,useState,useRef,useCallback } from "react";
import {  Text, View ,Button,TextInput ,StyleSheet,ScrollView } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import {sendnotifications} from '../actions/admin/notifications';
import {getchat} from '../actions/admin/chats';
import {signout,isUserLoggedIn} from '../actions/authactions';


import  io  from "socket.io-client";


const InboxScreen = ({ navigation,route }) => {
		const dispatch=useDispatch();

		const auth=useSelector((state)=>{return state.auth});
		const chatsred=useSelector((state)=>{return state.chats});
		const {user :userred}=auth;
		const[message,setMessage]=useState("");
		const[reciever,setReciever]=useState(null);
	  const [displaymessages,setDisplaymessages]=useState(chatsred.chats);
		let localchat=chatsred.chats;
		let chatuser={_id:reciever};
		
		const socket = useRef();
		const [arrivalMessage, setArrivalMessage] = useState(null);

    const [propparams,setPropparams]=useState(route.params ?route.params:null); 
    const scrollViewRef = useRef();


  //  const setRef = useCallback(node => {
   // if (node) {
   //   node.scrollIntoView({ smooth: true })
  //  }
 // }, [])
  //ref={lastMessage ? setRef : null} 

    const logout=()=>{dispatch(signout());}
    if(!auth.loggedin){navigation.navigate("Newhome");}
	
   useEffect(() => {
      setPropparams( route.params );
      setReciever(route.params._id);
      dispatch(getchat({_id:route.params._id,loggedid:userred._id}));
      console.log(userred._id);
   }, []);

 useEffect(() => {
     console.log(route.params._id);
     // dispatch(getchat({_id:route.params._id}));
   }, []);


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
   		       socket.current.on("welcome", (message)=>{
              //  setArrivalMessage(message)
              console.log(message);

                });
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
   		       socket.current.on("welcome", (message)=>{
               // setArrivalMessage(message)
                console.log(message);

                });
			//console.log(arrivalMessage);
	}
	const socketMessage=()=>{
		let notifiction={message:message,reciever:reciever,sender:userred._id};
		localchat=[...localchat,notifiction];
		dispatch({ type: "newmessage",payload:{localchat}});
		socket.current.emit("sendMessage",{sender:userred._id, reciever:reciever, message:message});
		    setMessage("");

	}

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
    <View style={styles.flexone}>
    
    <Text style={styles.nametext}>{propparams && propparams.name}</Text>
    {auth.loggedin?	<View >

<Button title="Sign out"  
      onPress={logout} />

</View>:null}

    <View style={styles.flexone}>{userred && localchat && (<ScrollView  style={styles.flexone} ref={scrollViewRef}
      onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: false })}>{localchat.map((c,index)=>{
		let isownmessage;
	if(userred._id ){
		 isownmessage = c.sender === userred._id  ;
	}
  let lastMessage = localchat.length - 1 === index;
	//style={isownmessage ? ownchat :otherchat  }
	//isownmessage ? newstyles.ownchat :newstyles.otherchat 
				return (<Text  style={isownmessage ? newstyles.ownchat:newstyles.otherchat} key={index} >{c.message}</Text>)
				}
				)   }
				</ScrollView >)
		}

	</View>
    <View><TextInput  style={styles.textinputstyle} value={message} onChangeText={(message)=>{setMessage(message)}}  multiline  placeholder="Write something "/></View>
<View><Button  title="SEND" onPress={socketMessage}/></View>



    </View>


	);

}

const styles = StyleSheet.create({
flexone:{
  flex: 1,

},
textinputstyle:{

          borderColor: "#1ca0ff", 
          borderWidth: 1, 
          padding: 10, 
          width: "100%",
         
},
nametext:{

  fontSize:20,
  textAlign:"center",
  backgroundColor:"white"
}

});

const newstyles = StyleSheet.create({
			ownchat:{textAlign:"right",height:40,marginTop:5,backgroundColor:"grey",color:"white",width:"50%",marginLeft:"45%",borderRadius:3},
			
			otherchat:{textAlign:"left",height:40,marginTop:5,backgroundColor:"grey",color:"white",width:"50%",marginLeft:"5%",borderRadius:3},
		});





export default InboxScreen;
