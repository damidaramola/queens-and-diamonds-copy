function validation()
{
    var user=document.getElementById("user").value;
    if(user==" ") {
        alert("no blank spaces allowed. Please insert username")
    }
    else{
      var form = document.getElementById("form")
      var main = document.getElementById("main")
      main.style.display = "flex"
      form.style.display = "block"
    }
}