const menu = document.querySelector(".Menu")
const NavBar = document.querySelector(".Account")
const CloseNav = document.querySelector(".Close")

menu.onclick = ()=>{
    NavBar.style.display = "flex"
}
CloseNav.onclick = ()=>{
    NavBar.style.display = "none"
}