import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

export function responseError(
  message = `Sorry, there are no images matching your search query. Please try again!`
) {
  iziToast.error({
    message: message,
    position: 'topRight',
    timeout: 3000,
  });
}

export function resetForm() {
  document.querySelector('.form').reset();
}

export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');

  const markup = images
    .map(image => {
      return createImageItem(image);
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
  setTimeout(() => {
    scroll();
  }, 100);
}

export function setLoadMoreButton(active) {
  const btn = document.querySelector('.loadMoreButton');
  const list = btn.classList;
  active ? list.remove('hidden') : list.add('hidden');
}

export function showLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.remove('hidden');
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.add('hidden');
}

export function clearGallery() {
  document.querySelector('.gallery').textContent = '';
}

export function scroll() {
  const galleryCardHeight =
    document.querySelector('.galleryItem').getBoundingClientRect().height * 2;
  console.log('galleryCardHeight', galleryCardHeight);
  scrollBy({
    top: galleryCardHeight,
    behavior: 'smooth',
  });
}

function createImageItem(image) {
  return `
    <li class="galleryItem">
        <a href="${image.largeImageURL}" disabled="true">
          <img src="${image.webformatURL}" alt="${image.tags}"/>
        </a>
        <div class="imageInfoContainer">
            <div class="imageInfo">
                Likes 
                <div>
                    ${image.likes}
                </div>
            </div>
            <div class="imageInfo">
                Views 
                <div>
                    ${image.views}
                </div>
            </div>
            <div class="imageInfo">
                Comments 
                <div>
                    ${image.comments}
                </div>
            </div>
            <div class="imageInfo">
                Downloads
                <div>
                ${image.downloads}
                </div>
            </div>
        </div>
    </li>`;
}
