import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TrainerList = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const user_id = 1; // 실제 유저 ID로 변경

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/getTrainers'); // 실제 API URL로 변경
      const data = await response.json();
      if (response.ok) {
        setTrainers(data.trainers);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Failed to fetch trainers:', error);
      Alert.alert('Error', 'Failed to fetch trainers.');
    } finally {
      setLoading(false);
    }
  };

  const selectTrainer = (trainer) => {
    navigation.navigate('Chatting_User', { trainer, user_id });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <Image source={require('../assets/rightarrow-1.png')} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>당신의 트레이너를 선택하세요 !</Text>
      <Image source={require('../assets/male.png')} style={styles.trainerImage} />
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Trainer ID</Text>
          <Text style={styles.headerText}>Trainer Name</Text>
          <Text style={styles.headerText}>Experience</Text>
          <Text style={styles.headerText}>Select</Text>
        </View>
        {trainers.map((trainer) => (
          <View key={trainer.id} style={styles.tableRow}>
            <Text style={styles.cellText}>{trainer.trainer_id}</Text>
            <Text style={styles.cellText}>{trainer.trainer_name}</Text>
            <Text style={styles.cellText}>{trainer.trainer_specialization}</Text>
            <View style={styles.cellButton}>
              <TouchableOpacity style={styles.selectButton} onPress={() => selectTrainer(trainer)}>
                <Text style={styles.selectButtonText}>선택</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#D7F2EC',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D7F2EC',
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f7f7f7',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  headerText: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
    alignItems: 'center',
  },
  cellText: {
    flex: 1,
    fontSize: 11,
    textAlign: 'center',
  },
  cellButton: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
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
  trainerImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
    margintop:10,
  },
  selectButton: {
    backgroundColor: '#02AE85',
    padding: 10,
    borderRadius: 10,
  },
  selectButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});

export default TrainerList;

