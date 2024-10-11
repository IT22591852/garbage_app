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


//we want to declare for stack it contains all loading screens
const Stack=createNativeStackNavigator();


export default function HomeScreen() {
  return (
    //  <LoginScreen/>
    //  <DashboardScreen/>
    // <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={LoginScreen}/>
        <Stack.Screen name='Register' component={RegisterScreen}/>
        <Stack.Screen name='Dashboard' component={DashboardScreen}/>
        <Stack.Screen name='weeklyGoalScreen' component={weeklyGoalScreen}/>
        <Stack.Screen name='goalOnboardScreen1' component={goalOnboardScreen1}/>
        <Stack.Screen name='goalOnboardScreen2' component={goalOnboardScreen2}/>
        <Stack.Screen name='goalOnboardScreen3' component={goalOnboardScreen3}/>  
        <Stack.Screen name='goalOnboardScreen4' component={goalOnboardScreen4}/>  
        <Stack.Screen name='setGoalScreen' component={setGoalScreen}/>
        <Stack.Screen name='displayGoal' component={displayGoal}/>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Order' component={Order}/>
        <Stack.Screen name='Schedule' component={Schedule}/>
        <Stack.Screen name='User' component={User}/>
        <Stack.Screen name='NormalRequest' component={NormalRequest}/>
        <Stack.Screen name='SpecialRequest' component={SpecialRequest}/>

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
