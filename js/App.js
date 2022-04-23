import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
    import {
        getAuth,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut
    } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
    import {getDatabase, set, ref, update} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
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
  const auth = getAuth();
  const database = getDatabase(app);

const menu = document.querySelector(".Menu")
const NavBar = document.querySelector(".Account")
const CloseNav = document.querySelector(".Close")
const welcome = document.querySelector(".welcome")
const MyFormSign = document.querySelector(".MyFormSign")
const MyFormLog = document.querySelector(".MyFormLog")
const Sing = document.querySelector(".Sing")
const Log = document.querySelector(".Log")
const Image = document.querySelector("#image")

menu.onclick = ()=>{
    NavBar.style.display = "flex"
}
CloseNav.onclick = ()=>{
    NavBar.style.display = "none"
}

Sing.onclick = ()=>{
    welcome.style.display = "none"
    MyFormLog.style.display = "none"
    MyFormSign.style.display = "flex"
}
Log.onclick = ()=>{
    welcome.style.display = "none"
    MyFormSign.style.display = "none"
    MyFormLog.style.display = "flex"
}

Image.onchange = (event) =>{
    if(event.target.files.length > 0){
      let src = URL.createObjectURL(event.target.files[0]);
      let preview = document.getElementById("file-ip-1-preview");
      preview.src = src;
    }
  }

  submitData.addEventListener('click', (e) => {

let email = document.getElementById('email').value;
let password = document.getElementById('psw').value;
let image = document.getElementById('image').value;
let name = document.getElementById('name').value;
const Img = document.querySelector(".Img")
const names = document.querySelector("#name")
const emails = document.querySelector("#email")
const psws = document.querySelector("#psw")
const User = document.querySelector("#User")
const FormCard = document.querySelector(".FormCard")
let preview = document.getElementById("file-ip-1-preview")
const Error = document.getElementById("Error");

//sign up user
createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ... user.uid
        set(ref(database, 'users/' + user.uid), {
            profile: image,
            fullname: name,
            email: email,
            password: password
        })
            .then(() => {
                // Data saved successfully!
                // alert('user created successfully');
                User.style.display = "block"
                FormCard.style.height = "480px"
                names.value = ""
                emails.value = ""
                psws.value = ""
                preview.src = ""
                window.location.reload()
            })
            .catch((error) => {
                // The write failed...
                alert(error);
                // if(psws.value < 6){
                //     Error.style.display = "flex"
                // }
            });
    })
    .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // // ..
        // alert(errorMessage);

        if(!image.value && !names.value && !emails.value && !psws.value){
            Img.style.borderColor = "red"
            names.style.border = "1px solid red"
            emails.style.border = "1px solid red"
            psws.style.border = "1px solid red"
        }
        // else if(psws.value < 6){
        //     Error.style.display = "block"
        // }
    });

})


  submitDatas.addEventListener('click', (e) => {

let email = document.getElementById('email').value;
let password = document.getElementById('psw').value;
const emails = document.querySelector("#email")
const psws = document.querySelector("#psw")

signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...

                // save log in details into real time database
                let lgDate = new Date();
                update(ref(database, 'users/' + user.uid), {
                    last_login: lgDate,
                })
                    .then(() => {
                        // Data saved successfully!
                        // alert('user logged in successfully');
                        window.location = "Project.html"

                    })
                    .catch((error) => {
                        // The write failed...
                        alert(error);
                    });
            })
            .catch((error) => {
                // const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
                if(!emails.value && !psws.value){
                    emails.style.border = "1px solid red"
                    psws.style.border = "1px solid red"
                }
            });
})

