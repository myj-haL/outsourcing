import style from "./index.module.css";
import { serviceList } from "./serviceList";

function OurService () {
  return (
    <div className={style.container}>
      <h3 className={style.title}>우리의 서비스</h3>
      <p className={style.sub_title}>인스타그램을 포함한 다양한 소셜 네트워크 서비스 관리가 언제 어디서든 가능합니다.</p>

      <ul className={style.service_list}>
        {serviceList.map((item, index) => (
          <li key={item.id} className={`${index === 0 ? style.bgImg : ''}  ${item.bg ? style[item.bg] : ''}`}>
            <img alt="" src={item.icon} />
            <p className={style.name}>{item.title}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default OurService;