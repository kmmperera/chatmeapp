const initState = {
signin:false,
authenticating:false,
error:null,
loggedin:false,
signup:false,
user:{
	firstName: '',
    lastName: '',
    email: '',
	role:'',
	pofilePicture:'',
	_id:'',
        
	}
}

 const auth=(state = initState, action) => {
	switch (action.type) {
	case "authenticating":
            state = {
                ...state,
                authenticating: true,
				error:null,
				loggedin:false,
            }
            break;

	case "loginsuccess":
            state = {
                ...state,
		user:action.payload.user,
                authenticating: false,
				error:null,
				loggedin:true,
            }
            break;

	case "loginfailed":
            state = {
                ...state,
		        error:action.payload.error,
		
            }
            break;
	case "updatesuccess":
	state = {
                ...state,
				user:action.payload.user,
                
            }
            break;
	case "updatefailed":
	state = {
                ...state,
		        error:action.payload.error,
		
            }
            break;
	case "logout":
		state={
			
			...initState,
		}
	break;
	case "signupsuccess":
		state={
			
			...initState,
			signup:true,
			
		}
	break;
	case "signupfailed":
		state={
			
			...initState,
		 error:action.payload.error,
		}
	break;
default:
		state={...state,}
	
	

	}
return state;
}
export default auth;