/* Showing loader */
let mainSection = document.getElementById("main-section");
let loaderWrapper = document.createElement("div");
loaderWrapper.id="loader-wrapper";
loaderWrapper.innerHTML = `<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`;
mainSection.prepend(loaderWrapper);



let clickedProductId = localStorage.getItem("clickedProductId");
console.log(clickedProductId);



/* Drop down button click */
function dropBtnClick(){
    console.log("btn clicked");
    document.getElementById("drop-down-menu").classList.toggle("add-margin");
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

/* fetching data */
let url = "https://5d76bf96515d1a0014085cf9.mockapi.io/product";

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(){
    if(this.readyState == 4){
        loaderWrapper.remove();
        var response = JSON.parse(this.responseText);
        console.log(response);
        createElement(response);
        
    }
}
xhttp.open("GET",url,true);
xhttp.send();

function createElement(response){
  let leftDIv = document.getElementById("left-column");
  let rightDiv = document.getElementById("right-column");

  for(var i=0;i<response.length;i++){
       if(response[i].id == clickedProductId){
           console.log(response[i]);

           var highliteImg = document.createElement("img");
           
           highliteImg.className = "highlight-img";
           leftDIv.appendChild(highliteImg);

           var productNameDiv = document.createElement("div");
           var productName = document.createElement("h1");
           productName.innerText = response[i].name;
           productName.className = "product-name-head"
           var productBrand = document.createElement("h3");
           productBrand.innerText = response[i].brand;
           productBrand.className = "product-brand-name";
           var descriptionWrapper = document.createElement("div");
           descriptionWrapper.className = "description-wrapper"
           var descriptionText = document.createElement("p");
           descriptionText.innerText = response[i].description;
           descriptionText.className = "description-text"
           descriptionWrapper.appendChild(descriptionText);
           var price = document.createElement("span");
           price.innerHTML = "$"+response[i].price;
           price.className = "price-tag";
           var subImagesh3 = document.createElement("h3");
           subImagesh3.innerText = "Product preview";
           subImagesh3.className = "sub-img-h3"
           var subImages = document.createElement("div");
           subImages.className = "sub-img-wrapper"
           
           for(var j=0; j<response[i].photos.length;j++){
            var subImg = document.createElement("img");
            subImg.src = response[i].photos[j];
            subImg.onclick = function() {imgClicked(this)};
            subImg.className = "sub-img";
            subImages.appendChild(subImg);
           }

           var addCartBtn = document.createElement("button");
           addCartBtn.innerHTML = "Add to cart";
           addCartBtn.className = "add-cart-btn";


           productNameDiv.append(productName,productBrand);
           rightDiv.append(productNameDiv,descriptionWrapper,price,subImagesh3,subImages,addCartBtn);

       }
  }

  var previewImage = subImages.firstChild;
  previewImage.classList.add("preview-image");
  highliteImg.src = previewImage.src;

  function imgClicked(obj){
    
    var activeImg =document.querySelector(".preview-image");
    activeImg.classList.remove("preview-image");
    obj.classList.add("preview-image");
    highliteImg.src = obj.src;

  }

  
  
 
  $(".add-cart-btn").click(function(){
    let repeated = false;
    let obj = {
      productId : clickedProductId,
      size : "XL",
      colour : "black",
      count : 1,
    }

    let cartItem = JSON.parse(localStorage.getItem("cartItem"));
    if(cartItem == null){
      cartItem = [];

    }else{
      for(let i=0;i<cartItem.length;i++){
        if(clickedProductId == cartItem[i].productId) repeated =true;
      }

    }
      
    if(repeated == false){
      cartItem.push(obj);
      console.log(cartItem);
      localStorage.setItem("cartItem", JSON.stringify(cartItem));
    }else {
      for(let i=0;i<cartItem.length;i++){
         if(cartItem[i].productId == clickedProductId){
          cartItem[i].count += 1;
         }
      }
      localStorage.setItem("cartItem", JSON.stringify(cartItem));

      
    }

    setTimeout(function(){
      alert("item added to your bag");
    },1000);

      
  })

 

}


