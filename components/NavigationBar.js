import * as React from "react";
import { StyleSheet, View, Text, ImageSourcePropType } from "react-native";
import { Image } from "expo-image";
import { Border, Color, FontSize, FontFamily, Padding } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";


const NavigationBar = ({ buttonExplore }) => {
  return (
    <View style={[styles.navigationBar, styles.bgLayout]}>
      <View style={[styles.bg, styles.bgPosition]} />
      <Image
        style={[styles.buttonprofileIcon, styles.frameChildLayout]}
        contentFit="cover"
        source={require("../assets/buttonprofile.png")}
      />
      <View
        style={[styles.buttonexploreactive, styles.buttonexploreactiveLayout]}
      >
        <View
          style={[
            styles.buttonexploreactiveInner,
            styles.buttonexploreactiveLayout,
          ]}
        >
          <View style={[styles.frameParent, styles.bgPosition]}>
            <Image
              style={[styles.frameChild, styles.frameChildLayout]}
              contentFit="cover"
              source={require("../assets/frame-4.png")}
            />
            <Text style={styles.activity}>Activity</Text>
          </View>
        </View>
      </View>
      <Image
        style={[styles.buttonhomeIcon, styles.iconPosition]}
        contentFit="cover"
        source={require("../assets/buttonhome.png")}
      />
      <Image
        style={[styles.buttonexploreIcon, styles.iconPosition]}
        contentFit="cover"
        source={buttonExplore}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bgLayout: {
    height: 64,
    width: 340,
    position: "absolute",
  },
  bgPosition: {
    left: 0,
    top: 0,
  },
  frameChildLayout: {
    height: 24,
    width: 24,
  },
  buttonexploreactiveLayout: {
    height: 36,
    width: 108,
    position: "absolute",
  },
  iconPosition: {
    top: 21,
    height: 24,
    width: 24,
    position: "absolute",
  },
  bg: {
    borderRadius: Border.br_13xl,
    backgroundColor: Color.colorWhite,
    height: 64,
    width: 340,
    position: "absolute",
  },
  buttonprofileIcon: {
    top: 20,
    left: 286,
    position: "absolute",
  },
  frameChild: {
    overflow: "hidden",
  },
  activity: {
    fontSize: FontSize.size_smi,
    lineHeight: 24,
    fontWeight: "500",
    fontFamily: FontFamily.latoLight,
    color: Color.colorWhite,
    textAlign: "left",
    marginLeft: 4,
  },
  frameParent: {
    borderRadius: Border.br_24xl,
    backgroundColor: Color.primary,
    flexDirection: "row",
    paddingLeft: Padding.p_base,
    paddingTop: Padding.p_7xs,
    paddingRight: Padding.p_lgi,
    paddingBottom: Padding.p_7xs,
    position: "absolute",
  },
  buttonexploreactiveInner: {
    left: 0,
    top: 0,
  },
  buttonexploreactive: {
    top: 14,
    left: 147,
  },
  buttonhomeIcon: {
    left: 30,
  },
  buttonexploreIcon: {
    left: 102,
  },
  navigationBar: {
    top: 767,
    left: 24,
  },
});

export default NavigationBar;
