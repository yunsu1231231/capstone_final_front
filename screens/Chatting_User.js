import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chatting_User = ({ route, navigation }) => {
  const { trainer, user_id } = route.params;
  const [prevMessages, setPrevMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const webSocket = useRef(null);

  const fetchComments = async () => {
    const token = await AsyncStorage.getItem('authToken'); // 인증 토큰 가져오기
    const response = await fetch('http://localhost:3000/api/auth/getUserRequests', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      }
    })
    const data = await response.json();
    if (data.code == 200) {
      return data.requests
    }
  }

  useEffect(() => {
    fetchComments().then((data)=> {
      const _data = data.filter(requests => !!requests.comment).map((message) => {
        console.log("fetchComments", message)
        console.log(user_id)
        return {
          type: 'chat',
          sender: message.user_id,
          receiver: message.trainer_id,
          message: message.comment,
          timestamp: new Date(message.interaction_date),
          isSender: user_id === message.user_id 
        }
      })
      setPrevMessages(_data);
    }).catch(e => { console.log("fetchComments Error:", e) })
  }, [])

  useEffect(() => {
    // WebSocket 연결 생성
    webSocket.current = new WebSocket('ws://localhost:3000');

    webSocket.current.onopen = () => {
      console.log('WebSocket 연결!');
      // 서버에 user_id 전송하여 클라이언트 식별
      // webSocket.current.send(JSON.stringify({ type: 'connect', user_id }));
      webSocket.current.send(JSON.stringify({ type: 'connect', user_id, trainer_id: trainer.trainer_id }));
    };

    webSocket.current.onclose = (event) => {
      console.error('WebSocket 닫힘:', event);
      // 비정상적인 종료에 대한 처리
      if (!event.wasClean) {
        console.error(`WebSocket 비정상 종료. 코드: ${event.code}, 이유: ${event.reason}`);
        Alert.alert('Error', 'WebSocket connection closed unexpectedly.');
      }
    };

    webSocket.current.onerror = (error) => {
      console.error('WebSocket 오류:', error);
      // 오류에 대한 처리
      Alert.alert('Error', 'WebSocket encountered an error.');
    };

    webSocket.current.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      setMessages((prev) => [...prev, receivedMessage]);
    };

    return () => {
      webSocket.current?.close();
    };
  }, []);

  const postComment = async (comment) => {
    // 코칭 요청 API 호출
    try {
      const token = await AsyncStorage.getItem('authToken'); // 인증 토큰 가져오

      console.log("postComment body", trainer.trainer_id, comment)
      const response = await fetch('http://localhost:3000/api/auth/requestCoaching', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({
          trainer_id: trainer.trainer_id,
          comment: comment,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data)
        Alert.alert('Success', 'Coaching request sent successfully.');
      } else {
        Alert.alert('Error', data);
      }
    } catch (error) {
      console.error('Failed to send coaching request:', error);
      Alert.alert('Error', 'Failed to send coaching request.');
    }
  }

  const sendMessage = async () => {
    if (newMessage.trim()) {
      const messageObject = {
        type: 'chat',
        sender: user_id,
        receiver: trainer.trainer_id,
        message: newMessage,
        timestamp: Date.now(),
      };

      if (webSocket.current && webSocket.current.readyState === WebSocket.OPEN) {
        webSocket.current.send(JSON.stringify(messageObject));
        setMessages((prev) => [...prev, { ...messageObject, isSender:  true }]);
        setNewMessage('');
        postComment(newMessage);
      } else {
        Alert.alert('Error', 'WebSocket is not connected.');
      }
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.isSender ? styles.senderMessage : styles.receiverMessage]}>
      <Text style={styles.messageText}>{item.message}</Text>
    </View>
  );

  return (
  <View style={styles.container}>
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('TrainerList')}>
      <Image source={require('../assets/rightarrow-1.png')} style={styles.backIcon} />
    </TouchableOpacity>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{trainer.trainer_name} 트레이너와 이야기해보세요!</Text>
    </View>
    <FlatList
      data={[...prevMessages, ...messages]}
      keyExtractor={(item) => item.timestamp.toString()}
      renderItem={renderMessage}
      contentContainerStyle={{ paddingTop: 50}} // 원하는 만큼 상단 패딩 설정
    />
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={newMessage}
        onChangeText={setNewMessage}
        placeholder="무엇이든 물어보세요 !"
      />
      <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
        <Text style={styles.sendButtonText}>전송</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF', // 바탕화면 흰색
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
  titleContainer: {
    alignItems: 'center',
    backgroundColor: '#D7F2EC', // 타이틀 배경색
    padding: 20,
    borderRadius: 0,
    marginBottom: 10,
    top:60,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageContainer: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    maxWidth: '70%',
    marginBottom:10,
  },
  senderMessage: {
    backgroundColor: '#D7F2EC', // 보낸 메시지 색상
    alignSelf: 'flex-end', // 오른쪽으로 정렬
    // top:50,
  },
  receiverMessage: {
    backgroundColor: '#E6E6E6', // 받은 메시지 색상
    alignSelf: 'flex-start', // 왼쪽으로 정렬
  },
  messageText: {
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor:'#D7F2EC',
    paddingVertical: 10,
    borderRadius: 0,
    backgroundColor: '#D7F2EC', // 메시지 보내는 창 색상
    paddingBottom: 10, // 창을 약간 올리기 위해 패딩 추가
    paddingLeft:10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingLeft:10,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#D7F2EC', // 입력창 배경색
  },
  sendButton: {
    backgroundColor: '#02AE85', // 버튼 배경색
    padding: 10,
    borderRadius: 10,
    paddingRight:10,
  },
  sendButtonText: {
    color: '#FFFFFF', // 버튼 텍스트 색상
    fontSize: 16,
  },
});

export default Chatting_User;