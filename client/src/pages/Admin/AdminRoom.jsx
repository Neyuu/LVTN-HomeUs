import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const COLORS = ["indigo", "violet", "blue", "indigo", "violet", "blue"];

const AdminRoom = () => {
  const [room, setRoom] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    new Promise(async () => {
      await fetchRoom();
    });
  }, []);

  const fetchRoom = async () => {
    try {
      const res = await axios.get("/get-all-rooms");
      if (res.status === 200) {
        setRoom(res.data);
      }
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };

  const handleChangeStatus = async (id,status) => {
    const res = await axios.put(`/change-status/${id}`,{status});

    if (res.status === 200) {
      toast.success("Thay đổi trạng thái thành công");
      await fetchRoom();
    }
  };

  const handleRedirect = (id) => {
    navigate(`/admin-room/${id}`, { replace: true });
  };

  const handleRemoveProduct = async (id) => {
    const res = await axios.delete(`/remove-room/${id}`);
    if (res.status === 200) {
      await fetchRoom();
    }
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Tên Căn Hộ
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Duyệt Bài
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Trạng Thái
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Role
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Tiện Nghi Đi Kèm
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {room.length > 0 &&
              room.map((e) => (
                <tr
                  className="hover:bg-gray-50 cursor-pointer"
                  key={e._id}
                  onClick={() => handleRedirect(e._id)}
                >
                  <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                    <div className="relative h-10 w-10">
                      <img
                        className="h-full w-full rounded-full object-cover object-center"
                        src={`http://localhost:4000/${e.photos[0]}`}
                        alt=""
                      />
                      <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-700">{e.title}</div>
                      <div className="text-gray-400">{e.address}</div>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    {e.status ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                        Đã Duyệt
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                        Chưa Duyệt
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {e.memberStatus ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                        Đã Duyệt
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                        Chưa Duyệt
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">{e?.owner?.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {e?.perks?.map((item, index) => (
                        <span
                          key={index}
                          className={`inline-flex items-center gap-1 rounded-full bg-${COLORS[index]}-50 px-2 py-1 text-xs font-semibold text-${COLORS[index]}-600`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-4">
                      {!e.status ? (
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-light py-2 px-4 rounded-full"
                          onClick={() => handleChangeStatus(e._id,true)}
                        >
                          Duyệt
                        </button>
                      ) : (
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-light py-2 px-4 rounded-full"
                          onClick={() => handleChangeStatus(e._id,false)}
                        >
                          Ẩn
                        </button>
                      )}
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-light py-2 px-4 rounded-full"
                        onClick={() => handleRemoveProduct(e._id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminRoom;
