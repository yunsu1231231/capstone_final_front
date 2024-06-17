import * as React from "react";
import { useState, useEffect } from "react";
import { Image, Linking, StyleSheet, Text, View, Pressable, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontSize, FontFamily, Border, Padding } from "../GlobalStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from "@rneui/base";

const Exercisevideo = () => {
  const navigation = useNavigation();
  const [postname, setPostname] = React.useState("");

  React.useEffect(() => {
    const fetchPostname = async () => {
      const storedPostname = await AsyncStorage.getItem('postname'); // SignUp에서 저장한 postname을 불러옴
      if (storedPostname) {
        setPostname(storedPostname);
      }
    };
    fetchPostname();
  }, []);

  const openYouTubeLink = (url) => {
    Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
  };

  return (
    
    <View style={styles.exercisevideo}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
          <Image source={require('../assets/rightarrow-1.png')} style={styles.backIcon} />
        </TouchableOpacity>
      <Image
        style={[styles.exercisevideoChild, styles.exercisevideoLayout]}
        contentFit="cover"
        source={require("../assets/Ellipse.png")}
      />
      <Image
        style={[styles.exercisevideoItem, styles.exercisevideoLayout]}
        contentFit="cover"
        source={require("../assets/Ellipse.png")}
      />
      <Image
        style={[styles.exercisevideoInner, styles.ellipseIconPosition]}
        contentFit="cover"
        source={require("../assets/Ellipse.png")}
      />
      <Image
        style={[styles.ellipseIcon, styles.ellipseIconPosition]}
        contentFit="cover"
        source={require("../assets/Ellipse.png")}
      />
      <View style={styles.heading}>
        <Text style={styles.text}>{`${postname} 님 !`}</Text>
        <Text style={styles.text1}>오늘도 운동하러 오셨군요 !</Text>
      </View>

      <Pressable onPress={() => openYouTubeLink("https://www.youtube.com/watch?v=a4mcRL99pU0")}>
        <Image
          style={styles.gym1Icon}
          contentFit="cover"
          source={require("../assets/squat.png")}
        />
      </Pressable>
      <Pressable onPress={() => openYouTubeLink("https://www.youtube.com/watch?v=7IZtFeqtdGE")}>
        <Image
          style={styles.biceps1Icon}
          contentFit="cover"
          source={require("../assets/dumbbelcurl.png")}
        />
      </Pressable>
      <Pressable onPress={() => openYouTubeLink("https://www.youtube.com/watch?v=66gDfjrm-gk")}>
        <Image
          style={styles.gym2Icon}
          contentFit="cover"
          source={require("../assets/lunge.png")}
        />
      </Pressable>
      <Pressable onPress={() => openYouTubeLink("https://www.youtube.com/watch?v=0Vl5X_Qa6aE")}>
        <Image
          style={styles.standing1Icon}
          contentFit="cover"
          source={require("../assets/shoulderpress.png")}
        />
      </Pressable>
      <View style={styles.text2Container}>
        <Text style={styles.text2}>어떤 운동을 확인하시겠습니까 ?</Text>
      </View>
      <Text style={[styles.text3, styles.textTypo]}>스쿼트</Text>
      <Text style={[styles.text4, styles.textTypo]}>런지</Text>
      <Text style={[styles.text5, styles.textTypo]}>덤벨컬</Text>
      <Text style={styles.text6}>숄더 프레스</Text>
      <Image
        style={styles.lineIcon}
        contentFit="cover"
        source={require("../assets/line-3.png")}
      />
      <View style={[styles.exercisevideoChild1, styles.lineViewLayout]} />
      <View style={[styles.navigationBar, styles.bgLayout]}>
        <View style={[styles.bg, styles.bgLayout]} />
        <Pressable
          style={[styles.buttonprofile, styles.iconLayout]}
          onPress={() => navigation.navigate("Mypage")}
        >
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../assets/buttonprofile.png")}
          />
        </Pressable>
        <Image
          style={[styles.buttonstatisticIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/buttonstatistic.png")}
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
            <View style={[styles.buttonexploreParent, styles.bgPosition]}>
              <Image
                style={styles.iconLayout}
                contentFit="cover"
                source={require("../assets/Explore.png")}
              />
              <Text style={styles.explore}>Explore</Text>
            </View>
          </View>
        </View>
        <Pressable
          onPress={() => navigation.navigate("Home")}
        >
        <Image
          style={[styles.buttonhomeIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/buttonhome.png")}
        />
        </Pressable>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  exercisevideoLayout: {
    height: 155,
    width: 155,
    top: 266, // 아래로 30픽셀 이동
    position: "absolute",
  },
  ellipseIconPosition: {
    top: 488, // 아래로 30픽셀 이동
    height: 155,
    width: 155,
    position: "absolute",
  },
  lineViewLayout: {
    height: 1,
    borderTopWidth: 1,
    borderStyle: "solid",
    position: "absolute",
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 1,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  textTypo: {
    width: 69,
    height: 25,
    color: Color.colorBlack,
    fontSize: FontSize.size_3xl,
    fontFamily: FontFamily.latoBold,
    fontWeight: "600",
    position: "absolute",
  },
  bgLayout: {
    height: 64,
    width: 340,
    position: "absolute",
  },
  iconLayout: {
    height: 24,
    width: 24,
  },
  buttonexploreactiveLayout: {
    height: 36,
    width: 107,
    position: "absolute",
  },
  bgPosition: {
    left: 0,
    top: 0,
  },
  exercisevideoChild: {
    left: 30,
  },
  exercisevideoItem: {
    left: 204,
  },
  exercisevideoInner: {
    left: 204,
  },
  ellipseIcon: {
    left: 30,
  },
  text: {
    top: 40,
    left: 20,
    fontSize: FontSize.size_5xl,
    fontWeight: "800",
    fontFamily: FontFamily.latoBlack,
    textAlign: "left",
    color: Color.colorGray_300,
    position: "absolute",
  },
  text1: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.latoBold,
    fontWeight: "600",
    left: 0,
    top: 20,
    textAlign: "left",
    color: Color.colorBlack,
    position: "absolute",
  },
  heading: {
    top: 41,
    left: 194,
    width: 172,
    height: 55,
    position: "absolute",
  },
  lineView: {
    top: 259, // 아래로 30픽셀 이동
    left: 205,
    borderColor: Color.colorBlack,
    width: 112,
  },
  backbuttonChild: {
    borderRadius: Border.br_3xs,
    borderColor: Color.primary,
    borderWidth: 2,
    borderStyle: "solid",
    height: 39,
    width: 41,
    left: 0,
    top: 0,
  },
  rightArrow1Icon: {
    top: 11,
    left: 10,
    width: 20,
    height: 16,
    position: "absolute",
  },
  backbutton: {
    top: 48,
    left: 14,
  },
  gym1Icon: {
    top: 282, // 아래로 30픽셀 이동
    left: 48,
    width: 119,
    height: 119,
    position: "absolute",
  },
  biceps1Icon: {
    top: 514, // 아래로 30픽셀 이동
    left: 232,
    width: 102,
    height: 102,
    position: "absolute",
  },
  gym2Icon: {
    top: 500, // 아래로 30픽셀 이동
    left: 43,
    width: 130,
    height: 130,
    position: "absolute",
  },
  text2Container: {
    top: 138,
    left: 0,
    width: "100%",
    height: 70,
    backgroundColor: Color.colorWhite,
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute",
  },
  text2: {
    color: Color.colorBlack,
    fontSize: FontSize.size_xl,
    textAlign: "center",
    fontFamily: FontFamily.latoBold,
    fontWeight: "600",
  },
  text3: {
    left: 82,
    top: 437, // 아래로 30픽셀 이동
    width: 69,
    textAlign: "left",
  },
  text4: {
    left: 246,
    top: 437, // 아래로 30픽셀 이동
    width: 69,
    textAlign: "center",
  },
  text5: {
    top: 659, // 아래로 30픽셀 이동
    left: 247,
    textAlign: "center",
  },
  text6: {
    top: 662, // 아래로 30픽셀 이동
    left: 54,
    width: 107,
    height: 25,
    textAlign: "center",
    color: Color.colorBlack,
    fontSize: FontSize.size_3xl,
    fontFamily: FontFamily.latoBold,
    fontWeight: "600",
    position: "absolute",
  },
  lineIcon: {
    top: 259, // 아래로 30픽셀 이동
    left: 193,
    width: 1,
    height: 447,
    position: "absolute",
  },
  exercisevideoChild1: {
    top: 474, // 아래로 30픽셀 이동
    left: 55,
    borderColor: Color.colorGainsboro_200,
    width: 280,
  },
  standing1Icon: {
    top: 286, // 아래로 30픽셀 이동
    left: 223,
    width: 118,
    height: 118,
    position: "absolute",
  },
  bg: {
    borderRadius: Border.br_13xl,
    backgroundColor: Color.colorWhite,
    left: 0,
    top: 0,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  buttonprofile: {
    left: 286,
    top: 20,
    width: 24,
    position: "absolute",
  },
  buttonstatisticIcon: {
    left: 214,
    top: 20,
    width: 24,
    position: "absolute",
  },
  buttonexploreIcon: {
    left: 14,
    top: 10,
    width: 24,
    position: "absolute",
  },
  explore: {
    fontSize: FontSize.size_smi,
    color: Color.colorWhite,
    lineHeight: 24,
    fontWeight: "500",
    fontFamily: FontFamily.latoLight,
    marginLeft: 4,
    textAlign: "left",
  },
  buttonexploreParent: {
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
    left: 80,
  },
  buttonhomeIcon: {
    color: color.colorWhite,
    top: 18,
    left: 28,
    position: "absolute",
  },
  navigationBar: {
    top: 770,
    left: 23,
  },
  exercisevideo: {
    backgroundColor: Color.colorLightcyan,
    flex: 1,
    height: 844,
    overflow: "hidden",
    width: "100%",
  },
});

export default Exercisevideo;

