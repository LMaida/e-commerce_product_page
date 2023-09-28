const btnShoppingCart = document.querySelector(".btn-shopping-cart");
const cartPopUp = document.querySelector(".cart-popup");
const openMenu = document.querySelector(".ico-menu");
const hamburgerNavigation = document.querySelector(".hamburger-navigation");
const closeMenu = document.querySelector(".ico-close");
const quantity = document.querySelector(".quantity");
const btnDecrease = document.querySelector(".btn-decrease");
const btnIncrease = document.querySelector(".btn-increase");
const btnCart = document.querySelector(".btn-cart");
const productsInCart = document.querySelector(".product-quantity");
const images = document.querySelectorAll(".slider-image");
const activeImage = document.querySelector(".slider-image-active");
const pageGrid = document.querySelector(".page-grid");
const previousImage = document.querySelector(".ico-previous");
const nextImage = document.querySelector(".ico-next");
const navLinks = document.querySelectorAll(".link");

const product = {
    productName : "Fall Limited Adition Sneakers",
    productImage : "image-product-1-thumbnail.jpg",
    productPrice : 125,
    productDiscount : 50,
    oldPrice : 250
}

slideImages(images, activeImage)

btnShoppingCart.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault()

    cartPopUp.classList.toggle("open-close-cart");

    if (quantity.innerHTML < 1) {
            emptyShopingCart()
    }
})

openMenu.addEventListener("click", (e) => {

    hamburgerNavigation.classList.add("active");
    document.body.style.overflow = "hidden";
})

closeMenu.addEventListener("click", () => {
    hamburgerNavigation.classList.remove("active");
    document.body.style.overflow = "visible";
});

btnDecrease.addEventListener("click", () => {

    if (quantity.innerHTML != 0) {
        quantity.innerHTML = Number(quantity.innerHTML) - 1;
        changeProductQuantityInCart()
    }

     if (quantity.innerHTML == 0) {
        btnCart.classList.remove("active");
        emptyShopingCart()
    }
})

btnIncrease.addEventListener("click", () => {
    quantity.innerHTML = Number(quantity.innerHTML)  + 1;
    btnCart.classList.add("active");

    if (quantity.innerHTML > 0) {
        changeProductQuantityInCart();
    }
})

function drawProductCart() {

const productQuantity = Number(quantity.innerHTML);
const productPrice = product.productPrice * productQuantity;

        cartPopUp.innerHTML = `
            <span class="popup-headline">Cart</span>
            <div class="popup-content">
                <div class="cart-item">
                    <img src="../../images/product/${product.productImage}" class="popup-img">
                    <div class="product-info">
                        <span class="product-name">${product.productName}d</span>
                        <div class="product-price cart-price">
                            <span class="product-quantity">$ ${product.productPrice}.00 x ${productQuantity}</span>
                            <span class="product-total-price">$${productPrice}.00</span>
                        </div>
                    </div>
                    <button class="btn-delete-item">
                        <svg width="14" height="16"><defs><path class="ico-delete" d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg>
                    </button>
                </div>
            </div>
            <button class="btn-large btn-delete">Checkout</button>
        `
}

document.addEventListener("click", (e) => {

    if(e.target.parentElement.parentElement.classList.contains("btn-delete-item")) {
        emptyShopingCart();
        quantity.innerHTML = 0;
        btnCart.classList.remove("active");
        console.log(e.target)
    }
})

btnCart.addEventListener("click", () => {

    if (quantity.innerHTML > 1) {
        drawProductCart();
        productsInCart.innerHTML = quantity.innerHTML;
        productsInCart.classList.add("product-added");
    }
})

function emptyShopingCart () {
    cartPopUp.innerHTML = `
        <span class="popup-headline">Cart</span>
        <div class="popup-content-empty">
            <p class="empty-cart">Your Cart is Empty</p>
        </div>
    `

    productsInCart.classList.remove("product-added")
}

function changeProductQuantityInCart () {

    const cartPrice = document.querySelector(".cart-price");
    const productQuantity = Number(quantity.innerHTML);
    const productPrice = product.productPrice * productQuantity;

        if(cartPrice) {
            cartPrice.innerHTML = `
                <span class="product-quantity">$ ${product.productPrice}.00 x ${productQuantity}</span>
                <span class="product-total-price">$${productPrice}.00</span>
            `
    }

    if (productsInCart) {
        productsInCart.innerHTML = quantity.innerHTML;
    }
}

function displayImageGallery () {
    const overlay = document.querySelector(".overlay");
    const overlayImages = document.querySelectorAll(".overlay-slider-image");
    const overlayActiveImage = document.querySelector(".overlay-slider-image-active");

    overlayActiveImage.src = activeImage.src;
    overlayActiveImage.id = activeImage.id;

    checkActiveImage();

    if(overlay.classList.contains("close")) {
        overlay.classList.remove("close")
         overlay.classList.add("open")
    } else {
        overlay.classList.add("open")
    }
    document.body.style.overflow = "hidden";

    slideImages(overlayImages, overlayActiveImage);

}

activeImage.addEventListener("click", displayImageGallery)

function slideImages(images, activeImage) {
    images.forEach(image => {
        image.addEventListener("click", () => {
            images.forEach(image => image.classList.remove("active"));
            image.classList.add("active");
            const imageID = image.id
            activeImage.src = `../../images/product/image-product-${imageID}.jpg`;
            activeImage.id = imageID;
        })
    })
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("image-close")) {
        const overlay = document.querySelector(".overlay");
        overlay.classList.add("close");
        document.body.style.overflow = "visible"
    }
})

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("ico-next-overlay")) {
        const overlayImages = document.querySelectorAll(".overlay-slider-image");
        const overlayActiveImage = document.querySelector(".overlay-slider-image-active");

        let imageID = overlayActiveImage.id;
        console.log(imageID)
        imageID = Number(imageID) + 1;
        if (imageID <= 4) {
            overlayActiveImage.src =  `../../images/product/image-product-${imageID}.jpg`;
            overlayActiveImage.id = imageID;
            checkActiveImage()
        }
    }
})

nextImage.addEventListener("click", () => {

    let imageID = activeImage.id;
    imageID = Number(imageID) + 1;
    if (imageID <= 4) {
        activeImage.src =  `../../images/product/image-product-${imageID}.jpg`;
        activeImage.id = imageID;
        checkActiveImage()
    }
})

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("ico-previous-overlay")) {
        const overlayImages = document.querySelectorAll(".overlay-slider-image");
        const overlayActiveImage = document.querySelector(".overlay-slider-image-active");

        let imageID = overlayActiveImage.id;
        imageID = Number(imageID) - 1;
        if (imageID >= 1) {
            overlayActiveImage.src =  `../../images/product/image-product-${imageID}.jpg`;
            overlayActiveImage.id = imageID;
            checkActiveImage()
        }
    }
})

previousImage.addEventListener("click", () => {

    let imageID = activeImage.id;
    imageID = Number(imageID) - 1;
    if (imageID >= 1) {
        activeImage.src =  `../../images/product/image-product-${imageID}.jpg`;
        activeImage.id = imageID;
        checkActiveImage()
    }
})

function checkActiveImage () {
    const overlayImages = document.querySelectorAll(".overlay-slider-image");
    const overlayActiveImage = document.querySelector(".overlay-slider-image-active");

    overlayImages.forEach(image => {
        if (image.id == overlayActiveImage.id) {
            overlayImages.forEach(image => image.classList.remove("active"));
            image.classList.add("active");
            overlayActiveImage.id = image.id
        }
    })
}

function closePopup(e) {
    if (!cartPopUp.contains(e.target) && !e.target.classList.contains("btn-increase") &&  !e.target.classList.contains("btn-decrease")  && !e.target.parentElement.parentElement.classList.contains("btn-delete-item")) {
        cartPopUp.classList.remove("open-close-cart");
    }
}

document.addEventListener("click", (e) => closePopup(e))

window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 1030px)").matches) {
        hamburgerNavigation.classList.remove("active")
    }

    if (window.matchMedia("(max-width: 840px)").matches) {
        const overlay = document.querySelector(".overlay");
        overlay.classList.remove("open");
        overlay.classList.add("close");
        activeImage.removeEventListener("click", displayImageGallery)
        document.body.style.overflow = "visible"
    }

    
    if (window.innerWidth > 840) {
        activeImage.addEventListener("click", displayImageGallery)
    }
})