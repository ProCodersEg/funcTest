// Import required modules
const admin = require('firebase-admin');
const cron = require('node-cron');

// Initialize Firestore
const serviceAccount = require('./serviceAccountKey.json'); // Update with your Firebase service account key path
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

// Function to generate random numbers
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to update documents
function updateDocuments() {
  // Update document 'a'
  const randomPriceA = getRandomInt(1, 6);
  db.collection('market').doc('fishPrices').collection('a').doc('price').set({
    value: randomPriceA
  })
  .then(() => {
    console.log('Document A updated with price:', randomPriceA);
  })
  .catch(error => {
    console.error('Error updating document A:', error);
  });

  // Update document 'b'
  const randomPriceB = getRandomInt(2, 16);
  db.collection('market').doc('fishPrices').collection('b').doc('price').set({
    value: randomPriceB
  })
  .then(() => {
    console.log('Document B updated with price:', randomPriceB);
  })
  .catch(error => {
    console.error('Error updating document B:', error);
  });
}

// Schedule the cron job to run every minute
cron.schedule('* * * * *', () => {
  updateDocuments();
});
