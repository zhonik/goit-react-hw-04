import { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import css from './App.module.css';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import { getPhotos } from '../../photos-api';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadbtn, setLoadbtn] = useState(false);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImg, setModalImg] = useState({
    alt: '',
    src: '',
  });

  useEffect(() => {
    if (!query) return;
    const fetchPhotos = async () => {
      setLoading(true);

      try {
        setLoadbtn(false);
        const { results, total_pages } = await getPhotos(query, page);
        setPhotos(prevPhoto => [...prevPhoto, ...results]);
        setLoadbtn(page < total_pages);
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, [page, query]);

  const onHandleSubmit = value => {
    setQuery(value);
    setPhotos([]);
    setPage(1);
    setError(null);
    setLoadbtn(false);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = img => {
    setModalIsOpen(true);
    setModalImg(img);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalImg({
      alt: '',
      src: '',
    });
  };

  return (
    <div>
      <SearchBar onSubmit={onHandleSubmit} />
      <div className={css.container}>
        {photos.length > 0 && <ImageGallery images={photos} openModal={openModal} />}
        {error && <ErrorMessage />}
        <Loader loading={loading} />
        {loadbtn && <LoadMoreBtn onClick={onLoadMore} />}
        <ImageModal {...modalImg} closeModal={closeModal} modalIsOpen={modalIsOpen} />
      </div>
    </div>
  );
};

export default App;
