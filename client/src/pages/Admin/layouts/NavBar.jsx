import DashBoardICon from "../../../../src/assets/dashboard.svg";
import PersonICon from "../../../../src/assets/person.svg";
import PersonChecker from "../../../../src/assets/person-check-svgrepo-com.svg";
import Booker from "../../../../src/assets/booker.svg";

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";



const NavBar = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  let menuBar = []

  if (user.isBooker === true) {
    menuBar = [
      {
          name: 'Trang Chủ',
          path: '/booker-dashboard', 
          icon: DashBoardICon
      },
      {
        name: 'Accept Booking',
        path: '/accept-booking',  
        icon: Booker
    },
  ]
  }

  if (user.isAdmin === true) {
    menuBar = [
      {
          name: 'Trang Chủ',
          path: '/admin-dashboard', 
          icon: DashBoardICon
      },
      {
          name: 'Quản Lí Căn Hộ',
          path: '/admin-room',    
          icon: DashBoardICon
      },
      {
          name: 'Quản Lí Người Dùng',
          path: '/admin-user',  
          icon: PersonICon
    },
    {
      name: 'Duyệt Booker',
      path: '/admin-booker',  
      icon: PersonChecker
      },
      {
        name: 'Danh Sách Các Hợp Đồng',
        path: '/list-accept-booking',  
        icon: Booker
        },
  
  ]
  }

    return (
<div className="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-blue-900 dark:bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar">
            <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
              <ul className="flex flex-col py-4 space-y-1">
                <li className="px-5 hidden md:block">
                  <div className="flex flex-row items-center h-8">
                    <div className="text-sm font-light tracking-wide text-gray-400 uppercase">Main</div>
                  </div>
                    </li>
                    
                    {
                        menuBar.map((item, index) => (
                            <li key={index}>
                  <Link to={item.path} className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6 ${location.path == item.path ? `bg-red` : ``}`}>
                    <span className="inline-flex justify-center items-center ml-4">
                      <img className="h-5 text-white-600 hover:text-white-800" src={item.icon} alt="" />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">{item.name}</span>
                  </Link>
                </li>

                        ))
                }

              </ul>
              <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">Copyright @2023</p>
            </div>
          </div>
    )
}

export default NavBar