import "./room.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ReactLoading from 'react-loading';
import { formatCurrentVND, truncate } from "../util/util";
import { useNavigate } from "react-router-dom";

const Room = () => {
  const [room, setRoom] = useState([]);
  const [name, setName] = useState("");
  const [add, setAdd] = useState([]);
  const [loading, setLoading] = useState('start');
  const navigate = useNavigate(); 

  const handleSearch = async () => {
    try {
      const res = await axios.get(`/filter-by-name/${name}`);
      if (res.status === 200) {
        setRoom(res.data.data);
      }
    } catch (error) {}
  };

  const bookingRoom = (item) => {
    if (add.length < 0) {
      setAdd([item]);
    } else {
      const check = add.find((i) => i._id == item._id);
      if (check) {
        const a = add.filter((i) => i._id !== item._id);
        setAdd(a);
      } else {
        if (add.length === 2) {      
          toast.error('Không được chọn quá 2 phòng');
          return;
        }
        console.log('không trùng');
        setAdd([...add, item]);
      }
    }
  };

  const handleStart = () => {
    setLoading('hide');
    setTimeout(() => {
      setLoading('show');
    }, 3000);
  }

  console.log('====================================');
  console.log(add);
  console.log('====================================');

  return (
    <div className="py-4 px-8 flex flex-col min-h-[75vh] max-w-6xl mx-auto">
      {
        add.length < 1 ? (
          <div className="mt-4">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="outline-none block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nhập tên cần lọc"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button
            type="submit"
            onClick={handleSearch}
            className="text-white absolute right-2.5 bottom-2.5 bg-primary focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
          >
            Tìm kiếm
          </button>
        </div>
        <div class="mt-4 text-base font-semibold md:text-base lg:text-base">Tìm thấy {room.length} kết quả.</div>
        {room.length == 0 &&
          <div className="mt-16 md:col-span-2 lg:col-span-3">
            <div class="text-center text-gray-500 text-xl font-semibold tracking-tight leading-none md:text-2xl lg:text-3xl">Nhập từ khóa để tìm kiếm nhà thuê.</div>
          </div>
        }
      </div>
        ) : (
          <div className="mt-8 flex justify-center items-center">
              {
                add.length === 2 && (
                  <button
                    type="submit"
                        onClick={handleStart}
                    className="text-white right-2.5 bottom-2.5 bg-primary focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Phân tích dữ liệu
                  </button>
                )
          }
        </div>
        )
      }
      <div className="mt-8 space-y-8 space-x-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:space-y-0 md:space-x-0 cursor-pointer">
        {loading === 'start' && room?.map((item) => (
          <div
            className="relative"
            key={item._id}
            onClick={() => bookingRoom(item)}
          >
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl transition duration-300 ease-in-out hover:scale-105">
              <img class="rounded-t-lg w-full h-64 bg-cover bg-center" src={"http://localhost:4000/" + item.photos?.[0]} alt="" />
              <div class="p-5">
                <div class="flex items-center justify-between">
                  <div>
                    <span class="text-2xl font-bold text-gray-900 dark:text-white">{(item.packageLong.price/1000000).toFixed(0)}</span><span class="text-xl font-bold text-gray-900 dark:text-white"> tr/tháng</span>
                  </div>
                  <div>
                    <span class="mr-5 text-l font-semibold text-gray-900 dark:text-white"><i class="fa-solid fa-bed mr-2"></i>{item.numberBed}</span>
                    <span class="text-l font-semibold text-gray-900 dark:text-white"><i class="fa-solid fa-table-cells mr-2"></i>{item.areas}m<sup>2</sup></span>
                  </div>
                </div>
                <h3 class="truncate text-l font-semibold tracking-tight text-gray-900 dark:text-white">{item.title}</h3>
                <p class="truncate font-normal text-gray-700 dark:text-gray-400">{item.address}</p>
              </div>
            </div>
            {add?.find((i) => i._id === item._id) ? (
              <div
                className="phu absolute h-full w-full bg-red rounded-md"
                style={{
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "#19191999",
                }}
              >
                <div className="absolute h-5 w-5 top-3 right-5 rounded-full shadow">
                  <i
                    className="fa-solid fa-circle-check"
                    style={{
                      color: "green",
                      fontSize: "24px",
                      zIndex: 999,
                      backgroundColor: "white",
                      borderRadius: "50%",
                    }}
                  ></i>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>

      {
        loading === 'show' && (
          <>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" class="px-6 py-3">
                          Theo Tiêu Chí
                          </th>
                          <th scope="col" class="px-6 py-3">
                          {truncate(add[0].title, 45)}
                          </th>
                          <th scope="col" class="px-6 py-3">
                          {truncate(add[1].title, 45)}
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr class="bg-white border-b border-gray-500 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              Địa chỉ
                          </th>
                          <td class="px-6 py-4">
                          { truncate(add[0]?.address, 45)}
                          </td>
                          <td class="px-6 py-4">
                          { truncate(add[1]?.address, 45)}
                          </td>
                      </tr>
                      <tr class="bg-white border-b border-gray-500 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Giá thuê dài hạn
                          </th>
                          <td class="px-6 py-4">
                          { formatCurrentVND(add[0]?.packageLong?.price)}
                          </td>
                          <td class="px-6 py-4">
                          { formatCurrentVND(add[1]?.packageLong?.price)}
                          </td>
                      </tr>
                      <tr class="bg-white border-b border-gray-500 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Giá thuê ngắn hạn
                          </th>
                          <td class="px-6 py-4">
                          { formatCurrentVND(add[0]?.packageShort?.price)}
                          </td>
                          <td class="px-6 py-4">
                          { formatCurrentVND(add[1]?.packageShort?.price)}
                          </td>
                      </tr>
                      <tr class="bg-white border-b border-gray-500 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Diện tích
                          </th>
                          <td class="px-6 py-4">
                          {add[0].areas || 0}
                          </td>
                          <td class="px-6 py-4">
                          {add[1].areas || 0}
                          </td>
                      </tr>
                      <tr class="bg-white border-b border-gray-500 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Số phòng ngủ
                          </th>
                          <td class="px-6 py-4">
                          {add[0].numberBed || 0}
                          </td>
                          <td class="px-6 py-4">
                          {add[1].numberBed || 0}
                          </td>
                      </tr>
                      <tr class="bg-white border-b border-gray-500 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Lượt tương tác
                          </th>
                          <td class="px-6 py-4">
                          {add[0].reviews.length || 0}
                          </td>
                          <td class="px-6 py-4">
                          {add[1].reviews.length || 0}
                          </td>
                      </tr>
                      <tr class="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <span class="sr-only">Edit</span>                              
                          </th>
                          <td class="px-6 py-4">
                          <button type="submit"
                onClick={() => navigate(`/place/${add[0]._id}`)} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Xem chi tiết</button>
                            
                          </td>
                          <td class="px-6 py-4">
                          <button type="submit"
                onClick={() => navigate(`/place/${add[1]._id}`)} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Xem chi tiết</button>
                           
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>          
          </>
          
        ) 
      }
      {
        loading === 'hide' && ((
          <div className="flex items-center justify-center">
      <ReactLoading className="text-center" type={'spin'} color={'#f5385d'} height={'10%'} width={'10%'} />
        </div>
          ))
        }
      
    </div>
  );
};

export default Room;