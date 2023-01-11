import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = createGalleryMarcup(galleryItems);

galleryContainer.addEventListener('click', onGalleryContainerClick);

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryMarcup(items) {
    return items.map(({preview, original, description}) => {
        return `
        <a class="gallery__item" href="${original}">
            <img 
                class="gallery__image" 
                src="${preview}" 
                alt="${description}" 
            />
        </a>
            `
    }).join('');
};

function onGalleryContainerClick(evt) {
    evt.preventDefault();
    const imageEl = evt.target.classList.contains('gallery__image');
    
    if(!imageEl) {
        return;
    }

    new SimpleLightbox('.gallery a', {       
        captionDelay: 250,
        captionsData: 'alt',
    });
}
