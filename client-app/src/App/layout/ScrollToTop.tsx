import  { useEffect } from "react";
import { useLocation, withRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";

 const ScrollToTop =({children}:any)=> {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children;
}
export default withRouter(observer(ScrollToTop));