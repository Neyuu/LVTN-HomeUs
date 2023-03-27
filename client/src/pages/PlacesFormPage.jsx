import PhotosUploader from "../PhotosUploader.jsx";
import Perks from "../Perks.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);
  const [booker, setBooker] = useState("");
  const [listBooker, setListBooker] = useState([]);
  const [hide, setHide] = useState(false);
  const [listLong, setListLong] = useState({
    longPackageDate: "",
    price: 0,
  });
  const [listShort, setListShort] = useState({
    shortPackageDateStart: "",
    shortPackageDateEnd: "",
    price: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setHide(data.status);
      setExtraInfo(data.extraInfo);
      setListShort({
        ...data.packageShort
      })
      setListLong({
        ...data.packageLong
      })
      setBooker(data.personBooker)
      setPrice(data.price);
    });
  }, [id]);

  useEffect(() => {
    new Promise(async () => {
      await getListBooker();
    });
  }, []);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  const getListBooker = async () => {
    try {
      const res = await axios.get(`/get-all-user-booker-active`);
      if (res.status === 200) {
        setListBooker(res.data.data);
      }
    } catch (error) {}
  };

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      package: [
        {
          longPackageDate: listLong.longPackageDate,
          price: listLong.price
        },
        {
          shortPackageDateStart: listShort.shortPackageDateStart ,
      shortPackageDateEnd: listShort.shortPackageDateEnd ,
      price: listShort.price 
        }
      ],
      personBooker: booker,
      price,
      status: hide
    };
    if (id) {
      // update
      await axios.put("/places", {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      // new place
      await axios.post("/places", placeData);
      setRedirect(true);
    }
  }

  const onChangePackage = (value, type, key) => {
    setPackage((prev) => {});
  };

  const showProfileChecker = (id) => {
    navigate(`/account/profile/${id}`,{replace: true})
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  const handleChecker = (id) => {
    setBooker(id)
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput(
          "Tên Căn Hộ",
          "Tiêu đề cho địa điểm của bạn. nên ngắn gọn và hấp dẫn như trong quảng cáo"
        )}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="title, for example: My lovely apt"
        />
        {preInput("Địa Chỉ", "Địa Chỉ Chỗ Căn Hộ")}
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="address"
        />
        {preInput("Hình Ảnh", "more = better")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput("Mô tả", "Mô tả căn hộ")}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        {preInput("Dịch Vụ", "Hãy Chọn 1 trong các dịch vụ sau")}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput("Thông Tin Khác", "Một Số Thông Tin Khác")}
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />
        {preInput("Thời gian thuê", "Thêm Thông Tin Thời Gian Khi Thuê")}

        <h2 className="p-2 m-2 underline font-bold">Gói Ngắn Hạn</h2>
        <div className="grid gap-2 grid-cols-2 border rounded-2xl p-4 m-2">
          <div>
            <h3 className="mt-2 -mb-1">Thời Gian Bắt Đầu</h3>
            <input
              type="date"
              className="date"
              value={listShort.shortPackageDateStart}
              onChange={(ev) =>
                setListShort((prev) => {
                  return {
                    ...prev,
                    shortPackageDateStart: ev.target.value,
                  };
                })
              }
              placeholder="14"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Thời Gian Đi</h3>
            <input
              type="date"
              className="date"
              value={listShort.shortPackageDateEnd}
              onChange={(ev) =>
                setListShort((prev) => {
                  return {
                    ...prev,
                    shortPackageDateEnd: ev.target.value,
                  };
                })
              }
              placeholder="11"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Giá theo </h3>
            <input
              type="number"
              value={listShort.price}
              onChange={(ev) =>
                setListShort((prev) => {
                  return {
                    ...prev,
                    price: ev.target.value,
                  };
                })
              }
            />
          </div>
        </div>

        <h2 className="p-2 m-2 underline font-bold">Gói Dài Hạn</h2>
        <p className="text-orange-800">(Gói không định sẵn ngày kết thúc)</p>
        <div className="grid gap-2 grid-cols-2 border rounded-2xl p-4 m-2">
          <div>
            <h3 className="mt-2 -mb-1">Thời Gian Bắt Đầu</h3>
            <input
              type="date"
              className="date"
              value={listLong.longPackageDate}
              onChange={(ev) =>
                setListLong((prev) => {
                  return {
                    ...prev,
                    longPackageDate: ev.target.value,
                  };
                })
              }
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Giá theo tháng</h3>
            <input
              type="number"
              value={listLong.price}
              onChange={(ev) =>
                setListLong((prev) => {
                  return {
                    ...prev,
                    price: ev.target.value,
                  };
                })
              }
            />
          </div>
        </div>
        {preInput("Người tạo hợp đồng", "Chọn người tạo hợp dồng")}

        <div className="bg-white shadow mt-6  rounded-lg p-6">
          <h3 className="text-gray-600 text-sm font-semibold mb-4">
            Danh Sách Các Booker
          </h3>
          <ul className="flex items-center justify-center space-x-2">
            {listBooker.map((item) => (
              <li className="flex flex-col items-center space-y-2">
                {/* Ring */}
                <Link
                  className="block bg-white p-1 rounded-full"
                  to={`/account/profile/${item._id}`}
                >
                  <img className="w-16 rounded-full" src={item.avatar} />
                </Link>
                {/* Username */}
                <span className="text-xs text-gray-500">{item.name}</span>
                <input type="checkbox" checked={booker == item._id ? true: false} onChange={()=> handleChecker(item._id)} />
              </li>
            ))}
          </ul>
        </div>
        <div className="">
        <h3 className="text-gray-600 text-sm font-semibold mb-4 pt-2">
            Ẩn hiện bài viết
          </h3>
        <input type="checkbox" checked={hide ? true: false} onChange={()=> setHide(!hide)}/>
        </div>
        <button className="primary my-4">Lưu</button>
      </form>
    </div>
  );
}
