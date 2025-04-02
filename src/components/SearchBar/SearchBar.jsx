import css from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { FcSearch } from 'react-icons/fc';
import { Field, Form, Formik } from 'formik';

const notify = () => toast.error('Please fill in the search field!');

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (values, actions) => {
    if (values.input.trim() === '') {
      notify();
      return;
    }

    onSubmit(values.input);
    actions.resetForm();
  };

  return (
    <header className={css.header}>
      <Formik initialValues={{ input: '' }} onSubmit={handleSubmit}>
        <Form className={css.headerForm}>
          <Field
            className={css.field}
            name='input'
            type='text'
            autoComplete='off'
            autoFocus
            placeholder='Search images and photos'
          />
          <button className={css.searchBtn} type='submit'>
            <FcSearch size={16} />
          </button>
          <Toaster position='top-right' reverseOrder={false} />
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
