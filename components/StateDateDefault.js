import React, { useMemo } from "react";
import { Text, StyleSheet, View } from "react-native";
import { FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const StateDateDefault = ({
  dateNumber = "1",
  stateDateDefaultPosition,
  stateDateDefaultMarginLeft,
  stateDateDefaultBorderStyle,
  stateDateDefaultBorderColor,
  stateDateDefaultBorderWidth,
  stateDateDefaultPadding,
  stateDateDefaultBackgroundColor,
  textFontFamily,
  textFontWeight,
  textColor,
}) => {
  const stateDateDefaultStyle = useMemo(() => {
    return {
      ...getStyleValue("position", stateDateDefaultPosition),
      ...getStyleValue("marginLeft", stateDateDefaultMarginLeft),
      ...getStyleValue("borderStyle", stateDateDefaultBorderStyle),
      ...getStyleValue("borderColor", stateDateDefaultBorderColor),
      ...getStyleValue("borderWidth", stateDateDefaultBorderWidth),
      ...getStyleValue("padding", stateDateDefaultPadding),
      ...getStyleValue("backgroundColor", stateDateDefaultBackgroundColor),
    };
  }, [
    stateDateDefaultPosition,
    stateDateDefaultMarginLeft,
    stateDateDefaultBorderStyle,
    stateDateDefaultBorderColor,
    stateDateDefaultBorderWidth,
    stateDateDefaultPadding,
    stateDateDefaultBackgroundColor,
  ]);

  const text7Style = useMemo(() => {
    return {
      ...getStyleValue("fontFamily", textFontFamily),
      ...getStyleValue("fontWeight", textFontWeight),
      ...getStyleValue("color", textColor),
    };
  }, [textFontFamily, textFontWeight, textColor]);

  return (
    <View
      style={[
        styles.statedateDefault,
        styles.textFlexBox,
        stateDateDefaultStyle,
      ]}
    >
      <Text style={[styles.text, styles.textFlexBox, text7Style]}>
        {dateNumber}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.interRegular,
    color: Color.colorBlack,
    textAlign: "center",
    display: "flex",
    width: 24,
    height: 24,
  },
  statedateDefault: {
    borderStyle: "solid",
    borderColor: Color.colorLightgray,
    borderWidth: 1,
    padding: Padding.p_xl,
  },
});

export default StateDateDefault;
