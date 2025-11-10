import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens//RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingScreen';
import QuizScreen from './src/screens/QuizScreen';
import AttachmentInfoScreen from './src/screens/AttachmentInfoScreen';
const Stack = createNativeStackNavigator();

function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen
          name="Register" 
          component={RegisterScreen}
          options={{ title: 'CalmMind - Register'}} 
        />
        <Stack.Screen 
          name="Login"
          component={LoginScreen}
          optons= {{title: 'CalmMind - Login'}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="Settings"
          component={SettingsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="Quiz"
          component={QuizScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="AttachmentInfo"
          component={AttachmentInfoScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;