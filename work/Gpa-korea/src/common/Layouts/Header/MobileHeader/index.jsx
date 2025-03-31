import style from "./index.module.css";
import logo from "images/common/logo.svg";
import hamburger from "images/common/icon-hamburger.svg";
import { Link } from "react-router-dom";
import close from "images/common/icon-close.svg";
import { LoginmenuList } from "../menuList";
import { useState } from "react";

function MobileHeader () {
  const [isLnbOpen, setIsLnbOpen] = useState(false);

  const handleLnbOpen = () => {
    setIsLnbOpen(!isLnbOpen);
  }

  return (
    <div className={style.mobile_h}>
      <Link to="/">
        <img alt="logo" className={style.logo} src={logo} />
      </Link>
      <button type="button" className={style.lnb_btn} onClick={handleLnbOpen}>
        <img alt="hamburger" src={hamburger} />
      </button>

      <div className={`${style.lnb} ${isLnbOpen ? style.open : ""}`}>
        <img alt="logo" src={logo} />
        <button type="button" className={style.close_btn} onClick={handleLnbOpen}>
          <img alt="close" src={close} />
        </button>

        <div className={style.menu}>
          {LoginmenuList.map((item) => (
            <Link to={item.link} className={style.links} key={item.id}>
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MobileHeader;