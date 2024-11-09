function getImage(a){ 
    if(a < 610){
        return "/images/icons/herald_icon.png";
    }
    else if(a < 1400){
        return "/images/icons/guardian_icon.png";
    }
    else if(a < 2150){
        return "/images/icons/crusader_icon.png";
    }
    else if(a < 2930){
        return "/images/icons/archon_icon.png";
    }
    else if(a < 3700){
        return "/images/icons/legend_icon.png";
    }
    else if(a < 4460){
        return "/images/icons/ancient_icon.png";
    }
    else {
        return "/images/icons/divine_icon.png";
    }
    
} 
let in_carts = [];

  let LogoutButton = document.querySelector(".logoutBanner");
  let KubokButton = document.querySelector(".KubokBanner");
  function logout(){
    localStorage.removeItem("TOKEN");
    document.querySelector("#allContent").classList.add("hide");
    createLogin();
    deleteAllCards();

  }
   
if(localStorage.getItem("In_Carts") != undefined){
    in_carts = JSON.parse(localStorage.getItem("In_Carts"))
}
function addToCart(obj){
    Index = in_carts.findIndex(n => n.id == obj.id);
    let Els = document.querySelectorAll("#CartIcon");
    if (Index !== -1) {
        in_carts.splice(Index, 1);
        for (let CartEl of Els) {
            if(parseInt(CartEl.dataset.id) == obj.id) CartEl.classList.remove("cartTrue")
        }
      }
    else{
        in_carts.push({id: obj.id})
        for (let CartEl of Els) {
            if(parseInt(CartEl.dataset.id) == obj.id) CartEl.classList.add("cartTrue")
        }
    }
localStorage.setItem("In_Carts",JSON.stringify(in_carts));
}


function deleteAllCartCards(){
    let cards = document.querySelectorAll(".DivCartMenu");
for (let item of cards) {
    item.remove();
}

}


let Poloski = document.querySelector(".poloski");  
let filter = document.querySelector("div.filter");  
let filterButton = document.querySelector("#send");  
let clearFilterButton = document.querySelector("#clear");  
let cartUser = document.querySelector(".cartUser");
let cartButtonUser = document.querySelector(".cartBanner");
let CartButtonClear = document.querySelector(".ButtonClear");
let CartButtonUpdate = document.querySelector(".ButtonUpdate");


function filterCards(){  
    deleteAllCards();
    let price_min = document.querySelector("#price_min");
    let price_max = document.querySelector("#price_max");
    let mmr_min = document.querySelector("#mmr_min");
    let mmr_max = document.querySelector("#mmr_max");
    let decency_min = document.querySelector("#decency_min");
    let decency_max = document.querySelector("#decency_max");
    let level_min = document.querySelector("#level_min");
    let level_max = document.querySelector("#level_max");
    let matches_min = document.querySelector("#matches_min");
    let matches_max = document.querySelector("#matches_max");
    let guarnt_min = document.querySelector("#guarnt_min"); 
    let guarnt_max = document.querySelector("#guarnt_max"); 
    fetch("/getAllAccounts")
.then(res => res.json())
.then(res => {
    res.sort((a, b) => a.price > b.price ? 1 : -1)
    for(let i = 0; i < res.length;i++){  
        let acc = res[i];
         if( (price_min.value == "" && price_max.value == "") || (parseInt(price_min.value) <= acc.price && parseInt(price_max.value) >= acc.price) || (price_min.value == "" && parseInt(price_max.value) >= acc.price) || (parseInt(price_min.value) <= acc.price && price_max.value  == "")){
            if( (mmr_min.value == "" && mmr_max.value == "") || (parseInt(mmr_min.value) <= acc.mmr && parseInt(mmr_max.value) >= acc.mmr) || (mmr_min.value == "" && parseInt(mmr_max.value) >= acc.mmr) || (parseInt(mmr_min.value) <= acc.mmr && mmr_max.value  == "")){
                if( (decency_min.value == "" && decency_max.value == "") || (parseInt(decency_min.value) <= acc.decency && parseInt(decency_max.value) >= acc.decency) || (decency_min.value == "" && parseInt(decency_max.value) >= acc.Decency) || (parseInt(decency_min.value) <= acc.decency && decency_max.value  == "")){
                    if( (level_min.value == "" && level_max.value == "") || (parseInt(level_min.value) <= acc.steamlevel && parseInt(level_max.value) >= acc.steamlevel) || (level_min.value == "" && parseInt(level_max.value) >= acc.steamLevel) || (parseInt(level_min.value) <= acc.steamlevel && level_max.value  == "")){
                        if( (matches_min.value == "" && matches_max.value == "") || (parseInt(matches_min.value) <= acc.nofmatches && parseInt(matches_max.value) >= acc.nofmatches) || (matches_min.value == "" && parseInt(matches_max.value) >= acc.NOfMatches) || (parseInt(matches_min.value) <= acc.nofmatches && matches_max.value  == "")){
                            if( (guarnt_min.value == "" && guarnt_max.value == "") || (parseInt(guarnt_min.value) <= parseInt(acc.Guarantee) && parseInt(guarnt_max.value) >= parseInt(acc.guarantee)) || (guarnt_min.value == "" && parseInt(guarnt_max.value) >= parseInt(acc.guarantee)) || (parseInt(guarnt_min.value) <= parseInt(acc.guarantee) && guarnt_max.value  == "")){
                                createCard(acc);
                            }
                        }
                    }
                }
            }
         }
       }  
    })
} 
function deleteAllFromCart(){
    let els = document.querySelectorAll("#CartIcon");
    for (let item of els) {
        item.classList.remove("cartTrue")
    }
    in_carts = [];
    localStorage.removeItem("In_Carts")
}
function clearInputs(){
    let price_min = document.querySelector("#price_min");
    let price_max = document.querySelector("#price_max");
    let mmr_min = document.querySelector("#mmr_min");
    let mmr_max = document.querySelector("#mmr_max");
    let decency_min = document.querySelector("#decency_min");
    let decency_max = document.querySelector("#decency_max");
    let level_min = document.querySelector("#level_min");
    let level_max = document.querySelector("#level_max");
    let matches_min = document.querySelector("#matches_min");
    let matches_max = document.querySelector("#matches_max");
    let guarnt_min = document.querySelector("#guarnt_min"); 
    let guarnt_max = document.querySelector("#guarnt_max"); 
    price_min.value = "";
    price_max.value = "";
    mmr_min.value = "";
    mmr_max.value = "";
    decency_min.value = "";
    decency_max.value = "";
    level_min.value = "";
    level_max.value = "";
    matches_min.value = "";
    matches_max.value = "";
    guarnt_min.value = "";
    guarnt_max.value = "";
    deleteAllCards();
    fetch("/getAllAccounts")
.then(res => res.json())
.then(res => {
    console.log(res)
    res.forEach((item,index) => {
        createCard(item,index);   
    });
})
}
function deleteAllCards(){
let cards = document.querySelectorAll(".CARD");
for (let item of cards) {
    item.remove();
}
}
function deleteInfo(){
  
    let cards = document.querySelectorAll(".INFOMENU");
 
    for (let item of cards) {
        item.remove();
    }
}
function createCard(obj) {    
    let divMenu = document.createElement('div');    
    divMenu.classList.add("divMenu");   
    divMenu.classList.add("CARD");   
    divMenu.id =  "divMenu";  
  
    let button = document.createElement("button")
    button.innerText = "X"
    button.classList.add("DeleteButton")
    button.dataset.id =  obj.id;
    button.addEventListener("click",ev => {DeleteAccount(ev)})

    let buttonEdit = document.createElement("button")
    buttonEdit.classList.add("ButtonEdit")
    buttonEdit.innerText = "Edit"
    buttonEdit.dataset.id = obj.id
    buttonEdit.addEventListener("click",ev => {UpdateAccount(ev)})
    

    let img = document.createElement('img');    
    img.src = getImage(obj.mmr);   
    img.classList.add("kartina");   
    img.classList.add("CARD");   
      
    let InfoImg = document.createElement('img');    
    InfoImg.src = "/images/info_icon.png";   
    InfoImg.dataset.id = obj.id
    InfoImg.classList.add("infoImg"); 
    InfoImg.classList.add("CARD"); 
    InfoImg.addEventListener("click",(event) => {createCardInfo(event)})
    

    let header = document.createElement('h2');    
    header.innerText = obj.title;    
    header.classList.add("header");
    header.classList.add("CARD");
    
    let desript = document.createElement('p');    
    desript.innerText = obj.description;   
     desript.classList.add("descr");
     desript.classList.add("CARD");
  
    let price = document.createElement('footer');    
    price.innerText = obj.price + "$";   
    price.classList.add("price");  
    price.classList.add("CARD"); 

    let MMR = document.createElement('h2');   
    MMR.innerText = "MMR: " + obj.mmr;
    MMR.classList.add("MMR");
    MMR.classList.add("CARD");

    let cart = document.createElement('img');   
    cart.src = "/images/cart_icon.png";
    cart.id = "CartIcon"
    cart.dataset.id = `${obj.id}`
    cart.classList.add("cart");
    if(in_carts != undefined){
        for (let item of in_carts) {
            if(item.id == obj.id){
                cart.classList.add("cartTrue");  
                break;
            }
        }
    }
    cart.addEventListener("click",() => {addToCart(obj)})
    cart.classList.add("CARD");  


    let Decency = document.createElement('h3');   
    Decency.innerText = "Порядочность: " + obj.decency;
    Decency.classList.add("Decency");
    Decency.classList.add("CARD");

    document.querySelector('.content').append(divMenu); 
    divMenu.append(button);
    divMenu.append(buttonEdit);
    divMenu.append(InfoImg);    
    divMenu.append(MMR);    
    divMenu.append(Decency);  
    divMenu.append(img);  
    divMenu.append(header);    
    divMenu.append(desript);   
    divMenu.append(price);
    divMenu.append(cart);
} 

function createCardInfo(event) {    
    if(document.querySelector(".INFOMENU") == null){
    fetch("/getAccountFromId",{method: "POST",headers: {"Content-Type": "application/json"},body: JSON.stringify({id: event.target.dataset.id})}).then(res => res.json())
    .then(obj => {
        obj = obj[0]
    if(document.querySelector(".INFOMENU") == null){

    let divMenu = document.createElement('div');    
    divMenu.classList.add("DivInfoMenu");   
    divMenu.classList.add("INFOMENU");   
    
    

    let img = document.createElement('img');    
    img.src = getImage(obj.mmr);   
    img.classList.add("MmrIcon");   
    img.classList.add("INFOMENU");   
      
    let exit = document.createElement('img');    
    exit.src = "/images/close_icon.png";   
    exit.classList.add("ExitInfo");  
    exit.addEventListener("click",() => {deleteInfo()}); 
    exit.classList.add("INFOMENU");   
    
   

    let divText = document.createElement('div');    
    divText.classList.add("divInfoText");   
    divText.classList.add("INFOMENU");   

    let title = document.createElement('h3'); 
    title.innerText = obj.title
    title.classList.add("INFOMENU");   
    title.classList.add("InfoTitleText");

    let descr = document.createElement('p'); 
    descr.innerText = obj.description;
    descr.classList.add("INFOMENU");   
    descr.classList.add("descript");   

    let guarnt = document.createElement('p'); 
    guarnt.innerText = "Гарантия: " + obj.guarantee;
    guarnt.classList.add("AccInfoText");
    guarnt.classList.add("INFOMENU");   

    let divForImgMmr = document.createElement('div');
    divForImgMmr.classList.add("divForImgMmr");
    divForImgMmr.classList.add("INFOMENU");   

    let divForAccInfo = document.createElement('div');
    divForAccInfo.classList.add("divForAccInfo");
    divForAccInfo.classList.add("INFOMENU");   
    
    let MmrText = document.createElement("p");
    MmrText.innerText = "MMR: " + obj.mmr;
    MmrText.classList.add("AccInfoText");
    MmrText.classList.add("INFOMENU");   

    let DecencyText = document.createElement("p");
    DecencyText.innerText = "Порядочность: " + obj.decency;
    DecencyText.classList.add("AccInfoText");
    DecencyText.classList.add("INFOMENU");  

    StLvl = document.createElement("p");
    StLvl.innerText = "Уровень Steam: " + obj.steamlevel;
    StLvl.classList.add("AccInfoText");
    StLvl.classList.add("INFOMENU");   

    let matches = document.createElement("p");
    matches.innerText = "Количество матчей: " + obj.nofmatches;
    matches.classList.add("AccInfoText");
    matches.classList.add("INFOMENU");   

    let cart = document.createElement('img');   
    cart.src = "/images/cart_icon.png";
    cart.classList.add("Infocart");
    cart.id = "CartIcon"
    cart.dataset.id = `${obj.id}`
    if(in_carts != undefined){
    for (let item of in_carts) {
        if(item.id == obj.id){
            cart.classList.add("cartTrue");  
            break;
        }
    }
}
    cart.addEventListener("click",() => {addToCart(obj)})
    cart.classList.add("INFOMENU");  

    document.body.append(divMenu); 
    divMenu.append(divForImgMmr); 
    
    divMenu.append(title);
    divMenu.append(img);  

    divMenu.append(exit);  
    divMenu.append(divForAccInfo);
    
    divMenu.append(descr);
    
    divForAccInfo.append(MmrText);
    divForAccInfo.append(DecencyText);
    divForAccInfo.append(guarnt);
    divForAccInfo.append(matches);
    divForAccInfo.append(StLvl);
    divMenu.append(cart);
    }})
}
}  
function createCartCard(obj){

        let divMenu = document.createElement('div');    
        divMenu.classList.add("DivCartMenu");   
        divMenu.style.background = `url(${getImage(obj.mmr)})`
        divMenu.style.backgroundRepeat = "no-repeat";
        divMenu.style.backgroundSize = "20vw 20vw";
 
          
        let title = document.createElement('h2'); 
        title.innerText = obj.title;
        title.classList.add("titleCart");

        let MMR = document.createElement('p'); 
        MMR.innerText = `MMR: ${obj.mmr}`;
        MMR.classList.add("mmrCart");

        let price = document.createElement('p'); 
        price.innerText = obj.price + "$";
        price.classList.add("priceCart");
    
        let close = document.createElement('img');   
        close.src = "/images/close_icon.png";
        close.classList.add("CloseCartCardButton");
        close.addEventListener("click",() => {addToCart(obj); divMenu.remove();})
    
        document.querySelector(".cartUser").prepend(divMenu); 
        divMenu.append(close);
        divMenu.append(title);
        divMenu.append(MMR);
        divMenu.append(price);
}
function filterMove(){  
    filter.classList.toggle("filterAnimation");   
    }  
function cartMove(){
    cartUser.classList.toggle("cartUserAnimation");  
    createAllCartCards()
}
async function createAllCartCards(){
  for (let item of in_carts) {
         index = item.id
          let account = await fetch("/getAccountFromId",{method: "POST",headers: {"Content-Type": "application/json"},body: JSON.stringify({id: index })})
          account = await account.json()
        createCartCard(account[0]);   
  }
  }  
Poloski.addEventListener("click",filterMove);  
filterButton.addEventListener("click",filterCards);  
clearFilterButton.addEventListener("click",clearInputs);  
cartButtonUser.addEventListener("click",() => { deleteAllCartCards();cartMove();});  
CartButtonClear.addEventListener("click",() => { deleteAllCartCards();deleteAllFromCart();});  
CartButtonUpdate.addEventListener("click",() => { deleteAllCartCards();createAllCartCards();});  
LogoutButton.addEventListener("click",logout);  

document.body.classList.remove("LogInBodyBackground");
if(document.querySelector(".LoginDiv") != null){
    document.querySelector(".LoginDiv").remove();
}
document.querySelector("#allContent").classList.remove("hide");


fetch("/getAllAccounts")
.then(res => res.json())
.then(res => {
    console.log(res)
    res.forEach((item,index) => {
        createCard(item,index);   
    });
})

function isLogged(){
    const token = localStorage.token
    if(token&&token!='undefined'){
        const payload = JSON.parse(window.atob(token.split('.')[1])) 
        if(payload.exp>Date.now()/1000){
            console.log("User is authenticated")
            return true
        } else {
            console.log("Token is expired")
            return false
        }
    } else {
        console.log("User is not registered")
        return false
    }
}

function addAccount(){
if(!isLogged()){
    document.getElementById("register_message").style.visibility =  "visible"
}
else{
    window.location.href = "/AddAccount.html"
}
}

function UpdateAccount(ev){
    if(!isLogged()){
        document.getElementById("register_message").style.visibility =  "visible"
    }
    else{
        window.location.href = `/UpdateAccount.html?id=${ev.target.dataset.id}`
    }
}

function DeleteAccount(ev){
    if(!isLogged()){
        document.getElementById("register_message").style.visibility =  "visible"
    }
    else{
        ev.target.offsetParent.remove()
        fetch("/DeleteAccountFromId",{method: "POST",headers: {"Content-Type": "application/json",'Authorization':`Bearer ${localStorage.token}`},body: JSON.stringify({
           id: ev.target.dataset.id
        })}).then(res => res.json())
        .then(res => {
            console.log(res)
            let el = document.getElementById("message_box")
            el.style.visibility = "visible"
            let message = document.getElementById("message")
            message.innerText = res.message
        })
    }
    }
