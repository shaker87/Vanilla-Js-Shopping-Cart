let productsInCart = JSON.parse(localStorage.getItem('shoppingCart'));
if (!productsInCart) {
    productsInCart = [];

}


let productsInWishList = JSON.parse(localStorage.getItem('wishList'));
if (!productsInWishList) {
    productsInWishList = [];

}

const tbody = document.querySelector('.tbody')
const removeItem = document.querySelector('.product-remove')
const wishlistContent = document.querySelectorAll('.wishlist-table');
const addToCart = document.querySelector('.product-add-to-cart')
const parentElement = document.querySelector('#shp__cart__wrap');
const emptyArea = document.querySelector('#empty-area')

const showTotal = document.querySelector('.total')
const totalPrice = document.querySelector('#total__price')
const count = document.querySelector('.wish-count')



const wishProductCount = function(){
    return productsInWishList.length

}
const cartProductCount = function () {
    return productsInCart.length

}




const countTheSumPrice = function () { // 4
    let sum = 0;
    productsInCart.forEach(item => {
        sum += item.price;
    });
    return sum;
}



const updateViewWishListData = function () {
    localStorage.setItem('wishList', JSON.stringify(productsInWishList));


    if (productsInWishList.length > 0) {
        let result = productsInWishList.map(product => {
            // console.log('product.id :>> ', product.id);
            return `

          
            <tr>
            <td class="product-remove"><a class="product-remove-item" data-product-id=${product.id}>×</a></td>
            <td class="product-thumbnail"><a href="#" ><img src=${product.image} alt="" /></a></td>
            <td class="product-name"><a href="#" class="item-name">${product.name}</a></td>
            <td class="product-price"><span class="amount">${product.basePrice}</span></td>
            <td class="product-stock-status"><span class="wishlist-in-stock">In Stock</span></td>
            <td class="product-add-to-cart" ><a class="add-to-cart" data-product-id=${product.id}> Add to Cart</a></td>
        </tr>
            
              `
        });
        tbody.innerHTML = result.join('');
        // amount.innerHTML = '$' + countTheSumPrice();
        // totalAmount.innerHTML = '$' + countTheSumPrice();
        showTotal.innerHTML = cartProductCount();;
        totalPrice.innerHTML = '$' + countTheSumPrice();
        count.innerHTML = productCount();



    }
    else {
        emptyArea.innerHTML = `<div style="text-align:center">
        <h4 class="empty" style="margin-bottom:30px">Your wish list is empty</h4>
        <a href="index.html" style="border:1px solid #000; padding:5px">Go To Home</a>
        </div>`;
    }
}

const updateShoppingCartHTML = function () {  // 3
  
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
        count.innerHTML = productCount();
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
        count.innerHTML = productCount();
        
    }
}

function updateProductsInCart(product) { // 2
    console.log('productAddInCartFromWish :>> ', product);
    for (let i = 0; i < productsInCart.length; i++) {
        if (productsInCart[i].id == product.id) {
            productsInCart[i].count += product.count;
            productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
            return;
        }
    }
    productsInCart.push(product);

}




wishlistContent.forEach(item => {   // 1
    item.addEventListener('click', (e) => {
        const productRemove = e.target.classList.contains('product-remove-item')
        const addToCart = e.target.classList.contains('add-to-cart')
     
        if (e.target.classList.contains('add-to-cart')) {
            console.log('object :>> ', e.target.classList.contains('add-to-cart'));
            const productID = e.target.dataset.productId;
            console.log('productID', productID)
            const productName = item.querySelector('.item-name').innerHTML;
            const productPrice = item.querySelector('.amount').innerHTML;
            const productImage = item.querySelector('img').src;
            let product = {
                name: productName,
                image: productImage,
                id: productID,
                count: 1,
                price: +productPrice,
                basePrice: +productPrice,
            }

            updateProductsInCart(product);
            updateShoppingCartHTML()
            updateViewWishListData()
        }

        if (productRemove || addToCart) {
            updateViewWishListData()
            updateShoppingCartHTML();

            for (let i = 0; i < productsInWishList.length; i++) {
                console.log('productsInWishList[i] :>> ', productsInWishList[i]);
                let id = e.target.dataset.productId
                console.log('id :>> ', id);
                if (productsInWishList[i].id == e.target.dataset.productId) {
                    if (productRemove || addToCart) {
                        console.log('productRemove :>> ', productRemove);
                        productsInWishList.splice(i, 1);
                    }

                }
               
            }
            updateShoppingCartHTML()
            updateViewWishListData()

        }

    });
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
    }
});

updateViewWishListData()
updateShoppingCartHTML()