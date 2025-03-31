import style from "./index.module.css";
import useResponsive from "../../../common/hooks/Responsive";
import worldMapImg from "images/main/img-world-map.png";

function WorldMap () {
  const innerWidth = useResponsive();
  
  return (
    <div className={style.container}>
      <h3 className={style.title}>세계가 이용 중인 GPA</h3>
      <p className={style.sub_title}>GPA는 세계 각지에 글로벌 인프라를 확보하며 세계 시장을 무대로 하고있습니다.</p>

      {innerWidth >= 1024 ? 
      <img alt="world map pc" src={worldMapImg} /> : 
      <img alt="world map mobile" src={worldMapImg} />
      }

      <ul className={style.using_list}>
        <li>
          <span className={style.number}>+ 254,000</span>
          <p className={style.category}>회원 수</p>
        </li>
        <li>
          <span className={style.number}>+ 14,500,000</span>
          <p className={style.category}>완료된 주문</p>
        </li>
        <li>
          <span className={style.number}>+ 9,235,000,000</span>
          <p className={style.category}>완료된 총 팔로워/좋아요/조회수</p>
        </li>
        <li>
          <span className={style.number}>+ 120</span>
          <p className={style.category}>제공서비스</p>
        </li>
        <li>
          <span className={style.number}>100%</span>
          <p className={style.category}>세계이용</p>
        </li>
      </ul> 
    </div>
  )
}

export default WorldMap;