const codOption = document.getElementById('cod');
const prepayOption = document.getElementById('prepay');
const orderNowBtn = document.getElementById('orderNowBtn');
const paymentInstructions = document.getElementById('paymentInstructions');
const paymentDoneBtn = document.getElementById('paymentDoneBtn');
const paymentNumber = "01709793260"; // নম্বর আলাদা করে রাখলাম

// অর্ডার করুন বাটন
orderNowBtn.addEventListener('click', function() {
    if (codOption.checked) {
        window.location.href = 'order-success.html';
    } else if (prepayOption.checked) {
        paymentInstructions.style.display = 'block';
        createCopyButton(); 
    } else {
        showToast('⚠️ অনুগ্রহ করে একটি পেমেন্ট পদ্ধতি নির্বাচন করুন!');
    }
});

// পেমেন্ট করেছি বাটন
paymentDoneBtn.addEventListener('click', function() {
    window.location.href = 'payment-proof.html';
});

// কপি বাটন তৈরি
function createCopyButton() {
    if (!document.querySelector('.copy-btn')) { // আগের বাটন থাকলে নতুন করে তৈরি করবে না
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = '📋 নাম্বার কপি করুন';
        paymentInstructions.appendChild(copyBtn);

        copyBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(paymentNumber)
                .then(() => {
                    showToast('✅ নম্বর কপি হয়েছে!', true);
                    playSound('success');
                })
                .catch(() => {
                    showToast('❌ কপি করতে ব্যর্থ হয়েছে!', false);
                    playSound('error');
                });
        });
    }
}

// সুন্দর টোস্ট মেসেজ
function showToast(message, isSuccess = true) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `toast ${isSuccess ? 'success' : 'error'}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => { toast.classList.add('show'); }, 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => { document.body.removeChild(toast); }, 500);
    }, 3000);
}

// সাউন্ড প্লে
function playSound(type) {
    const audio = new Audio(type === 'success' ? 'success-sound.mp3' : 'error-sound.mp3');
    audio.play();
}
