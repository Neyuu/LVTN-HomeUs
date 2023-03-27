import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { formatCurrentVND } from "../../util/util";
import ListImgInfo from "../../components/ListImgInfo";
import BreakCump from "../../components/BreakCump";
import { toast } from "react-toastify";

const AdminBookerDetail = () => {
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
          <BreakCump
          text={'Quay lại'}
          url={'/admin-booker'}
          />
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
              <div className="font-semibold text-center mx-4">
                <p className="text-black">{`${
                  detail?.balanceCoin
                    ? formatCurrentVND(detail?.balanceCoin)
                    : 0
                } vnd`}</p>
                <span className="text-gray-400">Coin</span>
              </div>
              <div className="font-semibold text-center mx-4">
                <p className="text-black">99%</p>
                <span className="text-gray-400">Độ uy tín</span>
            </div>
            </div>
          </div>
          {detail?.img && <ListImgInfo listImg={detail.img} />}
        </aside>
        {detail?.acceptBooker ? (
          <button
            className="bg-red-500 hover:bg-red-700 text-white text-center font-light py-2 px-4 rounded-full w-40"
            onClick={() => handleAcceptBooker(detail?._id,false)}
          >
            Hủy Quyền
          </button>
              )
                  : (
                    <button
                    className="bg-green-500 hover:bg-green-700 text-white text-center font-light py-2 px-4 rounded-full w-40"
                    onClick={() => handleAcceptBooker(detail?._id,true)}
                  >
                    Duyệt
                  </button>
    )
            }
      </main>
    </div>
  );
};

export default AdminBookerDetail;
