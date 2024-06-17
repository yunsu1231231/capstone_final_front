import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Modal, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostComment from './PostComment';
import { useFocusEffect } from '@react-navigation/native';


const PostDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { post_id, title, content, photo_url, likes, onDelete} = route.params;
  const [likeCount, setLikeCount] = useState(likes ? likes.length : 0);
  const [liked, setLiked] = useState(false);
  const [userId, setUserId] = useState(null);
  const [postname, setPostname] = useState("");
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [comments, setComments] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchComments = async () => {
        const token = await AsyncStorage.getItem('authToken');
        const response = await fetch(`http://localhost:3000/api/posts/getcomment?post_id=${post_id}`, {
          headers: {
            'Authorization': token,
          },
        });
        const result = await response.json();
        setComments(result.data);
      };

      fetchComments();
    }, [post_id])
  );

  useEffect(() => {
    const fetchUserId = async () => {
      const token = await AsyncStorage.getItem('authToken');
      const response = await fetch('http://localhost:3000/api/auth/payload', {
        headers: {
          'Authorization': token,
        },
      });
      const userData = await response.json();
      setUserId(userData.id);

      if (likes && likes.includes(String(userData.id))) {
        setLiked(true);
      }
    };

    const fetchPostname = async () => {
      const storedPostname = await AsyncStorage.getItem('postname');
      if (storedPostname) {
        setPostname(storedPostname);
      }
    };

    fetchUserId();
    fetchPostname();
  }, [likes]);

  const handleDelete = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await fetch('http://localhost:3000/api/posts/deletePost', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({ post_id }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Post deleted successfully');
        onDelete(); // 삭제 후 onDelete 콜백 호출
        navigation.navigate('ListPost');
      } else {
        const result = await response.json();
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to delete post');
    }
  };

  const addComment = async (post_id, content) => {
    try {
      const token = await AsyncStorage.getItem('authToken');

      const response = await fetch('http://localhost:3000/api/posts/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({
          post_id: post_id,
          content: content,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Comment added successfully');
        setComments([...comments, { id: data.commentId, content }]);
      } else {
        Alert.alert('Error', data.message || 'Failed to add comment');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('ListPost')}>
          <Image source={require('../assets/rightarrow-1.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Today's Post</Text>
        <View style={styles.postContainer}>
          <Text style={styles.postname}>{postname}</Text>
        </View>
        <View style={styles.postContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.content}>{content}</Text>
        </View>
        {photo_url && <Image source={{ uri: "http://localhost:3000/" + photo_url.replace(/\\/,"/") }} style={styles.image} />}
        <View style={styles.commentsContainer}>
          <Text style={styles.commentsHeader}>Comments</Text>
          <FlatList
            data={comments}
            keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
            renderItem={({ item }) => (
              <View style={styles.comment}>
                <Text style={styles.commentText}>{item?.content}</Text>
              </View>
            )}
          />
        </View>
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleDelete}>
            <Text style={styles.actionButtonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.commentButton} onPress={() => setCommentModalVisible(true)}>
            <Text style={styles.commentButtonText}>Comment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listButton} onPress={() => navigation.navigate('ListPost')}>
            <Text style={styles.listButtonText}>목록</Text>
          </TouchableOpacity>
        </View>
        <Modal
          visible={commentModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setCommentModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setCommentModalVisible(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <PostComment 
              userId={userId} 
              postId={post_id}
              addComment={addComment} // 추가
              closeModal={() => setCommentModalVisible(false)} // 추가 
               />
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D7F2EC',
    padding: 16,
    justifyContent: 'center',
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
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginVertical: 20,
  },
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
  },
  postname: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
  },
  image: {
    width: '50%',
    height: '50%',
    marginBottom: 12,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
  },
  content: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: '#02AE85',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  commentButton: {
    backgroundColor: '#02AE85',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  commentButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  listButton: {
    backgroundColor: '#02AE85',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  listButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  commentsContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
  },
  commentsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  comment: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  commentText: {
    fontSize: 14,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default PostDetail;