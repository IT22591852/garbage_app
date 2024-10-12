import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QRScanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScanning(false);
    alert(`QR code Successfully Scanned: ${data}`);
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title1}>Confirm Collection by Scanning the</Text>
      <Text style={styles.title}>QR Code</Text>
      <View style={styles.cameraContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanning ? handleBarCodeScanned : undefined}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => {
          setScanned(false);
          setScanning(true);
        }}
      >
        
        <Text style={styles.scanButtonText}> <Image source={require('../../assets/images/scan button.jpg')} style={styles.scanButtonImage} />Scan QR Code</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 20,
    marginLeft: 4,
    marginRight: 4,
    textAlign: 'center',
  },
  title1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 5,
    marginLeft: 4,
    marginRight: 4,
    textAlign: 'center',
  },
  cameraContainer: {
    width: '88%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 30,
    borderRadius: 15,
    backgroundColor: '#e0e0e0',
  },
  scanButton: {
    backgroundColor: '#32CD32',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scanButtonImage: {
    width: 15,
    height: 15,
    marginRight: 4,
    marginLeft: 4,
  },
});