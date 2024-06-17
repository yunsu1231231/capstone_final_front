import React, { useMemo } from "react";
import { Text, StyleSheet, View, ImageSourcePropType } from "react-native";
import { Image } from "expo-image";
import { FontFamily, FontSize, Color, Border, Padding } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const Input1 = ({
  title,
  text,
  icon,
  showText,
  error,
  inputPosition,
  inputTop,
  inputLeft,
  textColor,
  textTextAlign,
  iconOverflow,
}) => {
  const inputStyle = useMemo(() => {
    return {
      ...getStyleValue("position", inputPosition),
      ...getStyleValue("top", inputTop),
      ...getStyleValue("left", inputLeft),
    };
  }, [inputPosition, inputTop, inputLeft]);

  const text8Style = useMemo(() => {
    return {
      ...getStyleValue("color", textColor),
      ...getStyleValue("textAlign", textTextAlign),
    };
  }, [textColor, textTextAlign]);

  const iconStyle = useMemo(() => {
    return {
      ...getStyleValue("overflow", iconOverflow),
    };
  }, [iconOverflow]);

  return (
    <View>
      <Text style={[styles.title, styles.textTypo]}>{title}</Text>
      <View style={styles.inputField}>
        {showText && (
          <Text style={[styles.text, styles.textTypo, text8Style]}>{text}</Text>
        )}
        <Image
          style={[styles.icon, iconStyle]}
          contentFit="cover"
          source={icon}
        />
      </View>
      {!error && <Text style={styles.error}>Error</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  textTypo: {
    fontFamily: FontFamily.interRegular,
    textAlign: "left",
  },
  title: {
    fontSize: FontSize.size_sm,
    lineHeight: 18,
    color: Color.colorBlack,
    textAlign: "left",
  },
  text: {
    flex: 1,
    fontSize: FontSize.size_base,
    lineHeight: 20,
    color: "rgba(0, 0, 0, 0.5)",
    textAlign: "left",
  },
  icon: {
    width: 20,
    height: 20,
    overflow: "hidden",
    marginLeft: 10,
  },
  inputField: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorWhite,
    borderStyle: "solid",
    borderColor: "#d8dadc",
    borderWidth: 1,
    width: 353,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Padding.p_base,
    paddingVertical: 18,
    marginTop: 6,
  },
  error: {
    fontSize: FontSize.size_smi,
    lineHeight: 16,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: "#e64646",
    display: "none",
    marginTop: 6,
    textAlign: "left",
  },
});

export default Input1;
