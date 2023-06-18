let nameele = document.getElementById("name")
let emailele = document.getElementById("email")
let roleele = document.getElementById("role")

let userLS = JSON.parse(localStorage.getItem("user")) || []
let token = localStorage.getItem("token")

const BASE_SERVER_URL = "https://hilarious-bear-vestments.cyclic.app"

let logout_btn = document.getElementById("logout-btn")

nameele.textContent = userLS.name
emailele.textContent = userLS.email;
roleele.textContent = userLS.role


logout_btn.addEventListener("click", async () => {
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
                localStorage.clear("token")
                window.location.reload()
                window.location.href = "./index.html"
            }, 2500);


        }
    } catch (error) {
        console.log(error);
    }


})
if (!token) {
    logout_btn.textContent = "Login"
    logout_btn.addEventListener("click", () => {
        window.location.href = "./login.html"
    })
}
let show_name = document.getElementById("show-name")
let display_user_name= document.getElementById("display-user-name")
if (token) {
    show_name.textContent = `Mr . ${userLS.name}`
}else{
    display_user_name.style.display = "none"
}