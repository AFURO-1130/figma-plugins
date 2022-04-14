const functions = require("firebase-functions");
// const hoge = require("../code");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.date = functions.https.onRequest((req, res) => {
  res.send('hoghoge');
});
exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  // const original = req.query.text;
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await admin
    .firestore()
    .collection("messages")
    .add('hoge');
  // Send back a message that we've successfully written the message
  res.json({ result: `Message with ID: ${writeResult.id} added.` });
  res.send('書き込み完了');
});
