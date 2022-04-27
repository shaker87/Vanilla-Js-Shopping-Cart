let productsInCart = JSON.parse(localStorage.getItem('shoppingCart'));
if (!productsInCart) {
    productsInCart = [];

}

let productsInWishList = JSON.parse(localStorage.getItem('wishList'));
if (!productsInWishList) {
    productsInWishList = [];

}

const wishProductCount = function () {
    return productsInWishList.length

}
const cartProductCount = function () {
    return productsInCart.length

}

let viewDetailsData = JSON.parse(localStorage.getItem('viewData'));

const products = document.querySelectorAll('.product');
const parentElement = document.querySelector('#shp__cart__wrap');
const totalPrice = document.querySelector('#total__price');
const counting = document.querySelector('.wish-count')
const viewCount = document.querySelector('.wish-count')
const showTotal = document.querySelector('.total');
const productModal = document.querySelector('#modal-content');
const buyNowBtn = document.querySelector('.buy__now__btn')
const increment = document.querySelector('.increment')
const decrement = document.querySelector('.decrement')
const quantityValue = document.querySelector('.quantityValue')
const proTitle = document.querySelector('#pro__detl_title')
const newPrice = document.querySelector('#newPrice')
const product__details__container = document.querySelector('.product__details__container')
const totalInDetails = document.querySelector('.totalInDetails')
const cartPrice = document.querySelector('#cartPrice')
const removeItem = document.querySelector('#remove__item')
const removeAllClass = document.querySelectorAll('.remove__btn')


const viewCart = document.querySelectorAll('.viewCart')

const countTheSumPrice = function () { // 4
    let sum = 0;
    productsInCart.forEach(item => {
        sum += item.price;
    });
    return sum;
}



const updateShoppingCartHTML = function () {

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
        totalPrice.innerHTML = '$' + countTheSumPrice();
        showTotal.innerHTML = cartProductCount();;
        counting.innerHTML = wishProductCount();
        viewCount.innerHTML = wishProductCount();

    }
    else {
        parentElement.innerHTML = `<div style="text-align:center">
        <h4 class="empty" style="margin-bottom:30px">Your shopping cart is empty</h4>
        </div>`;

        document.querySelector('.shp__checkout').classList.add('hidden');
        totalPrice.innerHTML = '$0.00';
        showTotal.innerHTML = cartProductCount();;
        counting.innerHTML = wishProductCount();
        viewCount.innerHTML = wishProductCount();
    }
}

const updateWishListHTML = function () {  // 3

    localStorage.setItem('wishList', JSON.stringify(productsInWishList));

    if (productsInWishList.length > 0) {
        let result = productsInWishList.map(product => {

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

        counting.innerHTML = wishProductCount()
        viewCount.innerHTML = wishProductCount()

    }
    else {
        // parentElement.innerHTML = `<div style="text-align:center">
        // <h4 class="empty" style="margin-bottom:30px">Your shopping cart is empty</h4>
        // </div>`;

        // document.querySelector('.shp__checkout').classList.add('hidden');
        // totalPrice.innerHTML = '$0.00';
        // showTotal.innerHTML = '$0.00';
        // // cartPrice.innerHTML = '$0.00';
    }
}




viewCart.forEach(item => {   // 1
    item.addEventListener('click', (e) => {
        setTimeout(() => {
            window.location.href = "../cart.html"
            updateViewCartData()
        }, 1000)
    })

})
function updateProductsInWishList(product) { // 2
    console.log('productInWishListFunc :>> ', product);
    for (let i = 0; i < productsInWishList.length; i++) {
        if (productsInWishList[i].id == product.id) {
            productsInWishList[i].count += product.count;
            productsInWishList[i].price = productsInWishList[i].basePrice * productsInWishList[i].count;
            return;
        }
    }
    productsInWishList.push(product);
    counting.innerHTML = wishProductCount()
    viewCount.innerHTML = wishProductCount()

}


function updateProductsInCart(product) { // 2
    console.log('product :>> ', product);
    for (let i = 0; i < productsInCart.length; i++) {
        if (productsInCart[i].id == product.id) {
            productsInCart[i].count += product.count;
            productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
            return;
        }
    }
    productsInCart.push(product);
}


products.forEach(item => {   // 1
    item.addEventListener('click', (e) => {
        console.log('e', e)
        if (e.target.classList.contains('ti-shopping-cart')) {
            const productID = e.target.dataset.productId;
            // console.log('productID', productID)
            const productName = item.querySelector('.product_name').innerHTML;
            const productPrice = item.querySelector('.base__price').innerHTML;
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
            updateShoppingCartHTML();

        }
        if (e.target.classList.contains('ti-heart')) {
            const productID = e.target.dataset.productId;
            console.log('productID', productID)
            const productName = item.querySelector('.product_name').innerHTML;
            const productPrice = item.querySelector('.base__price').innerHTML;
            const productImage = item.querySelector('img').src;
            let product = {
                name: productName,
                image: productImage,
                id: productID,
                count: 1,
                price: +productPrice,
                basePrice: +productPrice,
            }

            console.log('wishProduct :>> ', product);
            updateProductsInWishList(product)
            updateWishListHTML()


            // setTimeout(() => {
            //     window.location.href = "../wishlist.html"
            //     // updateViewCartData()
            // }, 1000)
        }


        if (e.target.classList.contains('ti-plus')) {
            console.log('click :>> ',);
            const productID = e.target.dataset.productId;
            const productName = item.querySelector('.product_name').innerHTML;
            const productPrice = item.querySelector('.base__price').innerHTML;
            const productImage = item.querySelector('img').src;
            let product = {
                name: productName,
                image: productImage,
                id: productID,
                count: 1,
                price: +productPrice,
                basePrice: +productPrice,
            }

            productModal.innerHTML = `            
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body">
                    <div class="modal-product">
                  
                        <div class="product-images">
                            <div class="main-image images">
                                <img alt="big images" src=${product.image}>
                            </div>
                        </div>
                        
                        <div class="product-info">
                            <h1>${product.name}</h1>
                            <div class="rating__and__review">
                                <ul class="rating">
                                    <li><span class="ti-star"></span></li>
                                    <li><span class="ti-star"></span></li>
                                    <li><span class="ti-star"></span></li>
                                    <li><span class="ti-star"></span></li>
                                    <li><span class="ti-star"></span></li>
                                </ul>
                                <div class="review">
                                    <a href="#">4 customer reviews</a>
                                </div>
                            </div>
                            <div class="price-box-3">
                                <div class="s-price-box">
                                    <span class="new-price">${product.basePrice}</span>
                                    <span class="old-price">$45.00</span>
                                </div>
                            </div>
                            <div class="quick-desc">
                                Designed for simplicity and made from high quality materials. Its sleek geometry and
                                material combinations creates a modern look.
                            </div>
                            <div class="select__color">
                                <h2>Select color</h2>
                                <ul class="color__list">
                                    <li class="red"><a title="Red" href="#">Red</a></li>
                                    <li class="gold"><a title="Gold" href="#">Gold</a></li>
                                    <li class="orange"><a title="Orange" href="#">Orange</a></li>
                                    <li class="orange"><a title="Orange" href="#">Orange</a></li>
                                </ul>
                            </div>
                            <div class="select__size">
                                <h2>Select size</h2>
                                <ul class="color__list">
                                    <li class="l__size"><a title="L" href="#">L</a></li>
                                    <li class="m__size"><a title="M" href="#">M</a></li>
                                    <li class="s__size"><a title="S" href="#">S</a></li>
                                    <li class="xl__size"><a title="XL" href="#">XL</a></li>
                                    <li class="xxl__size"><a title="XXL" href="#">XXL</a></li>
                                </ul>
                            </div>
                            <div class="social-sharing">
                                <div class="widget widget_socialsharing_widget">
                                    <h3 class="widget-title-modal">Share this product</h3>
                                    <ul class="social-icons">
                                        <li><a target="_blank" title="rss" href="#" class="rss social-icon"><i
                                                    class="zmdi zmdi-rss"></i></a></li>
                                        <li><a target="_blank" title="Linkedin" href="#"
                                                class="linkedin social-icon"><i class="zmdi zmdi-linkedin"></i></a>
                                        </li>
                                        <li><a target="_blank" title="Pinterest" href="#"
                                                class="pinterest social-icon"><i
                                                    class="zmdi zmdi-pinterest"></i></a></li>
                                        <li><a target="_blank" title="Tumblr" href="#" class="tumblr social-icon"><i
                                                    class="zmdi zmdi-tumblr"></i></a></li>
                                        <li><a target="_blank" title="Pinterest" href="#"
                                                class="pinterest social-icon"><i
                                                    class="zmdi zmdi-pinterest"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="addtocart-btn">
                                <a href="#"  data-product-id=${product.id}>Add to cart</a>
                            </div>
                        </div>
                    </div>
                </div>
                `
            const addtocartBtn = document.querySelector('.addtocart-btn')

            addtocartBtn.addEventListener('click', function () {
                updateProductsInCart(product);
                updateShoppingCartHTML();
            })
        }

        if (e.target.classList.contains('product_name')) {
            const productID = e.target.dataset.productId;
            console.log('clicked :>> ', productID);
            const productName = item.querySelector('.product_name').innerHTML;
            const productPrice = item.querySelector('.base__price').innerHTML;
            const productImage = item.querySelector('img').src;
            let product = {
                name: productName,
                image: productImage,
                id: productID,
                count: 1,
                price: +productPrice,
                basePrice: +productPrice,
            }

            localStorage.setItem('viewData', JSON.stringify(product));

            let detailsData = JSON.parse(localStorage.getItem('viewData'));
            console.log('detailsData :>> ', detailsData);
            if (detailsData) {
                setTimeout(() => {
                    window.location.href = "../product-details.html"
                }, 500)
            }
        }
    });

});


setTimeout(() => {
    if (viewDetailsData) {
        proTitle.innerHTML = viewDetailsData.name;
        newPrice.innerHTML = viewDetailsData.price
    }
}, 500)




let count = 1
increment.addEventListener('click', function () {
    count += 1

    quantityValue.innerHTML = count
})
decrement.addEventListener('click', function () {
    count -= 1

    quantityValue.innerHTML = count
})

buyNowBtn.addEventListener('click', (e) => {
    console.log('click', e)

    const productID = viewDetailsData.id;
    const productName = viewDetailsData.name;
    const productPrice = viewDetailsData.price;
    const productImage = viewDetailsData.image;
    let product = {
        name: productName,
        image: productImage,
        id: productID,
        count: count,
        price: +productPrice,
        basePrice: +productPrice,
    }
    // console.log('product :>> ', product);

    updateProductsInCart(product);
    updateShoppingCartHTML();

})




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


updateShoppingCartHTML();
