import * as React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Border, FontFamily, FontSize, Color } from "../GlobalStyles";

const Mainpage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.mainpage}>
      <View style={styles.mainpageChild} />
      <View style={styles.mainpageItem} />
      <View style={[styles.view, styles.viewLayout]}>
        <View style={[styles.child, styles.childPosition]} />
        <Text style={[styles.text, styles.textTypo]}>자세 측정</Text>
        <Image
          style={styles.camera1Icon}
          contentFit="cover"
          source={require("../assets/camera-1.png")}
        />
      </View>
      <Pressable
        style={[styles.pressable, styles.viewLayout]}
        onPress={() => navigation.navigate("Home")}
      >
        <View style={[styles.child, styles.childPosition]} />
        <Text style={[styles.text1, styles.textTypo]}>운동 기록</Text>
        <Image
          style={[styles.edit1Icon, styles.edit1IconLayout]}
          contentFit="cover"
          source={require("../assets/edit-1.png")}
        />
      </Pressable>
      <View style={[styles.parent, styles.text2Layout]}>
        <Text
          style={[styles.text2, styles.text2Layout]}
        >{`어서오세요 !              님 !
이용하실 서비스를 
선택해주세요.`}</Text>
        <View style={[styles.groupChild, styles.edit1IconLayout]} />
      </View>
      <Pressable
        style={[styles.back, styles.backLayout]}
        onPress={() => navigation.navigate("LogIn")}
      >
        <View style={[styles.backChild, styles.backLayout]} />
        <Image
          style={styles.iconChevronleft}
          contentFit="cover"
          source={require("../assets/icon--chevronleft.png")}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  viewLayout: {
    height: 172,
    width: 137,
    position: "absolute",
  },
  childPosition: {
    borderRadius: Border.br_3xs,
    left: 0,
    top: 0,
  },
  textTypo: {
    height: 18,
    width: 99,
    textAlign: "center",
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_xl,
    left: 19,
    color: Color.colorBlack,
    position: "absolute",
  },
  edit1IconLayout: {
    width: 93,
    position: "absolute",
  },
  text2Layout: {
    height: 113,
    width: 322,
    left: "50%",
    position: "absolute",
  },
  backLayout: {
    height: 39,
    width: 39,
    position: "absolute",
  },
  mainpageChild: {
    top: 68,
    left: 11,
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorMediumseagreen_100,
    width: 370,
    height: 753,
    position: "absolute",
  },
  mainpageItem: {
    top: 329,
    left: 195,
    borderColor: Color.colorGainsboro_200,
    borderRightWidth: 1,
    width: 1,
    height: 271,
    borderStyle: "solid",
    position: "absolute",
  },
  child: {
    height: 172,
    width: 137,
    position: "absolute",
    backgroundColor: Color.colorWhite,
  },
  text: {
    top: 133,
  },
  camera1Icon: {
    top: 38,
    left: 24,
    width: 89,
    height: 77,
    position: "absolute",
  },
  view: {
    left: 37,
    top: 378,
    height: 172,
    width: 137,
  },
  text1: {
    top: 132,
  },
  edit1Icon: {
    left: 32,
    height: 153,
    top: 0,
    width: 93,
  },
  pressable: {
    left: 216,
    top: 378,
    height: 172,
    width: 137,
  },
  text2: {
    marginLeft: -161,
    fontSize: FontSize.size_13xl,
    fontWeight: "800",
    fontFamily: FontFamily.interExtraBold,
    textAlign: "left",
    color: Color.colorBlack,
    width: 322,
    left: "50%",
    top: 0,
  },
  groupChild: {
    top: 33,
    left: 169,
    borderColor: Color.colorBlack,
    borderTopWidth: 1,
    height: 1,
    borderStyle: "solid",
  },
  parent: {
    marginLeft: -162.5,
    top: 168,
  },
  backChild: {
    borderColor: Color.primary,
    borderWidth: 1,
    borderRadius: Border.br_3xs,
    left: 0,
    top: 0,
    borderStyle: "solid",
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
    top: 19,
    left: 17,
  },
  mainpage: {
    flex: 1,
    width: "100%",
    height: 852,
    overflow: "hidden",
    backgroundColor: Color.colorWhite,
  },
});

export default Mainpage;
