import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { formatCurrentVND } from "../util/util";
import ListImgInfo from "../components/ListImgInfo";
import BreakCump from "../components/BreakCump";
import { toast } from "react-toastify";

const BookerProfile = () => {
  const [detail, setDetail] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    new Promise(async () => {
      await fetchDetail();
    });
  }, []);

  const fetchDetail = async () => {
    try {
      const res = await axios.get(`/detail-booker/${id}`);
      if (res.status === 200) {
        setDetail(res.data.data);
      }
    } catch (error) {}
  };

  const handleAcceptBooker = async (id , status) => {
    try {
      const res = await axios.put(`/approval-booker-status/${id}`, {
        status: status,
      });
      if (res.status === 200) {
          toast.success('Xét duyệt thành công')
            navigate('/admin-booker',{replace: true})
      }
    } catch (error) {}
  };

  return (
      <div className="app m-4">
      <main className="grid gap-6 my-12 mx-12 px-2 mx-auto">
        <aside className>
          <div className="bg-white shadow rounded-lg p-10">
            <div className="flex flex-col gap-1 text-center items-center">
              <div className="relative">
                <img
                  className="h-32 w-32 bg-white p-2 rounded-full shadow mb-4"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                  alt=""
                              />
                              {
                                  detail?.acceptBooker && ( <div className="absolute h-5 w-5 top-0 right-5 rounded-full shadow"><i className="fa-solid fa-circle-check" style={{ color: 'green' , fontSize:'24px' }}></i></div>)
                             }
              </div>
                          <p className="font-semibold">{detail?.name} { detail?.acceptBooker && (<span className="text-green-500">Booker</span>) }</p>
              <div className="text-sm leading-normal text-gray-400 flex justify-center items-center">
                <svg
                  viewBox="0 0 24 24"
                  className="mr-1"
                  width={16}
                  height={16}
                  stroke="currentColor"
                  strokeWidth={2}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx={12} cy={10} r={3} />
                </svg>
                {detail?.email}
              </div>
            </div>
            <div className="flex justify-center items-center gap-2 my-3">
              <div className="font-semibold text-center mx-4">
            <p className="text-black">102</p>
            <span className="text-gray-400">Số Dự Án</span>
          </div>
              {/* <div className="font-semibold text-center mx-4">
                <p className="text-black">{`${
                  detail?.balanceCoin
                    ? formatCurrentVND(detail?.balanceCoin)
                    : 0
                } vnd`}</p>
                <span className="text-gray-400">Coin</span>
              </div> */}
              <div className="font-semibold text-center mx-4">
                <p className="text-black">99%</p>
                <span className="text-gray-400">Độ uy tín</span>
            </div>
            </div>
          </div>
          <h2 className="p-2 m-2 underline font-bold">Các Dự Án Đã Đại Diện</h2>
      <div className="grid mt-5 grid-cols-2  space-x-4 overflow-y-scroll flex justify-center items-center w-full ">
        <div className="relative flex flex-col justify-between   bg-white shadow-md rounded-3xl  bg-cover text-gray-800  overflow-hidden cursor-pointer w-full object-cover object-center rounded shadow-md h-64 my-2" style={{backgroundImage: 'url("https://images.unsplash.com/reserve/8T8J12VQxyqCiQFGa2ct_bahamas-atlantis.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80")'}}>
          <div className="absolute bg-gradient-to-t from-green-400 to-blue-400  opacity-50 inset-0 z-0" />
          <div className="relative flex flex-row items-end  h-72 w-full ">
            <div className="absolute right-0 top-0 m-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 p-2 text-gray-200 hover:text-blue-400 rounded-full hover:bg-white transition ease-in duration-200 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <div className="p-6 rounded-lg  flex flex-col w-full z-10 ">
              <h4 className="mt-1 text-white text-xl font-semibold  leading-tight truncate">Loremipsum..
              </h4>
              <div className="flex justify-between items-center ">
                <div className="flex flex-col">
                  <h2 className="text-sm flex items-center text-gray-300 font-normal">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                      </path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Dubai
                  </h2>
                </div>
              </div>
              <div className="flex pt-4  text-sm text-gray-300">
                <div className="flex items-center mr-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                    </path>
                  </svg>
                  <p className="font-normal">4.5</p>
                </div>
                <div className="flex items-center font-medium text-white ">
                  $1800
                  <span className="text-gray-300 text-sm font-normal"> /wk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex flex-col justify-between   bg-white shadow-md  rounded-3xl  bg-cover text-gray-800  overflow-hidden cursor-pointer w-full object-cover object-center rounded shadow-md h-64 my-2" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80")'}}>
          <div className="absolute bg-gradient-to-t from-blue-500 to-yellow-400  opacity-50 inset-0 z-0" />
          <div className="relative flex flex-row items-end  h-72 w-full ">
            <div className="absolute right-0 top-0 m-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 p-2 text-gray-200 hover:text-blue-400 rounded-full hover:bg-white transition ease-in duration-200 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <div className="p-5 rounded-lg  flex flex-col w-full z-10 ">
              <h4 className="mt-1 text-white text-xl font-semibold  leading-tight truncate">Loremipsum..
              </h4>
              <div className="flex justify-between items-center ">
                <div className="flex flex-col">
                  <h2 className="text-sm flex items-center text-gray-300 font-normal">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                      </path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    India
                  </h2>
                </div>
              </div>
              <div className="flex pt-4  text-sm text-gray-300">
                <div className="flex items-center mr-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                    </path>
                  </svg>
                  <p className="font-normal">4.5</p>
                </div>
                <div className="flex items-center font-medium text-white ">
                  $1800
                  <span className="text-gray-300 text-sm font-normal"> /wk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        </aside>
      </main>
    </div>
  );
};

export default BookerProfile;
