import React , {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens//RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingScreen';
import QuizScreen from './src/screens/QuizScreen';
import AnxietyReliefScreen from './src/screens/AnxietyReliefScreen';
import ToolDetailScreen from './src/screens/ToolDetailScreen';
import MyStyleScreen from './src/screens/MyStyleScreen';
import CalmDownScreen from './src/screens/CalmDownScreen';
import RemindersAndNotesScreen from './src/screens/RemindersAndNotesScreen';
import NotificationService from './src/service/NotificationService';
const Stack = createNativeStackNavigator();

function App(){
  useEffect(() => {
    // request notification permissions on app start
    NotificationService.requestPermission();
    NotificationService.createChannel();
  }, []);

  
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
          name="MyStyleScreen"
          component={MyStyleScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AnxietyRelief"
          component={AnxietyReliefScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ToolDetail"
          component={ToolDetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="CalmDown"
          component={CalmDownScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RemindersAndNotes"
          component={RemindersAndNotesScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;