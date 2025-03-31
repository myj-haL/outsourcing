import Layouts from "../../common/Layouts";
import SearchBar from "../../common/components/SearchBar";
import style from "./index.module.css";
import blankIcon from "images/common/icon-blank.svg";
import Paging from "../../common/components/Paging";

function OrderList () {
  return (
    <Layouts>
      <div className={style.container}>
        <div className={style.inner}>
          <h3 className={style.title}>주문내역</h3>
          <div className={style.filter}>
            <ul className={style.filter_list}>
              <li className={style.active}>전체</li>
              <li>대기중</li>
              <li>진행중</li>
              <li>완료</li>
              <li>일부 완료</li>
              <li>처리중</li>
              <li>취소</li>
            </ul>
            <div className={style.right_search}>
              <SearchBar />
            </div>
          </div>

          <div className={style.list_wrap}>
            <table className={style.list} border="0" cellSpacing={0} cellPadding={0}>
              <colgroup>
                <col width="7%" />
                <col width="14%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="5%" />
                <col />
                <col width="6%" />
                <col width="6%" />
                <col width="7%" />
              </colgroup>
              <thead>
                <tr>
                  <th>접수 번호</th>
                  <th>날짜</th>
                  <th>링크</th>
                  <th>금액</th>
                  <th>시작 카운터</th>
                  <th>수량</th>
                  <th>서비스</th>
                  <th>남은 수량</th>
                  <th>상태</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* 임시 더미 리스트 */}
                {
                  Array(10).fill('').map((tr, i) => (
                    <tr key={i}>
                      <td>143254</td>
                      <td>2023-10-01  19:44:03</td>
                      <td>
                        <a href="#" target="_blank" className={style.blank_link}>유튜브 <img alt="blank icon" src={blankIcon} /></a>
                      </td>
                      <td>₩ 100,000</td>
                      <td>1502</td>
                      <td>1</td>
                      <td>[프리미엄/한국인]🇰🇷인스타그램 팔로워👸100원(1개)</td>
                      <td>41</td>
                      <td>일부완료</td>
                      <td>
                        <button type="button" className={style.action_btn}>action</button>
                      </td>
                    </tr>
                  ))
                }
                <tr>
                  <td>143254</td>
                  <td>2023-10-01  19:44:03</td>
                  <td>
                    <a href="#" target="_blank" className={style.blank_link}>인스타그램 <img alt="blank icon" src={blankIcon} /></a>
                  </td>
                  <td>₩ 150,000</td>
                  <td>1502</td>
                  <td>1</td>
                  <td>[프리미엄/한국인]🇰🇷인스타그램 팔로워👸100원(1개)</td>
                  <td>21</td>
                  <td>완료</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={style.paging_box}>
            <Paging />
          </div>
        </div>
      </div>
    </Layouts>
  )
}

export default OrderList;