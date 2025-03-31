import { Link } from "react-router-dom";
import Layouts from "../../common/Layouts";
import useResponsive from "../../common/hooks/Responsive";
import style from "./index.module.css";
import { leftMenuList } from "./leftMenuList";
import { useState } from "react";
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import tooltipIcon from "images/common/icon-tooltip.svg";

function OrderForm () {
  const innerWidth = useResponsive();
  const [activeId, setActiveId] = useState(0);

  return (
    <Layouts>
      <div className={style.container}>
        <div className={style.inner}>
          <ul className={style.sns_list}>
            {leftMenuList.map((item) => (
              <li key={item.id} onClick={() => setActiveId(item.id)}  className={`${activeId === item.id ? style.active : ''}`}>
                <img alt="sns icon" src={activeId === item.id ? item.activeIcon : item.icon} />
                <h3 className={style.kr}>{item.KR}</h3>
                {innerWidth >= 1024 && <p className={style.en}>{item.EN}</p>}
              </li>
            ))}
          </ul>

          <div className={style.right_form}>
            <div className={style.form_box}>
              <div className={style.category}>
                <p className={style.sub_title}>Youtube</p>
                <h3 className={style.title}>유튜브</h3>
              </div>
              <form action="">
                <ul className={style.form_list}>
                  <li>
                    <span className={style.form_name}>서비스</span>
                    <select name="" id="" className={style.select_list}>
                      <option value="" selected>서비스를 선택해 주시기 바랍니다.</option>
                    </select>
                  </li>
                  <li>
                    <span className={style.form_name}>
                      링크 입력
                      <p className={style.copy}>링크 복사 방법 
                        <a data-tooltip-id="copy-tooltip" data-tooltip-content="링크 복사 방법이 나옵니다.">
                          <img alt="icon tooltip" src={tooltipIcon} />
                        </a>
                      </p>
                      <Tooltip
                        id="copy-tooltip"
                        place="top"
                        className={style.custom_tootltip}
                      />
                    </span>
                    <input type="text" name="" id="" className={style.write_input} placeholder="링크 입력" />
                  </li>
                  <li>
                    <span className={style.form_name}>수량</span>
                    <input type="number" name="" id="" className={style.write_input} placeholder="수량" />
                  </li>
                  <li>
                    <span className={style.form_name}>금액</span>
                    <input type="number" name="" id="" className={style.write_input} placeholder="금액" />
                  </li>
                </ul>

                <button type="submit" className={style.send_btn}>주문하기</button>
              </form>
            </div>

            <div className={style.ad_area}>
              <div className={style.ad_area_inner}>
                <div className={style.left}>
                  <span className={style.ad_title}>무료 충전소</span>
                  <span className={style.ad_sub_title}>GPA 블로그 후기 이벤트 중입니다.</span>
                </div>
                <Link to="" className={style.ad_link}>10,000원 무료 받기</Link>
              </div>
            </div>

            <div className={style.terms}>
              <div className={style.flex_box}>
                <span className={style.left_title} style={{minWidth:'75px'}}>서비스 정보</span>
                <ul className={style.terms_list}>
                  <li>GPA 유튜브 서비스는 24시간 언제든지 이용하셔도 시스템에서 주문을 자동으로 작업하고 있습니다.</li>
                  <li>모든 유튜브 서비스는 회원님의 아이디와 비밀번호를 요구하지 않고 높은 품질의 계정으로 안전하게 서비스 진행됩니다.</li>
                  <li>원활한 서비스를 위해 동영상 링크를 정확하게 입력하셔야 합니다. 동영상의 정확한 링크확인 하시려면 <Link to="" className={style.video_link}>여기</Link>를 눌러주세요.</li>
                  <li><b>구독자 늘리기</b> : 주문 전, 현재 구독자가 몇 명인지 보이도록 설정을 해주시기 바랍니다.</li>
                  <li><b>좋아요 늘리기</b> : 주문 전, 현재 좋아요 숫자가 보이도록 설정을 해주시기 바랍니다.</li>
                </ul>
              </div>
              <div className={style.flex_box}>
                <span className={style.left_title}>주의사항</span>
                <ul className={`${style.terms_list} ${style.number}`}>
                  <li>
                    <p className={style.number_list}>1</p>
                    <p>주문 전 채널, 동영상이 전체 공개 상태에서 주문해 주세요.</p>
                  </li>
                  <li>
                    <p className={style.number_list}>2</p>
                    <p>서비스 진행 중 동영상 삭제, 채널 비공개로 변경 시 환불이 불가능합니다.</p>
                  </li>
                  <li>
                    <p className={style.number_list}>3</p>
                    <p>주문 실수, 단순 변심으로 인한 환불은 불가능합니다.</p>
                  </li>
                  <li>
                    <p className={style.number_list}>4</p>
                    <p>추가 주문 시 이전 주문 상태가 완료된 후 다시 주문해 주세요.</p>
                  </li>
                  <li>
                    <p className={style.number_list}>5</p>
                    <p>주문 내역 페이지에서 주문 상태 확인 및 AS를 신청할 수 있습니다.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layouts>
  )
}

export default OrderForm;