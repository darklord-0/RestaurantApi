console.log("signin")


var signinname = document.getElementById("username");
var signinpwd = document.getElementById("password");

var signinbtn = document.getElementById("signinbtn");
var signupbtn = document.getElementById("signupbtn");

var inmsg = document.getElementById("inmsg");


var auth = localStorage.getItem("token");
if(auth)
{
  window.location.href = "/";
}

signinbtn.addEventListener("click",function()
{
  console.log('inned')

  var isFormValid = validateForm([signinname.value,signinpwd.value]);

  if(!isFormValid)
  {
    // alert('Please every field!!');
    inmsg.innerText = "Please every field!!";
    signinname.classList.add("warning");
    signinpwd.classList.add("warning");
    return;
  }

  inmsg.innerText ="";

  console.log(signinname.value,signinpwd.value);

  signinname.classList.remove("warning");
  signinpwd.classList.remove("warning");
  signInUser(signinname.value,signinpwd.value);



});


signupbtn.addEventListener("click",function()
{
  window.location.href = "../pages/signup.html";
});



function signInUser(name,pass)
{

  var request = new XMLHttpRequest();
  request.open("POST","https://foodbukka.herokuapp.com/api/v1/auth/login");

  request.setRequestHeader("Content-Type","application/json");

  var body = {
    "username": name,
    "password": pass,
  }

  var id = setTimeout(function()
  {
    request.send(JSON.stringify(body));
    signinbtn.disabled = true;
    signinbtn.innerText  = "LOADING...";
  },2000);

  

  request.addEventListener("load",function()
  {
    clearTimeout(id);
    signinbtn.innerText  = "SIGNIN";
    var signinres = JSON.parse(request.responseText);
    console.log(signinres);
    signinbtn.disabled = false;

    handlestatus(request.status,signinres,signinname,signinpwd);

  })



}

function validateForm(data)
{
  return data.every(function(elem)
  { 
    return elem !== "";
  });
}


function handlestatus(stat,resp,signinname,signinpwd)
{
  if(stat == 200)
  {
    handlesuccessignup(resp,signinname,signinpwd);
  }
  else
  {
    handlerror(stat,resp);
  }
}


function handlesuccessignup(resp,signinname,signinpwd)
{
  signinname.value = "";
  signinpwd.value = "";
  alert('signin success!')
  localStorage.setItem("token",resp.token);
  window.location.href="/";
}

function handlerror(stat,resp)
{
  // alert(resp.error);
  inmsg.innerText = resp.error;
}