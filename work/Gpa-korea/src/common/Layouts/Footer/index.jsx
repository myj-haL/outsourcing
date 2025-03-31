import style from "./index.module.css";
import logo from "images/common/logo.svg";
import circleArrow from "images/common/icon-circle-arrow.svg";

function Footer () {
  return (
    <footer className={style.footer}>
      <img alt="logo" src={logo} />
      <button type="button" className={style.registe_btn}>
        마케팅 서비스 바로 신청하기
        <img alt="circle arrow" src={circleArrow} />
      </button>

      <ul className={style.company_info}>
        <li>
          <span className={style.category}>주소</span>
          <p className={style.context}>서울시 강남구 삼성로96길14, 중아빌딩 10층</p>
        </li>
        <li>
          <span className={style.category}>대표자</span>
          <p className={style.context}>진종순</p>
        </li>
        <li>
          <span className={style.category}>대표번호</span>
          <p className={style.context}>1533-5730</p>
        </li>
        <li>
          <span className={style.category}>사업자등록번호</span>
          <p className={style.context}>594-81-00315</p>
        </li>
        <li>
          <span className={style.category}>E-Mail</span>
          <p className={style.context}>koreagpa@gmail.com</p>
        </li>
      </ul>
    </footer>
  )
}

export default Footer;