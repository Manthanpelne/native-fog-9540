// let LS_User_Data = JSON.parse(localStorage.getItem("user")) || []
// let token = localStorage.getItem("token") 
let token = localStorage.getItem("token")
let newArray = []
// const BASE_SERVER_URL = "http://localhost:4500"
const BASE_SERVER_URL = "https://hilarious-bear-vestments.cyclic.app"
let tbody = document.getElementById("tbody")
let filterele = document.getElementById("filter")
let sort = document.querySelector("#sort");




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
            FilterByStatus(data.data)
            console.log(data.data);
            DisplayDataInTable(data.data)
            dateandSort(data.data)
            // DisplayDoctors(data.data)
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        })
}
FetchData()



const DisplayDataInTable = (data) => {
    tbody.innerHTML = ""
    data.forEach((ele) => {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.innerText = ele.doctor.name 
        td1.style.color = "black"; // Set the color to black

        let td2 = document.createElement("td");
        td2.innerText = ele.time;
        td2.style.color = "black";

        let td3 = document.createElement("td");
        const date = new Date(ele.date);
        td3.innerText = date.toLocaleDateString();
        // td3.innerText = ele.date
        td3.style.color = "black";

        let td4 = document.createElement("td");

        td4.innerText = ele.status
        td4.style.color = "black";

        let td5 = document.createElement("td");

        td5.innerText = ele.doctor.charge
        td5.style.color = "black";




        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);





        tbody.appendChild(tr);
    });
};

const FilterByStatus = (data) => {
    filterele.addEventListener("change", () => {
        const selectedValue = filterele.value;
        let filteredData;
        if (selectedValue === "all") {
            filteredData = data;
        } else {
            filteredData = data.filter((ele) => ele.status === selectedValue);
        }
        DisplayDataInTable(filteredData);
    });
};





function dateandSort(data) {

    sort.addEventListener("change", () => {
        let val = sort.value;
        console.log(val);
        // console.log(bag);
        if (val == "") {
            DisplayDataInTable(data)
        }
        if (val == "NTO") {
            let x = data.sort((a, b) => new Date(b.date) - new Date(a.date))
            DisplayDataInTable(x)
        }
        if (val == "OTN") {
            let y = data.sort((a, b) => new Date(a.date) - new Date(b.date))
            DisplayDataInTable(y)
        }

    })
}
let userLS = JSON.parse(localStorage.getItem("user")) || []
let show_name = document.getElementById("show-name")
let display_user_name = document.getElementById("display-user-name")
if (token) {
    show_name.textContent = `Mr . ${userLS.name}`
} else {
    display_user_name.style.display = "none"
}

let display_Doctors = document.getElementById("display-Doctors")

// const DisplayDoctors = (data) => {
//     display_Doctors.innerHTML=""

//     let div = document.createElement("div")

//     data.forEach((ele)=>{
//         let namedoc = document.createElement("h2")
//         namedoc.textContent = ele.doctor.name
//         let img = document.createElement("img")
//         img.src= ele.doctor.image
        
//         let statusdoc = document.createElement("h2")
//         statusdoc.textContent = ele.status 

//         div.append(namedoc,img,statusdoc)
//         display_Doctors.append(div)
        
//     })
// }