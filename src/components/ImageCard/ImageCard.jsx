import css from './ImageCard.module.css';

const ImageCard = ({ image, openModal }) => {
  const { urls, alt_description, color } = image;
  return (
    <div className={css.imageThumb} style={{ backgroundColor: color, borderColor: color }}>
      <img
        className={css.img}
        src={urls.small}
        alt={alt_description}
        onClick={() => openModal({ alt: alt_description, src: urls.regular })}
      />
    </div>
  );
};

export default ImageCard;
