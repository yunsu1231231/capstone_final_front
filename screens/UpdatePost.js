import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const UpdatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  const { postId } = route.params;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/getPost?post_id=${postId}`);
        const result = await response.json();
        if (response.status === 200) {
          const post = result.data;
          setTitle(post.title);
          setContent(post.content);
          setImage(post.photo_url);
        } else {
          Alert.alert('Error', result.message);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch post');
      }
    };

    fetchPost();
  }, [postId]);

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
      setImage(pickerResult.uri);
    }
  };

  const updatePost = async () => {
    const formData = new FormData();
    formData.append('post_id', postId);
    formData.append('title', title);
    formData.append('content', content);

    console.log(image);
    
    if (image) {
      formData.append('photo', {
        uri: image,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
    }

    try {
      const response = await fetch('YOUR_API_ENDPOINT/updatePost', {
        method: 'PUT',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        Alert.alert('Success', 'Post updated successfully');
        navigation.navigate('PostDetail', { postId });
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity style={styles.backbutton} onPress={() => navigation.goBack()}>
        <View style={styles.backbuttonChild}>
          <Image source={require("../assets/rightarrow-1.png")} style={styles.rightArrow1Icon} />
        </View>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.header}>게시물을 업데이트하세요</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.textArea}
            placeholder="Content"
            value={content}
            onChangeText={setContent}
            multiline
          />
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            <Text style={styles.imagePickerText}>Pick an image from gallery</Text>
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <View style={styles.buttonContainer}>
            <Button title="Update Post" onPress={updatePost} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#D7F2EC',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  textArea: {
    width: '100%',
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    textAlignVertical: 'top',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 12,
    alignSelf: 'center',
    borderRadius: 8,
  },
  imagePicker: {
    backgroundColor: '#02AE85',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  imagePickerText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  backbutton: {
    position: "absolute",
    top: 40,
    left: 10,
    height: 39,
    width: 41,
  },
  backbuttonChild: {
    borderRadius: 8,
    borderColor: '#02AE85',
    borderWidth: 2,
    borderStyle: "solid",
    height: "100%",
    width: "100%",
  },
  rightArrow1Icon: {
    position: "absolute",
    top: 10,
    left: 8,
    width: 20,
    height: 16,
  },
});

export default UpdatePost;

