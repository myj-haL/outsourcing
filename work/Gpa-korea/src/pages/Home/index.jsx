import style from "./index.module.css";
import Layouts from "../../common/Layouts";
import OurService from "./OurService";
import Banner from "./Banner";
import WorldMap from "./WorldMap";

function Home () {
  return (
    <Layouts>
      <div className={style.container}>
        <Banner />
        <OurService />
        <WorldMap />
      </div>
    </Layouts>
  )
}

export default Home;