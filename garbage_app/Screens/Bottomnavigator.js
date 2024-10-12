import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function Bottomnavigator(){
    return(
        <View style={styles.bottomNavigation}>
        <TouchableOpacity
          onPress={() => navigation.navigate("AdminProductsScreen")}
        >
          <Image
            source={require("../../assets/images/home.jpg")}
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../../assets/images/calender.jpg")}
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Collection")}>
          <Image
            source={require("../../assets/images/truck.jpg")}
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../../assets/images/alarm.jpg")}
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("AccountScreen")}>
        <Image
            source={require("../../assets/images/profile.jpg")}
            style={styles.navIcon}
          />
        </TouchableOpacity>
        
      </View>
    )
}

const styles=StyleSheet.create({
    bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#93E9BE",
  },
  navIcon: {
    width: 30,
    height: 30,
  },
})