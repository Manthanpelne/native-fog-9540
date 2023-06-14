let form = document.getElementById("formcont");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };
    // console.log(data);
    fetch(`http://localhost:4500/user/register`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((res) => res.json())
        .then((res) => {
        console.log(res)
            if (res.msg != "Register Success") {
            console.log(res.msg), alert(res.msg);
        } else {
            // console.log(res.msg);
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
            alert("Register Success")
            window.location.href = "login.html";
        }
    })
    .catch((error) => console.log(error.message));
})

// /* register page */
// let RegisterUserDB =
//     JSON.parse(localStorage.getItem("userdatabase")) || [];

// let UserFirstName = document.querySelector("#name");
// // let UserLastName = document.querySelector("#ame");

// let NewUserEmailAddress = document.querySelector("#email");
// let NewUserPassword = document.querySelector("#password");

// let CreateAccountButton = document.querySelector("#continue");

// CreateAccountButton.addEventListener("click", function (e) {
//     e.preventDefault();
//     if (
//         UserFirstName.value &&
//         // UserLastName.value &&
//         NewUserEmailAddress.value &&
//         NewUserPassword.value
//     ) {
//         let obj = {
//             ufname: UserFirstName.value,
//             // ulname: UserLastName.value,
//             useremail: NewUserEmailAddress.value,
//             userpass: NewUserPassword.value,
//         };

//         let t = false;
//         for (let i = 0; i < RegisterUserDB.length; i++) {
//             if (RegisterUserDB[i].useremail === obj.useremail) {
//                 t = true
//                 break;
//             }
//         }
//         if (t === true) {
//             // alert user already registered
//             alert("Your Account Already Exists, Try to Log in");
//             window.location.href = "./login.html"
//         } else {
//             RegisterUserDB.push(obj);
//             alert("Your account has been created, Please Log in now");
//             window.location.href = "login.html"
//             console.log(RegisterUserDB);

//             localStorage.setItem(
//                 "userdatabase",
//                 JSON.stringify(RegisterUserDB)
//             );
//         }
//     } else {
//         alert("Enter All The Details, To register");
//     }
// }); /* User and Admin login */


// // Code for redirect to home
// let imagelink = document.getElementById("rohit_homeLink")
// imagelink.addEventListener("click", () => {
//     window.location.href = "index.html"
// })
// // Code for redirect to home

