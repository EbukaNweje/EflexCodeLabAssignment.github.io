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

  //--------------------------------------THE REFRENECES---------------------------------------------------------//

  const name = document.getElementById('nameInp')
  const emails = document.getElementById('emailInp')
  const username = document.getElementById('userInp')
  const password = document.getElementById('passInp')
  const submit = document.getElementById('sub_btn')
  const Image = document.querySelector("#formFile")



  //--------------------------------------VALIDATION---------------------------------------------------------//
    function isEmptyOrSpaces(str){
        return str === null || str.match(/^ *$/) !== null;
    }

    function validation(){
        let namereegex = /^[a-zA-Z\s]+$/;
        let email = /^[a-zA-Z0-9]+@(gmail|yahoo|outlook)\.com$/;
        let userregex = /^[a-zA-Z0-9]{5,}$/;

        if(isEmptyOrSpaces(name.value) || isEmptyOrSpaces(emails.value) || isEmptyOrSpaces(username.value) || isEmptyOrSpaces(password.value)){
            alert("you cannot left any field empty")
            return false;
        }

        if(!namereegex.test(name.value)){
            alert("the name should only contain alphabets!");
            return false;
        }

        if(!email.test(emails.value)){
            alert("enter a valid email")
            return false;
        }

        if(!userregex.test(username.value)){
            alert("-username can only be alphamumeric\n -username must be aleast 5 characters\n -username cannot cantain spaces")
            return false;
        }

        return true;
    }

      //--------------------------------------REGISTER USER TO FIREBASE-------------------------------------------------//

      function RegisterUser(){
        if(!validation()){
            return;
        }
        Imageshow()
        // const dbRef = ref(db);

        // get(child(dbRef, "UserList/" + username.value)).then((snapshot)=>{
        //     if(snapshot.exists()){
        //         alert("Account Already Exist!")
        //     }
        //     else{
        //         set(ref(db, "UserList/" + username.value),
        //         {
        //             fullname: name.value,
        //             email: emails.value,
        //             usernames: username.value,
        //             passwords: encPass(),
        //             // profile: Imageshow(),
        //         })
        //         .then(()=>{
        //             alert("user added successfuly")
        //             name.value = ""
        //             emails.value = ""
        //             username.value = ""
        //             password.value = ""
        //             // preview.src = ""
        //         })
        //         .catch((error)=>{
        //             const errorMessage = error.message;
        //             alert(errorMessage)
        //         })
        //     }
        // });

      }

            //--------------------------------------ENCRIPTTION---------------------------------------------------//

            function encPass(){
                let passwordEnc = CryptoJS.AES.encrypt(password.value, password.value)
                return passwordEnc.toString();
            }

      //--------------------------------------ASSIGN THE EVENTS---------------------------------------------------------//

      submit.addEventListener('click', RegisterUser)


      Image.onchange = (event) =>{
        if(event.target.files.length > 0){
          let src = URL.createObjectURL(event.target.files[0]);
          let preview = document.getElementById("file-ip-1-preview");
          preview.src = src;
        }
      }

      document.querySelector("#formFile").addEventListener("change", Imageshow)
      function Imageshow(){
        const dbRef = ref(db);
        const reader = new FileReader();
        reader.addEventListener("load", ()=>{
            get(child(dbRef, "UserList/" + username.value)).then((snapshot)=>{
                if(snapshot.exists()){
                    alert("Account Already Exist!")
                }
                else{
                    set(ref(db, "UserList/" + username.value),
                    {
                        fullname: name.value,
                        email: emails.value,
                        usernames: username.value,
                        passwords: encPass(),
                        profile: reader.result,
                    })
                    .then(()=>{
                        alert("user added successfuly")
                        name.value = ""
                        emails.value = ""
                        username.value = ""
                        password.value = ""
                        // preview.src = ""
                    })
                    .catch((error)=>{
                        const errorMessage = error.message;
                        alert(errorMessage)
                    })
                }
            });
    
        })

        reader.readAsDataURL(this.files[0]);

      }
      





       