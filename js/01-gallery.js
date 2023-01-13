import { galleryItems } from './gallery-items.js';
// Change code below this line

// console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = createGalleryMarcup(galleryItems);

galleryContainer.addEventListener('click', onImageClick);

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryMarcup(items) {
    return items.map(({preview, original, description}) => {
        return `
            <div class="gallery__item">
                <a class="gallery__link" href="${original}">
                    <img
                        class="gallery__image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                    />
                </a>
            </div>
            `
    }).join('');
};

function onImageClick(evt) {
    evt.preventDefault();
    const imageEl = evt.target.classList.contains('gallery__image');
    
    if(!imageEl) {
        return;
    }

    const instance = basicLightbox.create(`
        <img 
            src="${evt.target.dataset.source}" 
            width="800" 
            height="600"
        />
    `, {
            onShow: (instance) => {
                document.addEventListener('keydown', onEscKeyPress);
            },
            onClose: (instance) => {
                document.removeEventListener('keydown', onEscKeyPress);
            },
        }
    );

    instance.show();

    const visible = instance.visible();
    if(!visible) {
        document.removeEventListener('keydown', onEscKeyPress);
    }

    function onEscKeyPress (evt) {
        if(evt.code === 'Escape') {
            instance.close();
        }
        console.log(evt.code)
    };
}
