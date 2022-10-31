

/* Drop down button click */
function dropBtnClick(){
    console.log("btn clicked");
    document.getElementById("drop-down-menu").classList.toggle("add-margin");
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
/* Image slider */
const swiper = new Swiper('.swiper', {

   autoplay: {
    delay : 3000,
    disableOnInteraction : false,

   } ,
  
    loop: true,

    pagination: {
      el: '.swiper-pagination',
    },
  
   
  
   
  });
  

let mainDiv = document.querySelector(".main-section");



/* fetching data */
let url = "https://5d76bf96515d1a0014085cf9.mockapi.io/product"
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(){
    console.log(this.readyState);
    if(this.readyState == 4){
        var response = JSON.parse(this.responseText);
        createElements(response);
        
    }


}
xhttp.open("Get",url,true);
xhttp.send();

function createElements(response){
     
    console.log(response);
    var clothingDiv = document.querySelector(".clothing-section")
    var accessoriesDiv = document.querySelector(".accessories-section");
    
    
    for(var i=0; i<response.length; i++){
        
        var productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.id=response[i].id;
        
        cardImg = document.createElement("img");
        cardImg.src = response[i].preview;
        cardImg.className = "product-img";
        var productDetails = document.createElement("div");
        productDetails.className = "product-details-div";
        var productName = document.createElement("h4");
        productName.innerText = response[i].name;
        productName.className = "product-name";
        var productBrand = document.createElement("h5");
        productBrand.innerText = response[i].brand;
        productBrand.className = "product-brand";
        var productPrice = document.createElement("p");
        productPrice.innerText ="Rs "+response[i].price;
        productPrice.className = "product-price";


        
        /* appending Elements */
        productCard.append(cardImg,productDetails);
        productDetails.append(productName,productBrand,productPrice);
        
        if(response[i].isAccessory == false){

            clothingDiv.appendChild(productCard);

        }else{
            accessoriesDiv.appendChild(productCard);
        }
        
        


    }


    $(".product-card").click(function(){

         console.log($(this)[0].id);
         localStorage.setItem("clickedProductId",$(this)[0].id);
         location.assign("p details.html"); 
        
    })
    
    




  


}

