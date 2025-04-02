import styles from './SearchBar.module.scss';
import LogoTextSVG from 'src/assets/svgs/logo-text.svg';
import SearchSVG from 'src/assets/svgs/search.svg';
import CloseSVG from 'src/assets/svgs/close.svg';

export const SearchBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={LogoTextSVG} alt="logo in text version" />
      </div>
      <form className={styles.search}>
        <label htmlFor="search">
          <img src={SearchSVG} alt="search icon" />
        </label>
        <input type="text" id="search" />
        <button className={styles.resetButton} type="reset">
          <img src={CloseSVG} alt="close svg" />
        </button>
      </form>
    </div>
  );
};
