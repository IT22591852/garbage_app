import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function QRGenerator({ route }) {
  // Get the QR code value from the route params
  const { qrCodeValue } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.requestText}>Request No: {qrCodeValue}</Text>
      <Text style={styles.title}>Confirm Pickup by Scanning the QR Code</Text>
      <View style={styles.qrContainer}>
        <QRCode value={qrCodeValue} size={200} />
      </View>
      <Text style={styles.orText}>OR</Text>
      <Text style={styles.qrNotWorkingText}>QR is not working?</Text>
      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>Confirm Collection</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', 
  },
  requestText: {
    color: '#FF0000', // Red color
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000000', 
  },
  qrContainer: {
    backgroundColor: '#F3F3F3', // Light gray background for QR code
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  orText: {
    color: '#FF0000', // Red color
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  qrNotWorkingText: {
    fontSize: 16,
    color: '#000000', // Black text color
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#32CD32', // Green background color for the button
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  confirmButtonText: {
    color: '#FFFFFF', // White text color for the button
    fontSize: 16,
    fontWeight: 'bold',
  },
})