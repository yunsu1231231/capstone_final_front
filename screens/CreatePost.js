import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Alert, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [postname, setPostname] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const onNewPost = route.params?.onNewPost; // 콜백 함수 받기


  useEffect(() => {
    const fetchPostname = async () => {
      const storedPostname = await AsyncStorage.getItem('postname');
      if (storedPostname) {
        setPostname(storedPostname);
      }
    };
    fetchPostname();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
      Alert.alert('Permission Denied', 'You need to allow permission to access the gallery');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setImage(pickerResult.assets[0].uri);
    }
  };

  const createPost = async () => {
    const formData = new FormData();
    formData.append('user_id', '1'); //
    formData.append('title', title);
    formData.append('content', content);
    formData.append('postname', postname); 

    const base64 = image; // 이미지 받아오기
    const res = await fetch(base64);
    const blob = await res.blob();
  
    const file = new File([blob], "filename.jpeg");
    formData.append('photo', file);

    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await fetch('http://localhost:3000/api/posts/createPost', {
        method: 'POST',
        body: formData,
        headers: {
          "Authorization": token
        },
      });
      const text = await response.text();
      const data = JSON.parse(text);
      if (response.status === 201) {
        Alert.alert('Success', `Post created with ID: ${data.id}`);

        const newPost = {
          post_id: data.id,
          title,
          content,
          photo_url: data.photo_url,
          likes: [],
        };
        if (onNewPost) { // 콜백 함수 호출
          onNewPost(newPost);
        }
        navigation.navigate('PostDetail', { 
          title, 
          content, 
          image, 
          photo_url: data.photo_url 
        }); // Navigate to PostDetail
        
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <Image source={require("../assets/rightarrow-1.png")} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.greeting}>{`오늘도 운동하러 오셨군요! \n${postname}님!`}</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.container}>
            <Text style={styles.header}>오늘의 하루를 기록하세요 !</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
            />
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.imagePickerIconContainer} />
              ) : (
                <View style={styles.imagePickerIconContainer}>
                  <Image source={require("../assets/camera-1.png")} style={styles.imagePickerIcon} />
                </View>
              )}
            </TouchableOpacity>
            <TextInput
              style={styles.textArea}
              placeholder="Content"
              value={content}
              onChangeText={setContent}
              multiline
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.createButton} onPress={createPost}>
                <Text style={styles.createButtonText}>업로드</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  innerContainer: {
    backgroundColor: '#D7F2EC',
    padding: 20,
    borderRadius: 10,
    height:700,
    marginTop:70,
  },
  container: {
    alignItems: 'center',
    marginTop:10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '97%',
    height: 38,
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  textArea: {
    width: '97%',
    height: 120,
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    textAlignVertical: 'top',
  },
  imagePicker: {
    width: 270,
    height: 270,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePickerIconContainer: {
    width: 310,
    height: 270,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  imagePickerIcon: {
    width: 40,
    height: 40,
  },
  buttonContainer: {
    width: '80%',
    marginTop: 10,
  },
  createButton: {
    backgroundColor: '#02AE85',
    padding: 15,
    borderRadius: 8,
    marginTop:10,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 1,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  greeting: {
    position: 'absolute',
    textAlign:'right',
    top: 60,
    left: 180,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default CreatePost;

