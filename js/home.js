  //--------------------------------------Home PATH---------------------------------------------------------//
           //--------------------------------------THE REFRENECES-------------------------------------------------------//

           let userlink = document.getElementById('userlink')
           let signoutlink = document.getElementById('signoutlink')
           let wel = document.getElementById('Welcome')
           let currentUser = null;

           function getUsername(){
                let keeploggedIn = localStorage.getItem("keeploggedIn")
                if(keeploggedIn == "yes"){
                    currentUser = JSON.parse(localStorage.getItem('user'))
                }
                else{
                    currentUser = JSON.parse(sessionStorage.getItem('user'))
                }
           }


           //--------------------------------------WINDOWS LOADS-------------------------------------------------------//

           window.onload = function(){
            getUsername()
            if(currentUser == null){
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
           }