console.log("signup")

var signupname = document.getElementById("username");
var signuppwd = document.getElementById("password");
var signupphone = document.getElementById("phone");
var signupmail = document.getElementById("email");
var upmsg = document.getElementById("upmsg");

var signupbtn = document.getElementById("signupbtn");
var signinbtn = document.getElementById("signinbtn");



var auth = localStorage.getItem("token");
if(auth)
{
  window.location.href = "/";
}

signupbtn.addEventListener("click",function()
{
  console.log('upped')

  var isFormValid = validateForm([signupname.value,signuppwd.value,
    signupphone.value,
    signupmail.value]);


  if(!isFormValid)
  {
    // alert('Please every field!!');
    upmsg.innerText = "Please every field!!";
    signupname.classList.add("warning");
    signuppwd.classList.add("warning");
    signupphone.classList.add("warning");
    signupmail.classList.add("warning");

    return;
  }

  upmsg.innerText ="";

  console.log(signupname.value,signuppwd.value,
    signupphone.value,
    signupmail.value)

  signupname.classList.remove("warning");
  signuppwd.classList.remove("warning");
  signupphone.classList.remove("warning");
  signupmail.classList.remove("warning");

  signUpUser(signupname.value,signuppwd.value,
    signupphone.value,
    signupmail.value);

});


signinbtn.addEventListener("click",function()
{
  window.location.href = "../pages/signin.html";
});

function validateForm(arrform)
{
  return arrform.every(function(elem)
  {
    return elem !== "";
  });
}

function signUpUser(name,pass,phone,email)
{
  var request = new XMLHttpRequest();
  request.open("POST","https://foodbukka.herokuapp.com/api/v1/auth/register");

  request.setRequestHeader("Content-Type","application/json");

  var body = {
    "username": name,
    "password": pass,
    "phoneNumber": phone,
    "email": email
  }

    
  var id = setTimeout(function()
  {
    request.send(JSON.stringify(body));
    signupbtn.disabled = true;
    signupbtn.innerText  = "LOADING...";
  },2000);



  request.addEventListener("load",function()
  {
    clearTimeout(id);
    signupbtn.innerText  = "SIGNUP";
    var signupres = JSON.parse(request.responseText);
    console.log(signupres);
    signupbtn.disabled = false;

    handlestatus(request.status,signupres);

  })

}





function handlestatus(stat,resp)
{
  if(stat == 200)
  {
    handlesuccessignup(resp);
  }
  else
  {
    handlerror(stat,resp);
  }
}


function handlesuccessignup(resp)
{
  signupname.value = "";
  signuppwd.value = "";
  signupmail.value = "";
  signupphone.value = "";

  alert('signup success!')
  localStorage.setItem("token",resp.token);
  window.location.href="/";
}

function handlerror(stat,resp)
{
  // alert(resp.error);
  upmsg.innerText = resp.error;

}