import * as React from "react";
import { StyleSheet, View, Text, Pressable, Alert, Switch, ScrollView,TouchableOpacity } from "react-native";
import { Input } from "@rneui/themed";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isTrainer, setIsTrainer] = useState(false);
  const [specialization, setSpecialization] = useState("");
  const [postname, setPostname] = useState(""); // nickname = post_id에 사용하는 username

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    } 

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
          postname: postname,
          confirmPassword: confirmPassword,
          is_trainer: isTrainer,
          specialization: specialization,
        }),
      });

      const data = await response.json();

      if (data.code === 200) {
        Alert.alert("Success", "User registered successfully!");
        await AsyncStorage.setItem('postname', postname);  // 저장 부분 추가
        navigation.navigate("SignUp1");
      } else {
        Alert.alert("Error", data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  // Calculate the top position for the sign up button
  //const signUpButtonTop = isTrainer ? 831 : 771;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/rightarrow-1.png')} style={styles.backIcon} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.signUpChild} />
        <Text style={styles.text}>{`환영합니다!
몇가지 개인정보들을
작성해주세요`}</Text>
        <Input
          label="닉네임을 입력하세요"
          inputStyle={{}}
          containerStyle={styles.groupTextInputInput}
          value={postname}
          onChangeText={setPostname}
        />
        <Input
          label="이름을 입력하세요"
          inputStyle={{}}
          containerStyle={styles.groupTextInput1Input}
          value={username}
          onChangeText={setUsername}
        />
        <Input
          label="이메일 주소를 입력하세요"
          inputStyle={{}}
          containerStyle={styles.groupTextInput2Input}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          label="비밀번호를 입력하세요"
          inputStyle={{}}
          containerStyle={styles.groupTextInput3Input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Input
          label="비밀번호를 확인하세요"
          inputStyle={{}}
          containerStyle={styles.groupTextInput4Input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <View style={styles.trainerSwitchContainer}>
          <Text style={styles.trainerSwitchLabel}>트레이너 여부</Text>
          <Switch
            value={isTrainer}
            onValueChange={setIsTrainer}
          />
        </View>
        
        <Pressable
          style={[styles.rectangleParent]}
          onPress={handleSignUp}
        >
          <View style={[styles.groupChild, styles.childPosition]} />
          <Text style={styles.text7}>회원가입</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
  },
  scrollContentContainer: {
    paddingBottom: 100, // Add some padding to the bottom
  },
  groupTextInputInput: {
    left: 27,
    width: 339,
    height: 61,
    top: 281,
    position: "absolute",
  },
  groupTextInput1Input: {
    left: 27,
    width: 339,
    height: 61,
    top: 371,
    position: "absolute",
  },
  groupTextInput2Input: {
    left: 27,
    width: 339,
    height: 61,
    top: 462,
    position: "absolute",
  },
  groupTextInput3Input: {
    left: 27,
    width: 339,
    height: 61,
    top: 552,
    position: "absolute",
  },
  groupTextInput4Input: {
    left: 27,
    width: 339,
    height: 61,
    top: 642,
    position: "absolute",
  },
  /*groupTextInput5Input: {
    left: 27,
    width: 339,
    height: 61,
    top: 732,
    position: "absolute",
  },*/
  textTypo1: {
    height: 24,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    fontSize: FontSize.size_base,
    textAlign: "left",
    color: Color.colorBlack,
    position: "absolute",
  },
  textTypo: {
    left: 22,
    height: 24,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    fontSize: FontSize.size_base,
    textAlign: "left",
    color: Color.colorBlack,
    position: "absolute",
  },
  groupChildLayout: {
    height: 61,
    width: 339,
    position: "absolute",
  },
  childPosition: {
    borderRadius: Border.br_3xs,
    left: 0,
    top: 0,
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
  signUpChild: {
    top: 98,
    left: 11,
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorMediumseagreen_100,
    width: 370,
    height: 745,
    position: "absolute",
  },
  text: {
    top: 115,
    fontSize: FontSize.size_13xl,
    fontWeight: "800",
    fontFamily: FontFamily.interExtraBold,
    width: 314,
    height: 124,
    textAlign: "left",
    color: Color.colorBlack,
    left: 25,
    position: "absolute",
  },
  text1: {
    top: 348,
    width: 149,
    height: 24,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    left: 25,
  },
  text2: {
    top: 438,
    left: 20,
    width: 189,
    height: 24,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
  },
  text3: {
    top: 531,
    width: 189,
    height: 24,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    left: 25,
  },
  text4: {
    top: 617,
    width: 189,
  },
  text5: {
    top: 703,
    width: 234,
  },
  text6: {
    top: 257,
    width: 149,
    height: 24,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    left: 25,
  },
  groupChild: {
    backgroundColor: Color.primary,
    height: 61,
    width: 339,
    position: "absolute",
  },
  text7: {
    top: 20,
    left: 131,
    lineHeight: 20,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorWhite,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 20,
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  rectangleParent: {
    left: 27,
    top:760,
  },
  backbuttonChild: {
    borderStyle: "solid",
    borderColor: Color.primary,
    borderWidth: 2,
    borderRadius: Border.br_3xs,
    left: 0,
    top: 0,
  },
  rightArrow1Icon: {
    top: 11,
    left: 10,
    width: 20,
    height: 16,
    position: "absolute",
  },
  backbutton: {
    top: 45,
    left: 14,
    zIndex: 1,
  },
  signUp: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    width: "100%",
    height: 852,
    overflow: "hidden",
  },
  trainerSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    left: 35,
    top: 715,
    position: 'absolute',
  },
  trainerSwitchLabel: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.interMedium,
    color: 'rgba(0, 0, 0, 0.7)8',
    marginRight: 10,
  },
});

export default SignUp;
