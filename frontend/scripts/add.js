let form = document.getElementById("docform");
let arr = [];
const token = localStorage.getItem("token") || " "
form.addEventListener("submit", (e) => {
    e.preventDefault();

    let data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        about: document.getElementById("about").value,
        image: document.getElementById("image").value,
        location: document.getElementById("location").value,
        qualification: document.getElementById("qualification").value,
        experience: document.getElementById("experience").value,
        language: document.getElementById("language").value,
        timings: document.getElementById("time").value,
        charge: document.getElementById("charge").value,
        clinic: document.getElementById("clinic").value,
    };
    // const newid = localStorage.getItem("bookID")
    // const id = newid
    
    
    const id = data.clinic
    console.log(data,id); 

    
         fetch(`http://localhost:4500/doctor/add/${data.clinic}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`
             },
                body:JSON.stringify(data)
            })
                .then((res) => res.json())
                .then((data) => {
    
                    console.log(data)
                                if (data.ok) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Doctor added successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                form.reset();
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Failed to add doctor",
                    text: res.message,
                });
            }
                }).catch((err) => { 
                    console.log(err);
                })

});

// Add Clinic
const addClinicForm = document.getElementById("form1");
const addClinicSubmit = document.getElementById("submit1");

addClinicForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let data = {
        name: document.getElementById("name1").value,
        address: document.getElementById("address1").value,
        image: document.getElementById("image1").value,
        phone: document.getElementById("Phone1").value,
        email: document.getElementById("email1").value,
    };
    console.log(data);
    fetch(`http://localhost:4500/clinic/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        },
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            if (res.ok) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Clinic added successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                addClinicForm.reset();
                fetchClinics();
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Failed to add clinic",
                    text: res.message,
                });
            }
        })
        .catch((error) => {
            console.log(error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed to add clinic",
                text: "An error occurred while processing your request.",
            });
         });
});


// Update Clinic
// const updateClinicForm = document.getElementById("form3");
// const updateClinicSubmit = document.getElementById("submit3");

// updateClinicForm.addEventListener("submit", (e) => {
//     e.preventDefault();

//     let data = {
//         name: document.getElementById("name3").value,
//         address: document.getElementById("address3").value,
//         phone: document.getElementById("number3").value,
//         email: document.getElementById("email3").value,
//     };

//     fetch("http://localhost:4500/clinic/update", {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//     })
//         .then((res) => res.json())
//         .then((res) => {
//             console.log(res);
//             if (res.success) {
//                 Swal.fire({
//                     position: "center",
//                     icon: "success",
//                     title: "Clinic updated successfully",
//                     showConfirmButton: false,
//                     timer: 1500,
//                 });
//                 updateClinicForm.reset();
//                 fetchClinics();
//             } else {
//                 Swal.fire({
//                     position: "center",
//                     icon: "error",
//                     title: "Failed to update clinic",
//                     text: res.message,
//                 });
//             }
//         })
//         .catch((error) => {
//             console.log(error);
//             Swal.fire({
//                 position: "center",
//                 icon: "error",
//                 title: "Failed to update clinic",
//                 text: "An error occurred while processing your request.",
//             });
//         });
// });


// // Update Doctors
// const updateDoctorForm = document.getElementById("form4");
// const updateDoctorSubmit = document.getElementById("submit4");

// updateDoctorForm.addEventListener("submit", (e) => {
//     e.preventDefault();

//     let data = {
//         name: document.getElementById("name4").value,
//         phone: document.getElementById("phone4").value,
//         email: document.getElementById("email4").value,
//         image: document.getElementById("image4").value,
//         about: document.getElementById("about4").value,
//         location: document.getElementById("location4").value,
//         qualification: document.getElementById("qualification4").value,
//         clinic: document.getElementById("clinic").value,
//         experience: document.getElementById("experience4").value,
//         language: document.getElementById("language4").value,
//         time: document.getElementById("time4").value,
//     };

//     fetch("http://localhost:4500/doctors/update", {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//     })
//         .then((res) => res.json())
//         .then((res) => {
//             console.log(res);
//             if (res.success) {
//                 Swal.fire({
//                     position: "center",
//                     icon: "success",
//                     title: "Doctor updated successfully",
//                     showConfirmButton: false,
//                     timer: 1500,
//                 });
//                 updateDoctorForm.reset();
//             } else {
//                 Swal.fire({
//                     position: "center",
//                     icon: "error",
//                     title: "Failed to update doctor",
//                     text: res.message,
//                 });

// update doctors

let mail = document.querySelector("#mail")
let name = document.querySelector("#names")
let phones = document.querySelector("#phones")
let experience = document.querySelector("#exp")
let qualification = document.querySelector("#qualifications")
let language = document.querySelector("#languages")
let img = document.querySelector("#images")
let about = document.querySelector("#abouts")
let loc = document.querySelector("#locations")


let array = []
let docid = localStorage.getItem("bookID")
console.log(docid)
userFun(docid)
async function userFun(id) {
const Data = await fetch(`http://localhost:4500/doctor/byid/${id}`, {
  method: "GET",
  headers: {
    "content-type": "application/json",
  },
});
if (Data.ok) {
  const userdata = await Data.json();
 array.push(userdata)
 console.log(array[0])
 mail.value = array[0].email,
 name.value = array[0].name,
 phones.value=array[0].phone,
 qualification.value = array[0].qualification,
 language.value = array[0].language,
 img.value = array[0].image,
 about.value = array[0].about,
 loc.value =array[0].location,
 experience.value = array[0].experience
}
}

