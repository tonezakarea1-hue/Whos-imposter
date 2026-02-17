import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { 
  getFirestore, doc, setDoc, getDoc, updateDoc, onSnapshot 
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCR14F4wPiHx0to80_17tTU_ND21BhQ0RQ",
  authDomain: "who-s-imposter.firebaseapp.com",
  projectId: "who-s-imposter",
  storageBucket: "who-s-imposter.appspot.com",
  messagingSenderId: "868731225838",
  appId: "1:868731225838:web:20152a12dbabbee06cd5ff"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let roomCode = null;
let playerId = crypto.randomUUID();
let playerName = "";

/* Show screen */
function show(id){
  ["home","profile","lobby","role","vote","result"]
  .forEach(x=>document.getElementById(x).classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

/* Create Room */
window.createRoom = async function(){
  try{
    roomCode = Math.random().toString(36).substring(2,6).toUpperCase();
    await setDoc(doc(db,"rooms",roomCode),{
      players:{},
      phase:"lobby",
      host:playerId
    });
    document.getElementById("roomCode").innerText = roomCode;
    show("profile");
  }catch(e){
    alert("ERROR: "+e.message);
  }
};

/* Join Room */
window.joinRoom = async function(){
  try{
    const code = document.getElementById("roomInput").value.toUpperCase();
    const snap = await getDoc(doc(db,"rooms",code));
    if(!snap.exists()){
      alert("Room not found");
      return;
    }
    roomCode=code;
    document.getElementById("roomCode").innerText = roomCode;
    show("profile");
  }catch(e){
    alert("ERROR: "+e.message);
  }
};
