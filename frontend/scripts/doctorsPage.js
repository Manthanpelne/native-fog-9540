let doc = [];
async function getDoctors() {
  const data = await fetch("https://hilarious-bear-vestments.cyclic.app/doctor/", {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  if (data.ok) {
    const fetchdata = await data.json();
    console.log(fetchdata);
    doc.push(...fetchdata);
    renderDocData(doc);
  }
}
getDoctors();

function renderDocData(doc) {
  let secmaincontainer = document.querySelector("#doctors");
  secmaincontainer.innerHTML = "";

  let newarr = doc.map((item) => {
    return `
  <div class="cardagain">
      <div>
      <img src="${item.image}"> 
      </div>
      <div>
          <h3> <h5>Name:</h5>  ${item.name}</h3>
          <p> <h5>Phone:</h5> ${item.phone}</p>
          <p>  <h5>Charge:</h5>  ${item.charge}</p>
          <p>  <h5>Qualification:</h5>  ${item.qualification}</p>
          <p> <h5>Experience:</h5>  ${item.experience}</p>
          </div>
          <div>
            <p><h5>Language:</h5>  ${item.language}</p>
            <p><h5>Expertise:</h5> ${item.about}</p> 
            <p>  <h5>Timings:</h5>  ${item.timings}</p>
            <p>  <h5>Location:</h5>${item.location}</p>
            <button data-id=${item._id} onclick="clickBook()" class="book">Book Appointment</button>
      </div>
  </div>
  `;
  });
  secmaincontainer.innerHTML = newarr.join(" ");
}



function clickBook() {

  if (token) {
    const id = event.target.dataset.id
    localStorage.setItem("bookID", id)

    setTimeout(() => {
      window.location.href = "doctorDetails.html"
    }, 1000);

  } else {
    Swal.fire({
      position: "centre",
      icon: "error",
      title: `Please Login First`,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
// let bookele = document.getElementsByClassName("book")

// bookele.addEventListener("click",()=>{
//   if(token){
//     window.location.href
//   }
// })

