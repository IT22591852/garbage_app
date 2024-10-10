const admin = require('firebase-admin');
const serviceAccount = require('./garbage-managment-30feb-firebase-adminsdk-8fonq-140599a0e0.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;
