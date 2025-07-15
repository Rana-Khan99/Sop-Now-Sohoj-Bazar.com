const codOption = document.getElementById('cod');
const prepayOption = document.getElementById('prepay');
const orderNowBtn = document.getElementById('orderNowBtn');
const paymentInstructions = document.getElementById('paymentInstructions');
const paymentDoneBtn = document.getElementById('paymentDoneBtn');
const copyNumberBtn = document.getElementById('copyNumberBtn');
const toast = document.getElementById('toast');

orderNowBtn.addEventListener('click', () => {
    if (codOption.checked) {
        window.location.href = 'gajet-order-success.html';
    } else if (prepayOption.checked) {
        paymentInstructions.style.display = 'block';
    } else {
        showToast('⚠️ অনুগ্রহ করে একটি পেমেন্ট পদ্ধতি নির্বাচন করুন!');
    }
});

paymentDoneBtn.addEventListener('click', () => {
    window.location.href = 'gajet-payment-proof.html';
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
document.getElementById("orderNowBtn").addEventListener("click", () => {
    const cod = document.getElementById("cod").checked;
    const prepay = document.getElementById("prepay").checked;

    if (cod) {
        // ক্যাশ অন ডেলিভারির জন্য রিডাইরেক্ট
        window.location.href = "gajet-ordar-success.html";
    } else if (prepay) {
        // বিকাশ/নগদ পেমেন্ট ইন্সট্রাকশন দেখানো হবে
        document.getElementById("paymentInstructions").classList.remove("hidden");
    } else {
        showToast("⚠️ একটি পেমেন্ট পদ্ধতি নির্বাচন করুন!");
    }
});

// পেমেন্ট নম্বর কপি
document.getElementById("copyNumberBtn").addEventListener("click", () => {
    const number = document.getElementById("paymentNumber").textContent;
    navigator.clipboard.writeText(number);
    showToast("📋 নম্বর কপি হয়েছে!");
});

// পেমেন্ট শেষ হলে
document.getElementById("paymentDoneBtn").addEventListener("click", () => {
    window.location.href = "gajet-payment-proof.html";
});

// Toast মেসেজ দেখানো
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "toast show";
    setTimeout(() => {
        toast.className = "toast";
    }, 3000);
}
