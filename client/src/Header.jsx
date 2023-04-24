import {Link, useNavigate, useLocation} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext.jsx";
import axios from "axios";
import React from 'react';
import { Dropdown, Space } from 'antd';
export default function Header() {
  const [redirect, setRedirect] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const usePathname = useLocation().pathname;
  const navigate = useNavigate();

  const refresh = () => window.location.reload(true)

  const [profile, setProfile] = useState({
  })

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  useEffect(() => {
    fetch();
  },[])

  const fetch = async () => {
    const res = await axios.get("/profile-show");
    if (res.status === 200) {
          setProfile({
      avatar: res.data.avatar,
      name: res.data.name,
      email: res.data.email,
      address: res.data.address,
      phone: res.data.phone,
      cmnd: res.data.cmnd,
      issuedBy: res.data.issuedBy,
      dateEx: res.data.dateEx,
    })
    }
  }

  const items = [
    {
      key: '0',
      label: (
        <Link to={'/account'} className="font-bold capitalize">
          {user?.name}
        </Link>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: (
        <Link to={'/account/bookings'}>
          Nhà thuê đã đặt
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link to={'/account/places'}>
          Nhà thuê của tôi
        </Link>
      ),
    },
    {
      key: '4',
      label: (
        <Link to={'/account/contract'}>
          Hợp đồng của tôi
        </Link>
      ),
    },
    {
      key: '5',
      label: (
        <Link to={'/account'}>
          Nhà thuê yêu thích
        </Link>
      ),
    },
    {
      key: '6',
      label: (
        <Link to={'/account'}>
          Chuyên viên của tôi
        </Link>
      ),
    },
    {
      key: '7',
      label: (
        <Link to={'/account'}>
          Lịch sử nạp tiền
        </Link>
      ),
    },
    {
      key: '8',
      label: (
        <Link to={'/account'}>
          Lịch sử thanh toán
        </Link>
      ),
    },
    
    {
      type: 'divider',
    },
    {
      key: '10',
      label: (
        <div onClick={() => { logout(); refresh();}} className="font-bold text-red-600">
          Đăng xuất
        </div>
      ),
    },
  ];

  return (
    <>
      <header>
        <nav class={usePathname==="/"?"container absolute left-2/4 z-30 mx-auto -translate-x-2/4 p-4 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800":"p-4 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800"}>
            <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <Link to={'/'} className="flex items-center">
                  <span className={usePathname==="/"?"self-center text-xl font-semibold whitespace-nowrap text-white dark:text-white":"self-center text-xl font-semibold whitespace-nowrap dark:text-white"}>HomeUs</span>
                </Link>
                <div class="flex items-center lg:order-2">
                    {
                      user
                      ? <>
                      <Dropdown menu={{ items }} placement="bottom" arrow>
                        <a onClick={(e) => e.preventDefault()}>
                          <Space>
                            <div>
                              <img class="w-10 h-10 mr-5 rounded-full" src={profile?.avatar} alt="Rounded avatar"/>
                            </div>
                          </Space>
                        </a>
                      </Dropdown>
                      <div className="font-bold mr-4">
                          {user.balanceCoin} đ
                      </div>
                      </>
                      : <Link to={user?'/account/places/new':'/login'} class={usePathname==="/"?"text-white hover:text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800":"text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"}>Đăng nhập</Link>
                    }
                    <Link to={user?'/account/places/new':'/login'} class="text-white bg-indigo-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Đăng tin</Link>
                    <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                        <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                    <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        <li>
                            <Link to={"/"} class={usePathname==="/"?"block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 text-white":"block py-2 pr-4 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"} aria-current="page">Trang chủ</Link>
                        </li>
                        <li>
                            <a href="#" class={usePathname==="/"?"block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 text-white":"block py-2 pr-4 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"} aria-current="page">Cho thuê</a>
                        </li>
                        <li>
                            <a href="#" class={usePathname==="/"?"block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 text-white":"block py-2 pr-4 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"} aria-current="page">Nạp tiền</a>
                        </li>
                        <li>
                            <a href="#" class={usePathname==="/"?"block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 text-white":"block py-2 pr-4 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"} aria-current="page">Hướng dẫn</a>
                        </li>
                        <li>
                            <div onClick={() => navigate('/compare-room')} class={usePathname==="/"?"cursor-pointer block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 text-white":"cursor-pointer block py-2 pr-4 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"} aria-current="page">So sánh các phòng</div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
      </header>
      <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
      {/* <header className="flex justify-between">
        <Link to={'/'} className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 -rotate-90">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
          <span className="font-bold text-xl">Booking</span>
        </Link>
        <div onClick={() => navigate('/compare-room')} className="cursor-pointer flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
          <div>So Sánh Các Phòng</div>
          <div className="border-l border-gray-300"></div>
          <button className="bg-primary text-white p-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </div>
        <Link to={user?'/account':'/login'} className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>
          </div>
          {!!user && (
            <>
            <div>
              {user.name}
            </div>
            <div className="font-bold">
                {user.balanceCoin} COIN
            </div>
            </>
          )}
        </Link>
      </header> */}
    </>
    
  );
}