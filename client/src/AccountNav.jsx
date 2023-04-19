import {Link, useLocation} from "react-router-dom";

export default function AccountNav() {
  const {pathname} = useLocation();
  let subpage = pathname.split('/')?.[2];
  if (subpage === undefined) {
    subpage = 'profile';
  }
  function linkClasses (type=null) {
    let classes = " text-gray-800 font-medium text-sm px-2 lg:px-3 py-2 lg:py-2.5 focus:outline-none";
    if (type === subpage) {
      classes += ' border-b-2 border-gray-600';
    } else {
      // classes += ' bg-gray-200';
    }
    return classes;
  }
  return (
    <>
    <header>
      <nav class="p-4 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
              <div class="flex items-center lg:order-2">
                  <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                      <span class="sr-only">Open main menu</span>
                      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                      <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </button>
              </div>
              <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                  <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-4 lg:mt-0">
                      <li>
                          <Link to={"/account"} class={linkClasses('profile')}>Tài khoản của tôi</Link>
                      </li>
                      <li>
                          <Link to={"/account/bookings"} class={linkClasses('bookings')}>Nhà thuê đã đặt</Link>
                      </li>
                      <li>
                          <Link to={"/account/places"} class={linkClasses('places')}>Nhà thuê của tôi</Link>
                      </li>
                      <li>
                          <Link to={"/account/contract"} class={linkClasses('contract')}>Hợp đồng của tôi</Link>
                      </li>
                      <li>
                          <Link to={"/account"} class="text-gray-800 font-medium text-sm px-2 lg:px-3 py-2 lg:py-2.5 focus:outline-none" aria-current="page">Nhà thuê yêu thích</Link>
                      </li>
                      <li>
                          <Link to={"/account"} class="text-gray-800 font-medium text-sm px-2 lg:px-3 py-2 lg:py-2.5 focus:outline-none" aria-current="page">Chuyên viên yêu thích</Link>
                      </li>
                      <li>
                          <Link to={"/account"} class="text-gray-800 font-medium text-sm px-2 lg:px-3 py-2 lg:py-2.5 focus:outline-none" aria-current="page">Nạp tiền</Link>
                      </li>
                      <li>
                          <Link to={"/account"} class="text-gray-800 font-medium text-sm px-2 lg:px-3 py-2 lg:py-2.5 focus:outline-none" aria-current="page">Thanh toán</Link>
                      </li>
                      {/* <li>
                          <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Team</a>
                      </li>
                      <li>
                          <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                      </li> */}
                  </ul>
              </div>
          </div>
      </nav>
    </header>
    <hr class="mb-8 h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
    </>
  );
  return (
    <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
      <Link className={linkClasses('profile')} to={'/account'}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
        Trang Cá Nhân
      </Link>
      <Link className={linkClasses('bookings')} to={'/account/bookings'}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
        Danh Sách Căn Hộ Đã Đặt
      </Link>
      <Link className={linkClasses('places')} to={'/account/places'}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
        </svg>
        Danh Sách Của Tôi
      </Link>
      <Link className={linkClasses('contract')} to={'/account/contract'}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
        </svg>
        Danh Sách Các Hợp đồng
      </Link>
    </nav>
  );
}