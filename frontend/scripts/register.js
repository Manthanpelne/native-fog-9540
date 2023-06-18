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
