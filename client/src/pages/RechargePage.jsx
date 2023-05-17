import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext.jsx";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";
import { toast } from "react-toastify";
import { PayPalButton } from "react-paypal-button-v2";
import { Space, Table, Tag, Descriptions, Typography, Col, Divider, Row } from 'antd';
import support from "../assets/support.png";

export default function ProfilePage() {
  const { Title } = Typography;
  
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  const [price, setPrice] = useState("");
  const [profile, setProfile] = useState({
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    name: '',
    email: '',
    address: '',
    phone: '',
    cmnd: '',
    issuedBy: '',
    dateEx: '',
  })
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
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

  const onChangeInput = (key, value) => {
    setProfile({
      ...profile,
      [key] : value
    })
  }

  const addInvoice = (cPrice , balanceCoin) => {
    const bodyy = {
      name: user.name,
      idUser:user._id,
      coin: Number(cPrice) + Number(balanceCoin),
      note: 'Nộp tiền',
      status:'Thành công',
      type:'User nạp tiền ví Paypal'
    };
    try {
      const res = axios.post("/invoice", {...bodyy});
    } catch (error) {
      
    }
  }

  const successPaymentHandler = async (paymentResult) => {
    const cPrice = Number(price) * 23000;

    try {
      const res = await axios.put(`/update-coin/${user._id}`,{balanceCoin: Number(cPrice) + Number(user.balanceCoin) ?? 0});
      if (res.status === 200) {
        setPrice('');
        toast.success('Tăng số coin thành công');
        addInvoice(cPrice , user.balanceCoin)
      }
    } catch (error) {
      
    }

};
  
  const handleUpdateProfile = async() => {
    try {
      const params = {
        ...profile
      }
      const res = await axios.put(`/update-profile/${user._id}`, params);
      if (res.status === 200) {
        toast.success('Cập nhật thông tin thành công')
      }
    } catch (error) {
      
    }
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }


  const handlePriceChange = (e) => {
    const inputVal = e.target.value;

  // Only allow numeric characters, decimal point, and up to two decimal places
  const regex = /^([1-9][0-9]*|0)(\.[0-9]{1,2})?$/;

  if (inputVal === "") {
    setPrice(""); // clear price state when input is empty
  } else if (regex.test(inputVal)) {
    setPrice(inputVal);
  }
  };

  return (
    <div>
      <AccountNav />
      <div className="py-4 px-8 flex flex-col min-h-screen max-w-6xl mx-auto">
        {subpage === "profile" && (
          <>
            <div className="mb-4 sm:mt-0">
              <div className="md:grid"> 
                <h1 class="mb-4 text-2xl font-semibold tracking-tight leading-none dark:text-white">Nạp tiền bằng ví Paypal</h1>
                <div className="flex justify-center items-center" style={{ width: '300px' }}>
                <input
                    placeholder="Nhập số tiền cần nạp"
                    type="text"
                    value={price}
                    onChange={handlePriceChange}
                    className="mt-1 ml-2 mr-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                  /> $
                  {
                    price && (
                      <PayPalButton amount={price} onSuccess={successPaymentHandler} options={{ 
                        clientId:'AaiOR0UuKrkTaDWKtlae81PRr3enX2RBcxrcpX39uHH2VJy1ntxfIu3LuU8wOgey8oHm4SzH3cwqM5N5'
                      }} />
                    )
                  }
                </div>
              </div>
            </div>
          </>
        )}
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-100">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-slate-900 text-base"
                >
                  Dollar ($)
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-slate-900 text-base"
                >
                  VNĐ
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-slate-900 text-base"
                >
                  Khuyến mãi (VNĐ)
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-slate-900 text-base"
                >
                  Tổng tiền
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100 text-slate-700 font-normal text-base">
              <tr className="hover:bg-slate-50 cursor-pointer">
                <td className="whitespace-nowrap px-6 py-4 font-normal text-base">1
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-normal text-base">23.000
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-normal text-base">0
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-normal text-base">23.000
                </td>
              </tr>
              <tr className="hover:bg-slate-50 cursor-pointer">
                <td className="whitespace-nowrap px-6 py-4 font-normal text-base">10
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-normal text-base">230.000
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-normal text-base">10.000
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-normal text-base">240.000
                </td>
              </tr>
              <tr className="hover:bg-slate-50 cursor-pointer">
                <td className="whitespace-nowrap px-6 py-4 font-normal text-base">20
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-normal text-base">460.000
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-normal text-base">25.000
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-normal text-base">485.000
                </td>
              </tr>
              <tr className="hover:bg-slate-50 cursor-pointer">
                <td className="whitespace-nowrap px-6 py-4 font-normal text-base">30
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-normal text-base">690.000
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-normal text-base">60.000
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-normal text-base">750.000
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <section className="mx-5 section section-support" style={{ textAlign: 'center', justifyContent: 'center' }}>
          <Title level={3}>Liên hệ với chúng tôi nếu bạn cần hỗ trợ</Title>
          <img className="center" src={support} alt="support" />
          <Row className="my-10">
              <Col span={6}>
                  <span class="support-item-title">Hỗ trợ đăng tin 1</span>
                  <a className="support-item" rel="nofollow" href="tel:0937497677">Điện thoại: 0937497677</a>
                  <a className="support-item" rel="nofollow" href="https://zalo.me/0937497677">Zalo: 0937497677</a>
              </Col>
              <Col span={6}>
                  <span class="support-item-title">Hỗ trợ đăng tin 2</span>
                  <a className="support-item" rel="nofollow" href="tel:0937497677">Điện thoại: 0937497677</a>
                  <a className="support-item" rel="nofollow" href="https://zalo.me/0937497677">Zalo: 0937497677</a>
              </Col>
              <Col span={6}>
                  <span class="support-item-title">Giao dịch trực tiếp 1</span>
                  <a className="support-item" rel="nofollow" href="tel:0937497677">Điện thoại: 0937497677</a>
                  <p className="support-item">MM4 Trường Sơn P15 Q10 TPHCM</p>
              </Col>
              <Col span={6}>
                  <span class="support-item-title">Giao dịch trực tiếp 2</span>
                  <a className="support-item" rel="nofollow" href="tel:0937497677">Điện thoại: 0937497677</a>
                  <a className="support-item" rel="nofollow" href="https://zalo.me/0937497677">Zalo: 0937497677</a>
              </Col>
          </Row>
      </section>
      </div>
      
    </div>
  );
}
