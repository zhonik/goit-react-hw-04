import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import css from './App.module.css';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import { fetchPhotosWithQuery, instance } from '../../photos-api';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadbtn, setLoadbtn] = useState(false);
  const [error, setError] = useState(false);
  const [modalImg, setModalImg] = useState({
    alt: '',
    src: '',
    isOpen: false,
  });

  const handleSearch = async query => {
    setValue(query);
    setPage(1);
    setPhotos([]);
    setLoading(true);
    setError(false);

    try {
      setLoadbtn(false);
      const data = await fetchPhotosWithQuery(query);
      setPhotos(data);
    } catch (error) {
      setError(true);
      console.error(error);
    } finally {
      setLoading(false);
      setLoadbtn(true);
    }
  };

  const handleLoadMoreBtnClick = async () => {
    const nextPage = page + 1;
    setPage(nextPage);

    try {
      const data = await fetchPhotosWithQuery(value, nextPage);
      setPhotos(prevPhotos => [...prevPhotos, ...data]);
    } catch (error) {
      setError(true);
      console.error(error);
    } finally {
      setLoading(false);
      if (page === instance.defaults.params.total_pages) {
        setLoadbtn(false);
      }
    }
  };

  const handleImageClick = img => {
    setModalImg(img);
  };

  const handleModalClick = () => {
    setModalImg({
      alt: '',
      src: '',
      isOpen: false,
    });
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      <div className={css.container}>
        {photos.length > 0 && <ImageGallery images={photos} openModal={handleImageClick} />}
        {error && <ErrorMessage />}
        <Loader loading={loading} />
        {loadbtn && <LoadMoreBtn onClick={handleLoadMoreBtnClick} />}
        <ImageModal {...modalImg} onClick={handleModalClick} />
      </div>
    </div>
  );
};

export default App;
