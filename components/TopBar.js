import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import { Color, FontSize, FontFamily, Border } from "../GlobalStyles";

const TopBar = () => {
  return (
    <View style={[styles.topBar, styles.topBarPosition]}>
      <View style={styles.rectangle} />
      <Text style={[styles.allPosts, styles.allPostsPosition]}>All Posts</Text>
      <View style={[styles.back, styles.backLayout]}>
        <View style={[styles.backChild, styles.backLayout]} />
        <Image
          style={[styles.iconChevronleft, styles.allPostsPosition]}
          contentFit="cover"
          source={require("../assets/icon--chevronleft.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBarPosition: {
    left: 0,
    top: 0,
  },
  allPostsPosition: {
    top: "50%",
    position: "absolute",
  },
  backLayout: {
    height: 39,
    width: 39,
    position: "absolute",
  },
  rectangle: {
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    shadowColor: "#a6a6aa",
    shadowOffset: {
      width: 0,
      height: 0.33000001311302185,
    },
    shadowRadius: 0,
    elevation: 0,
    shadowOpacity: 1,
    backgroundColor: Color.colorGray_100,
    position: "absolute",
  },
  allPosts: {
    marginTop: -11,
    width: "29.23%",
    left: "35.38%",
    fontSize: FontSize.size_5xl,
    letterSpacing: 0,
    lineHeight: 21,
    fontWeight: "600",
    fontFamily: FontFamily.latoBold,
    color: Color.colorGray_200,
    textAlign: "center",
  },
  backChild: {
    borderRadius: Border.br_3xs,
    borderStyle: "solid",
    borderColor: Color.primary,
    borderWidth: 1,
    left: 0,
    top: 0,
  },
  iconChevronleft: {
    marginTop: -6.5,
    right: 16,
    width: 9,
    height: 15,
  },
  back: {
    top: 24,
    left: 16,
  },
  topBar: {
    width: 390,
    height: 88,
    overflow: "hidden",
    position: "absolute",
  },
});

export default TopBar;
