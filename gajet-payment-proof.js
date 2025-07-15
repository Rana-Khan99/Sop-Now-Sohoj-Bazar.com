document.getElementById('proofForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const amount = document.getElementById('amount').value;
    const screenshot = document.getElementById('screenshot').files[0];

    if (!amount || !screenshot) {
        alert('অনুগ্রহ করে সমস্ত তথ্য পূরণ করুন!');
        return;
    }

    alert('আপনার পেমেন্ট তথ্য গ্রহণ করা হয়েছে! ✅');
    
    // এখানে চাইলে backend এ পাঠাতে পারো
    // এখন success page এ নিয়ে যাই
    window.location.href = 'gajet-ordar-success.html';
});
