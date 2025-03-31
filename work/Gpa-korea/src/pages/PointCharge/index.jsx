import { useState } from "react";
import Layouts from "../../common/Layouts";
import style from "./index.module.css";
import Paging from "../../common/components/Paging";

function PointCharge () {
  const [activeTab, setActiveTab] = useState(0);
  const tabList = ['무통장 입금','카드 결제','계좌이체'];

  const tabHandle = (index) => {
    setActiveTab(index);
  }

  return (
    <Layouts>
      <div className={style.container}>
        <div className={style.inner}>
          <h3 className={style.page_title}>포인트 충전</h3>
          <div className={style.section_wrap}>
            <div className={style.left}>
              <div className={style.box}>
                <h3 className={`${style.title} ${style.big}`}>
                  <b style={{color:'#17C9BC', fontWeight:'700'}}>24시간</b> 언제든 자동충전 가능!
                </h3>
                <ul className={style.help_list}>
                  <li>• 결제금액과 입금자명이 정확히 일치해야 합니다. <br/>(일치하지 않을 경우, 전산 과정에서 누락될 수 있습니다.)</li>
                  <li>• 입금완료 후 1분이내 자동으로 잔액이 충전됩니다. <br/>(충전이 안될 경우 카카오 채널로 문의 주세요.)</li>
                  <li>• 3시간이 지나면 충전이 자동으로 취소됩니다.</li>
                  <li>• 카드 결제 시 PG 결제 수수료(5%)는 결제자 부담입니다.</li>
                  <li>• 계산서/현금영수증은 충전시 신청주시면 처리됩니다.</li>
                </ul>
              </div>
              <div className={style.box}>
                <h3 className={style.title}>충전하기</h3>
                <ul className={style.tab_list}>
                  {tabList.map((item, index) => (
                    <li key={index} onClick={() => tabHandle(index)} className={activeTab === index ? style.active : ''}>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className={style.tab_contents}>
                  <form action="">
                    <div className={style.payment_box}>
                      <p>결제 금액</p>
                      <select name="" id="" className={style.pay_select}>
                        <option value="" selected>5,000원</option>
                      </select>
                    </div>

                    {activeTab === 0 &&
                    <ul className={style.pay_input_list}>
                      <li>
                        <span>입금자명</span>
                        <input type="text" name="" id="" placeholder="입금자명" className={style.pay_input} />
                      </li>
                      <li>
                        <span>현금영수증 식별번호</span>
                        <input type="number" name="" id="" placeholder="식별번호" className={style.pay_input} />
                      </li>
                    </ul>
                    }

                    {activeTab === 2 && 
                    <ul className={`${style.pay_input_list} ${style.column}`}>
                      <li>
                        <span>사업자등록번호</span>
                        <input type="number" name="" id="" placeholder="사업자등록번호" className={style.pay_input} />
                      </li>
                      <li>
                        <span>상호명</span>
                        <input type="text" name="" id="" placeholder="상호명" className={style.pay_input} />
                      </li>
                      <li>
                        <span>대표자명</span>
                        <input type="text" name="" id="" placeholder="대표자명" className={style.pay_input} />
                      </li>
                      <li>
                        <span>연락처</span>
                        <input type="number" name="" id="" placeholder="연락처" className={style.pay_input} />
                      </li>
                      <li>
                        <span>업태</span>
                        <input type="text" name="" id="" placeholder="업태" className={style.pay_input} />
                      </li>
                      <li>
                        <span>업종</span>
                        <input type="text" name="" id="" placeholder="업종" className={style.pay_input} />
                      </li>
                      <li>
                        <span>사업장 주소</span>
                        <input type="text" name="" id="" placeholder="사업장 주소" className={style.pay_input} />
                      </li>
                      <li>
                        <span>담당자명</span>
                        <input type="text" name="" id="" placeholder="담당자명" className={style.pay_input} />
                      </li>
                      <li>
                        <span>이메일</span>
                        <input type="text" name="" id="" placeholder="이메일" className={style.pay_input} />
                      </li>
                    </ul>
                    }

                    <button type="submit" className={style.charge_btn}>충전하기</button>
                  </form>
                </div>
              </div>
            </div>
            <div className={style.box}>
              <h3 className={style.title}>충전내역</h3>
              <div className={style.table_wrap}>
                <table cellSpacing={0} border={0} className={style.charge_list}>
                  <colgroup>
                    <col width="18%" />
                    <col width="40%" />
                    <col width="21%" />
                    <col width="21%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>충전 번호</th>
                      <th>충전 일자</th>
                      <th>충전 방식</th>
                      <th>충전 금액</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* 임시 더미 리스트 구현 */}
                    {
                      Array(10).fill('').map((tr, i) => (
                      <tr>
                        <td>29</td>
                        <td>2023-10-01  19:44:03</td>
                        <td>무통장 입금</td>
                        <td>100,000</td>
                      </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
              <div className={style.paging_box}>
                <Paging />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layouts>
  )
}

export default PointCharge;