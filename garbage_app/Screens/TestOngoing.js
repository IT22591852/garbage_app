import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TestOngoing() {
  const navigation = useNavigation();
  const [qrCodeValue, setQrCodeValue] = useState(null); // State to hold the QR code value

  const handleQRcode = () => {
    // Generate a unique value or use any value you want to encode
    const uniqueValue = `Order-${Date.now()}`;
    setQrCodeValue(uniqueValue); // Update state with the unique value
  };

  const handlenav = () => {
    // Navigate to QRGenerator with the generated value if it exists
    if (qrCodeValue) {
      navigation.navigate('QRGenerator', { qrCodeValue }); // Pass the value as route params
    } else {
      alert('Please generate a QR code first!'); // Alert if no QR code value exists
    }
  };

  return (
    <View>
      <Text>TestOngoing</Text>
      <TouchableOpacity style={styles.button} onPress={handleQRcode}>
        <Text style={styles.buttonText}>QR Generation</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.QR} onPress={handlenav}>
        <Image source={require('../assets/images/QR code.png')}  style={styles.image}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '30%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    borderRadius: 4,
    marginVertical: 10, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  QR: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00FF0A',
    borderRadius: 20,
    marginVertical: 10, 
  },

  image: {
    width: 20,  
    height: 20, 
    resizeMode: 'contain',
  },
});