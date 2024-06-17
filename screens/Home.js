import * as React from "react";
import { useState, useEffect } from "react";
import { Text, StyleSheet, View, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Calendar } from "react-native-calendars";
import HomeContainer from "../components/HomeContainer";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { exerciseInfo } = route.params || {};

  const [exerciseLog, setExerciseLog] = useState([]);
  const [postname, setPostname] = useState("");
  const [markedDates, setMarkedDates] = useState({});

  const fetchLogs = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await fetch('http://localhost:3000/api/posts/getrecord', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });

      const data = await response.json();

      console.log(data)

      if (data.code === 200) {
        setExerciseLog(data.data);

        useEffect(() => {
          const _markedDates = {}; 
          data.data.forEach(item => {
              _markedDates[item.date] = { marked: true, dotColor: '#02AE85' };
          });
          setMarkedDates(_markedDates); 
      }, [data]);

        /*
        const _markedDates = {}

        data.data.forEach(item => {
        _markedDates[item.date] = { marked: true, dotColor: '#02AE85' }
        })

        setMarkedDates(_markedDates)
        */

      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Failed to fetch exercise logs:', error);
      Alert.alert('Error', 'Failed to fetch exercise logs.');
    }
  };


  useFocusEffect(
    React.useCallback(() => {fetchLogs()
    }, [])
  );


  useEffect(() => { 
    const fetchPostname = async () => {
      const storedPostname = await AsyncStorage.getItem('postname');
      if (storedPostname) {
        setPostname(storedPostname);
      }
    };
    fetchPostname();
  }, []);


  useEffect(() => {
    if (exerciseInfo) {
      setExerciseLog((prevLog) => {
        const updatedLog = [...prevLog, exerciseInfo];
        AsyncStorage.setItem('exerciseLog', JSON.stringify(updatedLog));
        return updatedLog;
      });
      setMarkedDates((prevDates) => ({
        ...prevDates,
        [exerciseInfo.date]: { marked: true, dotColor: '#02AE85' },
      }));
    }
  }, [exerciseInfo]);

  const onDayPress = (day) => {
    navigation.navigate("TodayExercise", { date: day.dateString });
  };

  
    


  return (
    <View style={styles.home}>
      <HomeContainer style={styles.homeContainer} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.heading}>
          <Text style={styles.text}>{`${postname} 님 !`}</Text>
          <Text style={[styles.text1, styles.textTypo]}>
            오늘도 운동하러 오셨군요 !
          </Text>
        </View>
        <Pressable
          style={styles.searchButton}
          onPress={() => navigation.navigate("Exercisevideo")}
        >
          <View style={styles.bg} />
          <Image
            style={[styles.icSearchIcon, styles.text2Layout]}
            contentFit="cover"
            source={require("../assets/ic-search.png")}
          />
          <Text style={[styles.search1, styles.text1Typo]}>Search</Text>
        </Pressable>
        <View style={styles.homeChild} />
        <View style={[styles.homeItem, styles.homeLayout]} />
        <View style={[styles.homeInner, styles.homeLayout]} />
        
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate("ServiceStart")}
        >
          <Image
            source={require("../assets/rightarrow-1.png")}
            style={styles.backIcon}
          />
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("ListPost")}
          style={styles.shoesIconPressable}
        >
          <Image
            style={styles.shoesIcon}
            contentFit="cover"
            source={require("../assets/shoes.png")}
          />
        </Pressable>
        
        <Pressable
          onPress={() => navigation.navigate("ListPost")}
          style={styles.text2Pressable}
        >
          <Text style={[styles.text2, styles.text2Layout]}>오늘의 하루</Text>
        </Pressable>
        
        <Pressable
          style={[styles.pressable, styles.HomeLayout]}
          onPress={() => navigation.navigate("TrainerList")}
        >
          <View style={[styles.child, styles.HomeLayout]} />
          <Text style={[styles.text3, styles.textTypo]}>전문가와 상담</Text>
          <Image
            style={styles.communication1Icon}
            contentFit="cover"
            source={require("../assets/communication.png")}
          />
        </Pressable>
        <Calendar
          style={styles.calendar}
          onDayPress={onDayPress}
          markedDates={markedDates}
        />
        {exerciseLog.map((info, index) => (
          <View key={index} style={styles.exerciseInfoContainer}>
            <Text style={styles.exerciseInfoText}>날짜: {info.date}</Text>
            <Text style={styles.exerciseInfoText}>운동 종류: {info.exercise}</Text>
            <Text style={styles.exerciseInfoText}>운동 세트수: {info.count1} 번</Text>
            <Text style={styles.exerciseInfoText}>운동 횟수: {info.count2} 회</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  textTypo: {
    fontFamily: FontFamily.latoBold,
    fontWeight: "600",
    textAlign: "left",
  },
  text2Layout: {
    weight: 50,
    height: 24,
    position: "absolute",
  },
  text1Typo: {
    fontSize: FontSize.size_sm,
    position: "absolute",
  },
  homeLayout: {
    height: 129,
    width: 159,
    top: 180,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_xs,
    position: "absolute",
  },
  text: {
    top: 20,
    left: 20,
    fontSize: FontSize.size_5xl,
    fontWeight: "800",
    fontFamily: FontFamily.latoBlack,
    textAlign: "left",
    color: Color.colorGray_300,
    position: "absolute",
  },
  text1: {
    fontSize: FontSize.size_sm,
    position: "absolute",
    left: 11,
    top: 0,
    color: Color.colorGray_300,
  },
  heading: {
    top: 61,
    left: 194,
    width: 172,
    height: 55,
    position: "absolute",
  },
  bg: {
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_xs,
    height: 48,
    width: 350,
    left: 0,
    top: 5,
    position: "absolute",
  },
  icSearchIcon: {
    top: 17,
    left: 12,
    width: 24,
    overflow: "hidden",
  },
  search1: {
    top: 20,
    left: 46,
    fontFamily: FontFamily.latoRegular,
    color: "rgba(25, 33, 38, 0.5)",
    textAlign: "left",
  },
  searchButton: {
    top: 109,
    left: 20,
    height: 48,
    width: 350,
    position: "absolute",
  },
  homeItem: {
    top: 150,
    left: 27,
    height: 50,
    weight: 50,
  },
  homeInner: {
    left: 205,
  },
  text2: {
    fontSize: FontSize.size_xl,
    color: Color.colorBlack,
    width: 90,
    fontFamily: FontFamily.latoBold,
    fontWeight: "600",
    textAlign: "left",
  },
  text2Pressable: {
    top: 190,
    left: 60,
    position: "absolute",
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 2,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  child: {
    top: 20,
    left: 10,
  },
  childLayout: {
    backgroundColor: Color.colorBlack,
    top: 30,
    left: 202,
    height: 129,
    width: 163,
    position: "absolute",
  },
  text3: {
    top: 5,
    left: 230,
    lineHeight: 30,
    fontSize: FontSize.size_xl,
    width: 120,
    height: 36,
  },
  communication1Icon: {
    top: 40,
    left: 250,
    width: 80,
    height: 80,
    position: "absolute",
  },
  shoesIcon: {
    width: 80,
    height: 80,
  },
  shoesIconPressable: {
    top: 220,
    left: 70,
    position: "absolute",
    zIndex: 3, // Ensure the button is on top
  },
  home: {
    backgroundColor: Color.colorLightcyan,
    flex: 1,
    width: "100%",
    height: "100%",
  },
  homeContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  scrollViewContent: {
    paddingTop: 180,
  },
  calendar: {
    marginTop: 110,
  },
  exerciseInfoContainer: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: Color.colorWhite,
    padding: 0,
    borderRadius: 0,
    elevation: 0,
  },
  exerciseInfoText: {
    fontSize: FontSize.size_md,
    color: Color.colorBlack,
    marginTop: 1,
    marginBottom: 1,
    marginLeft: 5,
  },
});

export default Home;
