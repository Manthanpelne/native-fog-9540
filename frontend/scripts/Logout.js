let Logout_anch = document.getElementById("Logout-anch")
const BASE_SERVER_URL = "https://motionless-seal-windbreaker.cyclic.app"
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