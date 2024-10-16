import { Image, StyleSheet, Platform } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RegisterScreen from '../../Screens/RegisterScreen';
import LoginScreen from '../../Screens/LoginScreen';
import DashboardScreen from '../../Screens/DashboardScreen';
import weeklyGoalScreen from '../../Screens/weeklyGoalScreen';
import goalOnboardScreen1 from '../../Screens/goalOnboardScreen1';
import goalOnboardScreen2 from '../../Screens/goalOnboardScreen2';
import goalOnboardScreen3 from '../../Screens/goalOnboardScreen3';
import goalOnboardScreen4 from '../../Screens/goalOnboardScreen4'; 
import setGoalScreen from '../../Screens/setGoalScreen';
import displayGoal from '../../Screens/displayGoal';
import Home from '../../Screens/Home';
import Order from '../../Screens/Order';
import NormalRequest from '../../Screens/NormalRequest';
import SpecialRequest from '../../Screens/SpecialRequest';
import Schedule from '../../Screens/Schedule';
import User from '../../Screens/User';
import goalProgresScreen from '../../Screens/goalProgresScreen';
import displayGoal2 from '../../Screens/displayGoal2';
import QRGenarated from '../../Screens/QRGenarated';
import TestOngoing from '../../Screens/TestOngoing';

//we want to declare for stack it contains all loading screens
const Stack=createNativeStackNavigator();


export default function HomeScreen() {
  return (
    //  <LoginScreen/>
    //  <DashboardScreen/>
    // <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>

        
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Order' component={Order}/>
        <Stack.Screen name='Schedule' component={Schedule}/>
        <Stack.Screen name='User' component={User}/>
        <Stack.Screen name='NormalRequest' component={NormalRequest}/>
        <Stack.Screen name='SpecialRequest' component={SpecialRequest}/>
        <Stack.Screen name='QRGenerator' component={QRGenarated}/>
        <Stack.Screen name='TestOngoing' component={TestOngoing}/>
        <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name='Register' component={RegisterScreen}options={{ headerShown: false }}/>
        <Stack.Screen name='Dashboard' component={DashboardScreen}options={{ headerShown: false }}/>
        <Stack.Screen name='weeklyGoalScreen' component={weeklyGoalScreen}options={{ headerShown: false }}/>
        <Stack.Screen name='goalOnboardScreen1' component={goalOnboardScreen1}options={{ headerShown: false }}/>
        <Stack.Screen name='goalOnboardScreen2' component={goalOnboardScreen2}options={{ headerShown: false }}/>
        <Stack.Screen name='goalOnboardScreen3' component={goalOnboardScreen3}options={{ headerShown: false }}/>  
        <Stack.Screen name='goalOnboardScreen4' component={goalOnboardScreen4}options={{ headerShown: false }}/>  
        <Stack.Screen name='setGoalScreen' component={setGoalScreen}options={{ headerShown: false }}/>
        <Stack.Screen name='displayGoal' component={displayGoal}options={{ headerShown: false }}/>
        <Stack.Screen name='displayGoal2' component={displayGoal2}options={{ headerShown: false }}/>
        <Stack.Screen name='goalProgresScreen' component={goalProgresScreen}options={{ headerShown: false }}/>
       
      </Stack.Navigator>
    // </NavigationContainer> 
    
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
