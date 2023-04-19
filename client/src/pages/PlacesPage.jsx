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
      <div className="py-4 px-8 flex flex-col min-h-screen max-w-6xl mx-auto">
      <div className="text-center">
          <Link className="gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
          <i class="fa-solid fa-house-medical fa-lg mr-2"></i>
            Thêm Căn Hộ
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mt-4">
          {places.length > 0 && places.map(place => (
            <div className="grid grid-cols-3 gap-4 border shadow rounded-2xl overflow-hidden transition duration-300 ease-in-out hover:scale-105">
              <div className="">
                <PlaceImg place={place} />
              </div>
              <div className="col-span-2 py-3 pr-3 grow">
                <h2 onClick={()=> handleRedirect(place._id)} className="truncate text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
                {
                  checkTime(place)
                }
              </div>
            </div>
          ))}
        </div>
      </div>
        
    </div>
  );
}