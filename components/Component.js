import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";

const Component = () => {
  return (
    <View style={styles.component1}>
      <View style={styles.component1Child} />
      <Text style={styles.yes}>Yes</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  component1Child: {
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: Border.br_8xs,
    backgroundColor: Color.colorWhite,
    borderStyle: "solid",
    borderColor: Color.colorGainsboro_200,
    borderWidth: 1,
    position: "absolute",
  },
  yes: {
    height: "80%",
    width: "54.55%",
    top: "20%",
    left: "21.82%",
    fontSize: FontSize.size_base,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.colorBlack,
    textAlign: "left",
    position: "absolute",
  },
  component1: {
    top: 729,
    left: 64,
    width: 55,
    height: 30,
    position: "absolute",
  },
});

export default Component;
