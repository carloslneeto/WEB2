async function getDogImage() {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    document.getElementById('dogImage').src = data.message;
}
window.onload = getDogImage;
