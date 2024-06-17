import * as React from "react";
import { StyleSheet, View, Text, Pressable, Alert, Switch } from "react-native";
import { Image } from "expo-image";
import { Input } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { Border, FontFamily, Color, FontSize } from "../GlobalStyles";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login1 = () => {
  const navigation = useNavigation();
  const [email, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [isTrainer, setIsTrainer] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          is_trainer: isTrainer,
        }),
      });

      const data = await response.json();

      if (data.code === 200) {
        await AsyncStorage.setItem('authToken', data.token);
        await AsyncStorage.setItem('userEmail', email);
        await AsyncStorage.setItem('postname', data.username);
        Alert.alert("Success", "Login successful!");

        if (isTrainer) {
          navigation.navigate("Chatting", {user_id: data.user_id });
          // navigation.navigate("Chatting");
        } else {
          navigation.navigate("ServiceStart", { user_id: data.user_id });
          //navigation.navigate("ServiceStart");
        }
      } else {
        Alert.alert("로그인 실패", data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.log("Error", "An error occurred. Please try again.");
    }
  };

  return (
    <View style={styles.login}>
      <Pressable
        style={styles.backButtonContainer}
        onPress={() => navigation.navigate("OpenningScreen")}
      >
        <Image
          style={styles.backButton}
          contentFit="cover"
          source={require("../assets/rightarrow-1.png")}
        />
      </Pressable>
      <View style={styles.titleContainer}>
        <Text style={styles.text2}>반갑습니다 !</Text>
        <Image
          style={styles.image296Icon}
          contentFit="cover"
          source={require("../assets/image-296.png")}
        />
      </View>
      <Input
        label="이메일주소를 입력하세요" 
        inputStyle={{}}
        containerStyle={styles.groupTextInputInput}
        value={email}
        onChangeText={setUserid}
      />
      <Input
        label="비밀번호를 입력하세요"
        inputStyle={{}}
        containerStyle={styles.groupTextInput1Input}
        value={password}
        onChangeText={setPassword}
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
        style={[styles.rectangleParent, styles.groupChildLayout]}
        onPress={handleLogin}
      >
        <View style={[styles.groupChild, styles.childPosition]} />
        <Text style={[styles.text, styles.textTypo]}>로그인</Text>
      </Pressable>
      <Text style={[styles.dontHaveAnContainer, styles.text2FlexBox]}>
        <Text style={styles.dontHaveAnAccount}>
          <Text style={styles.dontHaveAn}>Don’t have an account?</Text>
          <Text style={styles.text1}>{` `}</Text>
        </Text>
        <Text style={styles.text1}>
          <Text style={styles.textTypo}>Sign up</Text>
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  groupTextInputInput: {
    left: 27,
    width: 339,
    height: 61,
    top: 345,
    position: "absolute",
  },
  groupTextInput1Input: {
    left: 27,
    width: 339,
    height: 61,
    top: 451,
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
  textTypo: {
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  text2FlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  groupChild: {
    backgroundColor: Color.primary,
    height: 61,
    width: 339,
    marginTop:20,
    position: "absolute",
  },
  text: {
    top: 40,
    left: 131,
    fontSize: FontSize.size_base,
    lineHeight: 20,
    color: Color.colorWhite,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 20,
    position: "absolute",
  },
  rectangleParent: {
    top: 560,
    left: 26,
  },
  backButtonContainer: {
    top: 40,
    left: 4,
    width: 41,
    height: 39,
    position: "absolute",
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    width: 24,
    height: 24,
  },
  dontHaveAn: {
    color: Color.colorGray_500,
  },
  text1: {
    color: Color.colorBlack,
  },
  dontHaveAnAccount: {
    fontFamily: FontFamily.interRegular,
  },
  dontHaveAnContainer: {
    top: 782,
    left: 90,
    fontSize: FontSize.size_sm,
    lineHeight: 18,
  },
  text2: {
    fontSize: FontSize.size_11xl,
    letterSpacing: -0.3,
    lineHeight: 39,
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    color: Color.colorBlack,
    textAlign: "left",
  },
  image296Icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 270,
    marginLeft:35,
    justifyContent: 'left',
  },
  trainerSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    left: 27,
    top: 530,
    position: 'absolute',
  },
  trainerSwitchLabel: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.interMedium,
    color: Color.colorBlack,
    marginRight: 10,
  },
  login: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    width: "100%",
    height: 852,
    overflow: "hidden",
  },
});

export default Login1;

