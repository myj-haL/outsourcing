import style from "./index.module.css";
import Layouts from "../../common/Layouts";
import arrowIcon from "images/common/icon-select-arrow.svg";
import qIcon from "images/common/icon-q.svg";
import aIcon from "images/common/icon-a.svg";
import { useRef, useState } from "react";
import { faqData1, faqData2 } from "./faqData";
import Paging from "../../common/components/Paging";

function Faq () {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const accordionRef = useRef();
  const accordionRef2 = useRef();

  const handleOpen1 = (index) => {
    setIsOpen1((prev) => (prev === index ? null : index));
  };
  const handleOpen2 = (index) => {
    setIsOpen2((prev) => (prev === index ? null : index));
  };


  return (
    <Layouts>
      <div className={style.container}>
        <div className={style.inner}>
          <h3 className={style.title}>자주 묻는 질문</h3>

          <div className={style.faq_wrap}>
            <div className={style.faq_box}>
              <h3 className={style.faq_title}>기본 주문방법</h3>
              <ul className={style.accordion_list}>
                {faqData1.map((item, idx) => (
                  <li key={item.id}>
                    <button type="button" onClick={() => handleOpen1(idx)}>
                      <p>
                        {item.question}
                        <img alt="accordion icon" src={arrowIcon} className={isOpen1 === idx ? style.active : ''} />
                      </p>
                    </button>
                    <div className={style.open} ref={accordionRef} 
                      style={isOpen1 === idx ? {height: accordionRef.current.scrollHeight} : {height:'0px'}}
                    >
                      <div className={style.open_inner}>
                        <img alt="a icon" src={aIcon} />
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className={style.faq_box}>
              <h3 className={style.faq_title}>자주 묻는 질문</h3>
              <ul className={style.accordion_list}>
                {faqData2.map((item, idx) => (
                  <li key={item.id}>
                    <button type="button" onClick={() => handleOpen2(idx)}>
                      <img alt="q icon" src={qIcon} />
                      <p>
                        {item.question}
                        <img alt="accordion icon" src={arrowIcon} className={isOpen2 === idx ? style.active : ''} />
                      </p>
                    </button>
                    <div className={style.open} ref={accordionRef2} 
                      style={isOpen2 === idx ? {height: accordionRef2.current.scrollHeight} : {height:'0px'}}
                    >
                      <div className={style.open_inner}>
                        <img alt="a icon" src={aIcon} />
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
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

export default Faq;