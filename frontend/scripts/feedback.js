const BASE_SERVER_URL = `https://motionless-seal-windbreaker.cyclic.app`

let formele = document.querySelector("form")

let nameinp = document.getElementById("name")
let emailinp = document.getElementById("email")
let phoneinp = document.getElementById("phone")
let messageinp = document.getElementById("message")



const AddFeedback = (e) => {
    e.preventDefault()
    let addDetails = {
        name: nameinp.value,
        email: emailinp.value,
        phone: phoneinp.value,
        message: messageinp.value
    }
    console.log(addDetails);

    fetch(`${BASE_SERVER_URL}/feedback/add`, {
        method: "POST",
        headers: {
            "content-type": "application/json"

        },
        body: JSON.stringify(addDetails)
    })
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            if (!res.ok) {
                console.log(res);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',

                })
            } else {
                // console.log(res);
                Swal.fire({
                    icon: 'success',
                    title: `${res.msg}`,
                    text: `${res.msg}`

                })
                nameinp.value = ""
                emailinp.value = ""
                phoneinp.value = ""
                messageinp.value = ""
            }
        })
}
formele.addEventListener("submit", AddFeedback)

// const getfeedback = () => {
//     fetch(`${BASE_SERVER_URL}/feedback`)
//         .then((res) => {
//             return res.json()
//         })
//         .then((data) => {
//             console.log(data);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// }
// getfeedback()