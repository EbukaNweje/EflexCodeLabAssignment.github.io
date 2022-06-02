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
 
 //--------------------------------------Home PATH---------------------------------------------------------//
           //--------------------------------------THE REFRENECES-------------------------------------------//

           let userlink = document.getElementById('userlink')
           let signoutlink = document.getElementById('signoutlink')
           let profile =document.getElementById('profile')
           let wel = document.getElementById('Welcome')
           let currentUser = null;

           function getUsername(){
                let keeploggedIns = localStorage.getItem("keeploggedIn")
                if(keeploggedIns == "yes"){
                    currentUser = JSON.parse(localStorage.getItem('user'))
                }
                else{
                    currentUser = JSON.parse(sessionStorage.getItem('user'))
                }
           }

        
           //--------------------------------------WINDOWS LOADS---------------------------------------------//

           window.onload = function(){
            getUsername()
            if(currentUser == null){
                profile.src = "./image/image.jpg"
                userlink.innerText = "Create New Account"
                userlink.classList.replace("nav-link", "btn");
                userlink.classList.add("btn-primary")
                userlink.href = "index.html"

                signoutlink.innerText = "Login"
                signoutlink.classList.replace("nav-link", "btn")
                signoutlink.classList.add("btn-success")
                signoutlink.href = "login.html"

            }
            else{
                profile.src = currentUser.profile
                userlink.innerText = currentUser.usernames;
                wel.innerHTML ="Welcome " + currentUser.fullname;
                userlink.classList.replace("btn", "nav-link")
                userlink.classList.remove("btn-primary")
                userlink.href = "#"

                signoutlink.innerText = "Sign Out";
                signoutlink.classList.replace("btn", "nav-link");
                signoutlink.classList.remove("btn-success");
                signoutlink.href = "javascript:Signouts()";
            }
            console.log(currentUser)
           }


           