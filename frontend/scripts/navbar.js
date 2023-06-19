let nameel = JSON.parse(localStorage.getItem("user"))
let loginUser = document.querySelector(".loginName")
let token = localStorage.getItem("token")
if (nameel) {
    loginUser.innerHTML = nameel.name

}
let signup_logout = document.getElementById("signup-logout")
const BASE_SERVER_URL = "https://motionless-seal-windbreaker.cyclic.app"

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
let toggle_dashboard = document.getElementById("toggle-dashboard")

toggle_dashboard.addEventListener("click", () => {
    if (nameel) {
        if (nameel.role == "User") {

            window.location.href = "./user_Dashboard.html"
        } else {
            window.location.href = "./Doctordashboard.html"

        }

    } else {
        Swal.fire({
            position: "centre",
            icon: "error",
            title: `Please Login First`,
            showConfirmButton: false,
            timer: 1500,
        });
    }
})
