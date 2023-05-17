import {Link, useParams} from "react-router-dom";
import AccountNav from "../AccountNav";
import {useEffect, useState} from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { Button, Popover } from 'antd';
import { useContext,  } from "react";
import { UserContext } from "../UserContext";
import { toast } from "react-toastify";
import { PayPalButton } from "react-paypal-button-v2";
import { useNavigate } from "react-router-dom";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const { ready, user, setUser } = useContext(UserContext);
  const [sdk, setSdk] = useState(false);
  const [loader, setLoader] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);
  const [idNe, setId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
     axios.get('/user-places').then(({data}) => {
      setPlaces(data);
    });
  }

  const successPaymentHandler = async (paymentResult) => {
      const res = await axios.put(`/add-to-time-expried/${idNe}`, {
        isExpired: false,
        dateCurrent: Date.now(),
        idUser: user._id,
        balance: user.balanceCoin
      })
      if (res.status === 200) {
        toast.success('Gia hạn thành công');
        fetch();
        setLoader(false);
      }
  };

  const confirmCoin = async (coin, id) => {

    if (user && user.balanceCoin < 100) {
      toast.error('Số Dư Không Đủ Vui Lòng Nạp Thêm Tiền');
      return;
    } else {
      const res = await axios.put(`/add-to-time-expried/${id}`, {
        isExpired: false,
        dateCurrent: Date.now(),
        idUser: user._id,
        balance: user.balanceCoin
      })
      if (res.status === 200) {
        toast.success('Gia hạn thành công');
        fetch();
        setLoader(false);
      }
    }
  }

  const confirmVip = async (coin, id) => {

    if (user && user.balanceCoin < 300) {
      toast.error('Số Dư Không Đủ Vui Lòng Nạp Thêm Tiền');
      return;
    }
    else {
      const res = await axios.put(`/add-to-time-expried-vip/${id}`, {
        isVip: false,
        dateCurrent: Date.now(),
        idUser: user._id,
        balance: user.balanceCoin
      })
      if (res.status === 200) {
        toast.success('Gia hạn thành công');
        fetch();
        setLoader(false);
      }
}
  }

  const content = (
    <div>
      <p>Bài viết của bạn hết hạn xuất hiện vui lòng nộp thêm tiền để hiển thị lên</p>
      <p>Giá để hiển thị gói thường: <b>100 </b>đ/tuần</p>
    </div>
  );

  const contentVIP = (
    <div>
      <p>Bài viết của bạn hết hạn xuất hiện vui lòng nộp thêm tiền để hiển thị lên</p>
      <p>Giá để hiển thị gói nâng cao: <b>300 </b>đ/tuần</p>
    </div>
  );

  const handleRedirect = (id) => {
    navigate('/account/places/'+id, {place:true})
  }

  const checkTime = (place) => {
    return (
      <>
      {
        (!place.isExpired) ? (
          <></>
        ): (
          <div className="mb-3">
            <span className="mr-3 text-l font-semibold tracking-tight text-gray-900 dark:text-white">Gia hạn</span>
            <Popover content={content} title="Thông báo" trigger="hover">
              <Button onClick={() => confirmCoin(place.dateCurrent, place._id)} className="mr-3 text-violet-600 border border-violet-600">Tin thường</Button>
            </Popover>
            <Popover content={contentVIP} title="Thông báo" trigger="hover">
              <Button onClick={() => confirmVip(place.dateCurrent, place._id)} className="text-pink-600 border border-pink-600">Tin nâng cao</Button>
            </Popover>
          </div>          
       )
     }
      </>
    )
  }

  return (
    <div>
      <AccountNav />
      <div className="px-8 flex flex-col min-h-screen max-w-6xl mx-auto">
        
        <div className="mt-4 space-y-8 space-x-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:space-y-0 md:space-x-0">
          {places.length > 0 && places.map(place => (
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl">
              <img onClick={()=> handleRedirect(place._id)} class="cursor-pointer rounded-t-lg w-full h-64 bg-cover bg-center" src={'http://localhost:4000/'+place.photos?.[0]} alt="" />
              <div onClick={()=> handleRedirect(place._id)} class="cursor-pointer px-5 py-3">
                <div class="flex items-center justify-between">
                  <div>
                    <span class="text-2xl font-bold text-gray-900 dark:text-white">{(place.packageLong.price/1000000).toFixed(0)}</span><span class="text-xl font-bold text-gray-900 dark:text-white"> tr/tháng</span>
                  </div>
                  <div>
                    <span class="mr-5 text-l font-semibold text-gray-900 dark:text-white"><i class="fa-solid fa-bed mr-2"></i>{place.numberBed}</span>
                    <span class="text-l font-semibold text-gray-900 dark:text-white"><i class="fa-solid fa-table-cells mr-2"></i>{place.areas}m<sup>2</sup></span>
                  </div>
                </div>
                <h3 class="truncate text-l font-semibold tracking-tight text-gray-900 dark:text-white">{place.title}</h3>
                <p class="truncate font-normal text-gray-700 dark:text-gray-400">{place.address}</p>
              </div>
              <div class="px-5">
                <div class="flex items-center justify-between">
                  {
                    checkTime(place)
                  }
                </div>                
              </div>
            </div>
          ))}
        </div>
        {places.length == 0 &&
          <div className="mt-16 mx-auto">
            <div class="mb-8 text-center text-gray-500 text-xl font-semibold tracking-tight leading-none md:text-2xl lg:text-3xl"><i class="fa-solid fa-house fa-2xl"></i></div>
            <div class="mb-8 text-center text-gray-500 text-xl font-semibold tracking-tight leading-none md:text-2xl lg:text-3xl">Bạn chưa có nhà thuê nào.</div>
            <div className="text-center">
              <Link to="/account/places/new" className="px-12 bg-indigo-600 rounded-lg hover:bg-indigo-500 text-white font-semibold py-3">
                Đăng tin
              </Link>
            </div>
          </div>
        }
      </div>
        
    </div>
  );
}