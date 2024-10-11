import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Header({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <FontAwesome name="recycle" style={styles.icon} />
        <View style={styles.inheader}>
          <Text style={styles.welcomeText}>Hi, Welcome Back</Text>
          <Text style={styles.username}>John Doe</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute', // Make the header fixed
    top: 0, // Position at the top of the screen
    left: 0,
    right: 0,
    backgroundColor: '#32CD32', // Green background
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 1000, // Ensure the header stays on top
  },
  icon: {
    fontSize: 44, // Adjusted icon size
    color: 'white', // Icon color
    marginRight: 10, // Space between icon and text
    flex: 2,
  },
  inheader: {
    flex: 1,
    flexDirection: 'column',
  },
  welcomeText: {
    flex: 1,
    color: '#fff',
    fontSize: 12,
  },
  username: {
    flex: 1,
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20, // Add padding or styling for scroll content
  },
  contentText: {
    fontSize: 16,
    marginVertical: 20,
  },
});
