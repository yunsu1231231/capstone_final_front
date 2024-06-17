import React, { useMemo } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Padding, Color, FontSize, FontFamily } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const Row = ({
  prop,
  prop1,
  prop2,
  prop3,
  prop4,
  prop5,
  prop6,
  rowPosition,
  rowMarginTop,
  cellBorderStyle,
  cellBorderColor,
  cellBorderWidth,
  cellPadding,
  cellBackgroundColor,
  textFontFamily,
  textFontWeight,
  textColor,
  cellBorderStyle1,
  cellBorderColor1,
  cellBorderWidth1,
  cellPadding1,
  cellBackgroundColor1,
  textFontFamily1,
  textFontWeight1,
  textColor1,
  cellBorderStyle2,
  cellBorderColor2,
  cellBorderWidth2,
  cellPadding2,
  cellBackgroundColor2,
  textFontFamily2,
  textFontWeight2,
  textColor2,
  cellBorderStyle3,
  cellBorderColor3,
  cellBorderWidth3,
  cellPadding3,
  textFontFamily3,
  textFontWeight3,
  cellBorderStyle4,
  cellBorderColor4,
  cellBorderWidth4,
  cellPadding4,
  textFontFamily4,
  textFontWeight4,
  cellBorderStyle5,
  cellBorderColor5,
  cellBorderWidth5,
  cellPadding5,
  textFontFamily5,
  textFontWeight5,
  cellBorderStyle6,
  cellBorderColor6,
  cellBorderWidth6,
  cellPadding6,
  cellBackgroundColor3,
  textFontFamily6,
  textFontWeight6,
  textColor3,
}) => {
  const rowStyle = useMemo(() => {
    return {
      ...getStyleValue("position", rowPosition),
      ...getStyleValue("marginTop", rowMarginTop),
    };
  }, [rowPosition, rowMarginTop]);

  const cellStyle = useMemo(() => {
    return {
      ...getStyleValue("borderStyle", cellBorderStyle),
      ...getStyleValue("borderColor", cellBorderColor),
      ...getStyleValue("borderWidth", cellBorderWidth),
      ...getStyleValue("padding", cellPadding),
      ...getStyleValue("backgroundColor", cellBackgroundColor),
    };
  }, [
    cellBorderStyle,
    cellBorderColor,
    cellBorderWidth,
    cellPadding,
    cellBackgroundColor,
  ]);

  const textStyle = useMemo(() => {
    return {
      ...getStyleValue("fontFamily", textFontFamily),
      ...getStyleValue("fontWeight", textFontWeight),
      ...getStyleValue("color", textColor),
    };
  }, [textFontFamily, textFontWeight, textColor]);

  const cell1Style = useMemo(() => {
    return {
      ...getStyleValue("borderStyle", cellBorderStyle1),
      ...getStyleValue("borderColor", cellBorderColor1),
      ...getStyleValue("borderWidth", cellBorderWidth1),
      ...getStyleValue("padding", cellPadding1),
      ...getStyleValue("backgroundColor", cellBackgroundColor1),
    };
  }, [
    cellBorderStyle1,
    cellBorderColor1,
    cellBorderWidth1,
    cellPadding1,
    cellBackgroundColor1,
  ]);

  const text1Style = useMemo(() => {
    return {
      ...getStyleValue("fontFamily", textFontFamily1),
      ...getStyleValue("fontWeight", textFontWeight1),
      ...getStyleValue("color", textColor1),
    };
  }, [textFontFamily1, textFontWeight1, textColor1]);

  const cell2Style = useMemo(() => {
    return {
      ...getStyleValue("borderStyle", cellBorderStyle2),
      ...getStyleValue("borderColor", cellBorderColor2),
      ...getStyleValue("borderWidth", cellBorderWidth2),
      ...getStyleValue("padding", cellPadding2),
      ...getStyleValue("backgroundColor", cellBackgroundColor2),
    };
  }, [
    cellBorderStyle2,
    cellBorderColor2,
    cellBorderWidth2,
    cellPadding2,
    cellBackgroundColor2,
  ]);

  const text2Style = useMemo(() => {
    return {
      ...getStyleValue("fontFamily", textFontFamily2),
      ...getStyleValue("fontWeight", textFontWeight2),
      ...getStyleValue("color", textColor2),
    };
  }, [textFontFamily2, textFontWeight2, textColor2]);

  const cell3Style = useMemo(() => {
    return {
      ...getStyleValue("borderStyle", cellBorderStyle3),
      ...getStyleValue("borderColor", cellBorderColor3),
      ...getStyleValue("borderWidth", cellBorderWidth3),
      ...getStyleValue("padding", cellPadding3),
    };
  }, [cellBorderStyle3, cellBorderColor3, cellBorderWidth3, cellPadding3]);

  const text3Style = useMemo(() => {
    return {
      ...getStyleValue("fontFamily", textFontFamily3),
      ...getStyleValue("fontWeight", textFontWeight3),
    };
  }, [textFontFamily3, textFontWeight3]);

  const cell4Style = useMemo(() => {
    return {
      ...getStyleValue("borderStyle", cellBorderStyle4),
      ...getStyleValue("borderColor", cellBorderColor4),
      ...getStyleValue("borderWidth", cellBorderWidth4),
      ...getStyleValue("padding", cellPadding4),
    };
  }, [cellBorderStyle4, cellBorderColor4, cellBorderWidth4, cellPadding4]);

  const text4Style = useMemo(() => {
    return {
      ...getStyleValue("fontFamily", textFontFamily4),
      ...getStyleValue("fontWeight", textFontWeight4),
    };
  }, [textFontFamily4, textFontWeight4]);

  const cell5Style = useMemo(() => {
    return {
      ...getStyleValue("borderStyle", cellBorderStyle5),
      ...getStyleValue("borderColor", cellBorderColor5),
      ...getStyleValue("borderWidth", cellBorderWidth5),
      ...getStyleValue("padding", cellPadding5),
    };
  }, [cellBorderStyle5, cellBorderColor5, cellBorderWidth5, cellPadding5]);

  const text5Style = useMemo(() => {
    return {
      ...getStyleValue("fontFamily", textFontFamily5),
      ...getStyleValue("fontWeight", textFontWeight5),
    };
  }, [textFontFamily5, textFontWeight5]);

  const cell6Style = useMemo(() => {
    return {
      ...getStyleValue("borderStyle", cellBorderStyle6),
      ...getStyleValue("borderColor", cellBorderColor6),
      ...getStyleValue("borderWidth", cellBorderWidth6),
      ...getStyleValue("padding", cellPadding6),
      ...getStyleValue("backgroundColor", cellBackgroundColor3),
    };
  }, [
    cellBorderStyle6,
    cellBorderColor6,
    cellBorderWidth6,
    cellPadding6,
    cellBackgroundColor3,
  ]);

  const text6Style = useMemo(() => {
    return {
      ...getStyleValue("fontFamily", textFontFamily6),
      ...getStyleValue("fontWeight", textFontWeight6),
      ...getStyleValue("color", textColor3),
    };
  }, [textFontFamily6, textFontWeight6, textColor3]);

  return (
    <View style={[styles.row, rowStyle]}>
      <View style={[styles.cellBorder, cellStyle]}>
        <Text style={[styles.text, textStyle]}>{prop}</Text>
      </View>
      <View style={[styles.cell1, styles.cellBorder, cell1Style]}>
        <Text style={[styles.text, text1Style]}>{prop1}</Text>
      </View>
      <View style={[styles.cell1, styles.cellBorder, cell2Style]}>
        <Text style={[styles.text, text2Style]}>{prop2}</Text>
      </View>
      <View style={[styles.cell1, styles.cellBorder, cell3Style]}>
        <Text style={[styles.text, text3Style]}>{prop3}</Text>
      </View>
      <View style={[styles.cell1, styles.cellBorder, cell4Style]}>
        <Text style={[styles.text, text4Style]}>{prop4}</Text>
      </View>
      <View style={[styles.cell1, styles.cellBorder, cell5Style]}>
        <Text style={[styles.text, text5Style]}>{prop5}</Text>
      </View>
      <View style={[styles.cell1, styles.cellBorder, cell6Style]}>
        <Text style={[styles.text, text6Style]}>{prop6}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cellBorder: {
    padding: Padding.p_xl,
    borderWidth: 1,
    borderColor: Color.colorLightgray,
    borderStyle: "solid",
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
    justifyContent: "center",
    alignItems: "center",
  },
  cell1: {
    marginLeft: -1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Row;
