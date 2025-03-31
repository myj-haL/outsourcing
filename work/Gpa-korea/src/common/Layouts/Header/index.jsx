import useResponsive from "../../hooks/Responsive";
// import style from "./index.module.css";
import MobileHeader from "./MobileHeader";
import PcHeader from "./PcHeader";

function Header () {
  const innerWidth = useResponsive();

  return (
    <header>
      {innerWidth >= 1024 ? 
      <PcHeader /> : 
      <MobileHeader />
      }
    </header>
  )
}

export default Header;