console.log("all_resto")
var authbtn = document.getElementById("authbtn");
var allresto = document.getElementById("allresto");
var authli = document.getElementById("authli");
var auth = localStorage.getItem("token")

fetchAllRestaurants();

if(auth)
{
  authbtn.innerText = "SIGN OUT";
  var outsign = document.createElement("i");
  outsign.setAttribute("id","auth");
  outsign.classList.add("fa");
  outsign.classList.add("fa-sign-out");
  authli.appendChild(outsign);
}
else
{
  authbtn.innerText = "SIGN IN";
  var insign = document.createElement("i");
  insign.setAttribute("id","auth");
  insign.classList.add("fa");
  insign.classList.add("fa-sign-in");
  authli.appendChild(insign);
}


authbtn.addEventListener("click",function()
{
  
  if(auth)
  {
    logoutUser();
    return;
  }
  window.location.href = "../pages/signin.html"

})


function fetchAllRestaurants()
{
  var req = new XMLHttpRequest();
  req.open("GET","https://foodbukka.herokuapp.com/api/v1/restaurant");
  req.send();

  req.addEventListener("load",function()
  {
    console.log(JSON.parse(req.responseText));

    showAllRestaurants(JSON.parse(req.responseText).Result);

  });
}


function showAllRestaurants(restaurants)
{
  restaurants.forEach(function(restaurant){

    var container = document.createElement("div");
    container.classList.add("container");
    
    var headcontainer = document.createElement("div");
    headcontainer.classList.add("headcontainer");



    var res = document.createElement("h1");
    res.classList.add("restoname");
    res.innerText = restaurant.businessname;
    // container.appendChild(res);

    var infobtn = document.createElement("button");
    infobtn.innerText = " MORE INFO";
    infobtn.classList.add("infobtn");
    infobtn.classList.add("fa");
    infobtn.classList.add("fa-info-circle"); 


    infobtn.addEventListener("click",function()
    {
      getRestoInfo(restaurant);
    })

    headcontainer.appendChild(res);
    headcontainer.appendChild(infobtn);

    // container.appendChild(infobtn);
    container.appendChild(headcontainer);


    // var container = document.createElement("div");
    // container.classList.add("container");

    var resbtn = document.createElement("button");
    resbtn.classList.add("menubtn")
    resbtn.innerText = "OPEN MENU";
    
    
    resbtn.addEventListener("click",function()
    {

      checkIfMenu(restaurant,resbtn,container);

    })
    
    var resimg = document.createElement("img");
    resimg.classList.add("resimg");
    resimg.setAttribute("src",restaurant.image);
    
    var resadd = document.createElement("h3");
    resadd.classList.add("restoadd");
    resadd.innerText = "Address: "+restaurant.address;

    
    createChild1(container,resimg,resadd);
    
    
    container.appendChild(resbtn);
    
    allresto.appendChild(container);
    
  });
}


function getRestoInfo(restaurant)
{
  console.log(restaurant);
  sessionStorage.setItem("resto",restaurant.id);

  window.location.href = "../pages/resto.html";
}

function checkIfMenu(restaurant,resbtn,container)
{

    if( restaurant.menu !== undefined)
    {
      
      container.removeChild(resbtn);
      showmenu(restaurant,container);

    }
    else
    {
      alert('NO MENU PRESENT HERE !!');
      return;
    }


}

function showmenu(restaurant,container)
{

  
  var menuid = restaurant.menu
  console.log(menuid);  
  
  var req = new XMLHttpRequest();
  req.open("GET", "https://foodbukka.herokuapp.com/api/v1/menu/"+menuid);

  req.send();

  req.addEventListener("load",function()
  {
    var res = JSON.parse(req.responseText).Result;
    console.log(JSON.parse(req.responseText).Result)

    var imgarr = res.images;
    
    var resname = document.createElement("h3");
    resname.innerText = "Name: "+ res.menuname;
    
    var resdes = document.createElement("h3");
    resdes.innerText = res.description;
    
    createChild2(container,imgarr,resname,resdes);
    
  });

}


function createChild1(container,resimg,resadd)
{
  container.appendChild(resimg);
  container.appendChild(resadd); 
}

function createChild2(container,imgarr,resname,resdes)
{

  var imgcontainer = document.createElement("div");
    imgcontainer.classList.add("imgcontainer");

  imgarr.forEach(function(elem)
  {
    var resimg = document.createElement("img");
    resimg.classList.add("menuimg");
    resimg.setAttribute("src",elem);
    imgcontainer.appendChild(resimg);     

  })

  resname.classList.add("menuname");
  resdes.classList.add("menudes");
  container.appendChild(imgcontainer);
  container.appendChild(resname);
  container.appendChild(resdes);
  
}

function logoutUser()
{
  localStorage.removeItem("token")
  window.location.reload();

}
