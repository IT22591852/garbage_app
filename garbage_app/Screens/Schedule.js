// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, FlatList } from 'react-native';
// import { Calendar } from 'react-native-calendars';
// import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

// const CalendarPage = () => {
//   const [selectedDate, setSelectedDate] = useState('');
//   const [requests, setRequests] = useState([]);
//   const db = getFirestore();

//   const fetchRequests = async (date) => {
//     const q = query(
//       collection(db, 'requests'),
//       where('pickupDate', '==', date) // Ensure 'pickupDate' matches your Firestore field
//     );

//     const querySnapshot = await getDocs(q);
//     const fetchedRequests = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     setRequests(fetchedRequests);
//   };

//   const handleDayPress = (day) => {
//     const dateString = day.dateString;
//     setSelectedDate(dateString);
//     fetchRequests(dateString);
//   };

//   useEffect(() => {
//     // Fetch requests when the component mounts
//     if (selectedDate) {
//       fetchRequests(selectedDate);
//     }
//   }, [selectedDate]);

//   return (
//     <View style={styles.container}>
//       <Calendar
//         onDayPress={handleDayPress}
//         markedDates={{
//           [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
//         }}
//       />
//       <View style={styles.requestsContainer}>
//         <Text style={styles.header}>Requests for {selectedDate}:</Text>
//         <FlatList
//           data={requests}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <View style={styles.requestCard}>
//               <Text>ID: {item.id}</Text>
//               <Text>Pickup Date: {item.pickupDate}</Text>
//               <Text>Pickup Time: {item.pickupTime}</Text>
//               <Text>Request Type: {item.type}</Text> {/* 'Regular' or 'Special' */}
//             </View>
//           )}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   requestsContainer: {
//     marginTop: 20,
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   requestCard: {
//     padding: 15,
//     borderRadius: 8,
//     backgroundColor: '#f0f0f0',
//     marginBottom: 10,
//   },
// });

// export default CalendarPage;

import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Home = () => {
  return (
    <>
      <Header />
      <Footer />
    </>
  );
};

export default Home;
