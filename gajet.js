// 🌙 Dark Mode Toggle
document.getElementById('modeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// 🛒 Add to Cart Functionality
const cart = [];

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', (e) => {
    const productCard = e.target.closest('.product-card');
    const title = productCard.querySelector('h3').textContent;
    const price = productCard.querySelector('p').textContent;
    cart.push({ title, price });
    alert(`${title} কার্টে যোগ হয়েছে!`);
    localStorage.setItem('gajetCart', JSON.stringify(cart));
  });
});

// 🔎 Live Search
document.getElementById('searchInput').addEventListener('input', (e) => {
  const searchValue = e.target.value.toLowerCase();
  document.querySelectorAll('.product-card').forEach(card => {
    const productName = card.querySelector('h3').textContent.toLowerCase();
    card.style.display = productName.includes(searchValue) ? 'block' : 'none';
  });
});
