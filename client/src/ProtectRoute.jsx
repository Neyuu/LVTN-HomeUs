import {
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
} from 'react-router-dom';
// import Header from './pages/Admin/layouts/Header';
// import NavBar from "./pages/Admin/layouts/NavBar";
import { useNavigate } from "react-router-dom";
import { HomeOutlined, TeamOutlined, SolutionOutlined, DashboardOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Dropdown, Space } from 'antd';
import React from 'react';
const { Header, Content, Footer, Sider } = Layout;
import axios from "axios";

const ProtectedRoute = ({ user, redirectPath = '/' }) => {
// if (!user) {
//   return <Navigate to={redirectPath} replace />;
// }
const refresh = () => window.location.reload(true)

const navigate = useNavigate();
const logOut = async() => {
  await axios.post('/logout');
  const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
  if (isAdmin) {
    localStorage.removeItem('isAdmin');
  }
  navigate(`/login`, {replace:true});
  refresh();
}

const userr = JSON.parse(localStorage.getItem('user'));

let menuBar = []

if (userr.isBooker === true) {
  menuBar = [
    {
        name: 'Trang Chủ',
        path: '/booker-dashboard', 
        icon: DashboardOutlined
    },
    {
      name: 'Accept Booking',
      path: '/accept-booking',  
      icon: SolutionOutlined
    },
  ]
}

if (userr.isAdmin === true) {
  menuBar = [
    {
        name: 'Trang Chủ',
        path: '/admin-dashboard', 
        icon: DashboardOutlined
    },
    {
        name: 'Quản Lí Nhà Thuê',
        path: '/admin-room',    
        icon: HomeOutlined
    },
    {
        name: 'Quản Lí Người Dùng',
        path: '/admin-user',  
        icon: TeamOutlined
    },
    {
      name: 'Quản lý Chuyên Viên',
      path: '/admin-booker',  
      icon: TeamOutlined
    },
    {
      name: 'Danh Sách Các Hợp Đồng',
      path: '/list-accept-booking',  
      icon: SolutionOutlined
    },
    {
      name: 'Lịch sử nạp tiền',
      path: '/list-invoice',  
      icon: DollarCircleOutlined
    },
  ]
}

const items = [
  {
    key: '0',
    label: (
      <Link to={'/account'} className="font-bold capitalize">
        {
          (userr.isAdmin === true)
          ? 'Admin'
          : userr?.name
        }
      </Link>
    ),
  },    
  {
    type: 'divider',
  },
  {
    key: '10',
    label: (
      <button onClick={logOut} className="font-bold text-red-600 bg-transparent">
        Đăng xuất
      </button>
    ),
  },
];

const {
  token: { colorBgContainer },
} = theme.useToken();
return (
  <Layout>
    <Sider className='min-h-screen'
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="mx-16 my-4">
        <Link to={'/'} className='text-center text-xl font-semibold whitespace-nowrap text-white'>
          HomeUs
        </Link>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={
          menuBar.map((item, index) => (
            {
              key: String(index + 1),
              icon: React.createElement(item.icon),
              label: <Link to={item.path} className='font-semibold'>
                {item.name}
              </Link>
            }
          ))
        }
      />
    </Sider>
    <Layout>
      <header style={{
            background: colorBgContainer,
          }}>
        <nav class="p-4 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
            <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">                  
                <div class="flex items-center lg:order-2">
                <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      {
                        (userr.isAdmin === true)
                        ? <img class="w-10 h-10 rounded-full" src={`http://localhost:4000/` + userr?.avatar} alt="Rounded avatar"/>
                        : <img class="w-10 h-10 rounded-full" src={`http://localhost:4000/` + userr?.avatar} alt="Rounded avatar"/>
                      }
                    </Space>
                  </a>
                </Dropdown>
                </div>
                <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                    <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        
                    </ul>
                </div>
            </div>
        </nav>
      </header>
      <Content
        style={{
          margin: '24px 16px 0',
        }}
      >
        <Outlet/>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        © 2022 HomeUs. All Rights Reserved.
      </Footer>
    </Layout>
  </Layout>
);

  return (
    <div>
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
        {/* Header */}
        <Header/>
        {/* ./Header */}
        {/* Sidebar */}
          <NavBar/>
        {/* ./Sidebar */}
        <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
            <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoute