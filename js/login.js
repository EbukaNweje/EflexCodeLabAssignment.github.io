import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {getDatabase, ref, set, child, get} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
    const firebaseConfig = {
    apiKey: "AIzaSyBQJPTdP8HLdpCHecjE7ohEdhmTnUt4szo",
    authDomain: "eflexcodelabassignment.firebaseapp.com",
    databaseURL: "https://eflexcodelabassignment-default-rtdb.firebaseio.com",
    projectId: "eflexcodelabassignment",
    storageBucket: "eflexcodelabassignment.appspot.com",
    messagingSenderId: "412054884352",
    appId: "1:412054884352:web:01b6146afefb3a18f888e5",
    measurementId: "G-C0SFHQ24SJ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getDatabase()

  //--------------------------------------LOGIN PATH---------------------------------------------------------//
    //--------------------------------------THE REFRENECES---------------------------------------------------------//
    const username = document.getElementById('userInp')
    const password = document.getElementById('passInp')
    const submit = document.getElementById('sub_btn')
  function AuthenticateUser(){

    const dbref = ref(db);

get(child(dbref, "UserList/" + username.value)).then((snapshot)=>{
if(snapshot.exists()){
    let dbpass = decPass(snapshot.val().passwords);
    if(dbpass === password.value){
        login(snapshot.val())
    }
    else{
        alert("user does not exist");
    }
}
else{
    alert("username or password is invalid")
}

});
}

//--------------------------------------DECRIPT PROCESS-----------------------------------------------------//

function decPass(dbpass){
let passwordEnc = CryptoJS.AES.decrypt(dbpass, password.value)
return passwordEnc.toString(CryptoJS.enc.Utf8);
}

//--------------------------------------DECRIPT PROCESS-----------------------------------------------------//

function login(user){
let keeploggedIn =  document.getElementById('customSwitch1').checked

if(!keeploggedIn){
    sessionStorage.setItem('user', JSON.stringify(user))
    window.location="home.html"
}
else{
    localStorage.setItem('keeploggedIn', "yes")
    localStorage.setItem('user', JSON.stringify(user))
    window.location="home.html"
}
}
//--------------------------------------ASSIGN THE EVENTS TO LOGIN PATH-------------------------------------------------//

submit.addEventListener('click', AuthenticateUser)

