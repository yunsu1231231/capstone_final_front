import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Color, FontFamily, Border } from "../GlobalStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Mypage = () => {
  const navigation = useNavigation();
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchUsername = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    };
    fetchUsername();
  }, []);

  useEffect(() => {
    const fetchEmail = async () => {
      const storedEmail = await AsyncStorage.getItem('email');
      if (storedEmail) {
        setEmail(storedEmail);
      }
    };
    fetchEmail();
  }, []);

  useEffect(() => {
    const fetchPassword = async () => {
      const storedPassword = await AsyncStorage.getItem('password');
      if (storedPassword) {
        setPassword(storedPassword);
      }
    };
    fetchPassword();
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <Image source={require('../assets/rightarrow-1.png')} style={styles.backIcon} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.mypageContent}>
          <Text style={styles.title}>{`${username} 님의 정보`}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>이름: {username}</Text>
            <Text style={styles.infoText}>이메일: {email}</Text>
            <View style={styles.passwordContainer}>
              <Text style={styles.infoText}>
                비밀번호: {showPassword ? password : '*'.repeat(password.length)}
              </Text>
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Image source={require('../assets/hide.png')} style={styles.eyeIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={[styles.navigationBar, styles.bgLayout]}>
        <View style={[styles.bg, styles.bgLayout]} />
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
            <View style={[styles.buttonprofileParent, styles.bgPosition]}>
              <Image
                style={styles.iconLayout}
                contentFit="cover"
                source={require("../assets/Mypage.png")}
              />
              <Text style={styles.mypage1}>Mypage</Text>
            </View>
          </View>
        </View>
        <Pressable
          style={[styles.buttonhomeIcon, styles.iconLayout]}
          onPress={() => navigation.navigate('Home')}
        >
          <Image
            style={[styles.icon, styles.iconLayout1]}
            contentFit="cover"
            source={require("../assets/buttonhome.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.box5, styles.iconLayout]}
          onPress={() => navigation.navigate("Exercisevideo")}
        >
          <Image
            style={[styles.icon, styles.iconLayout1]}
            contentFit="cover"
            source={require("../assets/buttonexplore.png")}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D7F2EC",
  },
  scrollContentContainer: {
    paddingBottom: 100,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 1,
  },
  bgLayout: {
    height: 64,
    width: 340,
    position: "absolute",
  },
  bg: {
    borderRadius: Border.br_13xl,
    backgroundColor: Color.colorWhite,
    left: 0,
    top: 0,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  saveButton: {
    position: 'absolute',
    top: 40,
    right: 10,
    zIndex: 1,
    backgroundColor: Color.colorMediumseagreen_100,
    borderRadius: Border.br_xl,
    padding: 10,
  },
  saveButtonText: {
    color: Color.colorWhite,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.interMedium,
  },
  mypageContent: {
    marginTop: 100,
    alignItems: 'center',
  },
  profileIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: FontSize.size_13xl,
    fontWeight: "800",
    fontFamily: FontFamily.interExtraBold,
    color: Color.colorBlack,
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: Color.colorWhite,
    padding: 20,
    borderRadius: Border.br_xl,
    width: '90%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoText: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.interMedium,
    color: Color.colorBlack,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  navigationbar: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: Color.colorWhite,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: Color.colorGray,
  },
  navIcon: {
    width: 30,
    height: 30,
  },
  ypageItemBorder: {
    borderStyle: "solid",
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
    width: 110,
    position: "absolute",
  },
  bgPosition: {
    left: 0,
    top: -4,
  },
  mypageItem: {
    top: 333,
    left: 196,
    borderColor: Color.colorGainsboro_200,
    borderRightWidth: 1,
    width: 1,
    height: 271,
  },
  profile1Icon: {
    top: 177,
    width: 156,
    height: 156,
    left: 118,
    position: "absolute",
  },
  buttonstatisticIcon: {
    left: 170,
    top: 21,
    width: 24,
    position: "absolute",
  },
  mypage1: {
    fontSize: FontSize.size_smi,
    fontWeight: "500",
    fontFamily: FontFamily.latoLight,
    color: Color.colorWhite,
    marginLeft: 4,
    lineHeight: 24,
    textAlign: "left",
  },
  buttonprofileParent: {
    borderRadius: Border.br_24xl,
    backgroundColor: Color.primary,
    flexDirection: "row",
    paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 8,
    position: "absolute",
  },
  buttonexploreactiveInner: {
    left: 0,
    top: 0,
  },
  buttonexploreactive: {
    top: 15,
    left: 214,
  },
  buttonhomeIcon: {
    left: 30,
    top: 21,
    width: 24,
    position: "absolute",
  },
  icon: {
    height: "100%",
  },
  box5: {
    left: 102,
    top: 20,
    position: "absolute",
  },
  navigationBar: {
    top: 769,
    left: 27,
  },
  view: {
    top: 40,
    left: 316,
  },
  mypage: {
    backgroundColor: "#D7F2EC",
    flex: 1,
    height: 843,
  }
});

export default Mypage;

