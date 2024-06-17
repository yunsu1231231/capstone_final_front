import * as React from "react";
import { Text, StyleSheet, Pressable, View } from "react-native";
import { Input } from "@rneui/themed";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import ButtonPrimary from "../components/ButtonPrimary";
import Input1 from "../components/Input1";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";
//추가 로그인
const LogIn = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.login}>
      <Text style={[styles.text, styles.textTypo]}>
        비밀번호를 잊으셨나요 ?
      </Text>
      <Pressable
        style={styles.dontHaveAnContainer}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={[styles.text1, styles.textTypo]}>
          <Text style={styles.dontHaveAnAccount}>
            <Text style={styles.dontHaveAn}>Don’t have an account?</Text>
            <Text style={styles.text2}>{` `}</Text>
          </Text>
          <Text style={styles.text2}>
            <Text style={styles.logInTypo}>Sign up</Text>
          </Text>
        </Text>
      </Pressable>
      <Text style={[styles.logIn, styles.logInTypo]}>Log in</Text>
      <ButtonPrimary
        buttonText="로그인"
        buttonPrimaryPosition="absolute"
        buttonPrimaryBackgroundColor="#02ae85"
        buttonPrimaryTop={544}
        buttonPrimaryLeft={20}
        onButtonPrimaryPress={() => navigation.navigate("Mainpage")}
      />
      <Input1 inputPosition="unset" inputTop="unset" inputLeft="unset" />
      <Image
        style={styles.loginChild}
        contentFit="cover"
        source={require("../assets/group-36690.png")}
      />
      <Input1 inputPosition="unset" inputTop="unset" inputLeft="unset" />
      <Pressable
        style={[styles.back, styles.backLayout]}
        onPress={() => navigation.navigate("OpenningScreen")}
      >
        <View style={[styles.backChild, styles.backLayout]} />
        <Image
          style={styles.iconChevronleft}
          contentFit="cover"
          source={require("../assets/icon--chevronleft.png")}
        />
      </Pressable>
      <Text style={styles.text3}>반갑습니다 !</Text>
      <Image
        style={styles.image296Icon}
        contentFit="cover"
        source={require("../assets/image-296.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputTextInputInput: {
    left: 20,
    top: 393,
    position: "absolute",
  },
  inputTextInput1Input: {
    left: 20,
    top: 291,
    position: "absolute",
  },
  textTypo: {
    lineHeight: 18,
    fontSize: FontSize.size_sm,
    textAlign: "left",
  },
  logInTypo: {
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  backLayout: {
    height: 39,
    width: 39,
    position: "absolute",
  },
  text: {
    top: 487,
    left: 229,
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.interRegular,
    position: "absolute",
  },
  dontHaveAn: {
    color: Color.colorGray_500,
  },
  text2: {
    color: Color.colorBlack,
  },
  dontHaveAnAccount: {
    fontFamily: FontFamily.interRegular,
  },
  text1: {
    textAlign: "left",
  },
  dontHaveAnContainer: {
    left: 91,
    top: 786,
    position: "absolute",
  },
  logIn: {
    top: 563,
    left: 172,
    fontSize: FontSize.size_base,
    lineHeight: 20,
    color: Color.colorWhite,
    textAlign: "left",
    position: "absolute",
  },
  loginChild: {
    top: 442,
    left: 36,
    width: 76,
    height: 6,
    position: "absolute",
  },
  backChild: {
    top: 0,
    left: 0,
    borderRadius: Border.br_3xs,
    borderStyle: "solid",
    borderColor: Color.primary,
    borderWidth: 1,
  },
  iconChevronleft: {
    marginTop: -7.5,
    top: "50%",
    right: 15,
    width: 9,
    height: 15,
    position: "absolute",
  },
  back: {
    top: 20,
    left: 17,
  },
  text3: {
    top: 230,
    left: 20,
    fontSize: FontSize.size_11xl,
    letterSpacing: -0.3,
    lineHeight: 39,
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    textAlign: "left",
    color: Color.colorBlack,
    position: "absolute",
  },
  image296Icon: {
    top: 235,
    left: 182,
    width: 30,
    height: 30,
    position: "absolute",
  },
  login: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    width: "100%",
    height: 852,
    overflow: "hidden",
  },
});

export default LogIn;
