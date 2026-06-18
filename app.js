document.getElementById('generate-btn').addEventListener('click', generateQR);

let qrcode = null;

function generateQR() {
    const inputData = document.getElementById('qr-input').value.trim();
    const qrWrapper = document.getElementById('qrcode-wrapper');
    const qrContainer = document.getElementById('qrcode');

    // ইনপুট খালি থাকলে অ্যালার্ট দেবে
    if (inputData === "") {
        alert("Please enter some text or a valid URL first!");
        return;
    }

    // আগের কিউআর কোড পরিষ্কার করা
    qrContainer.innerHTML = "";
    qrWrapper.classList.remove('hidden');

    // নতুন কিউআর কোড তৈরি করা (সব ডিভাইসের স্ক্রিনের জন্য স্ট্যান্ডার্ড সাইজ)
    qrcode = new QRCode(qrContainer, {
        text: inputData,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    // কিউআর কোড ইমেজ হিসেবে লোড হতে সামান্য সময় নেয়, তাই একটু পর ডাউনলোড বাটন রেডি করা
    setTimeout(() => {
        const qrImg = qrContainer.querySelector('img');
        if (qrImg) {
            setupDownload(qrImg.src);
        }
    }, 300);
}

// ডাউনলোড লজিক (মোবাইল ও পিসি উভয়ের জন্য পারফেক্ট কাজ করবে)
function setupDownload(imageSrc) {
    const downloadBtn = document.getElementById('download-btn');
    
    // আগের ইভেন্ট রিমুভ করার জন্য বাটন ক্লোন করা
    const newDownloadBtn = downloadBtn.cloneNode(true);
    downloadBtn.parentNode.replaceChild(newDownloadBtn, downloadBtn);

    newDownloadBtn.addEventListener('click', () => {
        const a = document.createElement('a');
        a.href = imageSrc;
        a.download = 'utilify-qrcode.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
}
