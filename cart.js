const data = [
    {
        id: 0,
        img: 'cart-img/food2-removebg-preview.png',
        name: 'Afang soup',
        price: 700,
        itemInCart: false
    },
    {
        id: 1,
        img: 'cart-img/food5-removebg-preview.png',
        name: 'Chicken soup',
        price: 1500,
        itemInCart: false
    },
    {
        id: 2,
        img: 'cart-img/food4-removebg-preview.png', 
        name: 'Spaghetti',
        price: 500,
        itemInCart: false
    },
    {
        id: 3,
        img: 'cart-img/food6-removebg-preview.png',
        name: 'Egg Sauce with yam',
        price: 1000,
        itemInCart: false
    },
    {
        id: 4,
        img: 'cart-img/food3-removebg-preview.png',
        name: 'Coconut Rice',
        price: 1400,
        itemInCart: false
    },
    {
        id: 5,
        img: 'cart-img/food1-removebg-preview.png',
        name: 'Abasha',
        price: 500,
        itemInCart: false
    },
    {
        id: 6,
        img: 'cart-img/food2-removebg-preview.png',
        name: 'Bitter Leaf soup',
        price: 800,
        itemInCart: false
    },
    {
        id: 7,
        img: 'cart-img/food5-removebg-preview.png',
        name: 'Jolly Rice',
        price: 1400,
        itemInCart: false
    },
];

var content = ''
data.forEach(item => {
    content += `
    <div class="item-container" id="0">
    <div class="card-item">
        <img src="${item.img}" alt="food" id="card-img">
        <p id="item-name">${item.name}</p>
        <i id="add-to-cart" class="fa fa-shopping-cart" onclick='addToCart(${item.id})'></i>
        <h3 id="item-price">Price : &#8358; ${item.price}</h3>
    </div>
    </div>
    
    `
})

document.getElementById('card').innerHTML = content


var content = ''
data.forEach(item => {
    content += `
    <div class="item-container" id="0">
    <div class="card-item">
        <img src="${item.img}" alt="food" id="card-img">
        <p id="item-name">${item.name}</p>
        <i id="add-to-cart" class="fa fa-shopping-cart" onclick='addToCart(${item.id})'></i>
        <h3 id="item-price">Price : &#8358; ${item.price}</h3>
    </div>
</div>
    
    `
})

document.getElementById('new').innerHTML = content

let cartList = [];   //Array to store cart lists
var i;

var addToCarts = document.querySelectorAll('#add-to-cart');
var cart = document.getElementById('cart');

cart.addEventListener('click', displayCart);  //click event to display cart


var carts = document.getElementById('carts')

// carts.addEventListener('click', () => addToCart(getId)); //click event to add items to cart from details page
var getId;
var home = document.getElementById('logo');
home.addEventListener('click', hideCart);  //click event to hide cart page and return to home page

//click event to dynamically created elements to remove items from cart list
document.addEventListener('click', function(e){
    if(e.target.id == 'remove'){
        var itemId = e.target.parentNode.id;
        removeFromCart(itemId);
    }
});



//click event to add items to cart from home page cart icon
addToCarts.forEach(val => val.addEventListener('click', () => addToCart(val.parentNode.id)));

//detail function
function handleDetail(){
    detailsPage.style.display = 'block';
    getId = this.parentNode.id;
    detailImg.src = data[getId].img;
    detailsTitle.innerHTML = data[getId].name;
    detailPrice.innerHTML = 'price : $ ' + data[getId].price;
}

//function to display cart page
function displayCart(){
    document.getElementById('main').style.display = 'none';
    // document.getElementById('details-page').style.display = 'none';
    document.getElementById('cart-container').style.display = 'block';

    if(cartList.length == 0 ){
        document.getElementById('cart-with-items').style.display = 'none';
        document.getElementById('empty-cart').style.display = 'block';
    }
    else{
        document.getElementById('cart-with-items').style.display = 'block';
        document.getElementById('empty-cart').style.display = 'none';
    }
}

//add items to the cart
function addToCart(id){
    if(!data[id].itemInCart){
        cartList = [...cartList,data[id]];
        addItem();

        alert('Item added to your cart');
    }
    else{
        alert('Your item is already there');
    }
    data[id].itemInCart = true;
}


var totalAmount;
var totalItems;

//add item to the cart
function addItem(){
    totalAmount = 0;
    totalItems =  0;

    var clrNode = document.getElementById('item-body');
    clrNode.innerHTML = '';
    cartList.map((cart) => {
        var cartCont = document .getElementById('item-body');
        totalAmount = totalAmount + cart.price;
        totalItems = totalItems + 1;


        var tempCart = document.createElement('div');
        tempCart.setAttribute('class', 'cart-list');
        tempCart.setAttribute('id', cart.id);

        var listImg = document.createElement('img');
        listImg.setAttribute('id', 'list-img');
        listImg.src = cart.img;
        tempCart.appendChild(listImg);


        var listName = document.createElement('h3');
        listName.setAttribute('class', 'list-name');
        listName.innerHTML = cart.name;
        tempCart.appendChild(listName);


        var listQuantity = document.createElement('h3');
        listQuantity.setAttribute('class', 'quantity');
        listQuantity.innerHTML = '<div class="quantity" style="display: flex;"><button class="btn minus-btn disabled">-</button><input style="width:30px; text-align: center; border: none;" type="text" id="quantity" value="1" /><button class="btn plus-btn">+</button></div>'
        tempCart.appendChild(listQuantity);

// Updating quantity number when input number is been increase by 1
        var price = document.getElementById('item-price');
        

        var listPay = document.createElement('h3');
        listPay.setAttribute('class', 'pay');
        listPay.innerHTML = cart.price;
        tempCart.appendChild(listPay);


        var listTrash = document.createElement('i');
        listTrash.setAttribute('class', 'fa fa-trash');
        listTrash.setAttribute('id', 'remove');
        tempCart.appendChild(listTrash);


        cartCont.appendChild(tempCart);
    })
    document.getElementById('total-amount').innerHTML = 'Total Amount : &#8358; ' + totalAmount;
    document.getElementById('total-items').innerHTML = 'Total Items : ' + totalItems;
    document.getElementById('total').style.display = 'block';
    
    // setting default attribute to disabled of minus value
    document.querySelector('.minus-btn').setAttribute('disabled', 'disabled');
    //  taking value to increment and decrement input value
    var valueCount

    // plus button
    document.querySelector('.plus-btn').addEventListener('click', function(){
        // getting value of input
        valueCount = document.getElementById('quantity').value;

        // input value increment by 1
        valueCount++;
        
        // setting increment input value
        document.getElementById('quantity').value = valueCount;
        if(valueCount > 1){
            document.querySelector('.minus-btn').removeAttribute('disabled');
            document.querySelector('.minus-btn').classList.remove('disabled');
        }
    })

     // Minus button
    document.querySelector('.minus-btn').addEventListener('click', function(){
        // getting value of input
        valueCount = document.getElementById('quantity').value;

        // input value increment by 1
        valueCount--;
        
        // setting increment input value
        document.getElementById('quantity').value = valueCount;
        if(valueCount == 1){
            document.querySelector('.minus-btn').setAttribute('disabled', 'disabled')
        }
    })
}

// hide your cart page
function hideCart(){
    document.getElementById('main').style.display = 'block';
    document.getElementById('cart-container').style.display = 'none';
}

// back to home page from details page
function refreshPage(){
    detailsPage.style.display = 'none'
}

// remove items from the cart
function removeFromCart(itemId){
    data[itemId].itemInCart = false;
    cartList = cartList.filter((list) => list.id != itemId);
    addItem();
    if(cartList.lenght == 0){
        document.getElementById('cart-with-items').style.display = 'none';
        document.getElementById('empty-cart').style.display = 'block';

    }
}

