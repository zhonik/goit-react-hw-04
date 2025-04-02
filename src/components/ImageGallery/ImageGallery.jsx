import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={css.galleryList}>
      {images.map(image => (
        <li
          key={image.id}
          className={css.galleryItem}
          onClick={() =>
            openModal({ alt: image.alt_description, src: image.urls.regular, isOpen: true })
          }
        >
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
