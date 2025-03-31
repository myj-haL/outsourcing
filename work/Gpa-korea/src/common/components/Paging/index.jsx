import style from "./index.module.css";
import arrowIcon from "images/common/icon-paging-arrow.svg";

function Paging () {
  return (
    <div className={style.paging}>
      <ul className={style.paging_list}>
        <li>
          <button type="button" className={style.prev}>
            <img alt="arrow" src={arrowIcon} /> 이전
          </button>
        </li>
        <li className={`${style.number} ${style.active}`}>1</li>
        <li className={style.number}>2</li>
        <li className={style.number}>3</li>
        <li className={style.number}>4</li>
        <li>
          <button type="button" className={style.next}>
            다음 <img alt="arrow" src={arrowIcon} />
          </button>
        </li>
      </ul>
    </div>  
  )
}

export default Paging;