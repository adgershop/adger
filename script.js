function zoomImage(img) {
    var zoomedImage = document.createElement('div');
    zoomedImage.setAttribute('id', 'zoomedImage');

    var closeButton = document.createElement('span');
    closeButton.classList.add('closeButton');
    closeButton.innerHTML = '×';
    closeButton.onclick = function() {
        document.body.removeChild(zoomedImage);
    };

    var imgClone = img.cloneNode(true);
    zoomedImage.appendChild(imgClone);
    zoomedImage.appendChild(closeButton);

    document.body.appendChild(zoomedImage);
}

function copyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('تم نسخ النص: ' + text);
}
