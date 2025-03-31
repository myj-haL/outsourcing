import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

function Layouts ({children}) {
  return (
    <div className="wrap">
      <Header />
      <Body>{children}</Body>
      <Footer />
    </div>
  )
}

export default Layouts;