const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

/* API */
const count = 5;
const api_key = "XNBAhyYdyUAD-EGveqC8RE2eOyT7dF1CIaGxFw32m5s";
const API_URL = `https://api.unsplash.com/photos/random?client_id=${api_key}&count=${count}`;

let photos_array = [];

/* Helper Function */
function set_ItemAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

/* Create Element for Photos and Links and Add to DOM */
function displayPhotos() {
    /* Iterating over photos array to get each image */
    photos_array.forEach((photo) => {
        /* Create <a> link to Unsplash */
        const photo_item = document.createElement("a");
        set_ItemAttributes(photo_item, {
            href: photo.links.html,
            target: "_blank",
        });
        /* Creating image element */
        const image = document.createElement("img");
        set_ItemAttributes(image, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        photo_item.appendChild(image);
        imageContainer.appendChild(photo_item);
    });
}

/* Get Photos form the API */
async function getPhotos() {
    try {
        const response = await fetch(API_URL);
        photos_array = await response.json();
        displayPhotos();
    }
    catch (err) {
        console.log(err.message);
    }
}


/* On load */
getPhotos();