let cartCount = 0;
let cartTotal = 0;
let cartItems = [];
let totalPoints = 0;
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartPopup = document.getElementById('cart-popup');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCountElement = document.getElementById('cart-count');
const cartToggle = document.getElementById('cart-toggle');
const buyButton = document.getElementById('buy-button');
const pointsCountElement = document.querySelector('.points-count');

document.getElementById('buy-button').addEventListener('click', function() {
    window.location.href = 'inicioo.html'; 
});

function calculatePoints(price) {
    if (price >= 1500) {
        return 400;
    } else if (price >= 900) {
        return 250;
    } else if (price >= 600) {
        return 150;
    } else if (price >= 400) {
        return 120;
    } else if (price >= 300) {
        return 100;
    } else if (price >= 180) {
        return 70;
 
    } else {
        return 50;
    }
}

cartToggle.addEventListener('click', () => {
    cartPopup.style.display = cartPopup.style.display === 'none' ? 'block' : 'none';
});

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const service = button.getAttribute('data-service');
        const price = parseInt(button.getAttribute('data-price'));

        const item = {
            service: service,
            price: price
        };

        cartItems.push(item);
        cartCount++;
        cartTotal += price;

        cartCountElement.textContent = cartCount;

        updateCart();
    });
});

function updateCart() {
    cartItemsContainer.innerHTML = '';
    cartItems.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.service} - $${item.price}</p>
            <span class="trash-icon" data-index="${index}">🗑️</span>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    cartTotalElement.textContent = cartTotal;

    const trashIcons = document.querySelectorAll('.trash-icon');
    trashIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const itemIndex = icon.getAttribute('data-index');
            removeItem(itemIndex);
        });
    });
}

function removeItem(index) {
    cartTotal -= cartItems[index].price;
    cartItems.splice(index, 1);
    cartCount--;
    cartCountElement.textContent = cartCount;
    updateCart();
}

buyButton.addEventListener('click', () => {
    if (cartCount > 0) {
        cartItems.forEach(item => {
            totalPoints += calculatePoints(item.price);
        });

        pointsCountElement.textContent = totalPoints;
        alert(`Compra realizada. Total de puntos acumulados: ${totalPoints}`);
        
        cartItems = [];
        cartCount = 0;
        cartTotal = 0;
        cartCountElement.textContent = cartCount;
        cartTotalElement.textContent = cartTotal;
        updateCart();
    } else {
        alert("Tu carrito está vacío.");
    }
});

