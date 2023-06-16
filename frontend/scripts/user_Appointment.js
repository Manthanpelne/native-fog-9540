// let LS_User_Data = JSON.parse(localStorage.getItem("user")) || []
// let token = localStorage.getItem("token") 
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2NDhjNTMwYzMyMzhiNjA1MTU0NTBjYzEiLCJyb2xlIjoiVXNlciIsImlhdCI6MTY4NjkyNjcwOCwiZXhwIjoxNjg3NTMxNTA4fQ.REsm7JNf2IuEcbJkG6T_9iPRofMj0tbLIhW7CL6UttY"

let newArray = []
const BASE_SERVER_URL = "http://localhost:4500"

const FetchData = () => {
    fetch(`${BASE_SERVER_URL}/appointment/userAppointment`, {
        method: "GET",
        headers: {
            "Content-type": "Application/json",
            "Authorization": token
        }
    })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data.data[0].doctor.name);
            DisplayDataInTable(data.data)
          
     console.log(data);
        })
        .catch((err) => {
            console.log(err);
        })
}
FetchData()
let tbody = document.getElementById("tbody")


const DisplayDataInTable = (data) => {
    tbody.innerHTML=""
    data.forEach((ele) => {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.innerText = ele.doctor.name;
        td1.style.color = "black"; // Set the color to black
        
        let td2 = document.createElement("td");
        td2.innerText = ele.time;
        td2.style.color = "black";

        let td3 = document.createElement("td");
        const date = new Date(ele.date);
        td3.innerText = date.toLocaleDateString();
        td3.style.color = "black";

        let td4 = document.createElement("td");
    
        td4.innerText = ele.status
        td4.style.color = "black";

        let td5 = document.createElement("td");
    
        td5.innerText = ele.doctor.charge
        td5.style.color = "black";

        let td6 = document.createElement("td");
        let button = document.createElement("button");
        button.innerText = "REJECT"
        button.style.backgroundColor = "red";
        button.style.color="white"


        button.addEventListener("click",(e)=>{
            e.preventDefault()

            // fetch(``)

        })
        td6.append(button)

    

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);




        tbody.appendChild(tr);
    });
};


// let doctorname;
// const GetDoctorByID = async (id, appointment) => {
//     let data = await fetch(`${BASE_SERVER_URL}/appointment/appoint/${id}`)
//     let res = await data.json()
//     // console.log(res.name);

//     console.log(res);
   
//     // console.log(appointment);
//     // DisplayDataInTable(res, appointment)

// }
// // console.log(doctorname);