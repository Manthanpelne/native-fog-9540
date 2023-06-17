// JavaScript (loader.js)
document.addEventListener("DOMContentLoaded", function () {
    const loader = document.getElementById("loader");
  
    // Show the loader
    function showLoader() {
      loader.style.display = "flex";
    }
  
    // Hide the loader
    function hideLoader() {
      loader.style.display = "none";
    }
  
    window.addEventListener("beforeunload", function () {
      showLoader(); 
    });
  
    window.addEventListener("load", function () {
      hideLoader(); 
    });
  });
  