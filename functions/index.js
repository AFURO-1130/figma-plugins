const functions = require("firebase-functions");
const admin = require("firebase-admin");

// ローカルで実行するには認証情報が必要
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pra-functions-default-rtdb.firebaseio.com",
});

const db = admin.firestore();

exports.helloOnCall = functions.https.onCall(async (data, context) => {
  //return "Hello OnCall!";
  // if (data) {
  //write
  console.log('data',data);
  const res = await db.collection("items").add({ 'hoge':data });
  //read
  const snapshots = await db.collection("items").get();
  const docs = snapshots.docs.map((doc) => doc.data());
  return docs.length;
  // } else {
  //   throw new HttpsError("invalid-argument", "hogehoge is required.");
  // }
});
exports.hello = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.send('huhuhuhuh')
  console.log(req.method)
  console.log(req.query)
  console.log('body',req.body)
  // if (req.method !== "POST") {
  //   res.send("This is not post request");
  // }
  // //read
  // // const snapshots = await db.collection("items").get();
  // // const docs = snapshots.docs.map((doc) => doc.data());

  // if (req.method !== "POST") {
  //   res.status(500).send("Method Not Allowed");
  //   return;
  // }
  if (req.body === /^#.*/) {
    await db.collection("items").add({ Color: req.body });
  }
  await db.collection("items").add({ ids: req.body });

  // res.status(200).send(req.body);
  // res.send("書き込みできた！！");
})
