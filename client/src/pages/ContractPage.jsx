import AccountNav from "../AccountNav";
import {useEffect, useState} from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import {differenceInCalendarDays, format} from "date-fns";
import {Link} from "react-router-dom";
import BookingDates from "../BookingDates";

export default function BookingsPage() {
  const [bookings,setBookings] = useState([]);
  useEffect(() => {
    axios.get('/bookings/receipt').then(response => {
      setBookings(response.data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div className="py-4 px-8 flex flex-col min-h-screen max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {bookings?.length > 0 && bookings.map(booking => (
            <Link to={`/account/bookings-contract/${booking._id}`} className="grid grid-cols-3 gap-4 border shadow rounded-2xl overflow-hidden transition duration-300 ease-in-out hover:scale-105">
              <div className="">
                <PlaceImg place={booking.place} />
              </div>
              <div className="col-span-2 py-3 pr-3 grow">
                <h2 className="truncate text-xl">{booking.place.title}</h2>
                <div className="text-xl">
                  <BookingDates booking={booking} className="my-2 text-gray-500" />
                  <div className="flex gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                    </svg>
                    <span className="text-2xl">
                      Tổng Giá: {booking.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {bookings.length == 0 &&
          <div className="mt-16 mx-auto">
            <div class="mb-8 text-center text-gray-500 text-xl font-semibold tracking-tight leading-none md:text-2xl lg:text-3xl"><i class="fa-solid fa-file-signature fa-2xl"></i></div>
            <div class="mb-8 text-center text-gray-500 text-xl font-semibold tracking-tight leading-none md:text-2xl lg:text-3xl">Bạn chưa có hợp đồng nào.</div>
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