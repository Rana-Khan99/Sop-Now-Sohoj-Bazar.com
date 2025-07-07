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

// কার্টে যোগ করা
function addTocart(productName, price) {
    const isAlreadyInCart = cart.some(item => item.name === productName);

    if (isAlreadyInCart) {
        alert(`${productName} ইতোমধ্যে কার্টে রয়েছে!`);
    } else {
        const product = { name: productName, price: price };
        cart.push(product);
        saveCart();
        alert(`${productName} কার্টে যোগ হয়েছে!`);
    }
}

// কিনুন বাটন
function buyNow(productName, price) {
    const isAlreadyInCart = cart.some(item => item.name === productName);

    if (!isAlreadyInCart) {
        const product = { name: productName, price: price };
        cart.push(product);
        saveCart();
    }

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

// পেজ লোড হলে কার্ট লোড করো
loadCart();
