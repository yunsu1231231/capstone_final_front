import * as React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { Border, Color, FontSize, FontFamily, Padding } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";

const HomeContainer = () => {
  const navigation = useNavigation();

  const onPressExplore = () => {
    navigation.navigate("Exercisevideo");
  };
  
  const onPressProfile= () => {
    navigation.navigate("Mypage");
  };
  const onPressSNS= () => {
    navigation.navigate("PhotoPost");
  };
  const onPressHome= () => {
    navigation.navigate("Home");
  };

  return (
    <View style={[styles.navigationBar, styles.bgLayout]}>
      <View style={[styles.bg, styles.bgPosition]} />
      <Pressable onPress={onPressProfile}>
      <Image
        style={[styles.buttonprofileIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/buttonprofile.png")}
      />
      </Pressable>
      <Pressable onPress={onPressSNS}>
      <Image
        style={[styles.buttonstatisticIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/buttonstatistic.png")}
      />
      </Pressable>
      <Pressable onPress={onPressExplore}>
        <Image
          style={[styles.buttonexploreIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/buttonexplore.png")}
        />
      </Pressable>
      <View style={styles.buttonhomeactive}>
        <View style={[styles.homeParent, styles.bgPosition]}>
        <Pressable onPress={onPressHome}>
          <Image
            style={[styles.homeIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/home.png")}
          />
          </Pressable>
          <Text style={styles.home}>Home</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bgLayout: {
    height: 64,
    width: 340,
  },
  bgPosition: {
    left: 0,
    top: 0,
    position: "absolute",
  },
  iconLayout: {
    height: 24,
    width: 24,
  },
  bg: {
    borderRadius: Border.br_13xl,
    backgroundColor: Color.colorWhite,
    height: 64,
    width: 340,
  },
  buttonprofileIcon: {
    left: 286,
    top: 20,
    width: 24,
    position: "absolute",
  },
  buttonstatisticIcon: {
    left: 214,
    top: 20,
    width: 24,
    position: "absolute",
  },
  buttonexploreIcon: {
    left: 142,
    top: 20,
    width: 24,
    position: "absolute",
  },
  homeIcon: {
    overflow: "hidden",
  },
  home: {
    fontSize: FontSize.size_smi,
    lineHeight: 24,
    fontWeight: "500",
    fontFamily: FontFamily.latoLight,
    color: Color.colorWhite,
    textAlign: "left",
    marginLeft: 4,
  },
  homeParent: {
    borderRadius: Border.br_24xl,
    backgroundColor: Color.primary,
    flexDirection: "row",
    paddingLeft: Padding.p_base,
    paddingTop: Padding.p_7xs,
    paddingRight: Padding.p_lgi,
    paddingBottom: Padding.p_7xs,
  },
  buttonhomeactive: {
    top: 14,
    left: 14,
    width: 98,
    height: 36,
    position: "absolute",
  },
  navigationBar: {
    top: 768,
    left: 25,
    position: "absolute",
  },
});

export default HomeContainer;

