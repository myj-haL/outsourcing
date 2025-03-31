import { Link } from "react-router-dom";
import style from "./index.module.css";
import logo from "images/common/logo.svg";
import { LoginmenuList } from "../menuList";

function PcHeader () {
  return (
    <div className={style.pc}>
      <div className={style.inner}>
        <Link to="/">
          <img alt="logo" src={logo} />
        </Link>

        <ul className={style.menu_list}>
          {/* TODO : 로그인유무에 따라 불러오는 list 명이 달라짐 */}
          {LoginmenuList.map((item) => (
            <li key={item.id}>
              <Link to={item.link}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PcHeader;