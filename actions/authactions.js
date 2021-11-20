import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const signin=(user)=>{
	return async (dispatch) => {
		let res;
		 dispatch({ type:"authenticating" });
		 try{
		res=await axios.post("https://impresaemployeedb.herokuapp.com/api/signin",{user});
		if (res.status === 200) {
			let{user}= res.data;
			  AsyncStorage.setItem("user", JSON.stringify(user));
	//AsyncStorage.setItem("user", user);

        dispatch({ type: "loginsuccess",payload:{user}});
		}
		else{
			const {error}=res.data;
			 dispatch({ type: "loginfailed",payload:{error}});
		}
		 }
		 catch(error){
			 
		dispatch({
        type: "loginfailed",
        payload: { error },
      });
		 }
	}
	
	
}

const signup=(user)=>{
	return async (dispatch) => {
		let res;
		 dispatch({ type:"authenticating" });
		 try{
		res=await axios.post("https://impresaemployeedb.herokuapp.com/api/signup",{user});
		if (res.status === 200) {
			let{user}= res.data;
        dispatch({ type: "signupsuccess",payload:{user}});
		}
		else{
			const {error}=res.data;
			 dispatch({ type: "signupfailed",payload:{error:"response status is not 200"}});
		}
		 }
		 catch(error){
			 
		dispatch({
        type: "loginfailed",
        payload: { error:"failed to connect server" },
      });
		 }
	}
	
	
}
const updateuser=(form)=>{
	
	return async (dispatch) => {
		let res;
		 dispatch({ type:"userupdating" });
		 try{
		res=await axios.post("https://impresaemployeedb.herokuapp.com/api/updateuser",form);
		if (res.status === 200) {
			let{user}= res.data;
			AsyncStorage.setItem("user", JSON.stringify(user));
			//AsyncStorage.setItem("user", user);
        dispatch({ type: "updatesuccess",payload:{user}});
		}
		else{
			const {error}=res.data;
			 dispatch({ type: "updatefailed",payload:{error}});
		}
		 }
		 catch(error){
			 
		dispatch({
        type: "updatefailed",
        payload: { error },
      });
		 }
	}
	
}
const isUserLoggedIn=()=>{
	
	return async (dispatch) => {
	let localstorage;
try{
    localstorage = await AsyncStorage.getItem("user");
    if (localstorage) {
	let user = await JSON.parse(localstorage);
    // let user = await JSON.parse(AsyncStorage.getItem("user"));
	//let user = await AsyncStorage.getItem("user");
	if(user){
      dispatch({ type: "loginsuccess",payload:{user}});
		}

	else{
	console.log("cant parse user to js obj");
	}
    } 
   else{
	console.log("no user in async storage");
	}
}
catch (error) {
      dispatch({ type: "loginfailed",payload:{error}});
    }
  }
	
}

 const signout = () => {
  return async (dispatch) => {
    
     AsyncStorage.removeItem('user');
	  dispatch({ type: "logout"});
    
  };
};


export {signin,signup,updateuser,isUserLoggedIn,signout};