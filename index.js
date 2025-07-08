let cart = [];

// LocalStorage থেকে কার্ট লোড করা
function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
}

// LocalStorage-এ কার্ট সংরক্ষণ
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// পরিমাণ বা ইউনিট চেঞ্জ হলে মোট দাম আপডেট
function updateTotalPrice(element) {
    const productDiv = element.closest('.product');
    const pricePerKg = parseFloat(productDiv.querySelector('.price').dataset.price);
    const quantity = parseFloat(productDiv.querySelector('.quantity-input').value) || 0;
    const unit = productDiv.querySelector('.unit-select').value;

    let totalPrice = 0;
    if (unit === "kg") {
        totalPrice = pricePerKg * quantity;
    } else if (unit === "gm") {
        totalPrice = pricePerKg * (quantity / 1000);
    }

    productDiv.querySelector('.total-price').textContent = totalPrice.toFixed(2);
}

// কার্টে যোগ করা
function addTocartWithQuantity(productName, btn) {
    const productDiv = btn.closest('.product');
    const pricePerKg = parseFloat(productDiv.querySelector('.price').dataset.price);
    const quantity = parseFloat(productDiv.querySelector('.quantity-input').value) || 1;
    const unit = productDiv.querySelector('.unit-select').value;

    let totalPrice = 0;
    if (unit === "kg") {
        totalPrice = pricePerKg * quantity;
    } else if (unit === "gm") {
        totalPrice = pricePerKg * (quantity / 1000);
    }

    // একই প্রোডাক্ট থাকলে quantity আপডেট
    const existingItem = cart.find(item => item.name === productName && item.unit === unit);
    if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.price += totalPrice;
        alert(`${productName} (${unit}) এর পরিমাণ আপডেট হয়েছে, নতুন পরিমাণ: ${existingItem.quantity}`);
    } else {
        cart.push({ name: productName, price: totalPrice, quantity: quantity, unit: unit });
        alert(`${productName} (${quantity} ${unit}) কার্টে যোগ হয়েছে! মোট: ${totalPrice.toFixed(2)} টাকা`);
    }

    saveCart();
}

// Buy Now
function buyNowWithQuantity(productName, btn) {
    addTocartWithQuantity(productName, btn);
    window.location.href = 'cart.html';
}

// সার্চ
document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const products = document.querySelectorAll('.product');
    
    products.forEach(product => {
        const productName = product.querySelector('h2').textContent.toLowerCase();
        if (productName.includes(query)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});

// লাইট/ডার্ক মোড
document.getElementById('modeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark');
    this.textContent = document.body.classList.contains('dark') ? "☀️" : "🌙";
});

// পেজ লোড হলে কার্ট লোড করা
loadCart();

// quantity এবং unit change হলে total price আপডেট
window.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const quantityInput = product.querySelector('.quantity-input');
        const unitSelect = product.querySelector('.unit-select');

        quantityInput.addEventListener('input', () => updateTotalPrice(quantityInput));
        unitSelect.addEventListener('change', () => updateTotalPrice(unitSelect));

        // Initial total price calculate
        updateTotalPrice(quantityInput);
    });
});
