let newarr = []
const newid = localStorage.getItem("clinicID")
console.log(newid)
const id = newid
getDetailsofDoc(id)
 async function getDetailsofDoc(id){
     const Data = await fetch(`https://hilarious-bear-vestments.cyclic.app/clinic/${id}`, {
 method: "GET",
 headers: {
   "content-type": "application/json",
 },
});
if (Data.ok) {
 const fetchdata = await Data.json();
 console.log(fetchdata)
 newarr.push(fetchdata);
 console.log(newarr)
 renderDocData(newarr[0].doctors)
}
 }


 function renderDocData(newarr) {
let secmaincontainer = document.querySelector("#doctors");
secmaincontainer.innerHTML = "";

let arr = newarr.map((item) => {
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
secmaincontainer.innerHTML = arr.join(" ");
}

function clickBook(){
const  id = event.target.dataset.id
localStorage.setItem("bookID",id)
setTimeout(() => {
window.location.href = "doctorDetails.html"
}, 1000);
}