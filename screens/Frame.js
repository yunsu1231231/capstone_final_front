import * as React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';

//앱실행 첫화면
const Frame = () => {
  const navigation = useNavigation();
// 맨 처음 화면에 마운팅 될 때만 부르고 싶다면?
  React.useEffect(() => {
    console.log('마운팅');
    
    async function verify() {
    const token = await AsyncStorage.getItem('authToken');

    try {
      const response = await fetch("http://localhost:3000/api/auth/check", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
      });    

      const data = await response.json();

      if (data.code == 200) {

        Alert.alert("Success", "Login successful!");
        navigation.navigate("ServiceStart");
      } else {
        Alert.alert("Error", data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.log("Error", "An error occurred. Please try again.");
    }
  };
    

    verify()


}, []);

  return (
    <Pressable
      style={styles.pressable}
      onPress={() => navigation.navigate("OpenningScreen")}
    >
      <View style={[styles.view, styles.viewLayout]}>
        <View style={[styles.child, styles.itemPosition]} />
        <Text style={[styles.text, styles.textTypo]}>시작하기</Text>
      </View>
      <View style={[styles.view1, styles.itemLayout]}>
        <Image
          style={[styles.item, styles.itemLayout]}
          contentFit="cover"
          source={require("../assets/ellipse-1.png")}
        />
        <Text style={[styles.text1, styles.textTypo]}>{`모두의
휘트니스`}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  viewLayout: {
    height: 55,
    width: 143,
    position: "absolute",
  },
  itemPosition: {
    left: 0,
    top: 0,
  },
  textTypo: {
    textAlign: "center",
    color: Color.colorWhite,
    fontWeight: "800",
    position: "absolute",
  },
  itemLayout: {
    height: 240,
    width: 240,
    position: "absolute",
  },
  child: {
    borderRadius: Border.br_3xs,
    borderStyle: "solid",
    borderColor: Color.colorWhite,
    borderWidth: 4,
    height: 55,
    width: 143,
    position: "absolute",
  },
  text: {
    top: 14,
    left: 26,
    fontSize: FontSize.size_5xl,
    fontFamily: FontFamily.interExtraBold,
  },
  view: {
    top: 521,
    left: 125,
  },
  item: {
    left: 0,
    top: 0,
  },
  text1: {
    marginLeft: -105,
    top: 70,
    left: "50%",
    fontSize: 48,
    fontFamily: FontFamily.latoBlack,
    width: 210,
    height: 151,
  },
  view1: {
    top: 206,
    left: 76,
  },
  pressable: {
    backgroundColor: Color.primary,
    flex: 1,
    width: "100%",
    height: 852,
    overflow: "hidden",
  },
});

export default Frame;