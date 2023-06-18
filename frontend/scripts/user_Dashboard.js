let token = localStorage.getItem("token")
// let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2NDhjNTMwYzMyMzhiNjA1MTU0NTBjYzEiLCJyb2xlIjoiVXNlciIsImlhdCI6MTY4NzAwMTExNCwiZXhwIjoxNjg3NjA1OTE0fQ.eQ7JzzZhmb0WF1tp91eblsp061jg_xi8LdRUpwp5YKk"
console.log(token);
// let arr=[]

const BASE_SERVER_URL = "https://hilarious-bear-vestments.cyclic.app"
let book_app = document.getElementById("book-app")
let show = document.getElementById("show")
book_app.addEventListener("click", () => {
    if (token) {
        window.location.href = "./doctors.html"

    } else {
        show.innerText = "Login first To Book Appointment "
        Swal.fire({
            position: "centre",
            icon: "error",
            title: `Login first To Book Appointment`,
            showConfirmButton: false,
            timer: 1500,
        });
        setTimeout(() => {
            window.location.href = "./login.html"
        }, 2000);
    }
})

const FetchedData = async () => {
    let res
    try {
        res = await fetch(`${BASE_SERVER_URL}/appointment/userAppointment`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
        // arr.push(data.data[0]._id)
        // console.log(data.data[0]._id);

    } catch (error) {
        console.log(error);
    }
    let data = await res.json()
    console.log(data);
    Display(data.data)
}
if (token) {

    FetchedData()
} else {
    show.innerText = "Login First"
}

let Scheduled = 0
let Confirmed = 0
let Completed = 0
let Canceled = 0


let total = document.getElementById("total-App")
let scheduled_App = document.getElementById("scheduled-App")
let confirmed_App = document.getElementById("confirmed-App")
let completed_App = document.getElementById("completed-App")
let canceled_App = document.getElementById("canceled-App")
function Display(data) {
    total.innerText = data.length

    data.forEach((ele) => {
        if (ele.status == "scheduled") {
            Scheduled++
        } else if (ele.status == "confirmed") {
            Confirmed++
        } else if (ele.status == "completed") {
            Completed++
        } else if (ele.status == "canceled") {
            Canceled++
        }
    });
    scheduled_App.innerText = Scheduled
    confirmed_App.innerText = Confirmed;
    completed_App.innerText = Completed;
    canceled_App.innerText = Canceled




}

let Logout_anch = document.getElementById("Logout-anch")

Logout_anch.addEventListener("click", async () => {
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
            Scheduled = 0
            Confirmed = 0
            Completed = 0
            Canceled = 0

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