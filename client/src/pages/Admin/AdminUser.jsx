import { useState, useEffect } from "react"
import BreakCump from "../../components/BreakCump"
import axios from "axios";
import { formatCurrentVND } from "../../util/util";
import { toast } from "react-toastify";
import { Select, Space, Input, Button } from 'antd'; 

const AdminUser = () => {
  const [listUser, setListUser] = useState([]);
  const [coin, setCoin] = useState({
    id: '',
    coin: ''
  })
  const [beforeCoin, setBeforeCoin] = useState(0);

  const changeValueCoin = (type, value) => {
    setCoin({
      ...coin,
      [type]: value
    })
  }

  const fetching = async () => {
    try {
      const res = await axios.get('/get-all-user');
      if (res.status === 200) {
        setListUser(res.data.data)
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
  
  const handleRemoveItem = async(idRemove) => {
    try {
      const res = await axios.delete(`/remove-user/${idRemove}`);
      if (res.status === 200) {
        await fetching();
        toast.success('Xóa tài khoản thành công');
      }
    } catch (error) {
      
    }
  }

  const handleChangeSelect = (e) => {
    const beforeCoin = listUser.filter((i) => i._id === e);
    const coinn = beforeCoin[0].balanceCoin || 0;
    setBeforeCoin(coinn)
    changeValueCoin('id',e)
  }

  const submitCoin = async () => {
    if (!coin.id || !coin.coin) {
      toast.error('Vui lòng nhập đầy đủ');
    }
    try {
      const res = await axios.put(`/update-coin/${coin.id}`,{balanceCoin: Number(coin.coin) + Number(beforeCoin)});
      if (res.status === 200) {
        await fetching();
        toast.success('Tăng số coin thành công')
        setCoin({
          id: '',
          coin: ''
        })
      }
    } catch (error) {
      
    }
  }
    return (
      <div className="m-3">
        <BreakCump
          text={"Quản Lý Người Dùng"}
        />
       
        <Space className="mt-3 ml-5">
        <Select
      style={{ width: 300 }}
      onChange={handleChangeSelect}
            options={listUser?.map((item) => (
              { value: item._id, label: item.name }
            ))}

          />
          <Input value={coin.coin} onChange={(e) => changeValueCoin('coin', e.target.value)}/>
          <Button onClick={submitCoin}>Submit</Button>
        </Space>
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
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {listUser.length > 0 &&
              listUser.map((e) => (
                <tr className="hover:bg-gray-50 cursor-pointer" key={e._id}>
                 
                  <td className="px-6 py-4">{e?.name}</td>
                  <td className="px-6 py-4">{e?.email}</td>
                  <td className="px-6 py-4">
                  {
                    e.isBooker && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                Booker
                              </span>
                              ) 
                            }
                  </td>
                  <td className="px-6 py-4">{`${e?.balanceCoin ? formatCurrentVND(e?.balanceCoin)  : 0}`}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-1">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-light py-2 px-4 rounded-full" onClick={() => handleRemoveItem(e._id)}>Xóa</button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      </div>
    )
}

export default AdminUser