let doc = [];
async function getDoctors() {
  const data = await fetch("https://motionless-seal-windbreaker.cyclic.app/doctor/", {
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
    FilterByInp(fetchdata)
    FilterdatabyLocation(fetchdata)
    SortByPrice(fetchdata)
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


let formele = document.getElementById("speciality-form")
let nameinp = document.getElementById("speciality-input")

const FilterByInp = (data) => {
  formele.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = nameinp.value.trim().toLowerCase(); // 
    if (inputValue === "") {

      renderDocData(data);
      return;
    }

    let fiteredata = data.filter((ele) => {
      let name = ele.name.toLowerCase();
      let location = ele.location.toLowerCase();
      return name.includes(inputValue) || location.includes(inputValue);
    });
    renderDocData(fiteredata);
  });
};
let puneele = document.getElementById("pune");

const FilterdatabyLocation = (data) => {
  let arr = data;
  console.log(arr);

  puneele.addEventListener("change", () => {
    if (puneele.value === "all") {
      window.location.reload()
      renderDocData(arr);
    } else {
      let filteredvaluebased = data.filter((ele) => {
        return ele.location === puneele.value;
      });
      renderDocData(filteredvaluebased);
    }
  });
};
let newidele = document.querySelector(".addnew")
function SortByPrice(data) {

  newidele.addEventListener("change", () => {
    if (newidele.value == "asc") {
      let ascsort = [...data].sort((a, b) => a.charge - b.charge)
      renderDocData(ascsort)
    } else if (newidele.value == "desc") {
      let descsort = [...data].sort((a, b) => b.charge - a.charge)
      renderDocData(descsort)
    } else {
      renderDocData(data)
    }
// console.log(newidele.value);
  })
}


