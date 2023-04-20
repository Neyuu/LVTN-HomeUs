import {Link, useParams} from "react-router-dom";
import AccountNav from "../AccountNav";
import {useEffect, useState} from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { Button, Popover } from 'antd';
import { useContext,  } from "react";
import { UserContext } from "../UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const { ready, user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
     axios.get('/user-places').then(({data}) => {
      setPlaces(data);
    });
  }

  const confirmCoin = async(coin, id) => {
    if (user && user.balanceCoin < 100) {
      toast.error('Số Dư Không Đủ Vui Lòng Nạp Thêm Tiền')
    }
    
    try {
      const res = await axios.put(`/add-to-time-expried/${id}`, {
        isExpired: false,
        dateCurrent: Date.now(),
        idUser: user._id,
        balance: user.balanceCoin
      })
      if (res.status === 200) {
        toast.success('Gia hạn thành công');
        fetch();
      }
    } catch (error) {
      
    }

  }

  console.log('====================================');
  console.log(user);
  console.log('====================================');

  const content = (
    <div>
      <p>Bài viết của bạn hết hạn xuất hiện vui lòng nộp thêm tiền để hiển thị lên</p>
      <p>Giá để hiển thị : <b>100</b>coin</p>
      <p>Tiến hành nộp tiền qua STK: 000000000</p>
      <p>Ngân Hàng: VCB</p>
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
          <div className="pb-5">
            <Popover content={content} title="Thông báo" trigger="hover">
              <Button onClick={()=>confirmCoin(place.dateCurrent, place._id)}>Xác nhận</Button>
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
      <div className="py-4 px-8 flex flex-col min-h-screen max-w-6xl mx-auto">
      <div className="text-center">
          <Link className="gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
          <i class="fa-solid fa-house-medical fa-lg mr-2"></i>
            Thêm Căn Hộ
          </Link>
        </div>
        <div className="mt-8 space-y-8 space-x-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:space-y-0 md:space-x-0">
          {places.length > 0 && places.map(place => (
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl transition duration-300 ease-in-out hover:scale-105">
              <img onClick={()=> handleRedirect(place._id)} class="cursor-pointer rounded-t-lg w-full h-64 bg-cover bg-center" src={'http://localhost:4000/'+place.photos?.[0]} alt="" />
              <div onClick={()=> handleRedirect(place._id)} class="cursor-pointer p-5">
                <div class="flex items-center justify-between">
                  <div>
                    <span class="text-2xl font-bold text-gray-900 dark:text-white">{place.price}</span><span class="text-xl font-bold text-gray-900 dark:text-white"> tr/tháng</span>
                  </div>
                  <div>
                    <span class="mr-5 text-l font-semibold text-gray-900 dark:text-white"><i class="fa-solid fa-bed mr-2"></i>1</span>
                    <span class="text-l font-semibold text-gray-900 dark:text-white"><i class="fa-solid fa-table-cells mr-2"></i>50m<sup>2</sup></span>
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
            // <div className="grid grid-cols-3 gap-4 border shadow rounded-2xl overflow-hidden transition duration-300 ease-in-out hover:scale-105">
            //   <div className="">
            //     <PlaceImg place={place} />
            //   </div>
            //   <div className="col-span-2 py-3 pr-3 grow">
            //     <h2 onClick={()=> handleRedirect(place._id)} className="truncate text-xl">{place.title}</h2>
            //     <p className="text-sm mt-2">{place.description}</p>
            //     {
            //       checkTime(place)
            //     }
            //   </div>
            // </div>
          ))}
        </div>
      </div>
        
    </div>
  );
}