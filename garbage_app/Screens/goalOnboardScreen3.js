import React from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import auth from "../Services/firebaseAuth";
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function goalOnboardScreen3({ navigation }) {

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate('Loginscreen');
      })
  }

  const goalOnboardScreen2 = () => {
    navigation.navigate('goalOnboardScreen2')
  }

  const goalOnboardScreen4 = () => {
    navigation.navigate('goalOnboardScreen4')
  }

  const weeklyGoalScreen = () => {
    navigation.navigate('weeklyGoalScreen')
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <Text style={styles.welcome}>Hi, Welcome Back</Text>
        <Text style={styles.profilename}>Rock Lee</Text>
      </View>

      <View style={styles.middle}>
        <Text style={styles.content1}>Track Your Progress</Text>
        <Image source={require('../assets/images/progress.png')} style={styles.img1} />
      </View>

      <View style={styles.card}>
        <Text style={styles.content3}>
          Monitor your progress easily with our visual tools. See how close you are to reaching your goal each week.
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.startbtn} onPress={goalOnboardScreen2}>
          <Text style={styles.startbtntxt}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.startbtn} onPress={goalOnboardScreen4}>
          <Text style={styles.startbtntxt}>Next</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.startbtn} onPress={weeklyGoalScreen}>
          <Text style={styles.startbtntxt}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('goalProgresScreen')}>
          <Text style={styles.navIcon}>📊</Text>
          <Text style={styles.navButtonText}>Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('NotificationsScreen')}>
          <Text style={styles.navIcon}>🔔</Text>
          <Text style={styles.navButtonText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ProfileScreen')}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navButtonText}>Profile</Text>
        </TouchableOpacity>
      </View> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: -14,
  },
  header: {
    backgroundColor: '#00FF0A',
    width: '100%',
    height: 55,
    marginTop: 10
  },
  welcome: {
    textAlign: 'right',
    marginTop: -33,
    marginRight: 13,
    color: 'grey',
    fontSize: 17,
    fontWeight: 'bold'
  },
  profilename: {
    textAlign: 'right',
    marginTop: 2,
    marginRight: 80,
    fontWeight: 'bold',
    fontSize: 15
  },
  middle: {
    marginTop: 20
  },
  content1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'red',
    marginLeft: 25,
    textAlign: 'center',
  },
  img1: {
    width: '99%',
    height: '50%',
    resizeMode: 'cover',
    marginTop: 10,
  },
  card: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderColor: 'black',
    borderWidth: 5,
    borderRadius: 20,
    alignItems: 'center', 
  },
  content3: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 18,
    color: 'grey',
    textAlign: 'center',   
    paddingHorizontal: 20, 
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    position: 'absolute',
    bottom: 20, // Increased space between buttonRow and bottomNav
    width: '100%',
    paddingHorizontal: 10,
  },
  startbtn: {
    backgroundColor: '#55CA5C',
    padding: 8,
    borderRadius: 10,
    width: 80,
  },
  startbtntxt: {
    color: "white",
    fontWeight: "bold",
    textAlign: 'center',
    fontSize: 16
  },
  button: {
    width: '20%',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    borderRadius: 4,
    marginLeft: 10,
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#32CD32',
    padding: 16,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navButton: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
  },
  navButtonText: {
    fontSize: 14,
    color: 'white',
  },
});
