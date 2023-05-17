import BreakCump from "../../components/BreakCump";
import Certify from "../../assets/cer.png";
import { Select, Space } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { showOption, formatCurrentVND } from "../../util/util";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { formatDate } from "../../util/util";
import { Tooltip } from 'antd';
const DetailBooking = () => {
  const [detail, setDetail] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    new Promise(async () => {
      await fetchRoom();
    });
  }, []);

  const fetchRoom = async () => {
    try {
      const res = await axios.get(`/get-list-detail-booker/${id}`);
      if (res.status === 200) {
        setDetail(res.data.data);
      }
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };

  const handleBooking = async (status) => {
    try {
      const res = await axios.put(`/update-status/${id}`, { status: status });
      if (res.status === 200) {
        if (status === 'done') {
          toast.success("Xác nhận hợp đồng thành công");
        }

        if (status === 'cancel') {
          toast.success("Hợp đồng đã được hủy");
        }
        fetchRoom();
      }
    } catch (error) {
    }
  };

  return (
    <div className="app m-4">
      {/* <BreakCump text={"Quay lại"} url={"/accept-booking"} /> */}
      <main className="grid gap-6 mx-5 mb-4 mx-auto">
        <aside className>
          <div className="block bg-white shadow rounded-lg p-10 flex flex-row justify-center items-center">
            {detail?.status === "review" && (
              <img src={Certify} alt="" className="img-certify" />
            )}

            <div className="flex flex-col gap-1 text-center items-center">
              <div className="relative">
                <img
                  className="h-32 w-32 bg-white p-2 rounded-full shadow mb-4"
                  src={`http://localhost:4000/`+detail?.place?.owner?.avatar}
                  alt=""
                />
                {
                  <div className="absolute h-5 w-5 top-0 right-5 rounded-full shadow">
                    <i
                      className="fa-solid fa-circle-check"
                      style={{ color: "green", fontSize: "24px" }}
                    ></i>
                  </div>
                }
              </div>
              <p className="font-semibold">{detail?.place?.owner?.email}</p>
              <div className="text-sm font-bold leading-normal text-gray-600 flex justify-center items-center">
                <i class="fa-solid fa-user mr-2"></i>
                Đại diện Bên cho thuê - {detail?.place?.owner?.name}
              </div>
            </div>
            <div className="font-bold mx-2">HỢP ĐỒNG XÁC NHẬN</div>
            <div className="flex flex-col gap-1 text-center items-center">
              <div className="relative">
                <img
                  className="h-32 w-32 bg-white p-2 rounded-full shadow mb-4"
                  src={`http://localhost:4000/`+detail?.user?.avatar}
                  alt=""
                />
                {
                  <div className="absolute h-5 w-5 top-0 right-5 rounded-full shadow">
                    <i
                      className="fa-solid fa-circle-check"
                      style={{ color: "green", fontSize: "24px" }}
                    ></i>
                  </div>
                }
              </div>
              <p className="font-semibold">{detail?.user?.email}</p>
              <div className="text-sm font-bold leading-normal text-gray-600 flex justify-center items-center">
                <i class="fa-solid fa-user mr-2"></i>
                Đại diện bên thuê - {detail?.user?.name}
              </div>
            </div>
          </div>
          {/* {detail?.img && <ListImgInfo listImg={detail.img} />} */}
        </aside>
      </main>

      <h2 className="font-bold text-black-300 px-6 mb-4 text-xl">
        Thông tin chi tiết
      </h2>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Tên Căn Hộ
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Loại Thuê
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Giá tiền
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Bắt đầu từ ngày
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            <tr className="hover:bg-gray-50 cursor-pointer">
              <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                <div className="relative h-10 w-10">
                  <img
                    className="h-full w-full rounded-full object-cover object-center"
                    src={`http://localhost:4000/${detail?.place?.photos[0]}`}
                    alt=""
                  />
                  <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-700">
                    {detail?.place?.title}
                  </div>
                  <div className="text-gray-400">{detail?.place?.address}</div>
                </div>
              </th>
              <td className="px-6 py-4">
                <p className="font-bold underline">
                  {showOption(detail?.typeOption)}
                </p>
              </td>
              <td className="px-6 py-4">
                <p className="font-bold underline">
                  {formatCurrentVND(detail?.price)}
                </p>
              </td>
              <td className="px-6 py-4" style={{ width: "300px" }}>
                {(detail?.checkIn && formatDate(detail?.checkIn)) ||
                  "Dịch vụ dài hạn nên sẽ bắt đầu từ hôm nay"}
              </td>
              <td className="px-6 py-4">
                <Tooltip title="Xem thông tin hợp đồng">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-light py-1 px-3 rounded-full" onClick={() => navigate(`/template-booking/${id}`)}><i class="fa-solid fa-info fa-xs"></i></button>
                </Tooltip>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="italic text-red-700 font-small">
        *(Vui lòng kiểm tra kĩ thông tin trước khi xác nhận. Chúng tôi không
        giải quyết các trường hợp xác nhận nhầm. Nếu có điều gì xảy ra xin vui
        lòng liên hệ đến quản lí để được xử lí 1 cách tốt nhất )
      </p>
      <p className="italic text-red-700 font-small">
        Hợp đồng có hiệu lực ngay sau khi thực hiện công chứng ở file và xác
        nhận của hệ thống
      </p>
      <p className="italic text-red-700 font-small">
        Hợp đồng sau khi hủy sẽ không thể hoàn tác lại nữa
      </p>
      {detail?.status === "review" &&(
        <div className="flex justify-center items-center mt-3">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full"
            onClick={() => handleBooking("done")}
          >
            Xác nhận hợp đồng
          </button>
        </div>
      )}


      {
        detail?.status === "done" && (
          (
            <div className="flex justify-center items-center mt-3">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full mr-2"
                onClick={() => handleBooking("cancel")}
              >
                Hủy Hợp Đồng
              </button>
            </div>
          )
        )
      }

{
        detail?.status === "cancel" && (
          (
            <div className="flex justify-center items-center mt-3">
              <button
                className="bg-amber-500 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded-full mr-2"
                onClick={() => handleBooking("done")}
              >
                Khôi phục hợp đồng
              </button>
            </div>
          )
        )
      }
    </div>
  );
};

export default DetailBooking;
