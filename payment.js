const codOption = document.getElementById('cod');
const prepayOption = document.getElementById('prepay');
const orderNowBtn = document.getElementById('orderNowBtn');
const paymentInstructions = document.getElementById('paymentInstructions');
const paymentDoneBtn = document.getElementById('paymentDoneBtn');
const copyNumberBtn = document.getElementById('copyNumberBtn');
const toast = document.getElementById('toast');

orderNowBtn.addEventListener('click', () => {
    if (codOption.checked) {
        window.location.href = 'order-success.html';
    } else if (prepayOption.checked) {
        paymentInstructions.style.display = 'block';
    } else {
        showToast('⚠️ অনুগ্রহ করে একটি পেমেন্ট পদ্ধতি নির্বাচন করুন!');
    }
});

paymentDoneBtn.addEventListener('click', () => {
    window.location.href = 'payment-proof.html';
});

copyNumberBtn.addEventListener('click', () => {
    const paymentNumber = document.getElementById('paymentNumber').innerText.trim();
    navigator.clipboard.writeText(paymentNumber)
        .then(() => {
            showToast('✅ নাম্বার কপি হয়েছে!');
        })
        .catch(() => {
            showToast('❌ কপি করতে ব্যর্থ হয়েছে!');
        });
});

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
