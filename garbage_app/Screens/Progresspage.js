import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function ProgressPage({ route }) {
    // Destructure and provide a default value to prevent undefined
    const { acceptedRequests = [] } = route.params || {};
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>In-Progress Requests</Text>
        {acceptedRequests.length > 0 ? (
          acceptedRequests.map((request) => (
            <View key={request.id} style={styles.card}>
              <Image source={request.image} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{request.name}</Text>
                <Text style={styles.location}>{request.location}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noRequestsText}>No in-progress requests.</Text>
        )}
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#f3f2ec',
  },
  image: {
    width: 90,
    height: 100,
    borderRadius: 10,
  },
  textContainer: {
    marginLeft: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: '500',
  },
  location: {
    fontSize: 18,
    marginTop: 5,
  },
});
