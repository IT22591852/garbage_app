import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from "react-native-vector-icons/MaterialIcons";
// import { fetchPendingRequests, acceptRequest } from './Request'; // Import the functions from Request.js
import img1 from '../../assets/images/profile1.jpg';
import img2 from '../../assets/images/profile2.jpg';
import img3 from '../../assets/images/profile3.png';
import Footer from './Bottomnavigator';

export default function Driver1Notification({ navigation }) {
  const [requests, setRequests] = useState([
    
      { id: 1, name: 'Samudhi', location: '123 Main St', image: img1, status: 'pending' },
      { id: 2, name: 'Fernando', location: '456 Elm St', image: img2, status: 'pending' },
      { id: 3, name: 'Ilyana Rose', location: '789 Pine St', image: img3, status: 'pending' },
    
  ]);

  const handleQRScanner = () => {
    navigation.navigate('QRScanner');
    };

  // useEffect(() => {
  //   const fetchRequests = async () => {
  //     try {
  //       const requestsList = await fetchPendingRequests();
  //       setRequests(requestsList);
  //     } catch (error) {
  //       console.error("Error fetching requests: ", error);
  //     }
  //   };

  //   fetchRequests();
  // }, []);

  // const handleAccept = async (id) => {
  //   try {
  //     await acceptRequest(id);
  //     const updatedRequests = requests.map((request) =>
  //       request.id === id ? { ...request, accepted: true } : request
  //     );
  //     setRequests(updatedRequests);

  //     const acceptedRequest = updatedRequests.find(request => request.id === id);
  //     navigation.navigate('Progresspage', { acceptedRequest });
  //   } catch (error) {
  //     console.error("Error accepting request: ", error);
  //   }
  // };
  const handleAccept = (id) => {
    console.log("kl")
    const res = requests.map((request) =>
      request.id === id ? { ...request, status: 'accepted' } : request
    )

    console.log("res",res)
    setRequests(res);
    // setRequests((prevRequests) =>
      
    // );
    const acceptedRequest = res.find(request => request.id === id && request.status === 'accepted');
    if (acceptedRequest) {
      navigation.navigate('Progresspage', { acceptedRequest });
    }
  };

  const navigateToProgressPage = () => {
    const acceptedRequests = requests.filter(request => request.status === 'accepted');
    if (acceptedRequests.length > 0) {
      navigation.navigate('Progresspage', { acceptedRequests });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcometext}>Hi, Rock Lee</Text>
        <TouchableOpacity style={styles.scanButton} onPress={handleQRScanner}>
                <Image source={require('../../assets/images/QRScanner.jpg')} style={styles.image} />
            </TouchableOpacity>
        <TouchableOpacity style={styles.progressBarIcon} onPress={navigateToProgressPage}>
          <Icon name="progress-check" size={30} color="#0000ff" />
        </TouchableOpacity>
      </View>
      <Icon1 name="location-on" size={25} style={styles.loc} />
      <Text style={styles.notifiicon}>🔔</Text>
      <Text style={styles.not}>Notification</Text>

      {requests.filter(request => request.status==='pending').map((request) => (
        <View key={request.id} style={styles.card1}>
          <View style={styles.cardContent}>
            <Image source={ request.image } style={styles.prof} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{request.name}</Text>
              <Text style={styles.requestno}>{request.requestno}</Text>
              <View style={styles.locationContainer}>
                <Icon1 name="location-on" size={25} style={styles.loc2} />
                <Text style={styles.locationText}>{request.location}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={styles.acceptbtn} 
                  onPress={() => handleAccept(request.id)}
                >
                  <Text style={styles.acceptbtntxt}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.denybtn}>
                  <Text style={styles.denybtntxt}>Deny</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ))}

      <View style={styles.card2}>
        <Text style={styles.subt}>Sub Total</Text>
        <Text style={styles.delt}>Delivery Charge</Text>
        <View style={styles.line} />
        <Text style={styles.tot}>Total</Text>
      </View>
      
      {/* <Footer/> */}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    paddingHorizontal: 10,
  },
  welcometext: {
    fontSize: 20,
    fontWeight: '700',
    marginTop:-25
  },
  
  progressBarIcon: {
    marginRight: 15,
    width:40
  },
  notifiicon: {
    marginTop: -65,
    marginLeft: 360,
    fontSize: 25,
  },
  
  not: {
    fontSize: 35,
    marginTop: 5,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  card1: {
    marginLeft: 30,
    width: 345,
    height: 135,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: '#f3f2ec',
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: '500',
  },
  requestno: {
    fontSize: 22,
    fontWeight: '500',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  loc2: {
    color: 'purple',
  },
  locationText: {
    fontSize: 18,
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  acceptbtn: {
    backgroundColor: '#00FF0A',
    padding: 5,
    borderRadius: 10,
    width: 90,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  acceptbtntxt: {
    color: 'black',
    fontWeight: '500',
    fontSize: 18,
  },
  denybtn: {
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 10,
    width: 90,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  denybtntxt: {
    color: 'black',
    fontWeight: '500',
    fontSize: 18,
  },
  prof: {
    width: 90,
    height: 100,
    borderRadius: 10,
  },
  card2: {
    marginTop: 10,
    marginLeft: 30,
    width: 345,
    height: 110,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: '#00FF0A',
  },
  subt: {
    fontSize: 23,
    marginLeft: 10,
    fontWeight: '600',
  },
  delt: {
    fontSize: 23,
    marginLeft: 10,
    marginTop: 5,
    fontWeight: '600',
  },
  tot: {
    fontSize: 23,
    marginLeft: 10,
    marginTop: 10,
    fontWeight: '600',
  },
  subtv: {
    marginLeft: 300,
    marginTop: -95,
    fontSize: 20,
  },
  deltv: {
    marginLeft: 300,
    marginTop: 8,
    fontSize: 20,
  },
  totv: {
    marginLeft: 300,
    marginTop: 19,
    fontSize: 20,
  },
  line: {
    height: 2,
    width: 330,
    backgroundColor: 'black',
    marginTop: 10,
    marginLeft: 8,
  },
  scanButton: {
    borderRadius: 8,
    paddingHorizontal: 10,
    marginLeft:150
},
image: {
    width: 35,
    height: 50,
    resizeMode: 'contain',
    },
loc:{
  marginLeft:190,
  color:'purple'
}
});
