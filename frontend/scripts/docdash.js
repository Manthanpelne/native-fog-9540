// let token = localStorage.getItem("token") || ""
const user1 = JSON.parse(localStorage.getItem("user")) || "";
let doctorid = localStorage.getItem("doctorID") || "";

console.log(doctorid);


let clsbtn = document.getElementById("closeButton")
let updateform = document.getElementById("updateForm")
let statusvl = document.getElementById("status")
let formel = document.getElementById("updateForm")

let tbodyEl = document.querySelector("tbody")


window.addEventListener("load", () => {
    fetchdata()
    fetchdata1()
})

clsbtn.addEventListener("click", () => {
    updateform.style.display = "none"
})
function fetchdata() {
    try {
        fetch(`https://hilarious-bear-vestments.cyclic.app/doctor/byname?name=${user1.name}&email=${user1.email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            },
        })
            .then((res) => res.json())
            .then((data) => {
                localStorage.setItem("doctorID", data.doctor[0]._id);
                renderData(data.doctor)
            })

    } catch (error) {
        console.log(error)
    }
}

function renderData(doc) {
    let maincontainer = document.querySelector("#detailsdoc");
    maincontainer.innerHTML = "";

    let newarr = doc.map((item) => {
        return `
<div class="cardagain">
  <div>
  <img src="${item.image}"> 
  </div>
  <div>
      <h3> <h5>Name:</h5>  ${item.name}</h3>
      <p> <h5>Phone:</h5> ${item.phone}</p>
      <p>  <h5>Qualification:</h5>  ${item.qualification}</p>
      <p> <h5>Experience:</h5>  ${item.experience}</p>
      <p>  <h5>Charge:</h5>  &#x20B9 ${item.charge}</p>
      </div>
      <div>
        <p><h5>Language:</h5>  ${item.language}</p>
        <p><h5>Expertise:</h5> ${item.about}</p> 
        <p>  <h5>Timings:</h5>  ${item.timings}</p>
        <p>  <h5>Location:</h5>${item.location}</p>
  </div>
</div>
`;
    });
    maincontainer.innerHTML = newarr.join(" ");
}


function fetchdata1() {
    try {
        fetch(`https://hilarious-bear-vestments.cyclic.app/appointment/doctorAppointment/${doctorid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data)
                displayData(data.data)
            })

    } catch (error) {
        console.log(error)
    }
}

function displayData(data) {
    tbodyEl.innerHTML = "";
    data.forEach(async (element) => {
        let tr = document.createElement("tr");
        tr.setAttribute("data-id", element._id);

        let Username = document.createElement("td");
        let Dat = document.createElement("td");
        let Time = document.createElement("td");
        let Status = document.createElement("td");
        let Action = document.createElement("td");

        const date = new Date(element.date);
        const formattedDate = date.toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
        Dat.innerText = formattedDate;
        Time.innerText = element.time;
        Status.innerText = element.status;
        await fetch(`https://hilarious-bear-vestments.cyclic.app/user/${element.user}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
            },
        }).then(res => res.json())
            .then(data => {
                console.log(data.user.name)
                Username.innerText = data.user.name
            }).catch((error) => {
                console.log(error)
            })

        let button = document.createElement("button");
        button.innerText = "UPDATE";
        button.classList.add("status-update-btn");
        button.addEventListener("click", function () {
            const AppointmentId = this.parentNode.parentNode.getAttribute("data-id");
            console.log(AppointmentId)
            localStorage.setItem("AppointmentId", AppointmentId);

            updateform.style.display = 'block'

            fetch(`https://hilarious-bear-vestments.cyclic.app/appointment/appoint/${AppointmentId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                },
            }).then(res => res.json())
                .then(data => {
                    console.log(data.appointment.status)
                    statusvl.value = data.appointment.status
                }).catch((error) => {
                    console.log(error)
                })
        });

        Action.appendChild(button);
        tr.append(Username, Dat, Time, Status, Action);
        tbodyEl.append(tr);
    });
}
formel.addEventListener("submit", (e) => {
    e.preventDefault()
    const requestBody = {
        status: statusvl.value
    };
    console.log(requestBody)
    let AppointmentId = localStorage.getItem("AppointmentId") || "";
    console.log(AppointmentId);
    // console.log("app"+ AppointmentId);

    fetch(`https://hilarious-bear-vestments.cyclic.app/appointment/doctorAppointment/${AppointmentId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
        body: JSON.stringify(requestBody)
    }).then(res => res.json())
        .then(data => {
            if (data.msg === "Appointment Updated") {
                Swal.fire({
                    position: "centre",
                    icon: "success",
                    title: "Mail Send",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setTimeout(() => {
                    window.location.href = "Doctordashboard.html";
                }, 2500);
            } else {
                Swal.fire({
                    position: "centre",
                    icon: "error",
                    title: `${res.msg}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        }).catch((error) => {
            console.log(error)
        })
    console.log("after");
});