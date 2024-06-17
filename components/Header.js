import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.may2024}>May 2024</Text>
      <View style={styles.chevronParent}>
        <View style={styles.chevron}>
          <Image
            style={styles.chevronChild}
            contentFit="cover"
            source={require("../assets/icon.png")}
          />
        </View>
        <Image
          style={styles.chevronIcon}
          contentFit="cover"
          source={require("../assets/chevron.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  may2024: {
    fontSize: FontSize.size_5xl,
    fontWeight: "900",
    fontFamily: FontFamily.interBlack,
    color: Color.colorBlack,
    textAlign: "left",
  },
  chevronChild: {
    width: 14,
    height: 14,
  },
  chevron: {
    padding: Padding.p_base,
    flexDirection: "row",
  },
  chevronIcon: {
    width: 46,
    height: 46,
    marginLeft: 8,
  },
  chevronParent: {
    flexDirection: "row",
  },
  header: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

export default Header;
