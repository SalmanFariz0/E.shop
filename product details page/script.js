var productData = {
    "id": "1",
    "name": "Men Navy Blue Solid Sweatshirt",
    "preview": "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/08a7b230-ee8f-46c0-a945-4e835a3c01c01541402833619-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-1.jpg",
    "photos": [
      "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/08a7b230-ee8f-46c0-a945-4e835a3c01c01541402833619-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-1.jpg",
      "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/efc3d5b9-1bb3-4427-af53-7acae7af98951541402833591-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-2.jpg",
      "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/c7e58861-3431-4189-9903-9880f5eebd181541402833566-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-3.jpg",
      "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/66490b64-32de-44b4-a6e4-fe36f1c040051541402833548-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-4.jpg",
      "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/957be784-7c5d-4e90-ab9f-0928015b22891541402833645-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-5.jpg"
    ],
    "description": "Navy solid sweatshirt with patchwork, has a round neck, long sleeves, straight hem",
    "size": [
      1,
      1,
      0,
      1,
      0
    ],
    "isAccessory": false,
    "brand": "United Colors of Benetton",
    "price": 2599
  }
   

  var wrapperDiv = document.querySelector(".wrapper");
  /* Left section */
  var productPreview = document.createElement("div");
  productPreview.className = "product-preview";
  var previewImg = document.createElement("img");
  previewImg.src = productData.preview;
  previewImg.id='preview-img';
  
  /* Right section */
  var productDescriptionDiv = document.createElement("div");
  productDescriptionDiv.id="product-description-wrapper";
  var productDetails = document.createElement("div");
  productDetails.className='product-details';
  var productName = document.createElement("h1");
  productName.id='product-name-h1';
  productName.innerText = productData.name
  var productBrand = document.createElement("h4");
  productBrand.id='product-brand-h4';
  productBrand.innerText = productData.brand
  var productPrice = document.createElement("h3");
  productPrice.id='product-price-h3';
  productPrice.innerText ='Price:Rs ';
  var priceSpan = document.createElement("span");
  priceSpan.innerText = productData.price;
  priceSpan.id = "price-span";

  var DescriptionDiv = document.createElement("div");
  DescriptionDiv.className= 'description-wrapper';
  var productDescriptionH3 = document.createElement("h3");
  productDescriptionH3.id="product-description-h3";
  productDescriptionH3.innerText = "Description";
  var descriptionText = document.createElement("p");
  descriptionText.id = 'description-text-p';
  descriptionText.innerText = productData.description;
  var productChildImgDiv = document.createElement("div");
  productChildImgDiv.className='child-img-div';
  var productPreviewH3 =document.createElement("h3");
  productPreviewH3.innerText = "Product preview";
  var childImgWrapper = document.createElement("div");
  childImgWrapper.className = "preview-img-wrapper";
  
  var previewImages = productData.photos;
  for(var i=0;i<previewImages.length ; i++){
      
     var Img = document.createElement("Img");
     Img.className = "preview-images";
     Img.src = previewImages[i];
     Img.onclick = function() {imgClicked(this)};
     childImgWrapper.appendChild(Img);

  }

  var activeImage = childImgWrapper.firstChild;
  activeImage.classList.add("active");

  var addCartBtn = document.createElement("button");
  addCartBtn.innerHTML = "Add to cart"
  addCartBtn.id="cart-btn";


  /* Appending */

  wrapperDiv.append(productPreview,productDescriptionDiv);
  productPreview.appendChild(previewImg);
  productDescriptionDiv.append(productDetails,DescriptionDiv,productChildImgDiv,addCartBtn);
  productDetails.append(productName,productBrand,productPrice,priceSpan);
  DescriptionDiv.append(productDescriptionH3,descriptionText);
  productChildImgDiv.append(productPreviewH3,childImgWrapper);


  

function imgClicked(obj){
  var clickedImg = document.querySelector(".active");
  clickedImg.classList.remove("active");
  previewImg.src = obj.src;
  obj.classList.add("active")
}