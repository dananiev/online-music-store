if (document.readyState === 'loading') {
    document.addEventListener(DOMContentLoaded, ready);
} else {
    ready();
}


function ready() {
    let removeCartItemButtons = document.getElementsByClassName('btn-danger');

    for (i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    let quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener('click', quantityChanged);
    }

    let addToCartButtons = document.getElementsByClassName('shop-item-button');
    for (i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
}

// Purchase the selected item
function purchaseClicked() {
    alert('Thank you for your purchase!');
    let cartItems = document.querySelector('.cart-items')[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}


// removing items from the cart
function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}


// updating the quantity of the items in the cart
function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}


function addToCartClicked() {
    let button = event.target;
    let shopItem = button.parentElement.parentElement;
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;

    addItemToCart(title, price, imageSrc);
    updateCartTotal();
}


// Adding items to cart
function addItemToCart(title, price, imageSrc) {
    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    let cartItems = document.getElementsByClassName('cart-items')[0];
    let cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText === title) {
            alert('This item is already added to the cart!');
            return;
        }
    }
    let cartRowContents = `
        <div class='cart-item cart-column'>
            <img class='cart-item-image' src='${imageSrc}' width="100" height="100">
            <span class='cart-item-title'>${title}</span>
        </div>
        <span class='cart-price cart-column'>${price}</span>
        <div class='cart-quantity cart-column'>
            <input class='cart-quantity-input' type='number' value='1'>
            <button class='btn btn-danger' type='button'>REMOVE</button>
        </div>
    `;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('click', quantityChanged);
}


// update the total sum of the cart after adding and removing items
function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0];
    let cartRows = cartItemContainer.getElementsByClassName('cart-row');
    let total = 0;
    for (i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName('cart-price')[0];
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        let price = parseFloat(priceElement.innerText.replace('$', ''));
        let quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}
