
document.querySelector("#clear-search").addEventListener("click", (e) => {
     e.preventDefault();

     document.getElementById("title").value = "";
     document.getElementById("publishDateBefore").value = "";
     document.getElementById("publishDateAfter").value = "";
     
})