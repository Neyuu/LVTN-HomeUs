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
        toast.success("Bình luận thành công");

        setComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-8 py-4 px-8 min-h-screen max-w-6xl mx-auto">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">THÔNG TIN HỢP ĐỒNG :</h2>
          {booking.typeOption === "shortTerm" ? (
            <BookingDates booking={booking} />
          ) : (
            <>
              <h3 className="font-bold uppercase">Gói Dài Hạn</h3>
              <p>
                Bắt đầu từ ngày{" "}
                <b>{booking?.place?.packageLong?.longPackageDate}</b>
              </p>
            </>
          )}
        </div>
        <div className="bg-green-600 p-6 text-white rounded-2xl">
          {showStatus(booking.status)}
          <div className="underline uppercase">
            {booking.status === "done" && (
              <Link to={`/contact/${booking?.place?.owner}`}>
                Vui Lòng Liên Hệ Người Cho Thuê
              </Link>
            )}
          </div>
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>Tổng tiền</div>
          <div className="text-3xl">
            {booking.price.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
      {booking.status === "done" && (
        <>
          <h1 className="text-xl mt-2 uppercase">Dịch vụ sẵn có</h1>
          <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {booking?.place?.perks?.includes("wifi") && (
              <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
                  />
                </svg>
                <span>Wifi</span>
              </label>
            )}

            {booking?.place?.perks?.includes("parking") && (
              <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
                <span>Free parking spot</span>
              </label>
            )}
            {booking?.place?.perks?.includes("tv") && (
              <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
                <span>TV</span>
              </label>
            )}

            {booking?.place?.perks?.includes("radio") && (
              <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 7.5l16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0012 6.75zm-1.683 6.443l-.005.005-.006-.005.006-.005.005.005zm-.005 2.127l-.005-.006.005-.005.005.005-.005.005zm-2.116-.006l-.005.006-.006-.006.005-.005.006.005zm-.005-2.116l-.006-.005.006-.005.005.005-.005.005zM9.255 10.5v.008h-.008V10.5h.008zm3.249 1.88l-.007.004-.003-.007.006-.003.004.006zm-1.38 5.126l-.003-.006.006-.004.004.007-.006.003zm.007-6.501l-.003.006-.007-.003.004-.007.006.004zm1.37 5.129l-.007-.004.004-.006.006.003-.004.007zm.504-1.877h-.008v-.007h.008v.007zM9.255 18v.008h-.008V18h.008zm-3.246-1.87l-.007.004L6 16.127l.006-.003.004.006zm1.366-5.119l-.004-.006.006-.004.004.007-.006.003zM7.38 17.5l-.003.006-.007-.003.004-.007.006.004zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007zm-.5 1.873h-.008v-.007h.008v.007zM17.25 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zm0 4.5a.75.75 0 110-1.5.75.75 0 010 1.5z"
                  />
                </svg>
                <span>Radio</span>
              </label>
            )}
            {booking?.place?.perks?.includes("pets") && (
              <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                  />
                </svg>
                <span>Pets</span>
              </label>
            )}
            {booking?.place?.perks?.includes("entrance") && (
              <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
                <span>Private entrance</span>
              </label>
            )}
          </div>
          <h1 className="text-xl mt-2 mb-4 uppercase">
            Dịch Vụ Đã được đăng ký
          </h1>
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          Stt
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Tên dịch vụ
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Giá
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {listService.length > 0 &&
                        listService.map((item, index) => (
                          <tr className="border-b dark:border-neutral-500">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {index + 1}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {serviceJson[item - 1].name}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {formatCurrentVND(serviceJson[item - 1].price)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-xl mt-2 mb-4 uppercase">Đăng Ký Dịch Vụ</h1>
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
          {listService.length > 0 && (
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
                    className="px-6 py-4 font-medium text-slate-900"
                  >
                    Dịch vụ
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-slate-900"
                  >
                    Giá
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-slate-900 float-right"
                  >
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
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
              <h1 className="text-xl mt-2 mb-4 uppercase">Góp ý bình luận</h1>
            </div>
            <div>
              <div className="col-span-6 sm:col-span-3 mt-3 flex justify-center">
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  autoComplete="given-name"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {comment && (
                  <button
                    className="py-2 px-4 width-200 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={handleRating}
                  >
                    Góp ý
                  </button>
                )}
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
                                  ? "Người mua"
                                  : "Người bán"}
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
