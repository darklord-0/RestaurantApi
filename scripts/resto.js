console.log("resto js");
let restoid = sessionStorage.getItem("resto");
let parent = document.getElementById("singleresto");
var auth = localStorage.getItem("token")

getSingleResto();


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


function getSingleResto()
{
  let req = new XMLHttpRequest();

  req.open("GET",`https://foodbukka.herokuapp.com/api/v1/restaurant/${restoid}`);

  req.send();

  req.addEventListener("load",function()
  {
    console.log(JSON.parse(req.responseText).data);

    displayInfo(JSON.parse(req.responseText).data);
  })
}



function displayInfo(resto)
{

    var container = document.createElement("div");
    container.classList.add("restocontainer");

    var restoheadcontainer = document.createElement("div");
    restoheadcontainer.classList.add("restoheadcontainer");
    
    var restomaincontainer = document.createElement("div");
    restomaincontainer.classList.add("restomaincontainer");

    var restoname = document.createElement("h1");
    restoname.classList.add("restoname");
    restoname.innerText = resto.businessname;
   
    var restoreview = document.createElement("div");
    restoreview.classList.add("restoreview");
    restoreview.innerHTML = `&#9734;` +  "  Reviews: " + resto.reviews;
    
    var restotype = document.createElement("div");
    restotype.classList.add("restotype");
    restotype.innerText = "  Type: " + resto.restauranttype;


    var restoloc = document.createElement("div");
    restoloc.classList.add("restoloc");
    restoloc.innerHTML =`<i class="fa fa-map-marker" style="font-size:48px;color:red;"></i>` + " Location: ";
    
    var restolocation = document.createElement("p");
    restolocation.innerHTML = `<i class='fa fa-map-marker'></i>` +  resto.location;

    var restoaddr = document.createElement("p");
    restoaddr.innerHTML =  `<i class='fa fa-map'></i>` +  resto.address;


    var restofacil = document.createElement("div");
    restofacil.classList.add("restofacil");
    restofacil.innerHTML = `<i class='fa fa-info' style='font-size:48px;color:red'></i>` +  " Facilities: "  ;

    var restofacpark = document.createElement("p");
    restofacpark.classList.add("restofacpark");
    restofacpark.innerHTML = `<i class='fa fa-car'></i>` +  "Parking: " + (resto.parkinglot ? "Available" : "Not Available");

    var restofaccost = document.createElement("p");
    restofaccost.classList.add("restofaccost");
    restofaccost.innerHTML = `<i class="fa fa-money"></i>` +  "Average Cost: " + "&#8377; " + resto.averagecost;


    var restocontact = document.createElement("div");
    restocontact.classList.add("restocontact");
    restocontact.innerHTML = `<i class='fa fa-phone' style='font-size:48px; color:red;'></i>` +  "Contact: "  ;




    var restocontemail= document.createElement("p");
    restocontemail.classList.add("restocontemail");
    restocontemail.innerHTML = `<i class="fa fa-envelope"></i>` +  "Email: "  + resto.email;

    var restocontno = document.createElement("p");
    restocontno.classList.add("restocontno");
    restocontno.innerHTML = `<i class='fa fa-phone'></i>` +  " Phone no: " + resto.phone;

    restocontact.appendChild(restocontemail);
    restocontact.appendChild(restocontno);
    
    restofacil.appendChild(restofacpark);
    restofacil.appendChild(restofaccost);

    restoloc.appendChild(restolocation);
    restoloc.appendChild(restoaddr);

    restoheadcontainer.appendChild(restoname);
    restoheadcontainer.appendChild(restoreview);
    restoheadcontainer.appendChild(restotype);


    container.appendChild(restoheadcontainer);
    container.appendChild(restomaincontainer);
    restomaincontainer.appendChild(restoloc);
    restomaincontainer.appendChild(restofacil);
    restomaincontainer.appendChild(restocontact);

    parent.appendChild(container);
    parent.setAttribute("style",`background-image: url(${resto.image})`)

}