document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('create-submit');
    const imageInput = document.getElementById('image-input');

    if (submitButton) {
        submitButton.addEventListener('click', showImage);
    }

    if (imageInput) {
        imageInput.addEventListener('change', previewImages);
    }
});

function showImage() {
    let newImage = document.getElementById('image-preview');
    newImage.style.visibility = "visible";

    document.getElementById('create-input').style.visibility = 'hidden';
}

function previewImages(event) {
    let previewContainer = document.getElementById('image-preview');
    previewContainer.innerHTML = ""; // Clear previous images

    Array.from(event.target.files).forEach(file => {
        let reader = new FileReader();
        reader.onload = function(e) {
            let img = document.createElement("img");
            img.src = e.target.result;
            previewContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
    });

    previewContainer.style.visibility = 'visible';
}
