import { useState, useEffect } from "react"
import BreakCump from "../../components/BreakCump"
import axios from "axios";
import { formatCurrentVND, formatDate } from "../../util/util";
import { toast } from "react-toastify";
import { Select, Space, Input, Button } from 'antd'; 

const ListInvoice = () => {
  const [listUser, setListUser] = useState([]);

  const fetching = async () => {
    try {
      const res = await axios.get('/list-invoice');
        if (res.status === 200) {
        setListUser(res.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    new Promise(async () => {
      await fetching();
    })
  }, [])


    return (
      <div className="">
        {/* <BreakCump
          text={"Quản Lý Người Dùng"}
        /> */}
        <h2 className="font-bold text-black-300 px-6 pb-1 text-2xl">Lịch sử nạp tiền</h2>
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Tên Tài Khoản
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Số tiền
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Trạng thái
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Note
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Thời gian
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {listUser.length > 0 &&
              listUser.map((e) => (
                <tr className="hover:bg-gray-50 cursor-pointer" key={e._id}>
                 
                  <td className="px-6 py-4">{e?.name}</td>
                  <td className="px-6 py-4">{e?.coin}</td>
                 
                  <td className="px-6 py-4 text-green-600">{e?.status}</td>
                  <td className="px-6 py-4">{e?.type}</td>
                  <td className="px-6 py-4">{formatDate(e?.createdAt)}</td>
                 
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      </div>
    )
}

export default ListInvoice