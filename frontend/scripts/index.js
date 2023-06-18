
function one() {
    document.querySelector(".slide_image").src = "https://clovedental.in/wp-content/uploads/2023/06/website-banner-1.png"
}
function two() {
    document.querySelector(".slide_image").src = "https://clovedental.in/wp-content/uploads/2022/08/implants-banner-2.jpg"
}
function three() {
    document.querySelector(".slide_image").src = "https://clovedental.in/wp-content/uploads/2022/10/DHP-BUY-NOW-Banner.jpg"
}
function four() {
    document.querySelector(".slide_image").src = "https://clovedental.in/wp-content/uploads/2023/05/Braces-Aligners.jpg"
}

setInterval(one, 3000)
setInterval(two, 6000)
setInterval(three, 9000)
setInterval(four, 12000)

let nameel = JSON.parse(localStorage.getItem("user"))
let loginUser = document.querySelector(".loginName")
if (nameel) {
    loginUser.innerHTML = nameel.name

}
let signup_logout = document.getElementById("signup-logout")
const BASE_SERVER_URL = "https://hilarious-bear-vestments.cyclic.app"

let token = localStorage.getItem("token")
if (token) {
    signup_logout.textContent = "Logout"
    signup_logout.addEventListener("click", async () => {
        try {
            let res = await fetch(`${BASE_SERVER_URL}/user/logout`, {
                method: "GET",
                headers: {

                    "Content-Type": "application/json",
                    "Authorization": token
                }
            })
            let data = await res.json()
            console.log(data);
            if (data.msg !== "Logout Success") {
                Swal.fire({
                    position: "centre",
                    icon: "error",
                    title: `${data.msg}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                Swal.fire({
                    position: "centre",
                    icon: "success",
                    title: `${data.msg}`,
                    showConfirmButton: false,
                    timer: 1500,
                });

                setTimeout(() => {
                    localStorage.clear("token")//clear all localStorage
                
                    window.location.reload()
                    window.location.href = "./index.html"
                }, 2500);

            }
        } catch (error) {
            console.log(error);
        }

    })


} else {
    signup_logout.textContent = "Login"
    signup_logout.addEventListener("click", () => {
        window.location.href = "./login.html"
    })
}