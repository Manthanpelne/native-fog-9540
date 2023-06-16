// // let LS_User_Data = JSON.parse(localStorage.getItem("user")) || []
// // let token = localStorage.getItem("token") 
// let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2NDhjNTMwYzMyMzhiNjA1MTU0NTBjYzEiLCJyb2xlIjoiVXNlciIsImlhdCI6MTY4NjkyNjcwOCwiZXhwIjoxNjg3NTMxNTA4fQ.REsm7JNf2IuEcbJkG6T_9iPRofMj0tbLIhW7CL6UttY"

// let newArray = []
// const BASE_SERVER_URL = "http://localhost:4500"

// const FetchData = () => {
//     fetch(`${BASE_SERVER_URL}/appointment/userAppointment`, {
//         method: "GET",
//         headers: {
//             "Content-type": "Application/json",
//             "Authorization": token
//         }
//     })
//         .then((res) => res.json())
//         .then((data) => {
//             newArray = data
//             // console.log(newArray);
//             let id = []
//             data.data.forEach((ele) => {
//                 id.push(ele.doctor)
//             });
//             // console.log(id);
//             for (let i = 0; i < id.length; i++) {
//                 GetDoctorByID(data.data[i].doctor, data)

//             }
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// }
// FetchData()
// let doctorname;
// const GetDoctorByID = async (id, appointment) => {
//     let data = await fetch(`${BASE_SERVER_URL}/doctor/byid/${id}`)
//     let res = await data.json()
//     // console.log(res.name);
//     doctorname = res.name
//     console.log(doctorname);
//     console.log(appointment);

// }
// // console.log(doctorname);
// let tbody = document.getElementById("tbody")

// const DisplayDataInTable = () => {
//     // tbody.innerHTML = ""
//     let tr = document.createElement("tr")

//     let 

    
// }
