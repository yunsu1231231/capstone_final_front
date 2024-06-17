import * as React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";

const OpenningScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.openningScreen}>
      <Text style={styles.text}>{`어서오세요!
서비스 사용을 위한
회원가입을 진행합니다.`}</Text>
      <Image
        style={styles.action1Icon}
        contentFit="cover"
        source={require("../assets/action-1.png")}
      />
      <Pressable
        style={[styles.rectangleParent, styles.groupLayout]}
        onPress={() => navigation.navigate("Login1")}
      >
        <View style={styles.groupChild} />
        <Text style={[styles.text1, styles.textTypo]}>로그인</Text>
      </Pressable>
      <Pressable
        style={[styles.rectangleGroup, styles.groupLayout]}
        onPress={() => navigation.navigate("SignUp")}
      >
        <View style={[styles.groupItem, styles.groupItemBorder]} />
        <Text style={[styles.text2, styles.textTypo]}>회원가입</Text>
      </Pressable>
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={styles.backIcon}
          contentFit="cover"
          source={require("../assets/rightarrow-1.png")}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  groupLayout: {
    height: 61,
    width: 339,
    position: "absolute",
  },
  textTypo: {
    height: 20,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    lineHeight: 20,
    fontSize: FontSize.size_base,
    left: 131,
    top: 20,
    position: "absolute",
  },
  groupItemBorder: {
    borderWidth: 2,
    borderColor: Color.primary,
    borderStyle: "solid",
    borderRadius: Border.br_3xs,
    left: 0,
    top: 0,
  },
  text: {
    marginLeft: -162.5,
    top: 193,
    left: "50%",
    fontSize: FontSize.size_13xl,
    fontWeight: "800",
    fontFamily: FontFamily.interExtraBold,
    textAlign: "left",
    width: 325,
    height: 151,
    color: Color.colorBlack,
    position: "absolute",
  },
  action1Icon: {
    top: 361,
    left: 123,
    width: 145,
    height: 138,
    position: "absolute",
  },
  groupChild: {
    backgroundColor: Color.primary,
    borderRadius: Border.br_3xs,
    left: 0,
    top: 0,
    height: 61,
    width: 339,
    position: "absolute",
  },
  text1: {
    color: Color.colorWhite,
  },
  rectangleParent: {
    top: 560,
    left: 26,
    width: 339,
  },
  groupItem: {
    height: 61,
    width: 339,
    position: "absolute",
    backgroundColor: Color.colorWhite,
  },
  text2: {
    color: Color.colorBlack,
  },
  rectangleGroup: {
    top: 638,
    left: 26,
    width: 339,
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
  openningScreen: {
    flex: 1,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundColor: Color.colorWhite,
  },
});

export default OpenningScreen;

