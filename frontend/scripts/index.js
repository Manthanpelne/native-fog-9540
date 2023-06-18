
    function one(){
    document.querySelector(".slide_image").src="https://clovedental.in/wp-content/uploads/2023/06/website-banner-1.png"
}
function two(){
    document.querySelector(".slide_image").src="https://clovedental.in/wp-content/uploads/2022/08/implants-banner-2.jpg"
}
function three(){
    document.querySelector(".slide_image").src="https://clovedental.in/wp-content/uploads/2022/10/DHP-BUY-NOW-Banner.jpg"
}
function four(){
    document.querySelector(".slide_image").src="https://clovedental.in/wp-content/uploads/2023/05/Braces-Aligners.jpg"
}

setInterval(one,3000)
setInterval(two,6000)
setInterval(three,9000)
setInterval(four,12000)

let name = JSON.parse(localStorage.getItem("user"))
let loginUser = document.querySelector(".loginName")
loginUser.innerHTML=name.name
