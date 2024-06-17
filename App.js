import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import NavigationBar from './components/NavigationBar';

import Frame from './screens/Frame';
import Mainpage from './screens/Mainpage';
import LogIn from './screens/LogIn';
import Login1 from './screens/Login1';
import ServiceStart from './screens/ServiceStart';
import OpenningScreen from './screens/OpenningScreen';
import SignUp from './screens/SignUp';
import SignUp1 from './screens/SignUp1';
import Home from './screens/Home';
import Exercisevideo from './screens/Exercisevideo';
import Mypage from './screens/Mypage';

// New screens
import TrainerList from './screens/TrainerList';
import TodayExercise from './screens/TodayExercise';
import CreatePost from './screens/CreatePost';
import UpdatePost from './screens/UpdatePost';
import ListPost from './screens/ListPost';
import PostDetail from './screens/PostDetail';
import Chatting from './screens/Chatting';
import Chatting_User from './screens/Chatting_User';
import PhotoPost from './screens/PhotoPost';

const Stack = createNativeStackNavigator();

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  const [fontsLoaded, error] = useFonts({
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
    'Inter-ExtraBold': require('./assets/fonts/Inter-ExtraBold.ttf'),
    'Inter-Black': require('./assets/fonts/Inter-Black.ttf'),
    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
    'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
    'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
    'Lato-Black': require('./assets/fonts/Lato-Black.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <NavigationContainer>
      {hideSplashScreen ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Frame" component={Frame} />
          <Stack.Screen name="Mainpage" component={Mainpage} />
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="Login1" component={Login1} />
          <Stack.Screen name="ServiceStart" component={ServiceStart} />
          <Stack.Screen name="OpenningScreen" component={OpenningScreen} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SignUp1" component={SignUp1} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Exercisevideo" component={Exercisevideo} />
          {/* New screens for the trainer functionality */}
          <Stack.Screen name="TrainerList" component={TrainerList} />
          <Stack.Screen name="Mypage" component={Mypage} />
          <Stack.Screen name="TodayExercise" component={TodayExercise} />
          <Stack.Screen name="CreatePost" component={CreatePost} />
          <Stack.Screen name="UpdatePost" component={UpdatePost} />
          <Stack.Screen name="ListPost" component={ListPost} />
          <Stack.Screen name="PostDetail" component={PostDetail} />
          <Stack.Screen name="Chatting" component={Chatting} />
          <Stack.Screen name="Chatting_User" component={Chatting_User} />
          <Stack.Screen name="PhotoPost" component={PhotoPost} />

        </Stack.Navigator>
      ) : null}
    </NavigationContainer>
  );
};

export default App;
