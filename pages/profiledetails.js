import React,{useEffect,useState} from "react";
import {  Text, View ,TouchableOpacity,Button,TextInput,Image,Platform,ScrollView} from 'react-native';
import { useDispatch, useSelector } from "react-redux";

import {updateuser} from '../actions/authactions';
import styles from './styles';
import * as ImagePicker from 'expo-image-picker';


const ProfileDetailsScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const {user :userred}=auth;
	
	const[firstname,setFirstname]=useState(userred.firstName);
	const[lastname,setLastname]=useState(userred.lastName);
	const[email,setEmail]=useState(userred.email);
	const[password,setPassword]=useState("");
	const[pic,setPic]=useState(null);
	 const [image, setImage] = useState(null);
  // 	const[picurl,setPicurl]=useState(null);
let picurl;
		
	const mystyle={marginTop:"20"};
	if(userred.pofilePicture){ 
	picurl=  image ? image : `https://impresaemployeedb.herokuapp.com/${userred.pofilePicture}`;
  }
	
	useEffect(() => {
   
      console.log(userred.firstName);
	
	console.log(auth.error);
		console.log(picurl);
    		console.log(userred.pofilePicture);

  }, [userred.firstName,auth.error,pic,userred.pofilePicture]);
  
  useEffect(() => {
   	setFirstname(userred.firstName);
	setLastname(userred.lastName);
	setEmail(userred.email);
	
  }, [auth.user]);

useEffect(() => {

		checkpermission();

	},[]);
	
	const submitfunc=()=>{
		//e.preventDefault();
		//const user={firstname,lastname,email,password};
		const form= new FormData();
		form.append("firstname", firstname);
		form.append("lastname", lastname);
		form.append("email", email);
		form.append("password", password);
		if(image){
		let uriArray = image.split(".");
  		let fileType = uriArray[uriArray.length - 1];

		form.append("pic", {
      uri:image,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
     
    });
		}
		//dispatch(updateuser(user));
		dispatch(updateuser(form))
	}
	
	
 const checkpermission = async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    };
	const pickImage = async () => {


    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

	



return(
 <>
		<ScrollView style={styles.flexone} >
		<Text >Edit your info</Text>
		
     
       
			<Text>First Name</Text>
			<TextInput style={styles.txt}  defaultValue={firstname} onChange={(firstname)=>{setFirstname(firstname);}}/>
		
		
			<Text>Last Name</Text>
			<TextInput  style={styles.txt} defaultValue={lastname} onChangeText={(lastname)=>{setLastname(lastname);}}/>
		
			<Text>Email</Text>
			<TextInput style={styles.txt}  defaultValue={email} onChangeText={(email)=>{setEmail(email);}}/>
		
			<Text>PASSWORD</Text>
			<TextInput style={styles.txt} defaultValue={password} onChangeText={(password)=>{setPassword(password);}}/>
	    
		<Text >CHANGE PROFILE PICTURE</Text>
		<View style={styles.container}>
		<Button style={styles.btn} title="Upload profile picture" onPress={pickImage} />
		</View>
		<View style={styles.container}>
		 <Button style={styles.btn} title="SUBMIT" onPress={submitfunc}/>
	   	</View>
	   
	    
	   {auth.error && (<Text>ERROR OCCURED</Text>) } 
		 	   {userred && (<Text>{userred.firstName}</Text>) } 

	<View>
      {picurl && <Image source={{ uri: picurl }} style={{ width: 200, height: 200 }} />}
       </View>
    </ScrollView>  
	</>
	);
}

export default ProfileDetailsScreen;