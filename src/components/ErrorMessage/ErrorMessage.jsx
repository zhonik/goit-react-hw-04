import css from './ErrorMessage.module.css';

const ErrorMessage = ({ errorStatus }) => {
  return (
    <div className={css.error}>
      Whoops, something went wrong! <br />
      Please try reloading this page!
    </div>
  );
};

export default ErrorMessage;
