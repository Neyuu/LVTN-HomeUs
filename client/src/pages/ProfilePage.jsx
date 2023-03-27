import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext.jsx";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  const [profile, setProfile] = useState({
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    name: '',
    email: '',
    address: '',
    phone: '',
    cmnd: '',
    issuedBy: '',
    dateEx: '',
  })
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  useEffect(() => {
    fetch();
  },[])

  const fetch = async () => {
    const res = await axios.get("/profile-show");
    if (res.status === 200) {
          setProfile({
      avatar: res.data.avatar,
      name: res.data.name,
      email: res.data.email,
      address: res.data.address,
      phone: res.data.phone,
      cmnd: res.data.cmnd,
      issuedBy: res.data.issuedBy,
      dateEx: res.data.dateEx,
    })
    }
  }

  const onChangeInput = (key, value) => {
    setProfile({
      ...profile,
      [key] : value
    })
  }
  
  const handleUpdateProfile = async() => {
    try {
      const params = {
        ...profile
      }
      const res = await axios.put(`/update-profile/${user._id}`, params);
      if (res.status === 200) {
        toast.success('Cập nhật thông tin thành công')
      }
    } catch (error) {
      
    }
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <>
          <div className="mt-10 sm:mt-0">
            <div className="md:grid"> 
              <div className="flex justify-center items-center">
                <img
                  className="h-32 w-32 bg-white p-2 rounded-full shadow mb-4"
                  src={profile.avatar}
                  alt=""
                />
                <input
                  type="text"
                  name="first_name"
                  value={profile.avatar}
                  onChange={(e)=>onChangeInput('avatar',e.target.value)}
                  id="first_name"
                  placeholder="Nhập link ảnh"
                  className="mt-1 ml-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>  
              <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="first_name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Tên
                          </label>
                          <input
                            type="text"
                            name="first_name"
                            id="first_name"
                            value={profile.name}
                            onChange={(e)=>onChangeInput('name',e.target.value)}
                            autoComplete="given-name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="last_name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email
                          </label>
                          <input
                            type="text"
                            name="last_name"
                            id="last_name"
                            value={profile.email}
                            onChange={(e)=>onChangeInput('email',e.target.value)}
                            autoComplete="family-name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="email_address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Địa chỉ
                          </label>
                          <input
                            type="text"
                            name="email_address"
                            id="email_address"
                            value={profile.address}
                            onChange={(e)=>onChangeInput('address',e.target.value)}
                            autoComplete="email"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="col-span-6">
                          <label
                            htmlFor="street_address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Số điện thoại
                          </label>
                          <input
                            type="text"
                            name="street_address"
                            id="street_address"
                            value={profile.phone}
                            onChange={(e)=>onChangeInput('phone',e.target.value)}
                            autoComplete="street-address"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Số CMND
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={profile.cmnd}
                            onChange={(e)=>onChangeInput('cmnd',e.target.value)}
                            id="city"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label
                            htmlFor="state"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Nơi cấp
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={profile.issuedBy}
                            onChange={(e)=>onChangeInput('issuedBy',e.target.value)}
                            id="state"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label
                            htmlFor="postal_code"
                            className="block text-sm font-medium text-gray-700"
                          >
                           Ngày hết hạn
                          </label>
                          <input
                            type="text"
                            name="postal_code"
                            value={profile.dateEx}
                            onChange={(e)=>onChangeInput('dateEx',e.target.value)}
                            id="postal_code"
                            autoComplete="postal-code"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        onClick={handleUpdateProfile}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Cập nhật
                      </button>
                    </div>
                  </div>
              </div>
            </div>
          </div>

          <div className="text-center max-w-lg mx-auto mt-3">
            Logged in as {user.name} ({user.email})<br />
            <button onClick={logout} className="primary max-w-sm mt-2">
              Logout
            </button>
          </div>
        </>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
}
