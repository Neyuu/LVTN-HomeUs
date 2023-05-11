import { useState, useEffect } from "react";
import BreakCump from "../../components/BreakCump";
import axios from "axios";
import { formatCurrentVND } from "../../util/util";

import { useNavigate } from "react-router-dom";

const AdminPersonChecker = () => {
  const [listUser, setListUser] = useState([]);
    const navigate = useNavigate();
    
  const fetching = async () => {
    try {
      const res = await axios.get("/get-all-user-booker");
      if (res.status === 200) {
        setListUser(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    new Promise(async () => {
      await fetching();
    });
  }, []);
    
    const handleRedirect = (id) => {
        navigate(`/admin-booker-detail/${id}`,{replace: true})
    }
    

    

  return (
    <div className="">
      {/* <BreakCump text={"Quản Lý Người Dùng"} /> */}
      <h2 className="font-bold text-black-300 px-6 pb-1 text-2xl">Quản lý chuyên viên</h2>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Tên Tài Khoản
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Email
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Quyền Người Dùng
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Số Coin Sở Hữu
              </th>
              {/* <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Hành động
              </th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {listUser.length > 0 &&
              listUser.map((e) => (
                <tr className="hover:bg-gray-50 cursor-pointer" key={e._id} onClick={() => handleRedirect(e._id)}>
                  <td className="px-6 py-4">{e?.name}</td>
                  <td className="px-6 py-4">{e?.email}</td>
                  <td className="px-6 py-4">
                    {e.acceptBooker ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                        Booker
                      </span>
                    ) : (
                      <span className="h-1.5 w-1.5 p-2 rounded-full bg-red-600 text-white">
                        Đang xét duyệt
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">{`${
                    e?.balanceCoin ? formatCurrentVND(e?.balanceCoin) : 0
                  } vnd`}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPersonChecker;
