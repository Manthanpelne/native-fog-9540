let form = document.getElementById("formcont");

let arr = []
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  fetch(`
  https://motionless-seal-windbreaker.cyclic.app/user/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      // arr.push(res.user._id)
      // localStorage.setItem("userID", arr)
      if (res.msg == "login Success") {
        const user = {
          name: res.user.name,
          email: res.user.email,
          role: res.user.role,
        };
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", res.accessToken);
        arr.push(res.user._id)
        localStorage.setItem("userID", arr)
        Swal.fire({
          position: "centre",
          icon: "success",
          title: "Login Success",
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          if (user.role === "Admin") {
            window.location.href = "admin.html";
          } else {
            window.location.href = "index.html";
          }
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
    })
    .catch((err) => console.log(err));
});

document.getElementById("forget").addEventListener("click", function () {
  // Display SweetAlert modal
  Swal.fire({
    title: "Reset Password",
    input: "email",
    inputPlaceholder: "Enter your email",
    showCancelButton: true,
    confirmButtonText: "Submit",
  }).then((result) => {
    // Handle submit button click
    if (result.isConfirmed) {
      // Send API request to your backend route for password reset
      fetch("https://motionless-seal-windbreaker.cyclic.app/user/reset-password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: result.value,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Display success message or error message from the response
          Swal.fire(data.msg);
        })
        .catch((error) => {
          console.error(error);
          // Display error message
          Swal.fire("An error occurred. Please try again.");
        });
    }
  });
});
// let googleBtn = document.getElementById("gbtn");

// googleBtn.addEventListener("click", () => {
//     // window.location.href="leaderboard.html"
// // })
// const signUpButton = document.getElementById('continue');
// const signInButton = document.getElementById('continue');
// const container = document.getElementById('container');

// signUpButton.addEventListener('click', () => {
//     container.classList.add('right-panel-active');
// });

// signInButton.addEventListener('click', () => {
//     container.classList.remove('right-panel-active');
// });



// const form = document.getElementById('formcont');
// const nameInput = document.getElementById('name');
// const emailInput = document.getElementById('email');
// const mobileInput = document.getElementById('mobile');
// const passwordInput = document.getElementById('password');
// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
// let previousPasswords = [];

// // Signup Logic

// form.addEventListener('submit', function (event) {
//     event.preventDefault();

//     // Validate password
//     console.log(passwordRegex.test(passwordInput.value));
//     if (!passwordRegex.test(passwordInput.value)) {
//         alert('Please enter a password that meets the required criteria.')
//         return;
//     }
//     let data = {
//         name: nameInput.value,
//         email: emailInput.value,
//         password: passwordInput.value
//     }

//     // Submit form
//     console.log(data)
//     fetch("https://motionless-seal-windbreaker.cyclic.app/user/login", {
//         method: "post",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(data)
//     })
//         .then(response => response.json())
//         .then(result => {
//             console.log("success", result)
//             if (result) {
//                 swal("Sign Up Successful!", "Now You've an Account with us! Yayy 😊👏", "success");
//                 // alert("Sign Up Successfull")
//             }
//         })
//         .catch(err => console.log(JSON.stringify(err)))

// });




// Sign In Logic

// let signInform = document.getElementById("formcont")
// let signedInName = document.getElementById("email")
// let signupBtn = document.getElementById("continue")
// let logout = document.getElementById("logOutBtn")
// signInform.addEventListener("submit", (e) => {
//     e.preventDefault()
//     let data = {
//         email: signInform[0].value,
//         password: signInform[1].value
//     }
//     fetchLogin(data)
//     // console.log(form[0].value,form[1].value);
// })
// function fetchLogin(data) {
//     fetch("https://motionless-seal-windbreaker.cyclic.app/user/login", {
//         method: "post",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(data)
//     })
//         .then(response => response.json())
//         .then(result => {
//             console.log("success", result)
//             if (result.msg === 'Login Successful') {
//                 console.log(result);
//                 // console.log(data.name);
//                 localStorage.setItem("LoggedName", result.name)
//                 localStorage.setItem("LoggedID", result.id)
//                 // swal("Login Successful!", "You can now access our services!", "success");
//                 swal({
//                     title: "Login Successful!",
//                     text: "You can now access our services!",
//                     icon: "success",
//                     button: "Yay!🎉",
//                 }).then((value) => {
//                     if (value) {
//                         window.location.href = "./dashboard.html";
//                     }
//                 });

//                 // alert("Login Successfull")
//                 // window.location.href = "./dashboard.html"
//             }
//             else if (result.msg === 'User not found') {
//                 // alert("User not found")
//                 swal("Failed! User Not Found ❌", "Go To Sign Up And Create New Account! 🥺🙏", "error");
//             }
//             else {
//                 swal("Failed! Wrong Password ❌", "Don't be in hurry! Type your Password Correctly 🙏", "error");
//                 // alert("Wrong Credentials")
//             }

//         })
//         .catch(err => console.log(err))

// }
