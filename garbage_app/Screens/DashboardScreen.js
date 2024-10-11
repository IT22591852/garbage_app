import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image,ScrollView,SafeAreaView } from 'react-native';
import { signOut } from 'firebase/auth';
import auth from "../Services/firebaseAuth";
import Header from './Header';
import Footer from './Footer';
// import CountUp from 'react-native-countup';

export default function DashboardScreen({ navigation }) {

    const handlelogout=()=>{
         signOut(auth)
         .then(()=>{
          navigation.navigate('Login') //when user log out the page will navigate to login page 
         })
   
        }
    const handleOnBoard = () => {
        navigation.navigate('goalOnboardScreen1');
    };

    const handleQRScanner = () => {
        navigation.navigate('QRScanner');
    };

    const handleQRGenerator = () => {
        navigation.navigate('QRGenerator');
    };

    const handleTestOngoing = () => {
        navigation.navigate('TestOngoing');
    };

    const goToHome=()=>{
        navigation.navigate('Home')
      }
  

     // Initialize count state variables
     const [paperCount, setPaperCount] = useState(0);
     const [plasticCount, setPlasticCount] = useState(0);
     const [glassCount, setGlassCount] = useState(0);
     const [otherCount, setOtherCount] = useState(0);
 
     // Function to animate counts
     useEffect(() => {
         let paper = 0, plastic = 0, glass = 0, other = 0;
         const interval = setInterval(() => {
             if (paper < 42) setPaperCount(++paper);
             if (plastic < 42) setPlasticCount(++plastic);
             if (glass < 8) setGlassCount(++glass);
             if (other < 12) setOtherCount(++other);
             if (paper >= 24 && plastic >= 42 && glass >= 8 && other >= 12) clearInterval(interval);
         }, 100);
         return () => clearInterval(interval);
     }, []);
    
    return (
        
        <SafeAreaView style={styles.container}>
           <ScrollView contentContainerStyle={styles.scrollContainer}>
              <Header/>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <View style={styles.recycledContainer}>
                      <View style={styles.item}>
                          <Text style={styles.countText}>{paperCount} <Text style={styles.kgText}>kg</Text></Text>
                          <Text style={styles.paperText}>Paper <Text style={styles.recycleText}>Recycled</Text></Text>
                      </View>
                      <View style={styles.item}>
                          <Text style={styles.countText}>{plasticCount} <Text style={styles.kgText}>kg</Text></Text>                   
                          <Text style={styles.plasticText}>Plastic <Text style={styles.recycleText}>Recycled</Text></Text>
                      </View>
                      <View style={styles.item}>
                          <Text style={styles.countText}>{glassCount} <Text style={styles.kgText}>kg</Text></Text>                  
                          <Text style={styles.glassText}>Glass <Text style={styles.recycleText}>Recycled</Text></Text>
                      </View>
                      <View style={styles.item}>
                          <Text style={styles.countText}>{otherCount} <Text style={styles.kgText}>kg</Text></Text>
                          <Text style={styles.otherText}>Other <Text style={styles.recycleText}>Recycled</Text></Text>
                      </View>
                  </View>
                </View>

           <Footer/>
        </ScrollView>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      scrollContainer: {
        flexGrow: 1,
      },
      header: {
        backgroundColor: '#00FF0A',
        width: '100%',
        height: 55,
        marginTop: 10
      },
    recycledContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    item: {
        width: '45%',
        alignItems: 'center',
        marginVertical: 10,
    },
    countText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'red',
    },
    kgText: {
        fontSize: 16,
        color: 'red',
    },
    paperText: {
        fontSize: 16,
        color: '#FFA500', // Orange
        fontWeight: 'bold',
    },
    plasticText: {
        fontSize: 16,
        color: '#1E90FF', // Blue
        fontWeight: 'bold',
    },
    glassText: {
        fontSize: 16,
        color: '#0000CD', // Dark Blue
        fontWeight: 'bold',
    },
    otherText: {
        fontSize: 16,
        color: '#B8860B', // Dark Goldenrod
        fontWeight: 'bold',
    },
    recycleText: {
        fontSize: 16,
        color: 'black', 
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
    scanButton: {
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    navImage: {
        width: 35,
        height: 35,
        resizeMode: 'contain',
    },
});