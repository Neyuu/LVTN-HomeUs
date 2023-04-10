import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";
import { showStatus } from "../util/util";
import { Link } from "react-router-dom";

export default function BookingPage() {
  const {id} = useParams();
  const [booking,setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get('/bookings').then(response => {
        const foundBooking = response.data.find(({_id}) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return '';
  }

  return (
    <div className="my-8 py-4 px-8 flex flex-col min-h-screen max-w-6xl mx-auto">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">THÔNG TIN HỢP ĐỒNG :</h2>
          {
            booking.typeOption === 'shortTerm' ? (
              <BookingDates booking={booking} />
            ) : (
                <>
                 <h3 className="font-bold uppercase">Gói Dài Hạn</h3>
                  <p>Bắt đầu từ ngày <b>{booking?.place?.packageLong?.longPackageDate}</b></p>
                </>
            )
          }
        </div>
        <div className="bg-green-600 p-6 text-white rounded-2xl">
          {showStatus(booking.status)}           
          <div className="underline uppercase">
          {
            booking.status === 'done' && (
              <Link to={`/contact/${booking?.place?.owner}`}>Vui Lòng Liên Hệ Người Cho Thuê</Link>
            )
          }
          </div>
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>Tổng tiền</div>
          <div className="text-3xl">{booking.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>    
  );
}