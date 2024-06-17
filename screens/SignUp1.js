import * as React from "react";
import { StyleSheet, View, Text, Pressable,TouchableOpacity } from "react-native";
import { Input } from "@rneui/themed";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";

const SignUp1 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.signUp}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/rightarrow-1.png')} style={styles.backIcon} />
      </TouchableOpacity>
      <View style={styles.signUpChild} />
      <Text style={styles.text}>{`회원가입이 완료되었습니다!

추가 정보를 입력하고
더 유익한 기능을 만나보세요`}</Text>
      <Text style={[styles.text1, styles.textTypo]}>*키</Text>
      <Text style={[styles.text2, styles.textTypo]}>*몸무게</Text>
      <Text style={[styles.text3, styles.textTypo]}>*근육량</Text>
      <Text style={[styles.text4, styles.textTypo]}>*체지방량</Text>
      <Input
        label="키"
        inputStyle={{}}
        containerStyle={styles.groupTextInputInput}
      />
      <Input
        label="몸무게"
        inputStyle={{}}
        containerStyle={styles.groupTextInput1Input}
      />
      <Input
        label="근육량"
        inputStyle={{}}
        containerStyle={styles.groupTextInput2Input}
      />
      <Input
        label="체지방량"
        inputStyle={{}}
        containerStyle={styles.groupTextInput3Input}
      />
      <Pressable
        style={[styles.rectangleParent, styles.groupLayout]}
        onPress={() => navigation.navigate("Login1")}
      >
        <View style={[styles.groupChild, styles.childPosition]} />
        <Text style={styles.text5}>건너뛰기</Text>
      </Pressable>
      <Pressable
        style={[styles.rectangleGroup, styles.groupLayout]}
        onPress={() => navigation.navigate("Login1")}
      >
        <View style={[styles.groupChild, styles.childPosition]} />
        <Text style={styles.text5}>저장</Text>
      </Pressable>
      
    </View>
  );
};

const styles = StyleSheet.create({
  groupTextInputInput: {
    left: 27,
    width: 339,
    height: 61,
    top: 312,
    position: "absolute",
  },
  groupTextInput1Input: {
    left: 27,
    width: 339,
    height: 61,
    top: 402,
    position: "absolute",
  },
  groupTextInput2Input: {
    left: 27,
    width: 339,
    height: 61,
    top: 493,
    position: "absolute",
  },
  groupTextInput3Input: {
    left: 27,
    width: 339,
    height: 61,
    top: 583,
    position: "absolute",
  },
  textTypo: {
    height: 24,
    width: 149,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    left: 24,
    fontSize: FontSize.size_base,
    textAlign: "left",
    color: Color.colorBlack,
    position: "absolute",
  },
  groupLayout: {
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
    top: 93,
    left: 11,
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorMediumseagreen_100,
    width: 370,
    height: 750,
    position: "absolute",
  },
  text: {
    top: 110,
    left: 36,
    fontSize: 27,
    fontWeight: "800",
    fontFamily: FontFamily.interExtraBold,
    width: 321,
    height: 150,
    textAlign: "left",
    color: Color.colorBlack,
    position: "absolute",
  },
  text1: {
    top: 292,
  },
  text2: {
    top: 382,
  },
  text3: {
    top: 472,
  },
  text4: {
    top: 562,
  },
  groupChild: {
    backgroundColor: Color.primary,
    height: 61,
    width: 339,
    position: "absolute",
  },
  text5: {
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
    top: 673,
    left: 28,
    width: 339,
  },
  rectangleGroup: {
    top: 743,
    left: 28,
    width: 339,
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
    left: 15,
  },
  signUp: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    width: "100%",
    height: 852,
    overflow: "hidden",
  },
});

export default SignUp1;
