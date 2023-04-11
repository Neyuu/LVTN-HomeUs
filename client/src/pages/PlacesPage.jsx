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
           <Popover content={content} title="Thông báo" trigger="hover">
                <Button onClick={()=>confirmCoin(place.dateCurrent, place._id)}>Xác nhận</Button>
              </Popover>
       )
     }
      </>
    )
  }

  return (
    <div>
      <AccountNav />
      <div className="mt-8 py-4 px-8 flex flex-col min-h-screen max-w-6xl mx-auto">
      <div className="text-center">
          <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
            </svg>
            Thêm Căn Hộ
          </Link>
        </div>
        <div className="mt-4">
          {places.length > 0 && places.map(place => (
            <div className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl my-5 relative">
              <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                <PlaceImg place={place} />
              </div>
              <div className="grow-0 shrink">
                <h2 onClick={()=> handleRedirect(place._id)} className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
              </div>
              {
                checkTime(place)
              }
            </div>
          ))}
        </div>
      </div>
        
    </div>
  );
}