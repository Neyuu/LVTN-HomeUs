import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";
import { showStatus } from "../util/util";
import { Link } from "react-router-dom";
import Perks from "../Perks";
import { formatCurrentVND } from "../util/util";
import serviceJson from "../util/service.json";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Popconfirm } from "antd";
import { formatDate } from "../util/util";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [listService, setListService] = useState([]);
  const [listOldService, setListOldService] = useState([]);
  const { ready, user, setUser } = useContext(UserContext);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
          setListService(foundBooking.service);
        }
      });
    }
  }, [id, comment]);

  const handleAddService = (id) => {
    const array = [...listOldService];

    if (array.includes(id)) {
      toast.error("Dịch vụ đã được thêm");
      return;
    } else {
      array.push(id + "");
    }

    setListOldService([...array]);
  };

  const removeService = (id) => {
    const a = listOldService.filter((item) => item != id);

    setListOldService(a);
  };

  if (!booking) {
    return "";
  }

  const handleRegisterService = async () => {
    const balanceCoin = user.balanceCoin;
    const total = listOldService.reduce(function (sum, item) {
      return sum + serviceJson[item - 1].price;
    }, 0);

    if (balanceCoin < total) {
      toast.error("Số dư không đủ để thực hiện thanh toán");
      return;
    }

    const params = {
      service: [...listOldService, ...listService],
      balanceCoin: balanceCoin - total,
    };
    try {
      const res = await axios.put(`/update-service/${booking._id}`, params);
      if (res.status === 200) {
        toast.success("Thêm các dịch vụ mới thành công");
        if (id) {
          axios.get("/bookings").then((response) => {
            const foundBooking = response.data.find(({ _id }) => _id === id);
            if (foundBooking) {
              setBooking(foundBooking);
              setListService(foundBooking.service);
              setListOldService([]);
            }
          });
        }
      }
    } catch (error) {}
  };

  const handleRating = async () => {
    try {
      const res = await axios.post(`/add-service-comment/${id}`, {
        idUser: user._id,
        comment,
      });

      if (res.status === 200) {
        toast.success("Gửi thành công");

        setComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-4 px-8 min-h-screen max-w-6xl mx-auto">
      <h1 class="text-3xl font-semibold tracking-tight leading-none">{booking.place.title}</h1>
      <AddressLink>{booking.place.address}</AddressLink>
      <span className="font-semibold mr-5 ml-1"><i class="fa-solid fa-dollar-sign mr-2"></i>{booking.place?.packageLong.price/1000000} tr/tháng</span>
      <span className="font-semibold mr-5"><i class="fa-solid fa-bed mr-2"></i>{booking.place?.numberBed}</span>
      <span className="font-semibold mr-5"><i class="fa-solid fa-table-cells mr-2"></i>{booking.place?.areas}m<sup>2</sup></span>
      <h2 className="my-4 font-semibold text-2xl">Thông tin hợp đồng</h2>
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <div>
          {booking.typeOption === "shortTerm" ? (
            <BookingDates booking={booking} className={"font-bold mb-2"} />
          ) : (
            <>
              <h3 className="font-bold mb-2">Gói Dài Hạn</h3>
              <p>
                Bắt đầu từ ngày{" "}
                <span class="bg-blue-100 text-blue-800 text-base text-center font-medium px-2.5 py-1 rounded-lg dark:bg-gray-700 dark:text-blue-400 border border-blue-400">{booking?.place?.packageLong?.longPackageDate}</span>
              </p>
            </>
          )}
        </div>
        <div>
          <h3 className="font-bold mb-2">Tình trạng</h3>
          <span class="bg-green-100 text-green-800 text-base text-center font-medium px-2.5 py-1 rounded-lg dark:bg-gray-700 dark:text-blue-400 border border-green-400">{showStatus(booking.status)}</span>
        </div>
        <div>
          <h3 className="font-bold mb-2">Tổng tiền</h3>
          <span class="bg-pink-100 text-pink-800 text-base text-center font-medium px-2.5 py-1 rounded-lg dark:bg-gray-700 dark:text-blue-400 border border-pink-400">{booking.price.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}</span>
          
        </div>
        <div>
          <h3 className="font-bold mb-2">Liên hệ</h3>
          {booking.status === "done" && (
            <Link to={`/contact/${booking?.place?.owner}`}>
              <span class="bg-purple-100 text-purple-800 text-base text-center font-medium px-2.5 py-1 rounded-lg dark:bg-gray-700 dark:text-blue-400 border border-purple-400">Người cho thuê</span>
            </Link>
          )}
        </div>
      </div>
      <PlaceGallery place={booking.place} />
      {booking.status === "done" && (
        <>
          <h1 className="my-4 font-semibold text-2xl">Dịch vụ sẵn có</h1>
          <div className="grid my-4 gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {booking?.place?.perks?.includes("wifi") && (
              <div><i class="fa-solid fa-wifi mr-2"></i>Wifi</div>
            )}
            {booking?.place?.perks?.includes("parking") && (
              <div><i class="fa-solid fa-square-parking fa-lg mr-2"></i>Bãi giữ xe</div>
            )}
            {booking?.place?.perks?.includes("tv") && (
              <div><i class="fa-solid fa-tv mr-2"></i>Tivi</div>
            )}
            {booking?.place?.perks?.includes("radio") && (
              <div><i class="fa-solid fa-radio mr-2"></i>Radio</div>
            )}
            {booking?.place?.perks?.includes("pets") && (
              <div><i class="fa-solid fa-dog fa-lg mr-2"></i>Thú cưng</div>
            )}
            {booking?.place?.perks?.includes("entrance") && (
              <div><i class="fa-solid fa-signs-post fa-lg mr-2"></i>Lối đi riêng</div>
            )}
          </div>
          <h1 className="my-4 font-semibold text-2xl">
            Dịch vụ đã được đăng ký
          </h1>
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-slate-900 text-base"
                  >
                    Stt
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-slate-900 text-base"
                  >
                    Tên dịch vụ
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-slate-900 text-base"
                  >
                    Giá
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100 text-slate-700 font-normal text-base">
                {listService.length > 0 &&
                  listService.map((item, index) => (
                    <tr className="hover:bg-slate-50 cursor-pointer"
                    key={item.id}>
                      <td className="whitespace-nowrap px-6 py-4 font-normal text-base">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-normal text-base">
                        {serviceJson[item - 1].name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-normal text-base">
                        {formatCurrentVND(serviceJson[item - 1].price)}
                      </td>
                    </tr>
                  ))}
                
              </tbody>
            </table>
          </div>

          <h1 className="my-4 font-semibold text-2xl">Đăng ký dịch vụ mới</h1>
          {listOldService.length > 0 &&
            listOldService.map((item, index) => (
              <label
                className="border p-2 mx-2 rounded-2xl cursor-pointer relative"
                key={item}
              >
                <span>{serviceJson[item - 1].name}</span>
                <i
                  className="fa-solid fa-xmark absolute icon-x text-red-800"
                  onClick={() => removeService(serviceJson[item - 1].id)}
                ></i>
              </label>
            ))}
          {listOldService.length > 0 && (
            <Popconfirm
              title="Xác nhận"
              description="Bạn có muốn sử dụng coin để thanh toán cho các dịch vụ này"
              okText="Yes"
              cancelText="No"
              onConfirm={() => handleRegisterService()}
            >
              <button className="bg-lime-500 hover:bg-lime-700 text-white font-light py-2 px-4 my-4 rounded-full">
                Đăng Ký Thêm Dịch Vụ
              </button>
            </Popconfirm>
          )}
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-slate-900 text-base"
                  >
                    Tên dịch vụ
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-slate-900 text-base"
                  >
                    Giá
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-slate-900 float-right text-base"
                  >
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100 text-slate-700 font-normal text-base">
                {serviceJson.map((item, index) => (
                  <tr
                    className="hover:bg-slate-50 cursor-pointer"
                    key={item.id}
                  >
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">
                      {formatCurrentVND(item.price)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-4">
                        {!listService.includes(item.id + "") && !listOldService.includes(item.id + "")  ? (
                          <button
                            className="bg-lime-500 hover:bg-lime-700 text-white font-light py-2 px-4 rounded-full"
                            onClick={() => handleAddService(item.id)}
                          >
                            Thêm dịch vụ
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white -mx-8 px-8 py-8 border-t">
            <div>
              <h1 className="mb-4 font-semibold text-2xl mb-4">Liên hệ</h1>
            </div>
            <div>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-11">
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
                      Gửi
                    </button>
                    )
                    :(
                      <button
                        className="mt-1 py-2 px-4 width-200 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Gửi
                      </button>
                    )
                  }
                </div>                
              </div>
              {booking?.reviews.length > 0 &&
                booking?.reviews?.map((item) => (
                  <div
                    className="py-4 px-2 2xl:px-0 2xl:container 2xl:mx-auto flex justify-center items-center"
                    key={item._id}
                  >
                    <div className="flex flex-col justify-start items-start w-full space-y-8">
                      <div className="w-full flex justify-start items-start flex-col bg-gray-50 dark:bg-gray-800 md:px-8 py-8">
                        <div id="menu2" className="hidden md:block">
                          <p className="mt-3 text-base leading-normal text-gray-600 dark:text-white w-full md:w-9/12 xl:w-5/6">
                            {item.comment}
                          </p>

                          <div className="mt-6 flex justify-start items-center flex-row space-x-2.5">
                            <div>
                              <img
                                src={item?.idUser?.avatar}
                                className={`h-10 w-10 object-cover rounded-full`}
                                alt="girl-avatar"
                              />
                            </div>
                            <div className="flex flex-col justify-start items-start space-y-2">
                              <p className="text-base font-medium leading-none text-gray-800 dark:text-white">
                                {user._id == item?.idUser?._id
                                  ? "Người thuê"
                                  : "Người cho thuê"}
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
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}