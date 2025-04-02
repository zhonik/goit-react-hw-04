import css from './ImageModal.module.css';
import Modal from 'react-modal';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.97)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const ImageModal = ({ alt, src, isOpen, onClick }) => {
  return (
    <div className={css.container}>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClick}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <div>
          <img className={css.img} src={src} alt={alt} />
        </div>
      </Modal>
    </div>
  );
};

export default ImageModal;
