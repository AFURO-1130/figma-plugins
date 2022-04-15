const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyDRs76X1Ro7tsLwo80RX8Py7-8l3qZSezU",
  authDomain: "pra-functions.firebaseapp.com",
  databaseURL: "https://pra-functions-default-rtdb.firebaseio.com",
  projectId: "pra-functions",
  storageBucket: "pra-functions.appspot.com",
  messagingSenderId: "863814599921",
  appId: "1:863814599921:web:c26d046f1f2ee7e4815550",
};

firebase.initializeApp(firebaseConfig);
const functions = firebase.functions();
functions.useFunctionsEmulator("http://localhost:5001");

const main = async () => {
  const helloOnCall = functions.httpsCallable("helloOnCall");
  const res = await helloOnCall({});
  console.log(res);
};

main();
