import style from "./index.module.css";
import iconSearch from "images/common/icon-search.svg";

function SearchBar () {
  return (
    <form action="">
      <div className={style.search_bar}>
        <input type="text" name="" id="" className={style.search_input} placeholder="검색어 입력" />
        <button type="submit" className={style.search_btn}>
          <img alt="search icon" src={iconSearch} />
          검색
        </button>        
      </div>
    </form>
  )
}

export default SearchBar;