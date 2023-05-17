import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";
import { formatCurrentVND, typeOption } from "../util/util";
import { toast } from "react-toastify";
import { formatDate } from "../util/util";
import { isBefore, isAfter, differenceInCalendarDays } from "date-fns";
import { FacebookShareButton, FacebookIcon, EmailShareButton, EmailIcon } from "react-share"
import { UserContext } from "../UserContext";
import { useContext } from "react";
import { Checkbox, DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [optionChecking, setOptionChecking] = useState(); //longTerm, shortTerm
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [idUser, setIdUser] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [comment, setComment] = useState("");
  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIdUser(user._id);
    }
  }, [id]);

  if (!place) return "";

  let numberOfNights = 1;
  if (optionChecking === "shortTerm" && checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const bookingRoom = async () => {
    const fromDate = new Date(place?.packageShort.shortPackageDateStart);
    const endDate = new Date(place?.packageShort.shortPackageDateEnd);
    const checkInn = new Date(checkIn);
    const checkOutt = new Date(checkOut);

    if (!idUser) {
      navigate("/login", { replace: true });
    }

    if (optionChecking === "shortTerm") {
      if (isBefore(endDate, checkInn) || isBefore(endDate, checkOutt)) {
        toast.error("Vui lòng nhập đúng ngày trong kỳ hạn");
        return;
      }
    }

    const response = await axios.post("/bookings", {
      checkIn,
      checkOut,
      place: place._id,
      user: idUser,
      userMain: place?.owner,
      booker: place?.personBooker._id,
      typeOption: optionChecking,
      price: numberOfNights * price,
      numberOfNights: numberOfNights,
    });

    if (response.status === 200) {
      setPlace("");
      setOptionChecking("");
      setPrice("");
      setType("");
      setIdUser("");
      setCheckIn("");
      setCheckOut("");
      navigate("/booking-success", { replace: true });
    }
  };

  const handleRating = async () => {
    try {
      const res = await axios.post(`/add-comment/${id}`, {
        idUser: user,
        comment,
      });

      if (res.status === 200) {
        toast.success("Gửi thành công");
        axios.get(`/places/${id}`).then((response) => {
          setPlace(response.data);
        });
        setComment("")        
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-4 px-8 flex flex-col min-h-screen max-w-6xl mx-auto">
      <div className="md:grid md:grid-cols-5 gap-4 mb-4">
        <div className="md:col-span-4">
          <h1 class="text-3xl font-semibold tracking-tight leading-none">{place.title}</h1>
          <AddressLink>{place.address}</AddressLink>
          <span className="font-semibold mr-5 ml-1"><i class="fa-solid fa-dollar-sign mr-2"></i>{place?.packageLong.price/1000000} tr/tháng</span>
          <span className="font-semibold mr-5"><i class="fa-solid fa-bed mr-2"></i>{place?.numberBed}</span>
          <span className="font-semibold mr-5"><i class="fa-solid fa-table-cells mr-2"></i>{place?.areas}m<sup>2</sup></span>
        </div>
        <div className="float-right">
          <span class="float-right mb-4 bg-blue-100 text-blue-800 text-s font-medium mr-2 px-2.5 py-0.5 rounded-full border-2 border-blue-400">Sẵn sàng giao dịch</span>
          <div className="float-right">
            <button type="button" class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
              <i class="fa-regular fa-heart"></i>
            </button>
            <button type="button" class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
              <i class="fa-solid fa-plus"></i>
            </button>            
            <FacebookShareButton url="https://tailwindcss.com/docs/text-transform" quote="Title share blog" hashtag="#share">
              <button type="button" class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
                <i class="fa-brands fa-facebook"></i>
              </button>
            </FacebookShareButton>
            <EmailShareButton url="https://tailwindcss.com/docs/text-transform" quote="Title share blog" hashtag="#share">
              <button type="button" class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
                <i class="fa-solid fa-envelope"></i>
              </button>
            </EmailShareButton>
          </div>
        </div>
      </div>
      <PlaceGallery place={place} />
      <div className="mt-4 md:grid md:grid-cols-3 gap-16">
        <div className="col-span-2">
          <h2 className="my-4 font-semibold text-2xl">Tổng quan</h2>
          {place.description}
          <h2 className="my-4 font-semibold text-2xl">Thông tin cơ bản</h2>
          <div className="md:grid md:grid-cols-2 gap-x-8 gap-y-2">
            <div className="grid grid-cols-2 gap-2 border-b border-gray-400 border-dashed pb-2">
              <div>Loại hình</div>
              <div className="text-right font-bold">Căn hộ</div>
            </div>
            <div className="grid grid-cols-2 gap-2 border-b border-gray-400 border-dashed pb-2">
              <div>Diện tích</div>
              <div className="text-right font-bold">{place?.areas} m<sup>2</sup></div>
            </div>
            <div className="grid grid-cols-2 gap-2 border-b border-gray-400 border-dashed pb-2">
              <div>Phòng ngủ</div>
              <div className="text-right font-bold">{place?.numberBed}</div>
            </div>
            <div className="grid grid-cols-2 gap-2 border-b border-gray-400 border-dashed pb-2">
              <div>Phòng tắm</div>
              <div className="text-right font-bold">1</div>
            </div>
            <div className="grid grid-cols-2 gap-2 border-b border-gray-400 border-dashed pb-2">
              <div>Nội thất</div>
              <div className="text-right font-bold">Đầy đủ</div>
            </div>
            <div className="grid grid-cols-2 gap-2 border-b border-gray-400 border-dashed pb-2">
              <div>Tình trạng</div>
              <div className="text-right font-bold">Sẵn sàng</div>
            </div>
            <div className="grid grid-cols-2 gap-2 border-b border-gray-400 border-dashed pb-2">
              <div>Pháp lý</div>
              <div className="text-right font-bold">Đã xác thực</div>
            </div>
            <div className="grid grid-cols-2 gap-2 border-b border-gray-400 border-dashed pb-2">
              <div>Giá</div>
              <div className="text-right font-bold">{place?.packageLong.price/1000000} tr/tháng</div>
            </div>            
          </div>
          <h2 className="my-4 font-semibold text-2xl">Tiện nghi</h2>
          <div className="md:grid md:grid-cols-3 gap-x-8 gap-y-2">
            {place?.perks?.includes("wifi") && (
              <div><i class="fa-solid fa-wifi mr-2"></i>Wifi</div>
            )}
            {place?.perks?.includes("parking") && (
              <div><i class="fa-solid fa-square-parking fa-lg mr-2"></i>Bãi giữ xe</div>
            )}
            {place?.perks?.includes("tv") && (
              <div><i class="fa-solid fa-tv mr-2"></i>Tivi</div>
            )}
            {place?.perks?.includes("radio") && (
              <div><i class="fa-solid fa-radio mr-2"></i>Radio</div>
            )}
            {place?.perks?.includes("pets") && (
              <div><i class="fa-solid fa-dog fa-lg mr-2"></i>Thú cưng</div>
            )}
            {place?.perks?.includes("entrance") && (
              <div><i class="fa-solid fa-signs-post fa-lg mr-2"></i>Lối đi riêng</div>
            )}
          </div>
          <h2 className="my-4 font-semibold text-2xl">Dịch vụ cung cấp</h2>
          <div className="md:grid md:grid-cols-3 gap-x-8 gap-y-2">
            <div><i class="fa-solid fa-shirt mr-2"></i>Giặt đồ</div>
            <div><i class="fa-solid fa-dog fa-lg mr-2"></i>Dắt thú cưng đi dạo</div>
            <div><i class="fa-solid fa-utensils fa-lg mr-2"></i>Bữa sáng</div>
            <div><i class="fa-solid fa-face-laugh-squint mr-2"></i>Khu giải trí</div>
          </div>
          <h2 className="my-4 font-semibold text-2xl">Tiện ích khu vực</h2>
          <div className="md:grid md:grid-cols-2 gap-x-8 gap-y-2">
            <div>
              <div className="border-b border-gray-400 border-dashed pb-2 font-bold"><i class="fa-solid fa-school fa-xl mr-3"></i>Trường học</div>
              <div className="grid grid-cols-2 gap-2 py-2">
                <div>Địa điểm</div>
                <div className="text-right font-bold">50 km<sup>2</sup></div>
              </div>
            </div>
            <div>
              <div className="border-b border-gray-400 border-dashed pb-2 font-bold"><i class="fa-solid fa-hospital fa-xl mr-3"></i>Bệnh viện</div>
              <div className="grid grid-cols-2 gap-2 py-2">
                <div>Địa điểm</div>
                <div className="text-right font-bold">50 km<sup>2</sup></div>
              </div>
            </div>
            <div>
              <div className="border-b border-gray-400 border-dashed pb-2 font-bold"><i class="fa-solid fa-utensils fa-xl mr-3"></i>Ăn uống</div>
              <div className="grid grid-cols-2 gap-2 py-2">
                <div>Địa điểm</div>
                <div className="text-right font-bold">50 km<sup>2</sup></div>
              </div>
            </div>
            <div>
              <div className="border-b border-gray-400 border-dashed pb-2 font-bold"><i class="fa-solid fa-briefcase fa-xl mr-3"></i>Văn phòng</div>
              <div className="grid grid-cols-2 gap-2 py-2">
                <div>Địa điểm</div>
                <div className="text-right font-bold">50 km<sup>2</sup></div>
              </div>
            </div>
            <div>
              <div className="border-b border-gray-400 border-dashed pb-2 font-bold"><i class="fa-solid fa-face-laugh-squint fa-xl mr-3"></i>Giải trí</div>
              <div className="grid grid-cols-2 gap-2 py-2">
                <div>Địa điểm</div>
                <div className="text-right font-bold">50 km<sup>2</sup></div>
              </div>
            </div>
            <div>
              <div className="border-b border-gray-400 border-dashed pb-2 font-bold"><i class="fa-solid fa-cart-shopping fa-xl mr-3"></i>Mua sắm</div>
              <div className="grid grid-cols-2 gap-2 py-2">
                <div>Địa điểm</div>
                <div className="text-right font-bold">50 km<sup>2</sup></div>
              </div>
            </div>
            
          </div>
          <h2 className="my-4 font-semibold text-2xl">Đặt nhà</h2>
        </div>
        <div>          
          <div class="my-8 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div class="flex px-4 pt-4 font-bold">
                Liên hệ với
              </div>
              <div className="grid grid-cols-4 my-4 mx-4 flex flex-col items-center pb-4 border-b border-gray-400">
                <img class="w-16 h-16 rounded-full shadow-lg" src={`http://localhost:4000/`+place?.personBooker.avatar} alt="Bonnie image"/>
                <Link
                  className="block bg-white p-1 rounded-full col-span-3 "
                  to={`/account/profile/${place?.personBooker._id}`}
                >
                <h5 class="mb-2 text-xl font-medium text-gray-900 hover:text-blue-800 dark:text-white">{place?.personBooker.name}</h5>
                </Link>
              </div>
              <div className="grid m-4">
                <a href="#" class="px-4 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><i class="fa-solid fa-phone mr-2"></i>Gọi điện thoại</a>

              </div>

              <div class="md:grid md:grid-cols-2 m-4 gap-4 border-b border-gray-400 pb-4">
                <a href="#" class="px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"><i class="fa-solid fa-comment-dots mr-2"></i>Zalo</a>
                <a href="#" class="px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"><i class="fa-brands fa-facebook-messenger mr-2"></i>Messenger</a>
                <a href="#" class="px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"><i class="fa-solid fa-envelope mr-2"></i>Email</a>
                <a href="#" class="px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"><i class="fa-solid fa-inbox mr-2"></i>Liên hệ tôi</a>
              </div>
              <div className="grid m-4">
                <a href="#" class="text-blue-700 border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium hover:bg-gray-100 rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"><i class="fa-solid fa-phone mr-2"></i>Chat với HomeUs</a>
                <div className="text-center">Tư vấn hoàn toàn miễn phí</div>

              </div>
          </div>
        </div>
      </div>

      <div className="my-4 grid gap-8 grid-cols-1 md:grid-cols-7">
        <div className="col-span-2">
          <div className="border p-6 rounded-2xl gap-2 cursor-pointer bg-white shadow rounded-lg">
            <Checkbox checked={optionChecking === "longTerm" ? true : false}
              className="mb-2 text-base font-bold flex justify-center"
              onChange={() => {
                setOptionChecking("longTerm");
                setPrice(place?.packageLong.price);
              }}>Gói Dài Hạn</Checkbox>
            <div className="mt-4 grid gap-y-4 grid-cols-2 flex items-center">
              <div className="font-semibold">Ngày Bắt Đầu</div>
              <span class="bg-blue-100 text-blue-800 text-base text-center font-medium px-2.5 py-1 rounded-lg dark:bg-gray-700 dark:text-blue-400 border border-blue-400">{place?.packageLong.longPackageDate}</span>
              <div className="font-semibold">Chu kỳ theo</div>
              <span class="bg-green-100 text-green-800 text-base text-center font-medium px-2.5 py-1 rounded-lg dark:bg-gray-700 dark:text-blue-400 border border-green-400">Tháng</span>
              <div className="font-semibold">Giá / tháng</div>
              <span class="bg-pink-100 text-pink-800 text-base text-center font-medium px-2.5 py-1 rounded-lg dark:bg-gray-700 dark:text-blue-400 border border-pink-400">{formatCurrentVND(place?.packageLong.price)}</span>
              
            </div>
            
          </div>
        </div>
        <div className="col-span-2">
          <div className="border p-6 rounded-2xl gap-2 cursor-pointer bg-white shadow rounded-lg">
            <Checkbox checked={optionChecking === "shortTerm" ? true : false}
              className="mb-2 text-base font-bold flex justify-center"
              onChange={() => {
                setOptionChecking("shortTerm");
                setPrice(place?.packageShort.price);
              }}>Gói Ngắn Hạn</Checkbox>
            <div className="mt-4 grid gap-y-4 grid-cols-2 flex items-center">
              <div className="font-semibold">Ngày Bắt Đầu</div>
              <span class="bg-blue-100 text-blue-800 text-base text-center font-medium px-2.5 py-1 rounded-lg dark:bg-gray-700 dark:text-blue-400 border border-blue-400">{place?.packageShort.shortPackageDateStart}</span>
              <div className="font-semibold">Ngày kết thúc</div>
              <span class="bg-yellow-100 text-yellow-800 text-base text-center font-medium px-2.5 py-1 rounded-lg dark:bg-gray-700 dark:text-blue-400 border border-yellow-400">{place?.packageShort.shortPackageDateEnd}</span>
              <div className="font-semibold">Giá / ngày</div>
              <span class="bg-pink-100 text-pink-800 text-base text-center font-medium px-2.5 py-1 rounded-lg dark:bg-gray-700 dark:text-blue-400 border border-pink-400">{formatCurrentVND(place?.packageShort.price)}</span>
              
            </div>
            
          </div>
        </div>
        <div className="col-span-3">
          {optionChecking && (
            <div className="border bg-white shadow px-6 py-4 rounded-2xl h-full">
              <div className="text-xl text-center font-bold mb-2">
                {typeOption(optionChecking)} {optionChecking === "shortTerm" && (
                  <span>({numberOfNights} ngày)</span>                    
              )}
              </div>
              {optionChecking === "shortTerm" && (
                <>
                  <p className="text-sm mb-2">
                    Ngày <b>CheckIn</b> và <b>Checkout</b> phải trong thời gian
                    của gói
                  </p>
                  <RangePicker size="large" className="flex mx-8 mx-auto mb-2" value={[checkIn,checkOut]}
                    onChange={(dates) => {setCheckIn(dates[0]);setCheckOut(dates[1])}}/>
                </>
              )}
              <div className={optionChecking === "longTerm" ? "my-4" : ""}>
                <div className="mb-2 italic text-sm">
                  <p className="text-red-600">
                    - Lưu ý * giá khi đặt sẽ tùy thuộc vào các option mình đã
                    chọn. Quý Khách vui lòng chọn đúng options mà mình mong muốn
                  </p>
                  <p className="text-red-600">
                    - Booker là người được nhà đưa tin chọn nên mọi vấn đề về an
                    toàn và bảo mật đều đảm bảo
                  </p>
                </div>
              </div>

              <button className="primary" onClick={bookingRoom}>
                Đặt Phòng
                {numberOfNights > 0 && (
                  <span> {formatCurrentVND(numberOfNights * price)}</span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="">  
        {/* <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="border p-4 flex flex-col rounded-2xl gap-2 items-center cursor-pointer bg-white shadow mt-6  rounded-lg p-6">
            <input
              type="checkbox"
              checked={optionChecking === "longTerm" ? true : false}
              onChange={() => {
                setOptionChecking("longTerm");
                setPrice(place?.packageLong.price);
              }}
            />
            <span>Gói Dài Hạn</span>
            <div className="flex items-center">
              <span className="w-36">Ngày Bắt Đầu</span>
              <input
                type="text"
                disabled
                value={place?.packageLong.longPackageDate}
              />
            </div>
            <div className="flex items-center">
              <span className="w-36">Giá</span>
              <input
                type="text"
                className="font-bold"
                disabled
                value={formatCurrentVND(place?.packageLong.price)}
              />
            </div>
          </div>

          <div className="border p-4 mt-2 flex flex-col rounded-2xl gap-2 items-center cursor-pointer bg-white shadow mt-6  rounded-lg p-6">
            <input
              type="checkbox"
              checked={optionChecking === "shortTerm" ? true : false}
              onChange={() => {
                setOptionChecking("shortTerm");
                setPrice(place?.packageShort.price);
              }}
            />
            <span>Gói Ngắn Hạn</span>
            <div className="flex items-center">
              <span className="w-36">Ngày Bắt Đầu</span>
              <input
                type="text"
                disabled
                value={place?.packageShort.shortPackageDateStart}
              />
            </div>
            <div className="flex items-center">
              <span className="w-36">Ngày Kết Thúc</span>
              <input
                type="text"
                disabled
                value={place?.packageShort.shortPackageDateEnd}
              />
            </div>
            <div className="flex items-center">
              <span className="w-36">Giá</span>
              <input
                type="text"
                className="font-bold"
                disabled
                value={formatCurrentVND(place?.packageShort.price)}
              />
            </div>
          </div>
          
        </div>
        <div>
          {optionChecking && (
            <div className="bg-white shadow p-4 rounded-2xl">
              <div className="text-2xl text-center">
                Giá: {formatCurrentVND(price)} / {typeOption(optionChecking)}
              </div>
              {optionChecking === "shortTerm" && (
                <>
                  <p className="text-sm">
                    Ngày <b>CheckIn</b> và <b>Checkout</b> phải trong thời gian
                    của gói
                  </p>
                  <div className="border rounded-2xl mt-4">
                    <div className="flex">
                      <div className="py-3 px-4">
                        <label>Check in:</label>
                        <input
                          type="date"
                          value={checkIn}
                          onChange={(ev) => setCheckIn(ev.target.value)}
                        />
                      </div>
                      <div className="py-3 px-4 border-l">
                        <label>Check out:</label>
                        <input
                          type="date"
                          value={checkOut}
                          onChange={(ev) => setCheckOut(ev.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-4xl uppercase m-3">
                    {numberOfNights} ngày
                  </div>
                </>
              )}
              <div className="">
                <div className="py-3 px-4 italic text-sm">
                  <p className="text-red-600">
                    - Lưu ý * giá khi đặt sẽ tùy thuộc vào các option mình đã
                    chọn. Quý Khách vui lòng chọn đúng options mà mình mong muốn
                  </p>
                  <p className="text-red-600">
                    - Booker là người được nhà đưa tin chọn nên mọi vấn đề về an
                    toàn và bảo mật đều đảm bảo
                  </p>
                </div>
              </div>             

              <button className="primary mt-4" onClick={bookingRoom}>
                Đặt Phòng
                {numberOfNights > 0 && (
                  <span> {formatCurrentVND(numberOfNights * price)}</span>
                )}
              </button>
            </div>
          )}
        </div>
      </div> */}
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Thông Tin Khác</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
          {place.extraInfo}
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl mb-4">Đánh giá</h2>
        </div>
        <div>
          {
            user && (
              <div className="grid grid-cols-10 gap-4">
                <div className="col-span-9">
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    autoComplete="given-name"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  {comment ? (
                    <button
                      className="mt-1 py-2 px-4 width-200 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={handleRating}
                    >
                      Đánh giá
                    </button>
                    )
                    :(
                      <button
                        className="mt-1 py-2 px-4 width-200 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Đánh giá
                      </button>
                    )
                  }
                </div>                
              </div>
            )
          }
          {
            place?.reviews.length > 0 &&
            place?.reviews?.map((item) => (
              <div className="py-4 px-2 2xl:px-0 2xl:container 2xl:mx-auto flex justify-center items-center" key={item._id}>
              <div className="flex flex-col justify-start items-start w-full space-y-8">
                <div className="w-full flex justify-start items-start flex-col bg-gray-50 dark:bg-gray-800 md:px-8 py-8">
                  <div id="menu2" className="hidden md:block">
                    <p className="mt-3 text-base leading-normal text-gray-600 dark:text-white w-full md:w-9/12 xl:w-5/6">
                      {item.comment}
                    </p>
  
                    <div className="mt-6 flex justify-start items-center flex-row space-x-2.5">
                      <div>
                        <img
                            src={'http://localhost:4000/'+item?.idUser?.avatar}
                            className={`h-10 w-10 object-cover rounded-full`}
                          alt="girl-avatar"
                        />
                      </div>
                      <div className="flex flex-col justify-start items-start space-y-2">
                        <p className="text-base font-medium leading-none text-gray-800 dark:text-white">
                          {item?.idUser?.name}
                        </p>
                        <p className="text-sm leading-none text-gray-600 dark:text-white">
                          {formatDate(item?.date)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            ))
              }
        </div>
      </div>
    </div>
    </div>
  );
}