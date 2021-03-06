import React,{useEffect,useState} from "react";
import {  Text, View ,TouchableOpacity,Button,Image,Platform} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from 'expo-image-picker';
// import styles from './styles';

const WorkDetailsScreen = ({ navigation }) => {
	  const [image, setImage] = useState(null);
	 
	useEffect(() => {

		checkpermission();

	},[]);

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

	return (
    < >
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </>
  );

}

export default WorkDetailsScreen;