import axios from 'axios';

const getallusers=()=>{
	return async (dispatch) => {
	try{
		let res;
		res=await axios.get("https://impresaemployeedb.herokuapp.com/api/getallusers");
		if (res.status === 200) {
			let {users}=res.data;
			dispatch({ type: "getallusersuccess",payload:{users}});
		}
		else{
			let {error}=res.data;
			dispatch({ type: "getalluserfailed",payload:{error}});
		}
	}
	catch(error){dispatch({ type: "getalluserfailed",payload:{error}});}
	}
}
export {getallusers};