// Product Section Logic
const decrementButton = document.querySelector('.decrement');
const incrementButton = document.querySelector('.increment');
const quantityDisplay = document.querySelector('.quantity');
const oldPriceDisplay = document.querySelector('.old-price');
const newPriceDisplay = document.querySelector('.new-price');
const oldPrice = 369.0;
const newPrice = 249.0;
let productQuantity = 1;

function updateProductQuantity() {
  quantityDisplay.textContent = productQuantity;
  oldPriceDisplay.textContent = `$${(oldPrice * productQuantity).toFixed(2)}`;
  newPriceDisplay.textContent = `$${(newPrice * productQuantity).toFixed(2)}`;
}

decrementButton.addEventListener('click', () => {
  if (productQuantity > 1) {
    productQuantity--;
    updateProductQuantity();
  }
});

incrementButton.addEventListener('click', () => {
  if (productQuantity < 10) {
    productQuantity++;
    updateProductQuantity();
  }
});

// Cart Drawer Logic
const cartIcon = document.getElementById('cartIcon');
const cartDrawer = document.getElementById('cartDrawer');
const cartBackdrop = document.getElementById('cartBackdrop');
const cartClose = document.getElementById('cartClose');
const cartDecrement = document.querySelector('.cart-decrement');
const cartIncrement = document.querySelector('.cart-increment');
const cartQuantity = document.querySelector('.cart-quantity');
const cartOldPrice = document.querySelector('.cart-old-price');
const cartNewPrice = document.querySelector('.cart-new-price');
const cartSubtotal = document.querySelector('.cart-subtotal');
const cartDelete = document.querySelector('.cart-delete');
const cartProduct = document.querySelector('.cart-product');
const emptyCartMessage = document.querySelector('.empty-cart-message');
const cartFooter = document.querySelector('.cart-footer');
const addToCartBtn = document.querySelector('.add-to-cart');
const cartBadge = document.getElementById('cartBadge');

let cartQuantityValue = 0;

function updateCartState() {
  if (cartQuantityValue <= 0) {
    cartProduct.style.display = 'none';
    emptyCartMessage.style.display = 'block';
    cartFooter.style.display = 'none';
  } else {
    cartProduct.style.display = 'flex';
    emptyCartMessage.style.display = 'none';
    cartFooter.style.display = 'block';
  }
}

function updateCartBadge() {
  if (cartQuantityValue > 0) {
    cartBadge.textContent = cartQuantityValue;
    cartBadge.style.display = 'flex';
  } else {
    cartBadge.style.display = 'none';
  }
}

function updateCartDrawer() {
  cartQuantity.textContent = cartQuantityValue;
  cartOldPrice.textContent = `$${(oldPrice * cartQuantityValue).toFixed(2)}`;
  cartNewPrice.textContent = `$${(newPrice * cartQuantityValue).toFixed(2)}`;
  cartSubtotal.textContent = `$${(newPrice * cartQuantityValue).toFixed(2)}`;
  updateCartState();
  saveCartToStorage();
  updateCartBadge();
}

function openCartDrawer() {
  cartDrawer.classList.add('open');
  cartBackdrop.classList.add('visible');
}

function closeCartDrawer() {
  cartDrawer.classList.remove('open');
  cartBackdrop.classList.remove('visible');
}

cartIcon.addEventListener('click', openCartDrawer);
cartClose.addEventListener('click', closeCartDrawer);
cartBackdrop.addEventListener('click', closeCartDrawer);

cartDecrement.addEventListener('click', () => {
  if (cartQuantityValue > 0) {
    cartQuantityValue--;
    updateCartDrawer();
  }
});

cartIncrement.addEventListener('click', () => {
  if (cartQuantityValue < 10) {
    cartQuantityValue++;
    updateCartDrawer();
  }
});

cartDelete.addEventListener('click', () => {
  cartQuantityValue = 0;
  updateCartDrawer();
});

addToCartBtn.addEventListener('click', () => {
  cartQuantityValue = productQuantity;
  updateCartDrawer();
  openCartDrawer();
});

// LocalStorage for Cart Only
function saveCartToStorage() {
  localStorage.setItem('cartQuantity', cartQuantityValue);
}

function loadCartFromStorage() {
  const stored = localStorage.getItem('cartQuantity');
  if (stored) {
    cartQuantityValue = Math.max(0, Math.min(10, parseInt(stored, 10)));
    updateCartDrawer();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  loadCartFromStorage();
  updateCartBadge();
});
