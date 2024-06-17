import * as React from "react";
import { ImageBackground, StyleSheet } from "react-native";

const Diet1 = () => {
  return (
    <ImageBackground
      style={styles.diet11Icon}
      resizeMode="cover"
      source={require("../assets/diet11.png")}
    />
  );
};

const styles = StyleSheet.create({
  diet11Icon: {
    width: 390,
    height: 404,
  },
});

export default Diet1;
