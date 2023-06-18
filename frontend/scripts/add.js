
let form = document.getElementById("docform");

let arr = []
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let data = {
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        image: document.getElementById("image").value,
        location: document.getElementById("location").value,
        details: document.getElementById("details").value,
        qualification: document.getElementById("qualification").value,
        experience: document.getElementById("experience").value
    };
    console.log(data);
    fetch(`http://localhost:4500/add`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((res) => {
            arr.push(res.user._id)
            localStorage.setItem("userID", arr)
            if (res.msg == "login Success") {
                const user = {
                    name: res.user.name,
                    email: res.user.email,
                    role: res.user.role,
                };
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("token", res.accessToken);
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
