const functions = require("firebase-functions");
const admin = require("firebase-admin");

//ローカルで実行するには認証情報が必要
// const serviceAccount = require("path/to/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(
    "/Users/kinjyo/Desktop/dev_desktop/figmaplugins/functions/pra-functions-firebase-adminsdk-dvcd1-8bc99d4302.json"),
  databaseURL: "https://pra-functions-default-rtdb.firebaseio.com"
});

const db = admin.firestore();

exports.helloOnCall = functions.https.onCall(async (data, context) => {
  //write
  console.log(data);
  const res = await db.collection("items").add({ name: "hoge" });

  //read
  const snapshots = await db.collection("items").get();
  const docs = snapshots.docs.map((doc) => doc.data());
  return docs.length;
});
