//import axios from '../api';
import axios from 'axios';
const sendnotifications=(notification)=>{
	return async (dispatch) => {
	try{
		//let {message:newmessage} =notification;
		//dispatch({ type: "newmessage",payload:{notification}});
		let res;
		res=await axios.post("https://impresaemployeedb.herokuapp.com/api/sendnotifications",{notification});
		if (res.status === 200) {
			let {notifications}=res.data;

			dispatch({ type: "sendnotificationssuccess",payload:{notifications}});
		}
		else{
			let {error}=res.data;
			dispatch({ type: "sendnotificationfailed",payload:{error}});
		}
	}
	catch(error){dispatch({ type: "sendnotificationfailed",payload:{error}});}
	}
}


export {sendnotifications};