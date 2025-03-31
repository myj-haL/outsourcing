import { Link } from "react-router-dom";
import style from "./index.module.css";
import arrowIcon from "images/common/icon-arrow.svg";

function Banner () {
  return (
    <div className={style.container}>
      <div className={style.banner}>
        <div className={style.title_box}>
          <p className={style.sub_title}>이젠 고객이 원하는 걸 보여주세요!</p>
          <h3 className={style.title}>SNS마케팅을 위한<br/>이유있는 선택 GPA</h3>
        </div>

        <div className={style.round_box}>
          <Link to="" className={style.contact_btn}>
            문의하기 
            <img alt="arrow icon" src={arrowIcon} />
          </Link>
        </div>
      </div>

      <div className={style.order_number}>
        <ul className={style.number_list}>
          <li>
            <span className={style.category}>오늘 완료된 주문</span>
            <span className={style.number}>3,094</span>
          </li>
          <li>
            <span className={style.category}>회원 수</span>
            <span className={style.number}>35,094</span>
          </li>
          <li>
            <span className={style.category}>누적 완료 주문</span>
            <span className={style.number}>54,300</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Banner;