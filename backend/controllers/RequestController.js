// const db = require('../firebaseconfig'); // Import Firebase configuration

// // Add a new request
// const addRequest = async (req, res) => {
//     const { email, phoneNumber, address, wasteTypes, note, date, time } = req.body;

//     // Validate input
//     if (!email || !phoneNumber || !address || !wasteTypes || !note || !date || !time) {
//         return res.status(400).send('Please fill in all fields.');
//     }

//     try {
//         // Add a new document with a generated ID
//         const requestRef = await db.collection('RegularRequests').add({
//             email,
//             phoneNumber,
//             address,
//             wasteTypes,
//             note,
//             date,
//             time,
//             createdAt: new Date(),
//         });
//         res.status(201).json({ id: requestRef.id });
//     } catch (error) {
//         console.error('Error adding request: ', error);
//         res.status(500).send('Error adding request');
//     }
// };

// // Get a request by ID
// const getRequestById = async (req, res) => {
//     const requestId = req.params.id;

//     try {
//         const requestRef = db.collection('RegularRequests').doc(requestId);
//         const doc = await requestRef.get();

//         if (!doc.exists) {
//             return res.status(404).send('Request not found');
//         }

//         res.status(200).json({ id: doc.id, ...doc.data() });
//     } catch (error) {
//         console.error('Error getting request: ', error);
//         res.status(500).send('Error getting request');
//     }
// };

// // Get all requests
// const getAllRequests = async (req, res) => {
//     try {
//         const requestsSnapshot = await db.collection('RegularRequests').get();
//         const requests = requestsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         res.status(200).json(requests);
//     } catch (error) {
//         console.error('Error getting requests: ', error);
//         res.status(500).send('Error getting requests');
//     }
// };

// // Update a request by ID
// const updateRequest = async (req, res) => {
//     const requestId = req.params.id;
//     const { email, phoneNumber, address, wasteTypes, note, date, time } = req.body;

//     // Validate input
//     if (!email || !phoneNumber || !address || !wasteTypes || !note || !date || !time) {
//         return res.status(400).send('Please fill in all fields.');
//     }

//     try {
//         const requestRef = db.collection('RegularRequests').doc(requestId);
//         await requestRef.update({
//             email,
//             phoneNumber,
//             address,
//             wasteTypes,
//             note,
//             date,
//             time,
//             updatedAt: new Date(),
//         });
//         res.status(200).send(`Request updated with ID: ${requestId}`);
//     } catch (error) {
//         console.error('Error updating request: ', error);
//         res.status(500).send('Error updating request');
//     }
// };

// // Delete a request by ID
// const deleteRequest = async (req, res) => {
//     const requestId = req.params.id;

//     try {
//         const requestRef = db.collection('RegularRequests').doc(requestId);
//         await requestRef.delete();
//         res.status(200).send(`Request deleted with ID: ${requestId}`);
//     } catch (error) {
//         console.error('Error deleting request: ', error);
//         res.status(500).send('Error deleting request');
//     }
// };

// module.exports = {
//     addRequest,
//     getRequestById,
//     getAllRequests,
//     updateRequest,
//     deleteRequest
// };
