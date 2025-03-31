import { useEffect, useState } from "react";

function useResponsive () {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeWidth = () => {
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener('resize', resizeWidth);

    resizeWidth(); 
    return () => {
      window.removeEventListener('resize', resizeWidth);
    };
  }, []);
  
  return innerWidth;
}

export default useResponsive;