let productsInCart = JSON.parse(localStorage.getItem('shoppingCart'));
if (!productsInCart) {
    productsInCart = [];

}


const tbody = document.querySelector('.tbody')
const cartProductList = document.querySelector('#cartProductList')
const increment = document.querySelector('.increment')
const decrement = document.querySelector('.decrement')
const removeItem = document.querySelector('.product-remove')
const parentElement = document.querySelector('#shp__cart__wrap');
const showTotal = document.querySelector('.total');
const removeAllProducts = document.querySelector('.removeAllProducts')
const amount = document.querySelector('.amount');
const totalAmount = document.querySelector('.total-amount');
const totalPrice = document.querySelector('#total__price');


console.log('productsInCart :>> ', productsInCart);

const countTheSumPrice = function () { // 4
    let sum = 0;
    productsInCart.forEach(item => {
        sum += item.price;
    });
    return sum;
}

const cartProductCount = function () {
    return productsInCart.length

}

function updateProductsInCart(product) { // 2
    updateViewCartData()
    updateShoppingCartHTML();
    console.log('product :>> ', product);
    for (let i = 0; i < productsInCart.length; i++) {
        if (productsInCart[i].id == product.id) {
            productsInCart[i].count += 1;
            productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
            return;
        }
    }
    productsInCart.push(product);

}

const updateViewCartData = function () {
    localStorage.setItem('shoppingCart', JSON.stringify(productsInCart));


    if (productsInCart.length > 0) {
        let result = productsInCart.map(product => {
            return `
            <tr>
            <td class="product-thumbnail"><a href="#"><img src=${product.image} alt="product img" /></a></td>
            <td class="product-name"><a href="#">${product.name}</a></td>
            <td class="product-price"><span class="amount">${product.basePrice}</span></td>
            <td class="product-quantity"><span> <button class="decrement" data-product-id=${product.id} style="border: 1px solid gray; padding: 0px 5px;"> - </button>
            <span class="quantityValue">${product.count}</span>
            <button class="increment" data-product-id=${product.id} style="border: 1px solid gray; padding: 0px 5px;"> + </button></span></td>
            <td class="product-subtotal">${product.basePrice * product.count}</td>
            <td class="product-remove" data-product-id=${product.id}>X</td>
        </tr>
              `
        });
        tbody.innerHTML = result.join('');
        amount.innerHTML = '$' + countTheSumPrice();
        totalAmount.innerHTML = '$' + countTheSumPrice();
        showTotal.innerHTML = cartProductCount();
        totalPrice.innerHTML = '$' + countTheSumPrice();

    }
    else {
        cartProductList.innerHTML = `<div style="text-align:center">
        <h4 class="empty" style="margin-bottom:30px">Your shopping cart is empty</h4>
        <a href="index.html" style="border:1px solid #000; padding:5px">Go To Home</a>
        </div>`;
    }
}

const updateShoppingCartHTML = function () {  // 3
    
    console.log('clicked in delete :>> ');
    localStorage.setItem('shoppingCart', JSON.stringify(productsInCart));

    if (productsInCart.length > 0) {
        let result = productsInCart.map(product => {
            return `
                <div class="shp__single__product">
                    <div class="shp__pro__thumb">
                        <a href="#">
                            <img src=${product.image} alt="product images">
                        </a>
                    </div>
                    <div class="shp__pro__details">
                        <h2><a href="product-details.html">${product.name}</a></h2>
                        <span class="quantity">QTY: ${product.count}</span>
                        <span class="shp__price">$${product.price}</span>
                    </div>
                    <div class="remove__btn">
                        <a href="#" title="Remove this item"><i class="zmdi zmdi-close" id="remove__item" data-id=${product.id}></i></a>
                    </div>
                </div>`
        });
        parentElement.innerHTML = result.join('');
        document.querySelector('.shp__checkout').classList.remove('hidden');
        // document.querySelector('.empty').classList.add('empty__hide')
        totalPrice.innerHTML = '$' + countTheSumPrice();
        showTotal.innerHTML = cartProductCount();
        totalPrice.innerHTML = '$' + countTheSumPrice();
        // totalInDetails.innerHTML = '$' + countTheSumPrice();
        // cartPrice.innerHTML = '$' + countTheSumPrice();

    }
    else {
        parentElement.innerHTML = `<div style="text-align:center">
        <h4 class="empty" style="margin-bottom:30px">Your shopping cart is empty</h4>
        </div>`;

        document.querySelector('.shp__checkout').classList.add('hidden');
        totalPrice.innerHTML = '$0.00';
        showTotal.innerHTML = cartProductCount();
        // cartPrice.innerHTML = '$0.00';
    }
}


cartProductList.addEventListener('click', (e) => { // Last
    const isPlusButton = e.target.classList.contains('increment');
    const isMinusButton = e.target.classList.contains('decrement');
    const removeAll = e.target.classList.contains('removeAllProducts');
    const productRemove = e.target.classList.contains('product-remove')

    if (removeAll) {
        productsInCart.splice(0,productsInCart.length)
        localStorage.setItem('shoppingCart', JSON.stringify(productsInCart));
        cartProductList.innerHTML = `<div style="text-align:center">
        <h4 class="empty" style="margin-bottom:30px">Your shopping cart is empty</h4>
        <a href="index.html" style="border:1px solid #000; padding:5px">Go To Home</a>
        </div>`
        updateShoppingCartHTML()
    }
    if (productRemove) {
        updateViewCartData()
        updateShoppingCartHTML();

        for (let i = 0; i < productsInCart.length; i++) {
            console.log('productsInCart[i] :>> ', productsInCart[i]);
            let id = e.target.dataset.productId
            console.log('id :>> ', id);
            if (productsInCart[i].id == e.target.dataset.productId) {
                if (productRemove) {
                    console.log('productRemove :>> ', productRemove);
                    productsInCart.splice(i, 1);
                }

                //productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;

            }
            // updateViewCartData()
        }
        updateViewCartData()
        updateShoppingCartHTML();

    }

    if (isPlusButton || isMinusButton) {
        for (let i = 0; i < productsInCart.length; i++) {
            console.log('productsInCart[i] :>> ', productsInCart[i]);
            let id = e.target.dataset.productId
            console.log('id :>> ', id);
            if (productsInCart[i].id == e.target.dataset.productId) {
                if (isPlusButton) {
                    productsInCart[i].count += 1
                }
                else if (isMinusButton) {
                    productsInCart[i].count -= 1
                    updateViewCartData()
                    updateShoppingCartHTML();
                }
                productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;

            }
            if (productsInCart[i].count <= 0) {
                productsInCart.splice(i, 1);
            }
        }
        updateViewCartData()
        updateShoppingCartHTML();
    }
});
parentElement.addEventListener('click', (e) => { // Last
    const isPlusButton = e.target.classList.contains('button-plus');
    const isMinusButton = e.target.classList.contains('zmdi-close');
    if (isPlusButton || isMinusButton) {
        for (let i = 0; i < productsInCart.length; i++) {
            if (productsInCart[i].id == e.target.dataset.id) {
                if (isPlusButton) {
                    productsInCart[i].count += 1
                }
                else if (isMinusButton) {
                    productsInCart[i].count -= 1
                }
                productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;

            }
            if (productsInCart[i].count <= 0) {
                productsInCart.splice(i, 1);
            }
        }
        updateShoppingCartHTML();
        updateViewCartData()
    }
});


updateViewCartData()
updateShoppingCartHTML();
