// কার্ট লোড
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsDiv = document.getElementById('cartItems');
    const totalPriceSpan = document.getElementById('totalPrice');

    let total = 0;
    cartItemsDiv.innerHTML = '';

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<h2>আপনার কার্ট খালি!</h2>';
        totalPriceSpan.textContent = '৳ ০';
        return;
    }

    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <span>${item.name}</span>
            <span>৳${item.price}</span>
            <button class="remove-btn" onclick="removeFromCart(${index})">❌ মুছুন</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
        total += item.price;
    });

    totalPriceSpan.textContent = `৳ ${total}`;
}

// কার্ট থেকে পণ্য মুছুন
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// চেকআউট বাটন
document.getElementById('checkoutBtn').addEventListener('click', function() {
    localStorage.removeItem('cart');
    alert('চেকআউট সফল! ধন্যবাদ কেনাকাটার জন্য।');
    window.location.href = 'success.html';
});

// অর্ডার করুন বাটন
document.getElementById('orderNowBtn').addEventListener('click', function() {
    window.location.href = 'payment.html';
});

// পেজ লোডে কার্ট দেখাও
loadCart();
