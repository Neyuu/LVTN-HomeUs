import './App.css'
import {Route, Routes} from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import {UserContextProvider} from "./UserContext";
import ProfilePage from "./pages/ProfilePage.jsx";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacePage from "./pages/PlacePage";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";
import ProtectedRoute from "../src/ProtectRoute"
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminRoom from './pages/Admin/AdminRoom';
import AdminUser from './pages/Admin/AdminUser';
import BookingSuccess from './pages/BookingSuccess';
import SearchPage from './pages/SearchPage';
import PriceTablePage from './pages/PriceTablePage';
import RechargePage from './pages/RechargePage';
import IndexRechargePage from './pages/IndexRechargePage';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDetailRoom from './pages/Admin/AdminDetailRoom';
import AdminPersonChecker from './pages/Admin/AdminPersonChecker';
import AdminBookerDetail from './pages/Admin/AdminBookerDetail';
import BookerProfile from './pages/BookerProfile';
import AcceptBooking from './pages/Booker/AcceptBooking';
import DetailBooking from './pages/Booker/DetailBooking';
import TemplateBooking from './pages/Booker/TemplateBooking';
import ListAcceptBooking from './pages/Admin/ListAcceptBooking';
import Contact from './pages/Contact';
import Room from './pages/Room';
import ContractPage from './pages/ContractPage';
import ContractOK from './pages/ContractOk';
import ListInvoice from './pages/Admin/ListInvoice';


axios.defaults.baseURL = 'http://127.0.0.1:4000';
axios.defaults.withCredentials = true;

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <UserContextProvider>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
        
        
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/search/:text" element={<SearchPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/contract" element={<ContractPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings-contract/:id" element={<ContractOK />} />          
          <Route path="/account/bookings/:id" element={<BookingPage />} />          
          <Route path="/account/profile/:id" element={<BookerProfile />} />          
          <Route path="/booking-success" element={<BookingSuccess />} />          
          <Route path="/contact/:id" element={<Contact />} />          
          <Route path="/compare-room" element={<Room />} />          
          <Route path="/price-table" element={<PriceTablePage />} />      
          <Route path="/account/recharge" element={<RechargePage/>} />    
          <Route path="/recharge" element={<IndexRechargePage/>} />  
        </Route>
        <Route element={<ProtectedRoute user={user?.isAdmin || false} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-room" element={<AdminRoom />} />
          <Route path="/list-accept-booking" element={<ListAcceptBooking />} />
          <Route path="/admin-user" element={<AdminUser />} />
          <Route path="/admin-booker-detail/:id" element={<AdminBookerDetail />} />
          <Route path="/admin-booker" element={<AdminPersonChecker />} />
          <Route path="/admin-room/:id" element={<AdminDetailRoom />} />
          <Route path="/list-invoice" element={<ListInvoice />} />
        </Route>
        <Route element={<ProtectedRoute user={user?.isBooker || false} />}>
          <Route path="/booker-dashboard" element={<AdminDashboard />} />         
          <Route path="/accept-booking" element={<AcceptBooking />} />         
          <Route path="/template-booking/:id" element={<TemplateBooking />} />         
          <Route path="/detail-booking/:id" element={<DetailBooking />} />         
          </Route>
      </Routes>
      <ToastContainer />
    </UserContextProvider>
  )
}

export default App
