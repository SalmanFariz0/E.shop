let cartWrapper = document.querySelector(".cart-page-wrapper");

/* Showing loader */
let mainSection = document.getElementById("main-section");
let loaderWrapper = document.createElement("div");
loaderWrapper.id="loader-wrapper";
loaderWrapper.innerHTML = `<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`;
mainSection.prepend(loaderWrapper);

/* Drop down button click */
function dropBtnClick(){
    document.getElementById("drop-down-menu").classList.toggle("add-margin");
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

let cartTotalAmount = 0; 

/* Creating cart items */

let cartItems = JSON.parse(localStorage.getItem("cartItem"));
console.log(cartItems);
if(cartItems == null || cartItems == ''){
    loaderWrapper.remove();
    nullCartH1 = document.createElement("h1");
    nullCartH1.innerText = "No items in your bag!";
    nullCartH1.id = "null-cart-text";
    cartWrapper.appendChild(nullCartH1);

    $("#order-btn").click(function(){
        alert("Add items to your cart");
            
    });
}else{

    let url = "https://5d76bf96515d1a0014085cf9.mockapi.io/product";
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
    if(this.readyState == 4){
        loaderWrapper.remove();
        let response = JSON.parse(this.responseText);
        console.log(response);
        createCart(response,cartItems);
    }
    }
    xhttp.open("GET",url,true);
    xhttp.send();

}



/* Function creating cart items */
function createCart(response,cartItems){
    

    for(let i=0;i<cartItems.length;i++){

        for(let j=0;j<response.length;j++){
            if(cartItems[i].productId == response[j].id){
                console.log(response[j].id,response[j].name);
                /* Creating Cart Items */ 
                let cartItem = document.createElement("div");
                cartItem.className = "cart-item";
                cartItem.id = response[j].id;
                let cartLeft = document.createElement("div");
                cartLeft.className = "cart-column-left";
                cartImg = document.createElement("img");
                cartImg.src = response[j].preview;
                let cartRight = document.createElement("div");
                cartRight.className = "cart-column-right";
                let cartProductName = document.createElement("h1");
                cartProductName.innerText = response[j].name;
                cartProductName.className = "cart-product-name";
                let cartBrand = document.createElement("h3");
                cartBrand.className = "cart-brand-name";
                cartBrand.innerText = response[j].brand;
                let cartProductSize = document.createElement("p");
                cartProductSize.className = "cart-product-size";
                cartProductSize.innerText = cartItems[i].size;
                let cartProductClr = document.createElement("p");
                cartProductClr.innerText = cartItems[i].colour;
                cartProductClr.className = "cart-product-clr";
                let cartItemCount = document.createElement("p");
                cartItemCount.className = "cart-item-count";
                cartItemCount.innerText = "x"+cartItems[i].count;
                let cartProductPrice = document.createElement("h2");
                let totalPrice = (response[j].price*cartItems[i].count);
                cartProductPrice.innerText = "$"+totalPrice;
                cartProductPrice.className = "cart-product-price";
                let dltBtn = document.createElement("button");
                dltBtn.className = "cart-dlt-btn";
                dltBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;



                /* Adding amount of products to a variable */
                cartTotalAmount += totalPrice;
                

                /* appending */
                cartLeft.appendChild(cartImg);
                cartRight.append(cartProductName,cartBrand,cartProductSize,cartProductClr,cartItemCount,cartProductPrice);

                cartItem.append(cartLeft,cartRight,dltBtn);
                cartWrapper.appendChild(cartItem);
                


            }
        }
    }
    
    $(".sub-total").text(cartTotalAmount);

    /* Product detials page linking */
    $(".cart-column-left img").click(function(e){
        let clickedProductId = e.currentTarget.offsetParent.id; 
        localStorage.setItem("clickedProductId",clickedProductId);
        location.assign("p details.html");
        

    })

    $("#checkout-btn").click(function(){
        document.querySelector(".checkout-modal-container").classList.add("show"); 
            
    });
    $("#close-btn").click(function(){
        document.querySelector(".checkout-modal-container").classList.remove("show");
    })

    $(".cart-dlt-btn").click(function(e){
      let ElementId = e.currentTarget.offsetParent.id;
      console.log(ElementId)
      for(let i=0;i<cartItems.length;i++){
         if(cartItems[i].productId == ElementId){
            console.log(cartItems[i]);
            cartItems.splice(i,1);
            console.log(cartItems);
            localStorage.setItem("cartItem",JSON.stringify(cartItems));
            location.reload();
         }
      }
      
      let deleteElement = e.currentTarget.offsetParent;
      deleteElement.remove();

    })

    


}

$(".checkout-modal #place-order-btn").click(function(){
   /*  localStorage.setItem("cartItem",null)
    alert("Order placed");
    location.reload(); */
})


/* Form validation */


const form = document.getElementById("form");
const fname = document.getElementById("fname");
const city = document.getElementById("city");
const state = document.getElementById("state");
const pinCode = document.getElementById("pin-num");
const phone = document.getElementById("phone-no");
const email = document.getElementById("mail");

let isError = false
form.addEventListener('submit', e => {
    e.preventDefault();
    validateInputs();
   
    if(isError == true){
       
        $(".checkout-modal").scrollTop(0)

    }else{
    let cResult = confirm("Are you sure?");
    if(cResult == true){
        localStorage.removeItem("cartItem");
    location.reload();
    alert("order placed");

    }
     
    }
   
})

function validateInputs(){
    let error = false;

    let inputValue = fname.value.trim();
    if(inputValue === ''){
       
        setError("Name is requierd",fname)

    }else{
        setSuccess(fname)

    }

    inputValue = city.value.trim();
    if(inputValue === ''){
        setError("City name is requierd",city);
    }else{
        setSuccess(city);
    }

    inputValue = state.value.trim();
    if(inputValue === ''){
        setError("State is requierd",state)
    }else{
        setSuccess(state)
    }

    inputValue = pinCode.value.trim();
    if(pinCode.value === ''){
        setError("Pin code is requierd",pinCode);
    }else {
        
 
        if(inputValue.length !== 6){
             
           setError("Enter a valid pin code",pinCode) 
           
        }else{
            
            setSuccess(pinCode)
        }

    }

    inputValue = phone.value.trim();
    if(inputValue == ''){
        setError("Phone number is requierd",phone);
        
    }else{
        
        if(inputValue.length !== 10 ){
            setError("Enter a valid phone number",phone);
          
        }else{
            setSuccess(phone);
        }
    }
    

    inputValue = email.value.trim();
    if(!isValidEmail(inputValue)){
        setError("Enter a valid email address",email);
    }else{
        setSuccess(email)
    }

    isError = error;
    
    /* Error and success */
    function setError(message,element){

        let parentDiv = element.parentElement;
        let errorDisplay = parentDiv.querySelector(".form-error");
    
        errorDisplay.innerHTML = message;
        element.classList.add("form-error-border");
    
        error = true;
       
    
    }
    function setSuccess(element){
    
        let parentDiv = element.parentElement;
        let errorDisplay = parentDiv.querySelector(".form-error");
    
        errorDisplay.innerHTML = '';
        element.classList.remove("form-error-border");
    
       
      
    }

 /* Closing validate inputs fn */    
}





const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}




















