import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import BreakCump from "../../components/BreakCump";
import { showStatus , showOption,formatCurrentVND } from "../../util/util";

const ListAcceptBooking = () => {

    const [room, setRoom] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    new Promise(async () => {
      await fetchRoom();
    });
  }, []);

    const fetchRoom = async () => {
    try {
      const res = await axios.get(`/get-list-booking-all`);
      if (res.status === 200) {
        setRoom(res.data.data);
      }
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
    };
  
  const handleChangeStatus = async(idStatus) => {
    const res = await axios.put(`/update-status/${idStatus}`, { status: 'review' });
      if (res.status === 200) {
        toast.success("Xác nhận hợp đồng thành công");
        await fetchRoom();
      }
    }
    console.log('====================================');
    console.log(room);
    console.log('====================================');
    return (
        <>
            <div className="p-4">
            <BreakCump
          text={'Quay lại'}
          url={'/accept-booking'}
          />
                    <h2 className="font-bold text-black-300 px-6 py-4 text-xl">DANH SÁCH CÁC HỢP ĐỒNG ĐỢI DUYỆT</h2>
                <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Tên Căn Hộ
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Trạng Thái
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Người Đặt
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Người đăng bán
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Loại Thuê/Giá tiền
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {room.length > 0 &&
                room.map((e) => (
                  <tr className="hover:bg-gray-50 cursor-pointer" key={e._id}>
                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="relative h-10 w-10">
                        <img
                          className="h-full w-full rounded-full object-cover object-center"
                          src={`http://localhost:4000/${e?.place?.photos[0]}`}
                          alt=""
                        />
                        <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                      </div>
                      <div className="text-sm">
                        <div className="font-medium text-gray-700">{e?.place?.title}</div>
                        <div className="text-gray-400">{e?.place?.address}</div>
                      </div>
                    </th>
                    <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                                  <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                  {showStatus(e.status)}
                                </span>
                    </td>
                    <td className="px-6 py-4">
                            <p className="font-bold underline">{e?.user?.name}</p>
                        </td>
                        <td className="px-6 py-4">
                            <p className="font-bold underline">{e?.place?.owner?.name}</p>
                    </td>
                    <td className="px-6 py-4 w-20">{`${showOption(e.typeOption)}/${formatCurrentVND(e.price)}`}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-4">
                                {
                                    e?.status !== 'review' ? (
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-light py-2 px-4 rounded-full" onClick={() => handleChangeStatus(e._id)}>Duyệt hợp đồng</button>
                                    ) : (
                                            <p className="text-lime-500">Admin Đã duyệt</p>
                                    )
                      }
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
         </div>
      </>
    )
}

export default ListAcceptBooking