const initState = {

	users:[],
	error:null,
}

const getusers= (state = initState, action) => {
	switch (action.type) {
	case "getallusersuccess":
            state = {
               
				users:action.payload.users,
				
				
            }
            break;

	case "getalluserfailed":
            state = {
               
				error:action.payload.error,
				
				
            }
            break;


	}
return state;
}
export default getusers;