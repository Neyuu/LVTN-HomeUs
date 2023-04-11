import Header from "./Header";
import Footer from "./Footer";
import {Outlet} from "react-router-dom";
import { useLocation } from 'react-router-dom';

export default function Layout() {

  const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));

  const usePathname = useLocation().pathname;

  return (
    <div>
      { !isAdmin && <Header />}
      <div className="">
        <Outlet />
      </div>
      { !isAdmin && <Footer />}

    </div>
    
    
  );
}