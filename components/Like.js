import * as React from "react";
import { ImageBackground, StyleSheet } from "react-native";

const Like = () => {
  return (
    <ImageBackground
      style={styles.like1Icon}
      resizeMode="cover"
      source={require("../assets/like1.png")}
    />
  );
};

const styles = StyleSheet.create({
  like1Icon: {
    width: 41,
    height: 42,
  },
});

export default Like;
