import axios from 'axios';


const getworkdetails = (user) => {
  return async (dispatch) => {
    
     let res;
	 try{
	 res=await axios.post("https://impresaemployeedb.herokuapp.com/api/getworkdetails",user);
	 
	 if (res.status === 200) {
		 
		 let{workdetails: payload}= res.data;
		  dispatch({ type: "workdetailssuccess",payload});
	 }
	 else {
		 let{error}= res.data;
		 dispatch({ type: "workdetailsfailed",payload:{error}});
	 }
	 }
	 catch(error){dispatch({ type: "workdetailsfailed",payload:{error}});}
  };
};

const putworkdetails = (details) => {
  return async (dispatch) => {
    
     let res;
	 try{
	 res=await axios.post("https://impresaemployeedb.herokuapp.com/api/putworkdetails",details);
	 
	 if (res.status === 200) {
		 
		 let{workdetails: payload}= res.data;
		  dispatch({ type: "workdetailssuccess",payload});
	 }
	 else {
		 let{error}= res.data;
		 dispatch({ type: "workdetailsfailed",payload:{error}});
	 }
	 }
	 catch(error){dispatch({ type: "workdetailsfailed",payload:{error}});}
  };
};

export {getworkdetails,putworkdetails};