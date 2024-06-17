import React, { useMemo } from "react";
import { Text, StyleSheet, View } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const ButtonPrimary = ({
  buttonText,
  buttonPrimaryPosition,
  buttonPrimaryBackgroundColor,
  buttonPrimaryTop,
  buttonPrimaryLeft,
  onButtonPrimaryPress,
}) => {
  const buttonPrimaryStyle = useMemo(() => {
    return {
      ...getStyleValue("position", buttonPrimaryPosition),
      ...getStyleValue("backgroundColor", buttonPrimaryBackgroundColor),
      ...getStyleValue("top", buttonPrimaryTop),
      ...getStyleValue("left", buttonPrimaryLeft),
    };
  }, [
    buttonPrimaryPosition,
    buttonPrimaryBackgroundColor,
    buttonPrimaryTop,
    buttonPrimaryLeft,
  ]);

  return (
    <View
      style={[styles.buttonPrimary, buttonPrimaryStyle]}
      onPress={onButtonPrimaryPress}
    >
      <Text style={styles.button}>{buttonText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    fontSize: FontSize.size_base,
    lineHeight: 20,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorWhite,
    textAlign: "center",
  },
  buttonPrimary: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorBlack,
    width: 353,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Padding.p_133xl,
    paddingVertical: Padding.p_mid,
  },
});

export default ButtonPrimary;
