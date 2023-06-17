  
    let newarr = []
    const newid = localStorage.getItem("bookID")
    const id = newid
    getDetailsofDoc(id)
     async function getDetailsofDoc(id){
         const Data = await fetch(`http://localhost:4500/doctor/byid/${id}`, {
     method: "GET",
     headers: {
       "content-type": "application/json",
     },
   });
   if (Data.ok) {
     const fetchdata = await Data.json();
     newarr.push(fetchdata);
     console.log(newarr)
     renderDocData(newarr)
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
       </div>
   </div>
   `;
   });
   secmaincontainer.innerHTML = arr.join(" ");
 }



 /////////////////////////////////////

 let mail = document.querySelector("#email")
let name = document.querySelector("#name")
 
 let a = []
 let userid = localStorage.getItem("userID")
 userFun(userid)
     async function userFun(id){
         const Data = await fetch(`http://localhost:4500/user/${id}`, {
     method: "GET",
     headers: {
       "content-type": "application/json",
     },
   });
   if (Data.ok) {
     const userdata = await Data.json();
     a.push(userdata.user)
     mail.value = a[0].email
     name.value = a[0].name
   }
  }

  