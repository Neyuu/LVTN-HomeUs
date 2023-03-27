import Header from "./Header";
import {Outlet} from "react-router-dom";
import { useLocation } from 'react-router-dom';

export default function Layout() {

  const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));

  const usePathname = useLocation().pathname;

  return (
    <div>
      { !isAdmin && <Header />}
      <div className={usePathname==="/"?"":"py-4 px-8 flex flex-col min-h-screen max-w-6xl mx-auto"}>
        <Outlet />
      </div>
    </div>
    
    
  );
}
