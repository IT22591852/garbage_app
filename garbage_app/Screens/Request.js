// import {db} from '../../Services/firebaseAuth'

// Function to fetch all pending requests
// export const fetchPendingRequests = async () => {
//   try {
//     const snapshot = await firestore()
//       db.collection('requests')
//       .where('accepted', '==', false)
//       .get();
//     const requestsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     return requestsList;
//   } catch (error) {
//     console.error("Error fetching requests: ", error);
//     throw error;
//   }
// };

// // Function to update a request's status to accepted
// export const acceptRequest = async (id) => {
//   try {
//     await firestore().collection('requests').doc(id).update({ accepted: true });
//   } catch (error) {
//     console.error("Error updating request: ", error);
//     throw error;
//   }
// };

// // Function to add a new request
// export const addRequest = async (name, requestno,location, image) => {
//   try {
//     await firestore().collection('requests').add({
//       name,
//       requestno,
//       location,
//       image,
//       accepted: false,
//     });
//   } catch (error) {
//     console.error("Error adding request: ", error);
//     throw error;
//   }
// };

// // Function to fetch all accepted requests
// export const fetchAcceptedRequests = async () => {
//   try {
//     const snapshot = await firestore()
//       .collection('requests')
//       .where('accepted', '==', true)
//       .get();
//     const requestsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     return requestsList;
//   } catch (error) {
//     console.error("Error fetching accepted requests: ", error);
//     throw error;
//   }
// };
