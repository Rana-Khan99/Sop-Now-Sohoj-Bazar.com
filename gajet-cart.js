const cartList = document.getElementById('cartList');
const cartTotal = document.getElementById('cartTotal');
const cartButtons = document.getElementById('cartButtons');
let savedCart = JSON.parse(localStorage.getItem('gajetCart')) || [];

function renderCart() {
  cartList.innerHTML = '';

  if (savedCart.length === 0) {
    cartList.innerHTML = '<p style="text-align: center; font-size: 1.2rem;">🛍️ আপনার কার্ট বর্তমানে খালি!</p>';
    cartTotal.textContent = '';
    cartButtons.style.display = 'none';
    return;
  }

  let total = 0;

  savedCart.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'cart-item';

    const title = document.createElement('span');
    title.textContent = `${item.title} - ${item.price}`;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = '✖';

    removeBtn.onclick = () => {
      savedCart.splice(index, 1);
      localStorage.setItem('gajetCart', JSON.stringify(savedCart));
      renderCart();  // পুনরায় রেন্ডার করো
    };

    li.appendChild(title);
    li.appendChild(removeBtn);
    cartList.appendChild(li);

    const priceNum = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
    total += priceNum;
  });

  cartTotal.textContent = `মোট মূল্য: ৳${total.toFixed(2)}`;
  cartButtons.style.display = 'flex';
  cartTotal.style.opacity = 1; // animation এর জন্য
}

window.addEventListener('DOMContentLoaded', () => {
  renderCart();
});

// ordar suscessfully page 

// অর্ডার বাটনে ক্লিক ইভেন্ট
document.querySelector('.order-button').addEventListener('click', () => {
  window.location.href = 'gajet-payment.html';  // পরিবর্তন করে তোমার পছন্দমত পেইজের নাম দিবে
});

// // চেকআউট বাটনে ক্লিক করলে অন্য পেইজে নিয়ে যাওয়া যেতে পারে (যেমনঃ checkout.html)
// document.querySelector('.checkout-button').addEventListener('click', () => {
//   window.location.href = 'checkout.html';
// });
